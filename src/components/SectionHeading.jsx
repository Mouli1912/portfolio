function SectionHeading({ theme, eyebrow, title, description }) {
  const isDark = theme === 'dark';

  return (
    <div className="mb-10 max-w-2xl">
      <p className={`mb-3 text-sm font-semibold uppercase tracking-[0.35em] ${isDark ? 'text-cyan-300/80' : 'text-cyan-700'}`}>{eyebrow}</p>
      <h2 className={`text-3xl font-semibold sm:text-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
      <p className={`mt-4 text-base leading-7 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{description}</p>
    </div>
  );
}

export default SectionHeading;
