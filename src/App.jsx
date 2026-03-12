import { useState , useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Add from './Add.jsx'
import Graph from "./Graph.jsx"
import Dashboard from "./Dashboard.jsx"
import Records  from './Records.jsx'

function App() {

  const [record, setRecord] = useState(() => {
    const savedRecord = localStorage.getItem("record")
    if(savedRecord){
      return JSON.parse(savedRecord)
    }
    return []
  })

  function addRecord(newRecord){
    setRecord([...record, newRecord])
  }

  useEffect(() => {
    localStorage.setItem("record", JSON.stringify(record))
  }, [record])

  function deleteRecord(index){
    let newRecord=[]
    for(let i=0;i<record.length;i++){
      if(i!==index){
        newRecord.push(record[i])
      }
    }
    setRecord(newRecord)
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
  function makeGraphData(){
    let dates=[]

    for(let i=0;i<record.length;i++){
      if(!dates.includes(record[i].date)){
        dates.push(record[i].date)
      }
    }

    dates.sort()

    let data=[]

    for(let i=0;i<dates.length;i++){

      let obj={date:dates[i]}

      for(let j=0;j<record.length;j++){
        if(record[j].date===dates[i]){
          obj[record[j].name]=record[j].score
        }
      }

      data.push(obj)
    }

    return data
  }

  let graphData = makeGraphData()

  return(

  <BrowserRouter>

  <nav>
    <Link to="/">Dashboard</Link>
    <Link to="/add">記録</Link>
    <Link to="/records">一覧</Link>
    <Link to="/graph">グラフ</Link>
  </nav>

  <Routes>

  <Route
    path="/"
    element={<Dashboard record={record}/>}
  />

  <Route
    path="/add"
    element={<Add onAdd={addRecord}/>}
  />

  <Route
    path="/records"
    element={
      <Records
        record={record}
        deleteRecord={deleteRecord}
      />
    }
  />

  <Route
    path="/graph"
    element={
      <Graph
        data={graphData}
        skills={skills}
      />
    }
  />

  </Routes>

  </BrowserRouter>
  )
}

export default App