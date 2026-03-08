import React from 'react';
import profileImage from '../Images/ProfileHUDSOnPixar.png';

export default function ProfileCard() {
  return (
    <article className="glass-panel profile-card">
      <div className="profile-card-visual">
        <img src={profileImage} alt="Hudson Chia profile" />
      </div>
      <div className="profile-card-content">
        <h3>Hudson Chia</h3>
        <p className="profile-role">Computer Science Student · Data Analytics</p>
        <p>
          I enjoy designing systems that feel structured, practical, and purposeful.
          My background combines technical learning, customer-facing work experience,
          and a strong habit of improving workflows through analysis.
        </p>
        <div className="about-tags">
          <span>ENTJ</span>
          <span>Systems Thinking</span>
          <span>Data Analytics</span>
          <span>Leadership</span>
        </div>
      </div>
    </article>
  );
}
