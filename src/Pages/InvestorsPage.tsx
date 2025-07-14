// src/Pages/InvestorsPage.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './InvestorsPage.module.scss';

interface PerformanceMetric {
  label: string;
  value: string;
  description: string;
  trend?: 'up' | 'down' | 'stable';
}

interface PortfolioStat {
  label: string;
  value: string;
  icon: string;
}

interface Community {
  id: number;
  name: string;
  location: string;
  state: string;
  units: number;
  status: 'Completed' | 'Under Construction' | 'In Development';
  coordinates: [number, number];
}

const InvestorsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'strategy' | 'portfolio'>('overview');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [mapComponents, setMapComponents] = useState<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Load map components
  useEffect(() => {
    const loadMapComponents = async () => {
      try {
        await import('leaflet/dist/leaflet.css');
        
        const [leaflet, reactLeaflet] = await Promise.all([
          import('leaflet'),
          import('react-leaflet')
        ]);

        // Fix marker icons for Vite
        delete (leaflet.default.Icon.Default.prototype as any)._getIconUrl;
        leaflet.default.Icon.Default.mergeOptions({
          iconRetinaUrl: '/node_modules/leaflet/dist/images/marker-icon-2x.png',
          iconUrl: '/node_modules/leaflet/dist/images/marker-icon.png',
          shadowUrl: '/node_modules/leaflet/dist/images/marker-shadow.png',
        });

        setMapComponents({
          MapContainer: reactLeaflet.MapContainer,
          TileLayer: reactLeaflet.TileLayer,
          Marker: reactLeaflet.Marker,
          Popup: reactLeaflet.Popup,
          useMap: reactLeaflet.useMap,
          L: leaflet.default
        });
        
        setMapLoaded(true);
      } catch (error) {
        console.error('Failed to load map components:', error);
      }
    };

    loadMapComponents();
  }, []);

  // Communities data for map
  const communities: Community[] = [
    // Georgia Communities
    { id: 1, name: 'Pointe Grand Savannah', location: 'Savannah', state: 'GA', units: 288, status: 'Completed', coordinates: [32.0835, -81.0998] },
    { id: 2, name: 'Pointe Grand Warner Robins', location: 'Warner Robins', state: 'GA', units: 264, status: 'Completed', coordinates: [32.6130, -83.6324] },
    { id: 3, name: 'Pointe Grand Macon', location: 'Macon', state: 'GA', units: 276, status: 'Completed', coordinates: [32.8407, -83.6324] },
    { id: 4, name: 'Pointe Grand Columbia', location: 'Columbia', state: 'GA', units: 258, status: 'Completed', coordinates: [33.5904, -82.1940] },
    { id: 5, name: 'Pointe Grand Dawsonville', location: 'Dawsonville', state: 'GA', units: 300, status: 'Completed', coordinates: [34.4212, -84.1196] },
    { id: 6, name: 'Pointe Grand Brunswick', location: 'Brunswick', state: 'GA', units: 264, status: 'Completed', coordinates: [31.1498, -81.4912] },
    { id: 7, name: 'Pointe Grand Byron', location: 'Byron', state: 'GA', units: 324, status: 'Completed', coordinates: [32.6474, -83.7549] },
    { id: 8, name: 'Pointe Grand Augusta', location: 'Augusta', state: 'GA', units: 300, status: 'Under Construction', coordinates: [33.4735, -82.0105] },
    { id: 9, name: 'Pointe Grand Athens', location: 'Athens', state: 'GA', units: 240, status: 'Completed', coordinates: [33.9519, -83.3576] },
    { id: 10, name: 'Pointe Grand Pendergrass', location: 'Pendergrass', state: 'GA', units: 340, status: 'Under Construction', coordinates: [34.2717, -83.6832] },
    
    // Florida Communities
    { id: 11, name: 'Pointe Grand Ocala', location: 'Ocala', state: 'FL', units: 360, status: 'Completed', coordinates: [29.1872, -82.1401] },
    { id: 12, name: 'Pointe Grand Palm Coast', location: 'Palm Coast', state: 'FL', units: 300, status: 'Completed', coordinates: [29.5844, -81.2081] },
    { id: 13, name: 'Pointe Grand Daytona', location: 'Daytona Beach', state: 'FL', units: 264, status: 'Completed', coordinates: [29.2108, -81.0228] },
    { id: 14, name: 'Pointe Grand DeLand', location: 'DeLand', state: 'FL', units: 264, status: 'Completed', coordinates: [29.0286, -81.3009] },
    { id: 15, name: 'Pointe Grand Davenport', location: 'Davenport', state: 'FL', units: 288, status: 'Completed', coordinates: [28.1614, -81.6023] },
    { id: 16, name: 'Pointe Grand Plant City', location: 'Plant City', state: 'FL', units: 300, status: 'Under Construction', coordinates: [28.0186, -82.1129] },
    { id: 17, name: 'Pointe Grand Jacksonville West', location: 'Jacksonville', state: 'FL', units: 264, status: 'Completed', coordinates: [30.3322, -81.6557] },
    { id: 18, name: 'Pointe Grand Oak Leaf', location: 'Oak Leaf', state: 'FL', units: 216, status: 'Completed', coordinates: [30.1755, -81.9009] },
    { id: 19, name: 'Pointe Grand South Lake', location: 'Clermont', state: 'FL', units: 312, status: 'Under Construction', coordinates: [28.5494, -81.7729] },
    { id: 22, name: 'Pointe Grand Heath Brook', location: 'Ocala', state: 'FL', units: 240, status: 'Completed', coordinates: [29.1756, -82.1584] },
    { id: 23, name: 'Pointe Grand Middleburg', location: 'Middleburg', state: 'FL', units: 264, status: 'In Development', coordinates: [30.0769, -81.8673] },
    { id: 24, name: 'Pointe Grand Panama City', location: 'Panama City', state: 'FL', units: 288, status: 'In Development', coordinates: [30.1588, -85.6602] },
    { id: 25, name: 'Pointe Grand Spring Hill', location: 'Spring Hill', state: 'FL', units: 276, status: 'In Development', coordinates: [28.4769, -82.5268] },
    
    // South Carolina Communities
    { id: 20, name: 'Pointe Grand Columbia', location: 'Columbia', state: 'SC', units: 258, status: 'Completed', coordinates: [34.0007, -81.0348] },
    { id: 21, name: 'Pointe Grand On Main', location: 'Anderson', state: 'SC', units: 288, status: 'Completed', coordinates: [34.5034, -82.6501] },
  ];

  // Custom marker creation function
  const createCustomIcon = (status: Community['status']) => {
    if (!mapComponents?.L) return null;
    
    const colors = {
      'Completed': '#22c55e',
      'Under Construction': '#3b82f6', 
      'In Development': '#f59e0b'
    };
    
    const color = colors[status];
    
    return mapComponents.L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: ${color};
          border: 3px solid white;
          box-shadow: 0 3px 10px rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1000;
        ">
          <div style="
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: white;
          "></div>
          <div style="
            position: absolute;
            top: -4px;
            left: -4px;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background-color: ${color};
            opacity: 0.3;
            animation: pulse 2s infinite;
          "></div>
        </div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  };

  // Map bounds component
  const MapBounds: React.FC<{ communities: Community[] }> = ({ communities }) => {
    const map = mapComponents?.useMap();

    useEffect(() => {
      if (map && communities.length > 0 && mapComponents?.L) {
        const bounds = mapComponents.L.latLngBounds(communities.map(c => c.coordinates));
        map.fitBounds(bounds, { padding: [20, 20] });
      }
    }, [communities, map]);

    return null;
  };

  const { MapContainer, TileLayer, Marker, Popup } = mapComponents || {};

  // Debug log for modal state
  useEffect(() => {
    console.log('Login modal state:', isLoginModalOpen);
  }, [isLoginModalOpen]);

  useEffect(() => {
    // Prevent body scroll when login modal is open
    if (isLoginModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoginModalOpen]);

  // Animated counter effect
  const [animatedValues, setAnimatedValues] = useState({
    fundSize: 0,
    communities: 0,
    occupancy: 0,
    irr: 0
  });

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const timers: NodeJS.Timeout[] = [];

    // Animate fund size
    let fundStep = 0;
    const fundTimer = setInterval(() => {
      fundStep++;
      setAnimatedValues(prev => ({
        ...prev,
        fundSize: Math.min((750 / steps) * fundStep, 750)
      }));
      if (fundStep >= steps) clearInterval(fundTimer);
    }, interval);
    timers.push(fundTimer);

    // Animate communities
    let commStep = 0;
    const commTimer = setInterval(() => {
      commStep++;
      setAnimatedValues(prev => ({
        ...prev,
        communities: Math.min(Math.floor((30 / steps) * commStep), 30)
      }));
      if (commStep >= steps) clearInterval(commTimer);
    }, interval);
    timers.push(commTimer);

    // Animate occupancy
    let occStep = 0;
    const occTimer = setInterval(() => {
      occStep++;
      setAnimatedValues(prev => ({
        ...prev,
        occupancy: Math.min((96 / steps) * occStep, 96)
      }));
      if (occStep >= steps) clearInterval(occTimer);
    }, interval);
    timers.push(occTimer);

    // Animate IRR
    let irrStep = 0;
    const irrTimer = setInterval(() => {
      irrStep++;
      setAnimatedValues(prev => ({
        ...prev,
        irr: Math.min((18.5 / steps) * irrStep, 18.5)
      }));
      if (irrStep >= steps) clearInterval(irrTimer);
    }, interval);
    timers.push(irrTimer);

    return () => timers.forEach(timer => clearInterval(timer));
  }, []);

  const performanceMetrics: PerformanceMetric[] = [
    {
      label: 'Target Net IRR',
      value: `${animatedValues.irr.toFixed(1)}%`,
      description: 'Consistent returns across market cycles',
      trend: 'up'
    },
    {
      label: 'Portfolio Occupancy',
      value: `${animatedValues.occupancy.toFixed(0)}%`,
      description: 'Above market average occupancy rates',
      trend: 'stable'
    },
    {
      label: 'Capital Deployed',
      value: '$2.1B',
      description: 'Since inception across all funds',
      trend: 'up'
    },
    {
      label: 'Average Hold Period',
      value: '5-7 Years',
      description: 'Value-add through operational excellence',
      trend: 'stable'
    }
  ];

  const portfolioStats: PortfolioStat[] = [
    { label: 'Active Communities', value: `${animatedValues.communities}+`, icon: 'C' },
    { label: 'Total Units', value: '8,500+', icon: 'U' },
    { label: 'Geographic Markets', value: '3 States', icon: 'M' },
    { label: 'Workers Housed', value: '23,000+', icon: 'W' }
  ];

  return (
    <div className={styles.investorsPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.gridPattern} />
          <div className={styles.glowOrb} />
          <div className={styles.glowOrb2} />
        </div>
        
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <span className={styles.fundLabel}>Fund V</span>
            <h1 className={styles.heroTitle}>
              <span className={styles.fundAmount}>${animatedValues.fundSize.toFixed(0)}M</span>
              <span className={styles.subtitle}>Transforming Workforce Housing</span>
            </h1>
            <p className={styles.heroDescription}>
              Partner with the #4 national developer in essential housing. 
              Our institutional approach delivers consistent returns while 
              creating lasting community impact.
            </p>
            <div className={styles.heroActions}>
              <button 
                className={styles.primaryButton}
                onClick={() => {
                  console.log('Hero button clicked, opening modal');
                  setIsLoginModalOpen(true);
                }}
                type="button"
                aria-label="Open investor login modal"
              >
                Access Investor Portal
              </button>
              <a href="#contact" className={styles.secondaryButton}>
                Schedule a Meeting
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics Bar */}
      <section className={styles.metricsBar}>
        <div className={styles.container}>
          <div className={styles.metricsGrid}>
            <div className={styles.metric}>
              <span className={styles.metricValue}>#4</span>
              <span className={styles.metricLabel}>National Developer</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricValue}>30+ Years</span>
              <span className={styles.metricLabel}>Track Record</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricValue}>A+ Rated</span>
              <span className={styles.metricLabel}>Partner Rating</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricValue}>ESG</span>
              <span className={styles.metricLabel}>Focused Strategy</span>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Section - Now with white background */}
      <section className={styles.performanceSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Performance Excellence</h2>
            <p className={styles.sectionSubtitle}>
              Delivering institutional returns with measurable social impact
            </p>
          </div>

          <div className={styles.performanceGrid}>
            {performanceMetrics.map((metric, index) => (
              <div key={index} className={styles.performanceCard}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.metricValue}>{metric.value}</h3>
                  {metric.trend && (
                    <span className={`${styles.trend} ${styles[metric.trend]}`}>
                      {metric.trend === 'up' ? '▲' : metric.trend === 'down' ? '▼' : '■'}
                    </span>
                  )}
                </div>
                <h4 className={styles.metricTitle}>{metric.label}</h4>
                <p className={styles.metricDescription}>{metric.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Strategy Section */}
      <section className={styles.strategySection}>
        <div className={styles.container}>
          <div className={styles.tabNavigation}>
            <button
              className={`${styles.tabButton} ${activeTab === 'overview' ? styles.active : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Investment Overview
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'strategy' ? styles.active : ''}`}
              onClick={() => setActiveTab('strategy')}
            >
              Our Strategy
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'portfolio' ? styles.active : ''}`}
              onClick={() => setActiveTab('portfolio')}
            >
              Portfolio Highlights
            </button>
          </div>

          <div className={styles.tabContent}>
            {activeTab === 'overview' && (
              <div className={styles.overviewContent}>
                <div className={styles.contentGrid}>
                  <div className={styles.contentMain}>
                    <h3>Investment Thesis</h3>
                    <p>
                      Hillpointe targets the critical gap in workforce housing by developing 
                      and operating high-quality, attainable communities in high-growth markets 
                      across the Southeast. Our vertically integrated platform ensures 
                      operational excellence from development through property management.
                    </p>
                    
                    <h4>Why Workforce Housing?</h4>
                    <ul className={styles.bulletList}>
                      <li>Essential housing shortage of 7.3 million units nationally</li>
                      <li>Recession-resilient demand from essential workers</li>
                      <li>Limited new supply due to construction costs</li>
                      <li>Strong demographic tailwinds through 2030</li>
                    </ul>
                  </div>
                  
                  <div className={styles.statsPanel}>
                    <h4>Fund V Targets</h4>
                    <div className={styles.statsList}>
                      <div className={styles.stat}>
                        <span className={styles.statValue}>15-20</span>
                        <span className={styles.statLabel}>New Communities</span>
                      </div>
                      <div className={styles.stat}>
                        <span className={styles.statValue}>5,000+</span>
                        <span className={styles.statLabel}>New Units</span>
                      </div>
                      <div className={styles.stat}>
                        <span className={styles.statValue}>$1.5B</span>
                        <span className={styles.statLabel}>Total Development</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'strategy' && (
              <div className={styles.strategyContent}>
                <div className={styles.strategyGrid}>
                  <div className={styles.strategyCard}>
                    <div className={styles.iconWrapper}>
                      <span className={styles.icon}>▲</span>
                    </div>
                    <h4>Market Selection</h4>
                    <p>
                      Focus on high-growth Southeast markets with strong job creation, 
                      population inflows, and limited housing supply.
                    </p>
                  </div>
                  
                  <div className={styles.strategyCard}>
                    <div className={styles.iconWrapper}>
                      <span className={styles.icon}>◆</span>
                    </div>
                    <h4>Development Excellence</h4>
                    <p>
                      Ground-up development of purpose-built communities with 
                      institutional-quality amenities at attainable price points.
                    </p>
                  </div>
                  
                  <div className={styles.strategyCard}>
                    <div className={styles.iconWrapper}>
                      <span className={styles.icon}>⬡</span>
                    </div>
                    <h4>Operational Efficiency</h4>
                    <p>
                      Vertically integrated platform from development through 
                      property management maximizes NOI and resident satisfaction.
                    </p>
                  </div>
                  
                  <div className={styles.strategyCard}>
                    <div className={styles.iconWrapper}>
                      <span className={styles.icon}>◈</span>
                    </div>
                    <h4>Value Creation</h4>
                    <p>
                      Strategic hold period of 5-7 years allows for stabilization 
                      and value maximization through operational improvements.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div className={styles.portfolioContent}>
                <div className={styles.portfolioStats}>
                  {portfolioStats.map((stat, index) => (
                    <div key={index} className={styles.portfolioStat}>
                      <div className={styles.statIcon}>{stat.icon}</div>
                      <div className={styles.statInfo}>
                        <span className={styles.statValue}>{stat.value}</span>
                        <span className={styles.statLabel}>{stat.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className={styles.portfolioMap}>
                  <h4>Geographic Diversification</h4>
                  <div className={styles.mapContainer}>
                    {MapContainer && mapLoaded ? (
                      <MapContainer
                        center={[30.5, -82.5]}
                        zoom={6}
                        style={{ height: '400px', width: '100%', borderRadius: '12px' }}
                        zoomControl={true}
                      >
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapBounds communities={communities} />
                        {communities.map((community) => (
                          <Marker
                            key={community.id}
                            position={community.coordinates}
                            icon={createCustomIcon(community.status)}
                          >
                            <Popup className={styles.customPopup}>
                              <div className={styles.popupContent}>
                                <div className={styles.popupHeader}>
                                  <h3>{community.name}</h3>
                                  <div className={`${styles.popupStatus} ${
                                    community.status === 'Completed' ? styles.statusCompleted :
                                    community.status === 'Under Construction' ? styles.statusConstruction :
                                    styles.statusDevelopment
                                  }`}>
                                    {community.status === 'Completed' ? 'Stabilized' : community.status}
                                  </div>
                                </div>
                                <p className={styles.popupLocation}>{community.location}, {community.state}</p>
                                <div className={styles.popupStats}>
                                  <div className={styles.popupStat}>
                                    <span className={styles.popupStatValue}>{community.units}</span>
                                    <span className={styles.popupStatLabel}>Units</span>
                                  </div>
                                  <div className={styles.popupStat}>
                                    <span className={styles.popupStatValue}>96%</span>
                                    <span className={styles.popupStatLabel}>Occupancy</span>
                                  </div>
                                </div>
                                <Link to="/communities" className={styles.popupButton}>
                                  View Property Details
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M6 8h4m0 0L8 6m2 2L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </Link>
                              </div>
                            </Popup>
                          </Marker>
                        ))}
                      </MapContainer>
                    ) : (
                      <div className={styles.mapPlaceholder}>
                        <div className={styles.mapOverlay}>
                          <p>Loading Interactive Portfolio Map...</p>
                          <Link to="/communities" className={styles.mapLink}>
                            View All Properties ›
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className={styles.documentsSection}>
        <div className={styles.container}>
          <div className={styles.documentsCard}>
            <div className={styles.lockIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="11" width="14" height="10" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
            </div>
            <h3>Investor Documents</h3>
            <p>Access fund documents, quarterly reports, and investor updates</p>
            <button 
              className={styles.accessButton}
              onClick={() => {
                console.log('Documents button clicked, opening modal');
                setIsLoginModalOpen(true);
              }}
              type="button"
              aria-label="Open investor login modal"
            >
              Login to Investor Portal
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h2>Connect With Our Team</h2>
              <p>
                Interested in learning more about investment opportunities with Hillpointe? 
                Our investor relations team is ready to discuss how we can help you achieve 
                your investment objectives.
              </p>
              
              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Email</span>
                  <a href="mailto:investors@hillpointe.com">info@hillpointe.com</a>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Phone</span>
                  <a href="tel:+14077529004">(407) 752-9004</a>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Minimum Investment</span>
                  <span>$250,000</span>
                </div>
              </div>
            </div>
            
            <form className={styles.contactForm}>
              <h3>Schedule a Meeting</h3>
              <div className={styles.formRow}>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className={styles.formInput}
                  required 
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className={styles.formInput}
                  required 
                />
              </div>
              <div className={styles.formRow}>
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className={styles.formInput}
                  required 
                />
                <select className={styles.formInput} required>
                  <option value="">Investment Range</option>
                  <option value="250k-500k">$250K - $500K</option>
                  <option value="500k-1m">$500K - $1M</option>
                  <option value="1m-5m">$1M - $5M</option>
                  <option value="5m+">$5M+</option>
                </select>
              </div>
              <textarea 
                placeholder="Tell us about your investment objectives" 
                className={styles.formTextarea}
                rows={4}
              />
              <button type="submit" className={styles.submitButton}>
                Request Information
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsLoginModalOpen(false)}>
          <div className={styles.loginModal} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.closeButton}
              onClick={() => setIsLoginModalOpen(false)}
              aria-label="Close modal"
            >
              ×
            </button>
            
            <div className={styles.modalContent}>
              <h2 className={styles.modalTitle}>Investor Login</h2>
              <p className={styles.modalSubtitle}>Access your investor dashboard</p>
              
              <form className={styles.loginForm} onSubmit={(e) => e.preventDefault()}>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="investor@example.com"
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
                
                <div className={styles.formActions}>
                  <label className={styles.rememberMe}>
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className={styles.forgotPassword}>
                    Forgot password?
                  </a>
                </div>
                
                <button type="submit" className={styles.loginButton}>
                  Sign In
                </button>
              </form>
              
              <div className={styles.modalFooter}>
                <p>Don't have an account? <a href="#">Contact us</a></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pulse animation CSS */}
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.1; }
          100% { transform: scale(1); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default InvestorsPage;