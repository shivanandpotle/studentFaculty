"use client"

import { useState } from "react"

interface BookingDetailModalProps {
  isOpen: boolean
  onClose: () => void
  booking: {
    id: string
    studentName: string
    studentDept: string
    topic: string
    date: string
    time: string
  }
  onConfirm?: (data: { bookingId: string; confirmedTime: string }) => void
  onReschedule?: (data: { bookingId: string; newTime: string }) => void
  onReject?: (bookingId: string) => void
}

const timeSlots = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"]

// Mock teacher availability (true = available, false = booked)
const mockAvailability: Record<string, boolean> = {
  "9:00 AM": false,
  "9:30 AM": true,
  "10:00 AM": true,
  "10:30 AM": false,
  "11:00 AM": true,
  "11:30 AM": true,
  "2:00 PM": false,
  "2:30 PM": true,
  "3:00 PM": true,
  "3:30 PM": true,
  "4:00 PM": false
}

export function BookingDetailModal({ isOpen, onClose, booking, onConfirm, onReschedule, onReject }: BookingDetailModalProps) {
  const [mode, setMode] = useState<"view" | "reschedule">("view")
  const [selectedTime, setSelectedTime] = useState(booking.time)
  const requestedTimeAvailable = mockAvailability[booking.time]

  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm?.({
      bookingId: booking.id,
      confirmedTime: booking.time
    })
    onClose()
  }

  const handleReschedule = () => {
    onReschedule?.({
      bookingId: booking.id,
      newTime: selectedTime
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[70] bg-surface/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 p-6 border-b border-outline-variant/10">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold tracking-tight text-on-surface">Booking Request</h2>
            <button 
              onClick={onClose}
              className="text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary">person</span>
            </div>
            <div>
              <h3 className="font-semibold text-on-surface">{booking.studentName}</h3>
              <p className="text-sm text-on-surface-variant">{booking.studentDept}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Booking Details */}
          <div className="bg-surface-container-low rounded-lg p-5 space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2">Topic</p>
              <p className="text-base font-medium text-on-surface">{booking.topic}</p>
            </div>
            <div className="h-px bg-outline-variant/20"></div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2">Requested Date</p>
                <p className="text-base font-medium text-on-surface">{booking.date}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2">Requested Time</p>
                <p className="text-base font-medium text-on-surface">{booking.time}</p>
              </div>
            </div>
          </div>

          {mode === "view" && (
            <>
              {/* Availability Status */}
              <div className={`rounded-lg p-5 border-l-4 flex items-start gap-3 ${
                requestedTimeAvailable 
                  ? 'bg-primary/10 border-primary' 
                  : 'bg-error/10 border-error'
              }`}>
                <span className={`material-symbols-outlined text-xl ${
                  requestedTimeAvailable ? 'text-primary' : 'text-error'
                }`}>
                  {requestedTimeAvailable ? 'check_circle' : 'cancel'}
                </span>
                <div>
                  <p className="font-semibold text-on-surface">
                    {requestedTimeAvailable ? 'Available' : 'Not Available'}
                  </p>
                  <p className="text-sm text-on-surface-variant">
                    {requestedTimeAvailable 
                      ? `You are available at ${booking.time}` 
                      : `You are not available at ${booking.time}`
                    }
                  </p>
                </div>
              </div>

              {/* Your Availability Today */}
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-on-surface mb-3">Your Availability Today</p>
                  <div className="text-xs text-on-surface-variant mb-3">
                    {Object.values(mockAvailability).filter(Boolean).length} slots available
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((time) => (
                    <div 
                      key={time}
                      className={`py-2 px-3 rounded-lg text-xs font-medium text-center ${
                        mockAvailability[time]
                          ? 'bg-secondary/10 text-secondary border border-secondary/30'
                          : 'bg-surface-container-high text-on-surface-variant line-through opacity-50'
                      }`}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                {requestedTimeAvailable ? (
                  <>
                    <button 
                      onClick={handleConfirm}
                      className="flex-1 py-3 px-4 rounded-lg font-semibold bg-gradient-to-br from-primary to-primary-container text-on-primary hover:brightness-110 shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined">check</span>
                      Confirm Booking
                    </button>
                    <button 
                      onClick={() => setMode("reschedule")}
                      className="flex-1 py-3 px-4 rounded-lg font-semibold bg-surface-container-high text-on-surface hover:bg-surface-container transition-all active:scale-[0.98]"
                    >
                      Suggest Different Time
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => setMode("reschedule")}
                      className="flex-1 py-3 px-4 rounded-lg font-semibold bg-gradient-to-br from-secondary to-secondary-container text-on-secondary hover:brightness-110 shadow-lg shadow-secondary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined">event_note</span>
                      Suggest Alternative Time
                    </button>
                    <button 
                      onClick={() => onReject?.(booking.id)}
                      className="flex-1 py-3 px-4 rounded-lg font-semibold bg-surface-container-high text-on-surface hover:bg-surface-container transition-all active:scale-[0.98]"
                    >
                      Decline
                    </button>
                  </>
                )}
              </div>
            </>
          )}

          {mode === "reschedule" && (
            <>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setMode("view")}
                    className="text-on-surface-variant hover:text-on-surface flex items-center gap-1 text-sm font-medium"
                  >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Back
                  </button>
                </div>
                <p className="text-sm font-semibold text-on-surface">Select an alternative time slot</p>
              </div>

              {/* Alternative Time Slots */}
              <div className="grid grid-cols-4 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    disabled={!mockAvailability[time]}
                    className={`py-3 px-3 rounded-lg font-semibold text-xs transition-all ${
                      selectedTime === time && mockAvailability[time]
                        ? 'bg-secondary text-on-secondary shadow-lg shadow-secondary/30 ring-2 ring-secondary/50'
                        : mockAvailability[time]
                        ? 'bg-secondary/10 text-secondary hover:bg-secondary/20'
                        : 'bg-surface-container-high text-on-surface-variant opacity-50 cursor-not-allowed'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>

              {/* Reschedule Summary */}
              <div className="bg-surface-container-low rounded-lg p-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">New Proposal</p>
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant">New Time:</span>
                  <span className="font-semibold text-on-surface">{selectedTime}</span>
                </div>
              </div>

              {/* Reschedule Buttons */}
              <div className="flex gap-3">
                <button 
                  onClick={() => setMode("view")}
                  className="flex-1 py-3 px-4 rounded-lg font-semibold bg-surface-container-high text-on-surface hover:bg-surface-container transition-all active:scale-[0.98]"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleReschedule}
                  className="flex-1 py-3 px-4 rounded-lg font-semibold bg-gradient-to-br from-secondary to-secondary-container text-on-secondary hover:brightness-110 shadow-lg shadow-secondary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">send</span>
                  Propose New Time
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
