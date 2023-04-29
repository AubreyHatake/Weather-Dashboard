// Variables will go here 
var btn = document.querySelector('.button');
var weatherApi = "7383a191eb96b83d8fa7439817a5636c";
var currentCity= "";
var lastCity = "";
var results = document.querySelector('#city-results');
var currentWeather = document.querySelector('#current-weather');
var names = document.querySelector('.hide');
var fiveDays = document.querySelector('#five-day-forecast');




// Function to get and display the current conditions on Open Weather Maps
var getCurrentConditions = (city) => {
    // Set the weatherURL to fetch from API using weather search
    var weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=" + weatherApi;
    fetch(weatherURL)
    .then((response) => {
        // this if statement will  handle errors
        if (response.status === 404) {
            alert("hmm try typing that again..");
            return;
        };
        // set the city input in local storage
        localStorage.setItem('city', city);
        results.classList.add('button');
        console.log(response);
        return response.json();  
    }) 
    .then(data => {
        console.log("CURR DAY: ", data); 
        getFiveDays(data.coord)
      displayCurrentConditions(data);  

    }) 
    
    
};

getCurrentConditions();

// this function is to display the current weather
function displayCurrentConditions (data) {
    if (currentWeather.firstChild) {
        currentWeather.firstChild.remove();
    }
    // this is suppose to show the names of the data types, temp, wind speed, and humidity.
    names.classList.add
    var h2 = document.createElement('h2');
    h2.textContent = data.name;
    currentWeather.append(h2);
    var li = document.createElement('li');
    li.textContent = "Temp:";
    currentWeather.append(li);
    var ul = document.createElement('ul');
    ul.textContent = data.main.temp;
    currentWeather.append(ul);
    var li = document.createElement('li');
    li.textContent = "Wind Speed:";
    currentWeather.append(li);
    var a = document.createElement('a');
    a.textContent = data.main.wind;
    currentWeather.append(a);
    var li = document.createElement('li');
    li.textContent = "Huminity:"
    currentCity.append(li);
    var ul = document.createElement('ul');
    ul.textContent = data.main.humidity;
    currentCity.append(ul);


};

// this will get the city from the local storage and display the last searched city 
results.innerHTML = localStorage.getItem("city");


function getFiveDays (coord) {
    var fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${weatherApi}`
    fetch(fiveDayURL)
    .then((response) => {
        console.log(response);
        return response.json();  
    }) 
    .then(data => {
        for(let i = 0; i < data.list.length; i+=8) {
            console.log("FIVE DAYS: ", data.list[i]);
        }
        displayFiveDays(data);

    }) 
    
}

function displayFiveDays (data) {
   if (fiveDays.firstChild) {
    fiveDays.firstChild.remove();
   }
   
}


btn.addEventListener("click", function () {
    // Obtain city name from the search box
    var city = $('#search-city').val();
    getCurrentConditions(city);
});










