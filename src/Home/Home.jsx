import React from 'react';
import './home.css';
import HeroIntro from './HeroIntro';
import NavigationCards from './NavigationCards';

export default function Home({ onNavigate }) {
  return (
    <section className="page-shell home-shell">
      <div className="content-wrap home-wrap">
        <HeroIntro onNavigate={onNavigate} />
        <NavigationCards onNavigate={onNavigate} />
      </div>
    </section>
  );
}
