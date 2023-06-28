
import React, { useEffect } from "react"
import { Bar,Pie,Line } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip, Legend
} from 'chart.js/auto'
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip, Legend

)
const BarChart = ({ chartData }) => {
    return (
        <Bar data={chartData} />
    )
}

export default BarChart