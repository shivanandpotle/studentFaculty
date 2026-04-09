"use client"

interface AIBannerProps {
  topic: string
  studentCount: number
  onGroupSession?: () => void
}

export function AIBanner({ topic, studentCount, onGroupSession }: AIBannerProps) {
  if (studentCount < 2) return null
  
  return (
    <div className="mb-10 p-5 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center gap-4 shadow-sm border border-outline-variant/10">
      <span className="text-2xl">💡</span>
      <p className="font-medium text-lg tracking-tight">
        {studentCount} students waiting about <span className="font-bold underline decoration-indigo-300">{topic}</span> — Call Together?
      </p>
      <button 
        onClick={onGroupSession}
        className="ml-auto px-4 py-2 bg-primary text-white rounded-full text-sm font-bold active:scale-95 transition-transform"
      >
        GROUP SESSION
      </button>
    </div>
  )
}
