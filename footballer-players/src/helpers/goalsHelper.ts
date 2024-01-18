import dataWithImage from "../assets/dataWithImage.json";
import { PlayerData, PlayerInterface } from "../interfaces/PlayerInterface";
import { ResponseInterface } from "../interfaces/ResponseInterface";

const playersData: PlayerData = {
  data: dataWithImage,
};

export function getTopScorers(): ResponseInterface
{
  const topScorers: Record<string, number> = {};

  playersData.data.forEach((player: PlayerInterface) => {
    const competition = player.Comp;
    const goals = player.Goals;

    if (!topScorers[competition] || goals > topScorers[competition]) {
      topScorers[competition] = goals;
    }
  });

  return {
    labels: Object.keys(topScorers),
    values: Object.values(topScorers),
  };
}

export function getTopGoalOnTarget(): ResponseInterface
{
  const topGoalOnTarget: Record<string, number> = {};

  playersData.data.forEach((player: PlayerInterface) => {
    const squad: string = player.Squad;
    const sot: number = player.SoT;

    if (!topGoalOnTarget[squad] || sot > topGoalOnTarget[squad]) {
      topGoalOnTarget[squad] = sot;
    }
  });

  const firstData = Object.fromEntries(Object.entries(topGoalOnTarget).slice(0,10))

  return {
    labels: Object.keys(firstData),
    values: Object.values(firstData),
  };
}

export function getTopFareGoal(): ResponseInterface 
{
  const topFareGoal: Record<string, number> = {}

  playersData.data.forEach((player: PlayerInterface) => {
    const squad: string = player.Squad;
    const shodist: number = player.ShoDist;

    if (!topFareGoal[squad] || shodist > topFareGoal[squad]) {
      topFareGoal[squad] = shodist;
    }
  });

  const firstData = Object.fromEntries(Object.entries(topFareGoal).slice(0,10))

  return {
    labels: Object.keys(firstData),
    values: Object.values(firstData),
  };
}
