import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

function useRecords(user) {
    const [recordTraining, setRecordTraining] = useState([])
    const [recordCompetition, setRecordCompetition] = useState([])

    // リアルタイム更新
    useEffect(() => {
        if (!user) {
            setRecordTraining([])
            setRecordCompetition([])
            return
        }

        const unsubTraining = onSnapshot(
            collection(db, "users", user.uid, "training"),
            (snapshot) => {
                setRecordTraining(snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })))
            }
        )

        const unsubCompetition = onSnapshot(
            collection(db, "users", user.uid, "competition"),
            (snapshot) => {
                setRecordCompetition(snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })))
            }
        )

        return () => {
            unsubTraining()
            unsubCompetition()
        }
    }, [user])

    return {
        recordTraining,
        recordCompetition
    }
}

export default useRecords