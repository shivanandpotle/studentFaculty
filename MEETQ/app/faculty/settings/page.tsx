"use client"

import Image from "next/image"

export default function FacultySettingsPage() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold tracking-tighter text-on-surface mb-2">Account Settings</h1>
        <p className="text-on-surface-variant font-medium text-lg">Manage your academic orchestration and office preferences.</p>
      </div>

      {/* Settings Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar Menu */}
        <nav className="md:col-span-3 space-y-1 bg-surface-container-low p-2 rounded-xl h-fit sticky top-28">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-surface-container-lowest shadow-sm text-primary rounded-lg font-semibold transition-all">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
            Profile
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all">
            <span className="material-symbols-outlined">calendar_month</span>
            Office Hours
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all">
            <span className="material-symbols-outlined">notifications</span>
            Preferences
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all">
            <span className="material-symbols-outlined">security</span>
            Security
          </button>
        </nav>

        {/* Content Area */}
        <div className="md:col-span-9 space-y-8">
          {/* Profile Section Card */}
          <section className="bg-surface-container-lowest rounded-xl p-8 transition-all">
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Image
                    alt="Academic Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-surface"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQrW49IkG7Zv856VCNn1Xh6-ETXHSy4OQEFbL4hrouZny_8zGB1YO9qufz3a9Q0di5v6kuDOpzoZZ4QK24S-UVUkblhV7SmZiHXpwTaBHFClxfUGRpiqGmf1HVpQINd9HhgG8xNVtQHM1-txd3gTsRK7icAvfqXLbnlCgagtPdWAqpn8AS2MWu-Bax5EIFUnli2Bthu0xM_UG2vT83sqMUMGhXJ2FdFXzV8nRkhc2Sd9L7Tk4DXv3NLZdBUkq9XCKp97WCllvyCNY"
                    width={96}
                    height={96}
                  />
                  <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-on-surface">Dr. Alexander Sterling</h2>
                  <p className="text-on-surface-variant font-medium">Senior Professor of Computational Linguistics</p>
                  <div className="mt-2 flex gap-2">
                    <span className="bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Available
                    </span>
                  </div>
                </div>
              </div>
              <button className="text-primary font-semibold text-sm hover:underline">Edit Info</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/60">Department</label>
                <p className="text-on-surface font-medium py-2 border-b border-outline-variant/20">Computer Science &amp; AI</p>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/60">Cabin / Office Number</label>
                <p className="text-on-surface font-medium py-2 border-b border-outline-variant/20">Building 4, Room 402-B</p>
              </div>
            </div>
          </section>

          {/* Office Hours Section */}
          <section className="bg-surface-container-lowest rounded-xl p-8 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">hourglass_empty</span>
              <h3 className="text-xl font-bold tracking-tight text-on-surface">Office Hours Orchestration</h3>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
                <div>
                  <p className="font-semibold text-on-surface">Default Session Duration</p>
                  <p className="text-sm text-on-surface-variant">Set the standard time for student meetings.</p>
                </div>
                <select className="bg-surface-container-lowest border-none rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary-container pr-10">
                  <option>15 Minutes</option>
                  <option defaultValue="">30 Minutes</option>
                  <option>45 Minutes</option>
                  <option>1 Hour</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
                <div>
                  <p className="font-semibold text-on-surface">Auto-Close Queue</p>
                  <p className="text-sm text-on-surface-variant">Automatically stop new requests after session hours.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input defaultChecked className="sr-only peer" type="checkbox" />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:inset-s-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Notification Preferences */}
          <section className="bg-surface-container-lowest rounded-xl p-8 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">notifications</span>
              <h3 className="text-xl font-bold tracking-tight text-on-surface">Communication Pulse</h3>
            </div>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
                <span className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-on-surface-variant">mail</span>
                  <span className="font-medium">Email Summaries</span>
                </span>
                <input defaultChecked className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox" />
              </label>
              <label className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
                <span className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-on-surface-variant">phone_iphone</span>
                  <span className="font-medium">Push Notifications</span>
                </span>
                <input defaultChecked className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox" />
              </label>
              <label className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
                <span className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-on-surface-variant">language</span>
                  <span className="font-medium">Browser Desktop Alerts</span>
                </span>
                <input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox" />
              </label>
            </div>
          </section>

          {/* Security */}
          <section className="bg-surface-container-lowest rounded-xl p-8 transition-all border border-error/10">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-error">gpp_maybe</span>
              <h3 className="text-xl font-bold tracking-tight text-on-surface">Security &amp; Access</h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-surface-container-high px-6 py-3 rounded-lg font-semibold text-on-surface hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">lock</span>
                Change Password
              </button>
              <button className="bg-surface-container-high px-6 py-3 rounded-lg font-semibold text-on-surface hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">devices</span>
                Active Sessions
              </button>
              <button className="ml-auto text-error font-bold uppercase tracking-widest text-[10px] px-4 py-3 rounded-lg border border-error/20 hover:bg-error/5 transition-colors">
                Deactivate Account
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
