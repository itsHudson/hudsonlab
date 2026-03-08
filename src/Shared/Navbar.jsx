import React from "react";

const navItems = [
  { key: "home", label: "Home" },
  { key: "about", label: "About" },
  { key: "tech", label: "Tech Explorer" },
  { key: "experience", label: "Experience" },
  { key: "education", label: "Education" },
  { key: "certifications", label: "Certifications" },
  { key: "contact", label: "Contact" }
];

export default function Navbar({ navigate, currentPage }) {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <button className="brand-button" onClick={() => navigate("home")}>
          HUDSONLAB
        </button>

        <nav className="top-nav">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`nav-link ${currentPage === item.key ? "active" : ""}`}
              onClick={() => navigate(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}