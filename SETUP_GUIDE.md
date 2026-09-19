# SafeWalk - Setup Guide

## 🔑 API Key Configuration

### Getting Your Google Gemini API Key

1. **Go to Google AI Studio**: https://makersuite.google.com/app/apikey
2. **Sign in** with your Google account
3. **Click "Create API Key"**
4. **Copy** the generated API key

### Setting Up the API Key

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Open the `.env` file (or create one if it doesn't exist):
   ```bash
   # On Windows
   notepad .env
   
   # On Mac/Linux
   nano .env
   ```

3. Add your API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   PORT=3001
   ```

4. Save the file and restart the server

### Important Notes
- **Never commit** your `.env` file to Git
- The `.env.example` file shows the format but doesn't contain real keys
- If the API key is not set, the app will use fallback data

## 🚀 Running SafeWalk

### Start the Backend Server
```bash
cd server
npm install
npm run dev
```
Server will run on: http://localhost:3001

### Start the Frontend
```bash
cd client
npm install
npm run dev
```
Client will run on: http://localhost:5173

## 📱 Mobile Testing

### Testing on Your Phone
1. Find your computer's local IP address:
   - **Windows**: Open CMD and run `ipconfig`
   - **Mac/Linux**: Open Terminal and run `ifconfig`

2. Update CORS in `server/index.js` to include your IP:
   ```javascript
   app.use(cors({ 
     origin: [
       'http://localhost:5173', 
       'http://127.0.0.1:5173',
       'http://YOUR_IP:5173'  // Add this line
     ] 
   }));
   ```

3. On your phone's browser, visit: `http://YOUR_IP:5173`

### PWA Installation
- **iOS**: Open in Safari → Share → Add to Home Screen
- **Android**: Chrome will show "Install App" prompt

## 🌍 Crime Data API Endpoints

The app now has access to national crime data through these endpoints:

### National Data
```
GET /api/crime-data/national
```
Returns nationwide crime statistics

### State Data
```
GET /api/crime-data/state/:stateName
```
Example: `/api/crime-data/state/Delhi`

### City Data
```
GET /api/crime-data/city/:cityName?state=StateName
```
Example: `/api/crime-data/city/Mumbai?state=Maharashtra`

### Live Alerts
```
GET /api/crime-data/alerts/live?limit=50
```
Returns recent crime alerts across the country

### Area-based Search
```
POST /api/crime-data/area
Body: { "lat": 28.6139, "lng": 77.2090, "radius": 5 }
```
Returns crime data within radius (km)

### Search Incidents
```
GET /api/crime-data/search?type=Theft&state=Delhi&limit=100
```
Search with filters

## 🎨 Features Added

### ✅ Mobile Responsiveness
- Adaptive layouts for all screen sizes
- Touch-friendly controls
- Bottom sheet navigation on mobile
- Proper viewport handling for notched devices

### ✅ PWA Support
- Installable on mobile devices
- Offline functionality
- Service worker caching
- Push notification support (ready for implementation)

### ✅ National Crime Dashboard
- Real-time crime statistics for entire country
- State-wise breakdown
- Live crime alerts
- AI-powered insights

### ✅ Enhanced Features
- Multiple map layers (Dark, Satellite, Terrain, OSM)
- Safety scoring for routes
- Community reporting
- Emergency SOS system
- AI safety advisor

## 🔒 Security Notes

- Keep your `.env` file secure
- Never expose API keys in client-side code
- Use HTTPS in production
- Implement rate limiting for APIs

## 🐛 Troubleshooting

### "Failed to load crime data"
- Check if backend server is running on port 3001
- Verify GEMINI_API_KEY is set in `.env`
- Check console for detailed error messages

### Mobile layout issues
- Clear browser cache
- Check if responsive.css is loaded
- Verify viewport meta tag in index.html

### Service Worker not registering
- Check browser console for SW errors
- Ensure HTTPS in production (SW requires secure context)
- Try clearing site data and reloading

## 📞 Support

For issues or questions:
1. Check the browser console for errors
2. Verify all dependencies are installed
3. Ensure both frontend and backend are running
4. Check that ports 3001 and 5173 are not in use

## 🎯 Next Steps to Enhance

Consider adding:
- User authentication system
- Real-time location tracking with geofencing
- Push notifications for nearby crime alerts
- Share live location with trusted contacts
- Dark/Light theme toggle
- Multi-language support
- Integration with local police APIs
- Historical crime trend analysis
- Community safety ratings and reviews
