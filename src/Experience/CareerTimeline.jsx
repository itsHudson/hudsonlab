import React from 'react';
import workWebhelp from '../Images/Work_Webhelp.png';
import workCake from '../Images/Work_ACCakeHouse.png';

const careerData = [
  {
    role: 'Customer Service Executive',
    company: 'Webhelp',
    period: 'Sep 2023 - Dec 2023',
    image: workWebhelp,
    description:
      'Handled customer support, escalations, and issue resolution while maintaining service quality in a fast-paced environment.'
  },
  {
    role: 'Operation Outlet Manager',
    company: 'AC Cake House (M) Sdn. Bhd.',
    period: 'Jan 2022 - Aug 2023',
    image: workCake,
    description:
      'Led team operations, staff training, customer experience improvements, and outlet performance tracking.'
  }
];

export default function CareerTimeline() {
  return (
    <div className="career-track">
      {careerData.map((item) => (
        <article key={item.role} className="career-row glass-panel">
          <div className="career-image">
            <img src={item.image} alt={item.company} />
          </div>
          <div className="career-content">
            <span className="career-period">{item.period}</span>
            <h3>{item.role}</h3>
            <h4>{item.company}</h4>
            <p>{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
