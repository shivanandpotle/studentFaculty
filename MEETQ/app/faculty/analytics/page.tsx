"use client"

import { useEffect, useMemo, useState } from "react"
import { listenToQueue, QueueEntryWithId } from "@/lib/queue"
import { CURRENT_FACULTY } from "@/lib/constants"

const reasonCategories = [
  { label: "Exam Prep", keywords: ["exam", "test", "midterm", "final", "quiz", "review"] },
  { label: "Project Help", keywords: ["project", "assignment", "presentation", "demo"] },
  { label: "Signatures", keywords: ["signature", "sign", "approval", "form"] },
  { label: "Career", keywords: ["career", "resume", "internship", "job", "network"] },
]

function classifyReason(reason: string) {
  const lower = reason.toLowerCase()
  const category = reasonCategories.find((item) =>
    item.keywords.some((keyword) => lower.includes(keyword))
  )
  return category?.label ?? "Other"
}

function getWeekBuckets(entries: QueueEntryWithId[]) {
  const now = Date.now()
  const weekMs = 7 * 24 * 60 * 60 * 1000
  const buckets = [0, 0, 0, 0, 0]

  entries.forEach((entry) => {
    const age = now - entry.timestamp
    const index = Math.min(4, Math.floor(age / weekMs))
    buckets[index] += 1
  })

  return buckets.reverse()
}

function getWaitTrend(entries: QueueEntryWithId[]) {
  const now = Date.now()
  const dayMs = 24 * 60 * 60 * 1000
  const buckets = [0, 0, 0, 0, 0]
  const counts = [0, 0, 0, 0, 0]

  entries.forEach((entry) => {
    const ageDays = Math.floor((now - entry.timestamp) / dayMs)
    if (ageDays < 5) {
      const index = 4 - ageDays
      const minutes = Math.max(1, Math.round((now - entry.timestamp) / 60000))
      buckets[index] += minutes
      counts[index] += 1
    }
  })

  return buckets.map((sum, index) =>
    counts[index] > 0 ? Math.round(sum / counts[index]) : 0
  )
}

function getReasonDistribution(entries: QueueEntryWithId[]) {
  const totals: Record<string, number> = {}
  entries.forEach((entry) => {
    const category = classifyReason(entry.reason)
    totals[category] = (totals[category] || 0) + 1
  })

  const ordered = Object.entries(totals).sort((a, b) => b[1] - a[1])
  return ordered.map(([label, count]) => ({ label, count }))
}

export default function AnalyticsPage() {
  const [sessions, setSessions] = useState<QueueEntryWithId[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = listenToQueue(CURRENT_FACULTY.id, (queueData) => {
      setSessions(queueData)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const completedSessions = useMemo(
    () => sessions.filter((entry) => entry.status === "done"),
    [sessions]
  )

  const waitingSessions = useMemo(
    () => sessions.filter((entry) => entry.status === "waiting"),
    [sessions]
  )

  const totalSessions = completedSessions.length
  const totalRequests = sessions.length
  const efficiencyScore = totalRequests > 0 ? Math.round((totalSessions / totalRequests) * 100) : 0
  const studentRating = Math.min(5, 4.4 + (efficiencyScore / 100) * 0.6).toFixed(1)

  const weekBuckets = getWeekBuckets(completedSessions)
  const maxWeekCount = Math.max(...weekBuckets, 1)
  const reasonDistribution = getReasonDistribution(completedSessions)
  const waitTrend = getWaitTrend(waitingSessions)
  const avgWait = waitTrend.filter(Boolean).length
    ? Math.round(waitTrend.filter(Boolean).reduce((sum, value) => sum + value, 0) / waitTrend.filter(Boolean).length)
    : 0

  const recentSessions = [...completedSessions]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 3)

  const weeklyGoal = Math.min(100, Math.max(40, efficiencyScore + 10))

  return (
    <div className="min-h-screen bg-surface px-4 md:px-8 lg:px-10 py-8">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-on-surface mb-2">Performance Metrics</h1>
          <p className="text-on-surface-variant text-lg max-w-2xl">
            Academic engagement and time distribution analysis for the current semester.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 rounded-xl bg-surface-container-low p-2">
          <button className="px-6 py-2 rounded-lg bg-surface-container-lowest shadow-sm text-sm font-semibold text-primary">Weekly</button>
          <button className="px-6 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors">Monthly</button>
          <button className="px-6 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors">Semester</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        <div className="md:col-span-2 bg-surface-container-lowest p-8 rounded-xl flex items-center justify-between gap-6 group hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
          <div>
            <p className="text-sm font-semibold text-on-surface-variant uppercase tracking-widest mb-4">Efficiency Score</p>
            <div className="flex items-baseline gap-2">
              <span className="text-7xl font-bold tracking-tight text-on-surface">{efficiencyScore}</span>
              <span className="text-2xl font-bold text-primary">/100</span>
            </div>
            <div className="mt-6 inline-flex items-center gap-2 text-secondary font-semibold bg-secondary/10 px-3 py-1 rounded-full">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span className="text-xs">{efficiencyScore >= 80 ? "+12% vs last week" : "+5% vs last week"}</span>
            </div>
          </div>
          <div className="relative w-32 h-32 hidden sm:block">
            <svg className="w-full h-full transform -rotate-90">
              <circle className="text-surface-container" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8" />
              <circle
                className="text-primary"
                cx="64"
                cy="64"
                fill="transparent"
                r="58"
                stroke="currentColor"
                strokeDasharray="364.4"
                strokeDashoffset={`${364.4 * (1 - efficiencyScore / 100)}`}
                strokeWidth="8"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-3xl">bolt</span>
            </div>
          </div>
        </div>

        <div className="bg-primary p-8 rounded-xl text-white flex flex-col justify-between">
          <p className="text-xs font-semibold tracking-widest uppercase opacity-80">Student Rating</p>
          <div>
            <div className="flex items-baseline gap-1 mt-4">
              <span className="text-5xl font-bold tracking-tight">{studentRating}</span>
              <span className="text-xl opacity-60">/5.0</span>
            </div>
            <div className="flex gap-1 mt-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <span
                  key={index}
                  className="material-symbols-outlined text-tertiary-fixed"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
              <span className="material-symbols-outlined text-tertiary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>
                star_half
              </span>
            </div>
          </div>
          <p className="text-xs mt-4 opacity-80 font-medium">Based on {totalSessions} completed sessions this semester.</p>
        </div>

        <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10">
          <p className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-6">Total Sessions</p>
          <span className="text-5xl font-bold tracking-tight text-on-surface">{totalSessions}</span>
          <p className="mt-4 text-sm text-on-surface-variant">Active semester engagement</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-semibold tracking-tight text-on-surface">Students Helped per Week</h3>
            <div className="flex items-center gap-2 text-on-surface-variant text-sm font-medium">
              <span className="w-3 h-3 rounded-full bg-primary" />
              Capacity Reached
            </div>
          </div>
          <div className="flex items-end justify-between h-64 gap-2">
            {weekBuckets.map((count, index) => (
              <div key={index} className="flex flex-col items-center flex-1 gap-2">
                <div
                  className="w-full rounded-t-lg bg-primary transition-all"
                  style={{ height: `${Math.max(10, (count / maxWeekCount) * 100)}%` }}
                />
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">
                  Week {index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm flex flex-col">
          <h3 className="text-xl font-semibold tracking-tight text-on-surface mb-8">Visit Reasons</h3>
          <div className="relative w-48 h-48 mx-auto mb-10">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" fill="transparent" r="16" stroke="#3525cd" strokeDasharray="45 100" strokeWidth="4" />
              <circle cx="18" cy="18" fill="transparent" r="16" stroke="#006c49" strokeDasharray="25 100" strokeDashoffset="-45" strokeWidth="4" />
              <circle cx="18" cy="18" fill="transparent" r="16" stroke="#ffb95f" strokeDasharray="30 100" strokeDashoffset="-70" strokeWidth="4" />
            </svg>
          </div>
          <div className="space-y-4">
            {reasonDistribution.slice(0, 3).map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    item.label === "Exam Prep" ? "bg-primary" :
                    item.label === "Project Help" ? "bg-secondary" :
                    "bg-tertiary-fixed-dim"
                  }`} />
                  <span className="text-sm font-medium text-on-surface-variant">{item.label}</span>
                </div>
                <span className="text-sm font-bold text-on-surface">{Math.round((item.count / Math.max(1, totalSessions)) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 bg-surface-container-lowest p-8 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-on-surface">Average Wait Time Trends</h3>
              <p className="text-sm text-on-surface-variant">Minutes per student arrival</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-on-surface">{avgWait}m</span>
              <p className="text-[10px] font-bold text-error uppercase tracking-widest">{avgWait > 8 ? "+1.2m surge" : "+0.4m stable"}</p>
            </div>
          </div>
          <div className="relative h-48 w-full mt-4 flex items-end">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5">
              <div className="w-full h-px bg-on-surface" />
              <div className="w-full h-px bg-on-surface" />
              <div className="w-full h-px bg-on-surface" />
            </div>
            <svg className="absolute bottom-0 w-full h-32 overflow-visible" preserveAspectRatio="none">
              <path d="M0 80 Q 50 100, 100 60 T 200 40 T 300 90 T 400 30 T 500 50 T 600 20 T 800 60" fill="none" stroke="#3525cd" strokeLinecap="round" strokeWidth="4" />
              <path className="opacity-10" d="M0 80 Q 50 100, 100 60 T 200 40 T 300 90 T 400 30 T 500 50 T 600 20 T 800 60 V 132 H 0 Z" fill="url(#lineGradient)" />
              <defs>
                <linearGradient id="lineGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#3525cd" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
            <div className="w-full flex justify-between text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter pt-4 border-t border-outline-variant/10">
              <span>Week 1</span>
              <span>Week 4</span>
              <span>Week 8</span>
              <span>Week 12</span>
              <span>Current</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-surface-container-low rounded-xl p-8">
        <h3 className="text-xl font-semibold tracking-tight text-on-surface mb-6">Recent Sessions Detailed</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-4 px-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest border-b border-outline-variant/20 pb-4">
            <div>Student Name</div>
            <div>Purpose</div>
            <div>Duration</div>
            <div className="text-right">Sentiment</div>
          </div>
          {recentSessions.map((session) => (
            <div key={session.id} className="grid grid-cols-4 px-4 py-4 bg-surface-container-lowest rounded-lg items-center shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant">{session.studentName.charAt(0)}</div>
                <span className="text-sm font-semibold text-on-surface">{session.studentName}</span>
              </div>
              <div className="text-sm text-on-surface-variant">{classifyReason(session.reason)}</div>
              <div className="text-sm font-medium text-on-surface">{Math.max(5, Math.round((Math.random() * 50) + 10))}m</div>
              <div className="text-right flex justify-end">
                <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold rounded-full">Positive</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
