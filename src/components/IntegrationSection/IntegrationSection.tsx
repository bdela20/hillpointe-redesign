// src/components/IntegrationSection/IntegrationSection.tsx
import React, { useEffect, useRef, useState } from 'react';
import styles from './IntegrationSection.module.scss';

interface TimelineEvent {
  year: string;
  event: string;
}

const IntegrationSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleTimeline, setVisibleTimeline] = useState<number[]>([]);

  const timeline: TimelineEvent[] = [
    { year: '2018', event: 'Founded with a mission to solve workforce housing crisis' },
    { year: '2019', event: 'Established development strategy and team' },
    { year: '2020', event: 'First community opens in Orlando, FL' },
    { year: '2021', event: 'Expanded to 5 states across the Sun Belt' },
    { year: '2023', event: 'Reached 10,000 units in development' },
    { year: '2024', event: 'Closed $750M Fund V for continued growth' },
    { year: '2025', event: 'On track to house 50,000+ essential workers' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Timeline animation
  useEffect(() => {
    if (!isVisible) return;

    timeline.forEach((_, index) => {
      setTimeout(() => {
        setVisibleTimeline(prev => [...prev, index]);
      }, index * 200);
    });
  }, [isVisible]);

  return (
    <section className={styles.integrationSection} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.timeline}>
          <h2 className={styles.timelineTitle}>Our Journey</h2>
          <div className={styles.timelineWrapper}>
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`${styles.timelineItem} ${visibleTimeline.includes(index) ? styles.visible : ''}`}
              >
                <div className={styles.timelineYear}>{item.year}</div>
                <div className={styles.timelineText}>{item.event}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationSection;