import React from "react";
import "./contact.css";

export default function Contact() {
  return (
    <section className="page-section">
      <span className="small-chip">Contact</span>
      <h1 className="page-title">Let’s Connect</h1>
      <p className="page-subtitle">
        This section contains only public contact and connection links.
      </p>

      <div className="contact-grid">
        <div className="glass-card contact-box">
          <h2>Email</h2>
          <p>hudsonchia@example.com</p>
        </div>

        <div className="glass-card contact-box">
          <h2>GitHub</h2>
          <p>https://github.com/itshudson</p>
        </div>

        <div className="glass-card contact-box">
          <h2>LinkedIn</h2>
          <p>To be added</p>
        </div>
      </div>
    </section>
  );
}