import React from 'react';

export default function CertificationDetail({ item }) {
  return (
    <section className="panel cert-detail-panel">
      <div className="cert-detail-top">
        <img src={item.image} alt={item.title} className="cert-detail-image" />
        <div>
          <div className="section-kicker">Certificate Detail</div>
          <h2>{item.title}</h2>
          <p className="cert-detail-subtitle">{item.issuer} • {item.year}</p>
          <p className="cert-detail-text">{item.description}</p>
        </div>
      </div>
    </section>
  );
}
