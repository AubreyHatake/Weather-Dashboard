// Variables will go here 
var btn = document.querySelector('.btn');
var weatherApi = "7383a191eb96b83d8fa7439817a5636c";



// fetch Weather api function 
function getApi(response) {
    var weatherURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + response + '&limit=5&appid=' + weatherApi;
    fetch(weatherURL)
    .then(function (response) {
        console.log(response);
      
    })
    // console.log("You clicked a button");
};


 btn.addEventListener("click", getApi);







