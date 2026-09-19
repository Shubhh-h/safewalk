import express from 'express';
import { queryAll, runSql } from '../services/database.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const reports = queryAll(`SELECT * FROM community_reports WHERE expires_at > datetime('now') ORDER BY created_at DESC`);
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', (req, res) => {
  const { lat, lng, type, description, reporter_name, duration_hours = 24 } = req.body;
  
  if (!lat || !lng || !type) {
    return res.status(400).json({ error: 'Lat, Lng, and Type are required' });
  }

  try {
    const info = runSql(
      `INSERT INTO community_reports (lat, lng, type, description, reporter_name, expires_at) VALUES (?, ?, ?, ?, ?, datetime('now', ?))`,
      [lat, lng, type, description, reporter_name || 'Anonymous', `+${duration_hours} hours`]
    );
    res.json({ success: true, id: info.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
