import { useEffect, useState } from 'react';

function useMouseGlow() {
  const [glow, setGlow] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event) => {
      setGlow({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return glow;
}

export default useMouseGlow;
