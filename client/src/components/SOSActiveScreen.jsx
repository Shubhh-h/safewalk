import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';

const SOSActiveScreen = () => {
  const { setSosActive } = useContext(AppContext);
  const [timer, setTimer] = useState(0);
  
  // In a real app, this would be fetched from user preferences or the backend
  const primaryEmergencyContact = "+919876543210"; 

  useEffect(() => {
    const t = setInterval(() => setTimer(prev => prev + 1), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(255, 23, 68, 0.95)',
      zIndex: 1000,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      color: 'white',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '10px', animation: 'fadeIn 0.5s infinite alternate' }}>EMERGENCY MODE ACTIVE</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '30px' }}>Active for: {Math.floor(timer/60)}:{(timer%60).toString().padStart(2, '0')}</p>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '600px' }}>
        <a href="tel:112" style={{ textDecoration: 'none' }}>
          <button className="hover-glow-danger" style={{ background: 'white', color: 'var(--danger-red)', padding: '15px 30px', borderRadius: '30px', fontSize: '1.2rem', fontWeight: 'bold', width: '200px' }}>
            📞 Call 112
          </button>
        </a>
        
        <a href={`tel:${primaryEmergencyContact}`} style={{ textDecoration: 'none' }}>
          <button className="hover-glow" style={{ background: '#000', color: 'white', padding: '15px 30px', borderRadius: '30px', fontSize: '1.2rem', fontWeight: 'bold', border: '2px solid white', width: '200px' }}>
            📱 Call Contact
          </button>
        </a>

        <button className="hover-glow" style={{ background: 'rgba(0,0,0,0.5)', color: 'white', padding: '15px 30px', borderRadius: '30px', fontSize: '1.2rem', fontWeight: 'bold', width: '200px' }}>
          📍 Share Location
        </button>
      </div>

      <button className="hover-glow" onClick={() => setSosActive(false)} style={{ background: 'transparent', border: '2px solid white', padding: '10px 20px', borderRadius: '20px', marginTop: 'auto' }}>
        I'm Safe (Deactivate)
      </button>
    </div>
  );
};

export default SOSActiveScreen;
