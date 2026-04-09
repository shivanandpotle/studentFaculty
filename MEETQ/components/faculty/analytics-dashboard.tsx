"use client"

interface AnalyticsData {
  avgDuration: string
  studentsToday: number
  weeklyGoal: number
}

interface AnalyticsDashboardProps {
  data: AnalyticsData
}

export function AnalyticsDashboard({ data }: AnalyticsDashboardProps) {
  // Simulated heatmap data
  const heatmapData = [20, 45, 85, 100, 60, 30, 15]
  const days = ['Mon', 'Wed', 'Fri']
  
  return (
    <aside className="xl:col-span-4 flex flex-col gap-4 sm:gap-8">
      <div className="p-4 sm:p-8 rounded-lg bg-surface-container-low border border-outline-variant/10 h-fit">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-zinc-50 tracking-tight mb-6 sm:mb-8">Hub Analytics</h2>
        <div className="space-y-6 sm:space-y-8">
          {/* Peak Demand Heatmap */}
          <div>
            <span className="text-[9px] sm:text-xs text-on-surface-variant uppercase tracking-widest font-extrabold block mb-3 sm:mb-4">
              Peak Demand Heatmap
            </span>
            <div className="grid grid-cols-7 gap-1 h-24 sm:h-32 items-end">
              {heatmapData.map((value, i) => (
                <div 
                  key={i}
                  className="rounded-sm w-full transition-all"
                  style={{ 
                    height: `${value}%`,
                    backgroundColor: `rgb(99 102 241 / ${value / 100})`
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase">
              {days.map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-slate-100 dark:border-zinc-800">
              <span className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase">Avg. Duration</span>
              <div className="text-xl sm:text-2xl font-bold text-indigo-600 tracking-tighter">{data.avgDuration}</div>
            </div>
            <div className="p-3 sm:p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-slate-100 dark:border-zinc-800">
              <span className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase">Students Today</span>
              <div className="text-xl sm:text-2xl font-bold text-indigo-600 tracking-tighter">{data.studentsToday}</div>
            </div>
          </div>
          
          {/* Weekly Goal */}
          <div className="p-4 sm:p-6 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-800 text-white">
            <span className="text-[9px] sm:text-xs font-bold text-indigo-200 uppercase tracking-widest">Weekly Goal</span>
            <div className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{data.weeklyGoal}%</div>
            <div className="w-full bg-white/20 h-1.5 sm:h-2 rounded-full mt-3 sm:mt-4 overflow-hidden">
              <div 
                className="bg-white h-full transition-all" 
                style={{ width: `${data.weeklyGoal}%` }}
              />
            </div>
            <p className="text-[9px] sm:text-[11px] mt-3 sm:mt-4 text-indigo-100">
              You are ahead of last week&apos;s engagement schedule.
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
