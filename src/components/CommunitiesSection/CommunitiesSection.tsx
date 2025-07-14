// CommunitiesSection.tsx
import React, { useState, useRef } from 'react';
import styles from './CommunitiesSection.module.scss';

interface Community {
  id: number;
  name: string;
  location: string;
  state: string;
  imageUrl: string;
  units: number;
  occupancy: number;
  yearBuilt: number;
  investmentHighlights: string[];
  status: 'Stabilized' | 'Lease-Up' | 'Under Construction' | 'In Development';
  capRate?: string;
  website?: string;
}

// Updated with investor-focused data
const featuredCommunities: Community[] = [
  {
    id: 1,
    name: 'Pointe Grand Palm Coast',
    location: 'Palm Coast, FL',
    state: 'FL',
    imageUrl: '/Images/Palm-Coast.jpeg',
    units: 280,
    occupancy: 95,
    yearBuilt: 2023,
    investmentHighlights: ['95% Occupied', 'Strong Demographics', 'High Growth Market'],
    status: 'Stabilized',
    capRate: '6.2%',
    website: 'pointegrandpalmcoast.com'
  },
  {
    id: 2,
    name: 'Pointe Grand Dawsonville',
    location: 'Dawsonville, GA',
    state: 'GA',
    imageUrl: '/Images/Dawsonville.jpg',
    units: 300,
    occupancy: 78,
    yearBuilt: 2024,
    investmentHighlights: ['Premium Location', 'Rapid Lease-Up', 'Atlanta MSA'],
    status: 'Lease-Up',
    website: 'pointegranddawsonville.com'
  },
  {
    id: 3,
    name: 'Pointe Grand Brunswick',
    location: 'Brunswick, GA',
    state: 'GA',
    imageUrl: '/Images/Brunswick.jpg',
    units: 264,
    occupancy: 0,
    yearBuilt: 2025,
    investmentHighlights: ['Coastal Market', 'Q2 2025 Delivery', 'Pre-Leasing Soon'],
    status: 'Under Construction',
    website: 'pointegrandbrunswick.com'
  }
];

const CommunitiesSection: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const getStatusClass = (status: Community['status']) => {
    switch (status) {
      case 'Stabilized': return styles.statusStabilized;
      case 'Lease-Up': return styles.statusLeaseUp;
      case 'Under Construction': return styles.statusConstruction;
      case 'In Development': return styles.statusDevelopment;
      default: return '';
    }
  };

  const getStatusIcon = (status: Community['status']) => {
    switch (status) {
      case 'Stabilized':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'Lease-Up':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2V8L11 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'Under Construction':
      case 'In Development':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2L14 8L8 14L2 8L8 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
    }
  };

  return (
    <section className={styles.communitiesSection} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Portfolio <span className={styles.highlight}>Highlights</span>
          </h2>
          <p className={styles.subtitle}>
            Strategic workforce housing developments across high-growth Sun Belt markets, 
            delivering consistent returns through operational excellence.
          </p>
        </div>

        <div className={styles.communitiesGrid}>
          {featuredCommunities.map((community, index) => (
            <div
              key={community.id}
              className={styles.communityCard}
              style={{ '--index': index } as React.CSSProperties}
              onMouseEnter={() => setHoveredCard(community.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={styles.imageWrapper}>
                <div 
                  className={styles.communityImage}
                  style={{ backgroundImage: `url(${community.imageUrl})` }}
                >
                  <div className={styles.imageOverlay} />
                  <span className={`${styles.status} ${getStatusClass(community.status)}`}>
                    {getStatusIcon(community.status)}
                    {community.status}
                  </span>
                </div>
              </div>
              
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.communityName}>{community.name}</h3>
                  <p className={styles.location}>{community.location}</p>
                </div>

                <div className={styles.keyMetrics}>
                  <div className={styles.metricItem}>
                    <span className={styles.metricValue}>{community.units}</span>
                    <span className={styles.metricLabel}>Units</span>
                  </div>
                  <div className={styles.metricItem}>
                    <span className={styles.metricValue}>
                      {community.occupancy > 0 ? `${community.occupancy}%` : 'TBD'}
                    </span>
                    <span className={styles.metricLabel}>Occupancy</span>
                  </div>
                  <div className={styles.metricItem}>
                    <span className={styles.metricValue}>{community.yearBuilt}</span>
                    <span className={styles.metricLabel}>Delivery</span>
                  </div>
                </div>

                <div className={styles.highlights}>
                  {community.investmentHighlights.map((highlight, index) => (
                    <span key={index} className={styles.highlight}>{highlight}</span>
                  ))}
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

                <div className={`${styles.cardActions} ${hoveredCard === community.id ? styles.visible : ''}`}>
                  <button className={styles.detailsButton}>
                    Investment Details
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.portfolioSummary}>
          <div className={styles.summaryStats}>
            <div className={styles.statBlock}>
              <span className={styles.statNumber}>30+</span>
              <span className={styles.statText}>Communities</span>
            </div>
            <div className={styles.statBlock}>
              <span className={styles.statNumber}>10,000+</span>
              <span className={styles.statText}>Units</span>
            </div>
            <div className={styles.statBlock}>
              <span className={styles.statNumber}>$2.1B</span>
              <span className={styles.statText}>AUM</span>
            </div>
          </div>
          
          <a href="/communities" className={styles.viewPortfolioButton}>
            <span>View Full Portfolio</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CommunitiesSection;