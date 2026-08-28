import React from 'react';
import { motion } from 'framer-motion';

function AvatarScene() {
  return (
    <div className="relative mx-auto flex w-full max-w-md items-center justify-center p-2 sm:p-4">
      {/* Background warm ambient glow circle */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#B58A55]/20 to-[#D6B98C]/30 blur-3xl" />

      {/* Floating 3D Character Container */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative z-10 flex flex-col items-center justify-center w-full"
      >
        {/* Soft shadow under chair */}
        <div className="absolute bottom-2 h-6 w-3/4 rounded-full bg-[#1D1D1B]/15 blur-lg" />

        {/* 3D Character Illustration */}
        <img
          src="/images/hero-character.png"
          alt="3D cartoon illustration of Mouli working on a laptop"
          loading="eager"
          className="relative z-10 h-auto w-full max-w-[340px] sm:max-w-[400px] object-contain drop-shadow-[0_20px_35px_rgba(29,29,27,0.15)] transition-transform duration-300 hover:scale-105"
        />

        {/* Floating tech badge elements around character */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute top-4 left-0 sm:-left-4 z-20 rounded-full border border-[#DDD3C3] bg-[#FFFDF8] px-3.5 py-1.5 text-xs font-mono font-semibold text-[#1D1D1B] shadow-[0_8px_20px_rgba(29,29,27,0.06)] backdrop-blur-md"
        >
          &lt;Developer /&gt;
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-16 right-0 sm:-right-4 z-20 rounded-full border border-[#DDD3C3] bg-[#FFFDF8] px-3.5 py-1.5 text-xs font-mono font-semibold text-[#B58A55] shadow-[0_8px_20px_rgba(29,29,27,0.06)] backdrop-blur-md"
        >
          React &amp; UI ✨
        </motion.div>
      </motion.div>
    </div>
  );
}

export default AvatarScene;
