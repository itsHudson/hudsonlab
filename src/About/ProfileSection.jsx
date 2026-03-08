import React from "react";
import profileImage from "../Images/ProfileHUDSOnPixar.png";

export default function ProfileSection() {
  return (
    <div className="glass-card about-block section-grid-2">
      <div className="visual-image-card about-profile-image">
        <img src={profileImage} alt="Hudson Chia" />
      </div>

      <div className="about-copy">
        <h2>Professional Introduction</h2>
        <p>
          I am a Computer Science student with a strong interest in building
          practical software systems and exploring data-driven solutions. My
          work focuses on combining structured programming, system design, and
          analytical thinking to solve real-world problems.
        </p>
        <p>
          I enjoy developing applications that transform ideas into functional
          systems, whether through software development, database design, or
          data analysis.
        </p>
      </div>
    </div>
  );
}