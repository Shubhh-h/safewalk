import express from 'express';
import { queryAll, runSql } from '../services/database.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const contacts = queryAll(`SELECT * FROM emergency_contacts ORDER BY created_at DESC`);
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', (req, res) => {
  const { name, phone, relationship } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  try {
    const info = runSql(
      `INSERT INTO emergency_contacts (name, phone, relationship) VALUES (?, ?, ?)`,
      [name, phone, relationship]
    );
    res.json({ success: true, id: info.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    runSql(`DELETE FROM emergency_contacts WHERE id = ?`, [parseInt(req.params.id)]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
