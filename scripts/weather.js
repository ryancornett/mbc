export default async function getCurrentWeather() {
    const weatherDescriptions = {
        '0':'Clear',
        '1':'Mostly Clear',
        '2':'Partly Cloudy',
        '3':'Overcast',
        '45':'Fog',
        '48':'Fog',
        '51':'Light Drizzle',
        '53':'Moderate Drizzle',
        '55':'Dense Drizzle',
        '56':'Light Freezing Drizzle',
        '57':'Dense Freezing Drizzle',
        '61':'Slight Rain',
        '63':'Moderate Rain',
        '65':'Heavy Rain',
        '66':'Light Freezing Rain',
        '67':'Heavy Freezing Rain',
        '71':'Slight Snowfall',
        '73':'Moderate Snowfall',
        '75':'Heavy Snowfall',
        '77':'Snow Grains',
        '80':'Slight Rain Showers',
        '81':'Moderate Rain Showers',
        '82':'Violent Rain Showers',
        '85':'Slight Snow Showers',
        '86':'Heavy Snow Showers',
        '95':'Moderate Thunderstorm',
        '96':'Thunderstorm with Slight Hail',
        '99':'Thunderstorm with Heavy Hail'
    };

    // When is_day == 1
    const weatherIcons = {
      0:'../images/weather_icons/clear-day.webp',
      1:'../images/weather_icons/clear-day.webp',
      2:'../images/weather_icons/partly-cloudy.webp',
      3:'../images/weather_icons/partly-cloudy.webp',
      45:'../images/weather_icons/partly-cloudy.webp',
      48:'../images/weather_icons/partly-cloudy.webp',
      51:'../images/weather_icons/rain.webp',
      53:'../images/weather_icons/rain.webp',
      55:'../images/weather_icons/rain.webp',
      56:'../images/weather_icons/rain.webp',
      57:'../images/weather_icons/rain.webp',
      61:'../images/weather_icons/rain.webp',
      63:'../images/weather_icons/showers.webp',
      65:'../images/weather_icons/showers.webp',
      66:'../images/weather_icons/rain.webp',
      67:'../images/weather_icons/showers.webp',
      71:'../images/weather_icons/snow.webp',
      73:'../images/weather_icons/snow.webp',
      75:'../images/weather_icons/snow.webp',
      77:'../images/weather_icons/snow.webp',
      80:'../images/weather_icons/rain.webp',
      81:'../images/weather_icons/showers.webp',
      82:'../images/weather_icons/showers.webp',
      85:'../images/weather_icons/snow.webp',
      86:'../images/weather_icons/snow.webp',
      95:'../images/weather_icons/thunderstorms.webp',
      96:'../images/weather_icons/thunderstorms.webp',
      99:'../images/weather_icons/thunderstorms.webp',
      100:'../images/weather_icons/clear-night.webp'
    };

    async function getWeather() {
      return await fetch('https://api.open-meteo.com/v1/forecast?latitude=37.15&longitude=-83.76&current=temperature_2m,is_day,weather_code&temperature_unit=fahrenheit&timezone=America%2FNew_York')
        .then((response) => response.json());
    }

    let weather;
    if (sessionStorage.getItem('weather') !== null) {
      weather = JSON.parse(sessionStorage.getItem('weather'));
    }
    else {
      weather = await getWeather();
      sessionStorage.setItem('weather', JSON.stringify(weather));
    }

    let currentWeather = document.getElementById('current-weather');
    (async function displayCurrentTemp() {
      let fahrenheit = await weather.current.temperature_2m;
      let weatherIcon;
      if (weather.current.weather_code == 0 && weather.current.is_day == 0) {
        weatherIcon = weatherIcons[100];
      }
      else {
        weatherIcon = weatherIcons[weather.current.weather_code];
      }
      let temp = fahrenheit.toString().split('.')[0];
      const temperature = document.createElement('h5');
      temperature.textContent = `${temp}°`;
      const weatherText = document.createElement('div');
      weatherText.classList.add('weather-text');
      currentWeather.appendChild(weatherText);
      weatherText.appendChild(temperature);
      const weatherDescription = document.createElement('h6');
      weatherDescription.textContent = weatherDescriptions[weather.current.weather_code];
      weatherText.appendChild(weatherDescription);
      const icon = document.createElement('img');
      icon.classList.add('weather-icon');
      icon.src = weatherIcon;
      currentWeather.appendChild(icon);
      })();
}
