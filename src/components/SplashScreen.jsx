import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 300);
          return 100;
        }
        return prev + 5;
      });
    }, 35);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F7F3EA] px-4 text-[#1D1D1B]"
    >
      {/* Background warm ambient glow */}
      <div className="absolute h-96 w-96 rounded-full bg-gradient-to-r from-[#B58A55]/15 to-[#D6B98C]/25 blur-3xl animate-pulse" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* 3D Character Thumbnail */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative mb-6 h-28 w-28 sm:h-36 sm:w-36"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#B58A55]/30 to-[#D6B98C]/40 blur-xl" />
          <img
            src="/images/hero-character.png"
            alt="Mouli 3D Character"
            className="relative z-10 h-full w-full object-contain drop-shadow-[0_10px_25px_rgba(29,29,27,0.12)]"
          />
        </motion.div>

        {/* Large MOULI Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl font-extrabold tracking-[0.2em] sm:text-7xl font-sans text-[#1D1D1B]"
        >
          MOULI
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-3 text-xs font-semibold tracking-[0.3em] uppercase text-[#68645D] sm:text-sm"
        >
          Frontend Developer • UI Craftsman
        </motion.p>

        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '160px', opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 h-1.5 w-40 overflow-hidden rounded-full bg-[#EDE5D6] shadow-inner"
        >
          <div
            className="h-full rounded-full bg-[#B58A55] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </motion.div>

        {/* Percentage Counter */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-2 text-xs font-mono font-semibold text-[#B58A55]"
        >
          {progress}%
        </motion.span>
      </div>
    </motion.div>
  );
}

export default SplashScreen;
