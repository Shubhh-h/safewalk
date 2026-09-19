import React from 'react';

const LoadingOverlay = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(10, 14, 26, 0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ animation: 'float 2s ease-in-out infinite', fontSize: '3rem' }}>
        🚶‍♀️
      </div>
    </div>
  );
};

export default LoadingOverlay;
