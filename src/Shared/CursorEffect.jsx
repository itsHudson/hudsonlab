import React, { useEffect, useState } from 'react';

export default function CursorEffect() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <>
      <div
        className="cursor-glow"
        style={{ transform: `translate(${position.x - 90}px, ${position.y - 90}px)` }}
      />
      <div
        className="cursor-dot"
        style={{ transform: `translate(${position.x - 5}px, ${position.y - 5}px)` }}
      />
    </>
  );
}
