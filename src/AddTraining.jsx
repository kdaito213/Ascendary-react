import { useState } from "react";
import { collection, doc, addDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

function Add({user, skills = []}){
    const [date , setDate] = useState('')
    const [name , setName] = useState('')
    const [score , setScore] = useState('')

    async function addRecordTraining(newRecord) {
        if (!user) return

        await addDoc(collection(db, "users", user.uid, "training"), newRecord)

        await updateDoc(doc(db, "users", user.uid), {
        lastActive: new Date().toISOString().split("T")[0]
        })
    }

    function handleAdd(){
        if(!date || !name || score === '') return
        addRecordTraining({date: date, name: name, score: Number(score)})
        setDate('')
        setName('')
        setScore('')
    }

    return (
        <div>
            <h2>ワンタップ入力</h2>

            <div>
                {skills.map((skill)=>(
                    <button
                        key={skill}
                        onClick={()=> setName(skill)}
                    >
                        {skill}
                    </button>
                ))}
            </div>

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