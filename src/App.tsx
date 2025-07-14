// src/App.tsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./styles/global.scss";
import "./App.scss";
import 'leaflet/dist/leaflet.css';

// Components
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

// Pages
import HomePage from "./Pages/Homepage";
import AboutPage from "./Pages/AboutPage";
import CommunitiesPage from "./Pages/CommunitiesPage";
import InvestorsPage from "./Pages/InvestorsPage";
import TeamPage from "./Pages/TeamPage";
import MediaPage from "./Pages/MediaPage"

// Scroll restoration component
function ScrollRestoration() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  return (
    <Router>
      <ScrollRestoration />
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/communities" element={<CommunitiesPage />} />
          <Route path="/investors" element={<InvestorsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="media" element={<MediaPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;