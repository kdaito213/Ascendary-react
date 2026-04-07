import { useState, useEffect } from "react"
import {
    collection,
    addDoc,
    doc,
    updateDoc,
    arrayUnion,
    getDoc
} from "firebase/firestore"

import { db } from "./firebase"

function Team({user}){
    const [teamName, setTeamName] = useState("")
    const [teamIdInput, setTeamIdInput] = useState("")
    const [myTeam, setMyTeam] = useState(null)

    // チーム新規作成
    async function createTeam() {
        if(!teamName) return

        const docRef = await addDoc(collection(db, "teams"), {
            name: teamName,
            members: [user.uid],
            createdAt: new Date()
        })

        await fetchMyTeam()

        setTeamName("")
        alert("作成完了: " + docRef.id)
    }

    // チーム参加
    async function joinTeam() {
        if(!teamIdInput) return

        const ref = doc(db, "teams", teamIdInput)

        await updateDoc(ref, {
            members: arrayUnion(user.uid)
        })

        await fetchMyTeam()

        setTeamIdInput("")
        alert("参加完了")
    }
    
    // 自分のチーム取得（簡易版）
    async function fetchMyTeam() {
        const q = collection(db, "teams")

        const all = await getDoc(q)
    
        let found = null
    
        all.forEach(docSnap => {
            const data = docSnap.data()
            if (data.members.includes(user.uid)) {
                found = { id: docSnap.id, ...data }
            }
        })
        setMyTeam(found)
    }
    
    useEffect(() => {
        if (user) fetchMyTeam()
    }, [user])

    return (
        <div>
            <h1>チーム</h1>

            {/*作成*/}
            <div>
                <h2>チーム新規作成</h2>
                <input 
                    value={teamName}
                    onChange={(e)=> setTeamName(e.target.value)}
                    placeholder="チーム名"
                />
                <button onClick={createTeam}>作成</button>
            </div>
            {/* 参加 */}
            <div>
                <h2>チーム参加</h2>
                <input
                    value={teamIdInput}
                    onChange={(e) => setTeamIdInput(e.target.value)}
                    placeholder="チームID"
                />
                <button onClick={joinTeam}>参加</button>
            </div>

            {/* 自分のチーム */}
            <div>
                <h2>自分のチーム</h2>

                {myTeam ? (
                <div>
                    <p>チーム名: {myTeam.name}</p>
                    <p>チームID: {myTeam.id}</p>
                    <p>メンバー数: {myTeam.members.length}</p>
                </div>
                ) : (
                <p>未所属</p>
                )}
            </div>
        </div>
    )
}

export default Team