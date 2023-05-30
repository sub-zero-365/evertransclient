
import React, { useEffect } from "react"
import { Bar,Pie, } from "react-chartjs-2"
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
    
    useEffect(() => {


        return () => {
        }
    }, [])

    return (
        <Bar data={chartData} />

    )
}

export default BarChart