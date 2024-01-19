import React from "react";

function Description() {
  return (
    <div style={{ width: "80vw", margin: "auto", fontSize: "30px" }}>
      <h3 style={{ marginBottom: "50px", marginTop: "50px" }}>
        {" "}
        Description du projet :{" "}
      </h3>
      <p style={{ fontSize: "30px" }}>
        Pour la mise en œuvre de notre projet de visualisation de données, nous
        avons choisi d'utiliser React.js pour le développement du site. Les
        données sous forme de statistiques sur les joueurs étaient stockées dans
        un fichier CSV, servant ainsi de source principale pour l'affichage.
        L'intégration de graphiques a été réalisée à l'aide de la bibliothèque
        Chart.js. En complément, un programme de scrapping a été développé pour
        récupérer des images, lesquelles ont été ajoutées au fichier CSV afin
        d'enrichir les informations disponibles. L'implémentation a été
        orchestrée au sein d'une page HTML qui inclut les liens vers les
        bibliothèques React et Chart.js, ainsi que le fichier JavaScript
        associé. Cette page HTML constitue le point d'entrée de notre
        application de visualisation de données, où les fonctionnalités de
        React.js sont exploitées pour dynamiquement présenter les statistiques
        des joueurs, tandis que Chart.js permet de générer des graphiques
        interactifs. <br />
        <a
          style={{ fontSize: "30px" }}
          href="https://docs.google.com/spreadsheets/d/1Lh_PhCEfeq8OGQM-nN9u3Sdw8RIPMCf3dQIjY0DS5sY/edit?usp=sharing"
        >
          {" "}
          Lien vers le fichier csv avec les images
        </a>
      </p>
      <div style={{ marginTop: "50px", marginBottom: "50px" }}>
        <h3 style={{ marginBottom: "30px" }}>Preparation des donnéess :</h3>
        <p style={{ fontSize: "30px" }}>
          En ce qui concerne la préparation des données, nous avons converti le
          fichier CSV en format JSON afin de pouvoir appliquer des filtres et
          extraire les données nécessaires à la création des graphiques. Par
          exemple, pour le graphique représentant les meilleurs buteurs par
          compétition dans la section "Buts", nous avons appliqué un filtre pour
          récupérer tous les joueurs par compétition. Ensuite, pour chaque
          compétition, nous avons identifié le joueur ayant marqué le plus de
          buts.
        </p>
        <p style={{ fontSize: "30px" }}>
          Pour les graphiques, nous avons utilisé Chart.js, une bibliothèque
          JavaScript permettant de créer des graphiques interactifs. Chart.js
          offre des fonctionnalités telles que des tooltips informatifs, la
          possibilité d'appliquer des filtres aux données, le zoom et le
          panoramique pour explorer les détails, des animations fluides, une
          personnalisation visuelle étendue, une réactivité adaptative aux
          tailles d'écran, et la gestion d'événements pour des actions
          spécifiques lors d'interactions utilisateur.
        </p>
      </div>
    </div>
  );
}

export default Description;
