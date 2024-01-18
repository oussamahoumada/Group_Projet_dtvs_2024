import './App.css'
import React from 'react'
import Home from './components/home'
import Goal from './pages/Goal'
import Foul from './pages/Foul'
import { Outlet } from "react-router-dom";
import Passe from './pages/Passe'
import NavBar from './components/navbar/navbar'
import Exercice3 from './pages/Exercice3'
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
