// Denna modul innehåller funktioner som ritar upp planeterna på startsidan.
export default function plotPlanets(planets) {
    let scaleFactor = planets[3].circumference;
    const planetsElem = document.querySelector(".planets__planets");
    for (let i = 1; i < planets.length; i++) {
        const article = document.createElement("article");
        article.style.width = planets[i].circumference / scaleFactor * 25 + "px";
        article.style.aspectRatio = "1";
        article.style.backgroundColor = planets[i].color;
        article.setAttribute("title", planets[i].name);
        article.setAttribute("data-index", i);
        article.classList.add("planets__planet");
        if (i === 6) makeRings(article);
        planetsElem.append(article);
    }
}

function makeRings(saturnus) {
    saturnus.style.position = "relative";
    const rings = document.createElement("article");
    rings.id = "saturnus-rings";
    rings.setAttribute("data-index", 6);
    saturnus.append(rings);
}
