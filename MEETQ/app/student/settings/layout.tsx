import { BottomNav } from "@/components/shared/bottom-nav"

export default function StudentSettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-surface">
      {children}
      <BottomNav variant="student" />
    </div>
  )
}
