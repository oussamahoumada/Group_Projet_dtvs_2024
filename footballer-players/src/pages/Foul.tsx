import React, { useEffect, useState } from "react";
import ChartComponent from "../components/Graph/ChartComponent";
import { CircularProgress } from "@mui/material";
import { getDefenciveFouls, getTkl, getTopCard } from "../helpers/foulsHelper";
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

function Foul() {
  const [labelsTopCard, setLabelsTopCard] = useState<string[]>([]);
  const [dataTopCard, setDatasTopCard] = useState<number[]>([]);

  const [labelsTkl, setLabelsTkl] = useState<string[]>([]);
  const [dataTkl, setDatasTkl] = useState<number[]>([]);

  const [labelsDefenciveFouls, setLabelsDefenciveFouls] = useState<string[]>(
    []
  );
  const [dataDefenciveFouls, setDatasDefenciveFouls] = useState<number[]>([]);

  const [mapData, setMapData] = useState([]);

  function calculatCountryCards(data: any) {
    const cardsByNation: any = {};

    // Parcourir le tableau de données pour calculer les totaux par pays
    data.forEach((player: any) => {
      const nation = player.Nation;
      const crdY = player.CrdY || 0; // Assurez-vous que Assists est défini
      const crdR = player.CrdX || 0; // Assurez-vous que Assists est défini
      const crdTotal = crdY + crdR;
      const twoLetterCode = countryCodeMapping[nation];

      // Ajouter les assists au total existant pour cette nation
      cardsByNation[twoLetterCode] = cardsByNation[twoLetterCode] || {
        total: 0,
        count: 0,
      };
      cardsByNation[twoLetterCode].total += crdTotal;
      cardsByNation[twoLetterCode].count += 1;
    });

    // Calculer la moyenne pour chaque pays
    const averageAssistsByNation: any = {};
    Object.keys(cardsByNation).forEach((code) => {
      const totalAssists = cardsByNation[code].total;
      const assistCount = cardsByNation[code].count;
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
        const topCards = getTopCard();
        const tkl = getTkl();
        const defenciveFouls = getDefenciveFouls();

        calculatCountryCards(dataFootballer);

        setLabelsTopCard(topCards.labels);
        setDatasTopCard(topCards.values);

        setLabelsTkl(tkl.labels);
        setDatasTkl(tkl.values);

        setLabelsDefenciveFouls(defenciveFouls.labels);
        setDatasDefenciveFouls(defenciveFouls.values);
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
      {dataTopCard ? (
        <>
          <GeoCard
            info={{
              titre: "Carte des fautes commises par pays",
              percent: true,
              scale: ["#FFF3F0", "#670303"],
            }}
            mapData={mapData}
          ></GeoCard>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
              height: "50vh",
            }}
          >
            <ChartComponent
              labels={labelsTkl}
              data={dataTkl}
              chartLabel="doughnut"
              titleChart="Les équipes qui ont le plus de joueurs blessés"
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
              height: "50vh",
              marginTop: "3%",
            }}
          >
            <ChartComponent
              labels={labelsTopCard}
              data={dataTopCard}
              chartLabel="bar"
              titleChart="Les compétitions qui ont le plus de cartons"
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
              height: "50vh",
              marginTop: "5%",
            }}
          >
            <ChartComponent
              labels={labelsDefenciveFouls}
              data={dataDefenciveFouls}
              chartLabel="line"
              titleChart="Les équipes qui ont fait le plus de fautes"
            />
          </div>
        </>
      ) : (
        <div>
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default Foul;
