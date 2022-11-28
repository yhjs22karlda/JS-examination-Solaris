// Denna modul lägger till eventlyssnare.

import planets from "./script.js"
import showPlanetInfo from "./showInfo.js";

export default function addEventListeners() {
    const theSunElem = document.querySelector(".planets__solen");
    const planetsElems = document.querySelectorAll(".planets__planet");
    const back = document.querySelector(".planetinfo__back");
    theSunElem.addEventListener("click", clickedOnPlanet);

    for (let planet of planetsElems) {
        planet.addEventListener("click", clickedOnPlanet);
        planet.addEventListener("mouseenter", (e) => {
            const height = e.target.clientHeight;
            e.target.style.transform = `scale(${(height + 7) / height})`;
            // e.target.style.boxShadow = "0px 0px 10px 1px beige"
        });
        planet.addEventListener("mouseleave", (e) => {
            e.target.style.transform = "scale(1)";
            // e.target.style.boxShadow = "none"
        });
    }

    back.addEventListener("click", toggleScreen);
}

function clickedOnPlanet(event) {
    const planetIndex = event.target.dataset.index;
    toggleScreen();
    showPlanetInfo(planets[planetIndex]);
}

function toggleScreen() {
    const planetElem = document.querySelector(".planets");
    const planetInfoElem = document.querySelector(".planetinfo");
    planetInfoElem.classList.toggle("fadeIn");
    planetElem.classList.toggle("fadeOut");
}