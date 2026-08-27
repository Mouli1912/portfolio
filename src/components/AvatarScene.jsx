function AvatarScene({ theme }) {
  const isDark = theme === 'dark';

  return (
    <div className={`laptop-girl-scene h-[420px] w-full overflow-hidden rounded-[2rem] border ${isDark ? 'border-white/10 bg-slate-950/70' : 'border-slate-200 bg-slate-100/80'}`}>
      <div className="laptop-girl-glow" />
      <div className="laptop-girl-desk" />
      <div className="laptop-girl">
        <div className="laptop-girl-hair" />
        <div className="laptop-girl-head">
          <span className="laptop-girl-eye laptop-girl-eye-left" />
          <span className="laptop-girl-eye laptop-girl-eye-right" />
          <span className="laptop-girl-smile" />
        </div>
        <div className="laptop-girl-neck" />
        <div className="laptop-girl-body" />
        <div className="laptop-girl-arm laptop-girl-arm-left" />
        <div className="laptop-girl-arm laptop-girl-arm-right" />
        <div className="laptop" aria-label="Girl working on a laptop">
          <div className="laptop-screen"><span>{'</>'}</span></div>
          <div className="laptop-base" />
        </div>
      </div>
      <div className="laptop-girl-code laptop-girl-code-one">const create = () =&gt; {}</div>
      <div className="laptop-girl-code laptop-girl-code-two">design / build / repeat</div>
    </div>
  );
}

export default AvatarScene;
