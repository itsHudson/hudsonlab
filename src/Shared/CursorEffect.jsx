import React, { useEffect, useState } from 'react';

export default function CursorEffect() {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div
      className="cursor-effect"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      aria-hidden="true"
    />
  );
}
