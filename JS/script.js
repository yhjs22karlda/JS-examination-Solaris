import getPlanets from "./fetch.js";
import plotPlanets from "./plotPlanets.js";
import addEventListeners from "./hey-listen.js";

export default await getPlanets();
plotPlanets();
addEventListeners();