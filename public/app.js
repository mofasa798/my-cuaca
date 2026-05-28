/**
 * Frontend app.js
 * 
 * Penjelasan:
 * 1. DOM manipulation - ambil element HTML
 * 2. Event listeners - tangkap user input (klik tombol, enter)
 * 3. Fetch API - komunikasi dengan backend
 * 4. Error handling - tangkap error dari API
 * 5. Render - tampilkan hasil ke UI
 */

const API_BASE_URL = 'http://localhost:3002';

// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherResult = document.getElementById('weatherResult');
const forecastSection = document.getElementById('forecastSection');
const errorDiv = document.getElementById('error');
const loadingDiv = document.getElementById('loading');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleSearch();
  }
});

/**
 * Handle search - fungsi utama yang trigger API call
 */
async function handleSearch() {
  const city = cityInput.value.trim();

  if (!city) {
    showError('Masukkan nama kota!');
    return;
  }

  clearUI();
  showLoading(true);

  try {
    // Fetch current weather
    const weatherData = await fetchWeather(city);
    displayWeather(weatherData);

    // Fetch forecast
    const forecastData = await fetchForecast(city, 3);
    displayForecast(forecastData);

    showError(''); // Clear error jika berhasil
  } catch (error) {
    showError(error.message);
  } finally {
    showLoading(false);
  }
}

/**
 * Fetch weather dari backend
 * 
 * Penjelasan:
 * - fetch() adalah browser API untuk HTTP requests
 * - async/await membuat code lebih readable
 * - throw error jika response tidak ok
 */
async function fetchWeather(city) {
  const url = `${API_BASE_URL}/weather?city=${encodeURIComponent(city)}`;

  const response = await fetch(url);

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Gagal mengambil data cuaca');
  }

  return await response.json();
}

/**
 * Fetch forecast dari backend
 */
async function fetchForecast(city, days) {
  const url = `${API_BASE_URL}/weather/forecast?city=${encodeURIComponent(city)}&days=${days}`;

  const response = await fetch(url);

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Gagal mengambil data prakiraan');
  }

  return await response.json();
}

/**
 * Display weather result di UI
 */
function displayWeather(data) {
  document.getElementById('cityName').textContent = `${data.city}, ${data.country}`;
  document.getElementById('temperature').textContent = `${data.temperature_c}°C`;
  document.getElementById('condition').textContent = data.condition;
  document.getElementById('humidity').textContent = `${data.humidity}%`;
  document.getElementById('wind').textContent = `${data.wind_kph} km/h`;

  weatherResult.style.display = 'block';
}

/**
 * Display forecast result di UI
 * 
 * Penjelasan:
 * - map() iterasi setiap hari forecast
 * - Buat HTML element dinamis untuk setiap hari dengan Tailwind classes
 * - Append ke container
 */
function displayForecast(data) {
  const forecastHTML = data.forecast
    .map(
      (day) => `
    <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div class="font-semibold text-indigo-600 mb-2">${formatDate(day.date)}</div>
      <div class="text-sm text-gray-700 mb-2">${day.min_temp_c}° - ${day.max_temp_c}°C</div>
      <div class="text-sm text-gray-600 mb-2">${day.condition}</div>
      <div class="text-sm text-orange-500">🌧️ ${day.chance_of_rain}%</div>
    </div>
  `
    )
    .join('');

  document.getElementById('forecastResult').innerHTML = forecastHTML;
  forecastSection.style.display = 'block';
}

/**
 * Helper functions
 */

function showError(message) {
  if (message) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
  } else {
    errorDiv.style.display = 'none';
  }
}

function showLoading(show) {
  loadingDiv.style.display = show ? 'block' : 'none';
}

function clearUI() {
  weatherResult.style.display = 'none';
  forecastSection.style.display = 'none';
  errorDiv.style.display = 'none';
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

// Optional: Check backend health on page load
async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (response.ok) {
      console.log('Backend is healthy ✅');
    }
  } catch (error) {
    console.warn('Backend might be down:', error);
  }
}

// Run health check when page loads
checkBackendHealth();
