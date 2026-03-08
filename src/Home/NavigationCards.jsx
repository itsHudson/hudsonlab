import React from 'react';

const cards = [
  {
    title: 'About',
    page: 'about',
    text: 'Personal profile, mindset, work style, and goals.',
  },
  {
    title: 'Tech Explorer',
    page: 'techexplorer',
    text: 'Interactive skill orbit connected directly to related projects.',
  },
  {
    title: 'Experience',
    page: 'experience',
    text: 'Preview work history and open individual role details.',
  },
  {
    title: 'Education',
    page: 'education',
    text: 'Academic profile and current specialization.',
  },
  {
    title: 'Certifications',
    page: 'certifications',
    text: 'Badge-led certification gallery with clean category separation.',
  },
  {
    title: 'Contact',
    page: 'contact',
    text: 'Connect through GitHub, LinkedIn, or email.',
  },
];

export default function NavigationCards({ onNavigate }) {
  return (
    <section className="home-links-section">
      <div className="section-kicker">Quick Access</div>
      <div className="home-link-grid">
        {cards.map((card) => (
          <button key={card.page} className="home-link-card panel" onClick={() => onNavigate(card.page)}>
            <div className="home-link-top">
              <strong>{card.title}</strong>
              <span>View</span>
            </div>
            <p>{card.text}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
