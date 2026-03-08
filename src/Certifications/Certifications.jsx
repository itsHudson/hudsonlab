import React from 'react';
import './certifications.css';
import CertificationOrbit from './CertificationOrbit';

export default function Certifications() {
  return (
    <section className="section-shell">
      <div className="section-header">
        <span className="section-tag">Certifications</span>
        <h2 className="section-title">Badges arranged as a credentials galaxy.</h2>
        <p className="section-subtitle">
          Your Cisco and Red Hat certifications become visual objects, keeping the page
          dynamic while still making each credential easy to recognize.
        </p>
      </div>
      <CertificationOrbit />
    </section>
  );
}
