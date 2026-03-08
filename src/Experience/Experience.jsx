import React from 'react';
import './experience.css';
import CareerTimeline from './CareerTimeline';

export default function Experience() {
  return (
    <section className="section-shell">
      <div className="section-header">
        <span className="section-tag">Experience</span>
        <h2 className="section-title">Professional track with leadership under pressure.</h2>
        <p className="section-subtitle">
          From service operations to management responsibility, the timeline below shows
          practical experience that shaped communication, resilience, and execution.
        </p>
      </div>
      <CareerTimeline />
    </section>
  );
}
