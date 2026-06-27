import express from 'express';
import weatherRouter from './routes/weather.js';
import errorHandler from './middleware/errorHandler.js';
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());

app.use(
    express.static(
        path.join(__dirname, "../public")
    )
);

app.get("/",(req,res)=>{
    res.sendFile(
        path.join(__dirname,"../public/index.html")
    );
});

app.use("/api",routes);

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


// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

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

app.use('/weather', weatherRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint tidak ditemukan' });
});

app.use(errorHandler);

export default app;

