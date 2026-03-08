import React from 'react';

export default function CertificationGrid({ items, selectedId, onSelect }) {
  return (
    <section className="cert-grid">
      {items.map((item) => (
        <button
          key={item.id}
          className={`cert-card panel ${item.id === selectedId ? 'active' : ''}`}
          onClick={() => onSelect(item.id)}
        >
          <img src={item.image} alt={item.title} className="cert-card-image" />
          <strong>{item.shortTitle}</strong>
          <span>{item.issuer}</span>
        </button>
      ))}
    </section>
  );
}
