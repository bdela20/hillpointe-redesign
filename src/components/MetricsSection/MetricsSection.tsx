// src/components/MetricsSection/MetricsSection.tsx
import React, { useEffect, useRef, useState } from 'react';
import styles from './MetricsSection.module.scss';
import { Link } from 'react-router-dom';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
}

const MetricsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [counts, setCounts] = useState<{ [key: string]: number }>({});

  const metrics = [
    {
      value: '10,000',
      suffix: '+',
      label: 'Units in Development',
      description: 'Modern homes being built for workforce families',
      targetValue: 10000
    },
    {
      prefix: '$',
      value: '2',
      suffix: 'B+',
      label: 'Total Asset Value',
      description: 'Portfolio value across all communities',
      targetValue: 2
    },
    {
      value: '30',
      label: 'Active Communities',
      description: 'Thriving neighborhoods across the Sun Belt',
      targetValue: 30
    },
    {
      value: '98',
      suffix: '%',
      label: 'Resident Satisfaction',
      description: 'Families who love calling Pointe Grand home',
      targetValue: 98
    },
    {
      value: '5',
      label: 'States Served',
      description: 'Strategic Sun Belt market presence',
      targetValue: 5
    },
    {
      value: '600',
      suffix: '+',
      label: 'Team Members',
      description: 'Dedicated professionals making it happen',
      targetValue: 600
    }
  ];

  // Initialize particles
  useEffect(() => {
    const particleArray: Particle[] = [];
    for (let i = 0; i < 20; i++) {
      particleArray.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: (Math.random() - 0.5) * 0.1
      });
    }
    setParticles(particleArray);
  }, []);

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => ({
          ...particle,
          x: (particle.x + particle.speedX + 100) % 100,
          y: (particle.y + particle.speedY + 100) % 100
        }))
      );
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for triggering animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Number counting animation
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const startTime = Date.now();

    const animateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      const newCounts: { [key: string]: number } = {};
      metrics.forEach(metric => {
        newCounts[metric.label] = Math.floor(metric.targetValue * progress);
      });

      setCounts(newCounts);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    animateCount();
  }, [isVisible]);

  const formatValue = (metric: typeof metrics[0]) => {
    const count = counts[metric.label] || 0;
    
    if (metric.label === 'Units in Development') {
      return count.toLocaleString();
    }
    
    return count.toString();
  };

  return (
    <section className={styles.metricsSection} ref={sectionRef}>
      {/* Particle Background */}
      <div className={styles.particleContainer}>
        {particles.map(particle => (
          <div
            key={particle.id}
            className={styles.particle}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.size / 4
            }}
          />
        ))}
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Building at Scale</h2>
          <p className={styles.subtitle}>
            Real impact, measured in real lives changed
          </p>
        </div>

        <div className={styles.metricsGrid}>
          {metrics.map((metric, index) => (
            <div 
              key={metric.label} 
              className={styles.metricCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.metricValue}>
                {metric.prefix}
                {isVisible ? formatValue(metric) : '0'}
                {metric.suffix}
              </div>
              <h3 className={styles.metricLabel}>{metric.label}</h3>
              <p className={styles.metricDescription}>{metric.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.ctaSection}>
          <p className={styles.ctaText}>
            Join us in solving the workforce housing crisis
          </p>
          <Link to="/investors" className={styles.ctaButton}>
  Learn About Partnership
</Link>
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;