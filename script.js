// API variables
const nominatimAPI = "https://nominatim.openstreetmap.org";

// DOM Elements
const cityInput = document.querySelector("#cityInput");
const searchButton = document.querySelector("#searchButton");
const cityElement = document.querySelector("#city");
const gpsElement = document.querySelector("#gps");
// const temperatureElement = document.querySelector("#temperature");
// const detailsElement = document.querySelector("#details");

// Declaration of functions
async function fetchCoordinates(city) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=json&addressdetails=1&limit=1`);
        const data = await response.json();

        if (data.length === 0) {
            throw new Error('Pas de coordonnées trouvées pour la ville fournie');
        }

        const coordinates = {
            name: data[0].name,
            lat: Number(data[0].lat),
            lng: Number(data[0].lon),
        }
        return coordinates;
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        gpsElement.innerText = 'Impossible de trouver les coordonnées de la ville';
        throw error;
    }
}
async function handleSearch() {
    const city = cityInput.value;
    try {
        const coordinates = await fetchCoordinates(city);
        cityElement.innerText = `${coordinates.name}`;
        gpsElement.innerText = `Coordonnées GPS : 
        ${coordinates.lat.toFixed(7)}
        ${coordinates.lng.toFixed(7)}`;
    } catch (error) {
        console.error(error);
    }
}

// Code execution
searchButton.addEventListener('click', handleSearch);