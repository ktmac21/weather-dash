// Element selectors 

var submitBtn = document.querySelector(".button");
var formEl = document.querySelector("#search-form")
var searchInput = document.querySelector("#usersearch");
var resultsAreaEl = document.querySelector(".current-weather");
var fiveDayEl = document.querySelector(".five-day-weather");
var indexArea = document.querySelector(".uv-index");

// search term/submit function

var formSubmitHandler = function (event) {
  event.preventDefault();

  var citySearch = searchInput.value.trim();

  if (citySearch) {
    getWeather(citySearch);

    resultsAreaEl.textContent = '';
    searchInput.value = '';
  } else {
    alert('Please enter a city');
  }
};

// current weather function - pulls current weather from current weather API
var getWeather = function (city) {

  var baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
  var endURL = "&appid=e6d9bd4bd36258ab138b6fe837ce13e0&units=imperial";
  var completeURL = baseURL + city + endURL;


  fetch(completeURL)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          printResults(data, city);
          getFiveDay(data.coord.lon, data.coord.lat);
        });
      } else {
        alert('Error: ' + response.statusText);
      }

    })
    .catch(function (error) {
      alert('Unableto connect to Open Weather');
    });
};



// function that prints the current weather results to the resultsArea element
var printResults = function (data) {



  var currentDate = moment().format("MMMM Do YYYY");
  var resultsArea = document.querySelector(".current-weather");
  var listEl = document.createElement("li");
  listEl.innerHTML = currentDate;
  resultsArea.append(listEl);



  var IconEl = document.createElement("img");
  IconEl.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
  resultsAreaEl.append(IconEl);




  var cityName = data.name
  var resultsArea = document.querySelector(".current-weather");
  var listEl = document.createElement("li");
  listEl.innerHTML = cityName;
  resultsArea.append(listEl);

  var cityTemp = Math.floor(data.main.temp) + " ℉";
  var resultsArea = document.querySelector(".current-weather");
  var listEl = document.createElement("li");
  listEl.innerHTML = cityTemp;
  resultsArea.append(listEl);

  var cityHumidity = "Humidity: " + Math.floor(data.main.humidity) + "%";
  var resultsArea = document.querySelector(".current-weather");
  var listEl = document.createElement("li");
  listEl.innerHTML = cityHumidity;
  resultsArea.append(listEl);

  var cityWind = "Wind: " + Math.floor(data.wind.speed) + " MPH";
  var resultsArea = document.querySelector(".current-weather");
  var listEl = document.createElement("li");
  listEl.innerHTML = cityWind;
  resultsArea.append(listEl);


}

// seperate function to pull UV Index with color coding 
var printUV = function (data) {
  var indexContainer = document.createElement("div");
  indexContainer.className = "uv-index";

  var cityIndex = "UV Index: " 
  var UV = data.current.uvi;
  var UVcityIndex = cityIndex + UV;
  var indexEl = document.createElement("p");
  indexEl.innerHTML = UVcityIndex;
  while (indexArea.firstChild) {
    indexArea.removeChild(indexArea.firstChild)
  }
  indexContainer.append(indexEl);
  indexArea.append(indexContainer);

  // if favorable
  if (UV <= 2) {
    indexContainer.className = "green"; 
  }
// if moderate
  if (UV > 2 && UV <= 7)
  indexContainer.className = "yellow";
// if severe
  if (UV > 7) {
    indexContainer.className = "red";
  }
}



// function that pulls five day weather from One Call API
var getFiveDay = function (lon, lat) {
  console.log(lon, lat);

  var baseURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon;
  var endURL = "&exclude=minutely,hourly,alerts&units=imperial&appid=e6d9bd4bd36258ab138b6fe837ce13e0";
  var completeURL = baseURL + endURL;


  fetch(completeURL)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          printUV(data); 
          for (var i = 1; i < 6; i++) {
            console.log(data.daily[i])
            printFiveDay(data.daily[i])
          }
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to Open Weather');
    });
};

// function that prints five day forecast to five-day-weather element
var printFiveDay = function (data) {
  var divContainer = document.createElement("div");
  divContainer.className = "five-day";
  var dateEl = document.createElement("p");
  dateEl.innerHTML = moment.unix(data.dt).format("MM/DD/YYYY");
  divContainer.append(dateEl);
  var imgEl = document.createElement("img");
  imgEl.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
  divContainer.append(imgEl);
  var tempEl = document.createElement("p");
  tempEl.innerHTML = "Temp: " + Math.floor(data.temp.day) + " ℉";
  divContainer.append(tempEl);
  var humidityEl = document.createElement("p");
  humidityEl.innerHTML = "Humidity: " + data.humidity + "%";
  divContainer.append(humidityEl);
  var windEl = document.createElement("p");
  windEl.innerHTML = "Wind: " + Math.floor(data.wind_speed) + " mph";
  divContainer.append(windEl);
  fiveDayEl.append(divContainer);
};

// eventlistener when user enters a city is into search field

formEl.addEventListener('submit', formSubmitHandler)



