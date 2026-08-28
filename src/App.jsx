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
import useMouseGlow from './hooks/useMouseGlow';
import { floatingBadges, skills, projects, timeline, experiences, testimonials, socialLinks } from './constants/content';

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
          
          <section className="mx-auto grid min-h-[90vh] max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
            <motion.div ref={heroRef} className="relative z-10 max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6 inline-flex items-center rounded-full border border-[#DDD3C3] bg-[#EDE5D6]/80 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#68645D]"
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
                transition={{ duration: 0.9, delay: 0.2 }}
                className="mt-6 text-xl font-medium sm:text-2xl text-[#68645D]"
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
                  href="/Mouli-Resume.pdf"
                  download
                  className="rounded-full bg-[#1D1D1B] px-7 py-3.5 text-sm font-semibold text-[#F7F3EA] transition-all hover:bg-[#B58A55] hover:text-white shadow-sm hover:-translate-y-0.5"
                >
                  Download Resume
                </a>
                <a
                  href="#projects"
                  className="rounded-full border border-[#B58A55] bg-transparent px-7 py-3.5 text-sm font-semibold text-[#1D1D1B] transition-all hover:bg-[#EDE5D6] hover:-translate-y-0.5"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="rounded-full border border-[#DDD3C3] bg-[#FFFDF8] px-7 py-3.5 text-sm font-semibold text-[#1D1D1B] transition-all hover:border-[#B58A55] hover:bg-[#EDE5D6] hover:-translate-y-0.5"
                >
                  Contact Me
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

            <motion.div ref={profileRef} className="relative mx-auto flex w-full max-w-md items-center justify-center">
              <AvatarScene theme={theme} />
            </motion.div>
          </section>

          <section id="about" ref={(node) => (sectionsRef.current[0] = node)} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <SectionHeading theme={theme} eyebrow="About Me" title="Designing immersive digital stories" description="I blend product thinking, visual design, and frontend craftsmanship to create memorable web experiences that feel premium and intuitive." />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8 }}
              className={`rounded-[2rem] border p-8 backdrop-blur-xl ${softCardClass}`}
            >
              <div className="grid gap-8 items-center lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-6">
                  <div className={`space-y-4 ${textSecondary}`}>
                    <p>I’m a frontend developer who loves crafting polished user interfaces with modern tooling and a strong design sensibility.</p>
                    <p>My work focuses on clarity, performance, motion, and meaningful interactions that make products feel alive.</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-[#DDD3C3] bg-[#EDE5D6]/60 p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B58A55]">Focus</p>
                      <p className={`mt-2 text-base font-semibold ${textPrimary}`}>React, UI systems, responsive storytelling</p>
                    </div>
                    <div className="rounded-2xl border border-[#DDD3C3] bg-[#EDE5D6]/60 p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B58A55]">Approach</p>
                      <p className={`mt-2 text-base font-semibold ${textPrimary}`}>Minimal, premium, conversion-led experiences</p>
                    </div>
                  </div>
                </div>

                {/* 3D Character Illustration Area */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative mx-auto flex w-full max-w-sm flex-col items-center justify-center p-4"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#B58A55]/15 to-[#D6B98C]/25 blur-3xl" />
                  <motion.img
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    src="/images/about-character.png"
                    alt="Thoughtful 3D developer character illustration"
                    loading="lazy"
                    className="relative z-10 h-auto max-h-[340px] w-full object-contain drop-shadow-[0_15px_30px_rgba(29,29,27,0.12)]"
                  />
                </motion.div>
              </div>
            </motion.div>
          </section>

          <section id="skills" ref={(node) => (sectionsRef.current[1] = node)} className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            {/* Subtle 3D floating developer-themed elements */}
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

            <SectionHeading theme={theme} eyebrow="Skills" title="A toolkit shaped for modern product teams" description="I enjoy combining design disciplines and development fluency to build interfaces that feel both elegant and robust." />
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
          </section>

          <section id="projects" ref={(node) => (sectionsRef.current[2] = node)} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end mb-8">
              <SectionHeading theme={theme} eyebrow="Projects" title="Selected work with thoughtful interaction" description="Each project is designed to feel like a product launch, not just a demo." />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="hidden md:flex flex-shrink-0 items-center justify-center relative w-24 h-24"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#B58A55]/20 to-[#D6B98C]/30 blur-xl" />
                <img
                  src="/images/projects-character.png"
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

          <section ref={(node) => (sectionsRef.current[3] = node)} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <SectionHeading theme={theme} eyebrow="Timeline" title="A growing path of craft and collaboration" description="Momentum matters. Each milestone brought sharper execution and stronger product instincts." />
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <motion.div key={item.title} initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className={`rounded-[2rem] border p-6 ${surfaceClass}`}>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#B58A55]">{item.year}</p>
                  <h3 className={`mt-2 text-xl font-bold ${textPrimary}`}>{item.title}</h3>
                  <p className={`mt-3 text-sm ${textSecondary}`}>{item.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section ref={(node) => (sectionsRef.current[4] = node)} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <SectionHeading theme={theme} eyebrow="Experience" title="Services shaped for modern teams" description="I partner with founders and product teams to turn ambitious ideas into beautiful execution." />
            <div className="grid gap-6 md:grid-cols-2">
              {experiences.map((service) => (
                <motion.div key={service.title} whileHover={{ y: -6 }} className={`rounded-[2rem] border p-6 backdrop-blur-xl ${softCardClass}`}>
                  <h3 className={`text-xl font-bold ${textPrimary}`}>{service.title}</h3>
                  <p className={`mt-3 text-sm ${textSecondary}`}>{service.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section ref={(node) => (sectionsRef.current[5] = node)} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <SectionHeading theme={theme} eyebrow="Testimonials" title="Trusted by people who value detail" description="The experience is designed to feel calm, premium, and high-conviction at every touchpoint." />
            <div className="grid gap-6 lg:grid-cols-3">
              {testimonials.map((item) => (
                <motion.div key={item.name} whileHover={{ y: -6 }} className={`rounded-[2rem] border p-6 ${surfaceClass}`}>
                  <p className={`text-base italic ${textSecondary}`}>“{item.quote}”</p>
                  <div className="mt-5">
                    <p className={`font-bold ${textPrimary}`}>{item.name}</p>
                    <p className="text-xs font-semibold text-[#B58A55] mt-1">{item.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <GitHubSection theme={theme} />

          <section id="contact" ref={(node) => (sectionsRef.current[6] = node)} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <SectionHeading theme={theme} eyebrow="Contact" title="Let’s build something striking" description="I’m open to collaborations, freelance projects, and product work that values clarity and depth." />
            <div className={`grid gap-8 rounded-[2rem] border p-8 shadow-[0_10px_40px_rgba(29,29,27,0.04)] lg:grid-cols-[1fr_1.1fr] ${surfaceClass}`}>
              <div className="flex flex-col justify-between space-y-6">
                <div className={`space-y-4 ${textSecondary}`}>
                  <h3 className={`text-2xl font-bold ${textPrimary}`}>Got a project in mind?</h3>
                  <p>Have an idea that needs a bold digital presence?</p>
                  <p>Email me at <a href="mailto:moulidhara19@gmail.com" className="font-semibold underline underline-offset-4 text-[#B58A55]">moulidhara19@gmail.com</a></p>
                </div>

                {/* 3D Contact Character Illustration */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative mx-auto flex w-full max-w-xs flex-col items-center justify-center p-2 pt-4"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#B58A55]/15 to-[#D6B98C]/25 blur-2xl" />
                  <img
                    src="/images/contact-character.png"
                    alt="3D cartoon character illustration working thoughtfully"
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
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                  className="w-full rounded-2xl border border-[#DDD3C3] bg-[#F7F3EA] px-4 py-3 text-[#1D1D1B] outline-none transition focus:border-[#B58A55] focus:bg-[#FFFDF8]"
                  placeholder="Your email"
                  required
                />
                <textarea
                  value={formData.message}
                  onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                  className="min-h-32 w-full rounded-2xl border border-[#DDD3C3] bg-[#F7F3EA] px-4 py-3 text-[#1D1D1B] outline-none transition focus:border-[#B58A55] focus:bg-[#FFFDF8]"
                  placeholder="Tell me about your project"
                  required
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
