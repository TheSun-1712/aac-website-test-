import { useState } from "react";
import { FaFileAlt, FaLightbulb, FaRocket, FaGraduationCap, FaChartLine, FaHandshake, FaMicroscope } from "react-icons/fa";

export default function GarcyTelemetry() {
  const [activeMetric, setActiveMetric] = useState(null);

  const stats = [
    { label: "Research Projects", value: "50+", icon: FaLightbulb, desc: "Active & completed innovation projects", tag: "R&D LAB" },
    { label: "Students Involved", value: "400+", icon: FaGraduationCap, desc: "Active cohort researchers across 5 domains", tag: "TALENT" },
    { label: "Published Papers", value: "10+", icon: FaFileAlt, desc: "Indexed journals & conference publications", tag: "IEEE / SCOPUS" },
    { label: "Incubated Ventures", value: "15+", icon: FaRocket, desc: "Student technology startups & spinoffs", tag: "VENTURES" },
  ];

  const focusAreas = [
    {
      title: "Autonomous Robotics & Edge AI",
      desc: "Pushing boundaries in real-time edge processing, autonomous flight algorithms, and embedded computer vision.",
      percent: 99.2,
      icon: FaMicroscope,
      status: "PRIMARY FOCUS",
    },
    {
      title: "Patent Prosecution & IP Creation",
      desc: "Rigorous prior-art analysis, prototype documentation, and drafting claims for national patent registries.",
      percent: 98.6,
      icon: FaLightbulb,
      status: "PROTECTION",
    },
    {
      title: "Industry & Academic Collaboration",
      desc: "Collaborative research initiatives bridging the gap between student lab work and enterprise deployments.",
      percent: 97.4,
      icon: FaHandshake,
      status: "ECOSYSTEM",
    },
  ];

  return (
    <section id="telemetry" className="relative py-28 px-4 sm:px-6 max-w-7xl mx-auto border-b border-white/10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[10.5px] font-semibold tracking-wide uppercase mb-3 border backdrop-blur-md bg-[#E5A93C]/15 border-[#E5A93C]/40 text-[#E5A93C]">
            <FaChartLine className="text-[10px]" />
            <span>04 // Key Performance Indicators</span>
          </div>

          <h2 className="font-extrabold text-3xl sm:text-5xl tracking-tighter text-[#EAF1FF] mb-2 uppercase font-sans">
            Empowering Minds, <br />
            <span className="italic font-serif font-normal text-[#E5A93C] lowercase tracking-normal text-3xl sm:text-5xl">
              shaping
            </span>{" "}
            Tomorrow.
          </h2>
        </div>

        <p className="mt-4 md:mt-0 text-xs sm:text-sm text-[#9E988A] max-w-sm font-sans font-normal leading-relaxed">
          Dedicated to pushing boundaries in engineering and innovation with verifiable institutional outcomes.
        </p>
      </div>

      {/* 4 Core Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {stats.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              onMouseEnter={() => setActiveMetric(idx)}
              onMouseLeave={() => setActiveMetric(null)}
              className={`garcy-glass-card p-6 flex flex-col justify-between transition-all duration-300 border ${
                activeMetric === idx
                  ? "!border-[#E5A93C] !bg-[#131d30]/95 scale-[1.02] shadow-[0_0_30px_rgba(229, 169, 60,0.3)]"
                  : "border-white/15 hover:bg-[#111318]/80"
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#9E988A] mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#08090C] flex items-center justify-center text-[#E5A93C] text-xs border border-white/10">
                    <Icon />
                  </span>
                  <span className="text-[#E5A93C] font-bold font-mono">{m.tag}</span>
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold text-[#EAF1FF] font-mono tracking-tight mb-2">
                  {m.value}
                </div>
                <div className="text-sm font-bold text-[#EAF1FF] font-sans">
                  {m.label}
                </div>
              </div>

              <div className="text-[11px] text-[#9E988A] font-mono mt-6 pt-3 border-t border-white/10 leading-snug">
                {m.desc}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3 Focus Area Bars with Sleek Precision Lines */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {focusAreas.map((channel) => {
          const Icon = channel.icon;
          return (
            <div
              key={channel.title}
              className="garcy-glass-card p-6 border border-white/15 hover:border-[#E5A93C]/60 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#08090C] flex items-center justify-center text-[#E5A93C] text-sm border border-white/10">
                  <Icon />
                </div>
                <div className="text-right">
                  <span className="text-base font-mono font-bold text-[#E5A93C]">
                    {channel.percent}%
                  </span>
                  <div className="text-[9px] font-mono uppercase text-[#9E988A]">
                    {channel.status}
                  </div>
                </div>
              </div>

              <h4 className="text-base font-bold text-[#EAF1FF] font-sans mb-2">
                {channel.title}
              </h4>

              <p className="text-xs text-[#9E988A] leading-relaxed font-sans mb-5 font-normal">
                {channel.desc}
              </p>

              {/* Progress Line */}
              <div className="w-full h-1.5 rounded-full overflow-hidden bg-[#08090C] border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-[#E5A93C] to-[#E5A93C]"
                  style={{ width: `${channel.percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
