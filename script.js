// Variables will go here 
var btn = document.querySelector('.btn');
var weatherApi = "7383a191eb96b83d8fa7439817a5636c";
var currentCity= "";
var lastCity = "";
// currentCity= $('#search-city').val();


// Function to get and display the current conditions on Open Weather Maps
var getCurrentConditions = (city) => {
    // Obtain city name from the search box
    // Set the weatherURL to fetch from API using weather search
    var weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=" + weatherApi;
    fetch(weatherURL)
    .then((response) => {
        console.log(response);
        return response.json();  
    }) 
    .then(data => {
        console.log("CURR DAY: ", data);
        getFiveDays(data.coord)
    }) 
    
    
};

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
    var city = $('#search-city').val()
    getCurrentConditions(city)
});












