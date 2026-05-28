# My Cuaca

Aplikasi backend cuaca sederhana menggunakan Node.js dan Express.

## Struktur
- `src/index.js`: entry point server
- `src/app.js`: konfigurasi Express dan route
- `src/routes/weather.js`: route cuaca
- `src/services/weatherService.js`: pemanggilan API cuaca
- `src/middleware/errorHandler.js`: penanganan error global
- `src/utils/httpError.js`: custom error helper
- `src/config/index.js`: konfigurasi environment

## Menjalankan
1. `npm install`
2. Buat file `.env`
3. Isi `WEATHER_API_KEY` di `.env`
4. `npm run dev`
5. Buka `http://localhost:3000/weather?city=Jakarta`

## Contoh respons
```
{
  "city": "Jakarta",
  "country": "Indonesia",
  "temperature_c": 28.4,
  "condition": "Partly cloudy"
}
```
