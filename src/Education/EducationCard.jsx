import React from 'react';

export default function EducationCard({ item }) {
  return (
    <section className="panel education-card-shell">
      <img src={item.image} alt={item.school} className="education-card-image" />
      <div className="education-card-copy">
        <strong>{item.school}</strong>
        <span>{item.program}</span>
        <p>{item.period}</p>
      </div>
    </section>
  );
}
