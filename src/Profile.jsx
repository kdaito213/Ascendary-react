import { useState, useEffect } from "react"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "./firebase"

function Profile({ user }) {
    const [username, setUsername] = useState("")
    const [newName, setNewName] = useState("")

    useEffect(() => {
        async function fetchUser() {
            if (!user) return
            const docRef = doc(db, "users", user.uid)
            const snap = await getDoc(doc(db, "users", user.uid))
            if (snap.exists()) {
                setUsername(snap.data().username)
                setNewName(snap.data().username)
            }
        }

        fetchUser()
    }, [user])

    async function handleUpdate() {
        if (!newName) return

        await updateDoc(doc(db, "users", user.uid), {
            username: newName
        })

        setUsername(newName)
        alert("変更完了")
    }

    return (
        <div>
            <h2>プロフィール</h2>

            <p>現在の名前：{username}</p>

            <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
            />

            <button onClick={handleUpdate}>
                変更する
            </button>
        </div>
    )
}

export default Profile