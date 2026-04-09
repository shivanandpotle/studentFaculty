"use client"

import { WaitScreen } from "@/components/student/wait-screen"
import { useRouter } from "next/navigation"

export default function StudentQueuePage() {
  const router = useRouter()
  
  const handleLeaveQueue = () => {
    // In real app, this would call an API to leave the queue
    router.push("/student")
  }
  
  return (
    <WaitScreen 
      position={4}
      courseName="CS101"
      estimatedWait={18}
      studentsInFront={3}
      avgSessionTime={6.2}
      onLeaveQueue={handleLeaveQueue}
    />
  )
}
