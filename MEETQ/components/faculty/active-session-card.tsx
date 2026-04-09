"use client"

import { useState, useEffect } from "react"

interface ActiveSessionProps {
  student: {
    name: string
    reason: string
    avatar: string
  } | null
  onReschedule?: () => void
  onEndSession?: () => void
}

export function ActiveSessionCard({ student, onReschedule, onEndSession }: ActiveSessionProps) {
  const [elapsed, setElapsed] = useState(0)
  
  useEffect(() => {
    if (!student) return
    
    const interval = setInterval(() => {
      setElapsed((prev) => prev + 1)
    }, 1000)
    
    return () => clearInterval(interval)
  }, [student])
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  if (!student) {
    return (
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-zinc-50 tracking-tight">Active Session</h2>
          <span className="px-2 sm:px-3 py-1 rounded-full bg-surface-container-high text-[10px] sm:text-xs font-bold text-on-surface-variant tracking-widest uppercase whitespace-nowrap">
            NO SESSION
          </span>
        </div>
        <div className="relative p-6 sm:p-10 rounded-xl bg-surface-container-low border border-outline-variant/10 flex flex-col items-center text-center">
          <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-surface-container-high flex items-center justify-center mb-4 sm:mb-6">
            <span className="material-symbols-outlined text-2xl sm:text-4xl text-on-surface-variant">person_off</span>
          </div>
          <p className="text-xs sm:text-base text-on-surface-variant font-medium">No active session</p>
          <p className="text-[10px] sm:text-sm text-on-surface-variant/70">Admit a student from the queue to start</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-zinc-50 tracking-tight">Active Session</h2>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
          <span className="px-2 sm:px-3 py-1 rounded-full bg-tertiary-fixed text-[10px] sm:text-xs font-bold text-on-tertiary-fixed-variant tracking-widest uppercase whitespace-nowrap">
            IN SESSION
          </span>
        </div>
      </div>
      <div className="relative p-6 sm:p-10 rounded-xl bg-linear-to-br from-white to-surface-container-low border border-indigo-100 flex flex-col items-center text-center shadow-2xl">
        <div className="relative mb-4 sm:mb-6">
          <div className="absolute -inset-4 bg-tertiary-fixed-dim/20 rounded-full blur-xl"></div>
          <img 
            alt={student.name}
            className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-4 border-white relative z-10 object-cover" 
            src={student.avatar}
          />
        </div>
        <h3 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-zinc-50 mb-1 truncate">{student.name}</h3>
        <p className="text-xs sm:text-base text-on-surface-variant font-medium mb-4 sm:mb-8 line-clamp-2">{student.reason}</p>
        <div className="text-4xl sm:text-6xl font-extrabold tracking-tighter text-indigo-600 mb-6 sm:mb-8 font-mono">
          {formatTime(elapsed)}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
          <button 
            onClick={onReschedule}
            className="flex-1 py-2.5 sm:py-4 bg-white border border-outline-variant text-slate-900 text-xs sm:text-base rounded-xl font-bold hover:bg-slate-50 transition-colors active:scale-95 min-h-11 flex items-center justify-center"
          >
            RE-SCHEDULE
          </button>
          <button 
            onClick={onEndSession}
            className="flex-1 py-2.5 sm:py-4 bg-error text-white text-xs sm:text-base rounded-xl font-bold hover:opacity-90 shadow-lg active:scale-95 transition-transform min-h-11 flex items-center justify-center"
          >
            END SESSION
          </button>
        </div>
      </div>
    </div>
  )
}
