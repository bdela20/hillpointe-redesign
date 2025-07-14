// src/Pages/CommunitiesPage.tsx
import React, { useState, useEffect } from 'react';
import styles from './CommunitiesPage.module.scss';


interface Community {
  id: number;
  name: string;
  location: string;
  state: string;
  units: number;
  status: 'Completed' | 'Under Construction' | 'In Development';
  imageUrl?: string;
  coordinates: [number, number]; // [latitude, longitude]
  yearCompleted?: number;
  occupancy?: number;
  website?: string;
}

const CommunitiesPage: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [mapView, setMapView] = useState<'list' | 'map'>('list');
  const [mapComponents, setMapComponents] = useState<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Dynamically import map components for Vite compatibility
    const loadMapComponents = async () => {
      try {
        // Import Leaflet CSS first
        await import('leaflet/dist/leaflet.css');
        
        // Import Leaflet and React-Leaflet
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

  // Complete Hillpointe communities data with exact coordinates
  const communities: Community[] = [
    // Georgia Communities
    { id: 1, name: 'Pointe Grand Savannah', location: 'Savannah', state: 'GA', units: 288, status: 'Completed', imageUrl: 'public/Images/Pointe-Grand-Savannah-Grills-scaled.jpg', coordinates: [32.0835, -81.0998], yearCompleted: 2021, occupancy: 96, website: 'pointegrandsavannah.com' },
    { id: 2, name: 'Pointe Grand Warner Robins', location: 'Warner Robins', state: 'GA', units: 264, status: 'Completed', imageUrl: 'public/Images/Warner-Robins.jpg', coordinates: [32.6130, -83.6324], yearCompleted: 2022, occupancy: 94, website: 'pointegrandwarnerrobins.com' },
    { id: 3, name: 'Pointe Grand Macon', location: 'Macon', state: 'GA', units: 276, status: 'Completed', imageUrl: 'public/Images/Macon.jpg', coordinates: [32.8407, -83.6324], yearCompleted: 2022, occupancy: 95, website: 'pointegrandmacon.com' },
    { id: 4, name: 'Pointe Grand Columbia', location: 'Columbia', state: 'GA', units: 258, status: 'Completed', imageUrl: 'public/Images/Columbia.jpg', coordinates: [33.5904, -82.1940], yearCompleted: 2021, occupancy: 97, website: 'pointegrandcolumbiaga.com' },
    { id: 5, name: 'Pointe Grand Dawsonville', location: 'Dawsonville', state: 'GA', units: 300, status: 'Completed', imageUrl: 'public/Images/Dawsonville.jpg', coordinates: [34.4212, -84.1196], yearCompleted: 2023, occupancy: 92, website: 'pointegranddawsonville.com' },
    { id: 6, name: 'Pointe Grand Brunswick', location: 'Brunswick', state: 'GA', units: 264, status: 'Completed', imageUrl: 'public/Images/Brunswick.jpg', coordinates: [31.1498, -81.4912], yearCompleted: 2023, occupancy: 89, website: 'pointegrandbrunswick.com' },
    { id: 7, name: 'Pointe Grand Byron', location: 'Byron', state: 'GA', units: 324, status: 'Completed', imageUrl: 'public/Images/Byron.jpg', coordinates: [32.6474, -83.7549], yearCompleted: 2022, occupancy: 95, website: 'pointegrandbyron.com' },
    { id: 8, name: 'Pointe Grand Augusta', location: 'Augusta', state: 'GA', units: 300, status: 'Under Construction', imageUrl: 'public/Images/Augusta.jpg', coordinates: [33.4735, -82.0105], yearCompleted: 2024, website: 'Website Coming soon' },
    { id: 9, name: 'Pointe Grand Athens', location: 'Athens', state: 'GA', units: 240, status: 'Completed', imageUrl: 'public/Images/Athens.jpg', coordinates: [33.9519, -83.3576], yearCompleted: 2023, occupancy: 93, website: 'pointegrandathens.com' },
    { id: 10, name: 'Pointe Grand Pendergrass', location: 'Pendergrass', state: 'GA', units: 340, status: 'Under Construction', imageUrl: 'public/Images/Pendergrass.jpeg', coordinates: [34.2717, -83.6832], yearCompleted: 2024, website: 'Website Coming soon' },
    
    // Florida Communities
    { id: 11, name: 'Pointe Grand Ocala', location: 'Ocala', state: 'FL', units: 360, status: 'Completed', imageUrl: 'public/Images/Ocala.jpg', coordinates: [29.1872, -82.1401], yearCompleted: 2022, occupancy: 96, website: 'pointegrandocala.com' },
    { id: 12, name: 'Pointe Grand Palm Coast', location: 'Palm Coast', state: 'FL', units: 300, status: 'Completed', imageUrl: 'public/Images/Palm-Coast.jpeg', coordinates: [29.5844, -81.2081], yearCompleted: 2023, occupancy: 95, website: 'pointegrandpalmcoast.com' },
    { id: 13, name: 'Pointe Grand Daytona', location: 'Daytona Beach', state: 'FL', units: 264, status: 'Completed', imageUrl: 'public/Images/Daytona.jpg', coordinates: [29.2108, -81.0228], yearCompleted: 2022, occupancy: 94, website: 'pointegranddaytona.com' },
    { id: 14, name: 'Pointe Grand DeLand', location: 'DeLand', state: 'FL', units: 264, status: 'Completed', imageUrl: 'public/Images/Deland.jpg', coordinates: [29.0286, -81.3009], yearCompleted: 2022, occupancy: 97, website: 'pointegranddeland.com' },
    { id: 15, name: 'Pointe Grand Davenport', location: 'Davenport', state: 'FL', units: 288, status: 'Completed', imageUrl: 'public/Images/Davenport-1.jpg', coordinates: [28.1614, -81.6023], yearCompleted: 2023, occupancy: 91, website: 'pointegranddavenport.com' },
    { id: 16, name: 'Pointe Grand Plant City', location: 'Plant City', state: 'FL', units: 300, status: 'Under Construction', imageUrl: 'public/Images/Plant-City-1.jpg', coordinates: [28.0186, -82.1129], yearCompleted: 2024, website: 'Website Coming soon' },
    { id: 17, name: 'Pointe Grand Jacksonville West', location: 'Jacksonville', state: 'FL', units: 264, status: 'Completed', imageUrl: 'public/Images/Jacksonville-West.jpg', coordinates: [30.3322, -81.6557], yearCompleted: 2021, occupancy: 98, website: 'pointegrandjacksonvillewest.com' },
    { id: 18, name: 'Pointe Grand Oak Leaf', location: 'Oak Leaf', state: 'FL', units: 216, status: 'Completed', imageUrl: 'public/Images/Oakleaf.jpg', coordinates: [30.1755, -81.9009], yearCompleted: 2021, occupancy: 96, website: 'pointegrandoakleaf.com' },
    { id: 19, name: 'Pointe Grand South Lake', location: 'Clermont', state: 'FL', units: 312, status: 'Under Construction', imageUrl: 'public/Images/Pointe.jpg', coordinates: [28.5494, -81.7729], yearCompleted: 2024, website: 'Website Coming soon' },
    { id: 22, name: 'Pointe Grand Heath Brook', location: 'Ocala', state: 'FL', units: 240, status: 'Completed', imageUrl: 'public/Images/Heath-Brook.jpg', coordinates: [29.1756, -82.1584], yearCompleted: 2023, occupancy: 93, website: 'pointegrandheathbrook.com' },
    { id: 23, name: 'Pointe Grand Middleburg', location: 'Middleburg', state: 'FL', units: 264, status: 'In Development', imageUrl: 'public/Images/Middleburg.jpeg', coordinates: [30.0769, -81.8673], yearCompleted: 2025, website: 'Website Coming soon' },
    { id: 24, name: 'Pointe Grand Panama City', location: 'Panama City', state: 'FL', units: 288, status: 'In Development', imageUrl: 'public/Images/Panama.webp', coordinates: [30.1588, -85.6602], yearCompleted: 2025, website: 'Website Coming soon' },
    { id: 25, name: 'Pointe Grand Spring Hill', location: 'Spring Hill', state: 'FL', units: 276, status: 'In Development', imageUrl: 'public/Images/Spring-Hill.jpg', coordinates: [28.4769, -82.5268], yearCompleted: 2025, website: 'Website Coming soon' },
    
    // South Carolina Communities
    { id: 20, name: 'Pointe Grand Columbia', location: 'Columbia', state: 'SC', units: 258, status: 'Completed', imageUrl: 'public/Images/Columbia.jpg', coordinates: [34.0007, -81.0348], yearCompleted: 2022, occupancy: 94, website: 'pointegrandcolumbiasc.com' },
    { id: 21, name: 'Pointe Grand On Main', location: 'Anderson', state: 'SC', units: 288, status: 'Completed', imageUrl: 'public/Images/Pointe.jpg', coordinates: [34.5034, -82.6501], yearCompleted: 2023, occupancy: 92, website: 'pointegrandonmain.com' },
  ];

  // Get unique states for filter
  const states = ['All', ...Array.from(new Set(communities.map(c => c.state)))];
  const statuses = ['All', 'Completed', 'Under Construction', 'In Development'];

  // Filter communities
  const filteredCommunities = communities.filter(community => {
    const stateMatch = selectedState === 'All' || community.state === selectedState;
    const statusMatch = selectedStatus === 'All' || community.status === selectedStatus;
    return stateMatch && statusMatch;
  });

  // Calculate totals
  const totalUnits = filteredCommunities.reduce((sum, c) => sum + c.units, 0);
  const totalCommunities = filteredCommunities.length;
  const uniqueStates = new Set(communities.map(c => c.state)).size;

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
          width: 24px;
          height: 24px;
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
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: white;
          "></div>
          <div style="
            position: absolute;
            top: -6px;
            left: -6px;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background-color: ${color};
            opacity: 0.3;
            animation: pulse 2s infinite;
          "></div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
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

  const getInvestmentStatus = (status: Community['status'], occupancy?: number) => {
    if (status === 'Completed' && occupancy && occupancy >= 90) return 'Stabilized';
    if (status === 'Completed' && occupancy && occupancy < 90) return 'Lease-Up';
    if (status === 'Under Construction') return 'Under Construction';
    return 'In Development';
  };

  return (
    <div className={styles.communitiesPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.gridPattern} />
          <div className={styles.glowOrb} />
          <div className={styles.glowOrb2} />
        </div>
        <div className={styles.container}>
          <h1 className={styles.title}>
            <span>Our</span>
            <span className={styles.gradient}>Portfolio</span>
          </h1>
          <p className={styles.subtitle}>
            Creating exceptional workforce housing across the Southeast with 30+ communities 
            and 7,000+ units delivered. 
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className={styles.statsBar}>
        <div className={styles.container}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{totalCommunities}</span>
            <span className={styles.statLabel}>Communities</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{totalUnits.toLocaleString()}</span>
            <span className={styles.statLabel}>Total Units</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{uniqueStates}</span>
            <span className={styles.statLabel}>States</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>$750M+</span>
            <span className={styles.statLabel}>Total Investment</span>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className={styles.filters}>
        <div className={styles.container}>
          <div className={styles.filterGroup}>
            <label>State</label>
            <div className={styles.filterButtons}>
              {states.map(state => (
                <button
                  key={state}
                  className={`${styles.filterButton} ${selectedState === state ? styles.active : ''}`}
                  onClick={() => setSelectedState(state)}
                >
                  {state}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.filterGroup}>
            <label>Status</label>
            <div className={styles.filterButtons}>
              {statuses.map(status => (
                <button
                  key={status}
                  className={`${styles.filterButton} ${selectedStatus === status ? styles.active : ''}`}
                  onClick={() => setSelectedStatus(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.filterGroup}>
            <label>View</label>
            <div className={styles.filterButtons}>
              <button
                className={`${styles.filterButton} ${mapView === 'list' ? styles.active : ''}`}
                onClick={() => setMapView('list')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
                List
              </button>
              <button
                className={`${styles.filterButton} ${mapView === 'map' ? styles.active : ''}`}
                onClick={() => setMapView('map')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2"></polygon>
                  <line x1="8" y1="2" x2="8" y2="18"></line>
                  <line x1="16" y1="6" x2="16" y2="22"></line>
                </svg>
                Map
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      {mapView === 'map' && (
        <section className={styles.mapSection}>
          <div className={styles.container}>
            <h2 className={styles.mapTitle}>Interactive Community Map</h2>
            <div className={styles.mapLegend}>
              <div className={styles.legendItem}>
                <div className={`${styles.legendDot} ${styles.completed}`}></div>
                <span>Completed ({communities.filter(c => c.status === 'Completed').length})</span>
              </div>
              <div className={styles.legendItem}>
                <div className={`${styles.legendDot} ${styles.construction}`}></div>
                <span>Under Construction ({communities.filter(c => c.status === 'Under Construction').length})</span>
              </div>
              <div className={styles.legendItem}>
                <div className={`${styles.legendDot} ${styles.development}`}></div>
                <span>In Development ({communities.filter(c => c.status === 'In Development').length})</span>
              </div>
            </div>
            
            <div className={styles.mapContainer}>
              {MapContainer && mapLoaded ? (
                <MapContainer
                  center={[30.5, -82.5]} // Center on southeast US
                  zoom={6}
                  style={{ height: '500px', width: '100%', borderRadius: '20px' }}
                  zoomControl={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <MapBounds communities={filteredCommunities} />
                  {filteredCommunities.map((community) => (
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
                              {getInvestmentStatus(community.status, community.occupancy)}
                            </div>
                          </div>
                          <p className={styles.popupLocation}>{community.location}, {community.state}</p>
                          <div className={styles.popupStats}>
                            <div className={styles.popupStat}>
                              <span className={styles.popupStatValue}>{community.units}</span>
                              <span className={styles.popupStatLabel}>Units</span>
                            </div>
                            <div className={styles.popupStat}>
                              <span className={styles.popupStatValue}>
                                {community.occupancy ? `${community.occupancy}%` : 'TBD'}
                              </span>
                              <span className={styles.popupStatLabel}>Occupancy</span>
                            </div>
                          </div>
                          {community.website && (
                            <a 
                              href={`https://${community.website}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className={styles.popupWebsite}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {community.website}
                            </a>
                          )}
                          <button className={styles.popupButton}>
                            Investment Details
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M6 8h4m0 0L8 6m2 2L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              ) : (
                <div className={styles.mapPlaceholder}>
                  <p>Loading Interactive Map...</p>
                  {!mapLoaded && <div className={styles.loadingSpinner}></div>}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Communities Grid */}
      {mapView === 'list' && (
        <section className={styles.communitiesGrid}>
          <div className={styles.container}>
            <div className={styles.grid}>
              {filteredCommunities.map((community, index) => (
                <div key={community.id} className={styles.communityCard} style={{'--index': index} as React.CSSProperties}>
                  <div className={styles.imageWrapper}>
                    <div 
                      className={styles.communityImage}
                      style={{ backgroundImage: `url(${community.imageUrl})` }}
                    >
                      <div className={styles.imageOverlay} />
                      <div className={`${styles.status} ${
                        community.status === 'Completed' && community.occupancy && community.occupancy >= 90 ? styles.statusStabilized :
                        community.status === 'Completed' && community.occupancy && community.occupancy < 90 ? styles.statusLeaseUp :
                        community.status === 'Under Construction' ? styles.statusConstruction : 
                        styles.statusDevelopment
                      }`}>
                        {getInvestmentStatus(community.status, community.occupancy)}
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <h3 className={styles.communityName}>{community.name}</h3>
                      <p className={styles.location}>{community.location}, {community.state}</p>
                    </div>
                    
                    <div className={styles.keyMetrics}>
                      <div className={styles.metricItem}>
                        <span className={styles.metricValue}>{community.units}</span>
                        <span className={styles.metricLabel}>Units</span>
                      </div>
                      <div className={styles.metricItem}>
                        <span className={styles.metricValue}>
                          {community.occupancy ? `${community.occupancy}%` : 'TBD'}
                        </span>
                        <span className={styles.metricLabel}>Occupancy</span>
                      </div>
                      <div className={styles.metricItem}>
                        <span className={styles.metricValue}>{community.yearCompleted}</span>
                        <span className={styles.metricLabel}>Delivery</span>
                      </div>
                    </div>
                    
                    {community.website && (
                      <div className={styles.websiteLink}>
                        <a 
                          href={`https://${community.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {community.website}
                        </a>
                      </div>
                    )}
                    
                    <div className={`${styles.cardHover} ${styles.visible}`}>
                      <button className={styles.viewButton}>
                        Investment Details
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M7 10L12 10M12 10L9 7M12 10L9 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pulse animation CSS */}
      <style>{`
  @keyframes pulse {
    0% { transform: scale(1); opacity: 0.3; }
    50% { transform: scale(1.2); opacity: 0.1; }
    100% { transform: scale(1); opacity: 0.3; }
  }
`}</style>
    </div>
  );
};

export default CommunitiesPage;