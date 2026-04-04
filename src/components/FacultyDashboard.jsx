import { useEffect, useState } from "react"
import {
  listenToBookings,
  updateBookingStatus,
  updateFacultyStatus
} from "../services/facultyService"

export default function FacultyDashboard({ facultyId = "prof1" }) {
  const [bookings, setBookings] = useState([])
  const [status, setStatus] = useState("available")

  useEffect(() => {
    listenToBookings(facultyId, setBookings)
  }, [facultyId])

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus)
    updateFacultyStatus(facultyId, newStatus)
  }

  // Split bookings into urgent and normal
  const urgentBookings = bookings.filter(b => b.isUrgent && b.status === "pending")
  const normalBookings = bookings.filter(b => !b.isUrgent)

  return (
    <div>
      <h2>👨‍🏫 Faculty Dashboard — Dr. Sharma</h2>

      {/* 🚨 URGENT BOOKINGS — shown at top */}
      {urgentBookings.length > 0 && (
        <div style={{ 
          backgroundColor: "#ffe0e0", 
          border: "2px solid red", 
          padding: "10px", 
          marginBottom: "15px",
          borderRadius: "8px"
        }}>
          <h3>🚨 Urgent Requests ({urgentBookings.length})</h3>
          {urgentBookings.map((b) => (
            <div key={b.id} style={{ 
              borderBottom: "1px solid red", 
              paddingBottom: "8px", 
              marginBottom: "8px" 
            }}>
              <p><strong>{b.studentName}</strong></p>
              <p>Reason: {b.reason}</p>
              <p style={{ color: "red" }}>⚠️ Urgent: {b.urgentMessage}</p>
              <button 
                onClick={() => updateBookingStatus(facultyId, b.id, "accepted")}
                style={{ backgroundColor: "green", color: "white", marginRight: "5px" }}
              >
                ✅ Accept
              </button>
              <button 
                onClick={() => updateBookingStatus(facultyId, b.id, "rejected")}
                style={{ backgroundColor: "red", color: "white" }}
              >
                ❌ Reject
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Status Toggle */}
      <div style={{ marginBottom: "15px" }}>
        <p>Current Status: <strong>{status}</strong></p>
        <button onClick={() => handleStatusChange("available")}
          style={{ backgroundColor: "green", color: "white", marginRight: "5px" }}>
          🟢 Available
        </button>
        <button onClick={() => handleStatusChange("busy")}
          style={{ backgroundColor: "red", color: "white", marginRight: "5px" }}>
          🔴 Busy
        </button>
        <button onClick={() => handleStatusChange("in-meeting")}
          style={{ backgroundColor: "orange", color: "white" }}>
          🟡 In Meeting
        </button>
      </div>

      {/* Normal Booking Requests */}
      <h3>📋 Booking Requests</h3>
      {normalBookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        normalBookings.map((b) => (
          <div key={b.id} style={{ 
            border: "1px solid gray", 
            padding: "10px", 
            marginBottom: "10px" 
          }}>
            <p><strong>{b.studentName}</strong></p>
            <p>Reason: {b.reason}</p>
            <p>Status: <strong>{b.status}</strong></p>
            {b.status === "pending" && (
              <>
                <button 
                  onClick={() => updateBookingStatus(facultyId, b.id, "accepted")}
                  style={{ backgroundColor: "green", color: "white", marginRight: "5px" }}
                >
                  ✅ Accept
                </button>
                <button 
                  onClick={() => updateBookingStatus(facultyId, b.id, "rejected")}
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  ❌ Reject
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  )
}