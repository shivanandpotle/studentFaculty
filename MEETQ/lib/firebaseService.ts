import { db, ref, onValue, update, push } from "./firebase"

export interface FacultyMember {
  id: string
  name: string
  department: string
  status: "available" | "busy" | "in-session" | "offline"
  [key: string]: any
}

export interface BookingRequest {
  studentId: string
  studentName: string
  reason: string
  timestamp: number
  status: string
  priority?: "normal" | "high"
  [key: string]: any
}

export interface FacultyStatus {
  status: "available" | "busy" | "in-session" | "offline"
  lastUpdated: number
}

export interface NotificationRecord {
  id: string
  message: string
  type: string
  seen: boolean
  timestamp: number
  [key: string]: any
}

function dbGuard() {
  return db || null
}

export const listenToFaculty = (callback: (list: FacultyMember[]) => void) => {
  const database = dbGuard()
  if (!database) {
    callback([])
    return () => {}
  }

  return onValue(ref(database, "faculty"), (snapshot) => {
    const data = snapshot.val()
    const list = data
      ? Object.entries(data).map(([id, val]: [string, any]) => ({
          id,
          ...(typeof val === "object" && val !== null ? val : {}),
          status:
            typeof val?.status === "string"
              ? val.status
              : val?.status?.status || "offline",
        }))
      : []
    callback(list as FacultyMember[])
  })
}

export const sendBookingRequest = async (
  facultyId: string,
  bookingData: Omit<BookingRequest, "timestamp" | "status">
) => {
  const database = dbGuard()
  if (!database) {
    console.log("sendBookingRequest aborted: Firebase DB unavailable", { facultyId, bookingData })
    return null
  }

  const queuePath = `queues/${facultyId}/students`
  console.log("sendBookingRequest start", { facultyId, queuePath, bookingData })

  try {
    const entryRef = await push(ref(database, queuePath), {
      ...bookingData,
      facultyName: bookingData.facultyName || "",
      status: "waiting",
      priority: bookingData.priority || "normal",
      timestamp: Date.now(),
    })
    console.log("sendBookingRequest success", { key: entryRef.key, queuePath })
    return entryRef
  } catch (error) {
    console.error("sendBookingRequest failed", error)
    return null
  }
}

export const listenToBookings = (facultyId: string, callback: (list: BookingRequest[]) => void) => {
  const database = dbGuard()
  if (!database) {
    callback([])
    return () => {}
  }

  const queuePath = `queues/${facultyId}/students`
  return onValue(ref(database, queuePath), (snapshot) => {
    const raw = snapshot.val() || {}
    const entries = Object.entries(raw) as [string, any][]
    const list = entries.map(([id, entry]) => ({
      id,
      ...entry,
      priority: entry.priority || "normal",
      timestamp: entry.timestamp,
    }))

    list.sort((a, b) => {
      if (a.priority === b.priority) {
        return a.timestamp - b.timestamp
      }
      return a.priority === "high" ? -1 : 1
    })

    console.log("listenToBookings snapshot", { facultyId, queuePath, raw, list })
    callback(list as BookingRequest[])
  })
}

export const listenToFacultyStatus = (facultyId: string, callback: (status: FacultyStatus) => void) => {
  const database = dbGuard()
  if (!database) {
    callback({ status: "offline", lastUpdated: Date.now() })
    return () => {}
  }

  const statusRef = ref(database, `faculty/${facultyId}/status`)
  return onValue(statusRef, (snapshot) => {
    const data = snapshot.val()
    callback({
      status: data?.status || "offline",
      lastUpdated: data?.lastUpdated || Date.now(),
    })
  })
}

export const updateFacultyStatus = (facultyId: string, status: FacultyStatus["status"]) => {
  const database = dbGuard()
  if (!database) return Promise.resolve()
  return update(ref(database, `faculty/${facultyId}/status`), {
    status,
    lastUpdated: Date.now(),
  })
}

export const updateBookingStatus = (facultyId: string, bookingId: string, status: string) => {
  const database = dbGuard()
  if (!database) return Promise.resolve()
  return update(ref(database, `queues/${facultyId}/students/${bookingId}`), { status })
}

export const sendUrgentNotification = (facultyId: string, message: string) => {
  const database = dbGuard()
  if (!database) return Promise.resolve(null)
  return push(ref(database, `notifications/${facultyId}`), {
    message,
    type: "urgent",
    seen: false,
    timestamp: Date.now(),
  })
}

export const listenToNotifications = (facultyId: string, callback: (list: NotificationRecord[]) => void) => {
  const database = dbGuard()
  if (!database) {
    callback([])
    return () => {}
  }

  return onValue(ref(database, `notifications/${facultyId}`), (snapshot) => {
    const data = snapshot.val()
    const list = data
      ? Object.entries(data).map(([id, val]: [string, any]) => ({ id, ...(val || {}) }))
      : []
    callback((list as NotificationRecord[]).filter((n) => !n.seen))
  })
}

export const markNotificationSeen = (facultyId: string, notificationId: string) => {
  const database = dbGuard()
  if (!database) return Promise.resolve()
  return update(ref(database, `notifications/${facultyId}/${notificationId}`), {
    seen: true,
  })
}
