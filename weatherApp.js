import { fetchWeather } from './weatherAPI.js';
import { updateUI, toggleTemperatureUnit, loadSearchHistory, loadFavorites } from './ui.js';
import { saveSearch } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const unitToggle = document.getElementById('unit-toggle');
    const recentSearchesContainer = document.getElementById('recent-searches');
    const favoritesContainer = document.getElementById('favorite-cities');

    loadSearchHistory();
    loadFavorites();

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const city = searchInput.value.trim();
        if (city) {
            const weatherData = await fetchWeather(city);
            if (weatherData) {
                updateUI(weatherData);
                saveSearch(city);
                loadSearchHistory();
            }
        }
    });

    unitToggle.addEventListener('click', toggleTemperatureUnit);

    recentSearchesContainer.addEventListener('click', async (event) => {
        if (event.target.classList.contains('recent-search')) {
            const city = event.target.textContent;
            const weatherData = await fetchWeather(city);
            if (weatherData) {
                updateUI(weatherData);
            }
        }
    });

    favoritesContainer.addEventListener('click', async (event) => {
        if (event.target.classList.contains('favorite-city')) {
            const city = event.target.textContent;
            const weatherData = await fetchWeather(city);
            if (weatherData) {
                updateUI(weatherData);
            }
        }
    });
});
