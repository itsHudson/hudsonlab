import React, { useEffect, useRef, useState } from 'react';
import './home.css';
import ParticleBackground from './ParticleBackground';
import IntroText from './IntroText';
import TechGlobe from './TechGlobe';
import OrbitMenu from './OrbitMenu';

export default function Home({ onNavigate }) {
  const shellRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!shellRef.current) return;

      const rect = shellRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;

      setMouse({ x, y });

      const glowX = ((event.clientX - rect.left) / rect.width) * 100;
      const glowY = ((event.clientY - rect.top) / rect.height) * 100;
      setGlow({ x: glowX, y: glowY });
    };

    const handleLeave = () => {
      setMouse({ x: 0, y: 0 });
      setGlow({ x: 50, y: 50 });
    };

    const node = shellRef.current;
    if (node) {
      node.addEventListener('mousemove', handleMouseMove);
      node.addEventListener('mouseleave', handleLeave);
    }

    return () => {
      if (node) {
        node.removeEventListener('mousemove', handleMouseMove);
        node.removeEventListener('mouseleave', handleLeave);
      }
    };
  }, []);

  return (
    <section
      ref={shellRef}
      className="home-shell"
      style={{
        '--mx': mouse.x.toFixed(3),
        '--my': mouse.y.toFixed(3),
        '--glow-x': `${glow.x}%`,
        '--glow-y': `${glow.y}%`,
      }}
    >
      <ParticleBackground />

      <div className="home-ambient home-ambient-one" />
      <div className="home-ambient home-ambient-two" />
      <div className="home-grid-lines" />
      <div className="home-radial-glow" />

      <div className="home-grid">
        <IntroText onNavigate={onNavigate} />
        <div className="hero-orbit-zone">
          <TechGlobe mouse={mouse} />
          <OrbitMenu onNavigate={onNavigate} />
        </div>
      </div>

      <div className="scroll-hint">
        <span className="scroll-line" />
        <span className="scroll-text">Interactive Entry Interface</span>
      </div>
    </section>
  );
}