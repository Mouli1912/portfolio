import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * CharacterIllustration
 * Premium character display with:
 *  - Frosted glass card backdrop (glassmorphism)
 *  - Multi-layer warm shadow system
 *  - Mouse-tracking 3D perspective tilt on hover
 *  - Hover glow / light pulse
 *  - Scroll-triggered slide-in entrance
 *  - Optional float animation
 *
 * @param {string} src       - Image path (from /public)
 * @param {string} alt       - Accessible alt text (required)
 * @param {'hero'|'section'|'decorative'} variant
 * @param {'float'|'slide-left'|'slide-right'|'none'} animation
 * @param {string} className - Extra classes for the outer wrapper
 */
function CharacterIllustration({
  src,
  alt,
  variant = 'section',
  animation = 'float',
  className = '',
}) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  /* ── Size presets ── */
  const sizeMap = {
    hero: 'max-h-[460px] sm:max-h-[540px]',
    section: 'max-h-[340px] sm:max-h-[400px]',
    decorative: 'max-h-[240px] sm:max-h-[280px]',
  };

  /* ── Mouse-tracking tilt ── */
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: -dy * 8, y: dx * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  /* ── Float loop (only when animation === 'float') ── */
  const floatProps =
    animation === 'float'
      ? {
          animate: { y: [0, -10, 0] },
          transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
        }
      : {};

  /* ── Scroll-entrance variants ── */
  const entranceMap = {
    'slide-left': {
      initial: { opacity: 0, x: -48 },
      whileInView: { opacity: 1, x: 0 },
      viewport: { once: true, margin: '-60px' },
      transition: { duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    'slide-right': {
      initial: { opacity: 0, x: 48 },
      whileInView: { opacity: 1, x: 0 },
      viewport: { once: true, margin: '-60px' },
      transition: { duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    float: {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.85, ease: 'easeOut' },
    },
    none: {},
  };

  const entranceProps = entranceMap[animation] || {};

  return (
    <motion.div
      {...entranceProps}
      className={`relative flex items-center justify-center ${className}`}
      style={{ perspective: '900px' }}
    >
      {/* ── Layer 1: Wide outer glow (warm amber) ── */}
      <motion.div
        animate={isHovered ? { opacity: 1, scale: 1.15 } : { opacity: 0.6, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="absolute inset-[-20%] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 60%, rgba(181,138,85,0.22) 0%, rgba(214,185,140,0.12) 50%, transparent 75%)',
          filter: 'blur(32px)',
        }}
      />

      {/* ── Layer 2: Tiltable glass card + character ── */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 22 }}
        className="relative w-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Glass card backdrop */}
        <motion.div
          animate={
            isHovered
              ? { opacity: 1, boxShadow: '0 24px 60px rgba(181,138,85,0.18), 0 4px 16px rgba(29,29,27,0.08), inset 0 1px 0 rgba(255,255,255,0.6)' }
              : { opacity: 0.85, boxShadow: '0 12px_36px rgba(29,29,27,0.07), 0 2px 8px rgba(29,29,27,0.04), inset 0 1px 0 rgba(255,255,255,0.45)' }
          }
          transition={{ duration: 0.4 }}
          className="absolute inset-0 rounded-[2rem] pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,253,248,0.72) 0%, rgba(237,229,214,0.48) 60%, rgba(247,243,234,0.35) 100%)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(221,211,195,0.55)',
          }}
        />

        {/* Top-light specular highlight on glass */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-3/5 h-px pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)',
          }}
        />

        {/* Warm inner light — simulates overhead light source */}
        <motion.div
          animate={isHovered ? { opacity: 0.9 } : { opacity: 0.55 }}
          transition={{ duration: 0.4 }}
          className="absolute top-0 inset-x-0 h-2/5 rounded-t-[2rem] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(214,185,140,0.35) 0%, transparent 70%)',
          }}
        />

        {/* Float wrapper around the image */}
        <motion.div
          {...floatProps}
          className="relative z-10 flex items-end justify-center px-6 pt-6 pb-4"
        >
          {/* Character image */}
          <img
            src={src}
            alt={alt}
            loading={variant === 'hero' ? 'eager' : 'lazy'}
            className={`relative z-10 w-full object-contain character-image ${sizeMap[variant]}`}
            style={{
              filter:
                'drop-shadow(0 18px 32px rgba(29,29,27,0.22)) drop-shadow(0 4px 10px rgba(29,29,27,0.14))',
            }}
          />
        </motion.div>

        {/* Ground shadow ellipse inside the card */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: '60%',
            height: '14px',
            borderRadius: '50%',
            background: 'rgba(29,29,27,0.12)',
            filter: 'blur(10px)',
          }}
        />
      </motion.div>

      {/* ── Layer 3: External cast shadow below the card ── */}
      <div
        className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '70%',
          height: '20px',
          borderRadius: '50%',
          background: 'rgba(181,138,85,0.18)',
          filter: 'blur(16px)',
        }}
      />
    </motion.div>
  );
}

export default CharacterIllustration;
