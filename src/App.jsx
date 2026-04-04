import { useState } from "react"
import FacultyDashboard from "./components/FacultyDashboard"
import StudentDashboard from "./components/StudentDashboard"

function App() {
  const [view, setView] = useState("student")

  return (
    <div>
      <h1>MeetQ</h1>
      <button onClick={() => setView("student")}>Student View</button>
      <button onClick={() => setView("faculty")}>Faculty View</button>

      {view === "student" ? <StudentDashboard /> : <FacultyDashboard />}
    </div>
  )
}

export default App