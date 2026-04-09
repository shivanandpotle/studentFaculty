"use client"

import { useEffect, useState } from "react"
import { QueueStatusCard } from "@/components/student/queue-status-card"
import { FacultyDirectory } from "@/components/student/faculty-directory"
import { BookSessionModal } from "@/components/student/book-session-modal"
import { DigitalTokenCard } from "@/components/student/digital-token-card"
import { listenStudentQueue, getQueuePosition, calculateEstimatedWait, QueueEntryWithId } from "@/lib/queue"
import { CURRENT_STUDENT } from "@/lib/constants"

const mockFaculty = [
  {
    id: "1",
    name: "Dr. Alexander Wright",
    department: "Physics",
    location: "Cabin 402-A",
    status: "available" as const,
    queueCount: 3,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuNbthSAV3LsyZRfh02iy7Bdv9n1p7Tpwr_hsdeM6T0OonOkLWrk_lqsSN4zpLAIG9B2bBFZibijuXKNwmZ9jjRWzOS4RwxPPNHhe23dsvkeEkIQOpQPLlEUzOnGK5el99GZETE4edV1UA2-lyHpARlHR8U-REHQc3prv6iYwWicAeVSOHl1wIz1s01p3izLPOQLdqKNnMaDVD1dyA3ASSItAJAwDnjdFQu4LqZkGiqUt8MZymw-Wasjaw1nNMOv1Ju8eH495i3ss"
  },
  {
    id: "2",
    name: "Dr. Sarah Chen",
    department: "Mathematics",
    location: "Cabin 205",
    status: "busy" as const,
    expectedAt: "2:00 PM",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4-SwM-6nyym-EHQroqKSJ73kXm0EaXp8D9etlN22fexCsq82glW1Mgfq_nJKZt-3CvZu0-We9sphOGxy4mCZVQts82ovWZH3KVQyPKUCyp5W6tS63FDEgBxcE8KtTNxdJjvA08KMDW55M_Eppe6_14IEd0xyR__y04OpRwe_ABE9VAl4yVvvdZGBl1ZVGp1_bx5FOJsppq-DAVwTOmIMH6oEvZE2OkuYVTKCtwfCJoO-vyugPQY0rRxKZUc_4XZi_0pgMVQ4QF6A"
  },
  {
    id: "3",
    name: "Prof. Julian Mercer",
    department: "Philosophy",
    location: "Cabin 108",
    status: "in-session" as const,
    sessionEndsIn: "5m",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKpHOPyW3JvENquZtSuDagXO5wcoSpyqGuVYiGZLm2cVdzSj737iHE4pvstohCvhgxfn6AlbwJcWmN8F8r_ag-o95iOyu5NfGJInTyhYqLhEadlJMSc_Ti_xzvyT9FLaf3sRfoC33tc7Pi5AvLUMUY5T6e7xuDToOM5jBucP7ZBHaOlgn8bpuq1NTubuRr_S129UOu3qMnUDthlalnjTHIfDYiDh23OFFpb5vUBAEFLVjkLxVSnM4PQIPgd0TSJ6mz2dMolUOhuaU"
  },
]

export default function StudentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFaculty, setSelectedFaculty] = useState<typeof mockFaculty[0] | null>(null)
  const [myQueueEntry, setMyQueueEntry] = useState<QueueEntryWithId | null>(null)
  const [queuePosition, setQueuePosition] = useState(0)
  const [estimatedWait, setEstimatedWait] = useState(0)

  useEffect(() => {
    const unsubscribe = listenStudentQueue(CURRENT_STUDENT.id, (queueData) => {
      const myEntry = queueData.find(
        (entry) => entry.studentId === CURRENT_STUDENT.id && (entry.status === "waiting" || entry.status === "active")
      )
      setMyQueueEntry(myEntry || null)

      if (myEntry) {
        const position = getQueuePosition(queueData, myEntry.id)
        setQueuePosition(position)
        setEstimatedWait(calculateEstimatedWait(position))
      } else {
        setQueuePosition(0)
        setEstimatedWait(0)
      }
    })

    return unsubscribe
  }, [])

  const handleBookSession = (faculty: typeof mockFaculty[0]) => {
    setSelectedFaculty(faculty)
    setIsModalOpen(true)
  }

  const inQueue = Boolean(myQueueEntry)

  return (
    <div className="space-y-10">
      {inQueue && myQueueEntry ? (
        <DigitalTokenCard
          tokenId={myQueueEntry.tokenId}
          qrCode={myQueueEntry.qrCode}
          status={myQueueEntry.status}
          facultyName={myQueueEntry.facultyName}
          reason={myQueueEntry.reason}
          position={queuePosition}
          estimatedWait={estimatedWait}
        />
      ) : (
        <section className="rounded-3xl bg-primary/10 border border-primary/15 p-6 shadow-lg shadow-primary/10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary/80">Ready to Join</p>
              <h2 className="mt-2 text-2xl font-semibold text-on-surface">Find a faculty member</h2>
              <p className="mt-1 text-sm text-on-surface-variant">Choose a professor and book your spot in the queue.</p>
            </div>
            <div className="rounded-3xl bg-slate-950/95 px-4 py-3 text-sm text-white">
              <p>Queue Status</p>
              <p className="mt-1 font-semibold">Not in queue</p>
            </div>
          </div>
        </section>
      )}

      <FacultyDirectory faculty={mockFaculty} onBookSession={handleBookSession} />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        <div className="bg-surface-container-low rounded-xl p-8 flex flex-col justify-center items-center text-center">
          <span className="text-6xl font-bold tracking-tighter text-primary">12</span>
          <span className="text-sm font-semibold uppercase tracking-widest text-on-surface-variant mt-2">Active Sessions Today</span>
        </div>
        <div className="bg-surface-container-low rounded-xl p-8 flex flex-col justify-center items-center text-center">
          <span className="text-6xl font-bold tracking-tighter text-secondary">08</span>
          <span className="text-sm font-semibold uppercase tracking-widest text-on-surface-variant mt-2">Available Faculty</span>
        </div>
      </section>

      {!inQueue && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-24 right-6 md:right-12 z-50 flex items-center gap-3 px-8 py-4 bg-linear-to-br from-primary to-primary-container text-white rounded-full shadow-lg shadow-primary/20 active:scale-95 duration-200 transition-all group"
        >
          <span className="material-symbols-outlined font-bold">add</span>
          <span className="font-semibold tracking-tight">JOIN QUEUE</span>
        </button>
      )}

      {selectedFaculty && (
        <BookSessionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          faculty={selectedFaculty}
          studentId={CURRENT_STUDENT.id}
          studentName={CURRENT_STUDENT.name}
        />
      )}
    </div>
  )
}
