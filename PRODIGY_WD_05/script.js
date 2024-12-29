const API_KEY = "your_api_key_here"; // Replace with your OpenWeatherMap API Key
const weatherInfo = document.getElementById("weatherInfo");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const localTime = document.getElementById("localTime");
const forecastList = document.getElementById("forecastList");

document.getElementById("searchBtn").addEventListener("click", () => {
  const location = document.getElementById("locationInput").value;
  if (location) {
    fetchWeather(location);
  } else {
    alert("Please enter a location.");
  }
});

document.getElementById("currentLocationBtn").addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeatherByCoordinates(lat, lon);
      },
      () => alert("Unable to get your location.")
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});

function fetchWeather(location) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Location not found. Please try another city.");
      }
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
      fetchForecast(data.coord.lat, data.coord.lon);
    })
    .catch((error) => alert(error.message));
}

function fetchWeatherByCoordinates(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
      fetchForecast(lat, lon);
    })
    .catch(() => alert("Unable to fetch weather data."));
}

function fetchForecast(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => displayForecast(data))
    .catch(() => alert("Unable to fetch forecast data."));
}

function displayWeather(data) {
  cityName.textContent = data.name;
  temperature.textContent = `Temperature: ${data.main.temp}°C`;
  description.textContent = `Condition: ${data.weather[0].description}`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;

  // Calculate local time based on timezone
  const localTimeDate = new Date((data.dt + data.timezone) * 1000);
  localTime.textContent = `Local Time: ${localTimeDate.toUTCString().slice(17, 22)}`;
  weatherInfo.style.display = "block";
}

function displayForecast(data) {
  forecastList.innerHTML = ""; // Clear previous forecast
  for (let i = 0; i < 5; i++) {
    const forecast = data.list[i];
    const listItem = document.createElement("li");
    listItem.textContent = `${new Date(forecast.dt * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}: ${forecast.main.temp}°C, ${forecast.weather[0].description}`;
    forecastList.appendChild(listItem);
  }
}