import React from 'react';
import eduImage from '../Images/Edu_APU.png';

const educationItems = [
  {
    school: 'Asia Pacific University of Technology and Innovation (APU / APIIT)',
    program: 'Bachelor of Science (Honours) in Computer Science with a specialism in Data Analytics',
    period: 'Jun 2024 - Jun 2027',
    description:
      'Building strong technical foundations in systems design, programming, software evaluation, and data analytics concepts.',
    highlight: 'Python · Java · C++ · DBMS · SAS · HTML · CSS'
  },
  {
    school: 'UCSI University',
    program: 'Diploma in Management',
    period: 'May 2018 - May 2020',
    description:
      'Developed business and management fundamentals, including operations, communication, and decision-making thinking.',
    highlight: 'Communication · Business Management · Finance · MySQL · Microsoft SQL Server'
  }
];

export default function EducationTimeline() {
  return (
    <div className="education-layout glass-panel">
      <div className="education-visual">
        <img src={eduImage} alt="APU" />
      </div>
      <div className="education-track">
        <div className="education-line" />
        {educationItems.map((item) => (
          <article key={item.school} className="education-node">
            <span className="education-pulse" />
            <div className="education-card glass-panel">
              <span className="education-period">{item.period}</span>
              <h3>{item.school}</h3>
              <h4>{item.program}</h4>
              <p>{item.description}</p>
              <strong>{item.highlight}</strong>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
