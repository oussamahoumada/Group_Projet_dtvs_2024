import { getTkl } from "../helpers/foulsHelper";
import { getTopSw } from "../helpers/passHelpers";
import React, { useEffect, useState } from "react";
import ChartComponent from "./Graph/ChartComponent";
import { getTopScorers } from "../helpers/goalsHelper";
import Grid from '@mui/material/Grid';


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
            <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                height: '50%', marginTop: '2%'
            }}>
                <Grid container spacing={1} style={{justifyContent: 'center', paddingLeft: '2%'}}>
                    <Grid item xs={4}>
                        <ChartComponent
                            labels={labelsTkl}
                            data={dataTkl}
                            chartLabel='doughnut'
                            titleChart="Les équipes qui ont le plus de joueurs blessés"
                        />
                    </Grid>
                    <Grid item xs={6}>
                            <ChartComponent
                                labels={labelsTopScorers}
                                data={dataTopScores}
                                chartLabel='bar'
                                titleChart="Meilleurs buteurs pour chaque compétition."
                            />
                    </Grid>
                    <Grid item xs={10} style={{marginTop: '3%'}}>
                            <ChartComponent
                                labels={labelsTopSw}
                                data={dataTopSw}
                                chartLabel='line'
                                titleChart="Graphique équipé qui ont effectué le plus de passes longues."
                            />
                    </Grid>
                </Grid>                
            </div>
        </>
    )
}

export default Home