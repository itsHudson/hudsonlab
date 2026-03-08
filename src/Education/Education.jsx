import React from "react";
import "./education.css";
import educationData from "../Data/education";

export default function Education() {
  const item = educationData[0];

  return (
    <section className="page-section">
      <span className="small-chip">Education</span>
      <h1 className="page-title">Academic Background</h1>
      <p className="page-subtitle">
        This section focuses only on academic information, specialization, and
        study direction.
      </p>

      <div className="glass-card education-card section-grid-2">
        <div className="visual-image-card education-image">
          <img src={item.image} alt={item.institution} />
        </div>

        <div className="education-copy">
          <h2>{item.institution}</h2>
          <h3>{item.program}</h3>
          <p className="education-period">{item.period}</p>

          <ul className="info-list">
            {item.focusAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}