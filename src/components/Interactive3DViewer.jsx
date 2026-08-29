import { useState, useRef, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { FaCube, FaRedo, FaInfoCircle, FaPalette, FaMicrochip } from "react-icons/fa";

// Dynamically import Three.js components with SSR turned off
const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

const OrbitControls = dynamic(
  () => import("@react-three/drei").then((mod) => mod.OrbitControls),
  { ssr: false }
);

const Float = dynamic(
  () => import("@react-three/drei").then((mod) => mod.Float),
  { ssr: false }
);

const ContactShadows = dynamic(
  () => import("@react-three/drei").then((mod) => mod.ContactShadows),
  { ssr: false }
);

// 3D Helmet / Tech Sphere Model Component
function HelmetModel({ colorTheme }) {
  const meshRef = useRef();

  const colorMap = {
    neon: "#D2FF00",
    stealth: "#1a1a24",
    chrome: "#e2e8f0",
    papaya: "#ff8000",
  };

  const activeColor = colorMap[colorTheme] || "#D2FF00";

  return (
    <group ref={meshRef}>
      {/* Outer Helmet Shell */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          color={activeColor}
          roughness={0.2}
          metalness={0.8}
          wireframe={false}
        />
      </mesh>

      {/* Helmet Visor */}
      <mesh position={[0, 0.2, 0.8]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.25, 0.8, 32, 1, false, 0, Math.PI]} />
        <meshStandardMaterial
          color="#050508"
          roughness={0.1}
          metalness={0.95}
        />
      </mesh>

      {/* LN4 Logo Decal Band */}
      <mesh position={[0, 0.9, 0.1]} rotation={[0.4, 0, 0]}>
        <torusGeometry args={[1.35, 0.08, 16, 100]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Aerodynamic Fin Top */}
      <mesh position={[0, 1.4, -0.2]}>
        <boxGeometry args={[0.3, 0.2, 1.2]} />
        <meshStandardMaterial color="#D2FF00" roughness={0.3} metalness={0.7} />
      </mesh>
    </group>
  );
}

export default function Interactive3DViewer() {
  const [colorTheme, setColorTheme] = useState("neon");
  const [activeHotspot, setActiveHotspot] = useState(null);

  const hotspots = [
    {
      id: "shell",
      title: "CARBON FIBER SHELL",
      desc: "Ultra-lightweight multi-layer carbon composite engineered for maximum impact protection at 350+ KM/H.",
    },
    {
      id: "visor",
      title: "ANTI-FOG VISOR",
      desc: "3mm zylon reinforced optical visor with anti-scratch coating & electro-chromic tint control.",
    },
    {
      id: "aero",
      title: "AERO REAR SPOILER",
      desc: "Custom CFD-optimized airflow spoiler reducing drag by 4.2% down the main straights.",
    },
  ];

  return (
    <section id="3d-gear" className="py-24 bg-[#0a0a0c] text-white relative overflow-hidden border-t border-b border-white/10">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#D2FF00]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D2FF00]/10 border border-[#D2FF00]/30 rounded-full font-chakra text-xs font-bold text-[#D2FF00] tracking-widest uppercase mb-3">
              <FaCube />
              <span>3D INTERACTIVE ENGINE</span>
            </div>

            <h2 className="font-syne font-extrabold text-4xl sm:text-6xl uppercase tracking-tighter">
              LN4 RACE <span className="text-[#D2FF00]">GEAR 3D</span>
            </h2>
          </div>

          <p className="text-gray-400 font-space max-w-md mt-4 md:mt-0 text-sm">
            Drag to rotate the 3D helmet in 360 degrees. Custom helmet design engineered for high G-force aerodynamics.
          </p>
        </div>

        {/* 3D Canvas Box + Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main 3D Viewport Box */}
          <div className="lg:col-span-8 bg-[#121217] border border-white/10 rounded-3xl h-[480px] sm:h-[540px] relative overflow-hidden group shadow-2xl">
            
            {/* Top Status Bar */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs font-chakra">
                <span className="w-2 h-2 rounded-full bg-[#D2FF00] animate-pulse"></span>
                <span>WEBGL 3D RENDERER</span>
              </div>

              <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs font-chakra text-gray-300">
                DRAG TO ROTATE 360°
              </div>
            </div>

            {/* 3D Canvas Container */}
            <div className="w-full h-full cursor-grab active:cursor-grabbing">
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center text-gray-400 font-chakra text-sm">
                  LOADING 3D MODEL...
                </div>
              }>
                <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[10, 10, 5]} intensity={1.5} />
                  <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#D2FF00" />
                  
                  <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <HelmetModel colorTheme={colorTheme} />
                  </Float>

                  <ContactShadows position={[0, -1.8, 0]} opacity={0.6} scale={10} blur={2.5} far={4} color="#D2FF00" />
                  <OrbitControls enableZoom={true} enablePan={false} maxDistance={7} minDistance={2.5} />
                </Canvas>
              </Suspense>
            </div>
          </div>

          {/* Right Control Panel & Hotspot Specs */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Color Palette Selector */}
            <div className="bg-[#121217] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 font-chakra font-bold text-xs text-[#D2FF00] tracking-widest uppercase mb-4">
                <FaPalette />
                <span>SELECT HELMET LIVERY</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "neon", label: "LN4 NEON LIME", color: "#D2FF00" },
                  { id: "stealth", label: "STEALTH CARBON", color: "#1a1a24" },
                  { id: "papaya", label: "McLAREN PAPAYA", color: "#ff8000" },
                  { id: "chrome", label: "SILVER CHROME", color: "#e2e8f0" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setColorTheme(item.id)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-chakra font-bold transition-all ${
                      colorTheme === item.id
                        ? "border-[#D2FF00] bg-[#D2FF00]/10 text-white shadow-[0_0_15px_rgba(210,255,0,0.2)]"
                        : "border-white/10 bg-black/40 text-gray-400 hover:text-white"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-white/20"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Hotspot Tech Specs */}
            <div className="bg-[#121217] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 font-chakra font-bold text-xs text-[#D2FF00] tracking-widest uppercase mb-4">
                <FaMicrochip />
                <span>TECHNICAL SPECIFICATIONS</span>
              </div>

              <div className="space-y-3">
                {hotspots.map((hs) => (
                  <div
                    key={hs.id}
                    onClick={() => setActiveHotspot(activeHotspot === hs.id ? null : hs.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      activeHotspot === hs.id
                        ? "border-[#D2FF00] bg-[#D2FF00]/10"
                        : "border-white/5 bg-black/30 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between font-chakra font-bold text-sm">
                      <span className="text-white">{hs.title}</span>
                      <span className="text-[#D2FF00] text-xs">
                        {activeHotspot === hs.id ? "—" : "+"}
                      </span>
                    </div>

                    {activeHotspot === hs.id && (
                      <p className="mt-2 text-xs text-gray-300 font-space leading-relaxed">
                        {hs.desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
