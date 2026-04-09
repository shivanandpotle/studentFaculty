"use client"

import { useState, useEffect } from "react"

interface StudentBookingNotification {
  id: string
  type: 'booking_confirmed' | 'booking_rescheduled' | 'booking_rejected'
  status: string
  facultyName: string
  topic: string
  date: string
  time?: string
  originalTime?: string
  newTime?: string
  timestamp: string
}

export function StudentBookingStatus() {
  const [bookingNotifications, setBookingNotifications] = useState<StudentBookingNotification[]>([])
  const [acceptedReschedules, setAcceptedReschedules] = useState<Set<string>>(new Set())

  useEffect(() => {
    const notifs = JSON.parse(localStorage.getItem('studentBookingNotifications') || '[]')
    setBookingNotifications(notifs)
  }, [])

  const handleAcceptReschedule = (notificationId: string) => {
    setAcceptedReschedules(prev => new Set([...prev, notificationId]))
    // In a real app, this would send confirmation back to faculty
  }

  const handleRejectReschedule = (notificationId: string) => {
    // Remove the notification
    setBookingNotifications(prev => prev.filter(n => n.id !== notificationId))
  }

  return (
    <>
      {bookingNotifications.map((notif) => {
        const isAccepted = acceptedReschedules.has(notif.id)

        if (notif.type === 'booking_confirmed') {
          return (
            <div 
              key={notif.id}
              className="mb-6 bg-gradient-to-br from-primary/10 to-primary/5 border-l-4 border-primary rounded-xl p-6 shadow-sm flex flex-col gap-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/20 rounded-full text-primary">
                    <span className="material-symbols-outlined">check_circle</span>
                  </div>
                  <div>
                    <p className="text-primary text-[0.75rem] font-semibold uppercase tracking-widest">Booking Confirmed!</p>
                    <h3 className="text-lg font-medium text-on-surface">Session Approved</h3>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-low rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-on-surface-variant">Faculty:</span>
                  <span className="font-semibold text-on-surface">{notif.facultyName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-on-surface-variant">Topic:</span>
                  <span className="font-semibold text-on-surface">{notif.topic}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-on-surface-variant">Date:</span>
                  <span className="font-semibold text-on-surface">{notif.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-on-surface-variant">Time:</span>
                  <span className="font-semibold text-on-surface">{notif.time}</span>
                </div>
              </div>
              <button className="w-full py-2.5 bg-primary text-white rounded-lg font-semibold hover:brightness-110 transition-all active:scale-95">
                Add to Calendar
              </button>
            </div>
          )
        }

        if (notif.type === 'booking_rescheduled') {
          return (
            <div 
              key={notif.id}
              className="mb-6 bg-gradient-to-br from-secondary/10 to-secondary/5 border-l-4 border-secondary rounded-xl p-6 shadow-sm flex flex-col gap-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-secondary/20 rounded-full text-secondary">
                    <span className="material-symbols-outlined">event_note</span>
                  </div>
                  <div>
                    <p className="text-secondary text-[0.75rem] font-semibold uppercase tracking-widest">Time Changed</p>
                    <h3 className="text-lg font-medium text-on-surface">{notif.facultyName} Suggested a New Time</h3>
                  </div>
                </div>
              </div>
              <p className="text-on-surface-variant text-sm">
                Your original time slot (<code className="bg-surface-container-low px-2 py-1 rounded text-xs font-semibold">{notif.originalTime}</code>) conflicts with {notif.facultyName}'s schedule.
              </p>
              <div className="bg-surface-container-low rounded-lg p-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Proposed Alternative</p>
                <div className="flex items-center gap-2">
                  <span className="text-on-surface-variant">New Time:</span>
                  <span className="font-bold text-primary text-lg">{notif.newTime}</span>
                </div>
              </div>
              {!isAccepted ? (
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleAcceptReschedule(notif.id)}
                    className="flex-1 py-2.5 bg-gradient-to-br from-secondary to-secondary-container text-on-secondary rounded-lg font-semibold hover:brightness-110 transition-all active:scale-95"
                  >
                    Accept New Time
                  </button>
                  <button 
                    onClick={() => handleRejectReschedule(notif.id)}
                    className="flex-1 py-2.5 bg-surface-container-low text-on-surface rounded-lg font-semibold hover:bg-surface-container transition-all active:scale-95"
                  >
                    Offer Alternative
                  </button>
                </div>
              ) : (
                <div className="py-3 px-4 bg-secondary/10 text-secondary font-semibold rounded-lg flex items-center gap-2">
                  <span className="material-symbols-outlined">check</span>
                  Rescheduled - Check your calendar
                </div>
              )}
            </div>
          )
        }

        if (notif.type === 'booking_rejected') {
          return (
            <div 
              key={notif.id}
              className="mb-6 bg-gradient-to-br from-error/10 to-error/5 border-l-4 border-error rounded-xl p-6 shadow-sm flex flex-col gap-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-error/20 rounded-full text-error">
                    <span className="material-symbols-outlined">cancel</span>
                  </div>
                  <div>
                    <p className="text-error text-[0.75rem] font-semibold uppercase tracking-widest">Booking Unavailable</p>
                    <h3 className="text-lg font-medium text-on-surface">{notif.facultyName} Not Available</h3>
                  </div>
                </div>
              </div>
              <p className="text-on-surface-variant text-sm">
                Unfortunately, {notif.facultyName} is not available at {notif.time} on {notif.date}.
              </p>
              <button className="w-full py-2.5 bg-primary text-white rounded-lg font-semibold hover:brightness-110 transition-all active:scale-95">
                Try Another Time Slot
              </button>
            </div>
          )
        }

        return null
      })}
    </>
  )
}
