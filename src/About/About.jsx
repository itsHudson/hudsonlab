import React from 'react';
import './about.css';
import ProfileSection from './ProfileSection';
import PersonalityENTJ from './PersonalityENTJ';
import GoalsSection from './GoalsSection';

export default function About({ onNavigate }) {
  return (
    <section className="page-shell">
      <div className="content-wrap about-wrap">
        <div>
          <div className="section-kicker">About</div>
          <h1 className="page-title">
            Personal <span>Profile</span>
          </h1>
          <p className="page-intro">
            This page only focuses on identity, mindset, and direction. No certifications, no work
            experience, and no project details are mixed in here.
          </p>
        </div>

        <ProfileSection />
        <PersonalityENTJ />
        <GoalsSection onNavigate={onNavigate} />
      </div>
    </section>
  );
}
