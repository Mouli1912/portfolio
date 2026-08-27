import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
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
import useMouseGlow from './hooks/useMouseGlow';
import { floatingBadges, skills, projects, timeline, experiences, testimonials, socialLinks } from './constants/content';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const glow = useMouseGlow();
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'dark';
    }

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
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-500';
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
        <section className="mx-auto grid min-h-[90vh] max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
          <motion.div ref={heroRef} className="relative z-10 max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className={`mb-6 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-700 ${isDark ? 'text-cyan-200' : 'text-cyan-700'}`}>
              Premium Frontend Developer • Available for select projects
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }} className={`text-4xl font-semibold leading-tight sm:text-5xl lg:text-7xl ${textPrimary}`}>
              Hi, I'm <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">Mouli Dhara</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className={`mt-6 text-xl font-medium sm:text-2xl ${textSecondary}`}>
              <span className="font-semibold text-cyan-200"><TypingText phrases={['Frontend Developer', 'React Developer', 'UI Designer']} /></span>
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }} className="mt-6 flex flex-wrap gap-4">
              <a href="/Mouli-Resume.pdf" download className="rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-6 py-3 font-semibold text-slate-950 transition hover:-translate-y-1">
                Download Resume
              </a>
              <a href="#projects" className={`rounded-full border px-6 py-3 font-semibold transition hover:-translate-y-1 ${isDark ? 'border-white/20 bg-white/10 text-slate-100 hover:bg-white/20' : 'border-slate-200 bg-white/80 text-slate-800 hover:bg-white'}`}>
                View Projects
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4 }} className="mt-10 flex flex-wrap gap-3">
              {floatingBadges.map((badge) => (
                <span key={badge} className={`rounded-full border px-3 py-2 text-sm shadow-lg ${chipClass}`}>
                  {badge}
                </span>
              ))}
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.5 }} className="mt-10 flex gap-4">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} className={`rounded-full border p-3 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:text-cyan-500 ${isDark ? 'border-white/10 bg-slate-900/70 text-slate-200' : 'border-slate-200 bg-white/80 text-slate-700'}`}>
                  {social.label}
                </a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div ref={profileRef} className="relative mx-auto flex w-full max-w-md items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-3xl" />
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full"
              onMouseMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;
                event.currentTarget.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${y * -10}deg)`;
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
              }}
            >
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-500/30 via-fuchsia-500/20 to-transparent blur-2xl" />
              <AvatarScene theme={theme} />
            </motion.div>
          </motion.div>
        </section>

        <section id="about" ref={(node) => (sectionsRef.current[0] = node)} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading theme={theme} eyebrow="About Me" title="Designing immersive digital stories" description="I blend product thinking, visual design, and frontend craftsmanship to create memorable web experiences that feel premium and intuitive." />
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`rounded-[2rem] border p-8 backdrop-blur-xl ${softCardClass}`}>
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className={`space-y-4 ${textSecondary}`}>
                <p>I’m a frontend developer who loves crafting polished user interfaces with modern tooling and a strong design sensibility.</p>
                <p>My work focuses on clarity, performance, motion, and meaningful interactions that make products feel alive.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
                  <p className="text-sm uppercase tracking-[0.25em] text-cyan-700">Focus</p>
                  <p className={`mt-2 text-lg ${textPrimary}`}>React, UI systems, responsive storytelling</p>
                </div>
                <div className="rounded-2xl border border-fuchsia-400/20 bg-fuchsia-400/10 p-4">
                  <p className="text-sm uppercase tracking-[0.25em] text-fuchsia-700">Approach</p>
                  <p className={`mt-2 text-lg ${textPrimary}`}>Minimal, premium, conversion-led experiences</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="skills" ref={(node) => (sectionsRef.current[1] = node)} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading theme={theme} eyebrow="Skills" title="A toolkit shaped for modern product teams" description="I enjoy combining design disciplines and development fluency to build interfaces that feel both elegant and robust." />
          <div className="grid gap-6 lg:grid-cols-3">
            {skills.map((group) => (
              <motion.div key={group.title} whileHover={{ y: -6, scale: 1.01 }} className={`rounded-[2rem] border p-6 shadow-2xl ${surfaceClass}`}>
                <h3 className={`text-xl font-semibold ${textPrimary}`}>{group.title}</h3>
                <div className="mt-5 flex flex-wrap gap-3">
                  {group.items.map((item) => (
                    <span key={item} className={`rounded-full border px-3 py-2 text-sm ${chipClass}`}>
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="projects" ref={(node) => (sectionsRef.current[2] = node)} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading theme={theme} eyebrow="Projects" title="Selected work with thoughtful interaction" description="Each project is designed to feel like a product launch, not just a demo." />
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

        <section id="contact" ref={(node) => (sectionsRef.current[6] = node)} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading theme={theme} eyebrow="Contact" title="Let’s build something striking" description="I’m open to collaborations, freelance projects, and product work that values clarity and depth." />
          <div className={`grid gap-8 rounded-[2rem] border p-8 shadow-[0_0_80px_rgba(37,99,235,0.18)] lg:grid-cols-[0.8fr_1.2fr] ${surfaceClass}`}>
            <div className={`space-y-4 ${textSecondary}`}>
              <p>Have an idea that needs a bold digital presence?</p>
              <p>Email me at <a href="mailto:moulidhara19@gmail.com" className={isDark ? 'text-cyan-300' : 'text-cyan-700'}>moulidhara19@gmail.com</a></p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} className={`w-full rounded-2xl border px-4 py-3 outline-none ${isDark ? 'border-white/10 bg-slate-950/70 text-white' : 'border-slate-200 bg-white/80 text-slate-900'}`} placeholder="Your name" required />
              <input type="email" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} className={`w-full rounded-2xl border px-4 py-3 outline-none ${isDark ? 'border-white/10 bg-slate-950/70 text-white' : 'border-slate-200 bg-white/80 text-slate-900'}`} placeholder="Your email" required />
              <textarea value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} className={`min-h-32 w-full rounded-2xl border px-4 py-3 outline-none ${isDark ? 'border-white/10 bg-slate-950/70 text-white' : 'border-slate-200 bg-white/80 text-slate-900'}`} placeholder="Tell me about your project" required />
              <button type="submit" className="rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-6 py-3 font-semibold text-slate-950 transition hover:-translate-y-1">
                Send Message
              </button>
              {status ? <p className={`text-sm ${isDark ? 'text-cyan-200' : 'text-cyan-700'}`}>{status}</p> : null}
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


