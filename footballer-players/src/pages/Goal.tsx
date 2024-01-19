import Grid from "@mui/material/Grid";
import {
  getTopFareGoal,
  getTopGoalOnTarget,
  getTopScorers,
} from "../helpers/goalsHelper";
import React, { useEffect, useState } from "react";
import ChartComponent from "../components/Graph/ChartComponent";
import { CircularProgress } from "@mui/material";
import GeoCard from "../components/GeoCard/GeoCard";
import dataFootballer from "../assets/football_players_project.json";

const countryCodeMapping: any = {
  ALB: "AL",
  ALG: "DZ",
  ANG: "AO",
  ARG: "AR",
  ARM: "AM",
  AUS: "AU",
  AUT: "AT",
  BEL: "BE",
  BEN: "BJ",
  BFA: "BF",
  BIH: "BA",
  BRA: "BR",
  BUL: "BG",
  CAN: "CA",
  CGO: "CG",
  CHI: "CL",
  CIV: "CI",
  CMR: "CM",
  COD: "CD",
  COL: "CO",
  COM: "KM",
  CPV: "CV",
  CRC: "CR",
  CRO: "HR",
  CYP: "CY",
  CZE: "CZ",
  DEN: "DK",
  ECU: "EC",
  EGY: "EG",
  ENG: "GB",
  EQG: "GQ",
  ESP: "ES",
  FIN: "FI",
  FRA: "FR",
  GAB: "GA",
  GAM: "GM",
  GEO: "GE",
  GER: "DE",
  GHA: "GH",
  GLP: "GP",
  GNB: "GW",
  GRE: "GR",
  GRN: "GD",
  GUI: "GN",
  HAI: "HT",
  HON: "HN",
  HUN: "HU",
  IRL: "IE",
  IRN: "IR",
  ISL: "IS",
  ISR: "IL",
  ITA: "IT",
  JAM: "JM",
  JPN: "JP",
  KOR: "KR",
  LTU: "LT",
  LUX: "LU",
  LVA: "LV",
  MAR: "MA",
  MEX: "MX",
  MKD: "MK",
  MLI: "ML",
  MNE: "ME",
  MTQ: "MQ",
  NED: "NL",
  NGA: "NG",
  NIR: "GB",
  NOR: "NO",
  NZL: "NZ",
  PAR: "PY",
  PER: "PE",
  PHI: "PH",
  POL: "PL",
  POR: "PT",
  ROU: "RO",
  RUS: "RU",
  SCO: "GB",
  SEN: "SN",
  SLE: "SL",
  SRB: "RS",
  SUI: "CH",
  SUR: "SR",
  SVK: "SK",
  SVN: "SI",
  SWE: "SE",
  TOG: "TG",
  TUN: "TN",
  TUR: "TR",
  UKR: "UA",
  URU: "UY",
  USA: "US",
  VEN: "VE",
  WAL: "GB",
  ZAM: "ZM",
  ZIM: "ZW",
};

function Goal() {
  const [labelsTopScorers, setLabelsTopScorers] = useState<string[]>([]);
  const [dataTopScores, setDatasTopScorers] = useState<number[]>([]);
  const [mapData, setMapData] = useState([]);

  const [labelsTopGoalsOnTarget, setLabelsTopGoalsOnTarget] = useState<
    string[]
  >([]);
  const [dataTopGoalsOnTarget, setDatasTopGoalsOnTarget] = useState<number[]>(
    []
  );

  const [labelsTopFareGoal, setLabelsTopFareGoal] = useState<string[]>([]);
  const [dataTopFareGoal, setDatasTopFareGoal] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        calculatCountryGoals(dataFootballer);
        const topScorers = getTopScorers();
        const topGoalsOnTarget = getTopGoalOnTarget();
        const topFareGoal = getTopFareGoal();

        setLabelsTopScorers(topScorers.labels);
        setDatasTopScorers(topScorers.values);

        setLabelsTopGoalsOnTarget(topGoalsOnTarget.labels);
        setDatasTopGoalsOnTarget(topGoalsOnTarget.values);

        setLabelsTopFareGoal(topFareGoal.labels);
        setDatasTopFareGoal(topFareGoal.values);
      } catch (error: any) {
        console.error("Error setting JSON data:", error.message);
      }
    };

    fetchData();
  }, []);

  function calculatCountryGoals(data: any) {
    // console.log(data);
    // Créer un objet pour stocker le nombre de buts par nation
    const goalsByNation: any = {};
    // Parcourir chaque joueur et agréger le nombre de buts par nation
    data.forEach((player: any) => {
      const nation = player.Nation;
      const goals = player.Goals || 0; // Assurez-vous que Goals est défini
      const twoLetterCode = countryCodeMapping[nation];
      // Ajoutez les buts au total existant pour cette nation
      goalsByNation[twoLetterCode] =
        (goalsByNation[twoLetterCode] || 0) + goals;
    });

    setMapData(goalsByNation);
    return goalsByNation;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "50%",
        marginTop: "2%",
      }}
    >
      <GeoCard
        info={{
          titre: "Carte des buts marqués par pays",
          percent: false,
          scale: ["#95E473", "#2F2E2E"],
        }}
        mapData={mapData}
      ></GeoCard>
      {dataTopScores ? (
        <Grid
          container
          spacing={1}
          style={{ justifyContent: "center", paddingLeft: "2%" }}
        >
          <Grid item xs={4}>
            <ChartComponent
              labels={labelsTopGoalsOnTarget}
              data={dataTopGoalsOnTarget}
              chartLabel="doughnut"
              titleChart="Les équipes qui ont le plus de tires cadrés"
            />
          </Grid>
          <Grid item xs={6}>
            <ChartComponent
              labels={labelsTopScorers}
              data={dataTopScores}
              chartLabel="bar"
              titleChart="Meilleurs buteurs pour chaque compétition."
            />
          </Grid>
          <Grid item xs={9} style={{ marginTop: "3%" }}>
            <ChartComponent
              labels={labelsTopFareGoal}
              data={dataTopFareGoal}
              chartLabel="line"
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
  );
}

export default Goal;
