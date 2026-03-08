import React from 'react';
import './education.css';
import EducationCard from './EducationCard';
import EducationDetail from './EducationDetail';
import educationItems from '../Data/education';

export default function Education() {
  const mainEducation = educationItems[0];

  return (
    <section className="page-shell">
      <div className="content-wrap education-wrap">
        <div>
          <div className="section-kicker">Education</div>
          <h1 className="page-title">
            Academic <span>Profile</span>
          </h1>
          <p className="page-intro">
            Education stays independent here. This page is only for academic background and current
            study focus.
          </p>
        </div>

        <EducationCard item={mainEducation} />
        <EducationDetail item={mainEducation} />
      </div>
    </section>
  );
}
