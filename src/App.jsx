import React, { useState } from 'react';
import Home from './Home/Home';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  if (currentPage === 'home') {
    return <Home onNavigate={handleNavigate} />;
  }

  return <Home onNavigate={handleNavigate} />;
}