"use client"

interface Student {
  id: string
  name: string
  department: string
  level: string
  reason: string
  priority?: "normal" | "high"
  isUrgent?: boolean
  avatar: string
}

interface QueuePanelProps {
  students: Student[]
  onAdmit?: (studentId: string) => void
}

export function QueuePanel({ students, onAdmit }: QueuePanelProps) {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-zinc-50 tracking-tight">Waiting Queue</h2>
        <span className="px-2 sm:px-3 py-1 rounded-full bg-surface-container-high text-[10px] sm:text-xs font-bold text-on-surface-variant tracking-widest whitespace-nowrap">
          {students.length} WAITING
        </span>
      </div>
      
      {students.map((student) => (
        <div 
          key={student.id}
          className={`p-4 sm:p-6 rounded-lg border border-outline-variant/10 transition-shadow group ${student.priority === "high" ? "bg-error/5 border-error/30 shadow-sm shadow-error/10" : "bg-surface-container-lowest hover:shadow-md"}`}
        >
          <div className="flex justify-between items-start mb-3 sm:mb-4 gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="relative shrink-0">
                <img 
                  alt={student.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-sm object-cover" 
                  src={student.avatar}
                />
                {student.isUrgent && (
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-error border-2 border-white rounded-full"></span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-zinc-50 leading-tight truncate">{student.name}</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant font-medium truncate">{student.department}, {student.level}</p>
              </div>
            </div>
            {student.isUrgent && (
              <span className="text-[10px] sm:text-xs font-bold bg-error-container text-on-error-container px-2 py-1 rounded whitespace-nowrap shrink-0">URGENT</span>
            )}
          </div>
          <div className="mb-3 sm:mb-4">
            <span className="text-[9px] sm:text-xs text-on-surface-variant uppercase tracking-widest font-bold">REASON</span>
            <p className="text-xs sm:text-sm text-on-surface font-medium line-clamp-2">{student.reason}</p>
          </div>
          <button 
            onClick={() => onAdmit?.(student.id)}
            className="w-full py-2.5 sm:py-3 rounded-md bg-surface-container-low text-primary text-xs sm:text-sm font-bold hover:bg-primary hover:text-white transition-colors duration-300 min-h-11 flex items-center justify-center"
          >
            ADMIT STUDENT
          </button>
        </div>
      ))}
    </div>
  )
}
