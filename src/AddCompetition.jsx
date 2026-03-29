import { useState } from "react";

function Add({onAdd}){
    const [date , setDate] = useState('')
    const [name , setName] = useState('')
    const [rank , setRank] = useState('')
    const [score , setScore] = useState('')
    const [difficulty , setDifficulty] = useState('')
    const [stability , setStability] = useState('')
    const [composition , setComposition] = useState('')
    const [deduction, setDeduction] = useState('')

    function handleAdd(){
        onAdd({
            date: date, 
            name: name, 
            rank: rank, 
            score: score, 
            difficulty: difficulty,
            stability: stability,
            composition: composition,
            deduction: deduction
        })
        setDate('')
        setName('')
        setRank(0)
        setScore(0)
        setDifficulty(0)
        setStability(0)
        setComposition(0)
        setDeduction(0)
    }

    return (
        <div>
            <h1>大会の記録</h1>
            <h2>大会日</h2>
            <input 
                type="date"
                value={date}
                onChange={(e)=>setDate(e.target.value)}
            />
            <h2>大会名</h2>
            <input  
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
            />
            <h2>順位</h2>
            <input  
                type="number" 
                value={rank} 
                onChange={(e) => setRank(e.target.value)}
            />
            <h2>総得点</h2>
            <input 
                type="number" 
                value={score} 
                onChange={(e) => setScore(e.target.value)}
            />
            <h2>難易度</h2>
            <input 
                type="number" 
                value={difficulty} 
                onChange={(e) => setDifficulty(e.target.value)}
            />
            <h2>安定度</h2>
            <input 
                type="number" 
                value={stability} 
                onChange={(e) => setStability(e.target.value)}
            />
            <h2>構成</h2>
            <input 
                type="number" 
                value={composition} 
                onChange={(e) => setComposition(e.target.value)}
            />
            <h2>減点</h2>
            <input 
                type="number" 
                value={deduction} 
                onChange={(e) => setDeduction(e.target.value)}
            />
            <button onClick={handleAdd}>記録に追加</button>
        </div>
    )
}

export default Add