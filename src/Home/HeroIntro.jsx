import React from "react";
import profileImage from "../Images/ProfileHUDSOnPixar.png";

export default function HeroIntro({ navigate }) {
  return (
    <div className="home-hero-grid">
      <div className="home-hero-copy">
        <span className="small-chip">Interactive Portfolio</span>

        <h1 className="home-title">
          HUDSON <span>CHIA</span>
        </h1>

        <p className="home-role">
          Computer Science Student · Data Analytics · Structured Problem Solver
        </p>

        <p className="home-description">
          I build practical software systems, explore data-driven solutions, and
          connect technical skills with real academic and professional work.
        </p>

        <div className="home-actions">
          <button className="primary-btn" onClick={() => navigate("about")}>
            View About
          </button>
          <button className="secondary-btn" onClick={() => navigate("tech")}>
            Open Tech Explorer
          </button>
        </div>

        <div className="home-mini-stats">
          <div className="glass-card stat-card">
            <strong>Style</strong>
            <span>Clean · Interactive · Professional</span>
          </div>
          <div className="glass-card stat-card">
            <strong>Mindset</strong>
            <span>Strategic · Structured · Results-Oriented</span>
          </div>
        </div>
      </div>

      <div className="glass-card hero-profile-panel">
        <div className="visual-image-card hero-profile-image">
          <img src={profileImage} alt="Hudson Chia profile" />
        </div>
        <div className="hero-profile-meta">
          <h3>Hudson Chia</h3>
          <p>Focused on systems, web applications, and data-related solutions.</p>
        </div>
      </div>
    </div>
  );
}