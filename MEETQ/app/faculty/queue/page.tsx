"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { CURRENT_FACULTY } from "@/lib/constants"
import { listenToQueue, QueueEntryWithId, verifyQueueToken } from "@/lib/queue"

export default function FacultyQueuePage() {
  const [queue, setQueue] = useState<QueueEntryWithId[]>([])
  const [tokenInput, setTokenInput] = useState("")
  const [verificationMessage, setVerificationMessage] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)

  useEffect(() => {
    const unsubscribe = listenToQueue(CURRENT_FACULTY.id, setQueue)
    return unsubscribe
  }, [])

  const handleVerifyToken = async () => {
    if (!tokenInput.trim()) {
      setVerificationMessage("Enter a token ID to verify.")
      return
    }

    setIsVerifying(true)
    setVerificationMessage(null)

    const entry = await verifyQueueToken(CURRENT_FACULTY.id, tokenInput.trim())
    if (entry) {
      setVerificationMessage(`Verified ${entry.studentName}. Status moved to active.`)
      setTokenInput("")
    } else {
      setVerificationMessage("Token not found or already used.")
    }

    setIsVerifying(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="mb-4">
        <h1 className="text-4xl font-bold tracking-tight text-on-surface mb-2">Queue Management</h1>
        <p className="text-on-surface-variant text-lg">Manage your office hours queue in real-time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface-container-lowest p-6 rounded-xl text-center">
          <span className="text-4xl font-bold text-primary">{queue.length}</span>
          <p className="text-sm text-on-surface-variant mt-1">In Queue</p>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl text-center">
          <span className="text-4xl font-bold text-tertiary-fixed-dim">~{queue.length * 8 || 10}m</span>
          <p className="text-sm text-on-surface-variant mt-1">Avg. Wait</p>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl text-center">
          <span className="text-4xl font-bold text-secondary">{queue.filter((entry) => entry.status === "active").length}</span>
          <p className="text-sm text-on-surface-variant mt-1">Active Sessions</p>
        </div>
      </div>

      <section className="rounded-3xl bg-slate-950/95 p-6 shadow-lg shadow-slate-900/10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Scan QR</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Verify student tokens</h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              Enter a token ID manually or paste the scanned code to confirm the student and move them into session.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <input
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="Paste token ID"
              className="w-full md:w-80 rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleVerifyToken}
              disabled={isVerifying}
              className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-50"
            >
              {isVerifying ? "Verifying..." : "Verify Token"}
            </button>
          </div>
        </div>
        {verificationMessage && (
          <p className="mt-4 text-sm text-slate-200">{verificationMessage}</p>
        )}
      </section>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-on-surface">Waiting Students</h2>
          <span className="px-3 py-1 rounded-full bg-slate-900 text-xs font-bold text-slate-300 uppercase tracking-widest">
            {queue.length} waiting
          </span>
        </div>

        {queue.map((student, index) => (
          <div key={student.id} className="p-6 rounded-xl bg-surface-container-lowest border border-outline-variant/10 hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <span className="absolute -top-2 -left-2 w-6 h-6 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {index + 1}
                  </span>
                  <Image
                    src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=80&q=80"
                    alt={student.studentName}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full border-2 border-white object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-on-surface">{student.studentName}</h3>
                  <p className="text-sm text-on-surface-variant">{student.reason}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <span className="rounded-full bg-slate-900/90 px-3 py-1 text-xs font-semibold text-slate-200 uppercase tracking-[0.25em]">
                  {student.status}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-900">
                  {student.tokenId.slice(0, 8).toUpperCase()}
                </span>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  #{index + 1}
                </span>
              </div>
            </div>
          </div>
        ))}

        {queue.length === 0 && (
          <div className="p-12 rounded-xl bg-surface-container-low text-center">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4">inbox</span>
            <h3 className="text-xl font-semibold text-on-surface mb-2">Queue Empty</h3>
            <p className="text-on-surface-variant">No students are currently waiting.</p>
          </div>
        )}
      </div>
    </div>
  )
}
