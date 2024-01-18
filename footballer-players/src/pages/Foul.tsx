import React, { useEffect, useState } from "react";
import ChartComponent from "../components/Graph/ChartComponent";
import { CircularProgress } from "@mui/material";
import { getDefenciveFouls, getTkl, getTopCard } from "../helpers/foulsHelper";

function Foul() {
    
    const [labelsTopGards, setLabelsTopGards] = useState<string[]>([])
    const [dataTopGards, setDatasTopGards] = useState<number[]>([])

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

                setLabelsTopGards(topCards.labels)
                setDatasTopGards(topCards.values)

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
            {dataTopGards ? (
                <>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%', height: '50vh' }}>
                    <ChartComponent
                        labels={labelsTkl}
                        data={dataTkl}
                        chartLabel='doughnut'
                        titleChart="Graphique nombre de tacles pour chaque compétition."
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%', height: '50vh', 'marginTop': '3%' }}>
                    {/* Changer le title */}

                    <ChartComponent
                        labels={labelsTopGards}
                        data={dataTopGards}
                        chartLabel='bar'
                        titleChart="Graphique les meilleurs buteurs pour chaque compétition."
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%', height: '50vh', 'marginTop': '5%' }}>
                    {/* Changer le title */}
                    <ChartComponent
                        labels={labelsDefenciveFouls}
                        data={dataDefenciveFouls}
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

export default Foul;