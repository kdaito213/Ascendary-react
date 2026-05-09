import { useState } from "react"
import { auth } from "./firebase"
import { signInWithEmailAndPassword } from "firebase/auth/web-extension"
import { useNavigate } from "react-router-dom"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function handleLogin(){
        try{
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/")
        }catch(error){
            console.error(error)
            alert("ログイン失敗")
        }
    }

    return (
        <div>
            <h2>ログイン</h2>

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

            <button onClick={handleLogin}>
                ログイン
            </button>

            <p onClick={() => navigate("/signup")}>
                新規登録はこちら
            </p>
        </div>
    )
}

export default Login