// MissionSection.tsx
import React, { useEffect, useRef, useState } from 'react';
import styles from './MissionSection.module.scss';

const MissionSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    workers: 0,
    saved: 0,
    commute: 0
  });
  const [hoveredFounder, setHoveredFounder] = useState<string | null>(null);

  // Intersection Observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isVisible) {
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
  }, [isVisible]);

  // Counter animation
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2500;
    const startTime = Date.now();

    const targets = {
      workers: 23000,
      saved: 312,
      commute: 17250  // Total hours saved daily by all workers
    };

    const animateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      setCounts({
        workers: Math.floor(targets.workers * progress),
        saved: Math.floor(targets.saved * progress),
        commute: Math.floor(targets.commute * progress)
      });

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    animateCount();
  }, [isVisible]);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const scrolled = window.scrollY;
      const rate = scrolled * -0.5;
      const videoElement = sectionRef.current.querySelector(`.${styles.videoBackground}`);
      
      if (videoElement) {
        (videoElement as HTMLElement).style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.missionSection} ref={sectionRef}>
      <div className={styles.videoBackground}>
        <video autoPlay muted loop playsInline>
          <source src="/videos/mission-background.mp4" type="video/mp4" />
        </video>
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Our Mission Is <span className={styles.highlight}>Personal</span>
          </h2>
        </div>

        <div className={styles.missionContent}>
          {/* CEO Statements - Fixed Structure */}
          <div className={styles.storySection}>
            <div className={styles.quoteBlock}>
              <div className={styles.founderImageWrapper}>
                <img 
                  src="/Images/Kelly-Mahoney.jpg" 
                  alt="Kelly Mahoney" 
                  className={`${styles.founderImage} ${hoveredFounder === 'kelly' ? styles.hovered : ''}`}
                  onMouseEnter={() => setHoveredFounder('kelly')}
                  onMouseLeave={() => setHoveredFounder(null)}
                />
                <div className={styles.founderInfo}>
                  <p className={styles.founderName}>Kelly Mahoney</p>
                  <p className={styles.founderTitle}>Co-Founder + Managing Partner</p>
                </div>
              </div>
              
              <div className={styles.quoteContent}>
                <div className={styles.quoteSymbol}>"</div>
                <blockquote className={styles.quote}>
                  "When a teacher has to drive 90 minutes to work because they can't afford 
                  to live in the community where they teach our children—that's not just a 
                  housing problem. It's a crisis of community."
                </blockquote>
              </div>
            </div>

            <div className={styles.quoteBlock}>
              <div className={styles.founderImageWrapper}>
                <img 
                  src="/Images/steven-campisi-scaled.jpg" 
                  alt="Steven Campisi" 
                  className={`${styles.founderImage} ${hoveredFounder === 'steven' ? styles.hovered : ''}`}
                  onMouseEnter={() => setHoveredFounder('steven')}
                  onMouseLeave={() => setHoveredFounder(null)}
                />
                <div className={styles.founderInfo}>
                  <p className={styles.founderName}>Steven Campisi</p>
                  <p className={styles.founderTitle}>Co-Founder + Managing Partner</p>
                </div>
              </div>
              
              <div className={styles.quoteContent}>
                <div className={styles.quoteSymbol}>"</div>
                <blockquote className={styles.quote}>
                  "We measure success not just in returns, but in the number of 
                  families who can finally say 'I can afford to live where I work."
                </blockquote>
              </div>
            </div>
          </div>

          <div className={styles.impactSection}>
            <div className={styles.impactContent}>
              <h3 className={styles.impactTitle}>Real Impact, Real Lives</h3>
              <div className={styles.impactStats}>
                <div className={styles.impactStat}>
                  <span className={styles.impactNumber}>{counts.workers.toLocaleString()}+</span>
                  <span className={styles.impactLabel}>Essential workers housed</span>
                </div>
                <div className={styles.impactStat}>
                  <span className={styles.impactNumber}>${counts.saved}M</span>
                  <span className={styles.impactLabel}>Saved in rent annually</span>
                </div>
                <div className={styles.impactStat}>
                  <span className={styles.impactNumber}>{counts.commute.toLocaleString()}+</span>
                  <span className={styles.impactLabel}>Hours saved</span>
                </div>
              </div>
              <p className={styles.impactText}>
                Every number represents a family that can now afford to live in the 
                community they serve. That's the difference we're making, one home at a time.
              </p>
            </div>
          </div>

        </div>

 
      </div>
    </section>
  );
};

export default MissionSection;