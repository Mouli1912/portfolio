import { useState } from 'react';
import { motion } from 'framer-motion';

function ProjectCard({ project, theme }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const isDark = theme === 'dark';

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 8, y: x * 8 });
  };

  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.02, rotateX: 4, rotateY: -4 }}
      transition={{ type: 'spring', stiffness: 100, damping: 16 }}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className={`group overflow-hidden rounded-[2rem] border p-4 shadow-2xl ${isDark ? 'border-white/10 bg-slate-900/70 shadow-cyan-950/30' : 'border-slate-200 bg-white/80 shadow-slate-300/50'}`}
      style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
    >
      <div className="overflow-hidden rounded-[1.5rem]">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>
      <div className="mt-5 space-y-4">
        <div>
          <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{project.title}</h3>
          <p className={`mt-2 text-sm leading-6 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={project.live} className={`rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium transition hover:bg-cyan-400/20 ${isDark ? 'text-cyan-200' : 'text-cyan-700'}`}>
            Live Demo
          </a>
          <a href={project.github} className={`rounded-full border px-4 py-2 text-sm font-medium transition ${isDark ? 'border-white/15 bg-white/5 text-slate-100 hover:bg-white/10' : 'border-slate-200 bg-white/70 text-slate-700 hover:bg-white'}`}>
            GitHub
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
