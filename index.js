let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes().toString().padStart(2, "0");

let currentDayTime = document.querySelector("#current-day-time");
currentDayTime.innerHTML = `${day} ${hours}:${minutes}`;

function showWeather(response) {
  console.log(response.data);
  document.querySelector("#city-display").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}
function loadCity(city) {
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "2d96d64425dca1d6eda00d942a281c0d";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}
function searchCityInput(event) {
  debugger;
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  loadCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCityInput);

loadCity("Bangkok");

function getPositionWeather(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "2d96d64425dca1d6eda00d942a281c0d";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPositionWeather);
}

let currentLocationButton = document.querySelector("#current-location-btn");
currentLocationButton.addEventListener("click", getPosition);

/*
function convertTempCel(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let celsius = temperature;
  let fahrenheit = Math.round((celsius * 9) / 5 + 32);
  if (temperature !== fahrenheit) {
    temperature.innerHTML = celsius;
  }
}

function convertTempFar(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let celsius = temperature;
  let fahrenheit = Math.round((celsius * 9) / 5 + 32);
  if (temperature !== celsius) {
    temperature.innerHTML = fahrenheit;
  }
}
let tempCelLink = document.querySelector("#celsius-link");
let tempFarLink = document.querySelector("#fahrenheit-link");

tempCelLink.addEventListener("click", convertTempCel);
tempFarLink.addEventListener("click", convertTempFar);
*/
