import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

function AvatarScene() {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  /* ── Mouse-tracking 3D tilt ── */
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: -dy * 7, y: dx * 7 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      className="relative mx-auto flex w-full max-w-md items-center justify-center p-2 sm:p-6"
      style={{ perspective: '900px' }}
    >
      {/* ── Outer wide ambient glow ── */}
      <motion.div
        animate={isHovered ? { opacity: 1, scale: 1.18 } : { opacity: 0.7, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-[-15%] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 55%, rgba(181,138,85,0.28) 0%, rgba(214,185,140,0.14) 50%, transparent 75%)',
          filter: 'blur(40px)',
        }}
      />

      {/* ── Tiltable glass card ── */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: isHovered ? 1.025 : 1,
        }}
        transition={{ type: 'spring', stiffness: 160, damping: 20 }}
        className="relative w-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Glass backdrop */}
        <motion.div
          animate={
            isHovered
              ? {
                  boxShadow:
                    '0 32px 72px rgba(181,138,85,0.22), 0 8px 24px rgba(29,29,27,0.10), inset 0 1px 0 rgba(255,255,255,0.65)',
                }
              : {
                  boxShadow:
                    '0 16px 48px rgba(29,29,27,0.08), 0 4px 12px rgba(29,29,27,0.05), inset 0 1px 0 rgba(255,255,255,0.5)',
                }
          }
          transition={{ duration: 0.4 }}
          className="absolute inset-0 rounded-[2.5rem] pointer-events-none"
          style={{
            background:
              'linear-gradient(145deg, rgba(255,253,248,0.78) 0%, rgba(237,229,214,0.52) 55%, rgba(247,243,234,0.38) 100%)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(221,211,195,0.6)',
          }}
        />

        {/* Specular top-edge line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-3/5 h-px rounded-full pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)',
          }}
        />

        {/* Warm overhead light */}
        <motion.div
          animate={isHovered ? { opacity: 1 } : { opacity: 0.6 }}
          transition={{ duration: 0.4 }}
          className="absolute top-0 inset-x-0 h-1/2 rounded-t-[2.5rem] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(214,185,140,0.42) 0%, transparent 65%)',
          }}
        />

        {/* Float + character */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 flex flex-col items-center justify-center px-6 pt-8 pb-6 w-full"
        >
          {/* Character image */}
          <img
            src="/images/characters/hero-coding.png"
            alt="3D cartoon developer sitting and coding on a laptop"
            loading="eager"
            className="relative z-10 h-auto w-full max-w-[320px] sm:max-w-[400px] object-contain"
            style={{
              filter:
                'drop-shadow(0 20px 36px rgba(29,29,27,0.25)) drop-shadow(0 6px 14px rgba(29,29,27,0.16))',
            }}
          />

          {/* Ground shadow inside card */}
          <div
            className="mt-[-8px]"
            style={{
              width: '55%',
              height: '12px',
              borderRadius: '50%',
              background: 'rgba(29,29,27,0.13)',
              filter: 'blur(9px)',
            }}
          />
        </motion.div>

        {/* Floating badge — top left */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute top-5 left-2 sm:-left-2 z-20 rounded-full border border-[#DDD3C3] bg-[#FFFDF8]/90 px-3.5 py-1.5 text-xs font-mono font-semibold text-[#1D1D1B] shadow-[0_8px_20px_rgba(29,29,27,0.08)] backdrop-blur-md"
        >
          &lt;Developer /&gt;
        </motion.div>

        {/* Floating badge — bottom right */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-14 right-2 sm:-right-2 z-20 rounded-full border border-[#DDD3C3] bg-[#FFFDF8]/90 px-3.5 py-1.5 text-xs font-mono font-semibold text-[#B58A55] shadow-[0_8px_20px_rgba(29,29,27,0.08)] backdrop-blur-md"
        >
          React &amp; UI ✨
        </motion.div>
      </motion.div>

      {/* ── External cast shadow below card ── */}
      <div
        className="absolute bottom-[-12px] left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '65%',
          height: '22px',
          borderRadius: '50%',
          background: 'rgba(181,138,85,0.20)',
          filter: 'blur(18px)',
        }}
      />
    </div>
  );
}

export default AvatarScene;
