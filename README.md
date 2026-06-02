# My Cuaca

Aplikasi cuaca sederhana dengan backend Node.js/Express dan frontend Vanilla JS + TailwindCSS.

## Fitur
- Endpoint `GET /weather` untuk data cuaca saat ini
- Endpoint `GET /weather/forecast` untuk prakiraan beberapa hari
- Caching sederhana dengan TTL untuk mengurangi panggilan API
- Health check endpoint `/health`
- Frontend responsive dengan UI glassmorphism
- Adaptive background berdasarkan kondisi cuaca
- Animasi transisi untuk tampilan weather card dan forecast cards
- Static file server untuk frontend di `/public`

## Struktur
- `src/index.js`: entry point server
- `src/app.js`: konfigurasi Express, middleware, dan static file server
- `src/routes/weather.js`: route cuaca
- `src/services/weatherService.js`: pemanggilan API cuaca dan transformasi respons
- `src/middleware/errorHandler.js`: penanganan error global
- `src/utils/httpError.js`: custom error helper
- `src/config/index.js`: konfigurasi environment
- `public/index.html`: halaman frontend utama
- `public/app.js`: logika frontend dan fetch API
- `public/styles/input.css`: sumber Tailwind CSS
- `public/styles/output.css`: CSS terkompilasi

## Persiapan
1. `npm install`
2. Buat file `.env`
3. Isi `WEATHER_API_KEY` di `.env`

## Menjalankan aplikasi
1. Jalankan build Tailwind:
   - `npm run tailwind:build`
2. Jalankan backend:
   - `npm run dev`
3. Buka aplikasi di browser:
   - `http://localhost:3002`

## Catatan
- Frontend dapat diakses langsung melalui server Express karena folder `public` disajikan sebagai static assets.
- Untuk pengembangan, `npm run tailwind:watch` dapat digunakan agar CSS otomatis terkompilasi ketika `public/styles/input.css` berubah.

## Roadmap
1. Tambahkan fitur `recent searches` dengan `localStorage` untuk memudahkan pengguna mengulang pencarian.
2. Perkaya tampilan cuaca dengan ikon SVG atau animated illustrations berdasarkan kondisi.
3. Tambahkan validasi input dan feedback UI yang lebih kaya untuk kesalahan API dan jaringan.
4. Buat halaman konfigurasi atau settings untuk memilih satuan suhu (Celsius/Fahrenheit).
5. Siapkan deployment ke platform seperti Vercel, Render, atau Railway untuk demo publik.

## Rekomendasi Pengembangan Selanjutnya
- Tambahkan fasilitas `autocomplete` atau `suggestion` lokasi saat mengetik nama kota.
- Buat caching client-side agar hasil pencarian yang sama dapat tampil lebih cepat tanpa fetch ulang.
- Tambahkan dukungan multi-bahasa agar aplikasi bisa lebih ramah untuk pengguna internasional.
- Terapkan testing dengan Jest atau Playwright untuk API dan alur frontend utama.
- Optimalkan aksesibilitas dengan label input yang jelas, fokus keyboard, dan kontras warna yang memadai.

## Contoh respons API
```json
{
  "city": "Jakarta",
  "country": "Indonesia",
  "temperature_c": 28.4,
  "condition": "Partly cloudy"
}
```
