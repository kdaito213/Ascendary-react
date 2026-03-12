function Records({ record, deleteRecord }) {
    let list = []
    let skills = []

    for (let i = 0; i < record.length; i++) {
        if (!skills.includes(record[i].name)) {
            skills.push(record[i].name)
        }
    }

    for (let i = 0; i < skills.length; i++) {
        let skillName = skills[i]

        list.push(
            <h3 key={"skill" + i}>{skillName}</h3>
        )

        for (let j = 0; j < record.length; j++) {
            if (record[j].name === skillName) {
                list.push(
                    <div key={j}>
                        {record[j].date}：{record[j].score}回
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

export default Records