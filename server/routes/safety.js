import express from 'express';
import { calculateSafetyScore, getHeatmapPoints, getNearbyIncidents } from '../services/safetyEngine.js';

const router = express.Router();

router.post('/score', (req, res) => {
  const { lat, lng, time } = req.body;
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Lat and Lng are required' });
  }

  try {
    const score = calculateSafetyScore(lat, lng, time);
    res.json({ score });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/heatmap', (req, res) => {
  try {
    const points = getHeatmapPoints();
    res.json(points);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/nearby', (req, res) => {
  const { lat, lng, radius } = req.body;
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Lat and Lng are required' });
  }

  try {
    const incidents = getNearbyIncidents(lat, lng, radius || 2.0);
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
