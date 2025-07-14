// src/Pages/HomePage.tsx
import React from 'react';
import Hero from '../components/Hero';
import WhoWeAre from '../components/WhoWeAre/WhoWeAre';
import CommunitiesSection from '../components/CommunitiesSection';
import MissionSection from '../components/MissionSection';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <MissionSection />
      <CommunitiesSection />
    </>
  );
};

export default HomePage;