import React, { useState } from 'react';
import { motion } from 'framer-motion';

function ProjectCard({ project }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 6, y: x * 6 });
  };

  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 100, damping: 16 }}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="group overflow-hidden rounded-[2rem] border border-[#DDD3C3] bg-[#FFFDF8] p-5 shadow-[0_10px_30px_rgba(29,29,27,0.04)] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(181,138,85,0.12)] hover:border-[#B58A55]/40"
      style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
    >
      <div className="overflow-hidden rounded-[1.5rem] bg-[#EDE5D6]">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-5 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-[#1D1D1B] tracking-tight">{project.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#68645D]">{project.description}</p>
        </div>
        {project.tech && project.tech.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="rounded-full border border-[#DDD3C3] bg-[#EDE5D6] px-3 py-1 text-xs font-medium text-[#68645D]">
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-3 pt-1">
          <a
            href={project.live}
            className="rounded-full bg-[#1D1D1B] px-5 py-2 text-xs font-semibold text-[#F7F3EA] transition-all hover:bg-[#B58A55] hover:text-white shadow-sm hover:-translate-y-0.5"
          >
            Live Demo
          </a>
          <a
            href={project.github}
            className="rounded-full border border-[#DDD3C3] bg-[#F7F3EA] px-5 py-2 text-xs font-semibold text-[#1D1D1B] transition-all hover:border-[#B58A55] hover:bg-[#EDE5D6] hover:-translate-y-0.5"
          >
            GitHub
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
