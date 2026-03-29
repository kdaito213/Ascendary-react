import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

function GraphTraining({ data, skills }) {

    return (
        <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {skills.map((skill, i) => (
            <Line
            key={i}
            type="monotone"
            dataKey={skill}
            stroke="#8884d8"
            />
        ))}

        </LineChart>
    )
}

export default GraphTraining