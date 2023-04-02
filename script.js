// Variables will go here 
var btn = document.querySelector('.btn');
var weatherApi = "7383a191eb96b83d8fa7439817a5636c";
var currentCity= "";
var lastCity = "";


// Function to get and display the current conditions on Open Weather Maps
var getCurrentConditions = (event) => {
    // Obtain city name from the search box
    var city = $('#search-city').val();
    currentCity= $('#search-city').val();
    // Set the queryURL to fetch from API using weather search - added units=imperial to fix
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" + city + "&units=imperial" + "&APPID=" + weatherApi;
    fetch(queryURL)
    .then((response) => {
        console.log(response);
        return response.json();
    })
    // .then((response) => {
        // Save city to local storage
        // $('#search-city')
};
// })};

btn.addEventListener("click", getCurrentConditions);










