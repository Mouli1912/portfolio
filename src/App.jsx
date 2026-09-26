import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { send } from '@emailjs/browser';
import Navbar from './components/Navbar';
import ParticleField from './components/ParticleField';
import SectionHeading from './components/SectionHeading';
import ProjectCard from './components/ProjectCard';
import GitHubSection from './components/GitHubSection';
import ScrollProgress from './components/ScrollProgress';
import TypingText from './components/TypingText';
import FloatingTechBadges from './components/FloatingTechBadges';
import Preloader from './components/Preloader';
import useMouseGlow from './hooks/useMouseGlow';
import { floatingBadges, skills, projects, timeline, experiences, testimonials, socialLinks } from './constants/content';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const glow = useMouseGlow();
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    const savedTheme = window.localStorage.getItem('portfolio-theme');
    return savedTheme === 'light' ? 'light' : 'dark';
  });
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const heroRef = useRef(null);
  const profileRef = useRef(null);
  const sectionsRef = useRef([]);
  const isDark = theme === 'dark';

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
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
  }, []);

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

  const surfaceClass = isDark
    ? 'border-white/10 bg-slate-900/70 shadow-cyan-950/20'
    : 'border-slate-200 bg-white/80 shadow-slate-300/60';
  const textPrimary = isDark ? 'text-white' : 'text-slate-900';
  const textSecondary = isDark ? 'text-slate-300' : 'text-slate-700';
  const chipClass = isDark
    ? 'border-white/10 bg-white/5 text-slate-200 shadow-cyan-950/30'
    : 'border-slate-200 bg-white/80 text-slate-700 shadow-slate-300/40';
  const softCardClass = isDark
    ? 'border-white/10 bg-white/10 shadow-[0_0_80px_rgba(6,182,212,0.12)]'
    : 'border-slate-200 bg-white/70 shadow-[0_0_60px_rgba(148,163,184,0.18)]';

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}
      style={{
        background: isDark
          ? 'radial-gradient(circle at top left, rgba(99,102,241,0.16), transparent 30%), linear-gradient(135deg, #030713, #050816 60%, #030712)'
          : 'radial-gradient(circle at top left, rgba(129,140,248,0.18), transparent 30%), linear-gradient(135deg, #f8fbff, #eef4ff 60%, #f7f8ff)',
      }}
    >
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-70"
        style={{
          background: `radial-gradient(circle 320px at ${glow.x}px ${glow.y}px, rgba(96,165,250,0.16), transparent 45%)`,
        }}
      />
      <ScrollProgress />
      <Navbar theme={theme} toggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))} />
      <main id="home" className="relative overflow-hidden">
        <ParticleField theme={theme} />

        {/* 1. HERO SECTION */}
        <section className="mx-auto grid min-h-[90vh] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
          <motion.div ref={heroRef} className="relative z-10 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`mb-6 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium ${
                isDark ? 'text-cyan-200' : 'text-cyan-700'
              }`}
            >
              Frontend Developer • Student & Craftsperson
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className={`text-4xl font-semibold leading-tight sm:text-5xl lg:text-7xl ${textPrimary}`}
            >
              Hi, I'm <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">Mouli Dhara</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className={`mt-6 text-xl font-medium sm:text-2xl ${textSecondary}`}
            >
              <span className={`font-semibold ${isDark ? 'text-cyan-200' : 'text-cyan-700'}`}>
                <TypingText phrases={['Frontend Developer', 'React Developer', 'UI Designer']} />
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className={`mt-4 text-base leading-relaxed sm:text-lg ${textSecondary}`}
            >
              Computer Science student building polished, interactive web applications with modern frontend frameworks and intuitive digital designs.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-6 py-3 font-semibold text-slate-950 transition hover:-translate-y-1 shadow-lg shadow-cyan-500/25"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className={`rounded-full border px-6 py-3 font-semibold transition hover:-translate-y-1 ${
                  isDark
                    ? 'border-cyan-400/30 bg-white/10 text-slate-100 hover:bg-white/20'
                    : 'border-slate-300 bg-white/80 text-slate-800 hover:bg-white'
                }`}
              >
                Contact Me
              </a>
              <a
                href="/Mouli-Resume.pdf"
                download
                className={`rounded-full border px-6 py-3 font-semibold transition hover:-translate-y-1 ${
                  isDark
                    ? 'border-white/20 bg-white/5 text-slate-200 hover:bg-white/10'
                    : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
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
                <span key={badge} className={`rounded-full border px-3.5 py-1.5 text-sm shadow-md ${chipClass}`}>
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
                  className={`rounded-full border p-3 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:text-cyan-400 ${
                    isDark ? 'border-white/10 bg-slate-900/70 text-slate-200' : 'border-slate-200 bg-white/80 text-slate-700'
                  }`}
                >
                  {social.label}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE: 3D Developer Character Illustration */}
          <motion.div ref={profileRef} className="relative mx-auto flex w-full max-w-lg items-center justify-center pt-6 lg:pt-0">
            <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="absolute inset-4 rounded-full bg-fuchsia-500/15 blur-2xl" />
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-full max-w-[420px] flex items-center justify-center p-4"
            >
              <img
                src="/images/hero-character.png"
                alt="3D cartoon female developer studying and working on a laptop"
                className="h-auto max-h-[480px] w-full object-contain filter drop-shadow-[0_20px_35px_rgba(6,182,212,0.25)] transition-transform duration-500 hover:scale-[1.02]"
                loading="eager"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* 2. ABOUT SECTION */}
        <section id="about" ref={(node) => (sectionsRef.current[0] = node)} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            theme={theme}
            eyebrow="About Me"
            title="Designing immersive digital stories"
            description="I blend product thinking, visual design, and frontend craftsmanship to create memorable web experiences that feel premium and intuitive."
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className={`rounded-[2.5rem] border p-8 sm:p-10 backdrop-blur-xl ${softCardClass}`}
          >
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
              <div className="space-y-6">
                <div className={`space-y-4 text-base sm:text-lg leading-relaxed ${textSecondary}`}>
                  <p>
                    I’m a frontend developer and Computer Science student who loves building sleek user interfaces with modern web tooling and responsive layout principles.
                  </p>
                  <p>
                    My focus centers on high performance, clean motion design, clear typography, and thoughtful user interactions that make digital products enjoyable to use.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 pt-2">
                  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-500">Focus</p>
                    <p className={`mt-2 text-base font-semibold ${textPrimary}`}>React, JavaScript, CSS & Tailwind</p>
                  </div>
                  <div className="rounded-2xl border border-fuchsia-400/20 bg-fuchsia-400/10 p-5 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-500">Approach</p>
                    <p className={`mt-2 text-base font-semibold ${textPrimary}`}>Clean UI, Performance & Accessibility</p>
                  </div>
                </div>
              </div>

              {/* Thoughtful 3D Character Illustration beside About Me */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative mx-auto flex w-full max-w-md items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 p-4 shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/15 via-purple-500/10 to-transparent blur-xl" />
                <img
                  src="/images/about-character.jpg"
                  alt="Thoughtful 3D developer character with glasses reviewing code"
                  className="relative z-10 h-auto max-h-[380px] w-full rounded-2xl object-cover shadow-lg transition-transform duration-500 hover:scale-[1.03]"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* 3. SKILLS SECTION */}
        <section id="skills" ref={(node) => (sectionsRef.current[1] = node)} className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            theme={theme}
            eyebrow="Skills"
            title="A toolkit shaped for modern product teams"
            description="I enjoy combining design disciplines and development fluency to build interfaces that feel both elegant and robust."
          />
          <div className="relative">
            {/* Floating 3D Tech Elements Around Cards */}
            <FloatingTechBadges theme={theme} />

            <div className="grid gap-6 lg:grid-cols-3 relative z-10">
              {skills.map((group, idx) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className={`rounded-[2rem] border p-7 shadow-2xl transition-all ${surfaceClass}`}
                >
                  <h3 className={`text-xl font-semibold ${textPrimary}`}>{group.title}</h3>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {group.items.map((item) => (
                      <span key={item} className={`rounded-full border px-3.5 py-2 text-sm font-medium ${chipClass}`}>
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. PROJECT SECTION */}
        <section id="projects" ref={(node) => (sectionsRef.current[2] = node)} className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <div className="flex-1">
              <SectionHeading
                theme={theme}
                eyebrow="Projects"
                title="Selected work with thoughtful interaction"
                description="Each project is designed to feel like a product launch, not just a demo."
              />
            </div>
            {/* Small 3D character illustration near header */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden md:flex items-center justify-center w-28 h-28 relative shrink-0"
            >
              <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl" />
              <img
                src="/images/project-character.png"
                alt="Small 3D developer character sitting with laptop near project section"
                className="relative z-10 max-h-24 w-auto object-contain filter drop-shadow-md"
                loading="lazy"
              />
            </motion.div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} theme={theme} />
            ))}
          </div>
        </section>

        <section ref={(node) => (sectionsRef.current[3] = node)} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading theme={theme} eyebrow="Timeline" title="A growing path of craft and collaboration" description="Momentum matters. Each milestone brought sharper execution and stronger product instincts." />
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className={`rounded-[2rem] border p-6 shadow-2xl ${surfaceClass}`}>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-500">{item.year}</p>
                <h3 className={`mt-2 text-xl font-semibold ${textPrimary}`}>{item.title}</h3>
                <p className={`mt-3 ${textSecondary}`}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section ref={(node) => (sectionsRef.current[4] = node)} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading theme={theme} eyebrow="Experience" title="Services shaped for modern teams" description="I partner with founders and product teams to turn ambitious ideas into beautiful execution." />
          <div className="grid gap-6 md:grid-cols-2">
            {experiences.map((service) => (
              <motion.div key={service.title} whileHover={{ y: -6 }} className={`rounded-[2rem] border p-6 backdrop-blur-xl ${softCardClass}`}>
                <h3 className={`text-xl font-semibold ${textPrimary}`}>{service.title}</h3>
                <p className={`mt-3 ${textSecondary}`}>{service.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section ref={(node) => (sectionsRef.current[5] = node)} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading theme={theme} eyebrow="Testimonials" title="Trusted by people who value detail" description="The experience is designed to feel calm, premium, and high-conviction at every touchpoint." />
          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <motion.div key={item.name} whileHover={{ y: -6 }} className={`rounded-[2rem] border p-6 shadow-2xl ${surfaceClass}`}>
                <p className={`text-lg ${textSecondary}`}>“{item.quote}”</p>
                <div className="mt-5">
                  <p className={`font-semibold ${textPrimary}`}>{item.name}</p>
                  <p className={`text-sm ${isDark ? 'text-cyan-200' : 'text-cyan-700'}`}>{item.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <GitHubSection theme={theme} />

        {/* 5. CONTACT SECTION */}
        <section id="contact" ref={(node) => (sectionsRef.current[6] = node)} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading theme={theme} eyebrow="Contact" title="Let’s build something striking" description="I’m open to collaborations, freelance projects, and product work that values clarity and depth." />
          <div className={`grid gap-10 rounded-[2.5rem] border p-8 sm:p-10 shadow-[0_0_80px_rgba(37,99,235,0.18)] lg:grid-cols-[0.9fr_1.1fr] items-center ${surfaceClass}`}>
            
            {/* Friendly 3D Cartoon Character Illustration */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative flex flex-col items-center justify-center space-y-6 text-center lg:text-left"
            >
              <div className="relative w-full max-w-xs sm:max-w-sm flex justify-center">
                <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-3xl" />
                <motion.img
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  src="/images/contact-character.png"
                  alt="3D cartoon female developer thinking and ready to connect"
                  className="relative z-10 h-auto max-h-[320px] w-full object-contain filter drop-shadow-[0_15px_25px_rgba(6,182,212,0.2)]"
                  loading="lazy"
                />
              </div>
              <div className={`space-y-3 ${textSecondary}`}>
                <h4 className={`text-xl font-semibold ${textPrimary}`}>Got a project or idea?</h4>
                <p className="text-base">Have an idea that needs a bold digital presence or want to chat about web development?</p>
                <p className="text-base font-medium">
                  Email me directly at{' '}
                  <a href="mailto:moulidhara19@gmail.com" className={`underline underline-offset-4 ${isDark ? 'text-cyan-300 hover:text-cyan-200' : 'text-cyan-700 hover:text-cyan-800'}`}>
                    moulidhara19@gmail.com
                  </a>
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className={`block mb-2 text-sm font-medium ${textPrimary}`}>Name</label>
                <input
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                  className={`w-full rounded-2xl border px-4 py-3.5 outline-none transition focus:border-cyan-400 ${
                    isDark ? 'border-white/10 bg-slate-950/70 text-white placeholder-slate-500' : 'border-slate-200 bg-white/90 text-slate-900 placeholder-slate-400'
                  }`}
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className={`block mb-2 text-sm font-medium ${textPrimary}`}>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                  className={`w-full rounded-2xl border px-4 py-3.5 outline-none transition focus:border-cyan-400 ${
                    isDark ? 'border-white/10 bg-slate-950/70 text-white placeholder-slate-500' : 'border-slate-200 bg-white/90 text-slate-900 placeholder-slate-400'
                  }`}
                  placeholder="Your email address"
                  required
                />
              </div>
              <div>
                <label className={`block mb-2 text-sm font-medium ${textPrimary}`}>Message</label>
                <textarea
                  value={formData.message}
                  onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                  className={`min-h-36 w-full rounded-2xl border px-4 py-3.5 outline-none transition focus:border-cyan-400 ${
                    isDark ? 'border-white/10 bg-slate-950/70 text-white placeholder-slate-500' : 'border-slate-200 bg-white/90 text-slate-900 placeholder-slate-400'
                  }`}
                  placeholder="Tell me about your project or inquiry..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-8 py-3.5 font-semibold text-slate-950 transition hover:-translate-y-1 shadow-lg shadow-cyan-500/20"
              >
                Send Message
              </button>
              {status ? <p className={`mt-2 text-sm font-medium ${isDark ? 'text-cyan-200' : 'text-cyan-700'}`}>{status}</p> : null}
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-4 py-10 text-center text-sm text-slate-400 sm:px-6 lg:px-8">
        <p>© 2026 Mouli Dhara. Crafted for modern digital storytelling.</p>
      </footer>
    </div>
  );
}

export default App;
