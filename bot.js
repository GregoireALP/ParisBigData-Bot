console.info("[*]Paris Big Data Robot Enable !");

//Config instance
const Config = require("./config/config")

//Twit instance
const Twit = require("./node_modules/twit")
const Twitter = new Twit({
    consumer_key: Config.API_KEY,
    consumer_secret: Config.API_SECRET_KEY,
    access_token: Config.ACCESS_TOKEN,
    access_token_secret: Config.ACCESS_TOKEN_SECRET
});

//Fetch By Name Method
const PARIS_FETCH = require("./API/parisAPIFetch")
    
//Twit function
function _tweetPost(msg) {

    var tweet = {status: msg}  
    Twitter.post(Config.POST_TYPE, tweet, tweetFeedBack);
    function tweetFeedBack(error, data) {
        if(!error) {
            console.info("[*] Tweet Posted with success !");
        } else {
            console.error(error);
        }
    }        
}

//Get the tweet with Name Paris API
async function TweetInfoName(name, years, user) {

    const records = await PARIS_FETCH._fetchByName(name, years).then(data => {return data.json()}).then(json => {return json.records});
        
    const NUMBER = records[0].fields.nombre
    const NAME = records[0].fields.prenoms
    const YEARS = records[0].fields.annee

    const MESSAGE = `
    👶 Pour ${NAME} en ${YEARS} il y a eu un totale de ${NUMBER} naissances à Paris !
    ℹ️ Powered by: https://opendata.paris.fr/pages/home/
    For: ` + user

    _tweetPost(MESSAGE)

}

//Tweet Streets Pertubations
async function TweetStreetWarnings(CP, user) {

    const records = await PARIS_FETCH._fetchByWarningsPC(CP).then(data => {return data.json()}).then(json => {return json.records});

    for(let i = 0; i < 1; i++) {
        const object = records[i].fields.description
        const beginDate = records[i].fields.date_creation
        const loc = records[i].fields.voie
        const loc2 = records[i].fields.precision_localisation
        const endDate = records[i].fields.date_fin
        const art = records[i].fields.cp_arrondissement
    
        const MESSAGE = 
        `📢 ${object} : 
         📌 ${art}, ${loc}, ${loc2}
         ⏳ Du ${beginDate} au ${endDate}
         ℹ️ Powered by: https://opendata.paris.fr/pages/home/
         For: ` + user
        
        _tweetPost(MESSAGE)
    }
}

//Tweets France Data Covid By Day
async function TweetCodivFranceData(user) {
    
    const json = await PARIS_FETCH._fetchFranceCovidData().then(data => {return data.json()}).then(json => {return json.records});
    var dataFrance = json.filter(function (records) {
        return records.countryterritoryCode == "FRA"
    })

    for(let i = 0; i < 1; i++) {

        var MESSAGE =
        `🕓 ${dataFrance[i].dateRep}:
        💀 Nombre de cas: ${dataFrance[i].cases}
        💊 Nombre de morts: ${dataFrance[i].deaths}
        ℹ️ Powered by: https://data.europa.eu/euodp/en/data/dataset/covid-19-coronavirus-data
        For: ` + user  
    }

    _tweetPost(MESSAGE)
}

//Tweets all velibe aviable in Paris
async function TweetParisVelib(user) {

    const json = await PARIS_FETCH._fetchVelibParis().then(data => {return data.json()}).then(json => {return json.records})
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    var stationCapacity = []

    for(let i = 0; i < json.length; i++) {
        stationCapacity.push(json[i].fields.numbikesavailable)
    }

    console.log(stationCapacity.reduce(reducer)/stationCapacity.length)
}

//Streams

//Detect when someone tag the bot and respond
var streamFilter = Twitter.stream('statuses/filter', { track: Config.USERNAME })
console.log("[*] Tweet listener for " + Config.USERNAME + " listening...")

//Main stream
streamFilter.on('tweet', function(tweet) {
    
    //Get tweet content phase
    console.log("[*] Tweet founded !")

    let text = tweet.text
    let user = "@" + tweet.user.screen_name
    let date = tweet.created_at
    let id = tweet.id

    console.log("Content: " + text)
    console.log("User: " + user)
    console.log("UserID: " + id)
    console.log("Date: " + date)

    var contentArray = text.split(" ");
    if(contentArray.includes("travaux")) {
        
        switch(classify(contentArray)) {

            case "75001": TweetParisVelib(75001, user)
            case "75002": TweetParisVelib(75002, user)
            case "75003": TweetParisVelib(75003, user)
            case "75004": TweetParisVelib(75004, user)
            case "75005": TweetParisVelib(75005, user)
            case "75006": TweetParisVelib(75006, user)
            case "75007": TweetParisVelib(75007, user)
            case "75008": TweetParisVelib(75008, user)
            case "75009": TweetParisVelib(75009, user)
            case "75010": TweetParisVelib(75010, user)
            case "75011": TweetParisVelib(75011, user)
            case "75012": TweetParisVelib(75012, user)
            case "75013": TweetParisVelib(75013, user)
            case "75014": TweetParisVelib(75014, user)
            case "75015": TweetParisVelib(75015, user)
            case "75016": TweetParisVelib(75016, user)
            case "75017": TweetParisVelib(75017, user)
            case "75018": TweetParisVelib(75018, user)
            case "75019": TweetParisVelib(75019, user)
            case "75020": TweetParisVelib(75020, user)
        }
    }

    if(contentArray.includes("prenom")) {

        var name = contentArray[1]
        var year = contentArray[2]
        TweetInfoName(name, year, user)
    }

    if(contentArray.includes("covid")) {
        TweetCodivFranceData(user)
    }

})

