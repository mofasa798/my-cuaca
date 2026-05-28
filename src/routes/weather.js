import express from 'express';
import { getWeatherByCity, getWeatherForecast } from '../services/weatherService.js';
import HttpError from '../utils/httpError.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const city = req.query.city;

    if (!city) {
      throw new HttpError(400, 'Query parameter city diperlukan');
    }

    const weather = await getWeatherByCity(city);
    res.json(weather);
  } catch (error) {
    next(error);
  }
});

router.get('/forecast', async (req, res, next) => {
  try {
    const city = req.query.city;
    const days = Number(req.query.days) || 3;

    if (!city) {
      throw new HttpError(400, 'Query parameter city diperlukan');
    }

    if (days < 1 || days > 10) {
      throw new HttpError(400, 'Parameter days harus antara 1-10');
    }

    const forecast = await getWeatherForecast(city, days);
    res.json(forecast);
  } catch (error) {
    next(error);
  }
});

export default router;

