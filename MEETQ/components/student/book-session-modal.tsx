"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { listenToQueue, getQueuePosition, calculateEstimatedWait, QueueEntryWithId, joinQueue } from "@/lib/queue"

interface BookSessionModalProps {
  isOpen: boolean
  onClose: () => void
  faculty: {
    id: string
    name: string
    department: string
    avatar: string
    status?: "available" | "busy" | "in-session" | "offline"
  }
  studentId: string
  studentName: string
}

export function BookSessionModal({ isOpen, onClose, faculty, studentId, studentName }: BookSessionModalProps) {
  const [reason, setReason] = useState("")
  const [isEmergency, setIsEmergency] = useState(false)
  const [queue, setQueue] = useState<QueueEntryWithId[]>([])
  const [isJoining, setIsJoining] = useState(false)
  const [joined, setJoined] = useState(false)
  const [myPosition, setMyPosition] = useState(0)
  const [estimatedWait, setEstimatedWait] = useState(0)

  useEffect(() => {
    if (!isOpen) return

    const unsubscribe = listenToQueue(faculty.id, (queueData) => {
      console.log("Student queue listener update", { facultyId: faculty.id, queueData })
      setQueue(queueData)

      const myEntry = queueData.find(entry => entry.studentName === studentName && entry.status === "waiting")
      if (myEntry) {
        const position = getQueuePosition(queueData, myEntry.id)
        setMyPosition(position)
        setEstimatedWait(calculateEstimatedWait(position))
        setJoined(true)
      } else {
        setJoined(false)
        setMyPosition(0)
        setEstimatedWait(0)
      }
    })

    return () => unsubscribe()
  }, [isOpen, faculty.id, studentName])

  const isFacultyAvailable = faculty.status === "available"

  const handleJoinQueue = async () => {
    if (!reason.trim() || !isFacultyAvailable) return

    setIsJoining(true)
    try {
      const entryKey = await joinQueue(
        faculty.id,
        faculty.name,
        studentId,
        studentName,
        reason,
        isEmergency ? "high" : "normal"
      )
      console.log("handleJoinQueue result", { entryKey })
      setReason("")
      setIsEmergency(false)
    } catch (error) {
      console.error("Failed to join queue:", error)
    } finally {
      setIsJoining(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-60 bg-surface/80 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Modal Container */}
      <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-primary/10 to-primary/5 p-6 border-b border-outline-variant/10">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold tracking-tight text-on-surface">Join Queue</h2>
            <button 
              onClick={onClose}
              className="text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          
          {/* Faculty Info */}
          <div className="flex items-center gap-3">
            <img 
              className="w-12 h-12 rounded-full object-cover border-2 border-primary"
              src={faculty.avatar}
              alt={faculty.name}
            />
            <div>
              <h3 className="font-semibold text-on-surface">{faculty.name}</h3>
              <p className="text-sm text-on-surface-variant">{faculty.department}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Queue Status */}
          {joined ? (
            <div className="bg-primary/10 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                <span className="font-semibold text-on-surface">Joined Queue</span>
              </div>
              <div className="text-sm text-on-surface-variant">
                Position: #{myPosition}
              </div>
              <div className="text-sm text-on-surface-variant">
                Estimated wait: {estimatedWait} minutes
              </div>
            </div>
          ) : (
            <>
              {/* Reason Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg text-primary">description</span>
                  Reason for Session
                </label>
                <textarea 
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg p-3 text-on-surface focus:outline-none focus:ring-2 ring-primary/30 placeholder:text-on-surface-variant resize-none"
                  placeholder="What would you like to discuss?"
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>

              {/* Emergency Priority Toggle */}
              <div className="flex items-center justify-between gap-4 p-4 bg-surface-container-low rounded-2xl">
                <div>
                  <p className="text-sm font-semibold text-on-surface">Mark as Emergency</p>
                  <p className="text-xs text-on-surface-variant">Emergency requests jump ahead of normal queue order.</p>
                </div>
                <button
                  onClick={() => setIsEmergency((prev) => !prev)}
                  type="button"
                  className={`w-14 h-8 rounded-full p-1 transition-colors ${isEmergency ? "bg-error" : "bg-surface-container-high"}`}
                >
                  <span className={`block w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${isEmergency ? "translate-x-6" : "translate-x-0"}`}></span>
                </button>
              </div>

              <button 
                onClick={handleJoinQueue}
                disabled={!reason.trim() || isJoining || !isFacultyAvailable}
                className="w-full py-3 px-4 rounded-lg font-semibold bg-linear-to-br from-primary to-primary-container text-on-primary hover:brightness-110 shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isJoining ? (
                  <span className="material-symbols-outlined animate-spin">refresh</span>
                ) : (
                  <span className="material-symbols-outlined">queue</span>
                )}
                {isJoining ? "Joining..." : "Join Queue"}
              </button>
              {!isFacultyAvailable && (
                <p className="text-sm text-error mt-2 text-center">This faculty is not accepting new queue requests right now.</p>
              )}
            </>
          )}

          {/* Live Queue List */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-lg text-primary">list</span>
              Current Queue ({queue.length} students)
            </h4>
            <div className="max-h-48 overflow-y-auto space-y-2">
              {queue.length === 0 ? (
                <div className="text-center py-4 text-on-surface-variant">
                  No one in queue
                </div>
              ) : (
                queue.map((entry, index) => (
                  <div key={entry.id} className="flex items-center justify-between bg-surface-container-low rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-on-surface">#{index + 1}</span>
                      <div>
                        <div className="text-sm font-medium text-on-surface">{entry.studentName}</div>
                        <div className="text-xs text-on-surface-variant">{entry.reason}</div>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      entry.status === "active" ? "bg-green-100 text-green-800" :
                      entry.status === "done" ? "bg-gray-100 text-gray-800" :
                      "bg-yellow-100 text-yellow-800"
                    }`}>
                      {entry.status}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-lg font-semibold bg-surface-container-high text-on-surface hover:bg-surface-container transition-all active:scale-[0.98]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
