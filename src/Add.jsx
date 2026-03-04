import { useState , useEffect } from "react";

function Add({onAdd}){
    const [name , setName] = useState('')
    const [score , setScore] = useState(0)

    function handleAdd(){
        onAdd({name: name, score: score})
        setName('')
        setScore(0)
    }
    

    return (
        <div>
            <h1>技の記録</h1>
            <h2>技名</h2>
            <input  
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
            />
            <h2>回数</h2>
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