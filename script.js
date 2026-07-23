// Use your own OpenWeatherMap API Key below
const apiKey = '116cc5f3b4015cef26bc0b78c064c40c';
const units = 'metric'; // 'metric' for Celsius
const temperatureSymbol = '°C';

// Popular cities for search suggestions
const popularCities = [
    'New York', 'London', 'Paris', 'Tokyo', 'Sydney', 'Mumbai', 'Delhi', 'Dubai', 'Singapore', 'Hong Kong',
    'Los Angeles', 'Chicago', 'Toronto', 'Vancouver', 'Mexico City', 'São Paulo', 'Rio de Janeiro', 'Buenos Aires',
    'Madrid', 'Barcelona', 'Rome', 'Milan', 'Berlin', 'Munich', 'Amsterdam', 'Stockholm', 'Oslo', 'Copenhagen',
    'Moscow', 'Istanbul', 'Cairo', 'Lagos', 'Johannesburg', 'Cape Town', 'Nairobi', 'Bangkok', 'Manila', 'Jakarta',
    'Seoul', 'Beijing', 'Shanghai', 'Guangzhou', 'Melbourne', 'Brisbane', 'Perth', 'Auckland', 'Wellington'
];

// DOM Elements
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const searchDropdown = document.getElementById('search-dropdown');
const alertsDiv = document.getElementById('alerts');
const currentWeatherDiv = document.getElementById('current-weather');
const forecastDiv = document.getElementById('forecast');
const themeToggle = document.getElementById('theme-toggle');
const compareInput = document.getElementById('compare-input');
const addCompareBtn = document.getElementById('add-compare-btn');
const clearCompareBtn = document.getElementById('clear-compare-btn');
let map, marker;

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherDashboard(city);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeatherDashboard(city);
        }
    }
});

// Search dropdown functionality
cityInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query.length > 0) {
        showSearchSuggestions(query);
    } else {
        hideSearchDropdown();
    }
});

cityInput.addEventListener('focus', () => {
    const query = cityInput.value.trim();
    if (query.length > 0) {
        showSearchSuggestions(query);
    }
});

// Hide dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
        hideSearchDropdown();
    }
});

// Comparison event listeners
addCompareBtn.addEventListener('click', () => {
    const city = compareInput.value.trim();
    if (city) {
        addCityToComparison(city);
        compareInput.value = '';
    }
});

compareInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = compareInput.value.trim();
        if (city) {
            addCityToComparison(city);
            compareInput.value = '';
        }
    }
});

clearCompareBtn.addEventListener('click', clearComparison);

themeToggle.addEventListener('click', toggleTheme);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    displayComparison(); // Initialize empty comparison grid
});

// Main function to fetch and display all dashboard data
async function getWeatherDashboard(city) {
    alertsDiv.innerHTML = '';
    currentWeatherDiv.innerHTML = '';
    forecastDiv.innerHTML = '';
    if (map && marker) {
        map.remove();
        map = null;
    }

    try {
        // Fetch current weather
        const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=${units}`);
        const weatherData = await weatherRes.json();
        if (weatherData.cod !== 200) {
            alertsDiv.innerHTML = `<div class="alert">City not found. Please try again.</div>`;
            return;
        }

        // Fetch 5-day forecast
        const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=${units}`);
        const forecastData = await forecastRes.json();

        // Display current weather
        displayCurrentWeather(weatherData);

        // Display 5-day forecast
        displayForecast(forecastData);

        // Generate and display alerts
        displayAlerts(weatherData, forecastData);

        // Show map
        showMap(weatherData.coord.lat, weatherData.coord.lon, city);
    } catch (err) {
        alertsDiv.innerHTML = `<div class="alert">Error fetching weather data.</div>`;
    }
}

// Purely cosmetic: maps the condition text the API already returns to an emoji glyph
function weatherIcon(main) {
    const icons = {
        Clear: '☀️', Clouds: '☁️', Rain: '🌧️', Drizzle: '🌦️',
        Thunderstorm: '⛈️', Snow: '❄️', Mist: '🌫️', Fog: '🌫️',
        Haze: '🌫️', Smoke: '🌫️', Dust: '🌫️', Sand: '🌫️', Tornado: '🌪️'
    };
    return icons[main] || '🌡️';
}

function displayCurrentWeather(data) {
    currentWeatherDiv.innerHTML = `
        <h2>${weatherIcon(data.weather[0].main)} Current Weather in ${data.name}, ${data.sys.country}</h2>
        <div>Temperature: <b>${data.main.temp}${temperatureSymbol}</b></div>
        <div>Humidity: <b>${data.main.humidity}%</b></div>
        <div>Wind Speed: <b>${data.wind.speed} km/h</b></div>
        <div>Condition: <b>${data.weather[0].description}</b></div>
        <button onclick="addToComparison(${JSON.stringify(data).replace(/"/g, '&quot;')})" class="compare-btn">
            Add to Comparison
        </button>
    `;
}

function displayForecast(data) {
    // Group forecast by day
    const days = {};
    data.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0];
        if (!days[date]) days[date] = [];
        days[date].push(item);
    });
    // Only show next 5 days
    const dayKeys = Object.keys(days).slice(0, 5);
    forecastDiv.innerHTML = '<h2>📅 5-Day Forecast</h2>';
    dayKeys.forEach(date => {
        // Get midday forecast for each day
        const midday = days[date][Math.floor(days[date].length/2)];
        forecastDiv.innerHTML += `
            <div class="forecast-day">
                ${weatherIcon(midday.weather[0].main)} <b>${date}</b>: ${midday.main.temp}${temperatureSymbol}, ${midday.weather[0].main}
            </div>
        `;
    });
}

function displayAlerts(current, forecast) {
    let alerts = [];
    // Rain in forecast
    if (forecast.list.some(item => item.weather.some(w => w.main.toLowerCase().includes('rain')))) {
        alerts.push('Carry umbrella 🌧');
    }
    // Heatwave
    if (forecast.list.some(item => item.main.temp > 35) || current.main.temp > 35) {
        alerts.push('Stay hydrated 🥵');
    }
    // High wind
    if (forecast.list.some(item => item.wind.speed > 13.8) || current.wind.speed > 13.8) { // 13.8 m/s ≈ 50 km/h
        alerts.push('High winds warning 🌪');
    }
    alertsDiv.innerHTML = alerts.length ? alerts.map(a => `<div class="alert">${a}</div>`).join('') : '<div style="text-align:center;color:var(--muted,#667085);font-size:0.9rem;">✅ No weather alerts right now</div>';
}

function showMap(lat, lon, city) {
    map = L.map('map').setView([lat, lon], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    marker = L.marker([lat, lon]).addTo(map).bindPopup(city).openPopup();
}

// Theme Functions
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    
    if (isDark) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeToggle) themeToggle.textContent = '☀️';
    } else {
        if (themeToggle) themeToggle.textContent = '🌙';
    }
}

// City Comparison Function
let comparisonCities = [];

function addToComparison(cityData) {
    if (comparisonCities.length < 3) {
        comparisonCities.push({
            name: cityData.name,
            country: cityData.sys.country,
            temp: cityData.main.temp,
            condition: cityData.weather[0].main,
            humidity: cityData.main.humidity,
            windSpeed: cityData.wind.speed
        });
        displayComparison();
    }
}

async function addCityToComparison(cityName) {
    if (comparisonCities.length >= 3) {
        alert('Maximum 3 cities can be compared');
        return;
    }
    
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=${units}`);
        const data = await response.json();
        
        if (data.cod === 200) {
            // Check if city already exists in comparison
            if (comparisonCities.some(city => city.name.toLowerCase() === data.name.toLowerCase())) {
                alert('City already in comparison');
                return;
            }
            
            addToComparison(data);
        } else {
            alert('City not found');
        }
    } catch (error) {
        alert('Error fetching city data');
    }
}

function displayComparison() {
    const comparisonGrid = document.getElementById('comparison-grid');
    if (!comparisonGrid) return;
    
    if (comparisonCities.length === 0) {
        comparisonGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #636e72;">Add cities to compare weather data</p>';
        return;
    }
    
    comparisonGrid.innerHTML = comparisonCities.map(city => `
        <div class="comparison-card">
            <h4>${city.name}, ${city.country}</h4>
            <p style="font-size: 1.5em; font-weight: bold; color: #0984e3;">${city.temp}${temperatureSymbol}</p>
            <p style="color: #636e72;">${city.condition}</p>
            <small>💧 ${city.humidity}% | 💨 ${city.windSpeed} km/h</small>
        </div>
    `).join('');
}

function clearComparison() {
    comparisonCities = [];
    displayComparison();
}

// Search dropdown functions
function showSearchSuggestions(query) {
    const filteredCities = popularCities.filter(city => 
        city.toLowerCase().includes(query.toLowerCase())
    );
    
    if (filteredCities.length === 0) {
        hideSearchDropdown();
        return;
    }
    
    searchDropdown.innerHTML = filteredCities.slice(0, 8).map(city => `
        <div class="dropdown-item" onclick="selectCity('${city}')">${city}</div>
    `).join('');
    
    searchDropdown.classList.remove('hidden');
}

function hideSearchDropdown() {
    searchDropdown.classList.add('hidden');
}

function selectCity(city) {
    cityInput.value = city;
    hideSearchDropdown();
    getWeatherDashboard(city);
}


