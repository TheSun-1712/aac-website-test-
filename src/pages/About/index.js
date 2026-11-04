import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import BackgroundVideo from "@/components/BackgroundVideo";
import GarcyNavbar from "@/components/garcy/GarcyNavbar";
import GarcyFooter from "@/components/garcy/GarcyFooter";
import GarcyCommandPalette from "@/components/garcy/GarcyCommandPalette";
import GarcyCaseStudies from "@/components/garcy/GarcyCaseStudies";
import GarcyDomainsGlobeShowcase from "@/components/garcy/GarcyDomainsGlobeShowcase";
import {
  FaGraduationCap,
  FaCheckCircle,
  FaShieldAlt,
  FaRocket,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";

export default function AboutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);

  const selectionSteps = [
    {
      step: "01",
      phase: "STAGE 01",
      title: "Registration & Profile Submission",
      subtitle: "Open Application Window",
      description:
        "Candidates register basic academic credentials, highlight technical interests, and nominate their target domain of specialization.",
      criteria: "Open to all enrolled engineering students at GRIET with foundational interest in software, electronics, or AI.",
      deliverable: "Online registration form & brief statement of engineering purpose.",
      status: "ROUND 01",
      tag: "NO PRIOR EXPERIENCE REQUIRED",
    },
    {
      step: "02",
      phase: "STAGE 02",
      title: "Online Assessment Test",
      subtitle: "Algorithmic & Domain Diagnostics",
      description:
        "A structured technical assessment evaluating algorithmic logic, quantitative problem-solving, and foundational domain concepts.",
      criteria: "Score-based qualification evaluating analytical problem solving, logical flow, and aptitude.",
      deliverable: "Proctored 60-minute technical evaluation.",
      status: "ROUND 02",
      tag: "MERIT EVALUATION",
    },
    {
      step: "03",
      phase: "STAGE 03",
      title: "Research Paper Writing",
      subtitle: "Scientific Inquiry & Technical Synthesis",
      description:
        "Candidates author an in-depth technical brief or literature review on emerging trends in their selected domain, demonstrating scholarly curiosity.",
      criteria: "Clarity of technical thought, literature citation, analytical depth, and originality.",
      deliverable: "Formal IEEE-style 2-page technical summary on assigned topics.",
      status: "ROUND 03",
      tag: "RESEARCH RIGOR",
    },
    {
      step: "04",
      phase: "STAGE 04",
      title: "Technical Defense & Oral Interview",
      subtitle: "Panel Oral Defense",
      description:
        "Face-to-face panel defense evaluating technical depth, the submitted research paper, problem approach, teamwork, and cultural alignment with AAC.",
      criteria: "Oral communication of engineering principles, passion for research, and problem adaptability.",
      deliverable: "20-minute technical presentation & interview session.",
      status: "ROUND 04",
      tag: "PANEL REVIEW",
    },
    {
      step: "05",
      phase: "STAGE 05",
      title: "Final Induction & Lab Onboarding",
      subtitle: "Official Cohort Onboarding",
      description:
        "Successful candidates officially join the AAC family, gain access to specialized research laboratories, and are paired with senior cohort mentors.",
      criteria: "Top percentile cumulative performance across all previous evaluation stages.",
      deliverable: "AAC Research Fellow Access & Project Cohort Allocation.",
      status: "FINAL INDUCTION",
      tag: "ACTIVE FELLOWSHIP",
    },
  ];

  const currentStep = selectionSteps[activeStep];

  return (
    <>
      <Head>
        <title>ABOUT AAC GRIET // ADVANCED ACADEMIC CENTER</title>
        <meta
          name="description"
          content="Advanced Academic Center (AAC) of GRIET, Hyderabad is an inter-disciplinary research center and elite technology incubator established in 2004."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <BackgroundVideo />

      {/* Ambient Dither & Dynamic Spotlight */}
      <div className="reel-dither" aria-hidden="true" />
      <div className="spotlight" aria-hidden="true" />

      {/* Main Stage Canvas */}
      <main className="stage relative overflow-hidden bg-[#08090C]/92 text-[#EAF1FF] min-h-screen pb-20">
        
        {/* Floating Header */}
        <GarcyNavbar
          onOpenSearch={() => setSearchOpen(true)}
          onOpenCaseStudies={() => setCaseStudiesOpen(true)}
        />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Mission Narrative */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[10.5px] font-semibold tracking-wide uppercase mb-4 border backdrop-blur-md bg-[#E5A93C]/15 border-[#E5A93C]/40 text-[#E5A93C]">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <span>EST. 2004 // 20+ YEARS HERITAGE</span>
              </div>

              <h1 className="font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tighter leading-none mb-6 text-[#EAF1FF] uppercase font-sans">
                About <br />
                <span className="italic font-serif font-normal text-[#E5A93C] lowercase tracking-normal text-3xl sm:text-5xl">
                  the center.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#9E988A] leading-relaxed font-sans mb-6 font-normal">
                The <strong className="text-white font-bold">Advanced Academic Center (AAC)</strong> of GRIET, Hyderabad is an inter-disciplinary research center and technology incubator. Conceived in 2004 by Dr. S.N.N. Pandit, AAC empowers ambitious student researchers to engineer production systems, file patents, publish peer-reviewed papers, and launch commercial ventures.
              </p>

              <div className="flex flex-wrap gap-2 text-xs font-mono text-[#9E988A]">
                <span className="px-3 py-1.5 rounded-lg bg-[#111318] border border-white/10 text-[#E5A93C] font-bold">
                  COORD: 17.52° N, 78.36° E
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#111318] border border-white/10 text-white">
                  ROOM 3614, BLOCK 3, GRIET
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#111318] border border-white/10 text-[#10b981] font-bold">
                  24/7 R&amp;D ACCESS
                </span>
              </div>
            </div>

            {/* Right Column: Key Metric Tiles */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="garcy-glass-card p-6 border border-white/15 bg-gradient-to-br from-[#111318] to-[#08090C]">
                <span className="font-mono text-[10px] text-[#9E988A] uppercase">FOUNDING</span>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#E5A93C] my-1 font-sans">
                  2004
                </div>
                <span className="font-mono text-[10px] text-[#9E988A]">20+ YRS HERITAGE</span>
              </div>

              <div className="garcy-glass-card p-6 border border-white/15 bg-gradient-to-br from-[#111318] to-[#08090C]">
                <span className="font-mono text-[10px] text-[#9E988A] uppercase">PROJECTS</span>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#EAF1FF] my-1 font-sans">
                  50+
                </div>
                <span className="font-mono text-[10px] text-[#10b981]">PROTOTYPES</span>
              </div>

              <div className="garcy-glass-card p-6 border border-white/15 bg-gradient-to-br from-[#111318] to-[#08090C]">
                <span className="font-mono text-[10px] text-[#9E988A] uppercase">PATENTS</span>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#E5A93C] my-1 font-sans">
                  2
                </div>
                <span className="font-mono text-[10px] text-[#9E988A]">PUBLISHED IP</span>
              </div>

              <div className="garcy-glass-card p-6 border border-white/15 bg-gradient-to-br from-[#111318] to-[#08090C]">
                <span className="font-mono text-[10px] text-[#9E988A] uppercase">COHORT</span>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#EAF1FF] my-1 font-sans">
                  400+
                </div>
                <span className="font-mono text-[10px] text-[#10b981]">RESEARCH FELLOWS</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5 Specialized Research Domains & 3D Interactive Globe Showcase */}
        <GarcyDomainsGlobeShowcase />

        {/* 5-Stage Selection & Induction Protocol */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[10.5px] font-semibold tracking-wide uppercase mb-3 border backdrop-blur-md bg-[#E5A93C]/15 border-[#E5A93C]/40 text-[#E5A93C]">
                <span>02 // Recruitment &amp; Onboarding</span>
              </div>
              <h2 className="font-extrabold text-3xl sm:text-5xl tracking-tighter text-[#EAF1FF] uppercase font-sans">
                5-Stage Induction.
              </h2>
            </div>
            <p className="mt-4 md:mt-0 text-xs sm:text-sm text-[#9E988A] max-w-sm font-sans font-normal leading-relaxed">
              Every student cohort undergoes a rigorous merit-driven selection process evaluating aptitude, literature synthesis, and oral defense.
            </p>
          </div>

          {/* Steps Timeline Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-8">
            {selectionSteps.map((s, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "bg-[#111318] border-[#E5A93C] shadow-[0_4px_20px_rgba(229, 169, 60,0.35)]"
                      : "bg-[#111318]/50 border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="text-[10px] font-mono text-[#E5A93C] font-bold mb-1">
                    {s.phase}
                  </div>
                  <div className="text-xs font-bold text-white font-sans truncate">
                    {s.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Card */}
          <div className="garcy-glass-card p-6 sm:p-8 border border-[#E5A93C]/50 bg-gradient-to-br from-[#111318] to-[#08090C]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-[10px] font-mono text-[#E5A93C] font-bold uppercase tracking-wider">
                  {currentStep.phase} &bull; {currentStep.subtitle}
                </span>
                <h3 className="text-2xl font-extrabold text-white font-sans mt-1">
                  {currentStep.title}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#08090C] border border-[#E5A93C]/30 text-[10px] font-mono text-[#E5A93C] font-bold">
                {currentStep.tag}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#9E988A] leading-relaxed font-sans mb-6">
              {currentStep.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs font-mono text-[#9E988A]">
              <div>
                <span className="text-white font-bold uppercase block mb-1">Eligibility:</span>
                <span>{currentStep.criteria}</span>
              </div>
              <div>
                <span className="text-[#E5A93C] font-bold uppercase block mb-1">Deliverable:</span>
                <span>{currentStep.deliverable}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Global Footer */}
        <GarcyFooter />

        {/* Command Palette */}
        <GarcyCommandPalette
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
        />

        {/* Case Studies Drawer */}
        <GarcyCaseStudies
          isOpen={caseStudiesOpen}
          onClose={() => setCaseStudiesOpen(false)}
        />
      </main>
    </>
  );
}
