"use client"

export type FacultyStatus = "available" | "busy" | "in-session" | "offline"

interface AvailabilityToggleProps {
  status: FacultyStatus
  onStatusChange: (status: FacultyStatus) => void
}

const statusItems: { value: FacultyStatus; label: string; color: string }[] = [
  { value: "available", label: "Available", color: "bg-secondary text-secondary" },
  { value: "busy", label: "Busy", color: "bg-amber-100 text-amber-700" },
  { value: "in-session", label: "In Session", color: "bg-error/10 text-error" },
  { value: "offline", label: "Offline", color: "bg-slate-100 text-slate-700" },
]

export function AvailabilityToggle({ status, onStatusChange }: AvailabilityToggleProps) {
  const current = statusItems.find((item) => item.value === status) || statusItems[3]

  return (
    <section className="mb-6 sm:mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-slate-900 dark:text-zinc-50 font-bold tracking-tight text-2xl sm:text-3xl mb-1 sm:mb-2">Faculty Hub</h1>
        <div className="flex flex-wrap items-center gap-3">
          <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${current.color}`}>
            <span className={`w-2.5 h-2.5 rounded-full ${status === "available" ? "bg-secondary" : status === "busy" ? "bg-amber-500" : status === "in-session" ? "bg-error" : "bg-slate-500"}`}></span>
            {current.label}
          </span>
          <span className="text-on-surface-variant text-sm">
            {status === "available"
              ? "Accepting new queue requests."
              : status === "busy"
              ? "Limited queue intake."
              : status === "in-session"
              ? "Active session in progress."
              : "Currently offline."}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {statusItems.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => onStatusChange(item.value)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${status === item.value ? "ring-2 ring-primary bg-primary/10 text-primary" : "bg-surface-container-high text-on-surface hover:bg-surface-container"}`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </section>
  )
}
