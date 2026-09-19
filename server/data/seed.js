import { queryGet, runSql } from '../services/database.js';

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

export function runSeed() {
  const count = queryGet('SELECT count(*) as c FROM crime_data');
  if (count && count.c > 0) {
    console.log('Database already seeded.');
    return;
  }

  console.log('Seeding database for Delhi...');
  
  const crimeTypes = ['Theft', 'Assault', 'Harassment', 'Robbery', 'Vandalism', 'Suspicious Activity'];
  
  // High crime hotspots (clustered data for realistic heatmap)
  const hotspots = [
    // Old Delhi / Chandni Chowk area - high crime
    { lat: 28.6562, lng: 77.2310, count: 25, severityMin: 2, severityMax: 5 },
    // Paharganj area
    { lat: 28.6431, lng: 77.2113, count: 20, severityMin: 2, severityMax: 5 },
    // Karol Bagh
    { lat: 28.6519, lng: 77.1907, count: 15, severityMin: 1, severityMax: 4 },
    // Sadar Bazaar
    { lat: 28.6595, lng: 77.2028, count: 18, severityMin: 2, severityMax: 5 },
    // Parts of Dwarka
    { lat: 28.5921, lng: 77.0460, count: 12, severityMin: 1, severityMax: 4 },
    // Shahdara
    { lat: 28.6814, lng: 77.2945, count: 15, severityMin: 2, severityMax: 4 },
    // Mundka
    { lat: 28.6847, lng: 77.0311, count: 10, severityMin: 2, severityMax: 5 },
    // Seemapuri
    { lat: 28.6876, lng: 77.3344, count: 12, severityMin: 2, severityMax: 4 },
  ];

  // Medium crime areas
  const mediumSpots = [
    // Connaught Place (late night)
    { lat: 28.6315, lng: 77.2167, count: 10, severityMin: 1, severityMax: 3 },
    // Lajpat Nagar
    { lat: 28.5677, lng: 77.2433, count: 8, severityMin: 1, severityMax: 3 },
    // Nehru Place
    { lat: 28.5491, lng: 77.2533, count: 8, severityMin: 1, severityMax: 3 },
    // Rohini
    { lat: 28.7325, lng: 77.1166, count: 8, severityMin: 1, severityMax: 3 },
    // Janakpuri
    { lat: 28.6219, lng: 77.0878, count: 6, severityMin: 1, severityMax: 3 },
  ];

  // Low crime areas (scattered)
  const lowSpots = [
    // South Delhi - Defence Colony
    { lat: 28.5733, lng: 77.2311, count: 3, severityMin: 1, severityMax: 2 },
    // Greater Kailash
    { lat: 28.5494, lng: 77.2344, count: 3, severityMin: 1, severityMax: 2 },
    // Lutyens Delhi
    { lat: 28.6129, lng: 77.2107, count: 2, severityMin: 1, severityMax: 2 },
    // Vasant Kunj
    { lat: 28.5222, lng: 77.1590, count: 4, severityMin: 1, severityMax: 2 },
  ];

  const allSpots = [...hotspots, ...mediumSpots, ...lowSpots];
  
  allSpots.forEach(spot => {
    for (let i = 0; i < spot.count; i++) {
      const lat = spot.lat + randomRange(-0.015, 0.015);
      const lng = spot.lng + randomRange(-0.015, 0.015);
      const type = crimeTypes[Math.floor(Math.random() * crimeTypes.length)];
      const severity = Math.floor(randomRange(spot.severityMin, spot.severityMax + 1));
      const desc = `Reported incident of ${type.toLowerCase()} in the area.`;
      const daysAgo = Math.floor(Math.random() * 30);
      const timestamp = new Date(Date.now() - daysAgo * 86400000).toISOString();
      
      runSql(
        `INSERT INTO crime_data (lat, lng, type, severity, description, timestamp) VALUES (?, ?, ?, ?, ?, ?)`,
        [lat, lng, type, severity, desc, timestamp]
      );
    }
  });

  // Add community reports
  const communityReports = [
    { lat: 28.6139, lng: 77.2090, type: 'Poor Lighting', desc: 'Street lights not working near Jantar Mantar.', name: 'Anonymous' },
    { lat: 28.6562, lng: 77.2310, type: 'Suspicious Activity', desc: 'Group loitering near Chandni Chowk metro exit late night.', name: 'Local Resident' },
    { lat: 28.5733, lng: 77.2311, type: 'Safe Area', desc: 'Well-lit market area with regular police patrol.', name: 'Shop Owner' },
    { lat: 28.6315, lng: 77.2167, type: 'Poor Lighting', desc: 'Poorly lit alleyway behind CP inner circle.', name: 'Night Worker' },
    { lat: 28.6431, lng: 77.2113, type: 'Harassment', desc: 'Catcalling reported near Paharganj main road after 10pm.', name: 'Anonymous' },
    { lat: 28.5494, lng: 77.2344, type: 'Safe Area', desc: 'GK-1 M Block market is well-lit and safe at night.', name: 'Regular Visitor' },
    { lat: 28.5921, lng: 77.0460, type: 'Suspicious Activity', desc: 'Unauthorized parking in residential colony, suspicious vehicles.', name: 'Resident' },
    { lat: 28.6876, lng: 77.3344, type: 'Accident', desc: 'Pothole near Seemapuri crossing causing accidents.', name: 'Commuter' },
  ];

  communityReports.forEach(r => {
    runSql(
      `INSERT INTO community_reports (lat, lng, type, description, reporter_name, expires_at) VALUES (?, ?, ?, ?, ?, datetime('now', '+72 hours'))`,
      [r.lat, r.lng, r.type, r.desc, r.name]
    );
  });

  console.log('Seed completed — inserted crime data and community reports for Delhi.');
}
