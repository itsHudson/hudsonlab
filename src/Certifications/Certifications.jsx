import React from "react";
import "./certifications.css";
import certifications from "../Data/certifications";

export default function Certifications() {
  return (
    <section className="page-section">
      <span className="small-chip">Certifications</span>
      <h1 className="page-title">Certification Badges</h1>
      <p className="page-subtitle">
        This section focuses only on certification achievements and learning
        credentials.
      </p>

      <div className="cert-grid">
        {certifications.map((item) => (
          <div key={item.id} className="glass-card cert-card">
            <div className="visual-image-card cert-badge">
              <img src={item.image} alt={item.title} />
            </div>

            <div className="cert-copy">
              <h3>{item.title}</h3>
              <p>{item.issuer}</p>
              <span>{item.year}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}