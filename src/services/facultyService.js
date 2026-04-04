import { db, ref, onValue, update, push } from "../firebase"

// 1. Listen to all faculty in real time
export const listenToFaculty = (callback) => {
  onValue(ref(db, "faculty"), (snapshot) => {
    const data = snapshot.val()
    const list = data
      ? Object.entries(data).map(([id, val]) => ({ id, ...val }))
      : []
    callback(list)
  })
}

// 2. Update faculty status
export const updateFacultyStatus = (facultyId, status) => {
  return update(ref(db, `faculty/${facultyId}`), { status })
}

// 3. Send booking request
export const sendBookingRequest = (facultyId, bookingData) => {
  return push(ref(db, `bookings/${facultyId}`), {
    ...bookingData,
    status: "pending",
    timestamp: Date.now()
  })
}

// 4. Listen to bookings for a faculty
export const listenToBookings = (facultyId, callback) => {
  onValue(ref(db, `bookings/${facultyId}`), (snapshot) => {
    const data = snapshot.val()
    const list = data
      ? Object.entries(data).map(([id, val]) => ({ id, ...val }))
      : []
    callback(list)
  })
}

// 5. Accept or reject booking
export const updateBookingStatus = (facultyId, bookingId, status) => {
  return update(ref(db, `bookings/${facultyId}/${bookingId}`), { status })
}

// 6. Send urgent notification
export const sendUrgentNotification = (facultyId, message) => {
  return push(ref(db, `notifications/${facultyId}`), {
    message,
    type: "urgent",
    seen: false,
    timestamp: Date.now()
  })
}

// 7. Listen to notifications in real time
export const listenToNotifications = (facultyId, callback) => {
  onValue(ref(db, `notifications/${facultyId}`), (snapshot) => {
    const data = snapshot.val()
    const list = data
      ? Object.entries(data).map(([id, val]) => ({ id, ...val }))
      : []
    // Only return unseen notifications
    callback(list.filter(n => !n.seen))
  })
}

// 8. Mark notification as seen
export const markNotificationSeen = (facultyId, notificationId) => {
  return update(ref(db, `notifications/${facultyId}/${notificationId}`), { 
    seen: true 
  })
}