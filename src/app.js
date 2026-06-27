import express from 'express';
import weatherRouter from './routes/weather.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(express.json());

// CORS middleware - izinkan request dari frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// Serve static files dari folder public
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "My Cuaca API berjalan 🚀",
    endpoints: [
      "/api/weather",
      "/api/forecast"
    ]
  });
});

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/weather', weatherRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint tidak ditemukan' });
});

app.use(errorHandler);

export default app;

