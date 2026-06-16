import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import './App.css'
import Header from './Header.jsx'
import AddTraining from './AddTraining.jsx'
import AddCompetition from './AddCompetition.jsx'
import GraphTraining from "./GraphTraining.jsx"
import GraphCompetition from './GraphCompetition.jsx'
import DashboardTraining from './DashboardTraining.jsx'
import DashboardCompetition from './DashboardCompetition.jsx'
import RecordsTraining from './RecordsTraining.jsx'
import RecordsCompetition from './RecordsCompetition.jsx'
import Team from './Team.jsx'
import Signup from './Signup.jsx'
import Login from './Login.jsx'
import HowTo from './HowTo.jsx'
import Profile from './Profile.jsx'
import useAuth from "./hooks/useAuth"
import useRecords from "./hooks/useRecords"
import { auth } from './firebase.js'
import { signOut } from "firebase/auth"

function App() {
  const [mode, setMode] = useState("training")
  const [menuOpen, setMenuOpen] = useState(false)

  const user = useAuth()
  const {
    recordTraining,
    recordCompetition
  } = useRecords(user)

  const record = mode === "training"
    ? recordTraining
    : recordCompetition

  // 技名一覧
  const skills = [...new Set(record.map(r => r.name))]

  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/howto" element={<HowTo />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>

      <Header
        mode={mode}
        setMode={setMode}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <Routes>
        <Route path="/profile" element={<Profile user={user} />} />

        <Route
          path="/"
          element={
            mode === "training"
              ? <DashboardTraining record={record} mode={mode} />
              : <DashboardCompetition record={record} mode={mode} />
          }
        />

        <Route
          path="/add"
          element={
            mode === "training"
              ? <AddTraining user={user} skills={skills} />
              : <AddCompetition user={user} skills={skills} />
          }
        />

        <Route
          path="/records"
          element={
            mode === "training"
              ? <RecordsTraining record={record} user={user} />
              : <RecordsCompetition record={record} user={user} />
          }
        />


        <Route
          path="/graph"
          element={
            mode === "training"
              ? <GraphTraining record={recordTraining} />
              : <GraphCompetition record={recordCompetition} />
          }
        />

        <Route
          path="/team"
          element={<Team user={user} />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App