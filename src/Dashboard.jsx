function Dashboard({record}){
    
    function todayRecords(){
        let todayRecord = []
        const today = new Date().toISOString().slice(0,10)

        for(let i=0; i<record.length;i++){
            if(record[i].date == today){
                todayRecord.push(record[i])
            }
        }

        return todayRecord
    }

    let todayRecord = todayRecords()

    let list = []
    for (let i=0; i<todayRecord.length; i++) {
                list.push(
                    <div key={i}>
                    {todayRecord[i].name}：{todayRecord[i].score}回
                    </div>
                )    
            }

    return (    
        <div className="dashboard-card"> 
            <h1>今日の記録</h1>
            {list}
            {todayRecord.length === 0 && <p>今日の記録はありません</p>}
        </div>
    )
}

export default Dashboard