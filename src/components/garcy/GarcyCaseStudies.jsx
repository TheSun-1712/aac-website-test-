import { useState } from "react";
import Link from "next/link";
import {
  FaTimes,
  FaExternalLinkAlt,
  FaGithub,
  FaGlobe,
  FaBookOpen,
  FaShareAlt,
  FaCheck,
  FaArrowLeft,
  FaTerminal,
} from "react-icons/fa";

export default function GarcyCaseStudies({ isOpen, onClose }) {
  const [selectedCase, setSelectedCase] = useState("uav");
  const [copiedRef, setCopiedRef] = useState(false);

  const caseStudies = {
    uav: {
      id: "uav",
      client: "AAC ROBOTICS & AUTONOMOUS SYSTEMS LAB",
      field: "AERIAL ROBOTICS / EDGE AI",
      services: "PX4 AUTOPILOT, ROS2, JETSON NANO, LIDAR ODOMETRY",
      year: "2024–2025",
      title: "Autonomous Multi-Rotor UAV",
      subtitle: "Next-gen aerial autonomy with sub-millisecond edge obstacle avoidance",
      image: "/images/8.webp",
      intro: `Autonomous multi-rotor UAV platform featuring edge obstacle avoidance, GPS waypoint guidance, and live telemetry downlink developed at AAC Robotics Lab.`,
      quote: `Navigating complex GPS-denied environments requires high-throughput onboard compute capable of sub-millisecond trajectory re-planning.`,
      paragraph: `Engineered from first principles with custom carbon-fiber airframes, onboard NVIDIA Jetson edge inference compute, and dual optical flow sensors for GPS-denied flight stabilization. The platform streams high-throughput telemetry over encrypted links.`,
      outcome: `Achieved autonomous indoor navigation with 0.992 mission completion fidelity during campus flight trials and national robotics symposiums.`,
      githubRepo: "https://github.com/AAC-GRIET",
      link: "/projects",
      paperLink: "/Research",
      stats: [
        { label: "FLIGHT SPEED", value: "18 M/S" },
        { label: "OBSTACLE REACTION", value: "< 12 MS" },
        { label: "ONBOARD COMPUTE", value: "JETSON 4GB" },
        { label: "COMM RANGE", value: "2.4 KM" },
      ],
    },
    nav: {
      id: "nav",
      client: "AAC MOBILE & AR RESEARCH LAB",
      field: "AR / INDOOR SPATIAL MAPPING",
      services: "AR SPATIAL MAPPING, INDOOR POSITIONING, LOW-LATENCY PATHFINDING",
      year: "2024–2025",
      title: "Intelligent Campus Navigation",
      subtitle: "Sub-meter AR indoor positioning and directional wayfinding",
      image: "/images/pic.webp",
      intro: `The Intelligent Campus Navigation System combines augmented reality, indoor radio fingerprinting, and machine learning for orientation across GRIET.`,
      quote: `Navigating collegiate campuses with multi-story laboratory blocks can be daunting. Our student researchers engineered a localized coordinate mapping algorithm that operates without external GPS.`,
      paragraph: `Led by Abhiram Pedamallu, V. Dinesh Chandra, and Seetaram Koushik, the team mapped campus corridors, seminar halls, and research blocks with reactive route recalculation.`,
      outcome: `The system serves thousands of students across GRIET, eliminating orientation friction during campus symposia.`,
      githubRepo: "https://github.com/AAC-GRIET",
      link: "/projects",
      paperLink: "/Research",
      stats: [
        { label: "CAMPUS COVERAGE", value: "100% GRIET" },
        { label: "POSITIONING SPEED", value: "< 45 MS" },
        { label: "ACCURACY RANGE", value: "0.8 METERS" },
        { label: "ACTIVE USERS", value: "4,000+" },
      ],
    },
    pill: {
      id: "pill",
      client: "AAC BIOMEDICAL IP INVENTIONS CELL",
      field: "BIOMEDICAL DEVICES / HEALTHCARE IP",
      services: "PATENT PROSECUTION, TWO-WAY VERIFICATION, CUSTOM PCB",
      year: "2019–2024",
      title: "Automated Pill Reminder",
      subtitle: "Indian Patent 201941002559 — Intelligent Medication Adherence",
      image: "/images/AAC1.png",
      intro: `An automated electronic device for reminding consumption of pills scheduled with specified two-way confirmation and replaceable pill compartments.`,
      quote: `Medication non-adherence among elderly patients remains a leading cause of preventable health deterioration. This patent was engineered to guarantee verified consumption.`,
      paragraph: `Invented by Yelma Chethan Reddy, Alence Abhinay, B.S.V.S Anoop, M Srikanth, D. Naga pavan, and G Pradeep Reddy. Unlike basic buzzers, it requires physical two-way user confirmation and logs compliance.`,
      outcome: `Officially published by the Indian Patent Office (App No. 201941002559), representing a foundational IP milestone for AAC GRIET.`,
      githubRepo: "https://github.com/AAC-GRIET",
      link: "/Patents",
      paperLink: "/Patents",
      stats: [
        { label: "PATENT APPLICATION", value: "201941002559" },
        { label: "PATENT OFFICE", value: "INDIA" },
        { label: "STATUS", value: "PUBLISHED" },
        { label: "INVENTORS", value: "6 AAC FELLOWS" },
      ],
    },
    glove: {
      id: "glove",
      client: "AAC ASSISTIVE WEARABLES LAB",
      field: "ASSISTIVE TECH / WEARABLE MECHATRONICS",
      services: "FLEX TRANSDUCERS, REAL-TIME DSP, TEXT-TO-SPEECH, SENSOR FUSION",
      year: "2020–2024",
      title: "Smart Sign Language Glove",
      subtitle: "Indian Patent 202041038106 — Real-Time Assistive Communication",
      image: "/images/AAC3.png",
      intro: `A smart sensory glove for recognizing and translating sign language into synthesized speech and display text in real-time.`,
      quote: `Bridging the communication barrier between speech-impaired individuals and society requires wearable technology that is lightweight, accurate, and completely unobtrusive.`,
      paragraph: `Invented by Jashwanth Kranthi Bopanna, Santosh Sanjeev, Bharath Varma Kantheti, Gowtham Sai Ponnekanti, Suhas Gangireddy, and G Pradeep Reddy. Integrates flex transducers and IMU tracking.`,
      outcome: `Granted publication by the Indian Patent Office (App No. 202041038106), demonstrating AAC's commitment to humanitarian engineering.`,
      githubRepo: "https://github.com/AAC-GRIET",
      link: "/Patents",
      paperLink: "/Patents",
      stats: [
        { label: "PATENT APPLICATION", value: "202041038106" },
        { label: "GESTURE ACCURACY", value: "98.2%" },
        { label: "TRANSLATION DELAY", value: "< 25 MS" },
        { label: "PATENT OFFICE", value: "INDIA" },
      ],
    },
    energy: {
      id: "energy",
      client: "AAC IOT & SMART GRID LAB",
      field: "IOT / PREDICTIVE ANALYTICS / CLEAN-TECH",
      services: "DISTRIBUTED CT SENSORS, MQTT BROKER, EDGE ML, POWER FORECASTING",
      year: "2023–2025",
      title: "Smart Campus Energy Grid",
      subtitle: "IoT-based campus power telemetry through real-time sensors and predictive analytics",
      image: "/images/AAC2.png",
      intro: `The Smart Energy Management System utilizes IoT current sensors and machine learning to balance electrical energy consumption across campus infrastructure.`,
      quote: `Institutions expend substantial electricity through unoptimized lighting and idle laboratory equipment. Real-time telemetry provides actionable energy insights.`,
      paragraph: `Conceived by Abhiram Dodda, Manav, and Srija Cherukuri. The project deploys ESP32 nodes over secure MQTT, analyzing historical load curves to forecast demand peaks.`,
      outcome: `Demonstrated measurable campus power savings of 18%, significantly lowering energy consumption.`,
      githubRepo: "https://github.com/AAC-GRIET",
      link: "/projects",
      paperLink: "/Research",
      stats: [
        { label: "POWER SAVINGS", value: "18% REDUCTION" },
        { label: "SENSOR NODES", value: "80+ DEPLOYED" },
        { label: "SAMPLE INTERVAL", value: "2.0 SEC" },
        { label: "DATA POINTS/DAY", value: "2.4M TELEMETRY" },
      ],
    },
    gprime: {
      id: "gprime",
      client: "GPRIME STEERING COMMITTEE",
      field: "DISTRIBUTED SOFTWARE / SANDBOX RUNTIMES",
      services: "DISTRIBUTED JUDGE SYSTEM, DOCKER RUNTIME, LIVE WEBSOCKET TELEMETRY",
      year: "2024–2026",
      title: "G-Prime Competitive Judge",
      subtitle: "The premier competitive programming and algorithmic evaluation platform at GRIET",
      image: "/images/AAC2.png",
      intro: `Gprime brought together over 42 teams of competitive coders to solve rigorous challenges in graph theory, dynamic programming, and systems engineering.`,
      quote: `Competitive programming is the purest testing ground for computational thinking and sub-second algorithm optimization.`,
      paragraph: `Features multi-stage cascade problem sets and rapidfire algorithmic sprints evaluating multi-language test suites inside isolated Linux cgroups sandboxes.`,
      outcome: `Conducted national coding challenges with zero downtime and sub-80ms evaluation latency.`,
      githubRepo: "https://github.com/AAC-GRIET",
      link: "/gprime2026-results",
      paperLink: "/gprime2026-results",
      stats: [
        { label: "TEAMS COMPETING", value: "42+ TEAMS" },
        { label: "EVALUATION SPEED", value: "< 80 MS" },
        { label: "PROBLEM TRACKS", value: "RAPID & CASCADE" },
        { label: "TELEMETRY", value: "REAL-TIME" },
      ],
    },
  };

  const active = caseStudies[selectedCase] || caseStudies.uav;

  const handleCopyRef = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/projects#${active.id}`;
      navigator.clipboard?.writeText(url);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-[#08090C]/96 backdrop-blur-2xl p-3 sm:p-5 lg:p-7 flex flex-col justify-center items-center pointer-events-auto animate-fadeIn overflow-y-auto">
      <div className="w-full max-w-[1720px] h-full max-h-[96vh] flex flex-col">
        
        {/* Top Control Bar with Tabs */}
        <div className="bg-[#111318] border border-[#2A261F] rounded-2xl px-4 sm:px-6 py-2.5 mb-4 flex flex-wrap items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5A93C] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#9E988A] font-bold">
              AAC Case Study Specimen // {active.id.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            {Object.keys(caseStudies).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setSelectedCase(k)}
                className={`px-3 py-1 rounded-lg text-[10.5px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCase === k
                    ? "bg-[#E5A93C] text-[#08090C] font-extrabold shadow-md"
                    : "bg-[#08090C] text-[#9E988A] hover:text-white border border-[#2A261F]"
                }`}
              >
                {k.toUpperCase()}
              </button>
            ))}

            <button
              type="button"
              onClick={onClose}
              className="ml-2 w-8 h-8 rounded-lg bg-[#08090C] border border-[#2A261F] text-[#9E988A] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <FaTimes className="text-xs" />
            </button>
          </div>
        </div>

        {/* Main 2-Column Grid Matching the Reference Video */}
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch flex-1 min-h-0">
          
          {/* ====================================================================
              LEFT COLUMN: BIG PANEL WITH UPLOADED IMAGE (50% width)
              ==================================================================== */}
          <div className="lg:col-span-6 h-[440px] sm:h-[500px] lg:h-full relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#2A261F] bg-[#111318] shadow-[0_25px_60px_rgba(0,0,0,0.9)] group flex flex-col justify-between">
            <img
              src={active.image}
              alt={active.title}
              className="w-full h-full object-cover absolute inset-0 select-none group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090C]/90 via-transparent to-[#08090C]/70 pointer-events-none" />

            {/* Top-Left Bar over image */}
            <div className="relative z-10 p-5 sm:p-7 flex items-center justify-between pointer-events-auto">
              <div className="flex flex-col gap-2.5">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/80 font-bold drop-shadow">
                  aac // griet
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white font-sans text-xs font-semibold hover:border-[#E5A93C] transition-all cursor-pointer shadow-lg active:scale-95 group/back"
                >
                  <FaArrowLeft className="text-[10px] text-[#E5A93C] group-hover/back:-translate-x-0.5 transition-transform" />
                  <span>Back</span>
                </button>
              </div>

              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-[#E5A93C] uppercase tracking-wider font-bold">
                {active.services.split(",")[0]}
              </span>
            </div>

            {/* Bottom over image */}
            <div className="relative z-10 p-5 sm:p-7">
              <span className="font-mono text-[9.5px] text-[#9E988A] uppercase tracking-widest block mb-0.5">
                // SPECIMEN DOSSIER
              </span>
              <p className="font-mono text-xs text-white/90 font-bold truncate">
                REGISTRY: AAC-CASE-{active.id.toUpperCase()} // RESOLUTION: HIGH-DEF
              </p>
            </div>
          </div>

          {/* ====================================================================
              RIGHT COLUMN: TWO STACKED PANELS
              ==================================================================== */}
          <div className="lg:col-span-6 flex flex-col gap-4 lg:gap-6 h-full min-h-0">
            
            {/* Top-Right Panel: Brief, Specs Table, Title */}
            <div className="flex-1 bg-[#111318] border border-[#2A261F] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#2A261F] pb-3 mb-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#E5A93C] font-bold">
                  // CASE STUDY SPECIFICATION
                </span>
                <span className="font-mono text-[10px] text-[#9E988A] uppercase">
                  STATUS: VERIFIED
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <p className="font-sans text-xs sm:text-sm text-[#FAF6ED]/85 leading-relaxed font-normal">
                  {active.intro}
                </p>
              </div>

              {/* Monospaced Specs Grid */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-6 my-2 py-4 border-y border-[#2A261F] font-mono text-[10.5px] sm:text-[11.5px]">
                <div>
                  <span className="text-[#9E988A] uppercase tracking-wider block text-[10px] mb-0.5">CLIENT</span>
                  <span className="text-white font-semibold uppercase">{active.client}</span>
                </div>
                <div>
                  <span className="text-[#9E988A] uppercase tracking-wider block text-[10px] mb-0.5">FIELD</span>
                  <span className="text-white font-semibold uppercase">{active.field}</span>
                </div>
                <div>
                  <span className="text-[#9E988A] uppercase tracking-wider block text-[10px] mb-0.5">SERVICES</span>
                  <span className="text-white font-semibold uppercase truncate block" title={active.services}>
                    {active.services}
                  </span>
                </div>
                <div>
                  <span className="text-[#9E988A] uppercase tracking-wider block text-[10px] mb-0.5">YEAR</span>
                  <span className="text-[#E5A93C] font-bold uppercase">{active.year}</span>
                </div>
              </div>

              <div className="pt-3">
                <h2 className="font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
                  {active.title}
                </h2>
                <p className="font-sans text-xs sm:text-sm text-[#9E988A] mt-1.5 font-normal">
                  {active.subtitle}
                </p>
              </div>
            </div>

            {/* Bottom-Right Panel: Telemetry Stats & Tactile Icon Buttons */}
            <div className="flex-1 bg-[#111318] border border-[#2A261F] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#2A261F] pb-3 font-mono text-[10px] text-[#9E988A] uppercase tracking-wider">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    PERFORMANCE TELEMETRY
                  </span>
                  <span className="text-[#9E988A]">GRIET HYDERABAD</span>
                </div>

                {/* 4 Stat Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {active.stats.map((s) => (
                    <div key={s.label} className="p-3 rounded-xl bg-[#08090C] border border-[#2A261F]">
                      <div className="text-base sm:text-lg font-extrabold text-[#E5A93C] font-mono leading-none mb-1">
                        {s.value}
                      </div>
                      <div className="text-[9px] font-mono text-[#9E988A] uppercase tracking-wider truncate">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="font-sans text-xs text-[#9E988A] leading-relaxed max-h-24 overflow-y-auto pr-1 custom-scroll">
                  <p className="text-white/80">{active.paragraph}</p>
                </div>
              </div>

              {/* Bottom Icon Action Buttons */}
              <div className="pt-4 border-t border-[#2A261F] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 font-mono text-[10px] text-[#9E988A] uppercase tracking-widest">
                  <span>SPECIMEN ACTIONS // PROTOCOLS:</span>
                </div>

                <div className="flex items-center gap-3">
                  {/* GitHub Icon Button */}
                  <a
                    href={active.githubRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#08090C] border border-[#2A261F] hover:border-[#E5A93C] text-[#9E988A] hover:text-[#E5A93C] hover:bg-[#181A20] flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-[0_0_20px_rgba(229,169,60,0.35)] active:scale-95 cursor-pointer"
                    aria-label="GitHub Repository"
                    title="Open GitHub Repository"
                  >
                    <FaGithub className="text-lg sm:text-xl" />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#08090C] border border-[#2A261F] text-[9.5px] font-mono text-[#E5A93C] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-20">
                      GitHub
                    </span>
                  </a>

                  {/* Live Project Icon Button */}
                  <a
                    href={active.link}
                    className="relative group w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#08090C] border border-[#2A261F] hover:border-[#E5A93C] text-[#9E988A] hover:text-[#E5A93C] hover:bg-[#181A20] flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-[0_0_20px_rgba(229,169,60,0.35)] active:scale-95 cursor-pointer"
                    aria-label="Live Project Page"
                    title="Open Live Project Page"
                  >
                    <FaGlobe className="text-lg sm:text-xl" />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#08090C] border border-[#2A261F] text-[9.5px] font-mono text-[#E5A93C] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-20">
                      Live Project
                    </span>
                  </a>

                  {/* Documentation / Paper Icon Button */}
                  <a
                    href={active.paperLink || "/Research"}
                    className="relative group w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#08090C] border border-[#2A261F] hover:border-[#E5A93C] text-[#9E988A] hover:text-[#E5A93C] hover:bg-[#181A20] flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-[0_0_20px_rgba(229,169,60,0.35)] active:scale-95 cursor-pointer"
                    aria-label="Documentation / Paper"
                    title="View Technical Paper / Patent"
                  >
                    <FaBookOpen className="text-base sm:text-lg" />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#08090C] border border-[#2A261F] text-[9.5px] font-mono text-[#E5A93C] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-20">
                      Technical Docs
                    </span>
                  </a>

                  {/* Share Icon Button */}
                  <button
                    type="button"
                    onClick={handleCopyRef}
                    className="relative group w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#08090C] border border-[#2A261F] hover:border-[#E5A93C] text-[#9E988A] hover:text-[#E5A93C] hover:bg-[#181A20] flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-[0_0_20px_rgba(229,169,60,0.35)] active:scale-95 cursor-pointer"
                    aria-label="Share Link"
                    title="Share Link"
                  >
                    {copiedRef ? (
                      <FaCheck className="text-emerald-400 text-sm" />
                    ) : (
                      <FaShareAlt className="text-base" />
                    )}
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#08090C] border border-[#2A261F] text-[9.5px] font-mono text-[#E5A93C] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-20">
                      {copiedRef ? "Copied!" : "Share Link"}
                    </span>
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
