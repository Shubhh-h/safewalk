import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './services/database.js';
import safetyRoutes from './routes/safety.js';
import reportRoutes from './routes/reports.js';
import contactRoutes from './routes/contacts.js';
import sosRoutes from './routes/sos.js';
import aiRoutes from './routes/ai.js';
import crimeDataRoutes from './routes/crimeData.js';
import { runSeed } from './data/seed.js';
import { initCrimeDataAI } from './services/crimeDataService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] }));
app.use(express.json());

// Start server after async DB init
async function start() {
  // Initialize Database (async because sql.js loads WASM)
  console.log('Initializing database...');
  await initializeDatabase();

  // Initialize Crime Data AI
  console.log('Initializing Crime Data AI...');
  initCrimeDataAI();

  // Seed data if needed
  runSeed();

  // Routes
  app.use('/api/safety', safetyRoutes);
  app.use('/api/reports', reportRoutes);
  app.use('/api/contacts', contactRoutes);
  app.use('/api/sos', sosRoutes);
  app.use('/api/ai', aiRoutes);
  app.use('/api/crime-data', crimeDataRoutes);

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  app.listen(PORT, () => {
    console.log(`\n🚶‍♀️ SafeWalk backend server running on http://localhost:${PORT}`);
    console.log(`   Health check: http://localhost:${PORT}/api/health\n`);
  });
}

start().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
