import express from 'express';
import { fetchNationalCrimeData, fetchStateCrimeData, fetchCityCrimeData } from '../services/crimeDataService.js';

const router = express.Router();

// Get national crime statistics
router.get('/national', async (req, res) => {
  try {
    const crimeData = await fetchNationalCrimeData();
    res.json(crimeData);
  } catch (error) {
    console.error('National crime data error:', error);
    res.status(500).json({ error: 'Failed to fetch national crime data' });
  }
});

// Get state-wise crime data
router.get('/state/:stateName', async (req, res) => {
  const { stateName } = req.params;
  try {
    const crimeData = await fetchStateCrimeData(stateName);
    res.json(crimeData);
  } catch (error) {
    console.error('State crime data error:', error);
    res.status(500).json({ error: 'Failed to fetch state crime data' });
  }
});

// Get city-wise crime data
router.get('/city/:cityName', async (req, res) => {
  const { cityName } = req.params;
  const { state } = req.query;
  try {
    const crimeData = await fetchCityCrimeData(cityName, state);
    res.json(crimeData);
  } catch (error) {
    console.error('City crime data error:', error);
    res.status(500).json({ error: 'Failed to fetch city crime data' });
  }
});

// Get crime data by coordinates with radius
router.post('/area', async (req, res) => {
  const { lat, lng, radius } = req.body;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    const { getAreaCrimeData } = await import('../services/crimeDataService.js');
    const crimeData = await getAreaCrimeData(lat, lng, radius || 5);
    res.json(crimeData);
  } catch (error) {
    console.error('Area crime data error:', error);
    res.status(500).json({ error: 'Failed to fetch area crime data' });
  }
});

// Get live crime alerts
router.get('/alerts/live', async (req, res) => {
  const { limit = 50 } = req.query;
  try {
    const { getLiveCrimeAlerts } = await import('../services/crimeDataService.js');
    const alerts = await getLiveCrimeAlerts(parseInt(limit));
    res.json(alerts);
  } catch (error) {
    console.error('Live alerts error:', error);
    res.status(500).json({ error: 'Failed to fetch live crime alerts' });
  }
});

// Search crime incidents by type
router.get('/search', async (req, res) => {
  const { type, state, city, startDate, endDate, limit = 100 } = req.query;

  try {
    const { searchCrimeIncidents } = await import('../services/crimeDataService.js');
    const results = await searchCrimeIncidents({
      type,
      state,
      city,
      startDate,
      endDate,
      limit: parseInt(limit)
    });
    res.json(results);
  } catch (error) {
    console.error('Crime search error:', error);
    res.status(500).json({ error: 'Failed to search crime incidents' });
  }
});

export default router;
