import { deleteDoc, doc } from "firebase/firestore"
import { db } from "./firebase"

function RecordsCompetition({ record, user }) {
    let list = []
    let competitionsName = []
    let competitionsRank = []
    let competitionsDate = []

    async function deleteRecordCompetition(id) {
        if (!user) return

        await deleteDoc(doc(db, "users", user.uid, "competition", id))
    }

    for (let i = 0; i < record.length; i++) {
        if (!competitionsName.includes(record[i].name)) {
            competitionsName.push(record[i].name)
            competitionsRank.push(record[i].rank)
            competitionsDate.push(record[i].date)
        }
    }

    for (let i = 0; i < competitionsName.length; i++) {
        let competitionName = competitionsName[i]
        let competitionRank = competitionsRank[i]
        let competitionDate = competitionsDate[i]

        for (let j = 0; j < record.length; j++) {
            if (record[j].name === competitionName) {

                list.push(
                    <div className="competition-card" key={record[j].date + j}>

                        <div className="competition-header">
                            <h3>{competitionName}</h3>
                            <p>{competitionDate}</p>
                            <p className="rank">{competitionRank}位</p>
                        </div>

                        <div className="score-grid">
                            <p>総得点 {record[j].score}</p>
                            <p>難易度 {record[j].difficulty}</p>
                            <p>安定度 {record[j].stability}</p>
                            <p>構成 {record[j].composition}</p>
                            <p>減点 {record[j].deduction}</p>
                        </div>

                        <button onClick={() => deleteRecordCompetition(record[j].id)}>削除</button>

                    </div>
                )
            }
        }
    }

    return (
        <div>
            <h2>大会記録</h2>
            <div className="competition-container">
                {list}
            </div>
        </div>
    )
}

export default RecordsCompetition