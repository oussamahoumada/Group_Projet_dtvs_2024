import "./style.css";
import React, { useEffect, useState } from "react";
import { VectorMap } from "react-jvectormap";

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

const GeoCard = ({ mapData, info }) => {
  const handleClick = () => {};

  return (
    <div style={{ marginBottom: "60px" }}>
      <h5 style={{ marginBottom: "20px", color: "#555555" }}> {info.titre} </h5>
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
              scale: info.scale, //your color game's here
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
              (mapData[code] ? (info.percent ? " %" : "") : "") +
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
