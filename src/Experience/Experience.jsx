import React, { useState } from 'react';
import './experience.css';
import experienceItems from '../Data/experience';
import ExperienceCard from './ExperienceCard';
import ExperienceDetail from './ExperienceDetail';

export default function Experience() {
  const [selectedId, setSelectedId] = useState(experienceItems[0].id);
  const selected = experienceItems.find((item) => item.id === selectedId) || experienceItems[0];

  return (
    <section className="page-shell">
      <div className="content-wrap experience-wrap">
        <div>
          <div className="section-kicker">Experience</div>
          <h1 className="page-title">
            Work <span>History</span>
          </h1>
          <p className="page-intro">
            This page only focuses on experience. Click a role preview to open more detailed
            responsibilities and achievements.
          </p>
        </div>

        <div className="experience-grid">
          <div className="experience-list">
            {experienceItems.map((item) => (
              <ExperienceCard
                key={item.id}
                item={item}
                active={item.id === selectedId}
                onOpen={() => setSelectedId(item.id)}
              />
            ))}
          </div>

          <ExperienceDetail item={selected} />
        </div>
      </div>
    </section>
  );
}
