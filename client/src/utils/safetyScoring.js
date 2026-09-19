import { calculateDistance } from './geolocation';

export const getNearbyIncidents = (lat, lng, crimeData, radiusKm = 2) => {
  return crimeData.filter(c => calculateDistance(lat, lng, c.lat, c.lng) <= radiusKm);
};

export const calculateSafetyScore = (lat, lng, crimeData, timeOfDay = new Date().getHours()) => {
  const nearby = getNearbyIncidents(lat, lng, crimeData, 2);
  const severitySum = nearby.reduce((acc, c) => acc + c.severity, 0);
  
  let baseScore = 100 - (severitySum * 0.5);
  if (timeOfDay < 6 || timeOfDay > 20) {
    baseScore -= 15;
  }
  return Math.max(0, Math.min(100, Math.round(baseScore)));
};

export const getScoreColor = (score) => {
  if (score < 26) return 'var(--danger-red)';
  if (score < 51) return 'var(--warning-amber)';
  if (score < 76) return 'yellowgreen';
  return 'var(--safety-green)';
};

export const getScoreLabel = (score) => {
  if (score < 26) return 'Dangerous';
  if (score < 51) return 'Caution';
  if (score < 76) return 'Safe';
  return 'Very Safe';
};
