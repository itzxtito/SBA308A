import { getRecentSearches } from './storage.js';
import { saveFavoriteCity, getFavoriteCities } from './storage.js'; // Import functions

export function updateUI(weatherData) {
    if (!weatherData) {
        console.error("Weather data is null or undefined.");
        return;
    }

    const weatherContainer = document.getElementById('weather-container');
    weatherContainer.innerHTML = `
        <h2>${weatherData.location.name}, ${weatherData.location.country}</h2>
        <img src="${weatherData.current.weather_icons[0]}" alt="Weather Icon">
        <p>Temperature: <span id="temperature" data-unit="C">${weatherData.current.temperature}</span>°C</p>
        <p>Condition: ${weatherData.current.weather_descriptions[0]}</p>
        <button id="save-favorite">Save as Favorite</button>
    `;

    document.getElementById('save-favorite').addEventListener('click', () => {
        saveFavoriteCity(weatherData.location.name);
        loadFavorites();
    });
}

export function loadFavorites() {
    const favoriteCities = getFavoriteCities();
    const favoritesContainer = document.getElementById('favorite-cities');

    if (favoritesContainer) {
        favoritesContainer.innerHTML = favoriteCities.map(city => `<button class="favorite-city">${city}</button>`).join('');
    }
}


export function toggleTemperatureUnit() {
    const temperatureElement = document.getElementById('temperature');
    
    if (!temperatureElement) {
        console.error("Temperature element not found!");
        return;
    }

    let currentTemp = parseFloat(temperatureElement.textContent);
    let isCelsius = temperatureElement.dataset.unit === 'C';

    if (isCelsius) {
        // Convert Celsius to Fahrenheit
        temperatureElement.textContent = ((currentTemp * 9/5) + 32).toFixed(1);
        temperatureElement.dataset.unit = 'F';
        temperatureElement.nextSibling.textContent = '°F'; // Ensure the unit symbol updates
    } else {
        // Convert Fahrenheit to Celsius
        temperatureElement.textContent = ((currentTemp - 32) * 5/9).toFixed(1);
        temperatureElement.dataset.unit = 'C';
        temperatureElement.nextSibling.textContent = '°C'; // Ensure the unit symbol updates
    }
}

export function loadSearchHistory() {
    const recentSearches = getRecentSearches();
    const recentSearchesContainer = document.getElementById('recent-searches');
    recentSearchesContainer.innerHTML = recentSearches.map(city => `<button class="recent-search">${city}</button>`).join('');
}
