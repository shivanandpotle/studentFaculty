"use client"

import { useState } from "react"

interface DigitalTokenCardProps {
  tokenId: string
  qrCode: string
  status: "waiting" | "active" | "done"
  facultyName: string
  reason: string
  position: number
  estimatedWait: number
}

export function DigitalTokenCard({
  tokenId,
  qrCode,
  status,
  facultyName,
  reason,
  position,
  estimatedWait,
}: DigitalTokenCardProps) {
  const [showQR, setShowQR] = useState(false)

  const statusLabel = status === "waiting" ? "Waiting" : status === "active" ? "Active" : "Completed"
  const badgeClass =
    status === "active"
      ? "bg-emerald-100 text-emerald-800"
      : status === "waiting"
      ? "bg-amber-100 text-amber-800"
      : "bg-slate-100 text-slate-800"

  return (
    <section className="rounded-3xl border border-outline-variant/20 bg-surface-container-low p-6 shadow-lg shadow-slate-900/5">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              Your Digital Token
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}>
              {statusLabel}
            </span>
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-semibold tracking-tight text-on-surface">{facultyName}</h2>
            <p className="text-sm text-on-surface-variant max-w-2xl">{reason}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl bg-surface-container-high p-4 text-sm text-on-surface">
              <p className="text-[10px] uppercase tracking-[0.35em] text-on-surface-variant">Token</p>
              <p className="mt-2 font-semibold">{tokenId.slice(0, 8).toUpperCase()}</p>
            </div>
            <div className="rounded-3xl bg-surface-container-high p-4 text-sm text-on-surface">
              <p className="text-[10px] uppercase tracking-[0.35em] text-on-surface-variant">Position</p>
              <p className="mt-2 font-semibold">#{position}</p>
            </div>
            <div className="rounded-3xl bg-surface-container-high p-4 text-sm text-on-surface">
              <p className="text-[10px] uppercase tracking-[0.35em] text-on-surface-variant">Estimate</p>
              <p className="mt-2 font-semibold">{estimatedWait} min</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowQR((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
          >
            {showQR ? "Hide QR at Door" : "Show QR at Door"}
          </button>
        </div>

        <div className="flex-1 rounded-3xl bg-slate-950/95 p-6 shadow-inner shadow-slate-900/10 text-center">
          {showQR ? (
            <div className="inline-flex flex-col items-center gap-4">
              <img src={qrCode} alt="Digital Token QR" className="h-52 w-52 rounded-3xl bg-white p-3 shadow-lg" />
              <p className="text-sm text-slate-300">Present this QR code when you arrive at the door.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="h-52 w-52 rounded-3xl bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-500">
                <span className="text-sm">QR code hidden</span>
              </div>
              <p className="text-sm text-slate-400">Tap the button to reveal the token QR code for verification.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
