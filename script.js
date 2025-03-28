// API variables
const nominatimAPI = "https://nominatim.openstreetmap.org";
const openMeteoAPI = "https://api.open-meteo.com";


// DOM Elements
const cityInput = document.querySelector("#cityInput");
const searchButton = document.querySelector("#searchButton");
const cityElement = document.querySelector("#city");
const gpsElement = document.querySelector("#gps");
const temperatureElement = document.querySelector("#temperature");
const detailsElement = document.querySelector("#details");

// Declaration of functions
async function fetchCoordinates(city) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=json&addressdetails=1&limit=1`);
        const data = await response.json();

        if (data.length === 0) {
            throw new Error('Ville non trouvée');
        }

        const coordinates = {
            name: data[0].name,
            lat: Number(data[0].lat),
            lon: Number(data[0].lon),
        }
        return coordinates;
    } catch (error) {
        console.error('Error fetching coordinates', error);
        gpsElement.innerText = 'Impossible de récupérer les coordonnées de la ville saisie';
        throw error;
    }
}

async function fetchWeather() {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,relative_humidity_2m`);
        const data = await response.json();
        const temperature = Number(data[0].current.temperature_2m)
        return temperature
    } catch (error) {
        console.error('Error fetching temperature', error);
    }
}

async function handleSearch() {
    const city = cityInput.value;
    try {
        const coordinates = await fetchCoordinates(city);
        cityElement.innerText = `${coordinates.name}`;
        gpsElement.innerText = `Coordonnées GPS : 
        ${coordinates.lat.toFixed(7)}
        ${coordinates.lon.toFixed(7)}`;
        
        const temperature = await fetchWeather(coordinates.lat, coordinates.lon);
        temperatureElement.innerText = `${temperature.current.temperature_2m}`
    } catch (error) {
        console.error(error);
    }
}

// Code execution
searchButton.addEventListener('click', handleSearch);