import './App.css'
import React from 'react'
import Home from './components/home'
import Goal from './components/Pages/Goal'
import Foul from './components/Pages/Foul'
import { Outlet } from "react-router-dom";
import Passe from './components/Pages/Passe'
import NavBar from './components/navbar/navbar'
import Exercice3 from './components/Pages/Exercice3'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="pass" element={<Passe />} />
          <Route path="goal" element={<Goal />} />
          <Route path="foul" element={<Foul />} />
          <Route path="exercice3" element={<Exercice3 />} />
        </Routes>
      </BrowserRouter>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default App
