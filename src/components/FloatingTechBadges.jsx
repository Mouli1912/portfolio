import React from 'react';
import { motion } from 'framer-motion';

const floatingItems = [
  { id: 'laptop', icon: '💻', text: 'Laptop', pos: 'top-[-16px] left-[5%]', delay: 0 },
  { id: 'code', icon: '</>', text: 'Code', pos: 'top-[10%] right-[-14px]', delay: 0.6 },
  { id: 'js', icon: '⚡', text: 'JavaScript', pos: 'bottom-[-16px] left-[20%]', delay: 1.2 },
  { id: 'react', icon: '⚛️', text: 'React', pos: 'top-[-18px] right-[25%]', delay: 1.8 },
  { id: 'github', icon: '🐙', text: 'GitHub', pos: 'bottom-[20%] right-[-14px]', delay: 2.4 },
  { id: 'db', icon: '🗄️', text: 'Database', pos: 'bottom-[-16px] right-[15%]', delay: 3.0 },
];

export default function FloatingTechBadges({ theme }) {
  const isDark = theme === 'dark';

  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-visible sm:block z-20">
      {floatingItems.map((item) => (
        <motion.div
          key={item.id}
          className={`absolute ${item.pos}`}
          animate={{
            y: [0, -10, 0],
            rotate: [0, item.delay % 2 === 0 ? 3 : -3, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: item.delay,
          }}
        >
          <div
            className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-xl backdrop-blur-md ${
              isDark
                ? 'border-cyan-400/30 bg-slate-900/85 text-cyan-200 shadow-cyan-950/50'
                : 'border-cyan-500/30 bg-white/90 text-cyan-800 shadow-slate-300/60'
            }`}
          >
            <span className="text-sm">{item.icon}</span>
            <span className="tracking-wide">{item.text}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
