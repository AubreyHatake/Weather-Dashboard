// Variables will go here 
var btn = document.querySelector('.button');
var weatherApi = "7383a191eb96b83d8fa7439817a5636c";
var currentCity= "";
var lastCity = "";
var ul = document.querySelector('#city-results');
var div = document.querySelector('#current-weather');




// Function to get and display the current conditions on Open Weather Maps
var getCurrentConditions = (city) => {
    // Set the weatherURL to fetch from API using weather search
    var weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=" + weatherApi;
    fetch(weatherURL)
    .then((response) => {
        // set the city input in local storage
        localStorage.setItem('city', city);
        console.log(response);
        return response.json();  
    }) 
    .then(data => {
        console.log("CURR DAY: ", data);
        getFiveDays(data.coord)

    }) 
    
    
};

displayCurrentConditions();

// this function is to display the current weather
function displayCurrentConditions () {
     ul.classList.add('button');
     
}

// this will get the city from the local storage and display the last searched city 
ul.innerHTML = localStorage.getItem("city");
// ul.classList.add('.button');

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


    }) 
    
}


btn.addEventListener("click", function () {
    // Obtain city name from the search box
    var city = $('#search-city').val()
    getCurrentConditions(city)
});












