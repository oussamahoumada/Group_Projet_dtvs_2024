import dataWithImage from "../assets/dataWithImage.json";
import { PlayerData, PlayerInterface } from "../interfaces/PlayerInterface";
import { ResponseInterface } from "../interfaces/ResponseInterface";

const playersData: PlayerData = {
  data: dataWithImage,
};

export function getTopCard(): ResponseInterface
{
  const topCard: Record<string, number> = {};
  const topCardCount: Record<string, number> = {};

  playersData.data.forEach((player: PlayerInterface) => {
    const competition: string = player.Comp;
    const crdY: number = player.CrdY;
    const crdR: number = player.CrdR;

    if (!topCard[competition]) {
      topCard[competition] = crdY + crdR;
      topCardCount[competition] = 1;
    } else {
      topCard[competition] += crdY + crdR;
      topCardCount[competition] += 1;
    }
  });

  Object.keys(topCard).forEach((it: string) => {
    topCard[it] = topCard[it] / (topCardCount[it] * 2);
  });

  return {
    labels: Object.keys(topCard),
    values: Object.values(topCard),
  };
}

export function getTkl(): ResponseInterface
{
  const tackles: Record<string, number> = {};

  playersData.data.forEach((player: PlayerInterface) => {
    const squad: string = player.Squad;
    const tkl: number = player.Tkl;

    if (!tackles[squad] || tkl > tackles[squad]) {
      tackles[squad] = tkl;
    }
  });

  const firstData = Object.fromEntries(Object.entries(tackles).slice(0, 10))
  
  return {
    labels: Object.keys(firstData),
    values: Object.values(firstData),
  };
}

export function getDefenciveFouls(): ResponseInterface
{
  const tackles: Record<string, number> = {};

  playersData.data.forEach((player: PlayerInterface) => {
    const squad: string = player.Squad;
    const fls: number = player.Fls;

    if (!tackles[squad] || fls > tackles[squad]) {
      tackles[squad] = fls;
    }
  });

  const firstData = Object.fromEntries(Object.entries(tackles).slice(0,10))

  return {
    labels: Object.keys(firstData),
    values: Object.values(firstData),
  };
}