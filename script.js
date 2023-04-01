// Variables will go here 
var btn = document.querySelector('.btn');
var weatherApi = "7383a191eb96b83d8fa7439817a5636c";
var city;


// fetch Weather api function 
function getApi(city) {
    var weatherURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=' + weatherApi;
    fetch(weatherURL)
    .then(function (city) {
        console.log(city);
      
    })
    // console.log("You clicked a button");
};


 btn.addEventListener("click", getApi);







