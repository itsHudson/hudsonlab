import React from "react";

export default function ExperienceCard({ item }) {
  return (
    <div className="glass-card experience-card">
      <div className="visual-image-card experience-image">
        <img src={item.image} alt={item.company} />
      </div>

      <div className="experience-copy">
        <h2>{item.company}</h2>
        <h3>{item.role}</h3>
        <p className="experience-period">{item.period}</p>

        <ul className="info-list">
          {item.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}