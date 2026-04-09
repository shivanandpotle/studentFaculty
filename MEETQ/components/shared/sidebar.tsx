"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavItem {
  icon: string
  label: string
  href: string
}

const navItems: NavItem[] = [
  { icon: "dashboard", label: "Dashboard", href: "/faculty" },
  { icon: "analytics", label: "Analytics", href: "/faculty/analytics" },
  { icon: "forum", label: "Messages", href: "/faculty/messages" },
  { icon: "history", label: "History", href: "/faculty/history" },
]

export function Sidebar() {
  const pathname = usePathname()
  
  return (
    <aside className="fixed left-0 top-0 h-full p-4 space-y-6 bg-slate-50 dark:bg-zinc-950 w-64 hidden lg:flex flex-col border-r-0 pt-20">
      <div className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/faculty" && pathname?.startsWith(item.href))
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl transition-all duration-300",
                isActive 
                  ? "bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-sm" 
                  : "text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900/50"
              )}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
      <div className="mt-auto pb-4">
        <button className="w-full py-4 rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary font-semibold shadow-lg active:scale-95 transition-transform">
          New Session
        </button>
      </div>
    </aside>
  )
}
