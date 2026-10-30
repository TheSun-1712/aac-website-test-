import { useState } from "react";
import Link from "next/link";
import {
  FaGraduationCap,
  FaBrain,
  FaLightbulb,
  FaUsers,
  FaCheckCircle,
  FaMicrochip,
  FaRocket,
  FaShieldAlt,
  FaArrowRight,
  FaExternalLinkAlt,
} from "react-icons/fa";

export default function GarcyAboutEcosystem() {
  const [activeStep, setActiveStep] = useState(0);

  const inductionSteps = [
    {
      step: "01",
      title: "Domain Registration",
      subtitle: "EXPRESSION OF INTEREST",
      icon: FaGraduationCap,
      desc: "Undergraduate and postgraduate students declare interest across software, autonomous robotics, edge IoT, or patentable deep-tech without academic barrier filters.",
      metric: "Open to All Years",
    },
    {
      step: "02",
      title: "Algorithmic & Technical Evaluation",
      subtitle: "ONLINE REASONING BENCHMARK",
      icon: FaBrain,
      desc: "Candidates undergo an intensive technical examination assessing logical reasoning, algorithmic thinking, embedded fundamentals, and problem-solving aptitude.",
      metric: "Competitive Screening",
    },
    {
      step: "03",
      title: "Research Paper Drafting",
      subtitle: "LITERATURE REVIEW & HYPOTHESIS",
      icon: FaLightbulb,
      desc: "Qualifiers are assigned rigorous research topics to draft IEEE-standard literature reviews and propose novel engineering solutions for current technical roadblocks.",
      metric: "Scientific Rigor",
    },
    {
      step: "04",
      title: "Technical Defense & Oral Interview",
      subtitle: "FACULTY & CORE COMMITTEE PANEL",
      icon: FaUsers,
      desc: "A personal defense panel with AAC student heads and faculty advisors probing technical depth, commitment, domain passion, and proposed architectures.",
      metric: "Panel Examination",
    },
    {
      step: "05",
      title: "Lab Induction & Project Assignment",
      subtitle: "FULL RESEARCH MEMBERSHIP",
      icon: FaCheckCircle,
      desc: "Inductees receive biometric lab access, workstation assignment, and direct integration into active patent filings and national competition teams.",
      metric: "Final Induction",
    },
  ];

  const partners = [
    {
      name: "GRIET HYDERABAD",
      role: "Autonomous Engineering Institute",
      badge: "HOST CAMPUS",
      metric: "Est. 1997",
    },
    {
      name: "NRSC COLLABORATION",
      role: "National Remote Sensing Centre (ISRO)",
      badge: "OFFICIAL MOU",
      metric: "R&D Partner",
    },
    {
      name: "IEEE STUDENT BRANCH",
      role: "Premier International Technical Chapter",
      badge: "GLOBAL CHAPTER",
      metric: "Active Section",
    },
    {
      name: "IIC MHRD",
      role: "Institution's Innovation Council",
      badge: "GOVT OF INDIA",
      metric: "Innovation Cell",
    },
    {
      name: "NAAC A++ ACCREDITED",
      role: "National Assessment & Accreditation",
      badge: "HIGHEST TIER",
      metric: "Top Grade",
    },
  ];

  const currentStep = inductionSteps[activeStep];
  const StepIcon = currentStep.icon;

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 max-w-7xl mx-auto border-b border-white/10">
      
      {/* Background Ambient Radial Glow */}
      <div className="absolute right-1/4 top-1/2 w-[500px] h-[500px] bg-[#1769FF]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[10.5px] font-semibold tracking-wide uppercase mb-3 border backdrop-blur-md bg-[#1769FF]/15 border-[#1769FF]/40 text-[#49A3FF]">
            <FaShieldAlt className="text-[10px]" />
            <span>09 // The Organization &amp; Ecosystem</span>
          </div>

          <h2 className="font-extrabold text-3xl sm:text-5xl tracking-tighter text-[#EAF1FF] mb-2 uppercase font-sans">
            The ecosystem behind <br />
            <span className="italic font-serif font-normal text-[#49A3FF] lowercase tracking-normal text-3xl sm:text-5xl">
              the breakthroughs.
            </span>
          </h2>
        </div>

        <p className="mt-4 md:mt-0 text-xs sm:text-sm text-[#8793A8] max-w-sm font-sans font-normal leading-relaxed">
          Founded in 2004 at GRIET Hyderabad — 20+ years of fostering scientific temper, patentable inventions, and student technology ventures.
        </p>
      </div>

      {/* 5-Stage Research Induction Protocol */}
      <div className="mb-20">
        <div className="flex items-center justify-between text-xs font-mono uppercase text-[#8793A8] mb-6">
          <span className="font-bold text-[#EAF1FF] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1769FF] animate-pulse" />
            <span>5-Stage Research Induction Protocol</span>
          </span>
          <span className="text-[10px] text-[#49A3FF]">SELECT STEP TO INSPECT</span>
        </div>

        {/* Step Track Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-6">
          {inductionSteps.map((s, idx) => {
            const isSelected = activeStep === idx;
            return (
              <button
                key={s.step}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-300 ${
                  isSelected
                    ? "bg-[#101725] border-[#1769FF] shadow-[0_4px_20px_rgba(23,105,255,0.35)]"
                    : "bg-[#101725]/50 border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className={`font-bold ${isSelected ? "text-[#49A3FF]" : "text-[#8793A8]"}`}>
                    STEP {s.step}
                  </span>
                  <span className="text-[9px] text-[#8793A8] font-mono">{s.metric}</span>
                </div>
                <div className="text-xs font-bold font-sans text-[#EAF1FF] truncate">
                  {s.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Card */}
        <div className="garcy-glass-card p-6 sm:p-8 border border-[#1769FF]/50 bg-gradient-to-br from-[#101725] via-[#0d1424] to-[#080B12] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1769FF] to-[#080B12] flex items-center justify-center font-mono font-extrabold text-xl text-[#49A3FF] border border-[#1769FF]/60 shadow-lg flex-shrink-0">
              <StepIcon />
            </div>
            <div>
              <div className="text-[10px] font-mono text-[#49A3FF] uppercase tracking-wider mb-0.5 font-bold">
                STAGE {currentStep.step} &bull; {currentStep.subtitle}
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#EAF1FF] font-sans">
                {currentStep.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#8793A8] leading-relaxed max-w-2xl mt-1 font-sans">
                {currentStep.desc}
              </p>
            </div>
          </div>

          <Link
            href="/About"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1769FF] hover:bg-[#49A3FF] hover:text-black text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md"
          >
            <span>Learn About Induction</span>
            <FaExternalLinkAlt className="text-[9px]" />
          </Link>
        </div>
      </div>

      {/* Institutional Accreditation Wall */}
      <div>
        <div className="flex items-center justify-between text-xs font-mono uppercase text-[#8793A8] mb-6">
          <span className="font-bold text-[#EAF1FF] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1769FF]" />
            <span>Institutional Backing &amp; National Accreditation</span>
          </span>
          <span className="text-[10px] text-[#8793A8]">GRIET HYDERABAD</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {partners.map((p) => (
            <div
              key={p.name}
              className="p-5 rounded-2xl bg-[#101725]/60 border border-white/15 hover:border-[#1769FF]/60 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between text-[9px] font-mono uppercase text-[#8793A8] mb-3">
                  <span className="px-2 py-0.5 rounded-md bg-[#080B12] text-[#49A3FF] font-bold border border-[#1769FF]/30">
                    {p.badge}
                  </span>
                  <span>{p.metric}</span>
                </div>
                <h4 className="text-sm font-extrabold text-[#EAF1FF] font-sans group-hover:text-[#49A3FF] transition-colors leading-snug mb-1">
                  {p.name}
                </h4>
                <p className="text-[11px] text-[#8793A8] font-sans">
                  {p.role}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#8793A8]">
                <span>VERIFIED</span>
                <span className="text-[#1769FF]">&bull;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

