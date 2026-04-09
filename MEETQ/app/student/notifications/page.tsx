"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { StudentBookingStatus } from "@/components/student/booking-status"

interface AdmittedNotification {
  id: string
  type: string
  studentName: string
  reason: string
  facultyName: string
  timestamp: string
  read: boolean
}

export default function StudentNotificationsPage() {
  const [admittedNotifications, setAdmittedNotifications] = useState<AdmittedNotification[]>([])

  useEffect(() => {
    const notifications = JSON.parse(localStorage.getItem('studentNotifications') || '[]')
    setAdmittedNotifications(notifications)
  }, [])
  return (
    <main className="pt-24 pb-32 px-6 max-w-2xl mx-auto">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-[3.5rem] font-bold tracking-[-0.04em] text-on-surface leading-none mb-2">Live Updates</h1>
        <p className="text-on-surface-variant text-lg">Your academic orchestration in real-time.</p>
      </div>

      {/* Notification Feed: Bento Style */}
      <div className="grid grid-cols-1 gap-6">
        {/* Booking Status Section */}
        <StudentBookingStatus />
        
        {/* Admitted Notifications */}
        {admittedNotifications.map((notification) => (
          <div key={notification.id} className="bg-gradient-to-br from-primary/10 to-primary/5 border-l-4 border-primary rounded-xl p-6 shadow-sm flex flex-col gap-4 animate-pulse">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/20 rounded-full text-primary animate-bounce">
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                </div>
                <div>
                  <p className="text-primary text-[0.75rem] font-semibold uppercase tracking-widest">You're Admitted!</p>
                  <h3 className="text-lg font-medium text-on-surface">{notification.facultyName} is Ready</h3>
                </div>
              </div>
              <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-[0.75rem] font-bold">NOW</span>
            </div>
            <p className="text-on-surface-variant text-sm">
              {notification.facultyName} has admitted you to discuss: <span className="font-semibold text-on-surface">{notification.reason}</span>
            </p>
            <div className="flex gap-3">
              <button className="flex-1 py-2.5 bg-primary text-white rounded-lg font-semibold hover:brightness-110 transition-all active:scale-95">
                Join Now
              </button>
              <button className="flex-1 py-2.5 bg-surface-container-low text-on-surface rounded-lg font-semibold hover:bg-surface-container transition-all active:scale-95">
                Later
              </button>
            </div>
          </div>
        ))}
        
        {/* Queue Update Card */}
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <span className="material-symbols-outlined">hourglass_empty</span>
              </div>
              <div>
                <p className="text-on-surface-variant text-[0.75rem] font-semibold uppercase tracking-widest">Queue Position</p>
                <h3 className="text-lg font-medium text-on-surface">Linear Algebra Help</h3>
              </div>
            </div>
            <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-[0.75rem] font-bold">ACTIVE</span>
          </div>
          <div className="bg-surface-container-low rounded-lg p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-on-surface-variant text-sm">Estimated wait: 12 mins</p>
              <p className="text-2xl font-bold tracking-tight text-primary">You are now #2</p>
            </div>
            <div className="relative w-16 h-16">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <circle className="stroke-outline-variant/20" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
                <circle className="stroke-primary" cx="18" cy="18" fill="none" r="16" strokeDasharray="75, 100" strokeLinecap="round" strokeWidth="3"></circle>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-primary font-bold text-xs">80%</div>
            </div>
          </div>
        </div>

        {/* Faculty Availability Card */}
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border-l-4 border-secondary">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Image
                  className="w-12 h-12 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDrgZPmDxPIXbW4dZmsqQ7NmOTutvktpupDpRSFIlabbRQYl5xDVy0R1J0Zjxg5zg0Hq2VhvYpJHZooqb5f2JJTHGwpn23P2Ff3C03bu_AMovSUlcUmpfzaHY3RiRPmHQVSqabsIonUXS5_MLYKeo1nC_MRxfPyYAn3XBDmyntyL-UB_InFCVBYhA2R6WOKvHOsKbHh4XeFf-Y50FxOOI9aqs4GYQnthHq6uRs45uBE2C4Zk5lZPUDZ3zrBV8Ylm-xF5YShAn56FY"
                  alt="Dr. Sarah Jenkins"
                  width={48}
                  height={48}
                />
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-secondary rounded-full border-2 border-surface-container-lowest"></div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-on-surface">Dr. Sarah Jenkins</h3>
                <p className="text-on-surface-variant text-sm">Computer Science Dept.</p>
              </div>
            </div>
            <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-[0.75rem] font-bold">AVAILABLE</span>
          </div>
          <p className="text-on-surface-variant mb-4">{`"Now accepting drop-ins for Advanced Algorithms thesis review. Office 402."`}</p>
          <button className="w-full py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-xl font-semibold active:scale-95 transition-all">
            Join Queue
          </button>
        </div>

        {/* Session Summary Card */}
        <div className="bg-surface-container-low rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <span className="material-symbols-outlined text-8xl">forum</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-tertiary-fixed-dim/20 rounded-lg text-tertiary">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
            <div>
              <p className="text-on-surface-variant text-[0.75rem] font-semibold uppercase tracking-widest">Session Complete</p>
              <h3 className="text-lg font-medium text-on-surface">Physics 101 Lab Review</h3>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-on-surface-variant">Duration:</span>
              <span className="text-on-surface font-semibold">42 Minutes</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-on-surface-variant">Resources Shared:</span>
              <span className="text-on-surface font-semibold">3 Documents</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="bg-surface-container-lowest text-on-surface-variant text-xs font-medium px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">attachment</span>
                <span>lab_notes.pdf</span>
              </span>
              <span className="bg-surface-container-lowest text-on-surface-variant text-xs font-medium px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">attachment</span>
                <span>formula_sheet.xlsx</span>
              </span>
            </div>
          </div>
        </div>

        {/* In Session Update (Small) */}
        <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border-l-4 border-tertiary-fixed-dim">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjENlIz2EMBv4KaQ1UAtbk1mGF7OgOAfUUjU4za2uDcaFWcC7Kjk0EU0KxeCYUeH2b27Y3-_frBiwYvobgb8ujb2j8AzmghfrEdZ3sgT2XhqIMVThL9nEtXmYaqMMcKyCZlNuS3giwT7XAHWf6_p5YxhdjETRYMm3Xle4Hku72K-kM-QKHW1-RQQSICUJXe9sN7gLw22-rZ7FQOU06UPYYzGlckItTPptylid7BXIOA1_-od4JzwhoScznqxqmOiwvyMcTOtsxQlg"
                  alt="Prof. Marcus Thorne"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <h4 className="text-on-surface font-medium">Prof. Marcus Thorne</h4>
                <p className="text-on-surface-variant text-xs">Modern History</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="bg-tertiary-fixed-dim/20 text-tertiary text-[0.65rem] font-bold px-2 py-0.5 rounded-md mb-1 uppercase">In Session</span>
              <span className="text-on-surface-variant text-[0.65rem]">Ends in 8m</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
