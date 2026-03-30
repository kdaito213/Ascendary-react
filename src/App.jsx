import { useState , useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import AddTraining from './AddTraining.jsx'
import AddCompetition from './AddCompetition.jsx'
import GraphTraining from "./GraphTraining.jsx"
import GraphCompetition from './GraphCompetition.jsx'
import Dashboard from "./Dashboard.jsx"
import RecordsTraining  from './RecordsTraining.jsx'
import RecordsCompetition from './RecordsCompetition.jsx'

function App() {

  const [mode, setMode] = useState("training")

  const [recordTraining, setRecordTraining] = useState(() => {
    const savedRecordTraining = localStorage.getItem("recordTraining")
    if(savedRecordTraining){
      return JSON.parse(savedRecordTraining)
    }
    return []
  })

  const [recordCompetition, setRecordCompetition] = useState(() => {
    const savedRecordCompetition = localStorage.getItem("recordCompetition")
    if(savedRecordCompetition){
      return JSON.parse(savedRecordCompetition)
    }
    return []
  })

  const record = mode === "training"
    ? recordTraining
    : recordCompetition

  function addRecordTraining(newRecord){
    setRecordTraining([...recordTraining, newRecord])
  }

  function addRecordCompetition(newRecord){
    setRecordCompetition([...recordCompetition, newRecord])
  }

  useEffect(() => {
    localStorage.setItem("recordTraining", JSON.stringify(recordTraining))
  }, [recordTraining])

  useEffect(() => {
    localStorage.setItem("recordCompetition", JSON.stringify(recordCompetition))
  }, [recordCompetition])

  function deleteRecordTraining(index){
    let newRecord=[]
    for(let i=0;i<recordTraining.length;i++){
      if(i!==index){
        newRecord.push(recordTraining[i])
      }
    }
    setRecordTraining(newRecord)
  }

  function deleteRecordCompetition(index){
    let newRecord=[]
    for(let i=0;i<recordCompetition.length;i++){
      if(i!==index){
        newRecord.push(recordCompetition[i])
      }
    }
    setRecordCompetition(newRecord)
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

    dates.sort()

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
    element={<Dashboard record={record} mode={mode}/>}
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
      ?<GraphTraining data={makeGraphData(recordTraining)} skills={skills}/>
      :<GraphCompetition record={recordCompetition}/>
    }
  />

  </Routes>

  </BrowserRouter>
  )
}

export default App