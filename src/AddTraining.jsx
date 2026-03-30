import { useState } from "react";

function Add({onAdd}){
    const [date , setDate] = useState('')
    const [name , setName] = useState('')
    const [score , setScore] = useState()

    function handleAdd(){
        onAdd({date: date, name: name, score: score})
        setDate('')
        setName('')
        setScore(0)
    }

    return (
        <div>
            <h1>技の記録</h1>
            <h2>記録日</h2>
            <input 
                type="date"
                value={date}
                onChange={(e)=>setDate(e.target.value)}
            />
            <h2>技名</h2>
            <input  
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
            />
            <h2>練習回数</h2>
            <input 
                type="number" 
                value={score} 
                onChange={(e) => setScore(Number(e.target.value))}
            />
            <button onClick={handleAdd}>記録に追加</button>
        </div>
    )
}

export default Add