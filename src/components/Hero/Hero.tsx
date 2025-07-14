// Hero.tsx - Streamlined Investor-Focused Version
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Hero.module.scss';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExploreCommunities = () => {
    navigate('/communities');
  };

  const handlePartnerWithUs = () => {
    navigate('/investors');
  };

  return (
    <section className={styles.hero}>
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.gradientOrb} />
        <div className={styles.gridPattern} />
        <div 
          className={styles.parallaxLayer} 
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        
        {/* Canvas Background Photo Container */}
        <div className={styles.canvasBackgroundContainer}>
          {/* Add your Canvas-created background image here */}
          {/* Example: <img src="/path/to/your/canvas-image.jpg" alt="Background" className={styles.canvasBackground} /> */}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          {/* Main Headline */}
          <h1 className={styles.headline}>
            <span className={styles.line1}>BUILDING</span>
            <span className={styles.line2}>TOMORROW'S</span>
            <span className={styles.line3}>
              <span className={styles.gradient}>COMMUNITIES</span>
            </span>
          </h1>
          
          <p className={styles.subheadline}>
            A fully integrated real estate development and 
            <span className={styles.highlight}> investment management firm.</span>
          </p>
          
          {/* CTA Buttons */}
          <div className={styles.ctaGroup}>
            <button className={styles.primaryCta} onClick={handlePartnerWithUs}>
              <span className={styles.ctaText}>Investment Opportunities</span>
              <div className={styles.ctaGlow} />
            </button>
            <button className={styles.secondaryCta} onClick={handleExploreCommunities}>
              View Portfolio
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Investment Dashboard - Cleaner & Focused */}
        <div className={styles.investmentDashboard}>
          <div className={styles.investmentCard}>
            <h2 className={styles.cardTitle}>Investment Focus</h2>
            
            {/* Development Excellence */}
            <div className={styles.focusItem}>
              <div className={styles.iconWrapper}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <div className={styles.focusContent}>
                <h3 className={styles.focusTitle}>Development Excellence</h3>
                <p className={styles.focusDescription}>
                  Ground-up workforce housing communities
                </p>
              </div>
            </div>

            {/* Investment Management */}
            <div className={styles.focusItem}>
              <div className={styles.iconWrapper}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <div className={styles.focusContent}>
                <h3 className={styles.focusTitle}>Investment Management</h3>
                <p className={styles.focusDescription}>
                  Institutional-grade asset management
                </p>
              </div>
            </div>

            {/* Sun Belt Markets */}
            <div className={styles.focusItem}>
              <div className={styles.iconWrapper}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="7"/>
                  <line x1="12" y1="17" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="7.76" y2="7.76"/>
                  <line x1="16.24" y1="16.24" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="7" y2="12"/>
                  <line x1="17" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="7.76" y2="16.24"/>
                  <line x1="16.24" y1="7.76" x2="19.78" y2="4.22"/>
                </svg>
              </div>
              <div className={styles.focusContent}>
                <h3 className={styles.focusTitle}>Sun Belt Markets</h3>
                <p className={styles.focusDescription}>
                  High-growth southeastern markets
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
        <span className={styles.scrollText}>Discover More</span>
      </div>
    </section>
  );
};

export default Hero;