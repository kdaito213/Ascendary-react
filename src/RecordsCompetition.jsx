function RecordsCompetition({ record, deleteRecord }) {
    let list = []
    let competitionsName = []
    let competitionsRank = []
    let competitionsDate = []

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

        list.push(
            <h3 key={"competition" + i}>
                {competitionName} {competitionRank}位 {competitionDate}
            </h3>
        )

        for (let j = 0; j < record.length; j++) {
            if (record[j].name === competitionName) {
                list.push(
                    <div key={j}>
                        <p>総得点{record[j].score}点</p>
                        <p>難易度{record[j].difficulty}点</p>
                        <p>安定度{record[j].stability}点</p>
                        <p>構成{record[j].composition}点</p>
                        <p>減点{record[j].deduction}点</p>
                        <button onClick={() => deleteRecord(j)}>削除</button>
                    </div>
                )
            }
        }
    }

    return (
        <div>
            <h2>記録一覧</h2>
            {list}
        </div>
    )
}

export default RecordsCompetition