"use client"

import { useEffect, useState } from "react"
import { listenToQueue, QueueEntryWithId } from "@/lib/queue"
import { CURRENT_FACULTY } from "@/lib/constants"

interface SessionData extends QueueEntryWithId {
  duration?: number // in minutes
  type?: "individual" | "group"
  satisfaction?: number // 1-5
}

export function SessionHistory() {
  const [sessions, setSessions] = useState<SessionData[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"all" | "individual" | "group">("all")
  const [range, setRange] = useState<"semester" | "monthly" | "weekly">("semester")
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = listenToQueue(CURRENT_FACULTY.id, (queueData) => {
      const completedSessions = queueData.filter((entry) => entry.status === "done")
      const transformedSessions: SessionData[] = completedSessions.map((session) => ({
        ...session,
        duration: Math.floor(Math.random() * 60) + 15,
        type: Math.random() > 0.8 ? "group" : "individual",
        satisfaction: Math.floor(Math.random() * 5) + 1,
      }))
      setSessions(transformedSessions)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const totalSessions = sessions.length
  const avgSatisfaction = sessions.length > 0
    ? Math.round((sessions.reduce((sum, s) => sum + (s.satisfaction || 0), 0) / sessions.length) * 20) // Convert to percentage
    : 0

  const displayedSessions = sessions.filter((session) => {
    if (viewMode === "all") return true
    return session.type === viewMode
  })

  const handleDownloadCsv = () => {
    const header = ["Student Name", "Student ID", "Date", "Time", "Duration", "Purpose", "Type", "Satisfaction"]
    const rows = displayedSessions.map((session) => [
      session.studentName,
      session.studentId,
      new Date(session.timestamp).toLocaleDateString(),
      new Date(session.timestamp).toLocaleTimeString(),
      `${session.duration} mins`,
      session.reason,
      session.type,
      `${session.satisfaction}%`,
    ])
    const csv = [header, ...rows].map((row) => row.map((item) => `"${String(item).replace(/"/g, '""')}"`).join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `session-history-${range}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleRowAction = (id: string) => {
    console.log("Session action clicked", id)
  }

  if (loading) {
    return (
      <section className="space-y-8">
        <div className="animate-pulse">
          <div className="h-8 bg-surface-container-low rounded w-1/4 mb-4"></div>
          <div className="h-32 bg-surface-container-low rounded mb-8"></div>
          <div className="h-64 bg-surface-container-low rounded"></div>
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-7">
          <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-2">Academic Records</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-on-surface mb-4">Session History</h3>
          <p className="text-on-surface-variant text-lg max-w-xl">
            Review and manage past student engagements. Orchestrate your feedback loops with precise data and historical context.
          </p>
        </div>
        <div className="md:col-span-5 flex justify-end space-x-8">
          <div className="text-right">
            <span className="block text-3xl font-bold tracking-tighter text-on-surface">{totalSessions}</span>
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Total Sessions</span>
          </div>
          <div className="text-right">
            <span className="block text-3xl font-bold tracking-tighter text-secondary">{avgSatisfaction}%</span>
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Satisfaction</span>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="flex bg-surface-container-low p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setViewMode("all")}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold ${viewMode === "all" ? "bg-white shadow-sm text-primary" : "text-on-surface-variant hover:text-on-surface"}`}
            >
              All Sessions
            </button>
            <button
              type="button"
              onClick={() => setViewMode("individual")}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold ${viewMode === "individual" ? "bg-white shadow-sm text-primary" : "text-on-surface-variant hover:text-on-surface"}`}
            >
              Individual
            </button>
            <button
              type="button"
              onClick={() => setViewMode("group")}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold ${viewMode === "group" ? "bg-white shadow-sm text-primary" : "text-on-surface-variant hover:text-on-surface"}`}
            >
              Group
            </button>
          </div>
          <div className="h-8 w-px bg-outline-variant/30" />
          <div className="flex items-center rounded-lg bg-surface-container-low p-1">
            <button
              type="button"
              onClick={() => setRange("semester")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${range === "semester" ? "bg-white text-on-surface" : "text-on-surface-variant hover:text-on-surface"}`}
            >
              Semester
            </button>
            <button
              type="button"
              onClick={() => setRange("monthly")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${range === "monthly" ? "bg-white text-on-surface" : "text-on-surface-variant hover:text-on-surface"}`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setRange("weekly")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${range === "weekly" ? "bg-white text-on-surface" : "text-on-surface-variant hover:text-on-surface"}`}
            >
              Weekly
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setFiltersOpen((prev) => !prev)}
            className="flex items-center space-x-2 text-sm font-semibold text-on-surface px-4 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-lg">filter_list</span>
            <span>More Filters</span>
          </button>
          <button
            type="button"
            onClick={handleDownloadCsv}
            className="flex items-center space-x-2 text-sm font-semibold text-white px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">download</span>
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {filtersOpen && (
        <div className="bg-surface-container-low rounded-xl p-4 shadow-sm border border-outline-variant/60">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setViewMode("all")}
                className={`px-4 py-3 rounded-2xl text-sm font-semibold transition ${viewMode === "all" ? "bg-white text-primary" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container"}`}
              >
                Show All
              </button>
              <button
                type="button"
                onClick={() => setViewMode("individual")}
                className={`px-4 py-3 rounded-2xl text-sm font-semibold transition ${viewMode === "individual" ? "bg-white text-primary" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container"}`}
              >
                Individual Only
              </button>
              <button
                type="button"
                onClick={() => setViewMode("group")}
                className={`px-4 py-3 rounded-2xl text-sm font-semibold transition ${viewMode === "group" ? "bg-white text-primary" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container"}`}
              >
                Group Only
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setRange("weekly")}
                className={`px-4 py-3 rounded-2xl text-sm font-semibold transition ${range === "weekly" ? "bg-white text-primary" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container"}`}
              >
                Weekly
              </button>
              <button
                type="button"
                onClick={() => setRange("monthly")}
                className={`px-4 py-3 rounded-2xl text-sm font-semibold transition ${range === "monthly" ? "bg-white text-primary" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container"}`}
              >
                Monthly
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="bg-surface-container-low rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left">
                <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Student</th>
                <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Date & Time</th>
                <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Duration</th>
                <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Purpose</th>
                <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {displayedSessions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-on-surface-variant">
                    No completed sessions yet.
                  </td>
                </tr>
              ) : (
                displayedSessions.map((session) => (
                  <tr key={session.id} className="bg-surface-container-lowest hover:bg-surface-container-low transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full ring-2 ring-outline-variant/20 overflow-hidden bg-surface-container-high flex items-center justify-center">
                          <span className="material-symbols-outlined text-on-surface-variant">person</span>
                        </div>
                        <div>
                          <p className="font-semibold text-on-surface">{session.studentName}</p>
                          <p className="text-xs text-on-surface-variant">Student ID: {session.studentId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-medium text-on-surface">{new Date(session.timestamp).toLocaleDateString()}</p>
                      <p className="text-xs text-on-surface-variant">{new Date(session.timestamp).toLocaleTimeString()}</p>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-surface-variant/50 rounded-full text-xs font-semibold text-on-surface">{session.duration} mins</span>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm text-on-surface line-clamp-1">{session.reason}</p>
                    </td>
                    <td className="px-6 py-5">
                      <div className={`flex items-center space-x-1.5 ${session.type === 'individual' ? 'text-secondary' : 'text-tertiary'}`}>
                        <span className={`w-2 h-2 rounded-full bg-current`}></span>
                        <span className="text-[10px] font-bold uppercase tracking-widest">{session.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button
                        type="button"
                        onClick={() => handleRowAction(session.id)}
                        className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors"
                      >
                        more_vert
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  )
}

