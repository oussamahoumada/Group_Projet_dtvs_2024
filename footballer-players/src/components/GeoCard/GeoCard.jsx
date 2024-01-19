import "./style.css";
import React, { useEffect, useState } from "react";
import { VectorMap } from "react-jvectormap";
import dataFootballer from "../../assets/football_players_project.json";
const { getCode, getName, getData } = require("country-list");

const countryCodeMapping = {
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

const GeoCard = () => {
  const [mapData, setMapData] = useState([]);

  const handleClick = (e, countryCode) => {
    // console.log(countryCode);
  };

  function calculatCountryGoals(data) {
    // console.log(data);
    // Créer un objet pour stocker le nombre de buts par nation
    const goalsByNation = {};

    // Parcourir chaque joueur et agréger le nombre de buts par nation
    data.forEach((player) => {
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

  function calculatCountryAssists(data) {
    const statsByNation = {};

    // Parcourir le tableau de données pour calculer les totaux par pays
    data.forEach((player) => {
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
    const averageAssistsByNation = {};
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

  function calculatCountryCards(data) {
    const cardsByNation = {};

    // Parcourir le tableau de données pour calculer les totaux par pays
    data.forEach((player) => {
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
    const averageAssistsByNation = {};
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
    calculatCountryCards(dataFootballer);
  }, []);

  return (
    <div>
      <VectorMap
        map={"world_mill"}
        backgroundColor="#5CA0ff" //change it to ocean blue: #0077be
        zoomOnScroll={false}
        containerStyle={{
          width: "50vw",
          height: "50vh",
        }}
        onRegionClick={handleClick} //gets the country code
        containerClassName="map"
        regionStyle={{
          initial: {
            fill: "#e4e4e4",
            "fill-opacity": 0.9,
            stroke: "none",
            "stroke-width": 0,
            "stroke-opacity": 0,
          },
          hover: {
            "fill-opacity": 0.8,
            cursor: "pointer",
          },
          selected: {
            fill: "#2938bc", //color for the clicked country
          },
          selectedHover: {},
        }}
        series={{
          regions: [
            {
              values: mapData, //this is your data
              scale: ["#95E473", "#2F2E2E"], //your color game's here
              normalizeFunction: "polynomial",
            },
          ],
        }}
        onRegionTipShow={function (event, label, code, ...props) {
          label.html(
            '<div style="background-color: white; border: 1px solid white; outline: 10px solid white; border-radius: 6px; min-height: 70px; width: 150px; color: black"; padding-left: 10px>' +
              "<p>" +
              "<b>" +
              label.html() +
              "</b>" +
              "</p>" +
              "<p>" +
              "Count: " +
              "<b>" +
              mapData[code] +
              (mapData[code] ? " %" : "") +
              "</b>" +
              "</p>" +
              "</div>"
          );
        }}
      />
    </div>
  );
};
export default GeoCard;
