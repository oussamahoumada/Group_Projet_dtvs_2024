import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import ChartComponent from "../components/Graph/ChartComponent";
import { CircularProgress } from "@mui/material";
import { getTopAssists, getTopPPA, getTopSw } from "../helpers/passHelpers";
import dataFootballer from "../assets/football_players_project.json";
import GeoCard from "../components/GeoCard/GeoCard";

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

function Passe() {
  const [labelsTopAssists, setLabelsTopAssists] = useState<string[]>([]);
  const [dataTopAssists, setDatasTopAssists] = useState<number[]>([]);

  const [labelsTopPPA, setLabelsTopPPA] = useState<string[]>([]);
  const [dataTopPPA, setDatasTopPPA] = useState<number[]>([]);

  const [labelsTopSw, setLabelsTopSw] = useState<string[]>([]);
  const [dataTopSw, setDatasTopSw] = useState<number[]>([]);

  const [mapData, setMapData] = useState([]);

  function calculatCountryAssists(data: any) {
    const statsByNation: any = {};

    // Parcourir le tableau de données pour calculer les totaux par pays
    data.forEach((player: any) => {
      const nation = player.Nation;
      const assists = player.Assists || 0; // Assurez-vous que Assists est défini
      const twoLetterCode = countryCodeMapping[nation];

      // Ajouter les assists au total existant pour cette nation
      statsByNation[twoLetterCode] = statsByNation[twoLetterCode] || {
        total: 0,
        count: 0,
      };
      statsByNation[twoLetterCode].total += assists;
      statsByNation[twoLetterCode].count += 1;
    });

    // Calculer la moyenne pour chaque pays
    const averageAssistsByNation: any = {};
    Object.keys(statsByNation).forEach((code) => {
      const totalAssists = statsByNation[code].total;
      const assistCount = statsByNation[code].count;

      // Assurez-vous de ne pas diviser par zéro
      averageAssistsByNation[code] =
        assistCount > 0 ? ((totalAssists / assistCount) * 100).toFixed(2) : 0;
    });

    setMapData(averageAssistsByNation);

    return averageAssistsByNation;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topAssists = getTopAssists();
        const topPPA = getTopPPA();
        const topSw = getTopSw();

        calculatCountryAssists(dataFootballer);

        setLabelsTopAssists(topAssists.labels);
        setDatasTopAssists(topAssists.values);

        setLabelsTopPPA(topPPA.labels);
        setDatasTopPPA(topPPA.values);

        setLabelsTopSw(topSw.labels);
        setDatasTopSw(topSw.values);
      } catch (error: any) {
        console.error("Error setting JSON data:", error.message);
      }
    };

    fetchData();
  }, []);

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
          titre: "Carte des pourcentages de passes réussies par pays",
          percent: true,
          scale: ["#FFDDB4", "#BB2C00"],
        }}
        mapData={mapData}
      ></GeoCard>
      {dataTopAssists ? (
        <>
          <Grid
            container
            spacing={1}
            style={{ justifyContent: "center", paddingLeft: "2%" }}
          >
            <Grid item xs={4}>
              <ChartComponent
                labels={labelsTopAssists}
                data={dataTopAssists}
                chartLabel="doughnut"
                titleChart="Les équipes qui ont effectués le plus de passes correctes."
              />
            </Grid>
            <Grid item xs={6}>
              <ChartComponent
                labels={labelsTopPPA}
                data={dataTopPPA}
                chartLabel="bar"
                titleChart="Graphique des nombres de passes décisives par compétition."
              />
            </Grid>
            <Grid item xs={10} style={{ marginTop: "3%" }}>
              <ChartComponent
                labels={labelsTopSw}
                data={dataTopSw}
                chartLabel="line"
                titleChart="Graphique équipé qui ont effectué le plus de passes longues."
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <div>
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default Passe;
