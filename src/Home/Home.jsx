import React from 'react';
import './home.css';
import ParticleBackground from './ParticleBackground';
import IntroText from './IntroText';
import TechGlobe from './TechGlobe';
import OrbitMenu from './OrbitMenu';

export default function Home({ onNavigate }) {
  return (
    <section className="home-shell">
      <ParticleBackground />
      <div className="home-grid">
        <IntroText onNavigate={onNavigate} />
        <div className="hero-orbit-zone">
          <TechGlobe />
          <OrbitMenu onNavigate={onNavigate} />
        </div>
      </div>
    </section>
  );
}
