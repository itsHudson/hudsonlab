import React, { useState } from 'react';
import './certifications.css';
import certifications from '../Data/certifications';
import CertificationGrid from './CertificationGrid';
import CertificationDetail from './CertificationDetail';

export default function Certifications() {
  const [selectedId, setSelectedId] = useState(certifications[0].id);
  const selected = certifications.find((item) => item.id === selectedId) || certifications[0];

  return (
    <section className="page-shell">
      <div className="content-wrap certifications-wrap">
        <div>
          <div className="section-kicker">Certifications</div>
          <h1 className="page-title">
            Badge <span>Gallery</span>
          </h1>
          <p className="page-intro">
            This page only contains certification items. Click a badge to preview the certificate
            details and issuing organization.
          </p>
        </div>

        <CertificationGrid
          items={certifications}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
        <CertificationDetail item={selected} />
      </div>
    </section>
  );
}
