import { useEffect, useState } from 'react';

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (scrollTop / height) * 100 : 0);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[60] h-1 w-full bg-slate-950/70">
      <div className="h-full rounded-r-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500" style={{ width: `${progress}%` }} />
    </div>
  );
}

export default ScrollProgress;
