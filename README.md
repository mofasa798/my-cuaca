# My Cuaca 🌤️

Aplikasi cuaca sederhana berbasis web yang mengintegrasikan API cuaca eksternal dengan caching lokal (in-memory) dan antarmuka pengguna (UI) modern yang responsif. Proyek ini memisahkan tanggung jawab secara modular antara backend (Node.js + Express) dan frontend (Vanilla JS + TailwindCSS).

---

## Daftar Isi

1. [Tentang Aplikasi](#1-tentang-aplikasi)
2. [Tech Stack yang Digunakan](#2-tech-stack-yang-digunakan)
3. [Library yang Digunakan (Dependencies)](#3-library-yang-digunakan-dependencies)
4. [Arsitektur Folder & Penamaan File](#4-arsitektur-folder--penamaan-file)
5. [API yang Tersedia](#5-api-yang-tersedia)
6. [Cara Setup Project](#6-cara-setup-project)
7. [Cara Menjalankan Aplikasi](#7-cara-menjalankan-aplikasi)
8. [Cara Menguji Aplikasi (Testing)](#8-cara-menguji-aplikasi-testing)

---

## 1. Tentang Aplikasi

**My Cuaca** adalah aplikasi yang dibangun untuk memantau kondisi cuaca secara real-time dan melihat prakiraan cuaca beberapa hari ke depan. Aplikasi ini memiliki fitur:

- **Pencarian Real-Time**: Mencari data cuaca di berbagai kota di seluruh dunia.
- **Prakiraan Cuaca (Forecast)**: Menampilkan prakiraan cuaca 1 hingga 10 hari ke depan (suhu rata-rata/min/max, kondisi cuaca, dan kemungkinan hujan).
- **In-Memory Caching**: Dilengkapi dengan mekanisme caching sederhana berbasis TTL (Time-To-Live) pada backend untuk membatasi jumlah request langsung ke API eksternal, sehingga meningkatkan performa aplikasi dan menghemat kuota API.
- **Antarmuka Modern (Glassmorphism)**: Tampilan visual modern dengan efek kaca buram, layout responsif, latar belakang adaptif yang berubah warna mengikuti cuaca kota terpilih (panas, hujan, berawan, bersalju), serta dilengkapi transisi kartu yang interaktif.

---

## 2. Tech Stack yang Digunakan

Proyek ini mengadopsi tumpukan teknologi modern yang ringan namun tangguh:

- **Runtime Environment**: [Node.js](https://nodejs.org/) (dengan konfigurasi ES Modules asli agar mendukung sintaksis `import`/`export`).
- **Backend Framework**: [Express.js](https://expressjs.com/) (minimalist web framework untuk membangun RESTful API).
- **Frontend Core**: HTML5 dan Vanilla JavaScript (menggunakan modern Fetch API untuk AJAX).
- **Styling Framework**: [Tailwind CSS CLI](https://tailwindcss.com/) (menggunakan utility-first CSS framework untuk penyusunan style yang cepat dan dinamis).

---

## 3. Library yang Digunakan (Dependencies)

Seluruh pustaka pendukung dapat dilihat di berkas [package.json](file:///c:/Users/Purchasing_2/Desktop/my-projek/my-cuaca/package.json):

### Dependencies Utama (Runtime)

- **`express` (^4.18.4)**: Untuk mengelola server HTTP, routing API, middleware, serta menyajikan aset statis untuk frontend.
- **`dotenv` (^17.4.2)**: Untuk membaca variabel lingkungan dari file konfigurasi lokal `.env`.

### DevDependencies (Alat Pengembangan)

- **`nodemon` (^3.0.1)**: Alat bantu hot-reloading untuk memantau perubahan file backend dan otomatis melakukan restart server selama tahap pengembangan.
- **`tailwindcss` (^3.3.6)**: Pustaka inti Tailwind CSS untuk memproses styling utility-class.
- **`postcss` (^8.4.32) & `autoprefixer` (^10.4.16)**: Digunakan bersama Tailwind CSS untuk memproses CSS modern dan menambahkan kompatibilitas vendor-prefix secara otomatis pada browser.

---

## 4. Arsitektur Folder & Penamaan File

Aplikasi dirancang dengan pemisahan peran yang modular untuk memudahkan pengembangan ke depan. Berikut adalah peta struktur direktori proyek ini:

```text
my-cuaca/
├── .env                         # Konfigurasi variabel lingkungan lokal (diabaikan git)
├── .env.example                 # Template acuan variabel lingkungan
├── .gitignore                   # Daftar folder/file yang diabaikan oleh Git
├── package.json                 # Konfigurasi proyek NPM, skrip build, & dependensi
├── postcss.config.js            # Konfigurasi build PostCSS untuk Tailwind
├── tailwind.config.js           # Konfigurasi utility Tailwind CSS
├── public/                      # [Direktori Frontend / Aset Statis]
│   ├── index.html               # Halaman utama aplikasi (HTML5 markup)
│   ├── app.js                   # Logika frontend (DOM manipulation & API fetch)
│   ├── style.css                # Kustomisasi CSS manual
│   └── styles/
│       ├── input.css            # Sumber stylesheet masukan Tailwind CSS
│       └── output.css           # Hasil kompilasi akhir CSS ter-minify
└── src/                         # [Direktori Backend / Source Code]
    ├── index.js                 # Entry-point server utama
    ├── app.js                   # Konfigurasi aplikasi Express, middleware CORS, & routing statis
    ├── config/                  # Konfigurasi global aplikasi
    │   └── index.js             # Memuat file .env dan melakukan ekspor konfigurasi terpusat
    ├── middleware/              # Kumpulan middleware kustom
    │   └── errorHandler.js      # Middleware penanganan error global
    ├── routes/                  # Pengaturan modul rute endpoint
    │   └── weather.js           # Endpoint-endpoint yang melayani kueri cuaca
    ├── services/                # Logika bisnis & integrasi pihak ketiga
    │   └── weatherService.js    # Pengambilan data dari API cuaca eksternal dan pemetaan respons
    └── utils/                   # Fungsi utilitas pembantu
        ├── cache.js             # In-memory caching sederhana dengan TTL
        └── httpError.js         # Custom error class untuk mempermudah pelemparan status HTTP
```

### Penjelasan File dan Kode Penting (Link Pintasan):

- **Server Entry-Point**: Berkas [src/index.js](file:///c:/Users/Purchasing_2/Desktop/my-projek/my-cuaca/src/index.js) mengimpor instance aplikasi Express dan menjalankannya pada port yang telah dikonfigurasi.
- **Express App Setup**: Berkas [src/app.js](file:///c:/Users/Purchasing_2/Desktop/my-projek/my-cuaca/src/app.js) bertugas melakukan inisialisasi Express, menyetel middleware CORS, menyajikan folder `public` sebagai file statis, serta mendaftarkan rute utama.
- **Peta Rute**: Berkas [src/routes/weather.js](file:///c:/Users/Purchasing_2/Desktop/my-projek/my-cuaca/src/routes/weather.js) mendefinisikan rute masukan API seperti pencarian kota dan forecast.
- **Layanan API Cuaca**: Berkas [src/services/weatherService.js](file:///c:/Users/Purchasing_2/Desktop/my-projek/my-cuaca/src/services/weatherService.js) bertindak sebagai jembatan yang memanggil API pihak ketiga (`WeatherAPI.com`) dan memproses datanya sebelum dikembalikan ke klien.
- **Mekanisme Caching**: Berkas [src/utils/cache.js](file:///c:/Users/Purchasing_2/Desktop/my-projek/my-cuaca/src/utils/cache.js) menampung class helper untuk caching in-memory berbatas waktu demi mengurangi traffic API eksternal.
- **Konfigurasi Lingkungan**: Berkas [src/config/index.js](file:///c:/Users/Purchasing_2/Desktop/my-projek/my-cuaca/src/config/index.js) memvalidasi ketersediaan `WEATHER_API_KEY` dan membagikan nilai konfigurasi.
- **Frontend App**: Berkas [public/app.js](file:///c:/Users/Purchasing_2/Desktop/my-projek/my-cuaca/public/app.js) menangani kueri form, request fetch ke backend, serta pembaruan tampilan UI cuaca secara dinamis.

### Aturan Penamaan File (Naming Conventions):

1. **Lowercase Folders**: Nama direktori menggunakan huruf kecil secara keseluruhan (`config`, `middleware`, `routes`, `services`, `utils`) untuk konsistensi di berbagai sistem operasi.
2. **camelCase JavaScript Files**: File utilitas, rute, atau layanan menggunakan penulisan camelCase (misalnya `weatherService.js`, `errorHandler.js`, `httpError.js`).
3. **Extension Consistency**: Seluruh file JavaScript menggunakan ekstensi `.js` (ES Modules tidak mendukung penghilangan ekstensi secara implisit di lingkungan Node.js tanpa bundler).

---

## 5. API yang Tersedia

Berikut adalah dokumentasi API backend yang diekspos oleh aplikasi Express ini:

### 1. Health Check

Memeriksa apakah server backend berjalan dengan baik.

- **Endpoint**: `GET /health`
- **Metode**: `GET`
- **Format Respons (JSON)**:
  ```json
  {
    "status": "ok",
    "timestamp": "2026-06-19T04:32:00.000Z"
  }
  ```

### 2. Dapatkan Cuaca Saat Ini (Current Weather)

Mengambil informasi kondisi cuaca real-time di kota target.

- **Endpoint**: `GET /weather`
- **Metode**: `GET`
- **Parameter Kueri**:
  - `city` (Wajib): Nama kota yang ingin dicari (contoh: `Jakarta`).
- **Contoh Request**: `/weather?city=Jakarta`
- **Format Respons Sukses (200 OK)**:
  ```json
  {
    "city": "Jakarta",
    "country": "Indonesia",
    "temperature_c": 28.4,
    "condition": "Partly cloudy",
    "wind_kph": 11.2,
    "humidity": 75
  }
  ```

### 3. Dapatkan Prakiraan Cuaca (Weather Forecast)

Mengambil informasi perkiraan kondisi cuaca untuk beberapa hari mendatang.

- **Endpoint**: `GET /weather/forecast`
- **Metode**: `GET`
- **Parameter Kueri**:
  - `city` (Wajib): Nama kota yang ingin dicari.
  - `days` (Opsional): Jumlah hari prakiraan cuaca. Minimal `1`, maksimal `10`, default `3`.
- **Contoh Request**: `/weather/forecast?city=Bandung&days=3`
- **Format Respons Sukses (200 OK)**:
  ```json
  {
    "city": "Bandung",
    "country": "Indonesia",
    "forecast": [
      {
        "date": "2026-06-19",
        "max_temp_c": 31.2,
        "min_temp_c": 23.5,
        "avg_temp_c": 27.3,
        "condition": "Sunny",
        "chance_of_rain": 10
      },
      {
        "date": "2026-06-20",
        "max_temp_c": 29.8,
        "min_temp_c": 22.1,
        "avg_temp_c": 25.9,
        "condition": "Patchy rain possible",
        "chance_of_rain": 65
      }
    ]
  }
  ```

### 4. Respons Kesalahan (Error Responses)

Jika terjadi error (seperti parameter kurang, kota tidak ditemukan, atau API bermasalah), aplikasi akan mengembalikan format respons terpadu dengan status kode HTTP yang sesuai (misal: `400 Bad Request` atau `404 Not Found`):

- **Format Respons Error**:
  ```json
  {
    "error": "Query parameter city diperlukan"
  }
  ```

---

## 6. Cara Setup Project

Ikuti instruksi di bawah ini untuk memasang aplikasi di lokal komputer Anda:

1. **Pastikan Node.js Terpasang**: Aplikasi ini membutuhkan runtime [Node.js](https://nodejs.org/) (versi 18+ direkomendasikan) beserta `npm`.
2. **Kloning Proyek**: Posisikan terminal Anda pada root folder proyek:
   ```powershell
   cd [LOKASI-FOLDER]\my-cuaca
   ```
3. **Instalasi Dependensi**: Unduh semua library penunjang:
   ```bash
   npm install
   ```
4. **Setup Environment Variables**:
   - Salin file konfigurasi contoh [.env.example](file:///c:/Users/Purchasing_2/Desktop/my-projek/my-cuaca/.env.example) menjadi file `.env`:
     ```powershell
     copy .env.example .env
     ```
   - Registrasi di [WeatherAPI.com](https://www.weatherapi.com/) secara gratis untuk memperoleh API Key.
   - Buka berkas `.env` dan masukkan API Key Anda ke variabel `WEATHER_API_KEY`:
     ```env
     WEATHER_API_KEY=isi_dengan_api_key_anda_di_sini
     PORT=3002
     ```

---

## 7. Cara Menjalankan Aplikasi

Aplikasi memiliki dua bagian utama yang harus dijalankan: build sistem CSS dan server backend.

### A. Pengompilan CSS (Tailwind)

Karena frontend menggunakan Tailwind CSS, Anda harus mengompilasi file input CSS agar utility class diterjemahkan menjadi file output CSS yang siap dibaca web:

- **Mode Development (Auto-compile / Watch Mode)**:
  Jalankan perintah ini di tab terminal baru. CSS akan secara otomatis di-build ulang setiap kali Anda merubah kelas style di index.html atau app.js.
  ```bash
  npm run tailwind:watch
  ```
- **Mode Production (Minified CSS)**:
  Mengompilasi dan mengoptimasi CSS dengan kompresi ukuran berkas maksimal.
  ```bash
  npm run tailwind:build
  ```

### B. Menjalankan Server Backend Express

Setelah CSS ter-build, Anda dapat menyalakan server dengan salah satu cara berikut:

- **Mode Pengembangan (Development Mode)**:
  Menggunakan `nodemon` agar server otomatis restart secara langsung ketika Anda merubah file backend di dalam folder `src`.
  ```bash
  npm run dev
  ```
- **Mode Produksi (Production Mode)**:
  Menjalankan server secara statis menggunakan Node engine bawaan.
  ```bash
  npm run start
  ```

Setelah server menyala, buka browser Anda dan kunjungi halaman:
👉 **[http://localhost:3002](http://localhost:3002)**

---

## 8. Cara Menguji Aplikasi (Testing)

Saat ini pengujian aplikasi dilakukan dengan tiga pendekatan:

### A. Pengujian Manual Frontend (UI & Integrasi)

1. Buka peramban di alamat [http://localhost:3002](http://localhost:3002).
2. Lakukan skenario input pencarian:
   - Ketik nama kota (contoh: `Jakarta`) pada search bar lalu tekan **Enter** atau klik ikon cari.
   - Amati apakah kartu cuaca utama muncul dengan animasi transisi yang halus.
   - Periksa apakah perkiraan cuaca 3 hari ke depan ditampilkan di bawahnya.
   - Periksa apakah background gradasi di belakang kartu berubah warna secara dinamis mengikuti kondisi cuaca kota tersebut (misalnya oranye hangat untuk cerah, biru kelabu untuk hujan, dsb.).
3. Uji penanganan error:
   - Coba kosongkan pencarian dan klik cari, amati feedback UI.
   - Ketik nama kota acak yang tidak valid (misal: `xyz123abc`), amati apakah muncul pesan error di antarmuka web.

### B. Pengujian Manual API Backend

Anda dapat mengirimkan request HTTP langsung menggunakan utilitas baris perintah (`cURL`) atau software pengujian API seperti Postman / Insomnia:

- **Menguji Status Server**:
  ```bash
  curl http://localhost:3002/health
  ```
- **Menguji Informasi Cuaca Terkini**:
  ```bash
  curl "http://localhost:3002/weather?city=Jakarta"
  ```
- **Menguji Informasi Prakiraan Cuaca 5 Hari**:
  ```bash
  curl "http://localhost:3002/weather/forecast?city=Bandung&days=5"
  ```

### C. Rencana Setup Pengujian Otomatis (Automated Testing)

Bila ingin menerapkan testing otomatis di masa mendatang, skema berikut direkomendasikan untuk ditambahkan ke berkas [package.json](file:///c:/Users/Purchasing_2/Desktop/my-projek/my-cuaca/package.json):

1. **Unit & Integration Testing (API)**:
   - Gunakan **Jest** sebagai test runner dan **Supertest** untuk melakukan mock request HTTP ke rute Express.
   - Cara instalasi:
     ```bash
     npm install --save-dev jest supertest
     ```
   - Contoh skrip test di `package.json`:
     ```json
     "scripts": {
       "test": "jest"
     }
     ```
   - Buat berkas tes, contohnya `src/tests/weather.test.js` untuk menguji endpoint `/weather` dengan mock respons.

2. **End-to-End Testing (E2E UI)**:
   - Gunakan **Playwright** atau **Cypress** untuk memverifikasi alur lengkap di sisi pengguna (mulai dari mengetik nama kota di halaman browser hingga data ter-render di DOM secara dinamis).
