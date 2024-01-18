import dataWithImage from "../assets/dataWithImage.json";
import { PlayerData, PlayerInterface } from "../interfaces/PlayerInterface";
import { ResponseInterface } from "../interfaces/ResponseInterface";

const playersData: PlayerData = {
  data: dataWithImage,
};

export function getTopAssists(): ResponseInterface
{
  const topAssists: Record<string, number> = {};
  const topAssistsCount: Record<string, number> = {};

  playersData.data.forEach((player: PlayerInterface) => {
    const competition: string = player.Comp;
    const assists: number = player.Assists;

    if (!topAssists[competition]) {
      topAssists[competition] = assists;
      topAssistsCount[competition] = 1;
    } else {
      topAssists[competition] += assists;
      topAssistsCount[competition] += 1;
    }
  });

  Object.keys(topAssists).forEach((assist: string) => {
    topAssists[assist] = topAssists[assist] / topAssistsCount[assist];
  });

  return {
    labels: Object.keys(topAssists),
    values: Object.values(topAssists),
  };
}

export function getTopPPA(): ResponseInterface
{
  const topPPA: Record<string, number> = {};
  const topPPACount: Record<string, number> = {};

  playersData.data.forEach((player: PlayerInterface) => {
    const squad: string = player.Comp;
    const ppa: number = player.PPA;

    if (!topPPA[squad]) {
      topPPA[squad] = ppa;
      topPPACount[squad] = 1;
    } else {
      topPPA[squad] += ppa;
      topPPACount[squad] += 1;
    }
  });

  Object.keys(topPPA).forEach((ppa: string) => {
    topPPA[ppa] = topPPA[ppa] / topPPACount[ppa];
  });

  return {
    labels: Object.keys(topPPA),
    values: Object.values(topPPA),
  };
}

export function getTopSw(): ResponseInterface
{
  const topSw: Record<string, number> = {};
  const topSwCount: Record<string, number> = {};

  playersData.data.forEach((player: PlayerInterface) => {
    const squad: string = player.Comp;
    const sw: number = player.Sw;

    if (!topSw[squad]) {
      topSw[squad] = sw;
      topSwCount[squad] = 1;
    } else {
      topSw[squad] += sw;
      topSwCount[squad] += 1;
    }
  });

  Object.keys(topSw).forEach((sw: string) => {
    topSw[sw] = topSw[sw] / topSwCount[sw];
  });

  return {
    labels: Object.keys(topSw),
    values: Object.values(topSw),
  };
}
