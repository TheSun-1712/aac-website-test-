import { useState } from "react";
import Link from "next/link";
import {
  FaBrain,
  FaRocket,
  FaAtom,
  FaMicrochip,
  FaCode,
  FaArrowRight,
  FaExternalLinkAlt,
  FaCheckCircle,
} from "react-icons/fa";

export default function GarcyResearchExplorer() {
  const [activeDomain, setActiveDomain] = useState(0);

  const domains = [
    {
      id: "deep-learning",
      index: "01",
      title: "Deep Learning & Cognitive AI",
      tag: "CORE R&D",
      icon: FaBrain,
      subtitle: "NEURAL ARCHITECTURES & COMPUTER VISION",
      desc: "Applied artificial intelligence and deep neural network research spanning computer vision, natural language modeling, defect detection, and IJERT peer-reviewed hybrid classification models.",
      metrics: [
        { label: "Wine ML Accuracy", value: "94.6% IJERT" },
        { label: "Edge Inference", value: "< 14ms" },
        { label: "Frameworks", value: "PyTorch & CUDA" },
      ],
      technologies: ["PyTorch", "TensorFlow", "Transformers", "CUDA", "OpenCV", "Scikit-Learn"],
      paperLink: "/Publications",
    },
    {
      id: "iot-embedded",
      index: "02",
      title: "Internet of Things & Smart Telemetry",
      tag: "IP CREATION",
      icon: FaMicrochip,
      subtitle: "EMBEDDED SENSOR NETWORKS & MESH",
      desc: "Low-latency hardware integration, microcontroller programming, and patent-published devices including the Automated Electronic Pill Reminder and Smart Gesture Glove.",
      metrics: [
        { label: "Patents Published", value: "2 IP Filings" },
        { label: "Smart Energy Nodes", value: "80+ Deployed" },
        { label: "Radio Protocols", value: "MQTT & LoRaWAN" },
      ],
      technologies: ["ESP32", "Arduino", "Raspberry Pi", "MQTT", "C / C++", "LoRaWAN"],
      paperLink: "/Patents",
    },
    {
      id: "web-dev",
      index: "03",
      title: "Web Development & Cloud Systems",
      tag: "INFRASTRUCTURE",
      icon: FaCode,
      subtitle: "DISTRIBUTED CLOUD & EDGE COMPUTING",
      desc: "Full-stack software engineering using modern component paradigms, distributed cloud infrastructure, microservices, and edge computing powering institutional portals.",
      metrics: [
        { label: "Component Paradigm", value: "React & Next.js" },
        { label: "Type Safety", value: "TypeScript" },
        { label: "Database Layer", value: "PostgreSQL / Prisma" },
      ],
      technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
      paperLink: "/projects",
    },
    {
      id: "app-dev",
      index: "04",
      title: "App Development & Mobile Architectures",
      tag: "MOBILE R&D",
      icon: FaRocket,
      subtitle: "OFFLINE-FIRST SYNCHRONIZATION",
      desc: "Engineered mobile experiences with offline-first synchronization, low memory footprint, and reactive state architectures across iOS & Android for campus navigation.",
      metrics: [
        { label: "Campus Navigation", value: "AR Integrated" },
        { label: "Platform Target", value: "iOS & Android" },
        { label: "Architecture", value: "Reactive State" },
      ],
      technologies: ["Flutter", "React Native", "Kotlin", "Swift", "Firebase", "SQLite"],
      paperLink: "/projects",
    },
    {
      id: "ml-ops",
      index: "05",
      title: "ML-Ops & Distributed Execution",
      tag: "PRODUCTION AI",
      icon: FaAtom,
      subtitle: "SCALABLE INFERENCE & CONTEST ENGINES",
      desc: "Automated continuous training pipelines, model registries, containerized microservices, and the real-time execution engine powering G-Prime coding contests.",
      metrics: [
        { label: "Judge Execution Speed", value: "< 80ms" },
        { label: "Contest Teams", value: "42+ Rig Evaluated" },
        { label: "Orchestration", value: "Docker & Kubernetes" },
      ],
      technologies: ["Kubeflow", "MLflow", "Docker", "Kubernetes", "FastAPI", "Prometheus"],
      paperLink: "/gprime2026-results",
    },
  ];

  const current = domains[activeDomain];
  const Icon = current.icon;

  return (
    <section id="research" className="relative py-28 px-4 sm:px-6 max-w-7xl mx-auto border-b border-white/10">
      
      {/* Background Holographic Aura */}
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-[#1769FF]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[10.5px] font-semibold tracking-wide uppercase mb-3 border backdrop-blur-md bg-[#1769FF]/15 border-[#1769FF]/40 text-[#49A3FF]">
            <span>04 // Research Domain Explorer</span>
          </div>

          <h2 className="font-extrabold text-3xl sm:text-5xl tracking-tighter text-[#EAF1FF] mb-2 uppercase font-sans">
            Where ideas become <br />
            <span className="italic font-serif font-normal text-[#49A3FF] lowercase tracking-normal text-3xl sm:text-5xl">
              discoveries.
            </span>
          </h2>
        </div>

        <p className="mt-4 md:mt-0 text-xs sm:text-sm text-[#8793A8] max-w-sm font-sans font-normal leading-relaxed">
          5 interdisciplinary labs bridging foundational student curiosity with patent-grade engineering and real-world deployment.
        </p>
      </div>

      {/* Interactive Research Matrix (2 Columns: Selector + Matrix Inspector) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Domain Selector Tabs (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-2.5">
          {domains.map((d, idx) => {
            const DomainIcon = d.icon;
            const isSelected = activeDomain === idx;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setActiveDomain(idx)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                  isSelected
                    ? "bg-[#101725] border-[#1769FF] shadow-[0_4px_24px_rgba(23,105,255,0.3)] translate-x-1"
                    : "bg-[#101725]/50 border-white/10 hover:border-white/20 hover:bg-[#101725]/80"
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md ${
                      isSelected
                        ? "bg-[#1769FF] text-white"
                        : "bg-white/5 text-[#8793A8] group-hover:text-white"
                    }`}
                  >
                    {d.index}
                  </span>

                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-[#EAF1FF] group-hover:text-[#49A3FF] transition-colors truncate font-sans">
                      {d.title}
                    </div>
                    <div className="text-[9.5px] font-mono text-[#8793A8] uppercase tracking-wider mt-0.5">
                      {d.tag}
                    </div>
                  </div>
                </div>

                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs flex-shrink-0 transition-colors ${
                    isSelected
                      ? "bg-[#1769FF]/20 text-[#49A3FF]"
                      : "text-[#8793A8] group-hover:text-white"
                  }`}
                >
                  <DomainIcon />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Active Domain Inspector Panel (7 Cols) */}
        <div className="lg:col-span-7 garcy-glass-card p-6 sm:p-8 border border-[#1769FF]/40 relative overflow-hidden bg-gradient-to-br from-[#101725] via-[#0d1424] to-[#080B12]">
          
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#1769FF]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Tag & Status */}
          <div className="flex items-center justify-between text-xs font-mono uppercase text-[#8793A8] mb-6">
            <span className="flex items-center gap-2 text-[#49A3FF] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#1769FF] animate-pulse" />
              <span>DOMAIN {current.index} // {current.tag}</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-[#080B12] border border-[#1769FF]/30 text-[10px] text-[#49A3FF] font-bold">
              ACTIVE R&amp;D LAB
            </span>
          </div>

          {/* Subtitle & Title */}
          <div className="text-[10px] font-mono text-[#8793A8] uppercase tracking-wider mb-1 font-semibold">
            {current.subtitle}
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#EAF1FF] mb-4 font-sans tracking-tight">
            {current.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#8793A8] leading-relaxed mb-8 font-sans font-normal">
            {current.desc}
          </p>

          {/* 3 Metrics Cards */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {current.metrics.map((m) => (
              <div
                key={m.label}
                className="p-3.5 rounded-xl bg-[#080B12]/80 border border-white/10 flex flex-col justify-between"
              >
                <div className="text-[9px] font-mono text-[#8793A8] uppercase tracking-wider">
                  {m.label}
                </div>
                <div className="text-base sm:text-lg font-extrabold font-mono text-[#49A3FF] mt-1">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Technology Badges */}
          <div className="mb-8">
            <div className="text-[9.5px] font-mono uppercase text-[#8793A8] tracking-wider mb-2">
              Verified Hardware &amp; Toolchain Stack:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {current.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-[#EAF1FF] flex items-center gap-1.5"
                >
                  <FaCheckCircle className="text-[8px] text-[#49A3FF]" />
                  <span>{tech}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <Link
              href={current.paperLink}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1769FF] hover:bg-[#49A3FF] hover:text-black text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(23,105,255,0.4)]"
            >
              <span>Explore Research Archive</span>
              <FaExternalLinkAlt className="text-[9px]" />
            </Link>

            <span className="text-[10px] font-mono text-[#8793A8] uppercase">
              AAC GRIET &bull; LAB {current.index}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

