const apiKey = "06a565b774ed19fb06294ca95add7836";
const url = "https://api.openweathermap.org/data/2.5/weather";

const latitude = -41.13347461490831;
const longitude = -71.31025916791074;

const queryParam = `?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
const fullUrl = `${url}${queryParam}`;

async function apiFetch() {
  try {
    const response = await fetch(fullUrl);
    if (response.ok) {
      const data = await response.json();
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.error(error);
  }
}

function displayResults(data) {
  const currentTemp = document.querySelector("#current-temp");
  const weatherIcon = document.querySelector("#weather-icon");
  const weatherDesc = document.querySelector("#weather-desc");
  const windSpeedElem = document.querySelector("#wind-speed");
  const humidityElem = document.querySelector("#humidity");
  const windChillElem = document.querySelector("#windchill");

  const temp = data.main.temp;
  const windSpeedKmH = data.wind.speed * 3.6;
  const humidity = data.main.humidity;
  const desc = data.weather[0].description;
  const iconCode = data.weather[0].icon;

  if (currentTemp) currentTemp.innerHTML = `${Math.round(temp)} &deg;C`;
  if (weatherDesc)
    weatherDesc.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
  if (windSpeedElem)
    windSpeedElem.textContent = `${Math.round(windSpeedKmH)} km/h`;
  if (humidityElem) humidityElem.textContent = `${humidity}%`;

  if (weatherIcon) {
    const iconSrc = `images/icons/${iconCode}.svg`;
    weatherIcon.setAttribute("src", iconSrc);
    weatherIcon.setAttribute("alt", desc);

    weatherIcon.onerror = () => {
      weatherIcon.src = "images/weather-icon.svg";
    };
  }

  if (windChillElem) {
    if (temp <= 10 && windSpeedKmH > 4.8) {
      windChillElem.textContent = `${calculateWindChill(temp, windSpeedKmH)} °C`;
    } else {
      windChillElem.textContent = "N/A";
    }
  }
}

function calculateWindChill(temp, speed) {
  return (
    13.12 +
    0.6215 * temp -
    11.37 * Math.pow(speed, 0.16) +
    0.3965 * temp * Math.pow(speed, 0.16)
  ).toFixed(1);
}

apiFetch();

const currentYearSpan = document.getElementById("currentyear");
if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}

const lastModifiedParagraph = document.getElementById("lastModified");
if (lastModifiedParagraph) {
  lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;
}
