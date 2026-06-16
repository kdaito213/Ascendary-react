import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Header from './Header.jsx'
import AppRoutes from "./AppRoutes"
import AuthRoutes from "./AuthRoutes"
import useAuth from "./hooks/useAuth"
import useRecords from "./hooks/useRecords"

function App() {
  const [mode, setMode] = useState("training")
  const [menuOpen, setMenuOpen] = useState(false)

  const user = useAuth()

  const {
    recordTraining,
    recordCompetition
  } = useRecords(user)

  const record =
    mode === "training"
      ? recordTraining
      : recordCompetition

  const skills = [...new Set(record.map(r => r.name))]

  return (
    <BrowserRouter>
      {!user ? (
        <AuthRoutes />
      ) : (
        <>
          <Header
            mode={mode}
            setMode={setMode}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />

          <AppRoutes
            user={user}
            mode={mode}
            record={record}
            skills={skills}
            recordTraining={recordTraining}
            recordCompetition={recordCompetition}
          />
        </>
      )}
    </BrowserRouter>
  )
}

export default App