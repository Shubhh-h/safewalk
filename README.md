# 🚶‍♀️ SafeWalk - AI-Powered Safety Navigation

SafeWalk is an intelligent personal safety navigation web application that helps users find the safest routes and stay informed about crime data in their area. Built with React, Node.js, and Google's Gemini AI, SafeWalk provides real-time safety insights and emergency features.

![SafeWalk Banner](https://img.shields.io/badge/SafeWalk-AI%20Safety%20Navigation-6C5CE7?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)
![PWA](https://img.shields.io/badge/PWA-Enabled-5A0FC8?style=flat-square)

## ✨ Features

### 🗺️ **Smart Navigation**
- **Safety-First Routing**: Get the safest route to your destination using AI-powered safety scoring
- **Multiple Transport Modes**: Walking, biking, and driving routes
- **Interactive Heat Map**: Visualize crime density in real-time
- **Multiple Map Layers**: Dark mode, Satellite, Terrain, and Transit views

### 🚨 **Crime Data & Insights**
- **National Crime Dashboard**: View crime statistics for entire country
- **State & City Breakdown**: Detailed crime data by location
- **Live Crime Alerts**: Real-time notifications about incidents
- **AI-Powered Analysis**: Get insights from Google Gemini AI
- **Area-Based Search**: Find crime data within specific radius

### 🆘 **Emergency Features**
- **SOS Button**: One-tap emergency alert system
- **Emergency Contacts**: Quick access to saved contacts
- **Location Sharing**: Share your location with trusted contacts
- **Safety Score**: Real-time safety rating for any location

### 🤖 **AI Safety Advisor**
- Get personalized safety recommendations
- Context-aware tips based on location and time
- AI-analyzed safety insights

### 👥 **Community Features**
- **Report Incidents**: Community-driven safety reporting
- **View Reports**: See incidents reported by others
- **Contribute**: Help make your community safer

### 📱 **Progressive Web App**
- **Installable**: Add to home screen on mobile devices
- **Offline Support**: Works without internet connection
- **Push Notifications**: Get safety alerts (ready for implementation)
- **Responsive Design**: Perfect on mobile, tablet, and desktop

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/safewalk.git
   cd safewalk
   ```

2. **Set up the backend**
   ```bash
   cd server
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Create .env file in server directory
   cp .env.example .env
   ```
   
   Edit `.env` and add your API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3001
   ```

4. **Set up the frontend**
   ```bash
   cd ../client
   npm install
   ```

5. **Start the application**
   
   **Terminal 1 - Backend:**
   ```bash
   cd server
   npm run dev
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   cd client
   npm run dev
   ```

6. **Access the app**
   - Open your browser: http://localhost:5173
   - Backend API: http://localhost:3001

## 📱 Mobile Setup

### Testing on Your Phone

1. **Find your computer's IP address:**
   - Windows: `ipconfig` in CMD
   - Mac/Linux: `ifconfig` in Terminal

2. **Update CORS settings** in `server/index.js`:
   ```javascript
   app.use(cors({ 
     origin: [
       'http://localhost:5173',
       'http://YOUR_IP:5173'  // Add your IP
     ] 
   }));
   ```

3. **Access from phone**: `http://YOUR_IP:5173`

### Install as PWA
- **iOS**: Safari → Share → Add to Home Screen
- **Android**: Chrome will show "Install App" banner

## 🏗️ Project Structure

```
safewalk/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   │   ├── manifest.json  # PWA manifest
│   │   └── service-worker.js  # Service worker
│   └── src/
│       ├── components/    # React components
│       ├── styles/        # CSS styles
│       │   └── responsive.css  # Mobile styles
│       ├── utils/         # Utility functions
│       ├── App.jsx        # Main app component
│       └── main.jsx       # Entry point
├── server/                # Node.js backend
│   ├── routes/           # API routes
│   │   ├── crimeData.js  # Crime data endpoints
│   │   ├── safety.js     # Safety scoring
│   │   ├── ai.js         # AI advisor
│   │   └── ...
│   ├── services/         # Business logic
│   │   ├── crimeDataService.js  # Crime data service
│   │   ├── geminiService.js     # AI integration
│   │   └── ...
│   └── index.js          # Server entry point
├── SETUP_GUIDE.md        # Detailed setup guide
└── README.md             # This file
```

## 🔌 API Endpoints

### Crime Data
- `GET /api/crime-data/national` - National statistics
- `GET /api/crime-data/state/:stateName` - State data
- `GET /api/crime-data/city/:cityName` - City data
- `GET /api/crime-data/alerts/live` - Live crime alerts
- `POST /api/crime-data/area` - Area-based search

### Safety
- `POST /api/safety/score` - Calculate safety score
- `GET /api/safety/heatmap` - Get heatmap data
- `POST /api/safety/nearby` - Nearby incidents

### AI & Reports
- `POST /api/ai/advisor` - Get AI safety advice
- `GET /api/reports` - Community reports
- `POST /api/reports` - Submit report

### Emergency
- `POST /api/sos/activate` - Activate SOS
- `GET /api/contacts` - Emergency contacts

## 🛠️ Tech Stack

### Frontend
- **React 19.2.8** - UI framework
- **Leaflet** - Interactive maps
- **React-Leaflet** - React bindings for Leaflet
- **Leaflet Routing Machine** - Route planning
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Google Generative AI** - AI integration
- **SQLite** (sql.js) - Database
- **CORS** - Cross-origin support

### PWA
- **Service Workers** - Offline support
- **Web App Manifest** - Installation
- **Cache API** - Asset caching

## 🎨 Key Components

### Core Components
- `MapView.jsx` - Interactive map with layers
- `NationalCrimeData.jsx` - Crime dashboard
- `RoutePanel.jsx` - Route planning interface
- `SOSButton.jsx` - Emergency SOS feature
- `SafetyAdvisor.jsx` - AI safety recommendations
- `CommunityReports.jsx` - User-generated reports

### Services
- `crimeDataService.js` - Crime data aggregation
- `geminiService.js` - AI integration
- `safetyEngine.js` - Safety scoring algorithm

## 🔒 Security

- Environment variables for sensitive data
- CORS protection
- Input validation and sanitization
- No client-side API key exposure
- Secure credential handling

**Important**: Never commit `.env` files to version control!

## 📖 Documentation

For detailed setup instructions, troubleshooting, and advanced features, see [SETUP_GUIDE.md](SETUP_GUIDE.md)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues & Limitations

- Crime data is AI-generated and may not reflect real-time incidents
- Requires active internet for live features
- Map tiles may be cached for offline use
- Push notifications require additional setup

## 🚧 Future Enhancements

- [ ] User authentication and profiles
- [ ] Real-time location tracking with geofencing
- [ ] Integration with official crime APIs
- [ ] Social features (friend groups, check-ins)
- [ ] Historical crime trend analysis
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Advanced route customization
- [ ] Wearable device integration

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Built with ❤️ for safer communities

## 🙏 Acknowledgments

- Google Generative AI for AI capabilities
- OpenStreetMap for map data
- Leaflet for mapping library
- React community for amazing tools

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check the [SETUP_GUIDE.md](SETUP_GUIDE.md) for troubleshooting

---

**⚠️ Disclaimer**: SafeWalk is designed to assist with personal safety awareness but should not be relied upon as the sole source of safety information. Always exercise caution and trust your instincts. In case of emergency, contact local authorities immediately.

**Made with 💜 for a safer world**
