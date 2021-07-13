var searchBtn = $(".button")
var city = "boston";


var baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
var endURL = "&appid=e6d9bd4bd36258ab138b6fe837ce13e0"; 

var completeURL = baseURL + city + endURL; 

fetch(completeURL).then(function(response) {
    return response.json()

}).then(function(data) {
    console.log(data);
    printResults(data);
})

function printResults(data) {
    var weather = data.name;
    var printEl = document.querySelector('.city-name');

    var cityName = weather;
    var heading = document.createElement("h1");
    heading.innerHTML = cityName;
    printEl.appendChild(heading);
   
   



}
