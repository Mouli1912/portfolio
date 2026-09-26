import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const fullText = 'Mouli';
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 700);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-sky-50/80 to-indigo-50/90 text-slate-900 transition-colors duration-500"
    >
      <div className="relative flex flex-col items-center justify-center px-4">
        {/* Soft light background glow */}
        <div className="absolute inset-0 h-56 w-56 rounded-full bg-cyan-300/35 blur-3xl" />
        <div className="absolute inset-0 h-56 w-56 rounded-full bg-indigo-300/30 blur-2xl" />

        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex items-center"
        >
          <h1 className="text-6xl font-extrabold tracking-tight sm:text-8xl drop-shadow-sm">
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {displayedText}
            </span>
          </h1>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="ml-2 inline-block h-12 sm:h-20 w-1.5 rounded-full bg-cyan-500 align-middle shadow-[0_0_12px_rgba(6,182,212,0.6)]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-cyan-600/40" />
          <p className="text-xs sm:text-sm uppercase tracking-[0.4em] font-semibold text-cyan-700">
            Frontend Developer
          </p>
          <span className="h-px w-8 bg-cyan-600/40" />
        </motion.div>
      </div>
    </motion.div>
  );
}
