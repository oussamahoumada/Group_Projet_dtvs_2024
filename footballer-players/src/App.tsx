import React from "react";
import "./App.css";
import NavBar from "./components/navbar/navbar";
import GraphCountryFootballer from "./components/Graph/GraphCountry";
import Home from "./components/home";
import GeoCard from "./components/GeoCard/GeoCard";

function App() {
  return (
    <div className="App">
      {/* <NavBar /> */}
      {/* <GraphCountryFootballer /> */}
      {/* <Home /> */}
      <GeoCard></GeoCard>
    </div>
  );
}

export default App;
