"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AvailabilityToggle, FacultyStatus } from "@/components/faculty/availability-toggle"
import { AIBanner } from "@/components/faculty/ai-banner"
import { QueuePanel } from "@/components/faculty/queue-panel"
import { ActiveSessionCard } from "@/components/faculty/active-session-card"
import { AnalyticsDashboard } from "@/components/faculty/analytics-dashboard"
import { SessionHistory } from "@/components/faculty/session-history"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { listenToBookings, listenToFacultyStatus, updateBookingStatus, updateFacultyStatus } from "@/lib/firebaseService"
import { callNextStudent, markStudentDone, QueueEntryWithId } from "@/lib/queue"
import { CURRENT_FACULTY } from "@/lib/constants"

const mockAnalytics = {
  avgDuration: "18m",
  studentsToday: 12,
  weeklyGoal: 84,
}

export default function FacultyPage() {
  const [queue, setQueue] = useState<QueueEntryWithId[]>([])
  const [activeStudent, setActiveStudent] = useState<QueueEntryWithId | null>(null)
  const [facultyStatus, setFacultyStatus] = useState<FacultyStatus>("available")

  useEffect(() => {
    const unsubscribe = listenToBookings(CURRENT_FACULTY.id, (queueData) => {
      console.log("Faculty queue listener update", { facultyId: CURRENT_FACULTY.id, queueData })
      setQueue(queueData)
      const active = queueData.find(entry => entry.status === "active")
      setActiveStudent(active || null)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const unsubscribe = listenToFacultyStatus(CURRENT_FACULTY.id, (statusData) => {
      setFacultyStatus(statusData.status)
      console.log("Faculty status update", { facultyId: CURRENT_FACULTY.id, statusData })
    })
    return () => unsubscribe()
  }, [])

  const handleCallNext = async () => {
    await callNextStudent(CURRENT_FACULTY.id)
  }

  const handleCallEmergencyFirst = async () => {
    await callNextStudent(CURRENT_FACULTY.id, true)
  }

  const handleAdmitStudent = async (studentId: string) => {
    await updateBookingStatus(CURRENT_FACULTY.id, studentId, "active")
  }

  const handleStatusChange = async (status: FacultyStatus) => {
    setFacultyStatus(status)
    await updateFacultyStatus(CURRENT_FACULTY.id, status)
  }

  const handleEndSession = async () => {
    if (!activeStudent) return
    await updateBookingStatus(CURRENT_FACULTY.id, activeStudent.id, "done")
  }

  const handleGroupSession = () => {
    console.log("Starting group session...")
  }

  const studentQueue = queue.filter(entry => entry.status === "waiting").map((entry) => ({
    id: entry.id,
    name: entry.studentName,
    department: "Student", // Assuming no department in queue
    level: "Student",
    reason: entry.reason,
    isUrgent: entry.priority === "high",
    priority: entry.priority,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=320&q=80",
  }))

  return (
    <>
      <AvailabilityToggle status={facultyStatus} onStatusChange={handleStatusChange} />

      <AIBanner
        topic="Assignment 2"
        studentCount={studentQueue.length}
        onGroupSession={handleGroupSession}
      />

      <div className="mb-6 sm:mb-8 flex flex-col gap-3 sm:flex-row justify-start">
        <button
          onClick={handleCallNext}
          disabled={studentQueue.length === 0}
          className="px-4 sm:px-6 py-2.5 sm:py-3 bg-secondary text-white text-xs sm:text-sm rounded-lg font-semibold hover:bg-secondary/90 transition-colors shadow-sm hover:shadow-md min-h-11 flex items-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-base sm:text-lg">person_add</span>
          <span>Call Next Student</span>
        </button>

        <button
          onClick={handleCallEmergencyFirst}
          disabled={studentQueue.length === 0}
          className="px-4 sm:px-6 py-2.5 sm:py-3 bg-error text-white text-xs sm:text-sm rounded-lg font-semibold hover:bg-error/90 transition-colors shadow-sm hover:shadow-md min-h-11 flex items-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-base sm:text-lg">priority_high</span>
          <span>Call Emergency First</span>
        </button>

        <Link href="/faculty/new-session">
          <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-white text-xs sm:text-sm rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md min-h-11 flex items-center gap-2 sm:gap-3">
            <span className="material-symbols-outlined text-base sm:text-lg">add_circle</span>
            <span>New Session</span>
          </button>
        </Link>
      </div>

      <Tabs defaultValue="queue" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="queue">Queue</TabsTrigger>
          <TabsTrigger value="session">Session</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="queue" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-8">
            <div className="xl:col-span-8">
              <QueuePanel
                students={studentQueue}
                onAdmit={handleAdmitStudent}
              />
            </div>
            <AnalyticsDashboard data={mockAnalytics} />
          </div>
        </TabsContent>

        <TabsContent value="session" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-8">
            <div className="xl:col-span-8">
              <ActiveSessionCard
                student={activeStudent ? {
                  name: activeStudent.studentName,
                  reason: activeStudent.reason,
                  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=320&q=80",
                } : null}
                onEndSession={handleEndSession}
                onReschedule={() => console.log("Rescheduling...")}
              />
            </div>
            <AnalyticsDashboard data={mockAnalytics} />
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <SessionHistory />
        </TabsContent>
      </Tabs>
    </>
  )
}
