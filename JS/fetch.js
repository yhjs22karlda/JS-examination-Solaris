// I denna modul finns funktioner som sköter fetch-anropet till servern.

const BASE_URL = "https://fathomless-shelf-54969.herokuapp.com";
const planetColors = ["#fdce3f", "#888888", "#e7cdcd", "#428ed4", "#ef5f5f", "#e29468", "#c7aa72", "#c9d4f1", "#7a91a7"];

async function getKey() {
    const response = await fetch(`${BASE_URL}/keys`, {
        method: "POST"
    });
    const data = await response.json();
    return data.key;
}

export default async function getPlanets() {
    const key = await getKey();
    const response = await fetch(`${BASE_URL}/bodies`, {
        headers: {
            "x-zocom": key
        }
    });
    const data = await response.json();
    data.bodies.forEach((element, index) => {
        element.color = planetColors[index];
    });
    return data.bodies;
}