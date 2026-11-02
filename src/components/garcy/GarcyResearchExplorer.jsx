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
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-[#E5A93C]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[10.5px] font-semibold tracking-wide uppercase mb-3 border backdrop-blur-md bg-[#E5A93C]/15 border-[#E5A93C]/40 text-[#E5A93C]">
            <span>04 // Research Domain Explorer</span>
          </div>

          <h2 className="font-extrabold text-3xl sm:text-5xl tracking-tighter text-[#EAF1FF] mb-2 uppercase font-sans">
            Where ideas become <br />
            <span className="italic font-serif font-normal text-[#E5A93C] lowercase tracking-normal text-3xl sm:text-5xl">
              discoveries.
            </span>
          </h2>
        </div>

        <p className="mt-4 md:mt-0 text-xs sm:text-sm text-[#9E988A] max-w-sm font-sans font-normal leading-relaxed">
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
                    ? "bg-[#111318] border-[#E5A93C] shadow-[0_4px_24px_rgba(229, 169, 60,0.3)] translate-x-1"
                    : "bg-[#111318]/50 border-white/10 hover:border-white/20 hover:bg-[#111318]/80"
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md ${
                      isSelected
                        ? "bg-[#E5A93C] text-white"
                        : "bg-white/5 text-[#9E988A] group-hover:text-white"
                    }`}
                  >
                    {d.index}
                  </span>

                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-[#EAF1FF] group-hover:text-[#E5A93C] transition-colors truncate font-sans">
                      {d.title}
                    </div>
                    <div className="text-[9.5px] font-mono text-[#9E988A] uppercase tracking-wider mt-0.5">
                      {d.tag}
                    </div>
                  </div>
                </div>

                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs flex-shrink-0 transition-colors ${
                    isSelected
                      ? "bg-[#E5A93C]/20 text-[#E5A93C]"
                      : "text-[#9E988A] group-hover:text-white"
                  }`}
                >
                  <DomainIcon />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Active Domain Inspector Panel (7 Cols) */}
        <div className="lg:col-span-7 garcy-glass-card p-6 sm:p-8 border border-[#E5A93C]/40 relative overflow-hidden bg-gradient-to-br from-[#111318] via-[#0d1424] to-[#08090C]">
          
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E5A93C]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Tag & Status */}
          <div className="flex items-center justify-between text-xs font-mono uppercase text-[#9E988A] mb-6">
            <span className="flex items-center gap-2 text-[#E5A93C] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#E5A93C] animate-pulse" />
              <span>DOMAIN {current.index} // {current.tag}</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-[#08090C] border border-[#E5A93C]/30 text-[10px] text-[#E5A93C] font-bold">
              ACTIVE R&amp;D LAB
            </span>
          </div>

          {/* Subtitle & Title */}
          <div className="text-[10px] font-mono text-[#9E988A] uppercase tracking-wider mb-1 font-semibold">
            {current.subtitle}
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#EAF1FF] mb-4 font-sans tracking-tight">
            {current.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#9E988A] leading-relaxed mb-8 font-sans font-normal">
            {current.desc}
          </p>

          {/* 3 Metrics Cards */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {current.metrics.map((m) => (
              <div
                key={m.label}
                className="p-3.5 rounded-xl bg-[#08090C]/80 border border-white/10 flex flex-col justify-between"
              >
                <div className="text-[9px] font-mono text-[#9E988A] uppercase tracking-wider">
                  {m.label}
                </div>
                <div className="text-base sm:text-lg font-extrabold font-mono text-[#E5A93C] mt-1">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Technology Badges */}
          <div className="mb-8">
            <div className="text-[9.5px] font-mono uppercase text-[#9E988A] tracking-wider mb-2">
              Verified Hardware &amp; Toolchain Stack:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {current.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-[#EAF1FF] flex items-center gap-1.5"
                >
                  <FaCheckCircle className="text-[8px] text-[#E5A93C]" />
                  <span>{tech}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <Link
              href={current.paperLink}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E5A93C] hover:bg-[#E5A93C] hover:text-black text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(229, 169, 60,0.4)]"
            >
              <span>Explore Research Archive</span>
              <FaExternalLinkAlt className="text-[9px]" />
            </Link>

            <span className="text-[10px] font-mono text-[#9E988A] uppercase">
              AAC GRIET &bull; LAB {current.index}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

