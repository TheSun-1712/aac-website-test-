import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import GarcyNavbar from "@/components/garcy/GarcyNavbar";
import GarcyFooter from "@/components/garcy/GarcyFooter";
import GarcyCommandPalette from "@/components/garcy/GarcyCommandPalette";
import GarcyCaseStudies from "@/components/garcy/GarcyCaseStudies";
import { useDatabase } from "@/hooks/useDatabase";
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

const FALLBACK_PROJECTS = {
  uav: {
    id: "uav",
    title: "Autonomous Multi-Rotor UAV",
    subtitle: "Next-gen aerial autonomy with sub-millisecond edge obstacle avoidance",
    client: "AAC ROBOTICS & AUTONOMOUS SYSTEMS LAB",
    field: "AERIAL ROBOTICS / EDGE AI",
    services: "PX4 AUTOPILOT, ROS2, JETSON NANO, LIDAR ODOMETRY",
    image: "/images/8.webp",
    link: "/projects",
    year: "2024–2025",
    desc: "Autonomous multi-rotor UAV platform featuring edge obstacle avoidance, GPS waypoint guidance, and live telemetry downlink developed at AAC Robotics Lab.",
    content: "Engineered from first principles with custom carbon-fiber airframes, onboard NVIDIA Jetson edge inference compute, and dual optical flow sensors for GPS-denied indoor flight stabilization. The platform streams high-throughput telemetry to the ground station over encrypted 5.8GHz links.",
    githubRepo: "https://github.com/AAC-GRIET",
    team: "AAC Robotics Lab Team",
  },
  nav: {
    id: "nav",
    title: "Intelligent Campus Navigation",
    subtitle: "Sub-meter AR indoor positioning and directional wayfinding",
    client: "AAC MOBILE & AR RESEARCH LAB",
    field: "AUGMENTED REALITY / SPATIAL MAPPING",
    services: "AR SPATIAL MAPPING, INDOOR POSITIONING, LOW-LATENCY PATHFINDING",
    image: "/images/pic.webp",
    link: "/projects",
    year: "2024–2025",
    desc: "Sub-meter AR indoor positioning and directional wayfinding system mapping GRIET campus complexes.",
    content: "Combines localized radio fingerprinting, inertial dead-reckoning, and camera-based AR visual odometry. Eliminates orientation friction across collegiate corridors without external satellite reception.",
    githubRepo: "https://github.com/AAC-GRIET",
    team: "Abhiram Pedamallu, V. Dinesh Chandra, Seetaram Koushik",
  },
  pill: {
    id: "pill",
    title: "Automated Pill Reminder",
    subtitle: "Indian Patent 201941002559 — Patented Two-Way Medication Compliance",
    client: "AAC BIOMEDICAL IP INVENTIONS CELL",
    field: "BIOMEDICAL DEVICES / EMBEDDED HEALTHCARE IP",
    services: "PATENT PROSECUTION, TWO-WAY VERIFICATION, CUSTOM PCB, REPLACEABLE MODULES",
    image: "/images/AAC1.png",
    link: "/Patents",
    year: "PATENT GRANTED",
    desc: "Patented assistive medical adherence system with modular dosage cartridges and two-way verification.",
    content: "Features automated dispensing carousels, tactile auditory reminders, and cryptographic two-way compliance logging to eradicate medication double-dosing among elderly patients.",
    githubRepo: "https://github.com/AAC-GRIET",
    team: "Yelma Chethan Reddy, Alence Abhinay, B.S.V.S Anoop, M Srikanth, D. Naga pavan, G Pradeep Reddy",
  },
  glove: {
    id: "glove",
    title: "Smart Sign Language Glove",
    subtitle: "Indian Patent 202041038106 — Real-Time Sensory Gesture Translation",
    client: "AAC ASSISTIVE WEARABLES LAB",
    field: "ASSISTIVE TECH / WEARABLE MECHATRONICS",
    services: "FLEX TRANSDUCERS, REAL-TIME DSP, TEXT-TO-SPEECH, SENSOR FUSION",
    image: "/images/AAC3.png",
    link: "/Patents",
    year: "PATENT PUBLISHED",
    desc: "Low-latency sensory wearable interpreting Indian Sign Language gestures into synthesized speech.",
    content: "Integrates 5 conductive polymer flex sensors, 9-DOF IMU motion tracking, and embedded speech synthesis firmware operating with under 25ms end-to-end latency.",
    githubRepo: "https://github.com/AAC-GRIET",
    team: "Jashwanth Kranthi Bopanna, Santosh Sanjeev, Bharath Varma Kantheti, Gowtham Sai Ponnekanti, Suhas Gangireddy, G Pradeep Reddy",
  },
  energy: {
    id: "energy",
    title: "Smart Campus Energy Grid",
    subtitle: "Real-time MQTT telemetry and predictive institutional load-balancing",
    client: "AAC IOT & SMART GRID LAB",
    field: "IOT / PREDICTIVE ANALYTICS / CLEAN-TECH",
    services: "DISTRIBUTED CT SENSORS, MQTT BROKER, EDGE ML, POWER FORECASTING",
    image: "/images/AAC2.png",
    link: "/projects",
    year: "2023–2025",
    desc: "Intelligent power telemetry network balancing building energy loads and optimizing institutional consumption.",
    content: "Monitors electrical substations across campus using custom ESP32 current transducer arrays. An autoregressive ML model dynamically shifts non-critical loads to prevent peak demand penalties.",
    githubRepo: "https://github.com/AAC-GRIET",
    team: "Abhiram Dodda, Manav, Srija Cherukuri",
  },
  gprime: {
    id: "gprime",
    title: "G-Prime Competitive Judge",
    subtitle: "High-concurrency distributed sandbox engine for algorithmic championships",
    client: "GPRIME STEERING COMMITTEE",
    field: "DISTRIBUTED SOFTWARE / SANDBOX RUNTIMES",
    services: "DOCKER RUNTIME, SECURE EVALUATION, WEBSOCKET TELEMETRY, CIPHER",
    image: "/images/AAC2.png",
    link: "/gprime2026-results",
    year: "CONTEST INFRA",
    desc: "Distributed sandboxed code evaluation engine supporting high-concurrency national coding competitions.",
    content: "Evaluates untrusted multi-language user submissions within micro-sandboxes with sub-80ms response times, real-time telemetry leaderboards, and automated test-case generation.",
    githubRepo: "https://github.com/AAC-GRIET",
    team: "Software Systems Engineering Cohort",
  },
};

export default function ProjectDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: dbProjects, loading } = useDatabase("projects");
  const [copiedRef, setCopiedRef] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);

  // Look for project in database or fallback
  const rawProject = dbProjects?.find((p) => p.id === id || p._id === id || p.slug === id);
  const fallbackProject = id ? FALLBACK_PROJECTS[id] : null;

  const project = rawProject
    ? {
        id: rawProject.id || rawProject._id || rawProject.slug || id,
        title: rawProject.title || "Engineering Project",
        subtitle: rawProject.subtitle || rawProject.tagline || `${(rawProject.categories || "Autonomous Systems").toUpperCase()} Research Prototype`,
        client: rawProject.client || rawProject.lab || "AAC RESEARCH LAB // GRIET",
        field: rawProject.field || (rawProject.categories || "ENGINEERING").toUpperCase(),
        services: rawProject.techStack || rawProject.services || (rawProject.categories || "HARDWARE, EMBEDDED C++, EDGE AI").toUpperCase(),
        image: rawProject.mainImageUrl || rawProject.image || "/images/pic.webp",
        link: rawProject.website || rawProject.demoLink || rawProject.link || `/projects/${id}`,
        githubRepo: rawProject.githubRepo || rawProject.github || "https://github.com/AAC-GRIET",
        paperLink: rawProject.paperLink || rawProject.docLink || "",
        year: rawProject.publishedAt ? new Date(rawProject.publishedAt).getFullYear().toString() : (rawProject.year || "2025"),
        desc: rawProject.description || rawProject.content || "Autonomous engineering prototype engineered at the Advanced Academic Center.",
        content: rawProject.content || rawProject.description || "",
        team: Array.isArray(rawProject.names) ? rawProject.names.join(", ") : (rawProject.names || rawProject.author || rawProject.team || "AAC Research Cohort"),
      }
    : (fallbackProject || FALLBACK_PROJECTS.uav);

  const handleCopyRef = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  return (
    <>
      <Head>
        <title>{project.title} // AAC GRIET</title>
        <meta name="description" content={project.desc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-[#08090C] text-[#EAF1FF] flex flex-col justify-between">
        {/* Floating Header */}
        <GarcyNavbar
          onOpenSearch={() => setSearchOpen(true)}
          onOpenCaseStudies={() => setCaseStudiesOpen(true)}
        />

        {/* Stage Viewport */}
        <div className="pt-24 pb-12 px-3 sm:px-6 lg:px-8 max-w-[1720px] mx-auto w-full flex-1 flex flex-col">
          <div className="w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch min-h-[600px] lg:min-h-[720px]">
            
            {/* ====================================================================
                LEFT COLUMN: BIG PANEL WITH UPLOADED IMAGE
                ==================================================================== */}
            <div className="lg:col-span-6 h-[440px] sm:h-[520px] lg:h-auto relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#2A261F] bg-[#111318] shadow-[0_25px_60px_rgba(0,0,0,0.9)] group flex flex-col justify-between">
              {/* Uploaded Image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover absolute inset-0 select-none group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />

              {/* Ambient Vignette Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090C]/90 via-transparent to-[#08090C]/70 pointer-events-none" />

              {/* Top-Left Bar over image: Brand + Back Button */}
              <div className="relative z-10 p-5 sm:p-7 flex items-center justify-between pointer-events-auto">
                <div className="flex flex-col gap-2.5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/80 font-bold drop-shadow">
                    aac // griet
                  </span>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white font-sans text-xs font-semibold hover:border-[#E5A93C] transition-all cursor-pointer shadow-lg active:scale-95 group/back"
                  >
                    <FaArrowLeft className="text-[10px] text-[#E5A93C] group-hover/back:-translate-x-0.5 transition-transform" />
                    <span>Back to Projects</span>
                  </Link>
                </div>

                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-[#E5A93C] uppercase tracking-wider font-bold">
                  {project.services?.split(",")[0] || "AUTONOMOUS PROTOTYPE"}
                </span>
              </div>

              {/* Bottom Over Image */}
              <div className="relative z-10 p-5 sm:p-7">
                <span className="font-mono text-[9.5px] text-[#9E988A] uppercase tracking-widest block mb-0.5">
                  // SPECIMEN ARCHIVE
                </span>
                <p className="font-mono text-xs text-white/90 font-bold truncate">
                  REF: {String(project.id).toUpperCase()} // RESOLUTION: HIGH-DEF
                </p>
              </div>
            </div>

            {/* ====================================================================
                RIGHT COLUMN: TWO STACKED PANELS
                ==================================================================== */}
            <div className="lg:col-span-6 flex flex-col gap-4 lg:gap-6 min-h-0">
              
              {/* TOP-RIGHT PANEL: BRIEF, SPECS TABLE, AND PROJECT TITLE */}
              <div className="flex-1 bg-[#111318] border border-[#2A261F] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-y-auto">
                <div className="flex items-center justify-between border-b border-[#2A261F] pb-3 mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#E5A93C] font-bold">
                    // SPECIFICATION DOSSIER
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      ACTIVE SPECIMEN
                    </span>
                  </div>
                </div>

                {/* Overview paragraph */}
                <div className="space-y-3 mb-4">
                  <p className="font-sans text-xs sm:text-sm text-[#FAF6ED]/85 leading-relaxed font-normal">
                    {project.desc}
                  </p>
                </div>

                {/* Technical Specifications Grid */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-6 my-2 py-4 border-y border-[#2A261F] font-mono text-[10.5px] sm:text-[11.5px]">
                  <div>
                    <span className="text-[#9E988A] uppercase tracking-wider block text-[10px] mb-0.5">CLIENT</span>
                    <span className="text-white font-semibold uppercase">{project.client}</span>
                  </div>
                  <div>
                    <span className="text-[#9E988A] uppercase tracking-wider block text-[10px] mb-0.5">FIELD</span>
                    <span className="text-white font-semibold uppercase">{project.field}</span>
                  </div>
                  <div>
                    <span className="text-[#9E988A] uppercase tracking-wider block text-[10px] mb-0.5">SERVICES</span>
                    <span className="text-white font-semibold uppercase truncate block" title={project.services}>
                      {project.services}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#9E988A] uppercase tracking-wider block text-[10px] mb-0.5">YEAR</span>
                    <span className="text-[#E5A93C] font-bold uppercase">{project.year}</span>
                  </div>
                </div>

                {/* Project Title and Subtitle */}
                <div className="pt-3">
                  <h1 className="font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
                    {project.title}
                  </h1>
                  <p className="font-sans text-xs sm:text-sm text-[#9E988A] mt-1.5 font-normal">
                    {project.subtitle}
                  </p>
                </div>
              </div>

              {/* BOTTOM-RIGHT PANEL: CONTENT & ICON BUTTONS */}
              <div className="flex-1 bg-[#111318] border border-[#2A261F] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#2A261F] pb-3 font-mono text-[10px] text-[#9E988A] uppercase tracking-wider">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      ENGINEERING TELEMETRY &amp; ACCESS
                    </span>
                    <span className="text-[#9E988A]">AAC REPOSITORY // VERIFIED</span>
                  </div>

                  {/* Detailed Body Paragraphs / Team */}
                  <div className="font-sans text-xs sm:text-sm text-[#9E988A] leading-relaxed max-h-36 overflow-y-auto pr-2 custom-scroll">
                    <p className="text-white/80">
                      {project.content && project.content !== project.desc
                        ? project.content
                        : "Full project source code, schematic blueprints, and benchmark logs are maintained within the AAC central repository. Research fellows may clone the test environment or review published patents."}
                    </p>

                    {project.team && (
                      <div className="mt-3 pt-3 border-t border-[#2A261F]/60 flex items-center gap-2 font-mono text-[10.5px]">
                        <span className="text-[#E5A93C] uppercase font-bold">Contributors:</span>
                        <span className="text-white/90">{project.team}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tactile Icon Buttons for Opening Project Links */}
                <div className="pt-4 border-t border-[#2A261F] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-[#9E988A] uppercase tracking-widest">
                    <span>PROJECT LINKS // ACTION PROTOCOLS:</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* 1. GitHub Icon Button */}
                    {project.githubRepo && (
                      <a
                        href={project.githubRepo}
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
                    )}

                    {/* 2. Live Project / Demo Icon Button */}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative group w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#08090C] border border-[#2A261F] hover:border-[#E5A93C] text-[#9E988A] hover:text-[#E5A93C] hover:bg-[#181A20] flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-[0_0_20px_rgba(229,169,60,0.35)] active:scale-95 cursor-pointer"
                        aria-label="Live Project Page"
                        title="Open Live Project Page"
                      >
                        <FaGlobe className="text-lg sm:text-xl" />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#08090C] border border-[#2A261F] text-[9.5px] font-mono text-[#E5A93C] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-20">
                          Live Demo
                        </span>
                      </a>
                    )}

                    {/* 3. Paper / Patent Documentation Icon Button */}
                    {(project.paperLink || project.services?.includes("PATENT")) && (
                      <a
                        href={project.paperLink || "/Patents"}
                        target={project.paperLink ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className="relative group w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#08090C] border border-[#2A261F] hover:border-[#E5A93C] text-[#9E988A] hover:text-[#E5A93C] hover:bg-[#181A20] flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-[0_0_20px_rgba(229,169,60,0.35)] active:scale-95 cursor-pointer"
                        aria-label="Documentation / Patent"
                        title="View Patent / Research Docs"
                      >
                        <FaBookOpen className="text-base sm:text-lg" />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#08090C] border border-[#2A261F] text-[9.5px] font-mono text-[#E5A93C] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-20">
                          Patent Docs
                        </span>
                      </a>
                    )}

                    {/* 4. Direct External Link Icon Button */}
                    <a
                      href={project.link || "/projects"}
                      className="relative group w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#08090C] border border-[#2A261F] hover:border-[#E5A93C] text-[#9E988A] hover:text-[#E5A93C] hover:bg-[#181A20] flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-[0_0_20px_rgba(229,169,60,0.35)] active:scale-95 cursor-pointer"
                      aria-label="Direct Link"
                      title="Open Project Direct Link"
                    >
                      <FaExternalLinkAlt className="text-base" />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#08090C] border border-[#2A261F] text-[9.5px] font-mono text-[#E5A93C] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-20">
                        Direct Link
                      </span>
                    </a>

                    {/* 5. Share / Copy Link Icon Button */}
                    <button
                      type="button"
                      onClick={handleCopyRef}
                      className="relative group w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#08090C] border border-[#2A261F] hover:border-[#E5A93C] text-[#9E988A] hover:text-[#E5A93C] hover:bg-[#181A20] flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-[0_0_20px_rgba(229,169,60,0.35)] active:scale-95 cursor-pointer"
                      aria-label="Share Link"
                      title="Share Project"
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

        {/* Global Footer */}
        <GarcyFooter />

        {/* Command Palette */}
        <GarcyCommandPalette
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
        />

        {/* Case Studies */}
        <GarcyCaseStudies
          isOpen={caseStudiesOpen}
          onClose={() => setCaseStudiesOpen(false)}
        />
      </main>
    </>
  );
}
