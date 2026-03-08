import React, { useState } from "react";

import Navbar from "./Shared/Navbar";
import Footer from "./Shared/Footer";

import Home from "./Home/Home";
import About from "./About/About";
import TechExplorer from "./TechExplorer/TechExplorer";
import Experience from "./Experience/Experience";
import Education from "./Education/Education";
import Certifications from "./Certifications/Certifications";
import Contact from "./Contact/Contact";

export default function App() {
  const [page, setPage] = useState("home");

  const navigate = (target) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (page) {
      case "about":
        return <About />;
      case "tech":
        return <TechExplorer />;
      case "experience":
        return <Experience />;
      case "education":
        return <Education />;
      case "certifications":
        return <Certifications />;
      case "contact":
        return <Contact />;
      case "home":
      default:
        return <Home navigate={navigate} />;
    }
  };

  return (
    <div className="app-shell">
      <Navbar navigate={navigate} currentPage={page} />
      <main className="page-container">{renderPage()}</main>
      <Footer />
    </div>
  );
}