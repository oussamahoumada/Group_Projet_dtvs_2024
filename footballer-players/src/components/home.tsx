import { getTkl } from "../helpers/foulsHelper";
import { getTopSw } from "../helpers/passHelpers";
import React, { useEffect, useState } from "react";
import ChartComponent from "./Graph/ChartComponent";
import { getTopScorers } from "../helpers/goalsHelper";

function Home() {

    const [labelsTopScorers, setLabelsTopScorers] = useState<string[]>([])
    const [dataTopScores, setDatasTopScorers] = useState<number[]>([])

    const [labelsTkl, setLabelsTkl] = useState<string[]>([])
    const [dataTkl, setDatasTkl] = useState<number[]>([])

    const [labelsTopSw, setLabelsTopSw] = useState<string[]>([])
    const [dataTopSw, setDatasTopSw] = useState<number[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const topScorers = getTopScorers()
                const topSw = getTopSw()
                const tkl = getTkl()

                setLabelsTopScorers(topScorers.labels)
                setDatasTopScorers(topScorers.values)
                
                setLabelsTkl(tkl.labels)
                setDatasTkl(tkl.values)

                setLabelsTopSw(topSw.labels)
                setDatasTopSw(topSw.values)

            } catch (error: any) {
                console.error('Error setting JSON data:', error.message)
            }
        }

        fetchData()
    }, [])
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '50%', marginTop: '2%' }}>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%', height: '50vh' }}>
                    <ChartComponent
                        labels={labelsTkl}
                        data={dataTkl}
                        chartLabel='doughnut'
                        titleChart="Les équipes qui ont le plus de joueurs blessés"
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%', height: '50vh', 'marginTop': '3%' }}>
                    <ChartComponent
                        labels={labelsTopScorers}
                        data={dataTopScores}
                        chartLabel='bar'
                        titleChart="Meilleurs buteurs pour chaque compétition."
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%', height: '50vh', 'marginTop': '5%' }}>
                    <ChartComponent
                        labels={labelsTopSw}
                        data={dataTopSw}
                        chartLabel='line'
                        titleChart="Graphique équipé qui ont effectué le plus de passes longues."
                    />
                </div>
            </div>
        </>
    )
}

export default Home