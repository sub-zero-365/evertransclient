
// import React, { useEffect } from "react"
import { Bar,Line,Pie, Chart } from "react-chartjs-2"
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
const PieChart = ({ chartData }) => {

    return (
        <Pie  data={chartData} />
    )
}

export default PieChart