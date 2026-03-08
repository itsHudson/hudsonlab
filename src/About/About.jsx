import React from "react";
import "./about.css";
import ProfileSection from "./ProfileSection";
import PersonalityENTJ from "./PersonalityENTJ";
import GoalsSection from "./GoalsSection";

export default function About() {
  return (
    <section className="page-section">
      <span className="small-chip">About</span>
      <h1 className="page-title">Who I Am</h1>
      <p className="page-subtitle">
        This section focuses only on my personal introduction, mindset, work
        style, and future direction.
      </p>

      <div className="about-layout">
        <ProfileSection />
        <PersonalityENTJ />
        <GoalsSection />
      </div>
    </section>
  );
}