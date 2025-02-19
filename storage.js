export function getRecentSearches() {
    return JSON.parse(localStorage.getItem('recentSearches')) || [];
}

export function saveSearch(city) {
    let searches = getRecentSearches();
    if (!searches.includes(city)) {
        searches.unshift(city);
        if (searches.length > 5) searches.pop();
        localStorage.setItem('recentSearches', JSON.stringify(searches));
    }
}

export function getFavoriteCities() {
    return JSON.parse(localStorage.getItem('favoriteCities')) || [];
}

export function saveFavoriteCity(city) {
    let favorites = getFavoriteCities();
    if (!favorites.includes(city)) {
        favorites.push(city);
        localStorage.setItem('favoriteCities', JSON.stringify(favorites));
    }

    fetch('https://jsonplaceholder.typicode.com/posts', {  // Mock API
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: city, body: "Favorite city", userId: 1 }) 
    })
    .then(response => response.json())
    .then(data => console.log("Successfully saved favorite (mock):", data))
    .catch(error => console.error('Error saving favorite city:', error));
}
