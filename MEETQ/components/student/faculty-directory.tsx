"use client"

import { useState } from "react"
import Link from "next/link"
import { BookSessionModal } from "./book-session-modal"

interface Faculty {
  id: string
  name: string
  department: string
  location: string
  status: "available" | "busy" | "in-session" | "offline"
  queueCount?: number
  expectedAt?: string
  sessionEndsIn?: string
  avatar: string
}

interface FacultyDirectoryProps {
  faculty: Faculty[]
  onBookSession?: (faculty: Faculty) => void
}

export function FacultyDirectory({ faculty, onBookSession }: FacultyDirectoryProps) {
  const getStatusConfig = (status: Faculty["status"]) => {
    switch (status) {
      case "available":
        return {
          label: "Available",
          bgClass: "bg-secondary/10",
          textClass: "text-secondary",
          ringClass: "ring-secondary",
          dotClass: "bg-secondary"
        }
      case "in-session":
        return {
          label: "In Session",
          bgClass: "bg-tertiary-fixed-dim/20",
          textClass: "text-tertiary-container",
          ringClass: "ring-tertiary-fixed-dim",
          dotClass: "bg-tertiary-fixed-dim"
        }
      case "busy":
        return {
          label: "Busy",
          bgClass: "bg-amber-100",
          textClass: "text-amber-700",
          ringClass: "ring-amber-300",
          dotClass: "bg-amber-500"
        }
      case "offline":
        return {
          label: "Offline",
          bgClass: "bg-slate-100",
          textClass: "text-slate-700",
          ringClass: "ring-slate-300",
          dotClass: "bg-slate-500"
        }
    }
  }
  
  return (
    <>
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-on-surface">Faculty Directory</h2>
            <p className="text-on-surface-variant font-medium">Real-time availability status</p>
          </div>
          <button className="text-primary font-semibold text-sm hover:underline flex items-center gap-1">
            View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
        
        {/* Bento-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculty.map((member) => {
            const config = getStatusConfig(member.status)
            const isClickable = member.status === "available"
            
            return (
              <div 
                key={member.id}
                onClick={() => {
                  if (isClickable) onBookSession?.(member)
                }}
                className={`group bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10 transition-all ${
                  isClickable ? 'hover:shadow-md active:scale-[0.98] cursor-pointer' : 'opacity-70'
                }`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="relative">
                    <img 
                      alt={member.name}
                      className={`w-16 h-16 rounded-full object-cover border-2 border-white ${config.ringClass ? `ring-2 ${config.ringClass}` : ''}`}
                      src={member.avatar}
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${config.dotClass} rounded-full border-2 border-white`}></div>
                  </div>
                  <span className={`text-[10px] font-semibold uppercase tracking-widest ${config.bgClass} ${config.textClass} px-3 py-1 rounded-full`}>
                    {config.label}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-on-surface mb-1">{member.name}</h3>
                <p className="text-on-surface-variant text-sm mb-4">{member.department} · {member.location}</p>
                <div className="flex items-center gap-2 text-xs font-medium text-on-surface-variant">
                  {member.status === "available" && (
                    <>
                      <span className="material-symbols-outlined text-sm">group</span>
                      {member.queueCount} students in queue
                    </>
                  )}
                  {member.status === "in-session" && (
                    <>
                      <span className="material-symbols-outlined text-sm">hourglass_bottom</span>
                      Session ends in {member.sessionEndsIn}
                    </>
                  )}
                  {member.status === "busy" && (
                    <>
                      <span className="material-symbols-outlined text-sm">priority_high</span>
                      Accepting limited requests
                    </>
                  )}
                  {member.status === "offline" && (
                    <>
                      <span className="material-symbols-outlined text-sm">do_not_disturb</span>
                      Offline until back
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
