import { motion } from "framer-motion";
import { FaFlagCheckered, FaPlay, FaBolt, FaChevronDown } from "react-icons/fa";

export default function LandoNorrisHero() {
  return (
    <section id="hero" className="relative min-h-screen w-full bg-[#0a0a0c] text-white overflow-hidden pt-28 pb-20 flex flex-col justify-between">
      
      {/* Background Cyber Grid & Glowing Particle Rings */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D2FF00]/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Kinetic Outlined Typography Background */}
      <div className="absolute top-20 left-0 right-0 overflow-hidden whitespace-nowrap pointer-events-none select-none opacity-10">
        <div className="inline-block animate-marquee font-syne font-extrabold text-[12vw] uppercase text-stroke-neon tracking-tighter">
          LANDO NORRIS // LN4 // FORMULA 1 DRIVER // McLAREN // SPEED // TELEMETRY &nbsp;
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        
        {/* Top Telemetry Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D2FF00]/10 border border-[#D2FF00]/40 text-[#D2FF00] font-chakra font-bold text-xs tracking-widest uppercase">
            <FaBolt className="animate-bounce" />
            <span>F1 DRIVER #4 // McLAREN MCL38</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 font-chakra text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>LIVE TELEMETRY ACTIVE</span>
          </div>
        </motion.div>

        {/* Main Hero Display Headlines */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="lg:col-span-8"
          >
            <h1 className="font-syne font-extrabold text-5xl sm:text-7xl lg:text-9xl leading-[0.88] tracking-tighter uppercase mb-6">
              <span className="block text-white">LANDO</span>
              <span className="block text-[#D2FF00] drop-shadow-[0_0_25px_rgba(210,255,0,0.4)]">
                NORRIS
              </span>
            </h1>

            <p className="text-gray-300 text-lg sm:text-xl font-space max-w-2xl leading-relaxed mb-8">
              Official digital ecosystem. Pushing the absolute limits of speed, engineering, and personal brand. From podium victories in Formula 1 to gaming and LN4 apparel.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#telemetry"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#D2FF00] text-black font-chakra font-bold text-sm tracking-wider uppercase rounded-full shadow-[0_0_30px_rgba(210,255,0,0.5)] hover:bg-[#ccff00] hover:scale-105 transition-all duration-300"
              >
                <span>EXPLORE TELEMETRY</span>
                <FaFlagCheckered className="group-hover:rotate-12 transition-transform" />
              </a>

              <a
                href="#3d-gear"
                className="inline-flex items-center gap-3 px-7 py-4 bg-white/5 border border-white/20 hover:border-[#D2FF00] text-white font-chakra font-bold text-sm tracking-wider uppercase rounded-full backdrop-blur-md hover:bg-white/10 transition-all duration-300"
              >
                <span>3D HELMET VIEWER</span>
                <span className="text-[#D2FF00]">360°</span>
              </a>
            </div>
          </motion.div>

          {/* Right Telemetry Widget Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="lg:col-span-4"
          >
            <div className="bg-[#121217]/90 border border-[#D2FF00]/30 rounded-3xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden group hover:border-[#D2FF00] transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D2FF00]/5 rounded-bl-full pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <span className="font-chakra font-bold text-xs text-[#D2FF00] tracking-widest uppercase">
                  MCL38 TELEMETRY DATA
                </span>
                <span className="font-chakra text-xs text-gray-400">REALTIME</span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                  <div className="text-gray-400 font-chakra text-xs uppercase mb-1">TOP SPEED</div>
                  <div className="font-syne text-3xl font-extrabold text-[#D2FF00]">
                    342 <span className="text-xs font-chakra text-white">KM/H</span>
                  </div>
                </div>

                <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                  <div className="text-gray-400 font-chakra text-xs uppercase mb-1">MAX G-FORCE</div>
                  <div className="font-syne text-3xl font-extrabold text-white">
                    4.8 <span className="text-xs font-chakra text-[#D2FF00]">G</span>
                  </div>
                </div>

                <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                  <div className="text-gray-400 font-chakra text-xs uppercase mb-1">BEST LAP</div>
                  <div className="font-syne text-2xl font-extrabold text-white">1:17.241</div>
                </div>

                <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                  <div className="text-gray-400 font-chakra text-xs uppercase mb-1">ENGINE RPM</div>
                  <div className="font-syne text-2xl font-extrabold text-[#D2FF00]">12,450</div>
                </div>
              </div>

              {/* Animated Progress Bar */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex justify-between font-chakra text-xs text-gray-400 mb-1">
                  <span>THROTTLE RESPONSE</span>
                  <span className="text-[#D2FF00]">99.4%</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "99.4%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="bg-[#D2FF00] h-full shadow-[0_0_10px_#D2FF00]"
                  />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="relative z-10 text-center mt-12">
        <a
          href="#telemetry"
          className="inline-flex flex-col items-center gap-2 text-xs font-chakra tracking-widest text-gray-400 hover:text-[#D2FF00] transition-colors"
        >
          <span>SCROLL TO DISCOVER</span>
          <FaChevronDown className="animate-bounce text-[#D2FF00]" />
        </a>
      </div>
    </section>
  );
}
