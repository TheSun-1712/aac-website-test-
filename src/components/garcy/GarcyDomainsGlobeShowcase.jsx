import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaTimes,
  FaLayerGroup,
} from "react-icons/fa";
import GarcyDomainModel3D from "./GarcyDomainModel3D";

// 5 AAC Specialized Domains with Rich Telemetry & Blueprint Specs
const AAC_DOMAINS = [
  {
    code: "01",
    shortName: "WEB",
    title: "Web Development",
    tagline: "High-Performance Cloud & Distributed Web Systems",
    hubCity: "HYDERABAD",
    coordinates: "17.52° N, 78.36° E",
    accent: "#10B981", // Emerald
    accentBg: "rgba(16, 185, 129, 0.15)",
    accentBorder: "rgba(16, 185, 129, 0.4)",
    heroMetric: "50+ REPOS",
    heroMetricLabel: "PRODUCTION REPOSITORIES // 100K+ SESSIONS",
    subMetric1: "EDGE COMPUTE",
    subMetric1Val: "VERCEL & CLOUDFLARE",
    subMetric2: "MICROSERVICES",
    subMetric2Val: "DOCKER & FASTAPI",
    description:
      "Full-stack software engineering using modern component paradigms, distributed cloud infrastructure, microservices, and edge computing for institutional scalability.",
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker", "TailwindCSS"],
    deliverables: ["Enterprise Student Portal", "Distributed Research Archive", "Real-Time Telemetry Dashboard"],
    modelName: "Voxel Web Development Workstation",
  },
  {
    code: "02",
    shortName: "APP",
    title: "App Development",
    tagline: "Native & Cross-Platform Mobile Architectures",
    hubCity: "TOKYO",
    coordinates: "35.67° N, 139.65° E",
    accent: "#06B6D4", // Cyan
    accentBg: "rgba(6, 182, 212, 0.15)",
    accentBorder: "rgba(6, 182, 212, 0.4)",
    heroMetric: "60 FPS",
    heroMetricLabel: "ZERO FRAME DROPS // <25MB RAM USAGE",
    subMetric1: "STATE ENGINE",
    subMetric1Val: "RIVERPOD & REDUX",
    subMetric2: "OFFLINE FIRST",
    subMetric2Val: "SQLITE & WATERMELON",
    description:
      "Engineered mobile experiences with offline-first synchronization, low memory footprint, and reactive state architectures across iOS & Android devices.",
    technologies: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase", "SQLite", "GraphQL"],
    deliverables: ["AAC Mobile Companion", "Campus Navigation & Events Client", "Offline Assessment App"],
    modelName: "Apple iPhone Duo Hardware Chassis",
  },
  {
    code: "03",
    shortName: "DL",
    title: "Deep Learning",
    tagline: "Neural Architectures, Transformers & Cognitive AI",
    hubCity: "SAN FRANCISCO",
    coordinates: "37.77° N, -122.41° E",
    accent: "#E5A93C", // Amber Gold
    accentBg: "rgba(229, 169, 60, 0.15)",
    accentBorder: "rgba(229, 169, 60, 0.4)",
    heroMetric: "1.2B TENSORS",
    heroMetricLabel: "<15MS EDGE INFERENCE // COGNITIVE LAB",
    subMetric1: "VISION CORE",
    subMetric1Val: "YOLOv8 & OPENCV",
    subMetric2: "FOUNDATION AI",
    subMetric2Val: "HUGGINGFACE & CUDA",
    description:
      "Applied artificial intelligence and deep neural network research spanning computer vision, natural language modeling, and autonomous decision systems.",
    technologies: ["PyTorch", "TensorFlow", "Transformers", "CUDA", "OpenCV", "Scikit-Learn", "Python"],
    deliverables: ["Vision Object Classifier", "NLP Academic Synthesizer", "Edge Defect Detection Model"],
    modelName: "Artificial Neural Network Synaptic Core",
  },
  {
    code: "04",
    shortName: "IOT",
    title: "Internet of Things",
    tagline: "Embedded Telemetry & Smart Sensor Networks",
    hubCity: "ZURICH",
    coordinates: "47.37° N, 8.54° E",
    accent: "#F97316", // Coral Orange
    accentBg: "rgba(249, 115, 22, 0.15)",
    accentBorder: "rgba(249, 115, 22, 0.4)",
    heroMetric: "24/7 NODES",
    heroMetricLabel: "868MHZ LORAWAN // ENCRYPTED MESH",
    subMetric1: "FIRMWARE",
    subMetric1Val: "EMBEDDED C++ / RTOS",
    subMetric2: "RADIO TELEMETRY",
    subMetric2Val: "MQTT & LORAWAN",
    description:
      "Low-latency hardware integration, microcontroller programming, sensor networks, edge machine learning, and environmental automation protocols.",
    technologies: ["ESP32", "Arduino", "Raspberry Pi", "MQTT", "C / C++", "Zigbee", "LoRaWAN"],
    deliverables: ["Smart Campus Energy Grid", "Autonomous Weather Node", "Lab Environmental Telemetry"],
    modelName: "Moon Rover Autonomous Sensory Vehicle",
  },
  {
    code: "05",
    shortName: "MLOPS",
    title: "Machine Learning Operations",
    tagline: "Production Machine Learning Pipelines & Deployments",
    hubCity: "SINGAPORE",
    coordinates: "1.35° N, 103.81° E",
    accent: "#8B5CF6", // Electric Violet
    accentBg: "rgba(139, 92, 246, 0.15)",
    accentBorder: "rgba(139, 92, 246, 0.4)",
    heroMetric: "99.9% UPTIME",
    heroMetricLabel: "AUTOMATED CI/CD // ZERO DOWNTIME",
    subMetric1: "REGISTRY",
    subMetric1Val: "MLFLOW & KUBEFLOW",
    subMetric2: "DEPLOYMENT",
    subMetric2Val: "KUBERNETES & GITOPS",
    description:
      "Automated continuous training pipelines, model monitoring, containerization, scalable inference microservices, and reproducibility frameworks.",
    technologies: ["Kubeflow", "MLflow", "Docker", "Kubernetes", "FastAPI", "Prometheus", "GitOps"],
    deliverables: ["Automated Model Registry", "Live Inference Microservice", "Drift Detection Pipeline"],
    modelName: "ChatGPT Generative Operations Engine",
  },
];

export default function GarcyDomainsGlobeShowcase() {
  const [activeDomain, setActiveDomain] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const total = AAC_DOMAINS.length;
  const current = AAC_DOMAINS[activeDomain];

  const handleStep = (direction) => {
    setActiveDomain((prev) => (prev + direction + total) % total);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === "ArrowRight") handleStep(1);
      if (e.key === "ArrowLeft") handleStep(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="relative w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Background radial atmosphere tinted by active domain */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-1000 opacity-20 blur-3xl"
        style={{
          background: `radial-gradient(circle 600px at 50% 50%, ${current.accent} 0%, transparent 70%)`,
        }}
      />

      {/* ======================================================================
          TOP LEVEL 3-COLUMN MASTER STAGE (Matching Fold Line Architecture)
          ====================================================================== */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* --------------------------------------------------------------------
            LEFT COLUMN: MISSION HEADLINE & GLOWING 3D RED BEACON ORB
            -------------------------------------------------------------------- */}
        <div className="lg:col-span-3 flex flex-col justify-between space-y-8 text-left">
          <div>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-none mb-3">
              Every domain <br />
              <span
                className="transition-colors duration-500 font-serif italic font-normal"
                style={{ color: current.accent }}
              >
                folds into
              </span>{" "}
              excellence.
            </h2>

            <p className="font-sans text-xs sm:text-sm text-[#9E988A] leading-relaxed font-normal">
              Conceived in 2004, AAC operates five specialized technical labs preparing student fellows across computational, embedded, and cognitive disciplines.
            </p>
          </div>
        </div>

        {/* --------------------------------------------------------------------
            CENTER STAGE: TILTED 3D PEDESTAL + CENTERED 3D HARDWARE MODEL + BLUEPRINT
            -------------------------------------------------------------------- */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center min-h-[480px] sm:min-h-[540px]">
          
          {/* Tilted Dark Pedestal Table Base (Matching Fold Line) */}
          <div
            className="relative w-full aspect-square max-w-[480px] rounded-full border border-[#2A261F] bg-gradient-to-b from-[#141822] via-[#0E1118] to-[#08090C] shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex flex-col items-center justify-center overflow-visible"
            style={{
              transform: "perspective(1200px) rotateX(18deg)",
            }}
          >
            {/* Subtle Pedestal Concentric Ring Insets */}
            <div className="absolute inset-4 rounded-full border border-white/5 pointer-events-none" />
            <div className="absolute inset-12 rounded-full border border-white/5 pointer-events-none" />

            {/* Central Stage: Hero 3D Domain Model (Centered) */}
            <div className="relative w-full h-[300px] sm:h-[350px] flex items-center justify-center z-10">
              <GarcyDomainModel3D
                domainIndex={activeDomain}
                accentColor={current.accent}
              />
            </div>

            {/* Lower Stage: 3D Blueprint Plate Resting on Table Surface */}
            <div className="relative z-20 w-[92%] -mt-4 mb-2">
              <div
                className="relative rounded-2xl p-5 border shadow-2xl transition-all duration-500 backdrop-blur-md"
                style={{
                  backgroundColor: "rgba(17, 19, 24, 0.95)",
                  borderColor: current.accentBorder,
                  boxShadow: `0 15px 40px -10px ${current.accent}33`,
                }}
              >
                {/* Blueprint Topographic Lines Overlay */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, ${current.accent} 1px, transparent 1px)`,
                    backgroundSize: "16px 16px",
                  }}
                />

                {/* Top Badge & Domain Code */}
                <div className="relative flex items-center justify-between font-mono text-[9.5px] uppercase tracking-wider mb-2">
                  <span
                    className="font-bold px-2 py-0.5 rounded-full"
                    style={{
                      color: current.accent,
                      backgroundColor: current.accentBg,
                      border: `1px solid ${current.accentBorder}`,
                    }}
                  >
                    DOMAIN NO. {current.code}
                  </span>
                  <span className="text-[#9E988A]">{current.modelName}</span>
                </div>

                {/* Plate Title */}
                <h3 className="relative font-sans font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                  {current.title}
                </h3>
                <p className="relative font-sans text-[11px] text-[#9E988A] truncate mt-0.5">
                  {current.tagline}
                </p>

                {/* Symmetrical Left / Right Stepper Buttons directly on Card */}
                <div className="relative mt-4 pt-3 border-t border-[#2A261F] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleStep(-1)}
                    className="w-8 h-8 rounded-full bg-[#08090C] border border-[#2A261F] hover:border-white/50 text-white flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
                    aria-label="Previous Domain"
                  >
                    <FaChevronLeft className="text-[10px]" />
                  </button>

                  {/* Active 3D Model Spec indicator */}
                  <span className="font-mono text-[9.5px] text-[#E5A93C] font-semibold uppercase tracking-wider">
                    SPECIMEN: {current.shortName}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleStep(1)}
                    className="w-8 h-8 rounded-full bg-[#08090C] border border-[#2A261F] hover:border-white/50 text-white flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
                    aria-label="Next Domain"
                  >
                    <FaChevronRight className="text-[10px]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --------------------------------------------------------------------
            RIGHT COLUMN: TELEMETRY DOSSIER PANEL (Everest / 4800m Style)
            -------------------------------------------------------------------- */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6 text-left">
          <div className="space-y-4">
            {/* Category Badge Pill */}
            <div className="flex items-center gap-2">
              <span
                className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border"
                style={{
                  color: current.accent,
                  backgroundColor: current.accentBg,
                  borderColor: current.accentBorder,
                }}
              >
                SPECIALIZATION &bull; DOMAIN {current.code}
              </span>
            </div>

            {/* Monospaced Metadata Row */}
            <div className="font-mono text-[10.5px] text-[#9E988A] uppercase tracking-wider">
              <span>{current.shortName}</span> &bull; <span>DOMAIN {current.code}</span> &bull; <span>{current.technologies.length} TECHNOLOGIES</span>
            </div>

            {/* Main Domain Title & Subtitle */}
            <div>
              <h3 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                {current.title}
              </h3>
              <p className="font-sans text-xs text-[#9E988A] mt-1 font-normal">
                {current.tagline}
              </p>
            </div>

            {/* High-Impact Hero Metric (Matching "4 800 m" from video) */}
            <div className="py-2 border-y border-[#2A261F]">
              <div
                className="font-sans font-extrabold text-4xl sm:text-5xl tracking-tight transition-colors duration-500"
                style={{ color: current.accent }}
              >
                {current.heroMetric}
              </div>
              <div className="font-mono text-[9.5px] text-[#9E988A] uppercase tracking-wider mt-1">
                {current.heroMetricLabel}
              </div>

              {/* Sub-metrics */}
              <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-[#2A261F]/60 font-mono text-[10px]">
                <div>
                  <span className="text-[#9E988A] block">{current.subMetric1}</span>
                  <span className="text-white font-semibold">{current.subMetric1Val}</span>
                </div>
                <div>
                  <span className="text-[#9E988A] block">{current.subMetric2}</span>
                  <span className="text-white font-semibold">{current.subMetric2Val}</span>
                </div>
              </div>
            </div>

            {/* Core Technologies Pills */}
            <div className="space-y-1.5">
              <span className="font-mono text-[9.5px] text-[#9E988A] uppercase tracking-wider block">
                CORE STACK:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {current.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-[#111318] border border-[#2A261F] text-[10.5px] font-mono text-white/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Narrative description */}
            <p className="font-sans text-xs text-[#9E988A] leading-relaxed font-normal">
              {current.description}
            </p>
          </div>

          {/* Action Link Button */}
          <div className="pt-2">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider text-[#08090C] transition-all shadow-md active:scale-95 cursor-pointer"
              style={{
                backgroundColor: current.accent,
              }}
            >
              <span>Explore {current.shortName} Projects</span>
              <FaExternalLinkAlt className="text-[10px]" />
            </Link>
          </div>
        </div>

      </div>

      {/* ======================================================================
          BOTTOM RIGHT 5-CASSETTE SPINE SELECTOR (Matching Fold Line Spine 01-05)
          ====================================================================== */}
      <div className="relative mt-12 pt-6 border-t border-[#2A261F] flex flex-wrap items-center justify-between gap-6">
        
        {/* Left: Active 3D Specimen Hardware Info */}
        <div className="font-mono text-xs text-[#9E988A] flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: current.accent }}
          />
          <span className="text-white font-semibold">3D SPECIMEN:</span>
          <span>{current.modelName}</span>
        </div>

        {/* Right: 5 Vertical Cassette Spines & Step Counter */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Cassette Spines */}
          <div className="flex items-end gap-1.5 h-10">
            {AAC_DOMAINS.map((dom, idx) => {
              const isSelected = activeDomain === idx;
              return (
                <button
                  key={dom.code}
                  type="button"
                  onClick={() => setActiveDomain(idx)}
                  className={`w-4 sm:w-5 rounded-t-md transition-all duration-300 cursor-pointer flex flex-col items-center justify-end pb-1 ${
                    isSelected
                      ? "h-10 shadow-lg"
                      : "h-6 bg-[#161922] hover:bg-[#202534] opacity-70 hover:opacity-100"
                  }`}
                  style={{
                    backgroundColor: isSelected ? dom.accent : undefined,
                  }}
                  title={dom.title}
                  aria-label={`Select ${dom.title}`}
                >
                  <span
                    className={`font-mono text-[8.5px] font-bold ${
                      isSelected ? "text-[#08090C]" : "text-[#9E988A]"
                    }`}
                  >
                    {dom.code}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Monospaced Step Counter: 01 / 05 */}
          <div className="font-mono text-xs font-bold text-[#FAF6ED] tracking-wider pl-2 border-l border-[#2A261F]">
            <span style={{ color: current.accent }}>{current.code}</span>
            <span className="text-[#9E988A]"> / 05</span>
          </div>
        </div>

      </div>

      {/* ======================================================================
          DEEP-DIVE MODAL: CURRICULUM, DELIVERABLES & HARDWARE BREAKDOWN
          ====================================================================== */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl bg-[#111318] border border-[#2A261F] p-6 sm:p-8 shadow-2xl text-left overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#2A261F] pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span
                  className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider"
                  style={{
                    color: current.accent,
                    backgroundColor: current.accentBg,
                  }}
                >
                  DOMAIN {current.code} SPECIFICATION
                </span>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-[#08090C] border border-[#2A261F] text-[#9E988A] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <FaTimes className="text-xs" />
              </button>
            </div>

            {/* Title & Tagline */}
            <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-white mb-1">
              {current.title}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#9E988A] mb-6">
              {current.tagline}
            </p>

            {/* 3D Model Spec Box */}
            <div className="p-4 rounded-2xl bg-[#08090C] border border-[#2A261F] mb-6 flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                style={{ backgroundColor: current.accentBg, color: current.accent }}
              >
                <FaLayerGroup />
              </div>
              <div>
                <span className="font-mono text-[9.5px] text-[#9E988A] uppercase tracking-wider block">
                  3D HARDWARE SPECIMEN:
                </span>
                <span className="font-sans text-sm text-white font-bold block">
                  {current.modelName}
                </span>
              </div>
            </div>

            {/* Deliverables List */}
            <div className="space-y-3 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#FAF6ED] font-bold block">
                FLAGSHIP LAB DELIVERABLES &amp; PROTOTYPES:
              </span>
              <div className="space-y-2">
                {current.deliverables.map((del) => (
                  <div
                    key={del}
                    className="p-3 rounded-xl bg-[#08090C] border border-[#2A261F] flex items-center gap-3 text-xs text-white/90"
                  >
                    <FaCheckCircle className="text-emerald-400 flex-shrink-0" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="space-y-2 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#FAF6ED] font-bold block">
                CURRICULAR TECHNOLOGIES:
              </span>
              <div className="flex flex-wrap gap-2">
                {current.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-lg bg-[#08090C] border border-[#2A261F] text-xs font-mono text-white/90"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Close Button */}
            <div className="pt-4 border-t border-[#2A261F] flex justify-end">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-6 py-2 rounded-xl bg-[#08090C] border border-[#2A261F] hover:border-white/50 text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close Spec
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

