"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavItem {
  icon: string
  label: string
  href: string
}

interface BottomNavProps {
  variant?: "faculty" | "student"
}

const facultyItems: NavItem[] = [
  { icon: "home", label: "Home", href: "/faculty" },
  { icon: "hourglass_empty", label: "Queue", href: "/faculty/queue" },
  { icon: "mail", label: "Inbox", href: "/faculty/notifications" },
  { icon: "person", label: "Profile", href: "/faculty/settings" },
]

const studentItems: NavItem[] = [
  { icon: "home", label: "Home", href: "/student" },
  { icon: "hourglass_empty", label: "Queue", href: "/student/queue" },
  { icon: "mail", label: "Inbox", href: "/student/notifications" },
  { icon: "person", label: "Profile", href: "/student/settings" },
]

export function BottomNav({ variant = "student" }: BottomNavProps) {
  const pathname = usePathname()
  const items = variant === "faculty" ? facultyItems : studentItems
  
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-3 pb-8 bg-slate-50/90 dark:bg-zinc-950/90 backdrop-blur-2xl lg:hidden shadow-[0_-4px_24px_rgba(0,0,0,0.04)] rounded-t-[3rem]">
      {items.map((item) => {
        const isActive = pathname === item.href || 
          (item.href !== `/${variant}` && pathname?.startsWith(item.href))
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center px-5 py-2 active:scale-90 transition-transform",
              isActive 
                ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full" 
                : "text-slate-400 dark:text-zinc-500"
            )}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
