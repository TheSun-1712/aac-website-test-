import { motion } from "framer-motion";
import Link from "next/link";
import { FaRocket, FaLightbulb, FaAtom, FaChevronDown } from "react-icons/fa";

export default function AACHero({ isDark }) {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] w-full pt-28 pb-16 flex flex-col justify-between"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        
        {/* Banner Alert */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <Link href="/gprime2026-results" className="group">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-sans font-semibold text-xs transition-all ${
              isDark
                ? "bg-[#DC2626]/20 border border-[#DC2626]/50 text-white hover:bg-[#DC2626]/30 shadow-md"
                : "bg-[#E5C158]/20 border border-[#E5C158]/50 text-[#F0D375] hover:bg-[#E5C158]/30 shadow-md"
            }`}>
              <FaRocket className="animate-bounce" />
              <span>Gprime 2026 Results Out! Check Performance →</span>
            </div>
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-sans bg-black/40 border-white/20 text-gray-200 backdrop-blur-md">
            <span className={`w-2 h-2 rounded-full animate-ping ${isDark ? "bg-[#DC2626]" : "bg-[#E5C158]"}`}></span>
            <span>Innovation • Research • Excellence</span>
          </div>
        </motion.div>

        {/* Main Hero Headline & Translucent Liquid Glass Dialog Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7"
          >
            {/* Translucent Liquid Glass Box */}
            <div className={`p-8 sm:p-10 rounded-3xl border ${
              isDark ? "liquid-glass-dark" : "liquid-glass-blue"
            }`}>
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] mb-5">
                <span className="block text-white">
                  Advanced Academic Center
                </span>
                <span className={`block text-xl sm:text-2xl font-bold mt-2 ${
                  isDark ? "text-red-gradient" : "text-gold-gradient"
                }`}>
                  Gokaraju Rangaraju Institute of Engineering and Technology
                </span>
              </h1>

              <p className="text-base sm:text-lg font-sans text-gray-200 leading-relaxed mb-8">
                An interdisciplinary research hub where creativity, innovation, and excellence converge to shape the future.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#telemetry"
                  className={`inline-flex items-center gap-2.5 px-6 py-3.5 font-sans font-bold text-sm rounded-full transition-all duration-200 shadow-xl hover:scale-105 ${
                    isDark
                      ? "bg-[#DC2626] text-white hover:bg-[#b91c1c]"
                      : "bg-[#E5C158] text-black hover:bg-[#d4af37]"
                  }`}
                >
                  <span>Explore Research</span>
                  <FaAtom />
                </a>

                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 border font-sans font-semibold text-sm rounded-full backdrop-blur-md bg-white/10 border-white/30 text-white hover:border-[#E5C158] transition-all"
                >
                  <span>R&amp;D Projects</span>
                  <span className={isDark ? "text-[#DC2626]" : "text-[#F0D375]"}>50+</span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Telemetry Translucent Liquid Glass Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className={`p-7 rounded-3xl border ${
              isDark ? "liquid-glass-dark" : "liquid-glass-blue"
            }`}>
              <div className="flex items-center justify-between pb-4 border-b border-white/15 mb-5">
                <span className={`font-sans font-bold text-xs tracking-wider uppercase flex items-center gap-2 ${
                  isDark ? "text-[#DC2626]" : "text-[#F0D375]"
                }`}>
                  <FaLightbulb />
                  <span>AAC Research Metrics</span>
                </span>
                <span className="font-sans text-xs text-gray-300">Live Statistics</span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
                  <div className="text-gray-300 font-sans text-xs font-medium uppercase mb-1">Research Projects</div>
                  <div className={`font-heading text-3xl font-extrabold ${
                    isDark ? "text-[#DC2626]" : "text-[#F0D375]"
                  }`}>
                    50+
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
                  <div className="text-gray-300 font-sans text-xs font-medium uppercase mb-1">Students Involved</div>
                  <div className="font-heading text-3xl font-extrabold text-white">
                    100+
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
                  <div className="text-gray-300 font-sans text-xs font-medium uppercase mb-1">Published Papers</div>
                  <div className="font-heading text-2xl font-extrabold text-white">10+</div>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
                  <div className="text-gray-300 font-sans text-xs font-medium uppercase mb-1">Incubated Ventures</div>
                  <div className={`font-heading text-2xl font-extrabold ${
                    isDark ? "text-[#DC2626]" : "text-[#F0D375]"
                  }`}>15+</div>
                </div>
              </div>

              {/* Capacity Bar */}
              <div className="mt-5 pt-4 border-t border-white/15">
                <div className="flex justify-between font-sans text-xs text-gray-200 mb-1">
                  <span>Innovation Capacity</span>
                  <span className={`font-bold ${isDark ? "text-[#DC2626]" : "text-[#F0D375]"}`}>
                    98.6%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden bg-black/50">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "98.6%" }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                    className={`h-full ${
                      isDark ? "bg-[#DC2626]" : "bg-[#E5C158]"
                    }`}
                  />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="relative z-10 text-center mt-8">
        <a
          href="#explore"
          className="inline-flex flex-col items-center gap-1.5 text-xs font-sans text-gray-300 hover:text-white transition-opacity"
        >
          <span>Scroll to Discover</span>
          <FaChevronDown className={`animate-bounce ${isDark ? "text-[#DC2626]" : "text-[#F0D375]"}`} />
        </a>
      </div>
    </section>
  );
}
