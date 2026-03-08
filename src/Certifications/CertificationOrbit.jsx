import React from 'react';
import badgeCCNA from '../Images/Badge_CCNAITN.png';
import badgeDAE from '../Images/Badge_DAE.png';
import badgeITC from '../Images/Badge_ITC.png';
import badgeITDS from '../Images/Badge_ITDS.png';
import badgeNALAT from '../Images/Badge_NALAT.png';
import badgeRHSA1 from '../Images/Badge_RHSA1.png';
import badgeRHSA2 from '../Images/Badge_RHSA2.png';

const badges = [
  { name: 'CCNA v7: Introduction to Networks', image: badgeCCNA },
  { name: 'Data Analytics Essentials', image: badgeDAE },
  { name: 'Introduction to Cybersecurity', image: badgeITC },
  { name: 'Introduction to Data Science', image: badgeITDS },
  { name: 'Learn-A-Thon 2025', image: badgeNALAT },
  { name: 'Red Hat System Administration I', image: badgeRHSA1 },
  { name: 'Red Hat System Administration II', image: badgeRHSA2 }
];

export default function CertificationOrbit() {
  return (
    <div className="cert-grid">
      {badges.map((badge, index) => (
        <article
          key={badge.name}
          className="glass-panel cert-item"
          style={{ animationDelay: `${index * 0.12}s` }}
        >
          <div className="cert-image-wrap">
            <img src={badge.image} alt={badge.name} />
          </div>
          <h3>{badge.name}</h3>
        </article>
      ))}
    </div>
  );
}
