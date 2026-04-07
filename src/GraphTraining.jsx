import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

function makeGraphDataBySkill(record, skill){
    const filtered = record.filter(r => r.name === skill)

    const dates = [...new Set(filtered.map(r => r.date))]
    dates.sort((a,b)=> new Date(a) - new Date(b))

    return dates.map(date => {
        const target = filtered.find(r => r.date === date)
        return {
            date,
            score: target ? target.score : 0
        }
    })
}

function GraphTraining({record}) {
    const skills = [...new Set(record.map(r => r.name))]

    return (
        <div>
        <h2>グラフ</h2>

        {skills.map((skill) => (
            <div key={skill} style={{marginBottom: "30px"}}>
                <h3>{skill}</h3>
                <div style={{ width: "100%", height: "250px" }}>
                    <ResponsiveContainer>
                        <LineChart
                            data={makeGraphDataBySkill(record, skill)}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />

                            <Line
                                type="monotone"
                                dataKey="score"
                                stroke="#8884d8"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        ))}
        </div>
    )
}

export default GraphTraining