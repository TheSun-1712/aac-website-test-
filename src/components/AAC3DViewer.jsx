import { useState, useRef, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { FaCube, FaPalette, FaMicrochip } from "react-icons/fa";

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

// 3D Autonomous Drone Model
function DroneModel({ colorTheme }) {
  const meshRef = useRef();

  const colorMap = {
    griet: "#172E7C",
    gold: "#E5C158",
    red: "#DC2626",
    stealth: "#1a1a24",
  };

  const activeColor = colorMap[colorTheme] || "#172E7C";

  return (
    <group ref={meshRef}>
      {/* Central Drone Core Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 0.4, 1.2]} />
        <meshStandardMaterial color={activeColor} roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Top Sensor Dome */}
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#050508" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* 4 Quad Rotor Arms */}
      {[
        [1.2, 0, 1.2],
        [-1.2, 0, 1.2],
        [1.2, 0, -1.2],
        [-1.2, 0, -1.2],
      ].map((pos, idx) => (
        <group key={idx} position={pos}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.55, 0.05, 16, 32]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.6} />
          </mesh>

          <mesh position={[0, 0.08, 0]} rotation={[0, (idx * Math.PI) / 4, 0]}>
            <boxGeometry args={[0.9, 0.02, 0.1]} />
            <meshStandardMaterial color={activeColor} roughness={0.2} metalness={0.5} />
          </mesh>
        </group>
      ))}

      {/* Connecting Arm Tubes */}
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[3.2, 0.1, 0.1]} />
        <meshStandardMaterial color="#222230" roughness={0.4} metalness={0.7} />
      </mesh>

      <mesh rotation={[0, -Math.PI / 4, 0]}>
        <boxGeometry args={[3.2, 0.1, 0.1]} />
        <meshStandardMaterial color="#222230" roughness={0.4} metalness={0.7} />
      </mesh>
    </group>
  );
}

export default function AAC3DViewer({ isDark }) {
  const [colorTheme, setColorTheme] = useState("griet");
  const [activeHotspot, setActiveHotspot] = useState(null);

  const hotspots = [
    {
      id: "flight-computer",
      title: "Autonomous Flight Controller",
      desc: "Real-time AI flight computer running deep learning algorithms for autonomous obstacle avoidance and trajectory optimization.",
    },
    {
      id: "lidar-sensor",
      title: "3D LiDAR & Vision Sensor Suite",
      desc: "High-frequency multi-spectral camera & 360° LiDAR telemetry mapping environment point-clouds in real time.",
    },
    {
      id: "carbon-chassis",
      title: "Aerospace Carbon Chassis",
      desc: "Ultra-rigid lightweight carbon composite frame engineered for high payload capacity and harsh environment endurance.",
    },
  ];

  return (
    <section id="3d-lab" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-sans text-xs font-semibold tracking-wide uppercase mb-3 border backdrop-blur-md ${
              isDark
                ? "bg-[#DC2626]/20 border-[#DC2626]/40 text-[#DC2626]"
                : "bg-[#E5C158]/20 border-[#E5C158]/40 text-[#F0D375]"
            }`}>
              <FaCube />
              <span>AAC 3D Interactive Lab</span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl tracking-tight text-white">
              Autonomous <span className={isDark ? "text-red-gradient" : "text-gold-gradient"}>Drone Prototype 3D</span>
            </h2>
          </div>

          <p className="font-sans max-w-md mt-3 md:mt-0 text-sm leading-relaxed text-gray-200">
            Drag to rotate our autonomous drone prototype in 360 degrees. Interdisciplinary R&amp;D hardware engineered at AAC GRIET.
          </p>
        </div>

        {/* 3D Viewport Box + Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Viewport */}
          <div className={`lg:col-span-8 border rounded-3xl h-[460px] relative overflow-hidden group shadow-2xl ${
            isDark ? "liquid-glass-dark" : "liquid-glass-blue"
          }`}>
            
            {/* Status Bar */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-black/60 text-xs font-sans font-semibold text-white backdrop-blur-md">
                <span className={`w-2 h-2 rounded-full animate-pulse ${
                  isDark ? "bg-[#DC2626]" : "bg-[#E5C158]"
                }`}></span>
                <span>Interactive 3D Viewport</span>
              </div>

              <div className="px-3.5 py-1.5 rounded-full border border-white/20 bg-black/60 text-xs font-sans text-gray-200 backdrop-blur-md">
                Drag to Rotate 360°
              </div>
            </div>

            {/* 3D Canvas */}
            <div className="w-full h-full cursor-grab active:cursor-grabbing">
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center font-sans text-sm text-gray-300">
                  Loading 3D Model...
                </div>
              }>
                <Canvas camera={{ position: [0, 1.5, 4.5], fov: 50 }}>
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[10, 10, 5]} intensity={1.5} />
                  <directionalLight position={[-10, -10, -5]} intensity={0.5} color={isDark ? "#DC2626" : "#E5C158"} />
                  
                  <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <DroneModel colorTheme={colorTheme} />
                  </Float>

                  <ContactShadows position={[0, -1.8, 0]} opacity={0.6} scale={10} blur={2.5} far={4} color={isDark ? "#DC2626" : "#E5C158"} />
                  <OrbitControls enableZoom={true} enablePan={false} maxDistance={7} minDistance={2.5} />
                </Canvas>
              </Suspense>
            </div>
          </div>

          {/* Right Control Panel */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            
            {/* Color Theme Selector */}
            <div className={`p-6 rounded-3xl border ${
              isDark ? "liquid-glass-dark" : "liquid-glass-blue"
            }`}>
              <div className={`flex items-center gap-2 font-heading font-bold text-xs tracking-wider uppercase mb-3 ${
                isDark ? "text-[#DC2626]" : "text-[#F0D375]"
              }`}>
                <FaPalette />
                <span>Chassis Color Theme</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: "griet", label: "GRIET Navy", color: "#172E7C" },
                  { id: "gold", label: "Soft Gold", color: "#E5C158" },
                  { id: "red", label: "Crimson Red", color: "#DC2626" },
                  { id: "stealth", label: "Stealth Carbon", color: "#1a1a24" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setColorTheme(item.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-sans font-semibold transition-all ${
                      colorTheme === item.id
                        ? isDark
                          ? "border-[#DC2626] bg-[#DC2626]/20 text-white"
                          : "border-[#E5C158] bg-[#E5C158]/20 text-[#F0D375]"
                        : "border-white/10 bg-black/30 text-gray-300 hover:text-white"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/30"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Hardware Specs Hotspots */}
            <div className={`p-6 rounded-3xl border ${
              isDark ? "liquid-glass-dark" : "liquid-glass-blue"
            }`}>
              <div className={`flex items-center gap-2 font-heading font-bold text-xs tracking-wider uppercase mb-3 ${
                isDark ? "text-[#DC2626]" : "text-[#F0D375]"
              }`}>
                <FaMicrochip />
                <span>Hardware Specifications</span>
              </div>

              <div className="space-y-2.5">
                {hotspots.map((hs) => (
                  <div
                    key={hs.id}
                    onClick={() => setActiveHotspot(activeHotspot === hs.id ? null : hs.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      activeHotspot === hs.id
                        ? isDark
                          ? "border-[#DC2626] bg-[#DC2626]/20"
                          : "border-[#E5C158] bg-[#E5C158]/20"
                        : "border-white/10 bg-black/30 text-gray-200 hover:border-white/30"
                    }`}
                  >
                    <div className="flex items-center justify-between font-sans font-semibold text-xs sm:text-sm text-white">
                      <span>{hs.title}</span>
                      <span className={isDark ? "text-[#DC2626]" : "text-[#F0D375]"}>
                        {activeHotspot === hs.id ? "—" : "+"}
                      </span>
                    </div>

                    {activeHotspot === hs.id && (
                      <p className="mt-2 text-xs text-gray-300 font-sans leading-relaxed">
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
