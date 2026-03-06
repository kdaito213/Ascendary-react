import { useState , useEffect } from 'react'
import './App.css'
import Add from './Add.jsx'
import Graph from "./Graph.jsx"
import Dashboard from "./Dashboard.jsx"

// localStorage.clear

function App() {
  const [record, setRecord] = useState(() => {
    const savedRecord = localStorage.getItem("record")
    if(savedRecord){
      return JSON.parse(savedRecord)
    }
    return[]
  })

  function addRecord(newRecord){
    setRecord([...record, newRecord])
  }

  // ローカルストレージに保存
  useEffect(() => {
    localStorage.setItem("record", JSON.stringify(record))
  }, [record]);

  // 重複する技名をまとめる
  function getRecordsByName(name){
    let result=[]
    for(let i= 0; i<record.length; i++){
      if(record[i].name == name){
        result.push(record[i])
      }
    }
    return result
  }

  // 技名だけ一覧を作る
  function getSkillNames(){
    let names = []
    for(let i =0; i<record.length; i++){
      if(!names.includes(record[i].name)){
        names.push(record[i].name)
      }
    }
    return names
  }
  // 削除関数  
  function deleteRecord(index){
    let newRecord=[]

    for(let i=0; i<record.length; i++){
      if(i !== index){
        newRecord.push(record[i])
      }
    }

    setRecord(newRecord)
  }

  // グラフに変換
  function makeGraphData(){
    let dates = []

    for(let i=0;i<record.length;i++){
      if(!dates.includes(record[i].date)){
        dates.push(record[i].date)
      }
    }

    // 日付順に
    dates.sort()

    let data = []

    for(let i=0;i<dates.length;i++){

      let obj = {date: dates[i]}

      for(let j=0;j<record.length;j++){
        if(record[j].date === dates[i]){
          obj[record[j].name] = record[j].score
        }
      }

      data.push(obj)
    }

    return data
  }
  let graphData = makeGraphData()

  // 一覧表示
  let list=[]
  let skills = getSkillNames()

  for(let i=0; i<skills.length; i++){
    let skillName = skills[i]
    let records = getRecordsByName(skillName)

    list.push(
      <h3 key={"skill"+i}>{skillName}</h3> 
    )

    for(let j=0; j<record.length; j++){

      if(record[j].name === skillName){
        list.push(
          <div key={j}>
            {record[j].date}：{record[j].score}回
            <button onClick={()=>deleteRecord(j)}>削除</button>
          </div>
        )
      }
    }
  }

  return(
    <div>
      <Dashboard record={record}/>
      <Add onAdd={addRecord}/>
      <h2>記録一覧</h2>
      {list}
      <h2>グラフ</h2>
      <Graph data={graphData} skills={skills}/>
    </div>
  )
}

export default App
