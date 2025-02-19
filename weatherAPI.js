export async function fetchWeather(city) {
    const apiKey = '0a3fb08b0ff5cc03294fd2d274d64ff2';
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(city)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("API Response:", data);  // Debugging

        if (!data || !data.location || !data.current) {
            console.error("Invalid response from API:", data);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}
