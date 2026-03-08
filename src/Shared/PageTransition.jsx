import React from 'react';

export default function PageTransition({ children, activeKey }) {
  return (
    <main key={activeKey} className="page-transition">
      {children}
    </main>
  );
}
