import React from 'react';
import entjImage from '../Images/MBTI_ENTJ.png';

export default function PersonalityENTJ() {
  const traits = [
    'Strategic decision making',
    'Natural preference for structure',
    'Clear execution mindset',
    'Comfortable leading systems and processes',
  ];

  return (
    <section className="panel entj-grid">
      <div className="entj-copy">
        <div className="section-kicker">Personality</div>
        <h2>ENTJ Work Style</h2>
        <p>
          ENTJ traits align well with how I approach technology: plan clearly, organize the system,
          and move efficiently toward the result. I like interfaces and workflows that feel intentional
          rather than overloaded.
        </p>
        <ul className="entj-list">
          {traits.map((trait) => (
            <li key={trait}>{trait}</li>
          ))}
        </ul>
      </div>

      <div className="entj-image-frame">
        <img src={entjImage} alt="ENTJ personality visual" className="entj-image" />
      </div>
    </section>
  );
}
