import React from 'react';
import profileImage from '../Images/ProfileHUDSOnPixar.png';

export default function ProfileSection() {
  return (
    <section className="panel about-profile-grid">
      <div className="about-image-frame">
        <img src={profileImage} alt="Hudson Chia" className="about-profile-image" />
      </div>

      <div className="about-copy-block">
        <h2>Hudson Chia</h2>
        <p>
          I am a Computer Science student with a Data Analytics focus who enjoys building systems that
          feel structured, practical, and easy to understand. I like work that connects logic,
          execution, and visual clarity.
        </p>
        <p>
          My preferred way of presenting information is simple: show the most important idea first,
          then let people click to explore the details page by page.
        </p>
        <div className="about-tags">
          <span className="tag">Computer Science</span>
          <span className="tag">Data Analytics</span>
          <span className="tag">Interactive Portfolio</span>
          <span className="tag">Structured Thinking</span>
        </div>
      </div>
    </section>
  );
}
