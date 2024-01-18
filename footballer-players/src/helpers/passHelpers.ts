import dataWithImage from "../assets/dataWithImage.json";

export function getTopAssist() {
  const topAssist: any = {};
  const data = dataWithImage;
  const topAssistCount: any = {};

  data.forEach((player: any) => {
    const competition = player.Comp;
    const Assists = player.Assists;

    if (!topAssist[competition]) {
      topAssist[competition] = Assists;
      topAssistCount[competition] = 1;
    } else {
      topAssist[competition] += Assists;
      topAssistCount[competition] += 1;
    }
  });
  Object.keys(topAssist).forEach((it) => {
    topAssist[it] = topAssist[it] / topAssistCount[it];
  });
  return {
    label: Object.keys(topAssist),
    values: Object.values(topAssist),
  };
}

export function getTopPPA() {
  const topPPA: any = {};
  const data = dataWithImage;
  const topPPACount: any = {};

  data.forEach((player: any) => {
    const Squad = player.Comp;
    const PPA = player.PPA;

    if (!topPPA[Squad]) {
      topPPA[Squad] = PPA;
      topPPACount[Squad] = 1;
    } else {
      topPPA[Squad] += PPA;
      topPPACount[Squad] += 1;
    }
  });
  Object.keys(topPPA).forEach((it) => {
    topPPA[it] = topPPA[it] / topPPACount[it];
  });
  return {
    label: Object.keys(topPPA),
    values: Object.values(topPPA),
  };
}

export function getTopSw() {
  const topSw: any = {};
  const data = dataWithImage;
  const topSwCount: any = {};

  data.forEach((player: any) => {
    const Squad = player.Comp;
    const Sw = player.Sw;

    if (!topSw[Squad]) {
      topSw[Squad] = Sw;
      topSwCount[Squad] = 1;
    } else {
      topSw[Squad] += Sw;
      topSwCount[Squad] += 1;
    }
  });
  Object.keys(topSw).forEach((it) => {
    topSw[it] = topSw[it] / topSwCount[it];
  });
  return {
    label: Object.keys(topSw),
    values: Object.values(topSw),
  };
}
