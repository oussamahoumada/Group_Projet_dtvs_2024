import React, { useEffect, useState } from "react";
import { getTopFareGoal, getTopGoalOnTarget, getTopScorers } from "../helpers/goalsHelper";
import ChartComponent from "../components/Graph/ChartComponent";
import { CircularProgress } from "@mui/material";

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
                <>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%', height: '50vh' }}>
                    {/* Changer le title */}

                    <ChartComponent
                        labels={labelsTopGoalsOnTarget}
                        data={dataTopGoalsOnTarget}
                        chartLabel='doughnut'
                        titleChart="Graphique les meilleurs buteurs pour chaque compétition."
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%', height: '50vh', 'marginTop': '3%' }}>
                    <ChartComponent
                        labels={labelsTopScorers}
                        data={dataTopScores}
                        chartLabel='bar'
                        titleChart="Graphique les meilleurs buteurs pour chaque compétition."
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%', height: '50vh', 'marginTop': '5%' }}>
                    {/* Changer le title */}

                    <ChartComponent
                        labels={labelsTopFareGoal}
                        data={dataTopFareGoal}
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

export default Goal;