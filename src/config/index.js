import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

const port = Number(process.env.PORT ?? 3000);
const weatherApiKey = process.env.WEATHER_API_KEY;

if (!weatherApiKey) {
  throw new Error('Environment variable WEATHER_API_KEY tidak ditemukan. Pastikan file .env sudah dibuat.');
}

export default {
  port,
  weatherApiKey,
};
