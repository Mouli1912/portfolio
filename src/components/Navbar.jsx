import { motion } from 'framer-motion';
import { navLinks } from '../constants/content';

function Navbar({ theme, toggleTheme }) {
  const isDark = theme === 'dark';

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`sticky top-0 z-50 border-b backdrop-blur-xl ${isDark ? 'border-white/10 bg-slate-950/70' : 'border-slate-200 bg-white/70'}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home" className={`text-lg font-semibold tracking-[0.25em] uppercase ${isDark ? 'text-white/90' : 'text-slate-900'}`}>
          Mouli
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={`text-sm transition ${isDark ? 'text-slate-300 hover:text-cyan-300' : 'text-slate-700 hover:text-cyan-600'}`}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`rounded-full border px-3 py-2 text-sm font-medium transition hover:-translate-y-0.5 ${isDark ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-200 hover:bg-cyan-400/20' : 'border-slate-300 bg-white/80 text-slate-700 hover:bg-slate-100'}`}
          >
            {isDark ? '☀' : '🌙'}
          </button>
          <a
            href="#contact"
            className={`rounded-full border px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 ${isDark ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-200 hover:bg-cyan-400/20' : 'border-slate-300 bg-white/80 text-slate-700 hover:bg-slate-100'}`}
          >
            Let’s Talk
          </a>
        </div>
      </div>
    </motion.header>
  );
}

export default Navbar;
