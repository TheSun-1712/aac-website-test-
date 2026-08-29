import { motion } from "framer-motion";
import { FaFileAlt, FaLightbulb, FaRocket, FaGraduationCap, FaChartLine } from "react-icons/fa";

export default function AACTelemetrySection({ isDark }) {
  const stats = [
    { label: "Patents Filed", value: "50+", icon: FaLightbulb, desc: "Inventions & IP filings" },
    { label: "Research Papers", value: "120+", icon: FaFileAlt, desc: "Journals & Conference papers" },
    { label: "R&D Projects", value: "80+", icon: FaRocket, desc: "Completed & Active research" },
    { label: "Startups Incubated", value: "15+", icon: FaGraduationCap, desc: "Student ventures & spinoffs" },
  ];

  const telemetryMetrics = [
    { name: "Autonomous Navigation & Robotics", percent: 99.2 },
    { name: "AI Computer Vision & Deep Learning", percent: 98.6 },
    { name: "Aerospace CAD & Prototyping", percent: 97.4 },
    { name: "Hardware Embedded Systems Integration", percent: 96.9 },
  ];

  return (
    <section id="telemetry" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-sans text-xs font-semibold tracking-wide uppercase mb-3 border backdrop-blur-md ${
              isDark
                ? "bg-[#DC2626]/20 border-[#DC2626]/40 text-[#DC2626]"
                : "bg-[#E5C158]/20 border-[#E5C158]/40 text-[#F0D375]"
            }`}
          >
            <FaChartLine />
            <span>AAC Research &amp; Statistics</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading font-extrabold text-3xl sm:text-4xl tracking-tight text-white mb-2"
          >
            Research <span className={isDark ? "text-red-gradient" : "text-gold-gradient"}>Telemetry &amp; Metrics</span>
          </motion.h2>

          <p className="font-sans text-sm sm:text-base leading-relaxed text-gray-200">
            Measuring our impact across interdisciplinary research, patent generation, and autonomous engineering innovation at GRIET.
          </p>
        </div>

        {/* Liquid Glass Stat Cards - Slide in horizontally on vertical scroll */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 120 + idx * 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ amount: 0.2 }}
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: idx * 0.12 }}
                className={`p-6 rounded-3xl relative overflow-hidden group transition-all border shadow-2xl ${
                  isDark
                    ? "liquid-glass-dark hover:border-[#DC2626] hover:shadow-[0_0_25px_rgba(220,38,38,0.3)]"
                    : "liquid-glass-blue hover:border-[#E5C158] hover:shadow-[0_0_25px_rgba(229,193,88,0.3)]"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`p-3 rounded-xl border ${
                    isDark
                      ? "bg-black/40 text-[#DC2626] border-white/10"
                      : "bg-black/40 text-[#F0D375] border-white/10"
                  }`}>
                    <Icon size={18} />
                  </span>
                  <span className="font-sans text-xs text-gray-300 font-semibold">
                    0{idx + 1}
                  </span>
                </div>

                <div className={`font-heading font-extrabold text-3xl mb-1 ${
                  isDark ? "text-[#DC2626]" : "text-[#F0D375]"
                }`}>
                  {item.value}
                </div>

                <div className="font-heading font-bold text-sm text-white mb-1">
                  {item.label}
                </div>

                <div className="text-xs text-gray-300 font-sans">
                  {item.desc}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Liquid Glass Progress Box */}
        <motion.div
          initial={{ opacity: 0, x: -120 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ type: "spring", stiffness: 90, damping: 20 }}
          className={`p-7 sm:p-8 rounded-3xl border shadow-2xl ${
            isDark ? "liquid-glass-dark" : "liquid-glass-blue"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/15 mb-6">
            <div>
              <span className={`font-sans text-xs font-bold uppercase ${
                isDark ? "text-[#DC2626]" : "text-[#F0D375]"
              }`}>
                Core Research Capabilities
              </span>
              <h3 className="font-heading font-bold text-xl text-white mt-0.5">
                Engineering Domain Benchmarks
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {telemetryMetrics.map((metric, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between font-sans text-xs font-semibold text-gray-200">
                  <span>{metric.name}</span>
                  <span className={isDark ? "text-[#DC2626]" : "text-[#F0D375]"}>{metric.percent}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full overflow-hidden p-0.5 bg-black/50 border border-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${metric.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: idx * 0.15 }}
                    className={`h-full rounded-full ${
                      isDark ? "bg-[#DC2626]" : "bg-[#E5C158]"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
