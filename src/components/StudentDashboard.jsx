import { useEffect, useState } from "react"
import { listenToFaculty, sendBookingRequest } from "../services/facultyService"

export default function StudentDashboard() {
  const [faculty, setFaculty] = useState([])
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ 
    studentName: "", 
    reason: "", 
    isUrgent: false, 
    urgentMessage: "" 
  })

  useEffect(() => {
    listenToFaculty(setFaculty)
  }, [])

  const handleBook = (facultyId) => {
    if (!form.studentName || !form.reason) {
      alert("Please fill all fields!")
      return
    }
    sendBookingRequest(facultyId, form)
    setSelected(null)
    setForm({ studentName: "", reason: "", isUrgent: false, urgentMessage: "" })
    alert("Booking sent!")
  }

  return (
    <div>
      <h2>👨‍🎓 Student Dashboard</h2>

      {faculty.map((f) => (
        <div key={f.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <h3>{f.name}</h3>
          <p>{f.department} — {f.cabin}</p>
          <p>
            Status:{" "}
            <strong style={{
              color: f.status === "available" ? "green" :
                     f.status === "busy" ? "red" : "orange"
            }}>
              {f.status === "available" ? "🟢 Available" :
               f.status === "busy" ? "🔴 Busy" : "🟡 In Meeting"}
            </strong>
          </p>

          {/* Book Slot Button */}
          {f.status === "available" && (
            <button onClick={() => setSelected(selected === f.id ? null : f.id)}>
              📅 Book Slot
            </button>
          )}

          {/* Booking Form */}
          {selected === f.id && (
            <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "#f9f9f9" }}>
              
              <input
                placeholder="Your Name"
                value={form.studentName}
                onChange={(e) => setForm({ ...form, studentName: e.target.value })}
                style={{ display: "block", marginBottom: "8px", width: "100%" }}
              />
              <input
                placeholder="Reason for meeting"
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                style={{ display: "block", marginBottom: "8px", width: "100%" }}
              />

              {/* Urgent Flag Toggle */}
              <div style={{ marginBottom: "8px" }}>
                <label>
                  <input
                    type="checkbox"
                    checked={form.isUrgent}
                    onChange={(e) => setForm({ ...form, isUrgent: e.target.checked })}
                  />
                  {" "}🚨 Mark as Urgent
                </label>
              </div>

              {/* Urgent Message — only shows if urgent is checked */}
              {form.isUrgent && (
                <input
                  placeholder="Why is this urgent?"
                  value={form.urgentMessage}
                  onChange={(e) => setForm({ ...form, urgentMessage: e.target.value })}
                  style={{ 
                    display: "block", 
                    marginBottom: "8px", 
                    width: "100%",
                    border: "2px solid red",
                    backgroundColor: "#ffe0e0"
                  }}
                />
              )}

              <button 
                onClick={() => handleBook(f.id)}
                style={{ marginRight: "5px" }}
              >
                ✅ Send Request
              </button>
              <button onClick={() => setSelected(null)}>Cancel</button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}