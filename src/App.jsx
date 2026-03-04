import { useState , useEffect } from 'react'
import './App.css'
import Add from './Add.jsx'

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

  // 一覧表示
  let list=[]
  for(let i=0; i<record.length;i++){
    list.push(
      <div key={i}>
        {record[i].name}:{record[i].score}回
      </div>
    )
  }

  return(
    <div>
      <Add onAdd={addRecord}/>
      <h2>記録一覧</h2>
      {list}
    </div>
  )
}

export default App
