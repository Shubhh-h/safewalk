import React, { useContext } from 'react';
import { AppContext } from '../App';

const SOSButton = () => {
  const { setSosActive } = useContext(AppContext);
  
  return (
    <button
      onClick={() => setSosActive(true)}
      style={{
        position: 'absolute',
        bottom: '30px',
        right: '30px',
        zIndex: 100,
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: 'var(--danger-red)',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        animation: 'pulse-sos 2s infinite',
        border: '4px solid white',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
      }}
    >
      SOS
    </button>
  );
};

export default SOSButton;
