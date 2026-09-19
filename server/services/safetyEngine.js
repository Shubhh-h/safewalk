import { queryAll } from './database.js';

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function calculateSafetyScore(lat, lng, timeStr) {
  let baseScore = 100;
  const radius = 2.0; // 2km radius
  
  // Get crimes
  const crimes = queryAll(`SELECT * FROM crime_data`);
  let nearbyCrimes = 0;
  let severitySum = 0;
  
  crimes.forEach(crime => {
    const dist = getDistance(lat, lng, crime.lat, crime.lng);
    if (dist <= radius) {
      nearbyCrimes++;
      severitySum += crime.severity;
    }
  });

  if (nearbyCrimes > 0) {
    baseScore -= (nearbyCrimes * 2) + (severitySum * 1.5);
  }

  // Time factor (rough)
  if (timeStr) {
    const hour = new Date(timeStr).getHours();
    if (hour >= 20 || hour <= 5) {
      baseScore -= 15; // Penalty for night
    }
  }

  // Community reports
  const reports = queryAll(`SELECT * FROM community_reports WHERE expires_at > datetime('now')`);
  let nearbyReports = 0;
  reports.forEach(report => {
    const dist = getDistance(lat, lng, report.lat, report.lng);
    if (dist <= radius) {
      nearbyReports++;
    }
  });
  
  baseScore -= (nearbyReports * 3);

  return Math.max(0, Math.min(100, Math.round(baseScore)));
}

export function getHeatmapPoints() {
  const crimes = queryAll(`SELECT lat, lng, severity as weight FROM crime_data`);
  const reports = queryAll(`SELECT lat, lng, 3 as weight FROM community_reports WHERE expires_at > datetime('now')`);
  return [...crimes, ...reports];
}

export function getNearbyIncidents(lat, lng, radius = 2.0) {
  const allIncidents = [];
  
  const crimes = queryAll(`SELECT * FROM crime_data ORDER BY timestamp DESC LIMIT 100`);
  crimes.forEach(crime => {
    if (getDistance(lat, lng, crime.lat, crime.lng) <= radius) {
      allIncidents.push({...crime, category: 'crime'});
    }
  });

  const reports = queryAll(`SELECT * FROM community_reports WHERE expires_at > datetime('now') ORDER BY created_at DESC`);
  reports.forEach(report => {
    if (getDistance(lat, lng, report.lat, report.lng) <= radius) {
      allIncidents.push({...report, category: 'report'});
    }
  });

  return allIncidents;
}
