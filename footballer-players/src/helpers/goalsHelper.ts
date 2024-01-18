import dataWithImage from "../assets/dataWithImage.json";

export function getTopScorers() {
  const topScorers: any = {};
  const data = dataWithImage;

  data.forEach((player: any) => {
    const competition = player.Comp;
    const goals = player.Goals;

    if (!topScorers[competition] || goals > topScorers[competition]) {
      topScorers[competition] = goals;
    }
  });

  return {
    label: Object.keys(topScorers),
    values: Object.values(topScorers),
  };
}

export function getTopGoalOnTarget() {
  const topGoalOnTarget: any = {};
  const data = dataWithImage;

  data.forEach((player: any) => {
    const Squad = player.Squad;
    const sot = player.SoT;

    if (!topGoalOnTarget[Squad] || sot > topGoalOnTarget[Squad]) {
      topGoalOnTarget[Squad] = sot;
    }
  });

  return {
    label: Object.keys(topGoalOnTarget),
    values: Object.values(topGoalOnTarget),
  };
}

export function getTopFareGoal() {
  const topFareGoal: any = {};
  const data = dataWithImage;

  data.forEach((player: any) => {
    const Squad = player.Squad;
    const shodist = player.ShoDist;

    if (!topFareGoal[Squad] || shodist > topFareGoal[Squad].ShoDist) {
      topFareGoal[Squad] = { Player: Squad, ShoDist: shodist };
    }
  });

  return {
    label: Object.keys(topFareGoal),
    values: Object.values(topFareGoal),
  };
}
