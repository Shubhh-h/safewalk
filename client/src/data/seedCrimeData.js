// Delhi bounding box approx: lat 28.4 to 28.8, lng 76.9 to 77.4
const types = ['theft', 'assault', 'harassment', 'robbery', 'vandalism', 'suspicious_activity'];

function generateRandomPoint(latMin, latMax, lngMin, lngMax) {
  return {
    lat: latMin + Math.random() * (latMax - latMin),
    lng: lngMin + Math.random() * (lngMax - lngMin),
  };
}

const generateCrimes = () => {
  const data = [];
  // Old Delhi / Paharganj (Higher crime)
  for (let i=0; i<80; i++) {
    const pt = generateRandomPoint(28.64, 28.66, 77.20, 77.23);
    data.push({ ...pt, type: types[Math.floor(Math.random()*types.length)], severity: Math.floor(Math.random()*3)+3, timestamp: Date.now() - Math.random()*10000000000 });
  }
  // Connaught Place (Medium)
  for (let i=0; i<50; i++) {
    const pt = generateRandomPoint(28.62, 28.64, 77.20, 77.22);
    data.push({ ...pt, type: types[Math.floor(Math.random()*types.length)], severity: Math.floor(Math.random()*3)+2, timestamp: Date.now() - Math.random()*10000000000 });
  }
  // South Delhi (Lower crime)
  for (let i=0; i<30; i++) {
    const pt = generateRandomPoint(28.53, 28.57, 77.22, 77.26);
    data.push({ ...pt, type: types[Math.floor(Math.random()*types.length)], severity: Math.floor(Math.random()*2)+1, timestamp: Date.now() - Math.random()*10000000000 });
  }
  // Random spread
  for (let i=0; i<40; i++) {
    const pt = generateRandomPoint(28.4, 28.8, 76.9, 77.4);
    data.push({ ...pt, type: types[Math.floor(Math.random()*types.length)], severity: Math.floor(Math.random()*5)+1, timestamp: Date.now() - Math.random()*10000000000 });
  }
  return data;
};

export const crimeData = generateCrimes();

export const landmarks = [
  { lat: 28.6139, lng: 77.2090, type: 'police', name: 'Parliament Street Police Station' },
  { lat: 28.5678, lng: 77.2100, type: 'hospital', name: 'AIIMS' },
];
