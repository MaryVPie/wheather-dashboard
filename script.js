//Global variable
    let apiKey = "03aba937d19e4a78de807fc17c5bc55c";

//getting current weather conditions in a city specified  
function fetchCurrentWeather(city) {

     let currentWeat = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(currentWeat)
    .then(x => x.text())
    .then(y => console.log(y));
}


//getting 5 day weather forecast in a city specified  
function fetchFiveDayWeather(city) {

    let fiveDayWeat = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(fiveDayWeat)
    .then(x => x.text())
    .then(y => console.log(y));
}

//function is called when the search button is clicked
function search() {
    let searchValue = document.getElementById("inputCity").value;
  
    localStorage.setItem(`WeatherApp_${searchValue}`,searchValue);
//getting current weather in a city specified and in parallel getting 5 day weather forecast
    fetchCurrentWeather(searchValue);
    fetchFiveDayWeather(searchValue);
};


