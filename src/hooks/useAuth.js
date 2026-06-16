import { useState, useEffect } from "react"
import { auth, db } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

function useAuth() {
    const [user, setUser] = useState(null)

    // 認証
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser)

            if (currentUser) {
                await setDoc(doc(db, "users", currentUser.uid), {
                    email: currentUser.email,
                }, { merge: true })
            }
        })

        return () => unsubscribe()
    }, [])

    return user
}

export default useAuth
