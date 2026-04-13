import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
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
import Profile from './Profile.jsx'
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  arrayRemove
} from 'firebase/firestore'
import { db } from './firebase.js'
import { auth } from './firebase.js'
import {
  onAuthStateChanged,
  signOut
} from "firebase/auth"
import { Navigate } from 'react-router-dom'

function App() {

  const [user, setUser] = useState(null)
  const [recordTraining, setRecordTraining] = useState([])
  const [recordCompetition, setRecordCompetition] = useState([])

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mode, setMode] = useState("training")
  const [menuOpen, setMenuOpen] = useState(false)


  // 認証
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)

      if (currentUser) {
        await setDoc(doc(db, "users", currentUser.uid), {
          email: currentUser.email,
        }, { merge: true })
      }
    })

    return () => unsubscribe()
  }, [])

  // リアルタイム更新
  useEffect(() => {
    if (!user) return

    const unsubTraining = onSnapshot(
      collection(db, "users", user.uid, "training"),
      (snapshot) => {
        setRecordTraining(snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })))
      }
    )

    const unsubCompetition = onSnapshot(
      collection(db, "users", user.uid, "competition"),
      (snapshot) => {
        setRecordCompetition(snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })))
      }
    )

    return () => {
      unsubTraining()
      unsubCompetition()
    }
  }, [user])

  const record = mode === "training"
    ? recordTraining
    : recordCompetition

  async function addRecordTraining(newRecord) {
    if (!user) return

    await addDoc(collection(db, "users", user.uid, "training"), newRecord)

    await updateDoc(doc(db, "users", user.uid), {
      lastActive: new Date().toISOString().split("T")[0]
    })
  }

  async function addRecordCompetition(newRecord) {
    if (!user) return

    await addDoc(collection(db, "users", user.uid, "competition"), newRecord)

    await updateDoc(doc(db, "users", user.uid), {
      lastActive: new Date().toISOString().split("T")[0]
    })
  }

  async function deleteRecordTraining(id) {
    if (!user) return

    await deleteDoc(doc(db, "users", user.uid, "training", id))
  }

  async function deleteRecordCompetition(id) {
    if (!user) return

    await deleteDoc(doc(db, "users", user.uid, "competition", id))
  }

  // 技名一覧
  function getSkillNames() {
    let names = []
    for (let i = 0; i < record.length; i++) {
      if (!names.includes(record[i].name)) {
        names.push(record[i].name)
      }
    }
    return names
  }

  let skills = getSkillNames()

  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <header className={mode === "training" ? "training-fixed-header" : "competition-fixed-header"}>
        <nav className="header-content">

          {/* 上段 */}
          <div className="header-top">
            <div className="mode-switch">
              <span className={mode === "training" ? "active" : ""}>練習</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={mode === "competition"}
                  onChange={(e) => {
                    setMode(e.target.checked ? "competition" : "training")
                  }}
                />
                <span className="slider"></span>
              </label>
              <span className={mode === "competition" ? "active" : ""}>大会</span>
            </div>

            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              ☰
            </div>
          </div>

          {/* メニュー（下段） */}
          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            <Link to="/profile" onClick={() => setMenuOpen(false)}>
              プロフィール
            </Link>
            <Link to="/" onClick={() => setMenuOpen(false)}>ダッシュボード</Link>
            <Link to="/add" onClick={() => setMenuOpen(false)}>記録</Link>
            <Link to="/records" onClick={() => setMenuOpen(false)}>一覧</Link>
            <Link to="/graph" onClick={() => setMenuOpen(false)}>グラフ</Link>
            <Link to="/team" onClick={() => setMenuOpen(false)}>チーム</Link>
            <button onClick={async () => {
              await signOut(auth)
            }}>
              ログアウト
            </button>
          </div>

        </nav>
      </header>

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
              ? <AddTraining onAdd={addRecordTraining} skills={skills} />
              : <AddCompetition onAdd={addRecordCompetition} skills={skills} />
          }
        />

        <Route
          path="/records"
          element={
            mode === "training"
              ? <RecordsTraining record={record} deleteRecord={deleteRecordTraining} />
              : <RecordsCompetition record={record} deleteRecord={deleteRecordCompetition} />
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