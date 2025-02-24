export async function fetchWeather(city) {
    const apiKey = '3ec2fdb97c1608d8d614d9eb0dc53ce8';
    const url = `https://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(city)}`;

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
