"use client"

import { useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import { CURRENT_FACULTY, CURRENT_STUDENT } from "@/lib/constants"
import { listenStudentQueue, listenToQueue, QueueEntryWithId } from "@/lib/queue"

function formatElapsed(timestamp?: number) {
  if (!timestamp) return "00:00"
  const elapsed = Math.max(0, Date.now() - timestamp)
  const minutes = Math.floor(elapsed / 60000)
  const seconds = Math.floor((elapsed % 60000) / 1000)
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}

export function SessionBanner() {
  const pathname = usePathname()
  const [bookings, setBookings] = useState<QueueEntryWithId[]>([])
  const [seconds, setSeconds] = useState(0)

  const isFaculty = pathname?.startsWith("/faculty")
  const isStudent = pathname?.startsWith("/student") || pathname === "/"
  const hideBanner = pathname?.includes("/login") || pathname?.includes("/signup")

  useEffect(() => {
    if (hideBanner) return

    let unsubscribe = () => {}

    if (isStudent) {
      unsubscribe = listenStudentQueue(CURRENT_STUDENT.id, setBookings)
    }

    if (isFaculty) {
      unsubscribe = listenToQueue(CURRENT_FACULTY.id, setBookings)
    }

    return () => unsubscribe()
  }, [isStudent, isFaculty, hideBanner])

  useEffect(() => {
    const interval = setInterval(() => setSeconds((prev) => prev + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  const activeBooking = useMemo(
    () => bookings.find((booking) => booking.status === "active") || null,
    [bookings]
  )

  const waitingCount = useMemo(
    () => bookings.filter((booking) => booking.status === "waiting").length,
    [bookings]
  )

  const pendingBooking = useMemo(
    () => bookings.find((booking) => booking.status === "waiting") || null,
    [bookings]
  )

  if (hideBanner) {
    return null
  }

  const title = activeBooking
    ? isFaculty
      ? "Active student session"
      : "Session in progress"
    : pendingBooking
    ? isFaculty
      ? "Incoming student request"
      : "Session booked"
    : "No active session"

  const subtitle = activeBooking
    ? isFaculty
      ? `${activeBooking.studentName} is in session now`
      : `Waiting for ${activeBooking.facultyName} to complete your session`
    : pendingBooking
    ? isFaculty
      ? `${waitingCount} waiting in queue for ${pendingBooking.facultyName}`
      : `Waiting for ${pendingBooking.facultyName} to call you`
    : isFaculty
    ? "No students in queue"
    : "Browse faculty availability and join a queue"

  const details = activeBooking
    ? `${activeBooking.reason} · ${formatElapsed(activeBooking.timestamp)}`
    : pendingBooking
    ? `${pendingBooking.reason}`
    : "Ready when you are"

  return (
    <div className="mt-16 bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-2xl shadow-slate-900/10 mx-auto max-w-7xl px-6 py-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Live session sync</p>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">{title}</h2>
          <p className="max-w-2xl text-sm text-slate-300">{subtitle}</p>
        </div>
        <div className="rounded-2xl bg-slate-800/80 px-4 py-3 text-sm text-slate-100 ring-1 ring-white/10">
          {details}
        </div>
      </div>
    </div>
  )
}
