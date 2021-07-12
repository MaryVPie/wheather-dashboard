//Global variable
    let apiKey = "03aba937d19e4a78de807fc17c5bc55c";

//getting current weather conditions in a city specified  
function fetchCurrentWeather(city) {

     let currentWeat = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(currentWeat)
    .then(response => response.json())
    .then(y => {
        let currentWeatherContainer = document.getElementById("weather-current");
        let weatherConditions = y.weather[0];
        currentWeatherContainer.innerHTML = `<h2>${y.name}</h2> <img id="wicon" src="http://openweathermap.org/img/w/${weatherConditions.icon}.png" alt="Weather icon">
        <br>Temp:&nbsp;${kelvinToFahrenheit(y.main.temp)}&deg;F<br>
        <br>Wind:&nbsp;${y.wind.speed} MPH<br>
        <br>Humidity:&nbsp;${y.main.humidity} %<br>`;
        
        // <br>UV Index:&nbsp;<span class="badge bg-success">${}</span><br><br>`;

        //calls UV data function
        fetchesUV(y.coord.lat, y.coord.lon);
    });
}

//fetches UV data
function fetchesUV(lat, lon) {
    
    let currentUV =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${apiKey}`;

    fetch(currentUV)
    .then(response => response.json())
    .then(y => {
        let currentWeatherContainer = document.getElementById("weather-current");
        console.log(y);
        let uvi = y.current.uvi;
        //colors uvi levels
        let color = "bg-success";
        if (uvi >2 && uvi <= 7) {
            color = "bg-warning";
        }
        if (uvi > 7) {
            color = "bg-danger";
        }
        currentWeatherContainer.insertAdjacentHTML('beforeEnd', `<br>UV Index:&nbsp;<span class="badge ${color}">${uvi}</span><br><br>`);
    });
}

//getting 5 day weather forecast in a city specified  
function fetchFiveDayWeather(city) {

    let fiveDayWeat = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(fiveDayWeat)
    .then(response => response.json())
    .then(y => console.log(y));
}

//function is called when the search button is clicked
function search() {
    let searchValue = document.getElementById("inputCity").value;
    
    if (searchValue != null && searchValue != "") {
        localStorage.setItem(`WeatherApp_${searchValue}`,searchValue);
    }
    
//getting current weather in a city specified and in parallel getting 5 day weather forecast
    fetchCurrentWeather(searchValue);
    fetchFiveDayWeather(searchValue);
}

// Calculating Fahrenheit temperature
function kelvinToFahrenheit (kelvinDegrees) {
    // Celsius is 273 degrees less than Kelvin
const celsius = kelvinDegrees - 273;

// Calculating Fahrenheit temperature to the nearest integer
let fahrenheit = Math.floor(celsius * (9/5) + 32);
return fahrenheit;
};



function getSearchedCities() {

    for (var i = 0; i < localStorage.length; i++){
        const localStorageKey = localStorage.key(i);
       
        if (!localStorageKey.includes("WeatherApp_")) {
            continue;
        }
        //gets record which matches the key from local storage 
        localStorage.getItem(localStorageKey);

        let city = localStorage.getItem(localStorageKey);
        let oldCities = `<button type="button" class="btn btn-secondary" onclick="storageCity(this)" >${city}</button>`;
        let historyContainer = document.getElementById("search-history");
        historyContainer.insertAdjacentHTML('beforeEnd', oldCities);
    }
}

//shows chosen city from grey buttons on the main card
function storageCity(button) {
    console.log(button);

    let city = button.innerHTML;
    fetchCurrentWeather(city);
    fetchFiveDayWeather(city);
}

getSearchedCities();

// function name() {
    
//     let oldCities = `<button type="button" class="btn btn-secondary" onclick="storageCity(this)" >${city}</button>`;
//     let historyContainer = document.getElementById("search-history");
//     historyContainer.insertAdjacentHTML('beforeEnd', oldCities);
// }

// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

