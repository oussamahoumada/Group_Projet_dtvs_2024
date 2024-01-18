import React, { useEffect, useState } from "react"
import dataFootballer from '../../assets/football_players_exo3.json'
import CircularProgress from '@mui/material/CircularProgress'
import ChartComponent from "./ChartComponent"

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

function GraphCountryFootballer()
{
    const [data, setData] = useState<Player[]>([])
    const [labels, setLabels] = useState<string[]>([])
    const [dataCountries, setDatasCountries] = useState<number[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(dataFootballer)
                const jsonData: PlayerData = {
                    data: dataFootballer,
                }
                
                const playersByCountry = countPlayersByCountry(jsonData)
                const coutries = Object.keys(playersByCountry)
                setLabels(coutries)

                const numbersCountries = Object.values(playersByCountry)
                setDatasCountries(numbersCountries)

            } catch (error: any) {
                console.error('Error setting JSON data:', error.message)
            }
        }

        fetchData()
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '50%', marginTop: '2%' }}>
            {data ? (
                <>
                <h3 style={{ marginBottom: '3%' }}>
                    Graphique réparations des joueurs par Pays
                </h3>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%', height: '50vh' }}>
                    <ChartComponent
                        labels={labels}
                        data={dataCountries}
                        chartLabel='doughnut'
                        titleChart="Graphique réparations des joueurs par Pays"
                    />
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
