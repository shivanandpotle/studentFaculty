import { Navbar } from "@/components/shared/navbar"
import { Sidebar } from "@/components/shared/sidebar"
import { BottomNav } from "@/components/shared/bottom-nav"
import { SessionBanner } from "@/components/shared/session-banner"

export default function FacultyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <Sidebar />
      <SessionBanner />
      <main className="lg:ml-64 pt-20 pb-24 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
        {children}
      </main>
      <BottomNav variant="faculty" />
    </div>
  )
}
