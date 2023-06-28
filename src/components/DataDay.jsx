
import React, { useEffect } from "react"
import { Bar, Pie, Line} from "react-chartjs-2"
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
const BarChart = ({ data }) => {
    const labeldata = [
        "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"
    ]
    const dates = data?.map(({ createdAt }) => (new Date(createdAt)?.getHours()))
    const arrcounter = [];
    for (let i = 0; i < labeldata.length; ++i) {
        let counter = 0;
        for (let j = 0; j < dates?.length; ++j) {
            if (labeldata[i] == dates[j]) {
                ++counter;
            }
        }
        arrcounter.push(counter)
    }

    const exm = {
        labels: labeldata,
        datasets: [
            {
                label: "ticket data",
                data: arrcounter,
            }
        ],
        datalabels: {
            backgroundColor: function (context) {
                return context.dataset.backgroundColor;
            },
            borderColor: 'white',
            borderRadius: 25,
            borderWidth: 3,
            color: 'white',
            font: {
                weight: 'bold'
            },
            padding: 6,


        }


    }
    return (
        <Line data={exm} />
    )
}

export default BarChart