import React from 'react';
import './contact.css';

const links = [
  {
    label: 'GitHub',
    value: 'github.com/itshudson',
    href: 'https://github.com/itshudson',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/hudsonc200',
    href: 'https://www.linkedin.com/in/hudsonc200/',
  },
  {
    label: 'Email',
    value: 'Update with your preferred public email',
    href: 'mailto:your-email@example.com',
  },
];

export default function Contact() {
  return (
    <section className="page-shell">
      <div className="content-wrap contact-wrap">
        <div>
          <div className="section-kicker">Contact</div>
          <h1 className="page-title">
            Let’s <span>Connect</span>
          </h1>
          <p className="page-intro">
            A simple contact page with no extra categories mixed in. Use this section only for direct
            connection points.
          </p>
        </div>

        <section className="contact-grid">
          {links.map((item) => (
            <a key={item.label} className="panel contact-card" href={item.href} target="_blank" rel="noreferrer">
              <strong>{item.label}</strong>
              <span>{item.value}</span>
            </a>
          ))}
        </section>
      </div>
    </section>
  );
}
