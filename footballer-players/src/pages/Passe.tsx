import React, { useEffect, useState } from "react";
import ChartComponent from "../components/Graph/ChartComponent";
import { CircularProgress } from "@mui/material";
import { getTopAssists, getTopPPA, getTopSw } from "../helpers/passHelpers";

function Passe() {
    
    const [labelsTopAssists, setLabelsTopAssists] = useState<string[]>([])
    const [dataTopAssists, setDatasTopAssists] = useState<number[]>([])

    const [labelsTopPPA, setLabelsTopPPA] = useState<string[]>([])
    const [dataTopPPA, setDatasTopPPA] = useState<number[]>([])

    const [labelsTopSw, setLabelsTopSw] = useState<string[]>([])
    const [dataTopSw, setDatasTopSw] = useState<number[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const topAssists = getTopAssists()
                const topPPA = getTopPPA()
                const topSw = getTopSw()

                setLabelsTopAssists(topAssists.labels)
                setDatasTopAssists(topAssists.values)

                setLabelsTopPPA(topPPA.labels)
                setDatasTopPPA(topPPA.values)

                setLabelsTopSw(topSw.labels)
                setDatasTopSw(topSw.values)
                

            } catch (error: any) {
                console.error('Error setting JSON data:', error.message)
            }
        }

        fetchData()
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '50%', marginTop: '2%' }}>
            {dataTopAssists ? (
                <>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%', height: '50vh' }}>
                    <ChartComponent
                        labels={labelsTopAssists}
                        data={dataTopAssists}
                        chartLabel='doughnut'
                        titleChart="Graphique des nombre des passe décisive par compétition."
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%', height: '50vh', 'marginTop': '3%' }}>
                    {/* Changer le title */}

                    <ChartComponent
                        labels={labelsTopPPA}
                        data={dataTopPPA}
                        chartLabel='bar'
                        titleChart="Graphique les meilleurs buteurs pour chaque compétition."
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%', height: '50vh', 'marginTop': '5%' }}>
                    {/* Changer le title */}

                    <ChartComponent
                        labels={labelsTopSw}
                        data={dataTopSw}
                        chartLabel='line'
                        titleChart="Graphique les meilleurs buteurs pour chaque compétition."
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

export default Passe;