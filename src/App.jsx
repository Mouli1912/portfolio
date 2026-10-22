import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { send } from '@emailjs/browser';
import Navbar from './components/Navbar';
import ParticleField from './components/ParticleField';
import SectionHeading from './components/SectionHeading';
import ProjectCard from './components/ProjectCard';
import AvatarScene from './components/AvatarScene';
import GitHubSection from './components/GitHubSection';
import ScrollProgress from './components/ScrollProgress';
import TypingText from './components/TypingText';
import SplashScreen from './components/SplashScreen';
import CharacterIllustration from './components/CharacterIllustration';
import useMouseGlow from './hooks/useMouseGlow';
import {
  floatingBadges,
  skills,
  projects,
  timeline,
  experiences,
  testimonials,
  socialLinks,
  learningItems,
  beyondCodeText,
} from './constants/content';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const glow = useMouseGlow();
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }

    const savedTheme = window.localStorage.getItem('portfolio-theme');
    return savedTheme ? savedTheme : 'light';
  });
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const heroRef = useRef(null);
  const profileRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!isLoading) {
      const sections = sectionsRef.current.filter(Boolean);

      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
            },
          }
        );
      });

      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );

      gsap.fromTo(
        profileRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 1, delay: 0.2, ease: 'power3.out' }
      );
    }
  }, [isLoading]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus('Sending...');
    send('service_xxx', 'template_xxx', formData, 'public_key')
      .then(() => {
        setStatus('Thanks! Your message is on its way.');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(() => setStatus('Something went wrong. Please try again.'));
  };

  const surfaceClass = 'border-[#DDD3C3] bg-[#FFFDF8] shadow-[0_10px_30px_rgba(29,29,27,0.04)]';
  const textPrimary = 'text-[#1D1D1B]';
  const textSecondary = 'text-[#68645D]';
  const chipClass = 'border-[#DDD3C3] bg-[#EDE5D6] text-[#68645D]';
  const softCardClass = 'border-[#DDD3C3] bg-[#FFFDF8] shadow-[0_10px_30px_rgba(29,29,27,0.04)]';

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <SplashScreen key="splash" onComplete={() => setIsLoading(false)} theme={theme} />
        )}
      </AnimatePresence>

      <div
        className="min-h-screen text-[#1D1D1B] transition-colors duration-500"
        style={{
          background:
            'radial-gradient(circle at top left, rgba(214, 185, 140, 0.2), transparent 40%), linear-gradient(135deg, #F7F3EA, #F2ECE0 60%, #F7F3EA)',
        }}
      >
        <div
          className="pointer-events-none fixed inset-0 z-0 opacity-40"
          style={{
            background: `radial-gradient(circle 350px at ${glow.x}px ${glow.y}px, rgba(181, 138, 85, 0.12), transparent 50%)`,
          }}
        />
        <ScrollProgress />

        <Navbar theme={theme} toggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))} />

        <main id="home" className="relative overflow-hidden">
          <ParticleField theme={theme} />

          {/* ── HERO ──────────────────────────────────────────── */}
          <section className="mx-auto grid min-h-[90vh] max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
            <motion.div ref={heroRef} className="relative z-10 max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#B58A55]"
              >
                Hello, I'm
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-3 inline-flex items-center rounded-full border border-[#DDD3C3] bg-[#EDE5D6]/80 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#68645D]"
              >
                Frontend Developer • Available for select projects
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl text-[#1D1D1B] tracking-tight"
              >
                Hi, I'm <span className="text-[#B58A55]">Mouli Dhara</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 }}
                className="mt-3 text-base leading-relaxed text-[#68645D] max-w-lg"
              >
                I build modern, responsive, and interactive web experiences.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="mt-4 text-xl font-medium sm:text-2xl text-[#68645D]"
              >
                <span className="font-semibold text-[#1D1D1B]">
                  <TypingText phrases={['Frontend Developer', 'React Specialist', 'UI Craftsman']} />
                </span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <a
                  href="#projects"
                  className="rounded-full bg-[#1D1D1B] px-7 py-3.5 text-sm font-semibold text-[#F7F3EA] transition-all hover:bg-[#B58A55] hover:text-white shadow-sm hover:-translate-y-0.5"
                >
                  View My Work
                </a>
                <a
                  href="#contact"
                  className="rounded-full border border-[#B58A55] bg-transparent px-7 py-3.5 text-sm font-semibold text-[#1D1D1B] transition-all hover:bg-[#EDE5D6] hover:-translate-y-0.5"
                >
                  Contact Me
                </a>
                <a
                  href="/Mouli-Resume.pdf"
                  download
                  className="rounded-full border border-[#DDD3C3] bg-[#FFFDF8] px-7 py-3.5 text-sm font-semibold text-[#1D1D1B] transition-all hover:border-[#B58A55] hover:bg-[#EDE5D6] hover:-translate-y-0.5"
                >
                  Download Resume
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4 }}
                className="mt-10 flex flex-wrap gap-3"
              >
                {floatingBadges.map((badge) => (
                  <span key={badge} className={`rounded-full border px-3.5 py-1.5 text-xs font-medium ${chipClass}`}>
                    {badge}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5 }}
                className="mt-10 flex gap-4"
              >
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="rounded-full border border-[#DDD3C3] bg-[#FFFDF8] p-3 text-[#68645D] transition-all hover:-translate-y-0.5 hover:border-[#B58A55] hover:text-[#B58A55]"
                  >
                    {social.label}
                  </a>
                ))}
              </motion.div>
            </motion.div>

            {/* Hero character */}
            <motion.div ref={profileRef} className="relative mx-auto flex w-full max-w-md items-center justify-center">
              <AvatarScene theme={theme} />
            </motion.div>
          </section>

          {/* ── ABOUT ─────────────────────────────────────────── */}
          <section id="about" ref={(node) => (sectionsRef.current[0] = node)} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <SectionHeading
              theme={theme}
              eyebrow="About Me"
              title="Designing immersive digital stories"
              description="I blend product thinking, visual design, and frontend craftsmanship to create memorable web experiences that feel premium and intuitive."
            />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8 }}
              className={`rounded-[2rem] border p-8 backdrop-blur-xl ${softCardClass}`}
            >
              <div className="grid gap-8 items-center lg:grid-cols-[0.9fr_1.1fr]">
                {/* Thinking / studying character — slides from left */}
                <CharacterIllustration
                  src="/images/characters/thinking.png"
                  alt="3D cartoon developer in a thoughtful thinking pose"
                  variant="section"
                  animation="slide-left"
                  className="mx-auto w-full max-w-sm"
                />

                <div className="space-y-6">
                  <div className={`space-y-4 ${textSecondary}`}>
                    <p>
                      I'm a Computer Science student and frontend developer who loves crafting polished user
                      interfaces with modern tooling and a strong design sensibility.
                    </p>
                    <p>
                      My work focuses on clarity, performance, motion, and meaningful interactions that make
                      products feel alive. I'm currently expanding into full-stack development while building
                      real-world projects.
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-[#DDD3C3] bg-[#EDE5D6]/60 p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B58A55]">Frontend Development</p>
                      <p className={`mt-2 text-base font-semibold ${textPrimary}`}>React, JavaScript, CSS</p>
                    </div>
                    <div className="rounded-2xl border border-[#DDD3C3] bg-[#EDE5D6]/60 p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B58A55]">Problem Solving</p>
                      <p className={`mt-2 text-base font-semibold ${textPrimary}`}>Minimal, premium experiences</p>
                    </div>
                    <div className="rounded-2xl border border-[#DDD3C3] bg-[#EDE5D6]/60 p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B58A55]">React</p>
                      <p className={`mt-2 text-base font-semibold ${textPrimary}`}>Components, hooks, state</p>
                    </div>
                    <div className="rounded-2xl border border-[#DDD3C3] bg-[#EDE5D6]/60 p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B58A55]">JavaScript</p>
                      <p className={`mt-2 text-base font-semibold ${textPrimary}`}>ES6+, async, APIs</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* ── SKILLS ────────────────────────────────────────── */}
          <section id="skills" ref={(node) => (sectionsRef.current[1] = node)} className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            {/* Floating decorative chips */}
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [-4, 4, -4] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute -top-4 left-4 z-10 hidden sm:flex items-center gap-2 rounded-full border border-[#DDD3C3] bg-[#FFFDF8] px-3.5 py-1.5 text-xs font-mono font-semibold text-[#1D1D1B] shadow-md"
            >
              <span>💻</span> Laptop
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0], rotate: [3, -3, 3] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="pointer-events-none absolute top-12 right-6 z-10 hidden sm:flex items-center gap-2 rounded-full border border-[#DDD3C3] bg-[#FFFDF8] px-3.5 py-1.5 text-xs font-mono font-semibold text-[#B58A55] shadow-md"
            >
              <span>⚡</span> JS Code
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="pointer-events-none absolute bottom-8 left-8 z-10 hidden sm:flex items-center gap-2 rounded-full border border-[#DDD3C3] bg-[#FFFDF8] px-3.5 py-1.5 text-xs font-mono font-semibold text-[#1D1D1B] shadow-md"
            >
              <span>⚛️</span> React
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0], rotate: [2, -2, 2] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              className="pointer-events-none absolute bottom-4 right-12 z-10 hidden sm:flex items-center gap-2 rounded-full border border-[#DDD3C3] bg-[#FFFDF8] px-3.5 py-1.5 text-xs font-mono font-semibold text-[#B58A55] shadow-md"
            >
              <span>🗄️</span> Database
            </motion.div>

            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
              <div className="flex-1">
                <SectionHeading
                  theme={theme}
                  eyebrow="Skills"
                  title="A toolkit shaped for modern product teams"
                  description="I enjoy combining design disciplines and development fluency to build interfaces that feel both elegant and robust."
                />
                <div className="grid gap-6 lg:grid-cols-3">
                  {skills.map((group) => (
                    <motion.div key={group.title} whileHover={{ y: -6, scale: 1.01 }} className={`rounded-[2rem] border p-6 ${surfaceClass}`}>
                      <h3 className={`text-xl font-bold ${textPrimary}`}>{group.title}</h3>
                      <div className="mt-5 flex flex-wrap gap-2.5">
                        {group.items.map((item) => (
                          <span key={item} className={`rounded-full border px-3.5 py-1.5 text-xs font-medium ${chipClass}`}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Desktop-coding character — decorative, right side, desktop only */}
              <CharacterIllustration
                src="/images/characters/desktop-coding.png"
                alt="3D cartoon developer working at a desktop coding setup"
                variant="decorative"
                animation="slide-right"
                className="hidden lg:flex lg:w-56 lg:flex-shrink-0 mt-16"
              />
            </div>
          </section>

          {/* ── PROJECTS ──────────────────────────────────────── */}
          <section id="projects" ref={(node) => (sectionsRef.current[2] = node)} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end mb-8">
              <div>
                <SectionHeading
                  theme={theme}
                  eyebrow="Projects"
                  title="Selected Projects"
                  description="Some things I've built while learning and experimenting."
                />
              </div>
              {/* Small floating character near heading */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="hidden md:flex flex-shrink-0 items-center justify-center relative w-28 h-28"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#B58A55]/20 to-[#D6B98C]/30 blur-xl" />
                <img
                  src="/images/characters/hero-coding.png"
                  alt="3D developer illustration sitting with laptop"
                  loading="lazy"
                  className="relative z-10 h-full w-full object-contain drop-shadow-md"
                />
              </motion.div>
            </div>
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} theme={theme} />
              ))}
            </div>
          </section>

          {/* ── BEYOND CODE ───────────────────────────────────── */}
          <section ref={(node) => (sectionsRef.current[3] = node)} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8 }}
              className="rounded-[2rem] border border-[#DDD3C3] bg-gradient-to-br from-[#EDE5D6]/70 to-[#FFFDF8] p-8 shadow-[0_10px_30px_rgba(29,29,27,0.04)]"
            >
              <div className="grid gap-8 items-center lg:grid-cols-2">
                {/* Text side */}
                <div className="space-y-6 order-2 lg:order-1">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#B58A55]">Personal</p>
                    <h2 className="mt-3 text-3xl font-bold text-[#1D1D1B] sm:text-4xl">Beyond Code</h2>
                  </div>
                  <p className={`text-base leading-relaxed ${textSecondary}`}>{beyondCodeText}</p>
                  <div className="flex flex-wrap gap-3">
                    {['🎮 Gaming', '🖥️ Tech', '💡 Creative Ideas', '🎧 Music'].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[#DDD3C3] bg-[#FFFDF8] px-4 py-2 text-sm font-medium text-[#68645D]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  {/* Subtle gaming decorative element */}
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-[#DDD3C3] bg-[#FFFDF8] px-4 py-3 text-sm text-[#68645D]">
                    <span className="text-lg">🎮</span>
                    <span className="font-mono text-xs font-semibold text-[#B58A55]">&lt;/&gt; player1.ready()</span>
                  </div>
                </div>

                {/* Gaming character — slides from right */}
                <CharacterIllustration
                  src="/images/characters/gaming.png"
                  alt="3D cartoon developer wearing a gaming headset"
                  variant="section"
                  animation="slide-right"
                  className="mx-auto w-full max-w-sm order-1 lg:order-2"
                />
              </div>
            </motion.div>
          </section>

          {/* ── CURRENTLY LEARNING ────────────────────────────── */}
          <section ref={(node) => (sectionsRef.current[4] = node)} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <SectionHeading
              theme={theme}
              eyebrow="Currently Learning"
              title="Always Growing"
              description="Technologies and concepts I'm actively studying and building with right now."
            />
            <div className="grid gap-8 items-center lg:grid-cols-[1fr_0.85fr]">
              {/* Learning cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                {learningItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    whileHover={{ y: -4 }}
                    className={`rounded-2xl border p-5 ${surfaceClass}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className={`text-base font-bold ${textPrimary}`}>{item.label}</h3>
                      <span
                        className={`flex-shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                          item.status === 'Proficient'
                            ? 'bg-[#B58A55]/15 text-[#B58A55]'
                            : item.status === 'Learning'
                            ? 'bg-[#EDE5D6] text-[#68645D]'
                            : 'bg-[#F7F3EA] text-[#68645D] border border-[#DDD3C3]'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    {/* Simple visual track bar — no fake percentages */}
                    <div className="mt-4 h-1.5 w-full rounded-full bg-[#EDE5D6] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{
                          width:
                            item.status === 'Proficient'
                              ? '80%'
                              : item.status === 'Learning'
                              ? '45%'
                              : '25%',
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                        className="h-full rounded-full bg-[#B58A55]"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Studying character */}
              <CharacterIllustration
                src="/images/characters/studying.png"
                alt="3D cartoon developer sitting and reading a book to study"
                variant="section"
                animation="slide-right"
                className="mx-auto w-full max-w-xs hidden lg:flex"
              />
            </div>
          </section>

          {/* ── JOURNEY / TIMELINE ────────────────────────────── */}
          <section id="journey" ref={(node) => (sectionsRef.current[5] = node)} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <SectionHeading
              theme={theme}
              eyebrow="Journey"
              title="My Journey"
              description="Every milestone is a step toward becoming the developer I'm meant to be."
            />
            <div className="grid gap-8 items-start lg:grid-cols-[1fr_0.7fr]">
              {/* Timeline — edit content.js to update dates/text */}
              <div className="relative space-y-6">
                {/* Vertical line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#B58A55] via-[#D6B98C] to-transparent hidden sm:block" />

                {timeline.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className={`relative rounded-[2rem] border p-6 sm:ml-14 ${surfaceClass}`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-[3.25rem] top-8 hidden sm:flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#B58A55] bg-[#FFFDF8]">
                      <div className="h-2 w-2 rounded-full bg-[#B58A55]" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#B58A55]">{item.year}</p>
                    <h3 className={`mt-2 text-xl font-bold ${textPrimary}`}>{item.title}</h3>
                    <p className={`mt-3 text-sm leading-relaxed ${textSecondary}`}>{item.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Standing character beside timeline */}
              <CharacterIllustration
                src="/images/characters/standing.png"
                alt="3D cartoon developer standing confidently with a laptop"
                variant="section"
                animation="slide-right"
                className="mx-auto w-full max-w-xs hidden lg:flex sticky top-28"
              />
            </div>
          </section>

          {/* ── EXPERIENCE / SERVICES ─────────────────────────── */}
          <section ref={(node) => (sectionsRef.current[6] = node)} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <SectionHeading
              theme={theme}
              eyebrow="Experience"
              title="Services shaped for modern teams"
              description="I partner with founders and product teams to turn ambitious ideas into beautiful execution."
            />
            <div className="grid gap-6 md:grid-cols-2">
              {experiences.map((service) => (
                <motion.div key={service.title} whileHover={{ y: -6 }} className={`rounded-[2rem] border p-6 backdrop-blur-xl ${softCardClass}`}>
                  <h3 className={`text-xl font-bold ${textPrimary}`}>{service.title}</h3>
                  <p className={`mt-3 text-sm ${textSecondary}`}>{service.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── TESTIMONIALS ──────────────────────────────────── */}
          <section ref={(node) => (sectionsRef.current[7] = node)} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <SectionHeading
              theme={theme}
              eyebrow="Testimonials"
              title="Trusted by people who value detail"
              description="The experience is designed to feel calm, premium, and high-conviction at every touchpoint."
            />
            <div className="grid gap-6 lg:grid-cols-3">
              {testimonials.map((item) => (
                <motion.div key={item.name} whileHover={{ y: -6 }} className={`rounded-[2rem] border p-6 ${surfaceClass}`}>
                  <p className={`text-base italic ${textSecondary}`}>"{item.quote}"</p>
                  <div className="mt-5">
                    <p className={`font-bold ${textPrimary}`}>{item.name}</p>
                    <p className="text-xs font-semibold text-[#B58A55] mt-1">{item.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <GitHubSection theme={theme} />

          {/* ── CONTACT ───────────────────────────────────────── */}
          <section id="contact" ref={(node) => (sectionsRef.current[8] = node)} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <SectionHeading
              theme={theme}
              eyebrow="Contact"
              title="Let's Build Something"
              description="Have an idea, project, or opportunity? I'd love to hear from you."
            />
            <div className={`grid gap-8 rounded-[2rem] border p-8 shadow-[0_10px_40px_rgba(29,29,27,0.04)] lg:grid-cols-[1fr_1.1fr] ${surfaceClass}`}>
              <div className="flex flex-col justify-between space-y-6">
                <div className={`space-y-4 ${textSecondary}`}>
                  <h3 className={`text-2xl font-bold ${textPrimary}`}>Got a project in mind?</h3>
                  <p>Have an idea that needs a bold digital presence?</p>
                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold text-[#1D1D1B]">Email: </span>
                      <a href="mailto:19moulidhara@gmail.com" className="font-semibold underline underline-offset-4 text-[#B58A55]">
                        19moulidhara@gmail.com
                      </a>
                    </p>
                    <p>
                      <span className="font-semibold text-[#1D1D1B]">GitHub: </span>
                      <a href="https://github.com/Mouli1912" className="font-semibold underline underline-offset-4 text-[#B58A55]" target="_blank" rel="noreferrer">
                        github.com/Mouli1912
                      </a>
                    </p>
                    <p>
                      <span className="font-semibold text-[#1D1D1B]">LinkedIn: </span>
                      <a href="https://www.linkedin.com/" className="font-semibold underline underline-offset-4 text-[#B58A55]" target="_blank" rel="noreferrer">
                        linkedin.com/in/mouli
                      </a>
                    </p>
                  </div>
                </div>

                {/* Contact character — friendly standing pose holding laptop */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative mx-auto flex w-full max-w-xs flex-col items-center justify-center p-2 pt-4"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#B58A55]/15 to-[#D6B98C]/25 blur-2xl" />
                  <img
                    src="/images/characters/contact.png"
                    alt="3D cartoon developer holding a laptop and ready to connect"
                    loading="lazy"
                    className="relative z-10 h-auto max-h-[260px] w-full object-contain drop-shadow-[0_15px_30px_rgba(29,29,27,0.12)]"
                  />
                </motion.div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                  className="w-full rounded-2xl border border-[#DDD3C3] bg-[#F7F3EA] px-4 py-3 text-[#1D1D1B] outline-none transition focus:border-[#B58A55] focus:bg-[#FFFDF8]"
                  placeholder="Your name"
                  required
                  aria-label="Your name"
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                  className="w-full rounded-2xl border border-[#DDD3C3] bg-[#F7F3EA] px-4 py-3 text-[#1D1D1B] outline-none transition focus:border-[#B58A55] focus:bg-[#FFFDF8]"
                  placeholder="Your email"
                  required
                  aria-label="Your email"
                />
                <textarea
                  value={formData.message}
                  onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                  className="min-h-32 w-full rounded-2xl border border-[#DDD3C3] bg-[#F7F3EA] px-4 py-3 text-[#1D1D1B] outline-none transition focus:border-[#B58A55] focus:bg-[#FFFDF8]"
                  placeholder="Tell me about your project or idea"
                  required
                  aria-label="Your message"
                />
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#1D1D1B] px-8 py-3.5 text-sm font-semibold text-[#F7F3EA] transition-all hover:bg-[#B58A55] hover:text-white shadow-md sm:w-auto"
                >
                  Send Message
                </button>
                {status ? <p className="text-sm font-medium text-[#B58A55]">{status}</p> : null}
              </form>
            </div>
          </section>
        </main>

        <footer className="border-t border-[#DDD3C3] px-4 py-10 text-center text-sm text-[#68645D] sm:px-6 lg:px-8">
          <p>© 2026 Mouli Dhara. Crafted with warm editorial elegance.</p>
        </footer>
      </div>
    </>
  );
}

export default App;
