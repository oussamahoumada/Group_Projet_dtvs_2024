import dataWithImage from "../assets/dataWithImage.json";

//Bar
export function getTopCard() {
  const topCard: any = {};
  const data = dataWithImage;
  const topCardCount: any = {};

  data.forEach((player: any) => {
    const competition = player.Comp;
    const CrdY = player.CrdY;
    const CrdR = player.CrdR;

    if (!topCard[competition]) {
      topCard[competition] = CrdY + CrdR;
      topCardCount[competition] = 1;
    } else {
      topCard[competition] += CrdY + CrdR;
      topCardCount[competition] += 1;
    }
  });
  Object.keys(topCard).forEach((it) => {
    topCard[it] = topCard[it] / (topCardCount[it] * 2);
  });
  return {
    label: Object.keys(topCard),
    values: Object.values(topCard),
  };
}

//Donut
export function getTkl() {
  const Tackles: any = {};
  const data = dataWithImage;

  data.forEach((player: any) => {
    const Squad = player.Squad;
    const tkl = player.Tkl;

    if (!Tackles[Squad] || tkl > Tackles[Squad]) {
      Tackles[Squad] = tkl;
    }
  });

  return {
    label: Object.keys(Tackles),
    values: Object.values(Tackles),
  };
}

//Line
export function getDefenciveFouls() {
  const Tackles: any = {};
  const data = dataWithImage;

  data.forEach((player: any) => {
    const Squad = player.Squad;
    const Fls = player.Fls;

    if (!Tackles[Squad] || Fls > Tackles[Squad]) {
      Tackles[Squad] = Fls;
    }
  });

  return {
    label: Object.keys(Tackles),
    values: Object.values(Tackles),
  };
}