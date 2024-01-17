import React, { useEffect, useState } from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import dataFootballer from '../../assets/football_players.json'
import CircularProgress from '@mui/material/CircularProgress'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Player {
    Rank: number
    Origin: string
    Player: string
    "From(Country)": string
    "From(Club)": string
    "To(Country)": string
    "To(Club)": string
    Position: string
    "Fee(€ mln)": number
    "Fee(£ mln)": string
    Year: number
    Born: number
}

interface PlayerData {
    data: Player[]
}

function countPlayersByCountry(jsonData: PlayerData): Record<string, number> {
    const playersByCountry: Record<string, number> = {}

    jsonData.data.forEach((player: Player) => {
        const country = player["From(Country)"]
        if (country in playersByCountry) {
            playersByCountry[country]++
        } else {
            playersByCountry[country] = 1
        }
    })

    return playersByCountry
}

const colorsChart = (numberOfLabels: number): string[] => {
    const colors = []
    for (let i = 0; i < numberOfLabels; i++) {
        const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        colors.push(color)
    }

    return colors
};

function setUpChart(labels: string[], dataChart: number[]): ChartData<"doughnut", number[], unknown>
{
    return {
        labels: labels,
        datasets: [{
            label: 'My First Dataset',
            data: dataChart,
            backgroundColor: colorsChart(labels.length),
            hoverOffset: 4,
        }],
    }
}

function GraphCountryFootballer()
{
    const [data, setData] = useState<Player[]>([])
    const [dataChart, setDataChart] = useState<ChartData<"doughnut", number[], unknown>>({
        labels: [],
        datasets: [{
            label: '',
            data: [],
            backgroundColor: [],
            hoverOffset: 4,
        }],
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(dataFootballer)
                const jsonData: PlayerData = {
                    data: dataFootballer,
                }
                
                const playersByCountry = countPlayersByCountry(jsonData)
                const coutries = Object.keys(playersByCountry)

                const numbersCountries = Object.values(playersByCountry)
                            
                const dataSetUpChart = setUpChart(coutries, numbersCountries)
                setDataChart(dataSetUpChart)

            } catch (error: any) {
                console.error('Error setting JSON data:', error.message)
            }
        }

        fetchData()
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '50%', marginTop: '2%' }}>
            {data && dataChart ? (
                <>
                <h3 style={{ marginBottom: '3%' }}>
                    Graphique réparations des joueurs par Pays
                </h3>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%', height: '50vh' }}>
                    <Doughnut data={dataChart} />
                </div>
                </>
            ) : (
                <div>
                <CircularProgress />
                </div>
            )}
        </div>
    )

}

export default GraphCountryFootballer
