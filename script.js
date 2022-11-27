// fetch ------------------------------------------------------------------
const BASE_URL = "https://fathomless-shelf-54969.herokuapp.com";

async function getKey() {
    const response = await fetch(`${BASE_URL}/keys`, {
        method: "POST"
    });
    const data = await response.json()
    return data.key
}

async function getPlanets() {
    const planetColors = ["#fdce3f", "#888888", "#e7cdcd", "#428ed4", "#ef5f5f", "#e29468", "#c7aa72", "#c9d4f1", "#7a91a7"]
    const key = await getKey();
    const response = await fetch(`${BASE_URL}/bodies`, {
        headers: {
            "x-zocom": key
        }
    })
    const data = await response.json();
    data.bodies.forEach((element, index) => {
        element.color = planetColors[index];
    });
    console.log(data);
    return data.bodies;
}
// plot-------------------------------------------------------------------
function plotPlanets(planets) {
    let scaleFactor = planets[3].circumference;
    const planetsElem = document.querySelector(".planets__planets");
    for (let i = 1; i < planets.length; i++) {
        const article = document.createElement("article");
        article.style.width = planets[i].circumference / scaleFactor * 25 + "px";
        article.style.aspectRatio = "1";
        article.style.backgroundColor = planets[i].color;
        article.setAttribute("title", planets[i].name)
        article.setAttribute("data-index", i)
        article.classList.add("planets__planet");
        if (i === 6) makeRings(article);
        planetsElem.append(article);
    }

    function makeRings(saturnus) {
        saturnus.style.position = "relative"
        const rings = document.createElement("article");
        rings.id = "saturnus-rings";
        saturnus.append(rings);
    }
}
// show info---------------------------------------------------------------
function showPlanetInfo(planet) {
    const planetinfoH1 = document.querySelector(".planetinfo h1");
    planetinfoH1.textContent = planet.name.toUpperCase();
    const planetinfoSubH = document.querySelector(".planetinfo .hgroup--subheader");
    planetinfoSubH.textContent = planet.latinName.toUpperCase();
    const planetinfoPara = document.querySelector(".planetinfo__para");
    planetinfoPara.innerHTML = planet.desc;
    const planetinfoCircum = document.querySelector(".planetinfo__circum p");
    planetinfoCircum.textContent = planet.circumference.toLocaleString() + " km";
    const planetinfoKmFromSun = document.querySelector(".planetinfo__km-from-sun p");
    planetinfoKmFromSun.textContent = planet.distance.toLocaleString() + " km";
    const planetinfoMaxT = document.querySelector(".planetinfo__maxT p");
    planetinfoMaxT.innerHTML = planet.temp.day + " &#8451;";
    const planetinfoMinT = document.querySelector(".planetinfo__minT p");
    planetinfoMinT.innerHTML = planet.temp.night + " &#8451;";
    const planetinfoMoons = document.querySelector(".planetinfo__moons p");
    planetinfoMoons.textContent = planet.moons.join(", ") || "---";
    const planetinfoBack = document.querySelector(".planetinfo__back");
    planetinfoBack.textContent = "<-- Back to Planets";
    makeBackground(planet.color);

    function makeBackground(color) {
        const background = document.querySelector(".planetinfo");
        background.style.background =
            `radial-gradient(circle at -34%,
            ${color}ff 30%,
            ${color}44 30%,
            ${color}44 32%,
            ${color}11 32%,
            ${color}11 34%,
            transparent 34%
        ),
        url(stars.png),
        linear-gradient(-90deg,#180b22, #0e194a)`
    }
}
const planets = await getPlanets();
plotPlanets(planets);
// eventliteners----------------------------------------------
function clickedOnPlanet(event) {
    const planetIndex = event.target.dataset.index;
    toggleScreen();
    showPlanetInfo(planets[planetIndex])
}

function toggleScreen() {
    const planetElem = document.querySelector(".planets");
    const planetInfoElem = document.querySelector(".planetinfo");
    planetInfoElem.classList.toggle("fadeIn")
    planetElem.classList.toggle("fadeOut")
}

const back = document.querySelector(".planetinfo__back");
back.addEventListener("click", toggleScreen);

const theSunElem = document.querySelector(".planets__solen");
theSunElem.addEventListener("click", clickedOnPlanet);

const planetsElems = document.querySelectorAll(".planets__planet");
for (let planet of planetsElems) {
    planet.addEventListener("click", clickedOnPlanet);
    planet.addEventListener("mouseenter", (e) => {
        const height = e.target.clientHeight
        e.target.style.transform = `scale(${(height + 5) / height})`;
        // e.target.style.outline = "2px solid black"
        // let width = parseInt(e.target.style.width);
        // e.target.style.width = width + 5 + "px"
    });
    planet.addEventListener("mouseleave", (e) => {
        e.target.style.transform = "scale(1)";
        // e.target.style.outline = "none"
        // e.target.style.position = "unset";
        // let width = parseInt(e.target.style.width);
        // e.target.style.width = width - 5 + "px"
    });
}
