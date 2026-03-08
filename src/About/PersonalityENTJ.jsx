import React from "react";
import entjImage from "../Images/MBTI_ENTJ.png";

export default function PersonalityENTJ() {
  return (
    <div className="glass-card about-block section-grid-2">
      <div className="about-copy">
        <h2>Personality and Work Style</h2>
        <p>
          As an ENTJ personality type, I naturally approach problems with
          strategic thinking, leadership, and a results-oriented mindset. I
          enjoy organizing complex systems, planning structured processes, and
          improving solutions through logic and efficiency.
        </p>
        <ul className="info-list">
          <li>Strategic and goal-focused approach</li>
          <li>Comfortable with responsibility and planning</li>
          <li>Strong preference for organized execution</li>
          <li>Interested in practical, high-impact solutions</li>
        </ul>
      </div>

      <div className="visual-image-card about-visual-side">
        <img src={entjImage} alt="ENTJ personality visual" />
      </div>
    </div>
  );
}