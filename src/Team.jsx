import { useState, useEffect } from "react"
import {
    collection,
    addDoc,
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    getDoc,
    getDocs,
    query,
    where
} from "firebase/firestore"

import { db } from "./firebase"

function Team({ user }) {
    const [teamName, setTeamName] = useState("")
    const [teamIdInput, setTeamIdInput] = useState("")
    const [myTeam, setMyTeam] = useState([])
    const [newName, setNewName] = useState("")
    const [membersMap, setMembersMap] = useState({})

    // チーム新規作成
    async function createTeam() {
        if (!teamName) return

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
        if (!teamIdInput) return

        const ref = doc(db, "teams", teamIdInput)

        await updateDoc(ref, {
            members: arrayUnion(user.uid)
        })

        await fetchMyTeam()

        setTeamIdInput("")
        alert("参加完了")
    }

    // メンバー取得
    async function fetchMembersForTeams(teams) {
        const result = {}

        for (const team of teams) {
            const promises = team.members.map(async (uid) => {
                const snap = await getDoc(doc(db, "users", uid))
                return snap.exists() ? { uid, ...snap.data() } : null
            })

            let list = (await Promise.all(promises)).filter(Boolean)

            list.sort((a, b) => a.uid === user.uid ? -1 : 1)

            result[team.id] = list
        }

        setMembersMap(result)
    }

    // 自分のチーム取得
    async function fetchMyTeam() {
        const q = query(
            collection(db, "teams"),
            where("members", "array-contains", user.uid)
        )

        const snap = await getDocs(q)

        const teams = snap.docs.map(docSnap => ({
            id: docSnap.id,
            ...docSnap.data()
        }))
        setMyTeam(teams)

        if (teams.length > 0) {
            fetchMembersForTeams(teams)
        }
    }

    function getInactiveDays(lastActive) {
        if (!lastActive) return 999

        const today = new Date()
        const last = new Date(lastActive)

        const diff = (today - last) / (1000 * 60 * 60 * 24)
        return Math.floor(diff)
    }

    function isTeamOut(members) {
        return members.some(m => getInactiveDays(m.lastActive) >= 3)
    }

    async function leaveTeam(teamId) {
        const ref = doc(db, "teams", teamId)

        await updateDoc(ref, {
            members: arrayRemove(user.uid)
        })

        await fetchMyTeam()
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
                    onChange={(e) => setTeamName(e.target.value)}
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

                {myTeam.length > 0 ? (
                    myTeam.map(team => {
                        const members = membersMap[team.id] || []

                        return (
                            <div key={team.id} style={{ marginBottom: "30px" }} className="card">
                                <p>チーム名: {team.name}</p>
                                <p>チームID: {team.id}</p>
                                <button onClick={() => {
                                    navigator.clipboard.writeText(team.id)
                                    alert("コピーしました")
                                }}>
                                    IDコピー
                                </button>
                                <p>メンバー数: {team.members.length}</p>
                                {members.length === 0 && <p>メンバーなし</p>}

                                <h3>メンバー一覧</h3>
                                {members.map((m,index) => {
                                    const days = getInactiveDays(m.lastActive)

                                    return (
                                        <div key={m.uid}>
                                            <p>
                                                {m.username || m.email}
                                                {m.uid === user.uid && "(自分)"}
                                            </p>
                                            <p>最終記録: {m.lastActive || "なし"}</p>
                                            <p>放置日数: {days}日</p>
                                            {days >= 3 && (
                                                <p style={{ color: "red" }}>アウト</p>
                                            )}

                                            {m.uid === user.uid && (
                                                <button onClick={() => leaveTeam(team.id)}>
                                                    脱退
                                                </button>
                                            )}

                                            {index !== members.length - 1 && <hr />}
                                        </div>
                                    )
                                })}

                                <div>
                                    {isTeamOut(members) ? (
                                        <h3 style={{ color: "red" }}>チーム失敗</h3>
                                    ) : (
                                        <h3 style={{ color: "green" }}>継続中</h3>
                                    )}
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <p>未所属</p>
                )}

                <h2>ユーザー名変更</h2>
                <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="ユーザー名"
                />

                <button onClick={async () => {
                    if (!newName.trim()) return

                    await updateDoc(doc(db, "users", user.uid), {
                        username: newName
                    })
                    await fetchMyTeam()
                    setNewName("")
                    alert("変更完了")
                }}>
                    変更
                </button>
            </div>
        </div>
    )
}

export default Team