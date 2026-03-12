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

    function getDates(){
        let dates=[]
        for(let i=0;i<record.length;i++){
            if(!dates.includes(record[i].date)){
            dates.push(record[i].date)
            }
        }
        dates.sort().reverse()
        return dates
    }

    let dates = getDates()

    function consecutiveDays(dates){
        let consecutiveDaysCount = 0
        let day = new Date()
        while(true){
            let strDay = day.toISOString().slice(0,10)
            
            if(dates.includes(strDay)){
                consecutiveDaysCount++
                day.setDate(day.getDate()-1)
            }else{
                break
            }
        }

        return consecutiveDaysCount
    }

    let todayRecord = todayRecords()

    let todayList = []
    for (let i=0; i<todayRecord.length; i++) {
        todayList.push(
            <div key={i}>
                {todayRecord[i].name}：{todayRecord[i].score}回
            </div>
        )    
    }

    let consecutiveDay = consecutiveDays(dates)

    return (    
        <div className="dashboard-card"> 
            <h1>今日の記録</h1>
            {todayList}
            {todayRecord.length === 0 && <p>今日の記録はありません</p>}
            <h1>連続記録日数</h1>
            <p>連続記録日数は{consecutiveDay}日です</p>

        </div>
    )
}

export default Dashboard
