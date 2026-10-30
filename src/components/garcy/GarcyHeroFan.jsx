import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaRocket,
  FaLightbulb,
  FaAtom,
  FaCheckCircle,
  FaChevronDown,
  FaChevronUp,
  FaExternalLinkAlt,
  FaCompass,
} from "react-icons/fa";

export default function GarcyHeroFan() {
  const [expanded, setExpanded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Exact AAC Club Portals & Initiatives
  const initiatives = [
    {
      id: "gprime",
      sender: "GPRIME 2026 CONTEST",
      time: "RESULTS LIVE",
      title: "Gprime 2026 Results Live! Check Leaderboard & Scores",
      desc: "Flagship competitive programming and algorithmic hackathon hosted by AAC GRIET.",
      tag: "Flagship Contest",
      icon: FaRocket,
      link: "/gprime2026-results",
      badgeColor: "#49A3FF",
    },
    {
      id: "research",
      sender: "RESEARCH MATRIX",
      time: "5 DOMAINS",
      title: "Interdisciplinary Research across 5 Specialized Domains",
      desc: "Deep Learning, IoT & Embedded Systems, Web & App Development, ML-Ops, and Scopus publications.",
      tag: "R&D Domains",
      icon: FaAtom,
      link: "/Research",
      badgeColor: "#1769FF",
    },
    {
      id: "patents",
      sender: "INTELLECTUAL PROPERTY CELL",
      time: "IPO PUBLISHED",
      title: "Published Indian Patents: Pill Reminder & Smart Sign Language Glove",
      desc: "Official Indian Patent Office published inventions engineered by AAC student cohorts.",
      tag: "IP Portfolio",
      icon: FaLightbulb,
      link: "/Patents",
      badgeColor: "#49A3FF",
    },
    {
      id: "startups",
      sender: "STUDENT STARTUP INCUBATOR",
      time: "INCUBATED",
      title: "Student-Led Technology Spinoffs & Commercial Startups",
      desc: "Commercialized student ventures: Koolgen Interactives, The Great Honey Company, and CampusNav.",
      tag: "Incubation",
      icon: FaCheckCircle,
      link: "/Startups",
      badgeColor: "#1769FF",
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[94vh] flex flex-col items-center justify-between pt-28 pb-14 px-4 sm:px-6"
    >
      {/* Top Banner Alert & Tag */}
      <div className="text-center max-w-4xl mx-auto z-10">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <Link href="/gprime2026-results" className="group">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-mono font-semibold text-xs transition-all bg-[#1769FF]/15 border border-[#1769FF]/40 text-[#49A3FF] hover:bg-[#1769FF]/25 shadow-md">
              <FaRocket className="animate-bounce text-[10px]" />
              <span>Gprime 2026 Results Live! View Leaderboard &rarr;</span>
            </div>
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono bg-[#101725]/60 border-white/15 text-[#8793A8] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full animate-ping bg-[#1769FF]" />
            <span>Curiosity Begins Here &bull; GRIET Hyderabad</span>
          </div>
        </div>

        {/* Hero Title with Space Grotesk Typography */}
        <h1 className="font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tighter leading-[1.04] mb-4 text-[#EAF1FF] uppercase drop-shadow-xl font-sans">
          Advanced Academic Center
        </h1>

        <h2 className="text-lg sm:text-2xl font-bold text-[#49A3FF] mb-5 tracking-tight font-sans drop-shadow">
          Gokaraju Rangaraju Institute of Engineering and Technology
        </h2>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#8793A8] leading-relaxed mb-8 drop-shadow font-sans font-normal">
          An interdisciplinary research hub where creativity, innovation, and excellence converge to shape the future — building autonomous systems, deep-tech hardware, and patentable inventions.
        </p>

        {/* Action Triggers */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#moment"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full transition-all duration-200 shadow-[0_8px_30px_rgba(23,105,255,0.4)] bg-[#1769FF] text-white hover:bg-[#49A3FF] hover:text-black hover:scale-105 font-mono"
          >
            <span>Explore 3D Portal</span>
            <FaCompass className="text-xs" />
          </a>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 border font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-full backdrop-blur-md bg-[#101725]/60 border-white/20 text-[#EAF1FF] hover:border-[#1769FF] hover:bg-[#101725]/90 transition-all font-mono"
          >
            <span>R&amp;D Projects</span>
            <span className="text-[#49A3FF] font-bold">50+</span>
          </Link>
        </div>
      </div>

      {/* The Authentic Fan Stack */}
      <div className="w-full max-w-xl mx-auto z-20 my-auto mt-12">
        <div className="flex items-center justify-between text-[10.5px] font-mono uppercase text-[#8793A8] mb-2.5 px-2">
          <span className="flex items-center gap-2 font-bold text-[#EAF1FF]">
            <span className="w-2 h-2 rounded-full bg-[#1769FF] animate-pulse" />
            <span>01 // Featured Initiatives</span>
          </span>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="hover:text-[#49A3FF] text-[#8793A8] transition-colors flex items-center gap-1.5 font-mono text-[10.5px] uppercase font-medium"
          >
            <span>{expanded ? "Stack Cards" : "Expand All (4)"}</span>
            {expanded ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>

        {/* Container for Stack */}
        <div
          className="relative transition-all duration-500 ease-out"
          style={{ minHeight: expanded ? `${initiatives.length * 114}px` : "120px" }}
        >
          {initiatives.map((item, index) => {
            const Icon = item.icon;
            const offsetY = expanded ? index * 106 : index * 10;
            const scale = expanded ? 1 : 1 - index * 0.035;
            const opacity = expanded ? 1 : index > 2 ? 0 : 1 - index * 0.16;
            const zIndex = initiatives.length - index;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity,
                  y: offsetY,
                  scale,
                  zIndex,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`notification flex items-center gap-4 p-3.5 sm:p-4 cursor-pointer bg-[#101725]/85 border-white/15 ${
                  hoveredIndex === index ? "!border-[#1769FF] !bg-[#131d30]/95" : ""
                }`}
                style={{ top: 0 }}
                data-depth={index}
                onClick={() => setExpanded(!expanded)}
              >
                {/* Left Portrait / Square Badge */}
                <div className="portrait flex-shrink-0">
                  <div className="w-full h-full bg-gradient-to-br from-[#101725] to-[#080B12] flex items-center justify-center text-xl text-[#49A3FF] border border-white/10 rounded-xl">
                    <Icon />
                  </div>
                </div>

                {/* Right Content */}
                <div className="notification-copy">
                  <div className="notification-meta">
                    <span className="sender truncate text-[#8793A8]">{item.sender}</span>
                    <span className="timestamp text-[#49A3FF]">{item.time}</span>
                  </div>

                  <h3 className="message truncate text-[#EAF1FF]">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-between text-[10px] font-mono text-[#8793A8] mt-0.5">
                    <span className="truncate">{item.desc}</span>
                    <Link
                      href={item.link}
                      onClick={(e) => e.stopPropagation()}
                      className="ml-2 text-[#49A3FF] hover:text-white flex items-center gap-1 flex-shrink-0 font-bold"
                    >
                      <span>VIEW</span>
                      <FaExternalLinkAlt className="text-[8px]" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Down Indicator */}
      <div className="z-10 flex flex-col items-center gap-1.5 mt-8 pointer-events-none">
        <span className="text-[9.5px] font-mono uppercase tracking-widest text-[#8793A8]">
          Scroll to explore 3D Portal &bull; All 12 Divisions
        </span>
        <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-xs text-[#49A3FF] animate-bounce">
          &darr;
        </div>
      </div>
    </section>
  );
}
