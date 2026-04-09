"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navbar() {
  const pathname = usePathname()
  const isFaculty = pathname?.startsWith("/faculty")
  
  return (
    <header className="bg-slate-50/80 dark:bg-zinc-950/80 backdrop-blur-xl fixed top-0 w-full z-50 shadow-sm dark:shadow-none">
      <div className="flex justify-between items-center h-16 px-6 w-full max-w-full">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold tracking-tighter text-slate-900 dark:text-zinc-50">
            MeetQ
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href={isFaculty ? "/faculty/notifications" : "/student/notifications"}
            className="relative p-2 text-slate-500 dark:text-zinc-400 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
          </Link>
          <Link 
            href={isFaculty ? "/faculty/settings" : "/student/settings"}
            className="p-2 text-slate-500 dark:text-zinc-400 active:scale-95 transition-all hidden md:block"
          >
            <span className="material-symbols-outlined">settings</span>
          </Link>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
            <img 
              alt="Academic Profile" 
              className="w-full h-full object-cover" 
              src={isFaculty 
                ? "https://lh3.googleusercontent.com/aida-public/AB6AXuBRnL2CpP5mae5NQI1jJrm8nB6iqmCMLlu1sVdwseRkd1ka6wVeoV9MgzAiDY42d7_JLPPosNJKIyHMag58_5egmIcISJxaMAsSG7At5y5M3NJMrAlJr3VmFokKKddbS8pGSrdkBQi4EQhtV2cJAhF7A0l8_816x1bCoyc70wzxfbGWKmtVhExdjkpWGrbldVLNK0MkfafQkQk-HV5_mSZpIcXIPECnBxHxc1rkSrIusjYA9rP8goTZCiho3-wFCXzUEn228-6GTLw"
                : "https://lh3.googleusercontent.com/aida-public/AB6AXuCCxq7tdIp0zz-TShhcK-joVCN0ks7Y2am3YgS8X9L0hKBRtJA1BQaovdnoIJdX_45yGR7kn7WI_YlWiTEBr9GTHVvCXnkmU32_hAAjt1ScTbDPKmUSGLeBOc8mUKfhr_RxYuxaw1eMDngObbnSPTckuz4KwG0MuQBYR6H-kFpEAsD2Bxm2oyJzneotfrJ-euhs_PlqMgEdqPm8ANRRaP9ifK7xXVC2FaUzMH7Ps2twz5R9ep5dwS1566LNloOVUbeC1KEFFYl-N_8"
              }
            />
          </div>
        </div>
      </div>
    </header>
  )
}
