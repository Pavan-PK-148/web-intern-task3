const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

const apikey = "95d69973b10c572230ac1afe4514a500";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError("City not found or API error occurred.");
    }
  } else {
    displayError("Please enter a city name.");
  }
});

async function getWeatherData(city) {
  const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  const response = await fetch(apiurl);

  if (!response.ok) {
    throw new Error("Failed to fetch weather data.");
  }

  return await response.json();
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  setBackgroundGradient(id); // change background based on weather

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${temp.toFixed(1)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "🌩️"; // Thunderstorm
    case weatherId >= 300 && weatherId < 400:
      return "🌦️"; // Drizzle
    case weatherId >= 500 && weatherId < 600:
      return "🌧️"; // Rain
    case weatherId >= 600 && weatherId < 700:
      return "❄️"; // Snow
    case weatherId >= 700 && weatherId < 800:
      return "🌫️"; // Atmosphere
    case weatherId === 800:
      return "☀️"; // Clear
    case weatherId >= 801 && weatherId < 810:
      return "☁️"; // Clouds
    default:
      return "❓"; // Unknown
  }
}

function setBackgroundGradient(weatherId) {
  let gradient = "";

  switch (true) {
    case (weatherId >= 200 && weatherId < 300): // Thunderstorm
      gradient = "linear-gradient(145deg, #373B44, #4286f4)";
      break;

    case (weatherId >= 300 && weatherId < 400): // Drizzle
      gradient = "linear-gradient(145deg, #89f7fe, #66a6ff)";
      break;

    case (weatherId >= 500 && weatherId < 600): // Rain
      gradient = "linear-gradient(145deg, #667db6, #0082c8, #0082c8, #667db6)";
      break;

    case (weatherId >= 600 && weatherId < 700): // Snow
      gradient = "linear-gradient(145deg, #e6dada, #274046)";
      break;

    case (weatherId >= 700 && weatherId < 800): // Mist, smoke, haze
      gradient = "linear-gradient(145deg, #bdc3c7, #2c3e50)";
      break;

    case (weatherId === 800): // Clear sky
      gradient = "linear-gradient(145deg, #fceabb, #f8b500)";
      break;

    case (weatherId >= 801 && weatherId < 810): // Clouds
      gradient = "linear-gradient(145deg, #d7d2cc, #304352)";
      break;

    default:
      gradient = "linear-gradient(145deg, #e0eafc, #cfdef3)";
  }

  document.body.style.background = gradient;
}
