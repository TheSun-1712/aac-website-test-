import { motion } from "framer-motion";
import { FaTrophy, FaFlagCheckered, FaChartLine, FaStar, FaGlobeAmericas } from "react-icons/fa";

export default function ScrollTelemetrySection() {
  const stats = [
    { label: "GRAND PRIX STARTS", value: "148", suffix: "+", icon: FaFlagCheckered, desc: "Across F1 seasons" },
    { label: "PODIUM FINISHES", value: "28", suffix: "", icon: FaTrophy, desc: "Formula 1 podiums" },
    { label: "F1 VICTORIES", value: "4", suffix: "", icon: FaStar, desc: "Grand Prix wins" },
    { label: "CAREER POINTS", value: "1,240", suffix: "+", icon: FaChartLine, desc: "World Championship points" },
  ];

  const telemetryMetrics = [
    { name: "CORNERING SPEED ACROSS HIGH-SPEED APEX", percent: 98.4 },
    { name: "BRAKING EFFICIENCY & ENERGY RECOVERY", percent: 99.1 },
    { name: "REACTION TIME OFF THE START LINE", percent: 96.8 },
    { name: "TYRE MANAGEMENT & DEGRADATION CONTROL", percent: 97.5 },
  ];

  return (
    <section id="telemetry" className="py-24 bg-[#0a0a0c] text-white relative overflow-hidden">
      
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#D2FF00]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D2FF00]/10 border border-[#D2FF00]/30 rounded-full font-chakra text-xs font-bold text-[#D2FF00] tracking-widest uppercase mb-4">
            <FaChartLine />
            <span>DRIVER STATS & TELEMETRY</span>
          </div>

          <h2 className="font-syne font-extrabold text-4xl sm:text-6xl uppercase tracking-tighter mb-4">
            CAREER <span className="text-[#D2FF00]">TELEMETRY</span>
          </h2>

          <p className="text-gray-400 font-space text-base">
            Every millisecond counts. Real-time telemetry tracking performance, career milestones, and technical driver efficiency metrics.
          </p>
        </div>

        {/* Major Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#121217] border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-[#D2FF00] hover:shadow-[0_0_30px_rgba(210,255,0,0.15)] transition-all"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#D2FF00]/5 rounded-bl-full pointer-events-none group-hover:bg-[#D2FF00]/10 transition-colors" />

                <div className="flex items-center justify-between mb-4">
                  <span className="p-3 bg-black/40 rounded-xl text-[#D2FF00] border border-white/10 group-hover:scale-110 transition-transform">
                    <Icon size={20} />
                  </span>
                  <span className="font-chakra text-xs text-gray-500 font-bold tracking-widest">
                    STAT 0{idx + 1}
                  </span>
                </div>

                <div className="font-syne font-extrabold text-4xl sm:text-5xl text-white mb-2 group-hover:text-[#D2FF00] transition-colors">
                  {item.value}<span className="text-[#D2FF00]">{item.suffix}</span>
                </div>

                <div className="font-chakra font-bold text-xs text-gray-300 tracking-wider uppercase mb-1">
                  {item.label}
                </div>

                <div className="text-xs text-gray-500 font-space">
                  {item.desc}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Telemetry Progress Bars */}
        <div className="bg-[#121217] border border-white/10 rounded-3xl p-8 sm:p-10 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
            <div>
              <span className="font-chakra text-xs font-bold text-[#D2FF00] tracking-widest uppercase">
                TELEMETRY BENCHMARK ANALYSIS
              </span>
              <h3 className="font-syne font-bold text-2xl text-white mt-1">
                PERFORMANCE METRICS
              </h3>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/50 rounded-full border border-white/10 text-xs font-chakra text-gray-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>TELEMETRY ACTIVE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {telemetryMetrics.map((metric, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between font-chakra text-xs font-bold tracking-wider">
                  <span className="text-gray-300">{metric.name}</span>
                  <span className="text-[#D2FF00]">{metric.percent}%</span>
                </div>
                <div className="w-full bg-black/60 h-3 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${metric.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: idx * 0.15 }}
                    className="bg-gradient-to-r from-[#ccff00] to-[#D2FF00] h-full rounded-full shadow-[0_0_12px_#D2FF00]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
