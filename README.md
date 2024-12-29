Weather App 🌤️
This project is a simple weather application that allows users to fetch current weather information and a 3-hour forecast for a specific location or their current position. The app utilizes the OpenWeatherMap API to display real-time weather data such as temperature, weather conditions, humidity, wind speed, and local time.

Features
Search by Location: Enter any city name to get its current weather details.
Use Current Location: Automatically fetch weather data based on your device's geolocation.
3-Hour Forecast: Display a forecast for the next 3 hours.
Weather Details:
Temperature in °C
Humidity percentage
Wind speed in m/s
Weather condition description
Local time calculated from the timezone
Technologies Used
HTML: For structuring the app layout.
CSS: For styling and creating a user-friendly design.
JavaScript: For dynamic functionality and fetching data from the API.
OpenWeatherMap API: To fetch weather data.

How It Works
Fetching Weather by Location: Users can input a city name in the text box. The app sends a request to OpenWeatherMap API and displays the current weather details.
Fetching Weather by Geolocation: By clicking the "Use Current Location" button, the app retrieves the user's latitude and longitude via the browser's Geolocation API and fetches the weather data.
Forecast Display: The app fetches and displays a 3-hour forecast, including temperature and condition.

Future Enhancements
Add a 7-day forecast feature.
Enable toggling between °C and °F.
Improve the UI with advanced CSS animations and themes.
Add error handling for invalid city names or failed geolocation permissions
