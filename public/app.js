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

const API_BASE_URL = 'https://my-cuaca-nine.vercel.app/';

// DOM Elements
const body = document.body;
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherResult = document.getElementById('weatherResult');
const conditionIcon = document.getElementById('conditionIcon');
const weatherSummary = document.getElementById('weatherSummary');
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

  conditionIcon.textContent = getConditionEmoji(data.condition);
  weatherSummary.textContent = `${data.condition} · Suhu ${data.temperature_c}°C`;
  setAdaptiveBackground(data.condition);
  weatherResult.style.display = 'block';
  weatherResult.classList.add('show');
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
    .map((day, index) => `
    <div class="forecast-card" style="animation-delay: ${index * 100}ms;">
      <div class="flex items-center justify-between mb-3">
        <div class="text-sm text-white/70">${formatDate(day.date)}</div>
        <div class="text-2xl">${getConditionEmoji(day.condition)}</div>
      </div>
      <div class="font-semibold text-white mb-2">${day.condition}</div>
      <div class="text-sm text-white/80">Min ${day.min_temp_c}° / Max ${day.max_temp_c}°</div>
      <div class="mt-3 text-sm text-cyan-100">Hujan ${day.chance_of_rain}%</div>
    </div>
  `)
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
  weatherResult.classList.remove('show');
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

function setAdaptiveBackground(condition) {
  const normalized = condition?.toLowerCase() || '';
  const gradients = {
    clear: 'linear-gradient(135deg, #0f172a 0%, #2563eb 100%)',
    sunny: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
    partly: 'linear-gradient(135deg, #0f172a 0%, #4338ca 100%)',
    cloudy: 'linear-gradient(135deg, #334155 0%, #64748b 100%)',
    overcast: 'linear-gradient(135deg, #0f172a 0%, #475569 100%)',
    rain: 'linear-gradient(135deg, #0f172a 0%, #2563eb 100%)',
    drizzle: 'linear-gradient(135deg, #1f2937 0%, #475569 100%)',
    thunder: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
    snow: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
    mist: 'linear-gradient(135deg, #475569 0%, #64748b 100%)',
    fog: 'linear-gradient(135deg, #334155 0%, #64748b 100%)',
  };

  const key = Object.keys(gradients).find((term) => normalized.includes(term));
  body.style.background = gradients[key] || 'linear-gradient(135deg, #1e293b 0%, #334155 100%)';
}

function getConditionEmoji(condition) {
  const normalized = (condition || '').toLowerCase();

  if (normalized.includes('sunny') || normalized.includes('clear')) return '☀️';
  if (normalized.includes('partly')) return '⛅';
  if (normalized.includes('cloud')) return '☁️';
  if (normalized.includes('overcast')) return '🌥️';
  if (normalized.includes('rain') || normalized.includes('shower')) return '🌧️';
  if (normalized.includes('drizzle')) return '🌦️';
  if (normalized.includes('thunder') || normalized.includes('storm')) return '⛈️';
  if (normalized.includes('snow') || normalized.includes('sleet')) return '❄️';
  if (normalized.includes('mist') || normalized.includes('fog') || normalized.includes('haze')) return '🌫️';
  return '🌤️';
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
