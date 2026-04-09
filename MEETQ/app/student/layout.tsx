import { Navbar } from "@/components/shared/navbar"
import { BottomNav } from "@/components/shared/bottom-nav"
import { SessionBanner } from "@/components/shared/session-banner"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <SessionBanner />
      <main className="pt-20 pb-32 px-6 max-w-7xl mx-auto">
        {children}
      </main>
      <BottomNav variant="student" />
      
      {/* Decorative Canvas Elements */}
      <div className="fixed top-0 right-0 -z-10 w-125 h-125 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 -z-10 w-100 h-100 bg-secondary/5 blur-[100px] rounded-full translate-y-1/4 -translate-x-1/4 pointer-events-none"></div>
    </div>
  )
}
