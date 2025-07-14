// src/components/AboutSection/AboutSection.tsx
import React from 'react';
import styles from './WhoWeAre.module.scss';

const WhoWeAre: React.FC = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.aboutWrapper}>
          <div className={styles.aboutContent}>
            <h2 className={styles.aboutTitle}>Who We Are</h2>
            
            <div className={styles.aboutText}>
              <p className={styles.leadParagraph}>
                <strong>Hillpointe's principals have decades of collective experience in developing, 
                constructing, financing, and managing multifamily assets across the Sun Belt. The firm's fully 
                integrated approach and ability to deliver real estate assets at a highly 
                attractive cost basis provide a unique competitive advantage versus other 
                real estate investments.</strong>
              </p>
              
              <p className={styles.bodyParagraph}>
      
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;