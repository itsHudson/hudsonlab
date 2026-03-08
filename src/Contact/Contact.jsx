import React from 'react';
import './contact.css';
import GlowButton from '../Shared/GlowButton';

export default function Contact() {
  return (
    <section className="section-shell contact-shell">
      <div className="contact-panel glass-panel">
        <span className="section-tag">Contact</span>
        <h2 className="section-title">Open the next conversation.</h2>
        <p className="section-subtitle">
          Replace the placeholders below with your real links, email, and GitHub project
          destinations when you are ready to publish.
        </p>

        <div className="contact-links">
          <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:your-email@example.com">Email</a>
        </div>

        <div className="contact-actions">
          <GlowButton>Download Resume</GlowButton>
          <GlowButton ghost>Open Portfolio PDF</GlowButton>
        </div>
      </div>
    </section>
  );
}
