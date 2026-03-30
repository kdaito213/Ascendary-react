import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Legend,
    Tooltip
}from "recharts"
import { useEffect, useState } from "react"

function GraphCompetition({record}){
    
    const [visible, setVisible] = useState(
        record.reduce((acc, r) => {
            const key = `${r.name}_${r.date}`
            acc[key]=true
            return acc
        },{})
    )


    const subjects = ["難易度", "安定度", "構成"]

    const data = subjects.map(subject => {
        const obj = {subject}

        record.forEach(r => {
            const key = `${r.name}_${r.date}`

            if(subject==="難易度") obj[key] = r.difficulty
            if(subject==="安定度") obj[key] = r.stability
            if(subject==="構成") obj[key] = r.composition       
        })

        return obj
            
    })
    
    return (
        <div>
            <h2>大会比較グラフ</h2>

            <div style={{ marginBottom: "20px" }}>
                {record.map((r) => {
                    const key = `${r.name}_${r.date}`

                    return (
                        <label key={key} style={{ marginRight: "15px" }}>
                            <input
                                type="checkbox"
                                checked={visible[key]}
                                onChange={() =>
                                    setVisible(prev => ({
                                        ...prev,
                                        [key]: !prev[key]
                                    }))
                                }
                            />
                            {r.name}（{r.date}）
                        </label>
                    )
                })}
            </div>

            <RadarChart width={400} height={400} data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Legend />
                <Tooltip />

                {record.map((r, index) => {
                    const key = `${r.name}_${r.date}`

                    if (!visible[key]) return null

                    return (
                        <Radar
                            key={key}
                            name={`${r.name} (${r.date})`}
                            dataKey={key}
                            stroke={`hsl(${index * 60}, 70%, 50%)`}
                            fill={`hsl(${index * 60}, 70%, 50%)`}
                            fillOpacity={0.3}
                        />
                    )
                })}
            </RadarChart>
        </div>
    )
}

export default GraphCompetition