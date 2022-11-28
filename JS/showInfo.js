// Dessa funktioner uppdaterar info-sidan med text och bakgrund.

const background = document.querySelector(".planetinfo");
const planetinfoH1 = document.querySelector(".planetinfo h1");
const planetinfoSubH = document.querySelector(".planetinfo .hgroup--subheader");
const planetinfoPara = document.querySelector(".planetinfo__para");
const planetinfoCircum = document.querySelector(".planetinfo__circum p");
const planetinfoKmFromSun = document.querySelector(".planetinfo__km-from-sun p");
const planetinfoMaxT = document.querySelector(".planetinfo__maxT p");
const planetinfoMinT = document.querySelector(".planetinfo__minT p");
const planetinfoMoons = document.querySelector(".planetinfo__moons p");
const planetinfoBack = document.querySelector(".planetinfo__back");

export default function showPlanetInfo(planet) {
    planetinfoH1.textContent = planet.name.toUpperCase();
    planetinfoSubH.textContent = planet.latinName.toUpperCase();
    planetinfoPara.innerHTML = planet.desc;
    planetinfoCircum.textContent = planet.circumference.toLocaleString() + " km";
    planetinfoKmFromSun.textContent = planet.distance.toLocaleString() + " km";
    planetinfoMaxT.innerHTML = planet.temp.day + " &#8451;";
    planetinfoMinT.innerHTML = planet.temp.night + " &#8451;";
    planetinfoMoons.textContent = planet.moons.join(", ") || "---";
    planetinfoBack.textContent = "<-- Back to Planets";
    makeBackground(planet.color);
}

function makeBackground(color) {
    background.style.background =
        `radial-gradient(circle at -34%,
            ${color}ff 30%,
            ${color}44 30% 32%,
            ${color}11 32% 34%,
            transparent 34%
        ),
        url(images/stars.png),
        linear-gradient(-90deg, #180b22, #0e194a)`;
}
