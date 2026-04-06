import { useState , useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import AddTraining from './AddTraining.jsx'
import AddCompetition from './AddCompetition.jsx'
import GraphTraining from "./GraphTraining.jsx"
import GraphCompetition from './GraphCompetition.jsx'
import DashboardTraining from './DashboardTraining.jsx'
import DashboardCompetition from './DashboardCompetition.jsx'
import RecordsTraining  from './RecordsTraining.jsx'
import RecordsCompetition from './RecordsCompetition.jsx'
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from './firebase.js'

function App() {

  useEffect(()=>{
    async function fetchAll() {
      const trainingSnapshot = await getDocs(collection(db,"training"))
      const competitionSnapshot = await getDocs(collection(db,"competition"))

      setRecordTraining(trainingSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
      })))

      setRecordCompetition(competitionSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
      })))
    }
    fetchAll()

  },[])

  const [mode, setMode] = useState("training")

  const [recordTraining, setRecordTraining] = useState([])

  const [recordCompetition, setRecordCompetition] = useState([])

  const record = mode === "training"
    ? recordTraining
    : recordCompetition

  async function addRecordTraining(newRecord){
    const docRef = await addDoc(collection(db, "training"), newRecord)

    setRecordTraining(prev => [
      ...prev,
      { id: docRef.id, ...newRecord }
    ])
  }

  async function addRecordCompetition(newRecord){
    const docRef = await addDoc(collection(db, "competition"), newRecord)

    setRecordCompetition(prev => [
      ...prev,
      {id: docRef.id, ...newRecord}
    ])
  }

  async function deleteRecordTraining(id){
    await deleteDoc(doc(db, "training", id))

    setRecordTraining(prev => prev.filter(r => r.id !== id))
  }

  async function deleteRecordCompetition(id){
    await deleteDoc(doc(db, "competition",id))

    setRecordCompetition(prev => prev.filter(r => r.id !== id))
  }

  // 技名一覧
  function getSkillNames(){
    let names=[]
    for(let i=0;i<record.length;i++){
      if(!names.includes(record[i].name)){
        names.push(record[i].name)
      }
    }
    return names
  }

  let skills = getSkillNames()

  // グラフ用データ
  function makeGraphData(targetRecord){
    let dates=[]

    for(let i=0;i<targetRecord.length;i++){
      if(!dates.includes(targetRecord[i].date)){
        dates.push(targetRecord[i].date)
      }
    }

    dates.sort((a,b)=> new Date(a) - new Date(b))

    let data=[]

    for(let i=0;i<dates.length;i++){

      let obj={date:dates[i]}

      for(let j=0;j<targetRecord.length;j++){
        if(targetRecord[j].date===dates[i]){
          obj[targetRecord[j].name]=targetRecord[j].score
        }
      }

      data.push(obj)
    }

    return data
  }

  return(

  <BrowserRouter>
  <header className={mode === "training" ? "training-fixed-header" : "competition-fixed-header"}> 
    <nav className="header-content">
      <div className="mode-switch">
        <span className={mode === "training" ? "active" : ""}>
          練習
        </span>
        <label className="switch">
          <input 
            type="checkbox" 
            checked={mode === "competition"}
            onChange={(e)=>{
              if(e.target.checked){
                setMode("competition")
              }else{
                setMode("training")
              }
            }}
          />
          <span className="slider"></span>
        </label>
        <span className={mode === "competition" ? "active" : ""}>
          大会
        </span>
      </div>
      
      <Link to="/">ダッシュボード</Link>
      <Link to="/add">記録</Link>
      <Link to="/records">一覧</Link>
      <Link to="/graph">グラフ</Link>
    </nav>
  </header>

  <Routes>

  <Route
    path="/"
    element={
      mode === "training"
      ?<DashboardTraining record={record} mode={mode}/>
      :<DashboardCompetition record={record} mode={mode}/>
    }
  />

  <Route
    path="/add"
    element={
      mode==="training"
        ?<AddTraining onAdd={addRecordTraining}/>
        :<AddCompetition onAdd={addRecordCompetition}/>
    }
  />

  <Route
    path="/records"
    element={
      mode==="training"
        ?<RecordsTraining record={record} deleteRecord={deleteRecordTraining}/>
        :<RecordsCompetition record={record} deleteRecord={deleteRecordCompetition}/>
    }
  />
  

  <Route
    path="/graph"
    element={
      mode === "training"
      ?<GraphTraining record={recordTraining}/>
      :<GraphCompetition record={recordCompetition}/>
    }
  />

  </Routes>
  </BrowserRouter>
  )
}

export default App