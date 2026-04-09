"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { BookingDetailModal } from "@/components/faculty/booking-detail-modal"

type TabType = "all" | "urgent" | "queue" | "system" | "bookings"
type NotificationType = "urgent" | "queue" | "system" | "booking"

interface Notification {
  id: string
  type: NotificationType
  title: string
  description: string
  time: string
  date: string
  icon: string
  iconBg: string
  iconColor: string
  actions?: { label: string; variant: string }[]
  studentName?: string
  studentImage?: string
  queuePosition?: string
  isCompleted?: boolean
  borderColor?: string
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "urgent",
    title: "Urgent Signature Request",
    description: "Thesis Proposal Approval required for Marcus Sterling. Deadline: End of Business.",
    time: "09:42 AM",
    date: "Today - Oct 24",
    icon: "draw",
    iconBg: "bg-error-container",
    iconColor: "text-error",
    studentName: "Marcus Sterling",
    actions: [
      { label: "Review & Sign", variant: "primary" },
      { label: "Decline", variant: "secondary" }
    ]
  },
  {
    id: "2",
    type: "queue",
    title: "Student Joined Queue",
    description: 'Elena Rodriguez is waiting for Office Hours: "Questions about Midterm Project grading".',
    time: "10:15 AM",
    date: "Today - Oct 24",
    icon: "hourglass_empty",
    iconBg: "bg-secondary",
    iconColor: "text-white",
    studentName: "Elena Rodriguez",
    studentImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbEtpzm7_Zd0wAzsI-2MLFj__DnIs-VWZQz9wxH0wBzpkodfUkSl72JGBK-9F7h426Xwq08JF3O6E4Khi3npyf4GBckZAya6Rwc-kEt8YHbyiYU8S9fipUVOSu64oVFNBs_D7mM9CPK4aHWwd-I43ECJ7znOZrSA7Jtpfozi6A35-7QxdWcHOUSoHd_H26upugruf8ompMQMuXnFBkbmyPq9NKnkryBxTpXRqH9NPhwB-melicDngm061k89dmpz3L2lDXsdwdlAI",
    queuePosition: "4th"
  },
  {
    id: "3",
    type: "queue",
    title: "Session Completed",
    description: "Advising session with David Chen has been logged and synced to Registrar.",
    time: "08:30 AM",
    date: "Today - Oct 24",
    icon: "check_circle",
    iconBg: "bg-surface-container-highest",
    iconColor: "text-on-surface-variant",
    studentName: "David Chen",
    isCompleted: true
  },
  {
    id: "4",
    type: "system",
    title: "System Maintenance",
    description: "Sync services will be down for 15 minutes for security patching. Scheduled sessions will remain available offline.",
    time: "11:00 PM",
    date: "Yesterday - Oct 23",
    icon: "settings_suggest",
    iconBg: "bg-tertiary-fixed",
    iconColor: "text-tertiary",
    borderColor: "border-l-4 border-tertiary"
  }
]

export default function FacultyNotificationsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("all")
  const [actionMessages, setActionMessages] = useState<{ [key: string]: string }>({})
  const [removedNotifications, setRemovedNotifications] = useState<Set<string>>(new Set())
  const [bookingNotifications, setBookingNotifications] = useState<any[]>([])
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [bookingStatuses, setBookingStatuses] = useState<Record<string, string>>({})

  useEffect(() => {
    // Load booking notifications from localStorage
    const savedBookings = JSON.parse(localStorage.getItem('facultyBookingNotifications') || '[]')
    const statuses = JSON.parse(localStorage.getItem('bookingStatuses') || '{}')
    setBookingNotifications(savedBookings)
    setBookingStatuses(statuses)
  }, [])

  const handleAction = (notificationId: string, actionLabel: string) => {
    setActionMessages(prev => ({
      ...prev,
      [notificationId]: `${actionLabel} action completed!`
    }))
    
    // Remove notification after a short delay for visual feedback
    setTimeout(() => {
      setRemovedNotifications(prev => new Set([...prev, notificationId]))
      setActionMessages(prev => ({
        ...prev,
        [notificationId]: ""
      }))
    }, 1500)
  }

  const handleBookingConfirm = (data: { bookingId: string; confirmedTime: string }) => {
    // Update booking status
    const newStatuses = { ...bookingStatuses, [data.bookingId]: 'confirmed' }
    setBookingStatuses(newStatuses)
    localStorage.setItem('bookingStatuses', JSON.stringify(newStatuses))

    // Create confirmation notification for student
    const booking = bookingNotifications.find(b => b.id === data.bookingId)
    if (booking) {
      const studentNotif = {
        id: 'confirm_' + data.bookingId,
        type: 'booking_confirmed',
        status: 'confirmed',
        facultyName: 'Dr. Aris Thorne',
        topic: booking.topic,
        date: booking.date,
        time: booking.time,
        timestamp: new Date().toISOString()
      }
      const existingStudentNotifs = JSON.parse(localStorage.getItem('studentBookingNotifications') || '[]')
      existingStudentNotifs.unshift(studentNotif)
      localStorage.setItem('studentBookingNotifications', JSON.stringify(existingStudentNotifs))
    }

    setRemovedNotifications(prev => new Set([...prev, data.bookingId]))
    setSelectedBooking(null)
  }

  const handleBookingReschedule = (data: { bookingId: string; newTime: string }) => {
    // Update booking status with new time
    const newStatuses = { ...bookingStatuses, [data.bookingId]: `rescheduled_${data.newTime}` }
    setBookingStatuses(newStatuses)
    localStorage.setItem('bookingStatuses', JSON.stringify(newStatuses))

    // Create rescheduling notification for student
    const booking = bookingNotifications.find(b => b.id === data.bookingId)
    if (booking) {
      const studentNotif = {
        id: 'reschedule_' + data.bookingId,
        type: 'booking_rescheduled',
        status: 'rescheduled',
        facultyName: 'Dr. Aris Thorne',
        topic: booking.topic,
        date: booking.date,
        originalTime: booking.time,
        newTime: data.newTime,
        timestamp: new Date().toISOString()
      }
      const existingStudentNotifs = JSON.parse(localStorage.getItem('studentBookingNotifications') || '[]')
      existingStudentNotifs.unshift(studentNotif)
      localStorage.setItem('studentBookingNotifications', JSON.stringify(existingStudentNotifs))
    }

    setRemovedNotifications(prev => new Set([...prev, data.bookingId]))
    setSelectedBooking(null)
  }

  const handleBookingReject = (bookingId: string) => {
    // Update booking status
    const newStatuses = { ...bookingStatuses, [bookingId]: 'rejected' }
    setBookingStatuses(newStatuses)
    localStorage.setItem('bookingStatuses', JSON.stringify(newStatuses))

    // Create rejection notification for student
    const booking = bookingNotifications.find(b => b.id === bookingId)
    if (booking) {
      const studentNotif = {
        id: 'reject_' + bookingId,
        type: 'booking_rejected',
        status: 'rejected',
        facultyName: 'Dr. Aris Thorne',
        topic: booking.topic,
        date: booking.date,
        time: booking.time,
        timestamp: new Date().toISOString()
      }
      const existingStudentNotifs = JSON.parse(localStorage.getItem('studentBookingNotifications') || '[]')
      existingStudentNotifs.unshift(studentNotif)
      localStorage.setItem('studentBookingNotifications', JSON.stringify(existingStudentNotifs))
    }

    setRemovedNotifications(prev => new Set([...prev, bookingId]))
    setSelectedBooking(null)
  }

  // Convert booking notifications to the Notification format
  const convertedBookings: Notification[] = bookingNotifications.map((booking) => {
    const status = bookingStatuses[booking.id] || 'pending'
    const isPending = status === 'pending'
    
    return {
      id: booking.id,
      type: "booking",
      title: `Session Booked: ${booking.topic}`,
      description: `${booking.studentName} from ${booking.studentDept} has booked a session with you for ${booking.date} at ${booking.time}.`,
      time: new Date(booking.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      date: `Today - ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
      icon: "calendar_add_on",
      iconBg: "bg-tertiary-container",
      iconColor: "text-tertiary",
      studentName: booking.studentName,
      actions: isPending ? [
        { label: "View & Respond", variant: "primary" },
      ] : []
    }
  })

  const allNotifications = [...convertedBookings, ...notifications]

  const filteredNotifications = allNotifications
    .filter(notification => !removedNotifications.has(notification.id))
    .filter(notification => {
      if (activeTab === "all") return true
      return notification.type === activeTab
    })

  const groupedByDate = filteredNotifications.reduce(
    (acc, notification) => {
      if (!acc[notification.date]) {
        acc[notification.date] = []
      }
      acc[notification.date].push(notification)
      return acc
    },
    {} as Record<string, Notification[]>
  )

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-10">
      {/* Header Section */}
      <header className="mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-on-surface mb-1 sm:mb-2 font-headline">Activity Center</h1>
          <p className="text-xs sm:text-base text-on-surface-variant max-w-2xl">Real-time orchestration of your academic workflow and student interactions.</p>
        </div>
        {/* Filter Tabs */}
        <div className="flex p-1 bg-surface-container-low rounded-xl gap-1 overflow-x-auto">
          {(["all", "urgent", "queue", "bookings", "system"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab
                  ? "text-on-surface bg-surface-container-lowest shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </header>

      {/* Activity Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-8 space-y-6">
          {Object.entries(groupedByDate).map(([date, dateNotifications]) => (
            <div key={date}>
              {/* Day Marker */}
              <div className="flex items-center gap-4 py-4">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant whitespace-nowrap">{date}</span>
                <div className="h-[1px] flex-grow bg-outline-variant opacity-20"></div>
              </div>

              {/* Notification Cards */}
              <div className="space-y-4 sm:space-y-6">
                {dateNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`group relative bg-surface-container-lowest p-4 sm:p-6 rounded-xl transition-all hover:scale-[1.01] duration-300 ${
                      notification.borderColor || ""
                    } ${notification.isCompleted ? "opacity-75 grayscale-[0.3] bg-surface-container-low/50" : ""} ${
                      removedNotifications.has(notification.id) ? "opacity-0 scale-95 pointer-events-none" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3 sm:gap-5">
                      {/* Icon */}
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${notification.iconBg} flex items-center justify-center shrink-0 relative`}
                      >
                        {notification.studentImage ? (
                          <div className="w-full h-full rounded-full overflow-hidden">
                            <Image
                              alt={notification.studentName || "Student"}
                              src={notification.studentImage}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <span className={`material-symbols-outlined text-base sm:text-xl ${notification.iconColor}`}>
                            {notification.icon}
                          </span>
                        )}
                        {notification.queuePosition && !notification.isCompleted && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-secondary flex items-center justify-center border-2 border-white">
                            <span className="material-symbols-outlined text-[12px] text-white">hourglass_empty</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-start mb-1 gap-2">
                          <h3 className="text-base sm:text-xl font-semibold text-on-surface">{notification.title}</h3>
                          <span className="text-xs sm:text-sm font-medium text-on-surface-variant whitespace-nowrap">{notification.time}</span>
                        </div>
                        <p className="text-xs sm:text-base text-on-surface-variant mb-3 sm:mb-4">
                          {notification.description}
                        </p>

                        {/* Queue Badge */}
                        {notification.queuePosition && (
                          <span className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-full bg-surface-container-low text-[10px] font-bold uppercase tracking-wider text-secondary mb-3 sm:mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                            In Queue ({notification.queuePosition})
                          </span>
                        )}

                        {/* Action Buttons */}
                        {notification.actions && (
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
                            {notification.actions.map((action, idx) => (
                              <div key={idx} className="flex-1">
                                <button
                                  onClick={() => {
                                    if (notification.type === "booking") {
                                      // For booking notifications, open the detail modal
                                      const booking = bookingNotifications.find(b => b.id === notification.id)
                                      if (booking) {
                                        setSelectedBooking(booking)
                                      }
                                    } else {
                                      // Regular action handler for other notifications
                                      handleAction(notification.id, action.label)
                                    }
                                  }}
                                  className={`w-full px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all min-h-[36px] sm:min-h-[40px] flex items-center justify-center ${
                                    action.variant === "primary"
                                      ? "bg-primary text-white hover:brightness-110 active:scale-95"
                                      : "bg-surface-container-low text-on-surface hover:bg-surface-container active:scale-95"
                                  }`}
                                >
                                  {action.label}
                                </button>
                                {actionMessages[notification.id] && idx === 0 && (
                                  <p className="text-[10px] sm:text-xs text-green-600 mt-1.5 font-semibold">
                                    ✓ {actionMessages[notification.id]}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {!notification.isCompleted && (
                      <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-sm text-outline">chevron_right</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Empty State */}
          {filteredNotifications.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <span className="material-symbols-outlined text-4xl sm:text-5xl text-on-surface-variant/40 mb-4">inbox</span>
              <p className="text-base sm:text-lg font-semibold text-on-surface-variant">No notifications in this category</p>
              <p className="text-xs sm:text-sm text-on-surface-variant/70">Check back later or try another tab</p>
            </div>
          )}
        </div>

        {/* Status Sidebar */}
        <div className="lg:col-span-4 space-y-6 md:space-y-8">
          {/* Stats Card */}
          <section className="bg-surface-container-lowest p-6 md:p-8 rounded-xl shadow-sm border-t-4 border-primary">
            <h4 className="text-[9px] md:text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4 md:mb-6">Workflow Pulse</h4>
            <div className="space-y-4 md:space-y-6">
              <div>
                <div className="flex justify-between items-end mb-1">
                  <span className="text-3xl md:text-5xl font-bold tracking-tighter text-primary">03</span>
                  <span className="text-[10px] md:text-xs font-semibold text-error mb-1 md:mb-2">URGENT</span>
                </div>
                <p className="text-xs md:text-sm text-on-surface-variant">Pending Actions</p>
              </div>
              <div className="h-[1px] bg-outline-variant opacity-20"></div>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div>
                  <p className="text-xl md:text-2xl font-bold text-on-surface">12</p>
                  <p className="text-[10px] md:text-xs text-on-surface-variant">Sessions Today</p>
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-bold text-on-surface">89%</p>
                  <p className="text-[10px] md:text-xs text-on-surface-variant">Student Rating</p>
                </div>
              </div>
            </div>
          </section>

          {/* Real-time Status Card */}
          <section className="bg-primary text-white p-6 md:p-8 rounded-xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <h4 className="text-[9px] md:text-xs font-bold uppercase tracking-widest text-primary-fixed mb-3 md:mb-4">Current Mode</h4>
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
              <span className="text-lg md:text-2xl font-semibold">Available for Queue</span>
            </div>
            <button className="w-full bg-white/10 hover:bg-white/20 text-white py-2.5 md:py-3 rounded-xl font-semibold text-xs md:text-sm border border-white/20 transition-all backdrop-blur-sm min-h-[44px] md:min-h-auto flex items-center justify-center">
              {`Switch to "In Session"`}
            </button>
          </section>

          {/* Mini Queue Preview */}
          <section className="bg-surface-container-low p-4 md:p-6 rounded-xl">
            <h4 className="text-[9px] md:text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-3 md:mb-4">Upcoming in Queue</h4>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-center gap-2 md:gap-3">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-outline-variant flex-shrink-0"></div>
                <div className="flex-grow min-w-0">
                  <p className="text-xs md:text-sm font-semibold truncate">Jordan Lee</p>
                  <p className="text-[8px] md:text-[10px] text-on-surface-variant">Waiting 12m</p>
                </div>
                <span className="material-symbols-outlined text-xs md:text-sm text-outline flex-shrink-0">drag_handle</span>
              </li>
              <li className="flex items-center gap-2 md:gap-3">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-outline-variant flex-shrink-0"></div>
                <div className="flex-grow min-w-0">
                  <p className="text-xs md:text-sm font-semibold truncate">Sarah Kim</p>
                  <p className="text-[8px] md:text-[10px] text-on-surface-variant">Waiting 5m</p>
                </div>
                <span className="material-symbols-outlined text-xs md:text-sm text-outline flex-shrink-0">drag_handle</span>
              </li>
            </ul>
          </section>
        </div>
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <BookingDetailModal
          isOpen={!!selectedBooking}
          onClose={() => setSelectedBooking(null)}
          booking={selectedBooking}
          onConfirm={handleBookingConfirm}
          onReschedule={handleBookingReschedule}
          onReject={handleBookingReject}
        />
      )}

      {/* Floating Action Button */}
      <button className="fixed bottom-24 md:bottom-8 right-4 md:right-6 w-12 h-12 md:w-14 md:h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform z-40 hover:brightness-110 min-h-[48px]">
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  )
}
