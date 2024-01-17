import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import dataFootballer from '../../assets/football_players.json';

ChartJS.register(ArcElement, Tooltip, Legend);
interface Player {
    Rank: number;
    Origin: string;
    Player: string;
    "From(Country)": string;
    "From(Club)": string;
    "To(Country)": string;
    "To(Club)": string;
    Position: string;
    "Fee(€ mln)": number;
    "Fee(£ mln)": string;
    Year: number;
    Born: number;
}

interface PlayerData {
    data: Player[];
}

function countPlayersByCountry(jsonData: PlayerData): Record<string, number> {
    const playersByCountry: Record<string, number> = {};

    jsonData.data.forEach((player) => {
        const country = player["From(Country)"];
        if (country in playersByCountry) {
            playersByCountry[country]++;
        } else {
            playersByCountry[country] = 1;
        }
    });

    return playersByCountry;
}


function GraphCountryFootballer() {
    const [data, setData] = useState(null);
    const [dataChart, setDataChart] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(dataFootballer);
                console.log(dataFootballer);
                const jsonData: PlayerData = {
                    data: dataFootballer,
                };
                
                const playersByCountry = countPlayersByCountry(jsonData);
                const coutries = Object.keys(playersByCountry)

                const numbersCountries = Object.values(playersByCountry)
                            
                setDataChart(
                    {
                        labels: coutries,
                        datasets: [{
                            label: 'My First Dataset',
                            data: numbersCountries,
                            backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(54, 162, 235)',
                                'rgb(255, 100, 86)',
                                'rgb(255, 150, 86)',
                                'rgb(255, 205, 86)',
                                'rgb(255, 30, 86)',
                                'rgb(255, 100, 150)',
                            ],
                            hoverOffset: 4,
                        }]
                    }
                )

            } catch (error) {
                console.error('Error setting JSON data:', error.message);
            }
        };

        fetchData();
    }, []);

    return (
       <div style={{width: '50%', height: '50vh', justifyContent: 'center', margin: 'auto', marginTop: '2%' }}>
            {data ? (
                <>
                    <h3 style={{ marginBottom: '2%' }}>
                        Graphique réparations des joueurs par Pays
                    </h3>
                    <Doughnut data={dataChart} />
                </>
            ) : (
                <h3 className="text-center">Loading...</h3>
            )}
       </div>
    )
}

export default GraphCountryFootballer;
