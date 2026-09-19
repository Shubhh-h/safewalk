import React from 'react'
import ReactDOM from 'react-dom/client'
import L from 'leaflet'
window.L = L // Expose L globally for leaflet plugins like leaflet.heat
import 'leaflet/dist/leaflet.css' // Import leaflet CSS at root level
import App from './App.jsx'
import './index.css'
import './styles/responsive.css' // Import mobile responsive styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
