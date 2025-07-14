import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import HillpointeLogo from '../../assets/Images/Letter.svg';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.glowLine}></div>
      
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Company Info Section */}
          <div className={styles.companySection}>
            <Link to="/" className={styles.logoContainer}>
              <img src={HillpointeLogo} alt="Hillpointe" className={styles.logoMark} />
              <h3 className={styles.logoText}>HILLPOINTE</h3>
            </Link>
            <p className={styles.tagline}>
              Institutional quality affordable housing with a human heart
            </p>
            
            {/* Contact Info */}
            <div className={styles.contactInfo}>
              <a href="mailto:info@hillpointe.com" className={styles.contactLink}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                info@hillpointe.com
              </a>
              <a href="tel:+14077529004" className={styles.contactLink}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                407.752.9004
              </a>
            </div>
            
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>$750M</span>
                <span className={styles.statLabel}>Fund V</span>
              </div>
              
              {/* NEW: Small NMHC Rankings */}
              <div className={styles.rankings}>
                <a 
                  href="https://www.nmhc.org/research-insight/the-nmhc-50/top-50-lists/2025-top-developers-list#100984"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.rankingLink}
                >
                  <span className={styles.rankNumber}>#4</span>
                  <span className={styles.rankText}>Developer</span>
                </a>
                <a 
                  href="https://www.nmhc.org/research-insight/the-nmhc-50/top-50-lists/2025-top-builders-list#100984"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.rankingLink}
                >
                  <span className={styles.rankNumber}>#6</span>
                  <span className={styles.rankText}>Builder</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linksSection}>
            <h4 className={styles.sectionTitle}>Company</h4>
            <ul className={styles.linksList}>
              <li><Link to="/about" className={styles.link}>About Us</Link></li>
              <li><Link to="/communities" className={styles.link}>Portfolio</Link></li>
              <li><Link to="/about#team" className={styles.link}>Leadership</Link></li>
              <li><a href="#careers" className={styles.link}>Careers</a></li>
              <li><a href="#news" className={styles.link}>News</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className={styles.linksSection}>
            <h4 className={styles.sectionTitle}>Resources</h4>
            <ul className={styles.linksList}>
              <li><a href="#residents" className={styles.link}>For Residents</a></li>
              <li><Link to="/investors" className={styles.link}>For Investors</Link></li>
              <li><a href="#brokers" className={styles.link}>For Brokers</a></li>
              <li><a href="#sustainability" className={styles.link}>Sustainability</a></li>
              <li><a href="#impact" className={styles.link}>Impact Report</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className={styles.newsletterSection}>
            <h4 className={styles.sectionTitle}>Stay Connected</h4>
            <p className={styles.newsletterText}>
              Get insights into affordable housing development and investment opportunities.
            </p>
            <form onSubmit={handleSubmit} className={styles.newsletterForm}>
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.emailInput}
                  required
                />
                <button type="submit" className={styles.submitButton}>
                  <span>Subscribe</span>
                  <svg 
                    className={styles.arrow} 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none"
                  >
                    <path 
                      d="M5 12H19M19 12L12 5M19 12L12 19" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
          <div className={styles.bottomContent}>
            <div className={styles.socialLinks}>
              <a 
                href="https://www.linkedin.com/company/hillpointe/" 
                className={styles.socialLink} 
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/hillpointellc/" 
                className={styles.socialLink} 
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                </svg>
              </a>
            </div>

            <div className={styles.legal}>
              <a href="#privacy" className={styles.legalLink}>Privacy Policy</a>
              <span className={styles.separator}>|</span>
              <a href="#terms" className={styles.legalLink}>Terms of Service</a>
              <span className={styles.separator}>|</span>
              <a href="#accessibility" className={styles.legalLink}>Accessibility</a>
            </div>

            <div className={styles.copyright}>
              <p>&copy; Copyright © 2025 Hillpointe All Rights Reserved. Legal Disclaimer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className={styles.backgroundEffects}>
        <div className={styles.grid}></div>
        <div className={styles.glow1}></div>
        <div className={styles.glow2}></div>
      </div>
    </footer>
  );
};

export default Footer;