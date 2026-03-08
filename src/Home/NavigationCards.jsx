import React from "react";

const items = [
  {
    key: "about",
    title: "About",
    text: "Learn more about who I am, my mindset, and my professional direction."
  },
  {
    key: "tech",
    title: "Tech Explorer",
    text: "Explore skills through an interactive orbit and view related projects."
  },
  {
    key: "experience",
    title: "Experience",
    text: "View my work roles, responsibilities, and practical exposure."
  },
  {
    key: "education",
    title: "Education",
    text: "See my academic background and specialization."
  },
  {
    key: "certifications",
    title: "Certifications",
    text: "Browse my certification badges and professional learning progress."
  },
  {
    key: "contact",
    title: "Contact",
    text: "Find my public links and ways to connect."
  }
];

export default function NavigationCards({ navigate }) {
  return (
    <div className="home-nav-grid">
      {items.map((item) => (
        <button
          key={item.key}
          className="glass-card home-nav-card"
          onClick={() => navigate(item.key)}
        >
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <span className="home-nav-arrow">View More →</span>
        </button>
      ))}
    </div>
  );
}