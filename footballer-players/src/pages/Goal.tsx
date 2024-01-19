import Grid from '@mui/material/Grid';
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import ChartComponent from "../components/Graph/ChartComponent";
import { getTopFareGoal, getTopGoalOnTarget, getTopScorers } from "../helpers/goalsHelper";

function Goal() {
    
    const [labelsTopScorers, setLabelsTopScorers] = useState<string[]>([])
    const [dataTopScores, setDatasTopScorers] = useState<number[]>([])

    const [labelsTopGoalsOnTarget, setLabelsTopGoalsOnTarget] = useState<string[]>([])
    const [dataTopGoalsOnTarget, setDatasTopGoalsOnTarget] = useState<number[]>([])

    const [labelsTopFareGoal, setLabelsTopFareGoal] = useState<string[]>([])
    const [dataTopFareGoal, setDatasTopFareGoal] = useState<number[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const topScorers = getTopScorers()
                const topGoalsOnTarget = getTopGoalOnTarget()
                const topFareGoal = getTopFareGoal()

                setLabelsTopScorers(topScorers.labels)
                setDatasTopScorers(topScorers.values)

                setLabelsTopGoalsOnTarget(topGoalsOnTarget.labels)
                setDatasTopGoalsOnTarget(topGoalsOnTarget.values)

                setLabelsTopFareGoal(topFareGoal.labels)
                setDatasTopFareGoal(topFareGoal.values)
                

            } catch (error: any) {
                console.error('Error setting JSON data:', error.message)
            }
        }

        fetchData()
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '50%', marginTop: '2%' }}>
            {dataTopScores ? (
                <Grid container spacing={1} style={{ justifyContent: 'center', paddingLeft: '2%' }}>
                    <Grid item xs={4}>
                        <ChartComponent
                            labels={labelsTopGoalsOnTarget}
                            data={dataTopGoalsOnTarget}
                            chartLabel='doughnut'
                            titleChart="Les équipes qui ont le plus de tires cadrés"
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
                    <Grid item xs={9} style={{marginTop: '3%'}}>
                        <ChartComponent
                            labels={labelsTopFareGoal}
                            data={dataTopFareGoal}
                            chartLabel='line'
                            titleChart="Les équipes avec les buts marqué de loin"
                        />
                    </Grid>
                </Grid>
            
            ) : (
                <div>
                    <CircularProgress />
                </div>
            )}
        </div>
        
    )
}

export default Goal;