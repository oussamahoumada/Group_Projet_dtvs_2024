import "./App.css";
import Goal from "./pages/Goal";
import Foul from "./pages/Foul";
import { Outlet } from "react-router-dom";
import Passe from "./pages/Passe";
import Exercice3 from "./pages/Exercice3";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import NavBar from "./components/navbar/navbar";
import Home from "./components/home";
import Description from "./pages/Description";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route index path="/datavis-project-2024" element={<Home />} />
          <Route path="pass" element={<Passe />} />
          <Route path="goal" element={<Goal />} />
          <Route path="foul" element={<Foul />} />
          <Route path="description" element={<Description />} />
          <Route path="exercice3" element={<Exercice3 />} />
        </Routes>
      </BrowserRouter>
      <Outlet />
    </div>
  );
}

export default App;
