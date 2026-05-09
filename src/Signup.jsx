import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase"
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const navigate = useNavigate()

    async function handleSignup() {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                username: username,
                createdAt: new Date().toISOString()
            })

            navigate("/")//登録後トップへ

        } catch (error) {
            console.error(error)
            alert("登録失敗")
        }

    }

    return (
        <div>
            <h2>新規登録</h2>

            <input
                type="text"
                placeholder="ユーザーネーム"
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="email"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleSignup}>
                新規登録
            </button>

            <p onClick={() => navigate("/login")}>
                ログインはこちら
            </p>
        </div>
    )
}

export default Signup