import React, { useState } from 'react';
import './projects.css';
import ProjectPanel from './ProjectPanel';
import ProjectDetail from './ProjectDetail';

const projectData = [
  {
    title: 'Flight Reservation System',
    stack: 'C++ · Data Structures',
    summary: 'Array-based and linked-list based booking workflow with sorting, hashing, and CSV concepts.',
    details:
      'Built to demonstrate structured programming, booking logic, passenger handling, and core data structure concepts in a practical scenario.'
  },
  {
    title: 'Airport Concurrency Simulation',
    stack: 'Java · Threads · Synchronization',
    summary: 'A simulation of airport operations using multiple threads, coordination, and concurrency control concepts.',
    details:
      'Focused on safe thread communication, shared resources, timing coordination, and evidence-based explanation of concurrency techniques.'
  },
  {
    title: 'MyGoPandai Platform',
    stack: 'ASP.NET · SQL Server',
    summary: 'An online learning platform designed with separate user roles and database-backed features.',
    details:
      'Developed with clear UI structure, educational workflow thinking, and a strong focus on maintainable academic project design.'
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(projectData[0]);

  return (
    <section className="section-shell">
      <div className="section-header">
        <span className="section-tag">Projects</span>
        <h2 className="section-title">Immersive panels instead of boring cards.</h2>
        <p className="section-subtitle">
          These projects represent technical experimentation, coursework depth, and a
          growing habit of turning ideas into systems.
        </p>
      </div>

      <div className="projects-layout">
        <div className="project-panel-list">
          {projectData.map((project) => (
            <ProjectPanel
              key={project.title}
              project={project}
              active={selectedProject.title === project.title}
              onSelect={() => setSelectedProject(project)}
            />
          ))}
        </div>
        <ProjectDetail project={selectedProject} />
      </div>
    </section>
  );
}
