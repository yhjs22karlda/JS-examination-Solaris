const BASE_URL = "https://fathomless-shelf-54969.herokuapp.com";

async function getKey() {
    const response = await fetch(`${BASE_URL}/keys`, {method: "POST"});
    const data = await response.json()
    return data.key
}

async function getPlanets() {
    const key = await getKey();
    const response = await fetch(`${BASE_URL}/bodies`, {
        headers: {"x-zocom":key}
    })
    const data = await response.json();
    return data.bodies;
}

const planets = await getPlanets();
const planetColors = [,"#888", "#e7cdcd", "#428ed4", "#ef5f5f", "#e29468", "#c7aa72", "#c9d4f1", "#7a91a7"]

function plotPlanets(planets) {
    let earthCirc = planets[3].circumference;
    const planetsElem = document.querySelector(".planets__planets");
    for(let i = 1; i < planets.length; i++) {
        const article = document.createElement("article");
        article.id = `planet-${planets[i].name.toLowerCase()}`;
        article.style.width = planets[i].circumference/earthCirc*25 +"px";
        article.style.aspectRatio = "1";
        // article.style.height = planets[i].circumference/earthCirc*25 +"px";
        article.style.backgroundColor = planetColors[i];
        article.setAttribute("title", planets[i].name)
        article.classList.add("planets__planet");

        planetsElem.append(article);
    }
}
plotPlanets(planets);