import React, { useState, useEffect } from 'react';

const NationalCrimeData = () => {
  const [crimeData, setCrimeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('national');
  const [selectedState, setSelectedState] = useState('');
  const [liveAlerts, setLiveAlerts] = useState([]);

  useEffect(() => {
    fetchNationalData();
    fetchLiveAlerts();

    // Refresh live alerts every 5 minutes
    const interval = setInterval(fetchLiveAlerts, 300000);
    return () => clearInterval(interval);
  }, []);

  const fetchNationalData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/crime-data/national');
      const data = await response.json();
      setCrimeData(data);
      setError(null);
    } catch (err) {
      setError('Failed to load crime data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStateData = async (stateName) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/api/crime-data/state/${stateName}`);
      const data = await response.json();
      setCrimeData(data);
      setError(null);
    } catch (err) {
      setError('Failed to load state data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLiveAlerts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/crime-data/alerts/live?limit=10');
      const data = await response.json();
      setLiveAlerts(data);
    } catch (err) {
      console.error('Failed to load alerts:', err);
    }
  };

  const handleStateSelect = (stateName) => {
    setSelectedState(stateName);
    fetchStateData(stateName);
    setActiveTab('state');
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return '#FF1744';
      case 'medium': return '#FFAB00';
      case 'low': return '#00E676';
      default: return '#9CA3AF';
    }
  };

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'increasing': return '📈';
      case 'decreasing': return '📉';
      case 'stable': return '➡️';
      default: return '•';
    }
  };

  if (loading && !crimeData) {
    return (
      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
        <div className="loading-spinner" style={{ margin: '0 auto' }}></div>
        <p style={{ marginTop: '20px', color: 'var(--text-secondary)' }}>Loading crime data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
        <p style={{ color: 'var(--danger-red)' }}>{error}</p>
        <button onClick={fetchNationalData} style={{ marginTop: '20px', padding: '10px 20px', background: 'var(--primary)' }}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          🚨 National Crime Dashboard
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Real-time crime statistics and safety insights powered by AI
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', flexWrap: 'wrap' }}>
        <button
          onClick={() => { setActiveTab('national'); fetchNationalData(); }}
          style={{
            padding: '10px 20px',
            background: activeTab === 'national' ? 'var(--primary)' : 'var(--bg-surface)',
            borderRadius: '8px',
            fontWeight: activeTab === 'national' ? '600' : '400'
          }}
        >
          National Overview
        </button>
        <button
          onClick={() => setActiveTab('alerts')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'alerts' ? 'var(--primary)' : 'var(--bg-surface)',
            borderRadius: '8px',
            fontWeight: activeTab === 'alerts' ? '600' : '400'
          }}
        >
          🔴 Live Alerts
        </button>
      </div>

      {/* National Statistics */}
      {activeTab === 'national' && crimeData && (
        <div>
          {/* Key Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            <div className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Total Crimes</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                {crimeData.totalCrimes?.toLocaleString() || 'N/A'}
              </div>
            </div>
            <div className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Crime Rate</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent)' }}>
                {crimeData.crimeRate || 'N/A'}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>per 100,000 population</div>
            </div>
            <div className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Year</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{crimeData.year || 2026}</div>
            </div>
          </div>

          {/* Crime Categories */}
          <div className="glass-panel" style={{ padding: '25px', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>Crime Categories</h2>
            <div style={{ display: 'grid', gap: '15px' }}>
              {crimeData.categories?.map((category, idx) => (
                <div key={idx} style={{
                  background: 'var(--bg-surface)',
                  padding: '15px',
                  borderRadius: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', marginBottom: '5px' }}>{category.type}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {category.count?.toLocaleString()} incidents ({category.percentage}%)
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.2rem' }}>{getTrendIcon(category.trend)}</span>
                    <span style={{
                      fontSize: '0.85rem',
                      color: category.trend === 'increasing' ? 'var(--danger-red)' :
                             category.trend === 'decreasing' ? 'var(--safety-green)' : 'var(--text-secondary)'
                    }}>
                      {category.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top States */}
          <div className="glass-panel" style={{ padding: '25px' }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>Top States by Crime Count</h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              {crimeData.topStates?.map((state, idx) => (
                <div
                  key={idx}
                  onClick={() => handleStateSelect(state.name)}
                  style={{
                    background: 'var(--bg-surface)',
                    padding: '15px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                  className="hover-glow"
                >
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '5px' }}>
                      {idx + 1}. {state.name}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {state.crimeCount?.toLocaleString()} crimes
                    </div>
                  </div>
                  <div style={{
                    padding: '8px 15px',
                    background: 'var(--primary)',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    {state.crimeRate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* State View */}
      {activeTab === 'state' && crimeData && crimeData.state && (
        <div>
          <button
            onClick={() => { setActiveTab('national'); fetchNationalData(); }}
            style={{ marginBottom: '20px', padding: '8px 16px', background: 'var(--bg-surface)', borderRadius: '8px' }}
          >
            ← Back to National
          </button>

          <div className="glass-panel" style={{ padding: '25px', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>{crimeData.state}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total Crimes</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{crimeData.totalCrimes?.toLocaleString()}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Crime Rate</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{crimeData.crimeRate}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Safety Ranking</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>#{crimeData.safetyRanking}</div>
              </div>
            </div>
          </div>

          {crimeData.topCities && (
            <div className="glass-panel" style={{ padding: '25px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Top Cities</h3>
              <div style={{ display: 'grid', gap: '10px' }}>
                {crimeData.topCities.map((city, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: '8px' }}>
                    <div style={{ fontWeight: '600' }}>{city.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {city.crimeCount?.toLocaleString()} crimes | Safety Score: {city.safetyScore}/100
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Live Alerts */}
      {activeTab === 'alerts' && (
        <div className="glass-panel" style={{ padding: '25px' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            🔴 Live Crime Alerts
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>
              (Last updated: {new Date().toLocaleTimeString()})
            </span>
          </h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            {liveAlerts.map((alert) => (
              <div
                key={alert.id}
                style={{
                  background: 'var(--bg-surface)',
                  padding: '15px',
                  borderRadius: '10px',
                  borderLeft: `4px solid ${getSeverityColor(alert.severity)}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                  <div>
                    <span style={{
                      fontWeight: '600',
                      color: getSeverityColor(alert.severity),
                      marginRight: '10px'
                    }}>
                      {alert.type}
                    </span>
                    {alert.verified && <span style={{ fontSize: '0.85rem', color: 'var(--safety-green)' }}>✓ Verified</span>}
                  </div>
                  <span style={{
                    padding: '4px 10px',
                    background: getSeverityColor(alert.severity) + '20',
                    color: getSeverityColor(alert.severity),
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    {alert.severity.toUpperCase()}
                  </span>
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                  📍 {alert.location}, {alert.city}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {new Date(alert.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NationalCrimeData;
