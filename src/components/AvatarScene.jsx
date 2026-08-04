import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { useMemo, useRef } from 'react';

function DeveloperModel() {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.2;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2.4} rotationIntensity={0.12} floatIntensity={0.18}>
        <mesh position={[0, 0.6, 0]} castShadow>
          <sphereGeometry args={[0.45, 32, 32]} />
          <meshStandardMaterial color="#f5c49c" />
        </mesh>
        <mesh position={[0, 0.1, 0]} castShadow>
          <boxGeometry args={[0.7, 0.8, 0.4]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[0, -0.4, 0]} castShadow>
          <boxGeometry args={[0.95, 0.45, 0.6]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0.45, 0.6, 0.1]} castShadow>
          <boxGeometry args={[0.18, 0.18, 0.18]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh position={[-0.45, 0.6, 0.1]} castShadow>
          <boxGeometry args={[0.18, 0.18, 0.18]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0, 0.42, 0.28]} castShadow>
          <boxGeometry args={[0.42, 0.12, 0.02]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0.75, 0.05, 0]} rotation={[0, 0, -0.25]} castShadow>
          <boxGeometry args={[0.8, 0.18, 0.55]} />
          <meshStandardMaterial color="#111827" />
        </mesh>
        <mesh position={[0.7, -0.02, 0.3]} castShadow>
          <boxGeometry args={[0.7, 0.1, 0.5]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.2} />
        </mesh>
      </Float>
    </group>
  );
}

function AvatarScene({ theme }) {
  const isDark = theme === 'dark';
  const lights = useMemo(() => [
    { position: [5, 5, 5], intensity: 2.2 },
    { position: [-5, 2, 2], intensity: 1.2 },
  ], []);

  return (
    <div className={`h-[420px] w-full overflow-hidden rounded-[2rem] border ${isDark ? 'border-white/10 bg-slate-950/70' : 'border-slate-200 bg-slate-100/80'}`}>
      <Canvas camera={{ position: [0, 1.2, 4.2], fov: 35 }} shadows>
        <color attach="background" args={[isDark ? '#050816' : '#f8fbff']} />
        {lights.map((light) => (
          <pointLight key={light.position.join('-')} position={light.position} intensity={light.intensity} color="#60a5fa" />
        ))}
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 6, 6]} intensity={1.6} castShadow />
        <DeveloperModel />
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[2.4, 64]} />
          <meshStandardMaterial color={isDark ? '#0f172a' : '#e2e8f0'} />
        </mesh>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}

export default AvatarScene;
