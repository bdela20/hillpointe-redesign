// src/Pages/AboutPage.tsx
import React from "react";
import MetricsSection from "../components/MetricsSection";
import IntegrationSection from "../components/IntegrationSection";
import styles from "./AboutPage.module.scss";

const AboutPage: React.FC = () => {
  return (
    <>
      {/* About Hero Section */}
      <section className={styles.aboutHero}>
        <div className={styles.container}>
          <h1 className={styles.title}>Building Communities That Matter</h1>
          <p className={styles.subtitle}>
            As the #4 national developer, we're transforming workforce housing
            through institutional quality and a human heart.
          </p>
        </div>
      </section>
            {/* Who We Are Section */}
      <section className={styles.whoWeAre}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Who We Are</h2>
          <div className={styles.content}>
            <p>
              Hillpointe is a leading real estate investment and development
              company focused on creating exceptional multifamily communities.
              With over $750M in our latest fund and a portfolio spanning 30+
              communities, we're committed to providing quality workforce
              housing that enriches lives and strengthens communities.
            </p>
            <p>
              Our integrated approach combines development expertise, property
              management excellence, and a deep understanding of what makes
              communities thrive. From Georgia to Florida to South Carolina,
              we're building more than just apartments – we're creating homes
              where people can build their futures.
            </p>
            <p>
              In a crowded real estate investment landscape, Hillpointe brings 
              an owner-operator investment mindset to the institutional world. 
              We utilize a fully vertically integrated platform to create superior 
              risk-adjusted returns.
            </p>
          </div>
        </div>
      </section>

      {/* Moved sections from homepage */}
       <IntegrationSection />
      <MetricsSection />
      
    </>
  );
};

export default AboutPage;
