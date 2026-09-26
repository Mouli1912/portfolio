import React from 'react';
import { motion } from 'framer-motion';
import { navLinks } from '../constants/content';

function Navbar({ theme, toggleTheme }) {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 border-b border-[#DDD3C3] bg-[#FFFDF8]/85 backdrop-blur-xl shadow-[0_4px_20px_rgba(29,29,27,0.03)]"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="text-lg font-bold tracking-[0.25em] uppercase text-[#1D1D1B] hover:text-[#B58A55] transition-colors">
          Mouli
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#68645D] transition-colors hover:text-[#B58A55]"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full border border-[#DDD3C3] bg-[#F7F3EA] px-3.5 py-1.5 text-xs font-semibold text-[#1D1D1B] transition hover:border-[#B58A55] hover:bg-[#EDE5D6]"
          >
            {theme === 'dark' ? '☀ Light' : '🌙 Dark'}
          </button>
          <a
            href="#contact"
            className="rounded-full bg-[#1D1D1B] px-5 py-2 text-sm font-semibold text-[#F7F3EA] transition-all hover:bg-[#B58A55] hover:text-white shadow-sm hover:-translate-y-0.5"
          >
            Let’s Talk
          </a>
        </div>
      </div>
    </motion.header>
  );
}

export default Navbar;
