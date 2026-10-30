import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  FaAtom,
  FaRocket,
  FaLightbulb,
  FaCheckCircle,
  FaArrowRight,
  FaLayerGroup,
  FaExternalLinkAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export default function GarcyProjectsGallery({ onSelectCase }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const projects = [
    {
      id: "nav",
      number: "01",
      title: "Intelligent Campus Navigation System",
      category: "MOBILE & AR NAVIGATION",
      status: "CAMPUS DEPLOYED",
      badgeColor: "#49A3FF",
      desc: "AI-powered campus navigation system combining augmented reality, indoor positioning, and machine learning to guide students and visitors across GRIET.",
      stats: [
        { label: "Campus Coverage", value: "100% GRIET" },
        { label: "Positioning Latency", value: "< 45ms" },
        { label: "Student Leads", value: "Abhiram & Dinesh" },
      ],
      caseId: "nav",
      link: "/projects",
      gradient: "from-[#101725] via-[#0d162a] to-[#080B12]",
    },
    {
      id: "energy",
      number: "02",
      title: "Smart Energy Management & IoT Grid",
      category: "IOT & SUSTAINABILITY",
      status: "RESEARCH ACTIVE",
      badgeColor: "#1769FF",
      desc: "IoT-based energy monitoring and optimization architecture for reducing campus power consumption using smart sensor telemetry and predictive analytics.",
      stats: [
        { label: "Sensor Nodes", value: "80+ Distributed" },
        { label: "Energy Savings", value: "18% Measured" },
        { label: "Project Lead", value: "Abhiram Dodda" },
      ],
      caseId: "energy",
      link: "/projects",
      gradient: "from-[#11192e] via-[#0f1b36] to-[#080B12]",
    },
    {
      id: "pill",
      number: "03",
      title: "Automated Electronic Pill Reminder Device",
      category: "HEALTHCARE IP & EMBEDDED",
      status: "PATENT 201941002559",
      badgeColor: "#49A3FF",
      desc: "Patented electronic medication management device featuring customizable replaceable compartments and two-way verification for elderly patient adherence.",
      stats: [
        { label: "App Number", value: "201941002559" },
        { label: "Status", value: "Published Online" },
        { label: "Lead Inventor", value: "Y. Chethan Reddy" },
      ],
      caseId: "pill",
      link: "/Patents",
      gradient: "from-[#101725] via-[#12203d] to-[#080B12]",
    },
    {
      id: "glove",
      number: "04",
      title: "Smart Glove for Sign Language Translation",
      category: "ASSISTIVE TECH & WEARABLES",
      status: "PATENT 202041038106",
      badgeColor: "#1769FF",
      desc: "Wearable assistive glove equipped with flex sensor arrays and microcontrollers translating sign language gestures into instant text and synthesized speech.",
      stats: [
        { label: "App Number", value: "202041038106" },
        { label: "Status", value: "Published Online" },
        { label: "Lead Inventor", value: "Jashwanth Bopanna" },
      ],
      caseId: "glove",
      link: "/Patents",
      gradient: "from-[#101725] via-[#131d33] to-[#080B12]",
    },
  ];

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -420, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 420, behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 max-w-7xl mx-auto border-b border-white/10">
      
      {/* Section Header with Horizontal Track Navigation Arrows */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[10.5px] font-semibold tracking-wide uppercase mb-3 border backdrop-blur-md bg-[#1769FF]/15 border-[#1769FF]/40 text-[#49A3FF]">
            <span>05 // Pinned Projects Runway</span>
          </div>

          <h2 className="font-extrabold text-3xl sm:text-5xl tracking-tighter text-[#EAF1FF] mb-2 uppercase font-sans">
            What we are <br />
            <span className="italic font-serif font-normal text-[#49A3FF] lowercase tracking-normal text-3xl sm:text-5xl">
              building.
            </span>
          </h2>
        </div>

        {/* Desktop Controls */}
        <div className="mt-6 md:mt-0 flex items-center gap-3">
          <Link
            href="/projects"
            className="text-xs font-mono text-[#8793A8] hover:text-[#49A3FF] transition-colors flex items-center gap-1.5 uppercase font-bold mr-2"
          >
            <span>All 50+ Projects</span>
            <FaArrowRight className="text-[10px]" />
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollLeft}
              className="w-10 h-10 rounded-xl bg-[#101725] border border-white/10 hover:border-[#1769FF] text-[#8793A8] hover:text-white flex items-center justify-center transition-all shadow-md"
              aria-label="Previous Projects"
            >
              <FaChevronLeft className="text-xs" />
            </button>
            <button
              type="button"
              onClick={scrollRight}
              className="w-10 h-10 rounded-xl bg-[#101725] border border-white/10 hover:border-[#1769FF] text-[#8793A8] hover:text-white flex items-center justify-center transition-all shadow-md"
              aria-label="Next Projects"
            >
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Runway Track */}
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory"
        style={{ scrollBehavior: "smooth" }}
      >
        {projects.map((proj) => (
          <div
            key={proj.id}
            className={`flex-shrink-0 w-[340px] sm:w-[440px] snap-center rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-white/15 hover:border-[#1769FF]/70 transition-all duration-300 bg-gradient-to-br ${proj.gradient} relative overflow-hidden group hover:-translate-y-1 shadow-[0_12px_36px_rgba(0,0,0,0.5)]`}
          >
            {/* Ambient Corner Flare */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#1769FF]/10 rounded-full blur-2xl group-hover:bg-[#1769FF]/20 transition-all pointer-events-none" />

            {/* Top Bar: Number & Status Badge */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono uppercase text-[#8793A8] mb-6">
                <span className="text-2xl font-extrabold font-sans text-white/30 group-hover:text-[#49A3FF] transition-colors">
                  {proj.number}
                </span>
                <span
                  className="px-2.5 py-0.5 rounded-full bg-[#080B12] text-[9.5px] font-bold border"
                  style={{ color: proj.badgeColor, borderColor: `${proj.badgeColor}55` }}
                >
                  {proj.status}
                </span>
              </div>

              {/* Category */}
              <div className="text-[10px] font-mono text-[#8793A8] uppercase tracking-wider mb-2 font-semibold">
                {proj.category}
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#EAF1FF] mb-3 leading-snug font-sans group-hover:text-[#49A3FF] transition-colors">
                {proj.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#8793A8] leading-relaxed mb-8 font-sans font-normal">
                {proj.desc}
              </p>
            </div>

            {/* 3 Metric Badges */}
            <div>
              <div className="grid grid-cols-3 gap-2.5 mb-6 pt-4 border-t border-white/10">
                {proj.stats.map((s) => (
                  <div key={s.label} className="p-2.5 rounded-lg bg-[#080B12]/80 border border-white/5">
                    <div className="text-[8px] font-mono uppercase text-[#8793A8] truncate">
                      {s.label}
                    </div>
                    <div className="text-xs sm:text-sm font-bold font-mono text-[#EAF1FF] mt-0.5 truncate">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons: Full Case Study Drawer + Link */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                {onSelectCase && (
                  <button
                    type="button"
                    onClick={() => onSelectCase(proj.caseId)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1769FF] hover:bg-[#49A3FF] hover:text-black text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-[0_4px_16px_rgba(23,105,255,0.4)]"
                  >
                    <FaLayerGroup className="text-[10px]" />
                    <span>Case Study &rarr;</span>
                  </button>
                )}

                <Link
                  href={proj.link}
                  className="text-xs font-mono text-[#8793A8] hover:text-white uppercase flex items-center gap-1 transition-colors"
                >
                  <span>Details</span>
                  <FaExternalLinkAlt className="text-[9px]" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

