// Easy access to elements
var searchHistoryList = $('#search-history-list');
var searchCityInput = $("#search-city");
var searchCityButton = $("#search-city-button");
var clearHistoryButton = $("#clear-history");

var currentCity = $("#current-city");
var currentTemp = $("#current-temp");
var currentHumidity = $("#current-humidity");
var currentWindSpeed = $("#current-wind-speed");
var UVindex = $("#uv-index");

var weatherContent = $("#weather-content");

// Get access to the OpenWeather API
var APIkey = "7383a191eb96b83d8fa7439817a5636c";

// Easy access to data
var cityList = [];

// Find current date and display in title
var currentDate = moment().format('L');
$("#current-date").text("(" + currentDate + ")");

// Check if search history exists when page loads
initalizeHistory();
showClear();

// Hitting enter while input is focused will trigger
// value added to search history
$(document).on("submit", function(){
    event.preventDefault();

    // Grab value entered into search bar 
    var searchValue = searchCityInput.val().trim();

    currentConditionsRequest(searchValue)
    searchHistory(searchValue);
    searchCityInput.val(""); 
});

// Clicking the search button will trigger
// value added to search history
searchCityButton.on("click", function(event){
    event.preventDefault();

    // Grab value entered into search bar 
    var searchValue = searchCityInput.val().trim();

    currentConditionsRequest(searchValue)
    searchHistory(searchValue);    
    searchCityInput.val(""); 
});

// Clear the sidebar of past cities searched
clearHistoryButton.on("click", function(){
    // Empty out the  city list array
    cityList = [];
    // Update city list history in local storage
    listArray();
    
    $(this).addClass("hide");
});

// Clicking on a button in the search history sidebar
// will populate the dashboard with info on that city
searchHistoryList.on("click","li.city-btn", function(event) {
    // console.log($(this).data("value"));
    var value = $(this).data("value");
    currentConditionsRequest(value);
    searchHistory(value); 

});



// Request Open Weather API based on user input
function currentConditionsRequest(searchValue) {
    
    // Formulate URL for AJAX api call
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&units=imperial&appid=" + APIkey;
    

    // Make AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        currentCity.text(response.name);
        currentCity.append("<small class='text-muted' id='current-date'>");
        $("#current-date").text("(" + currentDate + ")");
        currentCity.append("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='" + response.weather[0].main + "' />" )
        currentTemp.text(response.main.temp);
        currentTemp.append("&deg;F");
        currentHumidity.text(response.main.humidity + "%");
        currentWindSpeed.text(response.wind.speed + "MPH");

        var lat = response.coord.lat;
        var lon = response.coord.lon;
        

        var UVurl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey;
        // AJAX Call for UV index
        $.ajax({
            url: UVurl,
            method: "GET"
        }).then(function(response){
            // console.log("UV call: ")
            // console.log(response);
            UVindex.text(response.value);
        });

        var countryCode = response.sys.country;
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=" + APIkey + "&lat=" + lat +  "&lon=" + lon;
        
        // AJAX call for 5-day forecast
        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            $('#five-day-forecast').empty();
            for (var i = 1; i < response.list.length; i+=8) {

                var forecastDateString = moment(response.list[i].dt_txt).format("L");
                console.log(forecastDateString);

                var forecastCol = $("<div class='col-12 col-md-6 col-lg forecast-day mb-3'>");
                var forecastCard = $("<div class='card'>");
                var forecastCardBody = $("<div class='card-body'>");
                var forecastDate = $("<h5 class='card-title'>");
                var forecastIcon = $("<img>");
                var forecastTemp = $("<p class='card-text mb-0'>");
                var forecastHumidity = $("<p class='card-text mb-0'>");


                $('#five-day-forecast').append(forecastCol);
                forecastCol.append(forecastCard);
                forecastCard.append(forecastCardBody);

                forecastCardBody.append(forecastDate);
                forecastCardBody.append(forecastIcon);
                forecastCardBody.append(forecastTemp);
                forecastCardBody.append(forecastHumidity);
                
                forecastIcon.attr("src", "https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                forecastIcon.attr("alt", response.list[i].weather[0].main)
                forecastDate.text(forecastDateString);
                forecastTemp.text(response.list[i].main.temp);
                forecastTemp.prepend("Temp: ");
                forecastTemp.append("&deg;F");
                forecastHumidity.text(response.list[i].main.humidity);
                forecastHumidity.prepend("Humidity: ");
                forecastHumidity.append("%");
                
                // console.log(response.list[i].dt_txt);
                // console.log(response.list[i].main.temp);
                // console.log(response.list[i].main.humidity);

            }
        });

    });

    

};

// Display and save the search history of cities
function searchHistory(searchValue) {
    // Grab value entered into search bar 
    // var searchValue = searchCityInput.val().trim();
    
    // If there are characters entered into the search bar
    if (searchValue) {
        // Place value in the array of cities
        // if it is a new entry
        if (cityList.indexOf(searchValue) === -1) {
            cityList.push(searchValue);

            // List all of the cities in user history
            listArray();
            clearHistoryButton.removeClass("hide");
            weatherContent.removeClass("hide");
        } else {
            // Remove the existing value from
            // the array
            var removeIndex = cityList.indexOf(searchValue);
            cityList.splice(removeIndex, 1);

            // Push the value again to the array
            cityList.push(searchValue);

            // list all of the cities in user history
            // so the old entry appears at the top
            // of the search history
            listArray();
            clearHistoryButton.removeClass("hide");
            weatherContent.removeClass("hide");
        }
    }
    // console.log(cityList);
}

// List the array into the search history sidebar
function listArray() {
    // Empty out the elements in the sidebar
    searchHistoryList.empty();
    // Repopulate the sidebar with each city
    // in the array
    cityList.forEach(function(city){
        var searchHistoryItem = $('<li class="list-group-item city-btn">');
        searchHistoryItem.attr("data-value", city);
        searchHistoryItem.text(city);
        searchHistoryList.prepend(searchHistoryItem);
    });
    // Update city list history in local storage
    localStorage.setItem("cities", JSON.stringify(cityList));
    
}

// Grab city list string from local storage
// and update the city list array
// for the search history sidebar
function initalizeHistory() {
    if (localStorage.getItem("cities")) {
        cityList = JSON.parse(localStorage.getItem("cities"));
        var lastIndex = cityList.length - 1;
        // console.log(cityList);
        listArray();
        // Display the last city viewed
        // if page is refreshed
        if (cityList.length !== 0) {
            currentConditionsRequest(cityList[lastIndex]);
            weatherContent.removeClass("hide");
        }
    }
}

// Check to see if there are elements in
// search history sidebar in order to show clear history btn
function showClear() {
    if (searchHistoryList.text() !== "") {
        clearHistoryButton.removeClass("hide");
    }
}





