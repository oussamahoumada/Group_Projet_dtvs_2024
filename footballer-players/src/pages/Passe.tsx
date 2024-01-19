import Grid from '@mui/material/Grid'
import { CircularProgress } from "@mui/material"
import React, { useEffect, useState } from "react"
import ChartComponent from "../components/Graph/ChartComponent"
import { getTopAssists, getTopPPA, getTopSw } from "../helpers/passHelpers"

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
                    <Grid container spacing={1} style={{ justifyContent: 'center', paddingLeft: '2%' }}>
                        <Grid item xs={4}>
                            <ChartComponent
                                labels={labelsTopAssists}
                                data={dataTopAssists}
                                chartLabel='doughnut'
                                titleChart="Les équipes qui ont effectués le plus de passes correctes."
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <ChartComponent
                                labels={labelsTopPPA}
                                data={dataTopPPA}
                                chartLabel='bar'
                                titleChart="Graphique des nombres de passes décisives par compétition."
                            />
                        </Grid>
                        <Grid item xs={10} style={{ marginTop: '3%' }}>
                            <ChartComponent
                                labels={labelsTopSw}
                                data={dataTopSw}
                                chartLabel='line'
                                titleChart="Graphique équipé qui ont effectué le plus de passes longues."
                            />
                        </Grid>
                    </Grid>
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