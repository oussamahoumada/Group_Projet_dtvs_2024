import React from "react";
import plot from '../assets/images/plot.png'
import barcode from '../assets/images/barcode.png'
import GraphCountryFootballer from "../components/Graph/GraphCountry";

function Exercice3() {
    return <>
        <GraphCountryFootballer />
        <div >
            <h5 style={{marginTop: '5%'}} className="text-center mt-5">
                Visualisation des images avec Plot (Macroanalyse d'images avec JavaScript): 
            </h5>
            <img src={plot} alt="plot" />
        </div><div>
            <h5 style={{marginTop: '3%'}} className="text-center mt-5">
                Visualisation des images avec Barcode (Macroanalyse d'images avec JavaScript): 
            </h5>
            <img style={{marginBottom: '3%'}} src={barcode} alt="barcode" />
        </div></>
}

export default Exercice3;