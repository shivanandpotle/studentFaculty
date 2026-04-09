"use client"

interface WaitScreenProps {
  position: number
  courseName: string
  estimatedWait: number
  studentsInFront: number
  avgSessionTime: number
  onLeaveQueue?: () => void
}

export function WaitScreen({ 
  position, 
  courseName, 
  estimatedWait, 
  studentsInFront, 
  avgSessionTime,
  onLeaveQueue 
}: WaitScreenProps) {
  return (
    <div className="min-h-[calc(100vh-180px)] flex flex-col max-w-lg mx-auto">
      {/* Hero Status Section */}
      <header className="text-center mb-10">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-semibold uppercase tracking-widest mb-4">
          <span className="w-2 h-2 rounded-full bg-secondary mr-2 animate-pulse"></span>
          Active Queue
        </span>
        <h1 className="text-[3.5rem] font-bold tracking-[-0.04em] text-on-surface leading-none mb-2">
          You are #{position}
        </h1>
        <p className="text-on-surface-variant text-lg font-medium">{courseName}: Office Hours</p>
      </header>
      
      {/* Position Animation & Timer Bento */}
      <div className="space-y-6">
        {/* Central Visualizer */}
        <div className="bg-surface-container-lowest rounded-xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border-[1px] border-primary rounded-full animate-pulse-slow"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border-[1px] border-primary rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          </div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full editorial-gradient flex items-center justify-center text-white mb-6 shadow-xl shadow-primary/20">
              <span className="material-symbols-outlined text-4xl">hourglass_empty</span>
            </div>
            <div className="text-center">
              <p className="text-on-surface-variant font-semibold text-[0.75rem] uppercase tracking-widest mb-1">Estimated Wait</p>
              <p className="text-3xl font-bold tracking-tight text-primary">~{estimatedWait} mins</p>
            </div>
          </div>
          {/* SMA Visualizer dots */}
          <div className="flex space-x-2 mt-8">
            <div className="w-2 h-2 rounded-full bg-primary/20"></div>
            <div className="w-2 h-2 rounded-full bg-primary/40"></div>
            <div className="w-2 h-2 rounded-full bg-primary/60"></div>
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
            <div className="w-2 h-2 rounded-full bg-primary/10"></div>
          </div>
        </div>
        
        {/* Queue Context Asymmetric Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-container-low rounded-md p-5 flex flex-col justify-between">
            <span className="material-symbols-outlined text-on-surface-variant mb-4">group</span>
            <div>
              <p className="text-[0.75rem] font-semibold text-on-surface-variant uppercase tracking-widest">In Front</p>
              <p className="text-xl font-bold text-on-surface">{studentsInFront} Students</p>
            </div>
          </div>
          <div className="bg-surface-container-low rounded-md p-5 flex flex-col justify-between">
            <span className="material-symbols-outlined text-on-surface-variant mb-4">bolt</span>
            <div>
              <p className="text-[0.75rem] font-semibold text-on-surface-variant uppercase tracking-widest">Avg Session</p>
              <p className="text-xl font-bold text-on-surface">{avgSessionTime} mins</p>
            </div>
          </div>
        </div>
        
        {/* Teaser Micro-Survey */}
        <div className="bg-tertiary-fixed p-6 rounded-xl relative overflow-hidden group transition-all hover:bg-tertiary-fixed/90">
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-2">
              <span className="material-symbols-outlined text-on-tertiary-fixed-variant" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <h3 className="font-bold text-on-tertiary-fixed text-lg">Help us synchronize</h3>
            </div>
            <p className="text-on-tertiary-fixed-variant text-sm leading-relaxed max-w-[80%]">
              After your session, a 20-second survey helps MeetQ optimize future scheduling.
            </p>
          </div>
          <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl text-on-tertiary-fixed opacity-5 group-hover:rotate-12 transition-transform duration-500">rate_review</span>
        </div>
        
        {/* Action Area */}
        <div className="pt-4">
          <button 
            onClick={onLeaveQueue}
            className="w-full h-14 bg-error-container text-on-error-container rounded-xl font-semibold flex items-center justify-center space-x-2 active:scale-95 transition-all duration-200"
          >
            <span className="material-symbols-outlined">exit_to_app</span>
            <span>Leave Queue</span>
          </button>
          <p className="text-center mt-4 text-on-surface-variant text-[0.75rem] font-medium italic">
            Leaving now will forfeit your current position.
          </p>
        </div>
      </div>
    </div>
  )
}
