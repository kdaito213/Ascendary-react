function DashboardCompetition({record}){
    if (!record || record.length === 0) {
        return <div>データなし</div>
    }

    const latest = record[record.length-1]

    return (    
        <div className="dashboard-card"> 
            <h1>最新の大会データ</h1>
            <div>
            <p>日程 {latest.date}</p>
            <p>大会名 {latest.name}</p>
            <p>順位 {latest.rank}</p>
            <p>総得点 {latest.score}</p>
            <p>難易度 {latest.difficulty}</p>
            <p>安定度 {latest.stability}</p>
            <p>構成 {latest.composition}</p>
            <p>減点 {latest.deduction}</p>
        </div>
        </div>
    )
}

export default DashboardCompetition
