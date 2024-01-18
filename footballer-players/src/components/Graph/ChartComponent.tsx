import React, { useEffect, useState } from 'react'
import { Doughnut, Bar, Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    ChartData,
    ArcElement,
    Filler,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Title,
    BarElement,
    Legend
} from "chart.js"
import { colorsChart } from '../../utils/colorsChar'

type ChartType = 'doughnut' | 'bar' | 'line'

interface ChartComponentProps {
    labels: string[]
    data: number[]
    chartLabel: ChartType,
    titleChart: string
}

ChartJS.register(
    Filler,
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
)

function setUpChart(labels: string[], dataChart: number[]): ChartData<'doughnut' | 'bar' | 'line', number[], unknown>
{
    return {
        labels: labels,
        datasets: [{
            label: 'Chart',
            data: dataChart,
            backgroundColor: colorsChart(labels.length),
            hoverOffset: 4,
            fill: true,
        }],
    }
}

// function setUpChart(labels: string[], dataChart: number[]): ChartData<'doughnut' | 'bar' | 'line', number[], unknown> {
//     const datasets = labels.map((label, index) => ({
//         label: `Chart ${label}`,
//         // data: [dataChart[index]],
//         data: labels.map((dataLabel) => dataLabel),
//         backgroundColor: colorsChart(labels.length),
//         hoverOffset: 4,
//     }))
  
//     return {
//         labels: labels,
//         datasets: datasets,
//     }
// }

const optionsBar = (title: string) => {
    return {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: title,
            },
        },
    }
}

function chartToReturned(chartLabel: string, title: string, dataChart: ChartData<'doughnut' | 'bar' | 'line', number[], unknown>) {
    if (chartLabel === 'doughnut') {
        return <Doughnut data={dataChart as ChartData<"doughnut", number[], unknown>} options={optionsBar(title)} />
    } else if (chartLabel === 'bar') {
        return <Bar data={dataChart as ChartData<"bar", number[], unknown>} options={optionsBar(title)} />
    } else if (chartLabel === 'line') {
        return <Line data={dataChart as ChartData<"line", number[], unknown>} options={optionsBar(title)}/>
    } else {
        console.error(`Unsupported chart type: ${chartLabel}`)
        return <div></div>
    }
}

const ChartComponent: React.FC<ChartComponentProps> = ({ labels, data, chartLabel, titleChart }) => {
    const [dataChart, setDataChart] = useState<ChartData<'doughnut' | 'bar' | 'line', number[], unknown>>({
        labels: [],
        datasets: [{
            label: '',
            data: [],
            backgroundColor: [],
            hoverOffset: 4,
        }],
    })

    useEffect(() => {
        const setUp = setUpChart(labels, data)
        setDataChart(setUp)
    }, [labels, data])

    return chartToReturned(chartLabel, titleChart, dataChart)
}

export default ChartComponent
