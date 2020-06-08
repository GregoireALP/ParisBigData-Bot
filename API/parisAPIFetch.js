//Node Fetch Package Instance
const fetch = require("node-fetch");

//Name API
async function _fetchByName(name, years) {
    const URL = "https://opendata.paris.fr/api/records/1.0/search/?dataset=liste_des_prenoms&q=&facet=annee&facet=prenoms&refine.annee=" + years + "&refine.prenoms=" + name
    const json = await fetch(URL)
    return json
}

//Street Warnings API
async function _fetchByWarningsPC(PC) {
    const URL = "https://opendata.paris.fr/api/records/1.0/search/?dataset=chantiers-perturbants&q=&facet=cp_arrondissement&refine.cp_arrondissement=" + PC
    const json = await fetch(URL)
    return json
}

//Covid French Data
async function _fetchFranceCovidData() {
    const URL = "https://opendata.ecdc.europa.eu/covid19/casedistribution/json/"
    const json = await fetch(URL)
    return json
}

//All Velib station aviable
async function _fetchVelibParis() {
    const URL = "https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&q=&facet=nom_arrondissement_communes&refine.nom_arrondissement_communes=Paris"
    const json = await fetch(URL)
    return json
}

module.exports._fetchByName = _fetchByName;
module.exports._fetchByWarningsPC = _fetchByWarningsPC;
module.exports._fetchFranceCovidData = _fetchFranceCovidData;
module.exports._fetchVelibParis = _fetchVelibParis;