"use client"

import Image from "next/image"
import Link from "next/link"

export default function StudentSettingsPage() {
  return (
    <>
      {/* Task-focused header */}
      <header className="fixed top-0 w-full z-50 bg-slate-50/80 dark:bg-zinc-950/80 backdrop-blur-xl shadow-sm h-16 flex items-center px-6 justify-between">
        <div className="flex items-center gap-4">
          <Link href="/student" className="p-2 -ml-2 active:scale-95 duration-200">
            <span className="material-symbols-outlined text-on-surface">arrow_back</span>
          </Link>
          <h1 className="text-xl font-bold tracking-tighter text-slate-900 dark:text-zinc-50">Settings</h1>
        </div>
        <div className="flex gap-4">
          <span className="material-symbols-outlined text-slate-500">help_outline</span>
        </div>
      </header>

      <main className="pt-24 px-4 max-w-2xl mx-auto space-y-6 pb-32">
        {/* Profile Management Section */}
        <section className="space-y-4">
          <div className="flex items-end justify-between px-2">
            <h2 className="text-on-surface-variant font-semibold text-xs uppercase tracking-widest">Profile Identity</h2>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex items-center gap-6">
            <div className="relative">
              <Image
                alt="Academic Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-primary/10"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwyggUdvPibI431pbAk8POqQx7ANX3-A-LW6Pt2UBaayyyw8z-JKqDa9B2SETJLbe6RnUxobBwiS_vrqV-luR6Y-Qjhb2FnunEpCMbjOKIgHmb1jFJ3NxgSt6gzMsAAG6ob6rnCUV1DxA2hcEHGQOMs7r19WdbRwHca2p8rmGr5ulU2LHItVZPwjebnaP0_BqFqqYpsEb1hcMctKXJgcA2nhh76YxziFZssUnaRxi5mgGYJLOz0gAsdZ8OfOR-xH7QPUpnHMawL5E"
                width={80}
                height={80}
              />
              <button className="absolute -bottom-1 -right-1 bg-primary text-white p-1.5 rounded-full shadow-lg border-2 border-surface-container-lowest active:scale-90 transition-transform">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>edit</span>
              </button>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-on-surface leading-tight">Alex Rivera</h3>
              <p className="text-on-surface-variant text-sm">Computer Science Major</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary-container text-on-secondary-container">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary mr-1.5"></span>
                  Verified Student
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* University Verification & Core Settings */}
        <section className="space-y-4">
          <div className="flex items-end justify-between px-2">
            <h2 className="text-on-surface-variant font-semibold text-xs uppercase tracking-widest">Academic Sync</h2>
          </div>
          <div className="bg-surface-container-low rounded-xl overflow-hidden">
            <div className="p-5 flex items-center justify-between border-b border-outline-variant/15">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">alternate_email</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-on-surface">University Email</p>
                  <p className="text-xs text-on-surface-variant">a.rivera@stanford.edu</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">notifications_active</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-on-surface">Queue Alerts</p>
                  <p className="text-xs text-on-surface-variant">Push notifications for session starts</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input defaultChecked className="sr-only peer" type="checkbox" />
                <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </section>

        {/* App Experience (Theme Selection) */}
        <section className="space-y-4">
          <div className="flex items-end justify-between px-2">
            <h2 className="text-on-surface-variant font-semibold text-xs uppercase tracking-widest">Interface</h2>
          </div>
          <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm space-y-4">
            <p className="text-sm font-semibold text-on-surface">Theme Selection</p>
            <div className="flex p-1 bg-surface-container-low rounded-xl gap-1">
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-surface-container-lowest shadow-sm text-primary font-semibold text-sm transition-all">
                <span className="material-symbols-outlined text-sm">light_mode</span>
                Light
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-on-surface-variant font-medium text-sm hover:bg-surface-container-highest/20 transition-all">
                <span className="material-symbols-outlined text-sm">dark_mode</span>
                Dark
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-on-surface-variant font-medium text-sm hover:bg-surface-container-highest/20 transition-all">
                <span className="material-symbols-outlined text-sm">brightness_auto</span>
                System
              </button>
            </div>
          </div>
        </section>

        {/* Secondary Actions (Bento Style) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-container-low p-5 rounded-xl flex flex-col justify-between h-32 active:scale-95 transition-all cursor-pointer">
            <span className="material-symbols-outlined text-primary text-3xl">security</span>
            <div>
              <p className="text-sm font-bold text-on-surface">Privacy</p>
              <p className="text-xs text-on-surface-variant">Data controls</p>
            </div>
          </div>
          <div className="bg-surface-container-low p-5 rounded-xl flex flex-col justify-between h-32 active:scale-95 transition-all cursor-pointer">
            <span className="material-symbols-outlined text-primary text-3xl">history</span>
            <div>
              <p className="text-sm font-bold text-on-surface">Activity</p>
              <p className="text-xs text-on-surface-variant">Log history</p>
            </div>
          </div>
        </div>

        {/* Logout CTA */}
        <button className="w-full mt-8 py-4 px-6 rounded-xl font-bold text-error border border-error/20 bg-error/5 hover:bg-error/10 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
          <span className="material-symbols-outlined">logout</span>
          Sign Out
        </button>
        <p className="text-center text-[10px] text-on-surface-variant/40 uppercase tracking-[0.2em] pt-4">MeetQ v2.4.0 - Institutional Build</p>
      </main>
    </>
  )
}
