import React from 'react';
import profileImage from '../Images/ProfileHUDSOnPixar.png';

export default function HeroIntro({ onNavigate }) {
  return (
    <section className="home-hero-grid">
      <div className="home-copy">
        <div className="section-kicker">Strategic Systems Builder</div>
        <h1 className="page-title">
          HUDSOn <span>CHIA</span>
        </h1>
        <p className="home-subtitle">Computer Science Student • Data Analytics • ENTJ</p>
        <p className="page-intro">
          A clean, image-led portfolio that reveals information step by step. Explore my profile,
          skill-driven projects, work background, education, certifications, and contact details
          through separate focused pages.
        </p>

        <div className="home-actions">
          <button className="glow-button primary" onClick={() => onNavigate('about')}>
            Enter Portfolio
          </button>
          <button className="glow-button" onClick={() => onNavigate('techexplorer')}>
            Explore Skills + Projects
          </button>
        </div>

        <div className="home-pill-row">
          <span className="tag">Clean category separation</span>
          <span className="tag">Interactive skill explorer</span>
          <span className="tag">Image-focused storytelling</span>
        </div>
      </div>

      <div className="home-visual panel">
        <div className="home-visual-glow" />
        <div className="home-profile-frame">
          <img src={profileImage} alt="Hudson Chia profile" className="home-profile-image" />
        </div>
        <div className="floating-mini-card top-card">
          <strong>Focus</strong>
          <span>Systems • Data • Web</span>
        </div>
        <div className="floating-mini-card bottom-card">
          <strong>Style</strong>
          <span>Structured, strategic, visual</span>
        </div>
      </div>
    </section>
  );
}
