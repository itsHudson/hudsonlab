import React from 'react';
import './about.css';
import ProfileCard from './ProfileCard';
import PersonalityENTJ from './PersonalityENTJ';

export default function About() {
  return (
    <section className="section-shell about-shell">
      <div className="section-header">
        <span className="section-tag">About</span>
        <h2 className="section-title">Strategic, analytical, and execution-focused.</h2>
        <p className="section-subtitle">
          HUDSONLAB presents Hudson Chia as a systems-minded student who blends data,
          problem solving, communication, and leadership into one digital identity.
        </p>
      </div>

      <div className="about-grid">
        <ProfileCard />
        <PersonalityENTJ />
      </div>
    </section>
  );
}
