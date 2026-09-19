import express from 'express';
import { analyzeSafety } from '../services/geminiService.js';
import { getNearbyIncidents } from '../services/safetyEngine.js';

const router = express.Router();

router.post('/advisor', async (req, res) => {
  const { area, lat, lng, time } = req.body;
  
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Lat and Lng are required' });
  }

  try {
    // Get nearby context
    const recentIncidents = getNearbyIncidents(lat, lng, 3.0);
    
    // Pass to AI
    const aiResponse = await analyzeSafety(area, lat, lng, time, recentIncidents);
    
    res.json(aiResponse);
  } catch (error) {
    console.error('AI route error:', error);
    res.status(500).json({ error: 'Failed to process AI analysis' });
  }
});

export default router;
