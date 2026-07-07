import Antigravity from './Antigravity'
import './App.css'

function App() {
  return (
    <main className="app-shell">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">React Three Fiber showcase</p>
          <h1>Interactive motion for a modern portfolio.</h1>
          <p className="hero-text">
            The antigravity field adds a playful, immersive animation beneath the
            headline so the interface feels alive and expressive.
          </p>
        </div>

        <div className="hero-visual">
          <Antigravity
            count={280}
            magnetRadius={7}
            ringRadius={7}
            waveSpeed={0.45}
            waveAmplitude={1.1}
            particleSize={1.5}
            lerpSpeed={0.05}
            color="#FF9FFC"
            autoAnimate
            particleVariance={0.95}
            rotationSpeed={0.15}
            depthFactor={1.1}
            pulseSpeed={2.8}
            fieldStrength={9}
          />
        </div>
      </section>
    </main>
  )
}

export default App
