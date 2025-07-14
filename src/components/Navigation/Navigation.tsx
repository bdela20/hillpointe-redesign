import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.scss';
import HillpointeLogo from '../../assets/Images/Letter.svg';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const aboutDropdownRef = useRef<HTMLLIElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isMobileMenuOpen || isLoginModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, isLoginModalOpen]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target as Node)) {
        setIsAboutDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Portfolio', href: '/communities' },
    { label: 'About', href: '/about', hasDropdown: true },
    { label: 'For Investors', href: '/investors' },
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAboutDropdownOpen(!isAboutDropdownOpen);
  };

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAboutDropdownOpen(false);
    setIsLoginModalOpen(true);
  };

  // Add function to scroll to footer
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAboutDropdownOpen(false);
    
    // Scroll to footer element
    const footerElement = document.querySelector('footer') || document.getElementById('footer');
    if (footerElement) {
      footerElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Mobile contact click handler
  const handleMobileContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleNavClick(); // Close mobile menu
    
    // Scroll to footer element
    const footerElement = document.querySelector('footer') || document.getElementById('footer');
    if (footerElement) {
      footerElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      <nav className={`${styles.navigation} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo}>
            <img src={HillpointeLogo} alt="Hillpointe" className={styles.logoIcon} />
            <div className={styles.logoContent}>
              <span className={styles.logoText}>HILLPOINTE</span>
              <span className={styles.logoTagline}>Workforce Housing</span>
            </div>
          </Link>

          <div className={styles.desktopNav}>
            <ul className={styles.navLinks}>
              {navLinks.map((link) => (
                <li 
                  key={link.href} 
                  ref={link.label === 'About' ? aboutDropdownRef : null} 
                  className={styles.navItem}
                >
                  {link.hasDropdown ? (
                    <>
                      <button 
                        className={`${styles.navLink} ${styles.navButton} ${location.pathname === link.href ? styles.active : ''}`}
                        onClick={handleAboutClick}
                      >
                        {link.label}
                        <svg 
                          className={`${styles.dropdownIcon} ${isAboutDropdownOpen ? styles.open : ''}`}
                          width="12" 
                          height="8" 
                          viewBox="0 0 12 8" 
                          fill="none"
                        >
                          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </button>
                      {link.label === 'About' && isAboutDropdownOpen && (
                        <div className={styles.dropdown}>
                          <Link 
                            to="/about" 
                            className={styles.dropdownLink}
                            onClick={() => setIsAboutDropdownOpen(false)}
                          >
                            Company Overview
                          </Link>
                          <Link 
                            to="/team" 
                            className={styles.dropdownLink}
                            onClick={() => setIsAboutDropdownOpen(false)}
                          >
                            Team
                          </Link>
                          <Link 
                            to="/media" 
                            className={styles.dropdownLink}
                            onClick={() => setIsAboutDropdownOpen(false)}
                          >
                            Media
                          </Link>
                          <button 
                            className={styles.dropdownLink}
                            onClick={handleContactClick}
                          >
                            Contact
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link 
                      to={link.href} 
                      className={`${styles.navLink} ${location.pathname === link.href ? styles.active : ''}`}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            
            <button 
              className={styles.ctaButton}
              onClick={handleLoginClick}
            >
              Login
            </button>
          </div>

          <button
            className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.active : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={styles.hamburger}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
{isMobileMenuOpen && (
  <>
    <div 
      className={styles.mobileMenuOverlay}
      onClick={() => setIsMobileMenuOpen(false)}
    />
    <div className={styles.mobileMenu}>
      <div className={styles.mobileMenuContent}>
        {navLinks.map((link) => (
          <div key={link.href}>
            {link.hasDropdown ? (
              <div className={styles.mobileDropdown}>
                <Link
                  to={link.href}
                  className={styles.mobileNavLink}
                  onClick={handleNavClick}
                >
                  {link.label}
                </Link>
                {link.label === 'About' && (
                  <>
                    <Link
                      to="/about"
                      className={`${styles.mobileNavLink} ${styles.subLink}`}
                      onClick={handleNavClick}
                    >
                      Company Overview
                    </Link>
                    <Link
                      to="/team"
                      className={`${styles.mobileNavLink} ${styles.subLink}`}
                      onClick={handleNavClick}
                    >
                      Team
                    </Link>
                    <Link
                      to="/media"
                      className={`${styles.mobileNavLink} ${styles.subLink}`}
                      onClick={handleNavClick}
                    >
                      Media
                    </Link>
                    <button
                      className={`${styles.mobileNavLink} ${styles.subLink}`}
                      onClick={handleMobileContactClick}
                    >
                      Contact
                    </button>
                  </>
                )}
              </div>
            ) : (
              <Link
                to={link.href}
                className={styles.mobileNavLink}
                onClick={handleNavClick}
              >
                {link.label}
              </Link>
            )}
          </div>
        ))}
        <button 
          className={styles.mobileCta}
          onClick={(e) => {
            handleNavClick();
            handleLoginClick(e);
          }}
        >
          Login
        </button>
      </div>
    </div>
  </>
)}

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
    </>
  );
};

export default Navigation;