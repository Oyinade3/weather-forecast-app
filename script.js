// code for displaying real-time on html page

let date = new Date();
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

let today = document.querySelector('#today');
let month = document.querySelector("#month");
let dayNumber = document.querySelector("#day_number");
let hour = document.querySelector("#hour");
let minute = document.querySelector("#minute");
let formatHour = date.getHours();
if (formatHour<10){
    formatHour = `0${formatHour}`
}
let formatMinute = date.getUTCMinutes();
if (formatMinute < 10) {
  formatMinute = `0${formatMinute}`;
}

today.innerHTML = days[date.getDay()];
month.innerHTML = months[date.getMonth()];
dayNumber.innerHTML = date.getDate();
hour.innerHTML = formatHour;
minute.innerHTML = formatMinute;



// code for displaying the value of the form input
let form = document.querySelector('form');

function search(event){
  event.preventDefault();
  
  //weather api key variables
  let cityInput = document.querySelector("#city");
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiMain = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${apiMain}${cityInput.value}&appid=${apiKey}&units=metric`;

  //function for getting city input weather
  function weatherApi(response){
    // variables holding info gotten from Api
    let cityTemp = Math.round(response.data.main.temp);
    let place = response.data.name;
    let cityPressure = Math.round(response.data.main.pressure);
    let cityHumidity = Math.round(response.data.main.humidity);
    let cityWind = Math.round(response.data.wind.speed);
    let cityDescription = response.data.weather[0].description;

    //variables holding the elements
    let displayPlace = document.querySelector("#location");
    let displayCityTemperature = document.querySelector("#number");
    let displayCityDescription = document.querySelector("#description");
    let displayCityPressure = document.querySelector("#pressure");
    let displayCityHumidity = document.querySelector("#humidity");
    let displayCityWind = document.querySelector("#wind");

    //code changing the inner content of elements
    displayPlace.innerHTML = place;
    displayCityTemperature.innerHTML = cityTemp;
    displayCityDescription.innerHTML = cityDescription;
    displayCityPressure.innerHTML = cityPressure;
    displayCityHumidity.innerHTML = cityHumidity;
    displayCityWind.innerHTML = cityWind;
    console.log(response.data);

    tempToggle(cityTemp)
  }
  axios.get(apiUrl).then(weatherApi);
}
form.addEventListener('submit', search)

// fuction to call for switching degrees between celcius and fahrenheit
function tempToggle(temp){
  let number = document.querySelector("#number");
  let degreeBox = document.querySelector("#degree-box");
  let celcius = document.querySelector("#celcius");
  let farenheit = document.querySelector("#farenheit");

  celcius.classList.add("big");
  celcius.addEventListener("click", function () {
    degreeBox.classList.remove("active");
    number.innerHTML = temp;
    celcius.classList.add("big");
    farenheit.classList.remove("big");
  });
  farenheit.addEventListener("click", function () {
    celcius.classList.remove("big");
    farenheit.classList.add("big");
    degreeBox.classList.add("active");
    number.innerHTML = Math.round(temp * 1.8 + 32);
  });
}



//code for displaying current location weather forecast
function latLong(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let latLongApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  
  axios.get(latLongApi).then((response) => {
    //variables of api weather data
    let temperature = Math.round(response.data.main.temp);
    let country = response.data.name;
    let pressure = Math.round(response.data.main.pressure);
    let humidity = Math.round(response.data.main.humidity);
    let wind = Math.round(response.data.wind.speed);
    let description = response.data.weather[0].description;

    //variables holding the elements
    let displayCountry = document.querySelector("#location");
    let displayTemperature = document.querySelector('#number');
    let displayDescription = document.querySelector("#description");
    let displayPressure = document.querySelector("#pressure");
    let displayHumidity = document.querySelector("#humidity");
    let displayWind = document.querySelector("#wind");

    //code changing the inner content of elements
    displayCountry.innerHTML = country;
    displayTemperature.innerHTML = temperature;
    displayDescription.innerHTML = description;
    displayPressure.innerHTML = pressure;
    displayHumidity.innerHTML = humidity;
    displayWind.innerHTML = wind;
    // console.log(response.data);

    tempToggle(temperature)
  });
}

//click trigger of location weather function
let currentLocation = document.querySelector(".geo-btn");
currentLocation.addEventListener('click', ()=>{
    navigator.geolocation.getCurrentPosition(latLong);
})


