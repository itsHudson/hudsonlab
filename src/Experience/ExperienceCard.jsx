import React from 'react';

export default function ExperienceCard({ item, active, onOpen }) {
  return (
    <button className={`experience-card panel ${active ? 'active' : ''}`} onClick={onOpen}>
      <img src={item.image} alt={item.company} className="experience-card-image" />
      <div className="experience-card-copy">
        <strong>{item.company}</strong>
        <span>{item.role}</span>
        <p>{item.period}</p>
      </div>
    </button>
  );
}
