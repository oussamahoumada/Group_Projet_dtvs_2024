import Grid from '@mui/material/Grid';
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import ChartComponent from "../components/Graph/ChartComponent";
import { getDefenciveFouls, getTkl, getTopCard } from "../helpers/foulsHelper";

function Foul() {
    
    const [labelsTopCard, setLabelsTopCard] = useState<string[]>([])
    const [dataTopCard, setDatasTopCard] = useState<number[]>([])

    const [labelsTkl, setLabelsTkl] = useState<string[]>([])
    const [dataTkl, setDatasTkl] = useState<number[]>([])

    const [labelsDefenciveFouls, setLabelsDefenciveFouls] = useState<string[]>([])
    const [dataDefenciveFouls, setDatasDefenciveFouls] = useState<number[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const topCards = getTopCard()
                const tkl = getTkl()
                const defenciveFouls = getDefenciveFouls()

                setLabelsTopCard(topCards.labels)
                setDatasTopCard(topCards.values)

                setLabelsTkl(tkl.labels)
                setDatasTkl(tkl.values)

                setLabelsDefenciveFouls(defenciveFouls.labels)
                setDatasDefenciveFouls(defenciveFouls.values)
                

            } catch (error: any) {
                console.error('Error setting JSON data:', error.message)
            }
        }

        fetchData()
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '50%', marginTop: '2%' }}>
            {dataTopCard ? (
                <>
                    <Grid container spacing={1} style={{ justifyContent: 'center', paddingLeft: '2%' }}>
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
                                labels={labelsTopCard}
                                data={dataTopCard}
                                chartLabel='bar'
                                titleChart="Les compétitions qui ont le plus de cartons"
                            />
                        </Grid>
                        <Grid item xs={10} style={{marginTop: '3%'}}>
                            <ChartComponent
                                labels={labelsDefenciveFouls}
                                data={dataDefenciveFouls}
                                chartLabel='line'
                                titleChart="Les équipes qui ont fait le plus de fautes"
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

export default Foul;