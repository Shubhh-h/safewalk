import express from 'express';
import crypto from 'crypto';
import { queryGet, queryAll, runSql } from '../services/database.js';

const router = express.Router();

router.post('/start', (req, res) => {
  const { lat, lng } = req.body;
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Initial Lat and Lng are required' });
  }

  try {
    const sessionId = crypto.randomBytes(8).toString('hex');
    
    runSql(`INSERT INTO sos_sessions (id, initial_lat, initial_lng) VALUES (?, ?, ?)`, [sessionId, lat, lng]);
    runSql(`INSERT INTO sos_locations (session_id, lat, lng) VALUES (?, ?, ?)`, [sessionId, lat, lng]);
    
    const shareUrl = `http://localhost:5173/sos/${sessionId}`;
    res.json({ success: true, sessionId, shareUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/update', (req, res) => {
  const { sessionId, lat, lng } = req.body;
  if (!sessionId || !lat || !lng) {
    return res.status(400).json({ error: 'SessionId, Lat, and Lng are required' });
  }

  try {
    const session = queryGet(`SELECT status FROM sos_sessions WHERE id = ?`, [sessionId]);
    if (!session || session.status !== 'active') {
      return res.status(400).json({ error: 'Session is not active or not found' });
    }

    runSql(`INSERT INTO sos_locations (session_id, lat, lng) VALUES (?, ?, ?)`, [sessionId, lat, lng]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/stop', (req, res) => {
  const { sessionId } = req.body;
  if (!sessionId) {
    return res.status(400).json({ error: 'SessionId is required' });
  }

  try {
    runSql(`UPDATE sos_sessions SET status = 'ended', ended_at = datetime('now') WHERE id = ?`, [sessionId]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const session = queryGet(`SELECT * FROM sos_sessions WHERE id = ?`, [req.params.id]);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const locations = queryAll(`SELECT lat, lng, timestamp FROM sos_locations WHERE session_id = ? ORDER BY timestamp ASC`, [req.params.id]);
    res.json({ session, locations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
