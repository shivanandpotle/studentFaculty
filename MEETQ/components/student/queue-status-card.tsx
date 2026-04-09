"use client"

interface QueueStatusCardProps {
  facultyName: string
  department: string
  position: number
  estimatedWait: number
}

export function QueueStatusCard({ facultyName, department, position, estimatedWait }: QueueStatusCardProps) {
  return (
    <section className="relative overflow-hidden bg-primary-container rounded-xl p-8 text-on-primary-container">
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="space-y-2 text-center md:text-left">
          <p className="text-[10px] font-semibold uppercase tracking-widest opacity-80">Current Queue Session</p>
          <h2 className="text-3xl font-bold tracking-tight">{facultyName}</h2>
          <p className="text-lg font-medium opacity-90">{department}</p>
        </div>
        <div className="flex gap-4 md:gap-8">
          <div className="flex flex-col items-center glass-card rounded-lg p-6 min-w-[120px] bg-white/10">
            <span className="text-5xl font-bold tracking-tighter">#{position}</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest mt-2">Position</span>
          </div>
          <div className="flex flex-col items-center glass-card rounded-lg p-6 min-w-[120px] bg-white/10">
            <span className="text-5xl font-bold tracking-tighter">~{estimatedWait}</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest mt-2">Mins Wait</span>
          </div>
        </div>
      </div>
      {/* Atmospheric Gradient Glow */}
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary-fixed/20 blur-[80px] rounded-full"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/40 to-transparent pointer-events-none"></div>
    </section>
  )
}
