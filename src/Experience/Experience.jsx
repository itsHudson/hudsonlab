import React from "react";
import "./experience.css";
import experienceData from "../Data/experience";
import ExperienceCard from "./ExperienceCard";

export default function Experience() {
  return (
    <section className="page-section">
      <span className="small-chip">Experience</span>
      <h1 className="page-title">Work Experience</h1>
      <p className="page-subtitle">
        This section focuses only on work roles, practical exposure, and key
        responsibilities.
      </p>

      <div className="experience-grid">
        {experienceData.map((item) => (
          <ExperienceCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}