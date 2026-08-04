import { motion } from 'framer-motion';

const particles = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  left: `${(index * 13) % 100}%`,
  top: `${(index * 17) % 100}%`,
  size: 10 + (index % 4) * 8,
  delay: index * 0.12,
}));

function ParticleField({ theme }) {
  const isDark = theme === 'dark';

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          initial={{ opacity: 0.25, scale: 0.7 }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 5 + (particle.id % 4), repeat: Infinity, delay: particle.delay }}
          className={`absolute rounded-full blur-[2px] ${isDark ? 'bg-cyan-300/40' : 'bg-cyan-500/30'}`}
          style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
        />
      ))}
    </div>
  );
}

export default ParticleField;
