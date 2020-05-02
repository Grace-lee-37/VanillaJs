const weatherTitle = document.querySelector(".js-weather")

const API_KEY = "cbdab8175bacdb1b730549baf84b4dc4",
    WEATHER_LS = "weather";

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`)
    .then(function(response){
        return response.json()
    }).then(function(json){
        const temperature = json.main.temp
        const location = json.name
        const weather = json.weather[0].main
        weatherTitle.innerHTML = `${temperature}ºF @ ${location}, ${weather}`
    })

}

function saveCoord(obj){
    localStorage.setItem(WEATHER_LS, JSON.stringify(obj));
}

function getCoordSucceed(location){
    const latitude = location.coords.latitude
    const longitude = location.coords.longitude
    const weatherObj = {
        latitude, 
        longitude
    }
    saveCoord(weatherObj);
    getWeather(latitude, longitude);
}

function getCoordFailed(){
    console.log("Can't get location")
}

function askCoord(){
    navigator.geolocation.getCurrentPosition(getCoordSucceed, getCoordFailed)
}

function checkWeather(){
    const currentValue = localStorage.getItem(WEATHER_LS)
    if(currentValue === null){
        askCoord()
    } else {
        const parsedCoord = JSON.parse(currentValue)
        getWeather(parsedCoord.latitude, parsedCoord.longitude)
    }
}

function init(){
    checkWeather();
}

init();