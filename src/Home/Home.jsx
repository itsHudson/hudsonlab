import React from "react";
import "./home.css";
import HeroIntro from "./HeroIntro";
import NavigationCards from "./NavigationCards";

export default function Home({ navigate }) {
  return (
    <section className="page-section home-page">
      <div className="home-layout">
        <HeroIntro navigate={navigate} />
        <NavigationCards navigate={navigate} />
      </div>
    </section>
  );
}