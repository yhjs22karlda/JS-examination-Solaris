const BASE_URL = "https://fathomless-shelf-54969.herokuapp.com";

async function getKey() {
    const response = await fetch(`${BASE_URL}/keys`, {method: "POST"});
    const data = await response.json()
    console.log(data);
    return data.key
}

async function getPlanets() {
    const key = await getKey();
    const response = await fetch(`${BASE_URL}/bodies`, {
        headers: {"x-zocom":key}
    })
    const data = await response.json();
    console.log(data);
}

getPlanets();