// PageTransition.tsx
import React, { useEffect, useRef } from 'react';
import styles from './PageTransition.module.scss';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial page load animation
    if (transitionRef.current) {
      transitionRef.current.classList.add(styles.loaded);
    }

    // Smooth scroll behavior for anchor links
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.slice(1);
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);

    return () => {
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, []);

  return (
    <div ref={transitionRef} className={styles.pageTransition}>
      <div className={styles.loadingOverlay}>
        <div className={styles.loader}>
          <div className={styles.loaderBar}></div>
          <div className={styles.loaderText}>HILLPOINTE</div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default PageTransition;

// SectionTransition.tsx - For individual section animations
import React, { useEffect, useRef, useState } from 'react';
import styles from './SectionTransition.module.scss';

interface SectionTransitionProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({ 
  children, 
  direction = 'up',
  delay = 0 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={sectionRef}
      className={`${styles.sectionTransition} ${styles[direction]} ${isVisible ? styles.visible : ''}`}
    >
      {children}
    </div>
  );
};

// Updated App.tsx with transitions
import React, { useEffect } from 'react';
import Navigation from '../Navigation';
import Hero from '../Hero';
import MetricsSection from '../MetricsSection';
import IntegrationSection from '../IntegrationSection';
import CommunitiesSection from '../CommunitiesSection';
import MissionSection from '../MissionSection';
import Footer from '../Footer';
import PageTransition, { SectionTransition } from './components/PageTransition';
import './App.scss';

function App() {
  useEffect(() => {
    // Add smooth scroll CSS
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Parallax scrolling effect
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      
      parallaxElements.forEach((element) => {
        const speed = element.getAttribute('data-parallax') || '0.5';
        const yPos = -(scrolled * parseFloat(speed));
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <PageTransition>
      <div className="App">
        <Navigation />
        
        <SectionTransition direction="fade">
          <Hero />
        </SectionTransition>
        
        <SectionTransition direction="up" delay={100}>
          <MetricsSection />
        </SectionTransition>
        
        <SectionTransition direction="up" delay={100}>
          <IntegrationSection />
        </SectionTransition>
        
        <SectionTransition direction="up" delay={100}>
          <CommunitiesSection />
        </SectionTransition>
        
        <SectionTransition direction="up" delay={100}>
          <MissionSection />
        </SectionTransition>
        
        <SectionTransition direction="up" delay={100}>
          <Footer />
        </SectionTransition>
      </div>
    </PageTransition>
  );
}

export default App;