"use client"

import { collection, addDoc, query, where, orderBy, onSnapshot, updateDoc, doc, serverTimestamp, Timestamp } from "firebase/firestore"
import { db } from "./firebase"

export type BookingStatus = "pending" | "active" | "completed"

export interface BookingRecord {
  facultyId: string
  facultyName: string
  studentId: string
  studentName: string
  studentDept: string
  topic: string
  date: string
  time: string
  status: BookingStatus
  queuedAt: Timestamp
  admittedAt?: Timestamp
  completedAt?: Timestamp
  createdAt: Timestamp
}

export interface BookingWithId extends BookingRecord {
  id: string
}

function parseBooking(snapshot: any): BookingWithId {
  const data = snapshot.data()
  return {
    id: snapshot.id,
    facultyId: data.facultyId,
    facultyName: data.facultyName,
    studentId: data.studentId,
    studentName: data.studentName,
    studentDept: data.studentDept,
    topic: data.topic,
    date: data.date,
    time: data.time,
    status: data.status,
    queuedAt: data.queuedAt,
    admittedAt: data.admittedAt,
    completedAt: data.completedAt,
    createdAt: data.createdAt,
  }
}

export async function createBooking(data: Omit<BookingRecord, "status" | "queuedAt" | "createdAt">) {
  return addDoc(collection(db, "bookings"), {
    ...data,
    status: "pending",
    queuedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  })
}

export function listenStudentBookings(studentId: string, callback: (bookings: BookingWithId[]) => void) {
  const q = query(collection(db, "bookings"), where("studentId", "==", studentId), orderBy("queuedAt", "asc"))
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(parseBooking))
  })
}

export function listenFacultyQueue(facultyId: string, callback: (bookings: BookingWithId[]) => void) {
  const q = query(
    collection(db, "bookings"),
    where("facultyId", "==", facultyId),
    where("status", "==", "pending"),
    orderBy("queuedAt", "asc")
  )
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(parseBooking))
  })
}

export function listenFacultyActive(facultyId: string, callback: (bookings: BookingWithId[]) => void) {
  const q = query(
    collection(db, "bookings"),
    where("facultyId", "==", facultyId),
    where("status", "==", "active"),
    orderBy("admittedAt", "asc")
  )
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(parseBooking))
  })
}

export function listenFacultyBookings(facultyId: string, callback: (bookings: BookingWithId[]) => void) {
  const q = query(collection(db, "bookings"), where("facultyId", "==", facultyId), orderBy("queuedAt", "asc"))
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(parseBooking))
  })
}

export async function admitBooking(bookingId: string) {
  return updateDoc(doc(db, "bookings", bookingId), {
    status: "active",
    admittedAt: serverTimestamp(),
  })
}

export async function completeBooking(bookingId: string) {
  return updateDoc(doc(db, "bookings", bookingId), {
    status: "completed",
    completedAt: serverTimestamp(),
  })
}
