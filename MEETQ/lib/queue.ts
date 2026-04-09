"use client"

import { v4 as uuidv4 } from "uuid"
import { toDataURL } from "qrcode"
import { ref, push, onValue, update, remove, query, orderByChild } from "firebase/database"
import { db } from "./firebase"

export type QueueStatus = "waiting" | "active" | "done"
export type QueuePriority = "normal" | "high"

export interface QueueEntry {
  id: string
  facultyId: string
  facultyName: string
  studentId: string
  studentName: string
  reason: string
  timestamp: number
  status: QueueStatus
  priority: QueuePriority
  tokenId: string
  qrCode: string
}

export interface QueueEntryWithId extends QueueEntry {
  id: string
}

function isDbReady() {
  return !!db
}

function getQueuePath(facultyId: string) {
  return `queues/${facultyId}/students`
}

function flattenQueue(data: any): QueueEntryWithId[] {
  if (!data || typeof data !== "object") return []

  return Object.entries(data).flatMap(([facultyId, facultyQueue]: [string, any]) => {
    if (!facultyQueue || typeof facultyQueue !== "object") {
      return []
    }

    const studentNodes = facultyQueue.students || facultyQueue
    if (!studentNodes || typeof studentNodes !== "object") {
      return []
    }

    return Object.entries(studentNodes).map(([entryId, entry]: [string, any]) => ({
      id: entryId,
      facultyId,
      facultyName: entry.facultyName,
      studentId: entry.studentId,
      studentName: entry.studentName,
      reason: entry.reason,
      timestamp: entry.timestamp,
      status: entry.status,
      priority: entry.priority || "normal",
      tokenId: entry.tokenId || "",
      qrCode: entry.qrCode || "",
    }))
  })
}

// Join queue for a specific faculty
export async function joinQueue(
  facultyId: string,
  facultyName: string,
  studentId: string,
  studentName: string,
  reason: string,
  priority: QueuePriority = "normal"
): Promise<string> {
  if (!isDbReady()) {
    console.log("Firebase DB not ready, joinQueue aborted", { facultyId, studentId })
    return ""
  }

  const queuePath = getQueuePath(facultyId)
  const queueRef = ref(db, queuePath)

  const snapshot = await new Promise<any>((resolve) => {
    onValue(queueRef, (snap) => resolve(snap.val()), { onlyOnce: true })
  })

  const existingEntry = snapshot
    ? Object.entries(snapshot).find(([, entry]: [string, any]) => {
        return entry.studentId === studentId && (entry.status === "waiting" || entry.status === "active")
      })
    : undefined

  if (existingEntry) {
    return existingEntry[0] as string
  }

  const tokenId = uuidv4()
  const qrPayload = JSON.stringify({ tokenId, studentId })
  const qrCode = await toDataURL(qrPayload)

  const newEntryRef = await push(queueRef, {
    facultyId,
    facultyName,
    studentId,
    studentName,
    reason,
    timestamp: Date.now(),
    status: "waiting",
    priority,
    tokenId,
    qrCode,
  })

  return newEntryRef.key || ""
}

// Listen to queue for a faculty
export function listenToQueue(facultyId: string, callback: (queue: QueueEntryWithId[]) => void) {
  if (!isDbReady()) {
    callback([])
    return () => {}
  }

  const queueRef = ref(db, getQueuePath(facultyId))
  const queueQuery = query(queueRef, orderByChild("timestamp"))
  return onValue(queueQuery, (snapshot) => {
    const raw = snapshot.val() || {}
    const entries = Object.entries(raw) as [string, any][]

    const queue: QueueEntryWithId[] = entries.map(([key, value]) => ({
      id: key,
      facultyId,
      facultyName: value.facultyName,
      studentId: value.studentId,
      studentName: value.studentName,
      reason: value.reason,
      timestamp: value.timestamp,
      status: value.status,
      priority: value.priority || "normal",
      tokenId: value.tokenId || "",
      qrCode: value.qrCode || "",
    }))

    queue.sort((a, b) => {
      if (a.priority === b.priority) {
        return a.timestamp - b.timestamp
      }
      return a.priority === "high" ? -1 : 1
    })

    callback(queue)
  })
}

export function listenStudentQueue(studentId: string, callback: (queue: QueueEntryWithId[]) => void) {
  if (!isDbReady()) {
    callback([])
    return () => {}
  }

  const rootRef = ref(db, "queues")
  return onValue(rootRef, (snapshot) => {
    const raw = snapshot.val() || {}
    const queue = flattenQueue(raw)
      .filter((entry) => entry.studentId === studentId)
      .sort((a, b) => {
        if (a.priority === b.priority) {
          return a.timestamp - b.timestamp
        }
        return a.priority === "high" ? -1 : 1
      })

    callback(queue)
  })
}

export async function verifyQueueToken(facultyId: string, tokenId: string) {
  if (!isDbReady()) return null

  const queueRef = ref(db, getQueuePath(facultyId))
  const snapshot = await new Promise<any>((resolve) => {
    onValue(queueRef, (snap) => resolve(snap.val()), { onlyOnce: true })
  })

  if (!snapshot) return null

  const entries = Object.entries(snapshot) as [string, any][]
  const matching = entries.find(([, entry]) => entry.tokenId === tokenId && entry.status !== "done")

  if (!matching) return null

  const [entryId, entryValue] = matching
  const activeEntry = entries.find(([, entry]) => entry.status === "active")
  const updates: Record<string, any> = {}

  if (activeEntry && activeEntry[0] !== entryId) {
    updates[`${getQueuePath(facultyId)}/${activeEntry[0]}/status`] = "done"
  }
  updates[`${getQueuePath(facultyId)}/${entryId}/status`] = "active"

  await update(ref(db), updates)

  return {
    id: entryId,
    facultyId,
    facultyName: entryValue.facultyName,
    studentId: entryValue.studentId,
    studentName: entryValue.studentName,
    reason: entryValue.reason,
    timestamp: entryValue.timestamp,
    status: "active" as QueueStatus,
    priority: entryValue.priority || "normal",
    tokenId: entryValue.tokenId,
    qrCode: entryValue.qrCode,
  }
}

// Call next student (faculty action)
export async function callNextStudent(facultyId: string, preferEmergency: boolean = true): Promise<void> {
  if (!isDbReady()) return

  const queueRef = ref(db, getQueuePath(facultyId))
  const snapshot = await new Promise<any>((resolve) => {
    onValue(queueRef, (snap) => resolve(snap.val()), { onlyOnce: true })
  })

  if (!snapshot) return

  const entries = Object.entries(snapshot).map(([key, value]: [string, any]) => ({ id: key, data: value }))
  const activeEntry = entries.find((entry) => entry.data.status === "active")
  const waitingEntries = entries
    .filter((entry) => entry.data.status === "waiting")
    .sort((a, b) => {
      if (preferEmergency) {
        if ((a.data.priority || "normal") === (b.data.priority || "normal")) {
          return a.data.timestamp - b.data.timestamp
        }
        return (a.data.priority || "normal") === "high" ? -1 : 1
      }
      return a.data.timestamp - b.data.timestamp
    })

  if (!waitingEntries.length) return

  const updates: Record<string, any> = {}
  if (activeEntry) {
    updates[`${getQueuePath(facultyId)}/${activeEntry.id}/status`] = "done"
  }
  updates[`${getQueuePath(facultyId)}/${waitingEntries[0].id}/status`] = "active"

  await update(ref(db), updates)
}

// Mark student as done (faculty action)
export async function markStudentDone(facultyId: string, studentId: string): Promise<void> {
  if (!isDbReady()) return
  await update(ref(db, `${getQueuePath(facultyId)}/${studentId}`), { status: "done" })
}

// Leave queue (student action)
export async function leaveQueue(facultyId: string, studentId: string): Promise<void> {
  if (!isDbReady()) return
  await remove(ref(db, `${getQueuePath(facultyId)}/${studentId}`))
}

// Get queue position for a student
export function getQueuePosition(queue: QueueEntryWithId[], studentId: string): number {
  const waitingQueue = queue.filter((entry) => entry.status === "waiting")
  const index = waitingQueue.findIndex((entry) => entry.id === studentId)
  return index >= 0 ? index + 1 : 0
}

// Calculate estimated wait time (position * avg duration in minutes)
export function calculateEstimatedWait(position: number, avgDurationMinutes: number = 10): number {
  return position * avgDurationMinutes
}
