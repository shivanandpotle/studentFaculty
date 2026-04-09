"use client"

import { useState } from "react"
import Link from "next/link"

export default function NewSessionPage() {
  const [studentSearch, setStudentSearch] = useState("")
  const [sessionType, setSessionType] = useState("individual")
  const [duration, setDuration] = useState("30")
  const [objective, setObjective] = useState("")

  const handleStartSession = () => {
    console.log({
      studentSearch,
      sessionType,
      duration,
      objective,
    })
    // Handle session creation logic here
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface pb-24 md:pb-0">
      {/* Sidebar */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-zinc-50 dark:bg-zinc-900 flex flex-col p-4 space-y-6 font-inter text-sm hidden md:flex">
        <div className="flex items-center space-x-3 px-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
            <span className="material-symbols-outlined">school</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Faculty Portal
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant">
              Efficiency Orchestrator
            </p>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          <Link
            href="/faculty"
            className="flex items-center space-x-3 px-4 py-3 bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 shadow-sm rounded-xl font-medium active:translate-x-1 duration-150 transition-all"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </Link>
          <a
            href="#"
            className="flex items-center space-x-3 px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 rounded-xl transition-all active:translate-x-1 duration-150"
          >
            <span className="material-symbols-outlined">analytics</span>
            <span>Analytics</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 rounded-xl transition-all active:translate-x-1 duration-150"
          >
            <span className="material-symbols-outlined">mail</span>
            <span>Messages</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 rounded-xl transition-all active:translate-x-1 duration-150"
          >
            <span className="material-symbols-outlined">history</span>
            <span>History</span>
          </a>
        </nav>
        <div className="mt-auto space-y-1 border-t border-outline-variant/15 pt-4">
          <a
            href="#"
            className="flex items-center space-x-3 px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 rounded-xl transition-all"
          >
            <span className="material-symbols-outlined">help</span>
            <span>Help Center</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 rounded-xl transition-all"
          >
            <span className="material-symbols-outlined">logout</span>
            <span>Log Out</span>
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="md:ml-64 min-h-screen relative flex flex-col">
        {/* Top Nav */}
        <header className="w-full sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 shadow-sm dark:shadow-none font-inter tracking-tight">
          <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm sm:text-base">
                search
              </span>
              <input
                className="w-full bg-surface-container-low border-none rounded-full py-2 sm:py-2.5 pl-9 sm:pl-10 pr-3 sm:pr-4 focus:ring-2 focus:ring-primary/20 text-xs sm:text-sm"
                placeholder="Search students..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3 sm:space-x-6 pl-2 sm:pl-4">
            <div className="hidden lg:flex items-center space-x-2 sm:space-x-4">
              <span className="material-symbols-outlined text-zinc-500 dark:text-zinc-400 cursor-pointer hover:bg-zinc-50 transition-colors p-1.5 sm:p-2 rounded-full text-sm sm:text-base">
                notifications
              </span>
              <span className="material-symbols-outlined text-zinc-500 dark:text-zinc-400 cursor-pointer hover:bg-zinc-50 transition-colors p-1.5 sm:p-2 rounded-full text-sm sm:text-base">
                settings
              </span>
            </div>
            <div className="hidden sm:flex items-center space-x-2 pl-2 sm:pl-4 border-l border-outline-variant/20">
              <img
                alt="Professor Profile Avatar"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-primary/10"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBId7h7P6wu-j_aKZR7oW6NEyNnmIvr8wZ8h6MY_WN67tNA6c_virHiTsSJqzhKevUR3DLcS0a8Mw5BtLAbhcK0qCpQpVE9qa22WKbsHZ0eyKz26Td_ulFx35Jklqo_V3rnej52gOKTw9VE3iYzwgaz9x1boIPNLDlgCkHBQ0YAO7HS98m4rOAMxXxm_6MK6Nqb5rMpUsPhbpMf__qn6uJ8KeR5E1BEnMwUcMJ7x3jx5qJwQv-HFh_ZcoQ_9ustxKw887nGDDP8POo"
              />
              <span className="text-xs sm:text-sm font-semibold text-zinc-900 hidden md:inline">Dr. Aris Thorne</span>
            </div>
          </div>
        </header>

        {/* Focused View Canvas */}
        <div className="flex-1 p-3 sm:p-6 md:p-12 max-w-6xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-12 items-start">
            {/* Left Column: Intent & Context - Hidden on Mobile, shows on lg */}
            <div className="w-full lg:w-1/3 space-y-4 sm:space-y-6 hidden lg:block">
              <div>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-primary uppercase mb-2 block">
                  Orchestrator Tool
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-on-surface leading-tight">
                  Create New Session
                </h2>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-3 sm:mt-4 leading-relaxed">
                  Initiate an unscheduled consultation for students not currently in the digital
                  queue. This session will be recorded in the efficiency dashboard.
                </p>
              </div>
              <div className="bg-surface-container-low p-4 sm:p-6 rounded-lg space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-secondary flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm font-medium">Faculty Availability: High</span>
                </div>
                <p className="text-xs text-on-surface-variant">
                  Recommended for quick resolutions or impromptu academic advising.
                </p>
              </div>
              <div className="relative overflow-hidden rounded-lg aspect-square hidden lg:block">
                <img
                  className="object-cover w-full h-full grayscale-[0.2] contrast-[1.1]"
                  alt="Modern minimalist university office with large windows, sunlight streaming onto a clean wooden desk with architectural books"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuACoSyxLkOnFluvVNQug_L3UUdkZnt3MkGkvibp1qtXwOUH3OkGJYzzvhuvRy-9HDHn3YbZGexql0uuPVLDcXA-sqESPvB5De5k5BAWeGNHO1aT0gr6ETdGiya2YPtUSZ6o_smifaylR7DAOrFCV1N3cXiNidK1GQMC-pDoy5_pxeTXFczTSzlBIccJjJhmKdtCtuLVvrG6aCwTy4pFjeh_G0NZEMyielO-966RrmiaAlhgfceuhcgwrNUoiu3LrAtlXJns9BxCz0I"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent"></div>
              </div>
            </div>

            {/* Right Column: Asymmetric Form Layout */}
            <div className="w-full lg:w-2/3">
              {/* Mobile Title */}
              <div className="mb-6 sm:mb-8 lg:hidden">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface leading-tight mb-2">
                  Create New Session
                </h2>
                <p className="text-xs sm:text-sm text-on-surface-variant">
                  Initiate a consultation with students not currently in queue
                </p>
              </div>

              <div className="bg-surface-container-lowest p-4 sm:p-6 md:p-8 lg:p-12 rounded-xl shadow-sm space-y-6 sm:space-y-8 md:space-y-10">
                {/* Form Section 1: Identity */}
                <section className="space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-semibold tracking-tight">Student Identification</h3>
                    <span className="text-[10px] sm:text-xs text-primary font-bold whitespace-nowrap">Step 1 of 3</span>
                  </div>
                  <div className="relative group">
                    <label className="text-[10px] sm:text-xs font-semibold text-on-surface-variant mb-2 block uppercase tracking-wider">
                      Search Student Directory
                    </label>
                    <div className="relative">
                      <input
                        className="w-full bg-surface-container-low border-none rounded-xl py-3 sm:py-4 pl-10 sm:pl-12 pr-4 focus:ring-2 focus:ring-primary/20 text-xs sm:text-sm transition-all"
                        placeholder="Enter name, ID, email..."
                        type="text"
                        value={studentSearch}
                        onChange={(e) => setStudentSearch(e.target.value)}
                      />
                      <span className="material-symbols-outlined absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-primary text-sm sm:text-base">
                        person_search
                      </span>
                    </div>
                    <div className="mt-2 sm:mt-3 flex flex-wrap gap-2">
                      <span className="bg-primary/5 text-primary text-[10px] sm:text-[11px] font-bold px-2 sm:px-3 py-1 rounded-full border border-primary/10">
                        Recent: Julian S.
                      </span>
                      <span className="bg-zinc-100 text-zinc-500 text-[10px] sm:text-[11px] font-bold px-2 sm:px-3 py-1 rounded-full">
                        Recent: Elena R.
                      </span>
                    </div>
                  </div>
                </section>

                {/* Form Section 2: Session Logistics */}
                <section className="space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-semibold tracking-tight">Session Parameters</h3>
                    <span className="text-[10px] sm:text-xs text-primary font-bold whitespace-nowrap">Step 2 of 3</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Session Type Selector */}
                    <div className="space-y-3 sm:space-y-3">
                      <label className="text-[10px] sm:text-xs font-semibold text-on-surface-variant block uppercase tracking-wider">
                        Session Type
                      </label>
                      <div className="flex bg-surface-container-low p-1 rounded-xl gap-1">
                        <button
                          onClick={() => setSessionType("individual")}
                          className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-[12px] sm:text-sm font-semibold transition-all flex items-center justify-center gap-1 sm:gap-2 min-h-[44px] ${
                            sessionType === "individual"
                              ? "bg-white shadow-sm text-primary"
                              : "text-on-surface-variant hover:text-on-surface"
                          }`}
                        >
                          <span className="material-symbols-outlined text-sm">person</span>
                          <span className="hidden sm:inline">Individual</span>
                        </button>
                        <button
                          onClick={() => setSessionType("group")}
                          className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-[12px] sm:text-sm font-semibold transition-all flex items-center justify-center gap-1 sm:gap-2 min-h-[44px] ${
                            sessionType === "group"
                              ? "bg-white shadow-sm text-primary"
                              : "text-on-surface-variant hover:text-on-surface"
                          }`}
                        >
                          <span className="material-symbols-outlined text-sm">groups</span>
                          <span className="hidden sm:inline">Group</span>
                        </button>
                      </div>
                    </div>

                    {/* Duration Selector */}
                    <div className="space-y-3 sm:space-y-3">
                      <label className="text-[10px] sm:text-xs font-semibold text-on-surface-variant block uppercase tracking-wider">
                        Estimated Duration
                      </label>
                      <select
                        className="w-full bg-surface-container-low border-none rounded-xl py-2.5 sm:py-3.5 px-3 sm:px-4 focus:ring-2 focus:ring-primary/20 text-xs sm:text-sm font-medium min-h-[44px]"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      >
                        <option value="15">15 Minutes</option>
                        <option value="30">30 Minutes</option>
                        <option value="45">45 Minutes</option>
                        <option value="60">60 Minutes</option>
                      </select>
                    </div>
                  </div>
                </section>

                {/* Form Section 3: Priority & Notes */}
                <section className="space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-semibold tracking-tight">Orchestration Details</h3>
                    <span className="text-[10px] sm:text-xs text-primary font-bold whitespace-nowrap">Step 3 of 3</span>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] sm:text-xs font-semibold text-on-surface-variant block uppercase tracking-wider">
                      Session Objective (Optional)
                    </label>
                    <textarea
                      className="w-full bg-surface-container-low border-none rounded-xl p-3 sm:p-4 focus:ring-2 focus:ring-primary/20 text-xs sm:text-sm"
                      placeholder="Add a brief note about the consultation goal..."
                      rows={3}
                      value={objective}
                      onChange={(e) => setObjective(e.target.value)}
                    ></textarea>
                  </div>
                </section>

                {/* CTA Area */}
                <div className="pt-6 sm:pt-8 border-t border-outline-variant/15 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
                  <Link
                    href="/faculty"
                    className="text-xs sm:text-sm font-semibold text-on-surface-variant hover:text-error transition-colors text-center sm:text-left py-3 sm:py-0 px-4 sm:px-0 bg-surface-container-low sm:bg-transparent rounded-lg sm:rounded-none"
                  >
                    Cancel Initiation
                  </Link>
                  <button
                    onClick={handleStartSession}
                    className="w-full sm:w-auto px-6 sm:px-12 py-3 sm:py-4 rounded-xl bg-gradient-to-br from-primary to-primary-container text-white font-bold text-xs sm:text-sm tracking-tight shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 sm:gap-3 min-h-[44px] sm:min-h-auto"
                  >
                    <span className="material-symbols-outlined text-base sm:text-lg">play_arrow</span>
                    <span>Start Session</span>
                  </button>
                </div>
              </div>

              {/* Footnote */}
              <p className="mt-6 sm:mt-8 text-center text-[10px] sm:text-xs text-on-surface-variant leading-relaxed px-3 sm:px-4">
                By starting this session, the student will receive an automatic notification. <br className="hidden lg:block" />
                Session telemetry will sync with your <strong>History</strong> and <strong>Analytics</strong> modules.
              </p>
            </div>
          </div>
        </div>


        {/* Footer Visual Element */}
        <div className="mt-auto py-4 sm:py-8 px-3 sm:px-12 border-t border-outline-variant/5">
          <div className="flex justify-between items-center opacity-40 text-[8px] sm:text-[10px]">
            <p className="font-bold tracking-tighter">FACULTY HUB v4.0</p>
            <div className="flex space-x-4 sm:space-x-8">
              <span className="font-bold">EN-US</span>
              <span className="font-bold">ISO-27001</span>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Nav Anchor */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-t border-outline-variant/10 px-4 sm:px-6 py-3 flex justify-between items-center z-50">
        <Link href="/faculty" className="flex flex-col items-center justify-center p-2 hover:bg-surface-container-low rounded-lg transition-colors">
          <span className="material-symbols-outlined text-primary text-sm">dashboard</span>
          <span className="text-[8px] font-semibold mt-0.5">Home</span>
        </Link>
        <a href="#" className="flex flex-col items-center justify-center p-2 hover:bg-surface-container-low rounded-lg transition-colors">
          <span className="material-symbols-outlined text-on-surface-variant text-sm">analytics</span>
          <span className="text-[8px] font-semibold mt-0.5">Analytics</span>
        </a>
        <Link
          href="/faculty/new-session"
          className="w-14 h-14 bg-primary rounded-full flex flex-col items-center justify-center text-white shadow-lg -mt-8 border-4 border-surface hover:scale-105 transition-transform"
        >
          <span className="material-symbols-outlined text-lg">add</span>
        </Link>
        <a href="#" className="flex flex-col items-center justify-center p-2 hover:bg-surface-container-low rounded-lg transition-colors">
          <span className="material-symbols-outlined text-on-surface-variant text-sm">mail</span>
          <span className="text-[8px] font-semibold mt-0.5">Messages</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center p-2 hover:bg-surface-container-low rounded-lg transition-colors">
          <span className="material-symbols-outlined text-on-surface-variant text-sm">person</span>
          <span className="text-[8px] font-semibold mt-0.5">Profile</span>
        </a>
      </nav>
    </div>
  )
}
