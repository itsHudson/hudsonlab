import React from 'react';
import './education.css';
import EducationTimeline from './EducationTimeline';

export default function Education() {
  return (
    <section className="section-shell">
      <div className="section-header">
        <span className="section-tag">Education</span>
        <h2 className="section-title">Academic path visualized as signal lines.</h2>
        <p className="section-subtitle">
          Education is presented as a clean timeline beam, keeping the visual language of
          the website futuristic while still showing your academic progression clearly.
        </p>
      </div>
      <EducationTimeline />
    </section>
  );
}
