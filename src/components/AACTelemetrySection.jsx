import { motion } from "framer-motion";
import { FaFileAlt, FaLightbulb, FaRocket, FaGraduationCap, FaChartLine, FaHandshake, FaMicroscope } from "react-icons/fa";

export default function AACTelemetrySection({ isDark }) {
  const stats = [
    { label: "Research Projects", value: "50+", icon: FaLightbulb, desc: "Active & completed innovation projects" },
    { label: "Students Involved", value: "100+", icon: FaGraduationCap, desc: "Undergraduate & postgraduate researchers" },
    { label: "Published Papers", value: "10+", icon: FaFileAlt, desc: "Indexed journals & conference publications" },
    { label: "Incubated Ventures", value: "15+", icon: FaRocket, desc: "Student technology startups & spinoffs" },
  ];

  const focusAreas = [
    {
      title: "Research & Innovation",
      desc: "Cutting-edge research projects that push the boundaries of technology and knowledge.",
      percent: 99.2,
      icon: FaMicroscope,
    },
    {
      title: "Student Development",
      desc: "Comprehensive programs to nurture young minds and prepare them for future challenges.",
      percent: 98.6,
      icon: FaGraduationCap,
    },
    {
      title: "Industry Collaboration",
      desc: "Strong partnerships with industry leaders to bridge the gap between academia and practice.",
      percent: 97.4,
      icon: FaHandshake,
    },
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
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-sans text-xs font-semibold tracking-wide uppercase mb-3 border backdrop-blur-md ${
              isDark
                ? "bg-[#DC2626]/20 border-[#DC2626]/40 text-[#DC2626]"
                : "bg-[#E5C158]/20 border-[#E5C158]/40 text-[#F0D375]"
            }`}
          >
            <FaChartLine />
            <span>AAC Focus &amp; Statistics</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-extrabold text-3xl sm:text-4xl tracking-tight text-white mb-2"
          >
            Our Focus <span className={isDark ? "text-red-gradient" : "text-gold-gradient"}>Areas &amp; Impact</span>
          </motion.h2>

          <p className="font-sans text-sm sm:text-base leading-relaxed text-gray-200">
            Measuring our impact across interdisciplinary research, student mentoring, and innovation focus areas.
          </p>
        </div>

        {/* Fluid Horizontal Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 150 + idx * 50, scale: 0.94 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ amount: 0.25 }}
                whileHover={{ scale: 1.05, y: -8, x: -4 }}
                transition={{
                  type: "spring",
                  stiffness: 70,
                  damping: 22,
                  mass: 0.6,
                  delay: idx * 0.1,
                }}
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

        {/* Liquid Glass Focus Areas Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {focusAreas.map((area, idx) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -140 + idx * 50, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ amount: 0.25 }}
                transition={{ type: "spring", stiffness: 70, damping: 22, mass: 0.6, delay: idx * 0.12 }}
                className={`p-7 rounded-3xl border shadow-2xl flex flex-col justify-between ${
                  isDark ? "liquid-glass-dark" : "liquid-glass-blue"
                }`}
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-5 ${
                    isDark
                      ? "bg-[#DC2626]/20 border-[#DC2626]/40 text-[#DC2626]"
                      : "bg-[#E5C158]/20 border-[#E5C158]/40 text-[#F0D375]"
                  }`}>
                    <Icon size={24} />
                  </div>

                  <h3 className="font-heading font-bold text-xl text-white mb-2">
                    {area.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-gray-200 leading-relaxed mb-6">
                    {area.desc}
                  </p>
                </div>

                <div className="space-y-1.5 pt-4 border-t border-white/15">
                  <div className="flex justify-between font-sans text-xs font-semibold text-gray-200">
                    <span>Performance Benchmark</span>
                    <span className={isDark ? "text-[#DC2626]" : "text-[#F0D375]"}>{area.percent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden p-0.5 bg-black/50 border border-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${area.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: idx * 0.15 }}
                      className={`h-full rounded-full ${
                        isDark ? "bg-[#DC2626]" : "bg-[#E5C158]"
                      }`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
