import { useState } from "react";
import Link from "next/link";
import { FaArrowLeft, FaExternalLinkAlt, FaTimes, FaAtom, FaRocket, FaLightbulb, FaCheckCircle } from "react-icons/fa";

export default function GarcyCaseStudies({ isOpen, onClose }) {
  const [selectedCase, setSelectedCase] = useState("nav");

  const caseStudies = {
    nav: {
      id: "nav",
      client: "AAC MOBILE & AR RESEARCH LAB",
      field: "Indoor Positioning / Augmented Reality / AI",
      services: "AR Spatial Mapping, Indoor Positioning Engine, Low-Latency Pathfinding, Mobile Client",
      year: "2024–2025",
      title: "Intelligent Campus Navigation System",
      subtitle: "AI-powered indoor positioning and augmented reality orientation across GRIET",
      intro: `The Intelligent Campus Navigation System combines augmented reality, indoor positioning systems, and machine learning to provide a seamless navigation experience within the GRIET campus infrastructure.`,
      headline: "SOLVING INDOOR SPATIAL ORIENTATION WITH EDGE AI AND AR.",
      quote: `Navigating complex collegiate campuses with multi-story laboratory blocks can be daunting for new students, faculty, and visiting dignitaries. 
Our student researchers engineered a localized coordinate mapping algorithm that operates without relying on external GPS signals, achieving sub-meter positioning accuracy.`,
      paragraph: `Led by Abhiram Pedamallu, V. Dinesh Chandra, and Seetaram Koushik, the team mapped campus corridors, seminar halls, and research blocks. 
The system features reactive route recalculation, accessibility-friendly pathways, and AR directional overlays running smoothly on standard student smartphones.`,
      outcome: `The system serves thousands of students across GRIET, eliminating orientation friction during campus symposia like Opulence and receiving top institutional innovation accolades.`,
      stats: [
        { label: "CAMPUS COVERAGE", value: "100% GRIET" },
        { label: "POSITIONING SPEED", value: "< 45 MS" },
        { label: "ACCURACY RANGE", value: "0.8 METERS" },
        { label: "ACTIVE USERS", value: "4,000+" },
      ],
      link: "/projects",
    },
    energy: {
      id: "energy",
      client: "AAC IOT & SMART GRID LAB",
      field: "IoT / Predictive Analytics / Green Tech",
      services: "Distributed Current Sensors, MQTT Telemetry, Predictive Analytics, Load Balancing",
      year: "2023–2025",
      title: "Smart Energy Management System",
      subtitle: "IoT-based campus energy optimization through predictive analytics and smart sensors",
      intro: `The Smart Energy Management System utilizes Internet of Things (IoT) sensors and predictive analytics to monitor, balance, and optimize electrical energy consumption across campus infrastructure.`,
      headline: "MEASURABLE SUSTAINABILITY POWERED BY REAL-TIME SENSOR MESH.",
      quote: `Institutions expend substantial electricity through unoptimized lighting, idle laboratory equipment, and air conditioning over-provisioning. 
By embedding smart telemetry at each electrical junction, AAC researchers provide campus facility managers with real-time actionable energy insights.`,
      paragraph: `Conceived by Abhiram Dodda, Manav, and Srija Cherukuri, the project deploys ESP32 microcontrollers communicating over secure MQTT broker protocols. 
A machine learning predictive model analyzes historical load curves to forecast demand peaks and automate non-critical load shedding.`,
      outcome: `Measured real-world campus power reductions of 18%, significantly lowering carbon footprint and demonstrating the viability of undergraduate green-tech engineering.`,
      stats: [
        { label: "POWER SAVINGS", value: "18% REDUCTION" },
        { label: "SENSOR NODES", value: "80+ DEPLOYED" },
        { label: "SAMPLE INTERVAL", value: "2.0 SEC" },
        { label: "DATA POINTS/DAY", value: "2.4M TELEMETRY" },
      ],
      link: "/projects",
    },
    pill: {
      id: "pill",
      client: "AAC BIOMEDICAL IP INVENTIONS CELL",
      field: "Biomedical Devices / Embedded Healthcare IP",
      services: "Patent Prosecution, Two-Way Verification, Custom Circuitry, Replaceable Layering",
      year: "2019–2024",
      title: "Automated Electronic Pill Reminder Device",
      subtitle: "Indian Patent Application No. 201941002559 — Intelligent Medication Adherence",
      intro: `An automated electronic device for reminding consumption of pills scheduled and even for missed schedules with specified two-way confirmation along with replaceable pill compartments.`,
      headline: "SAVING LIVES THROUGH PATENTED TWO-WAY MEDICATION COMPLIANCE.",
      quote: `Medication non-adherence among elderly patients and those with chronic medical conditions remains a leading cause of preventable health deterioration. 
This patent was engineered from first principles by student inventors at AAC to guarantee verified medication consumption.`,
      paragraph: `Invented by Yelma Chethan Reddy, Alence Abhinay, B.S.V.S Anoop, M Srikanth, D. Naga pavan, and G Pradeep Reddy, the device incorporates customizable replaceable compartments. 
Unlike basic buzzer timers, it requires physical two-way user confirmation and logs compliance history to prevent accidental double-dosing or missed regimens.`,
      outcome: `Officially published by the Indian Patent Office (App No. 201941002559), representing one of the foundational intellectual property milestones of AAC at GRIET.`,
      stats: [
        { label: "PATENT APPLICATION", value: "201941002559" },
        { label: "PATENT OFFICE", value: "INDIA" },
        { label: "STATUS", value: "PUBLISHED" },
        { label: "INVENTORS", value: "6 AAC FELLOWS" },
      ],
      link: "/Patents",
    },
    glove: {
      id: "glove",
      client: "AAC ASSISTIVE WEARABLES LAB",
      field: "Assistive Technology / Wearable Mechatronics",
      services: "Flex Sensing, Microcontroller Firmware, Gesture Translation, Speech Synthesis",
      year: "2020–2024",
      title: "Smart Glove for Sign Language Translation",
      subtitle: "Indian Patent Application No. 202041038106 — Real-Time Assistive Communication",
      intro: `A smart glove for recognizing and communicating sign language and associated method thereof, bridging communication between sign language users and non-users.`,
      headline: "EMPOWERING SILENT VOICES THROUGH SENSOR-FUSED TRANSLATION.",
      quote: `Bridging the communication barrier between speech-impaired individuals and society requires wearable technology that is lightweight, accurate, and completely unobtrusive.`,
      paragraph: `Invented by Jashwanth Kranthi Bopanna, Santosh Sanjeev, Bharath Varma Kantheti, Gowtham Sai Ponnekanti, Suhas Gangireddy, and G Pradeep Reddy. 
The glove uses integrated flex and orientation sensors to accurately capture finger articulations, translating gestures into synthesized audio and real-time screen text.`,
      outcome: `Granted publication by the Indian Patent Office (App No. 202041038106), demonstrating AAC's commitment to creating technology with tangible humanitarian benefits.`,
      stats: [
        { label: "PATENT APPLICATION", value: "202041038106" },
        { label: "GESTURE ACCURACY", value: "98.2%" },
        { label: "TRANSLATION DELAY", value: "< 25 MS" },
        { label: "PATENT OFFICE", value: "INDIA" },
      ],
      link: "/Patents",
    },
    uav: {
      id: "uav",
      client: "AAC MOBILE & AR RESEARCH LAB",
      field: "Indoor Positioning / Augmented Reality / AI",
      services: "AR Spatial Mapping, Indoor Positioning Engine, Low-Latency Pathfinding, Mobile Client",
      year: "2024–2025",
      title: "Intelligent Campus Navigation System",
      subtitle: "AI-powered indoor positioning and augmented reality orientation across GRIET",
      intro: `The Intelligent Campus Navigation System combines augmented reality, indoor positioning systems, and machine learning to provide a seamless navigation experience within the GRIET campus infrastructure.`,
      headline: "SOLVING INDOOR SPATIAL ORIENTATION WITH EDGE AI AND AR.",
      quote: `Navigating complex collegiate campuses with multi-story laboratory blocks can be daunting for new students, faculty, and visiting dignitaries.`,
      paragraph: `Led by Abhiram Pedamallu, V. Dinesh Chandra, and Seetaram Koushik, the team mapped campus corridors, seminar halls, and research blocks.`,
      outcome: `The system serves thousands of students across GRIET, eliminating orientation friction during campus symposia like Opulence.`,
      stats: [
        { label: "CAMPUS COVERAGE", value: "100% GRIET" },
        { label: "POSITIONING SPEED", value: "< 45 MS" },
        { label: "ACCURACY RANGE", value: "0.8 METERS" },
        { label: "ACTIVE USERS", value: "4,000+" },
      ],
      link: "/projects",
    },
    gprime: {
      id: "gprime",
      client: "GPRIME STEERING COMMITTEE",
      field: "Competitive Programming / Algorithms",
      services: "Distributed Judge System, Cryptographic Verification, Live Telemetry, Problem Architecture",
      year: "2024–2026",
      title: "Gprime Competitive Algorithmic Championship",
      subtitle: "The premier competitive programming and algorithmic showdown at GRIET",
      intro: `Gprime brought together over 42 teams of competitive coders to solve rigorous challenges in graph theory, dynamic programming, and systems engineering.`,
      headline: "WHERE SPEED, RECURSION, AND PRECISION CONVERGE.",
      quote: `Competitive programming is the purest testing ground for computational thinking.`,
      paragraph: `Features multi-stage cascade problem sets and rapidfire algorithmic sprints evaluating multi-language test suites with sub-second response times.`,
      outcome: `Winners received institutional recognition and exclusive entry into AAC's specialized research cohorts.`,
      stats: [
        { label: "TEAMS COMPETING", value: "42+ TEAMS" },
        { label: "EVALUATION SPEED", value: "< 80 MS" },
        { label: "PROBLEM TRACKS", value: "RAPID & CASCADE" },
        { label: "TELEMETRY", value: "REAL-TIME" },
      ],
      link: "/gprime2026-results",
    },
    patents: {
      id: "patents",
      client: "AAC BIOMEDICAL IP INVENTIONS CELL",
      field: "Biomedical Devices / Embedded Healthcare IP",
      services: "Patent Prosecution, Two-Way Verification, Custom Circuitry, Replaceable Layering",
      year: "2019–2024",
      title: "Automated Electronic Pill Reminder Device",
      subtitle: "Indian Patent Application No. 201941002559 — Intelligent Medication Adherence",
      intro: `An automated electronic device for reminding consumption of pills scheduled and even for missed schedules with specified two-way confirmation along with replaceable pill compartments.`,
      headline: "SAVING LIVES THROUGH PATENTED TWO-WAY MEDICATION COMPLIANCE.",
      quote: `Medication non-adherence among elderly patients and those with chronic medical conditions remains a leading cause of preventable health deterioration.`,
      paragraph: `Invented by Yelma Chethan Reddy, Alence Abhinay, B.S.V.S Anoop, M Srikanth, D. Naga pavan, and G Pradeep Reddy.`,
      outcome: `Officially published by the Indian Patent Office (App No. 201941002559).`,
      stats: [
        { label: "PATENT APPLICATION", value: "201941002559" },
        { label: "PATENT OFFICE", value: "INDIA" },
        { label: "STATUS", value: "PUBLISHED" },
        { label: "INVENTORS", value: "6 AAC FELLOWS" },
      ],
      link: "/Patents",
    },
    startups: {
      id: "startups",
      client: "AAC ASSISTIVE WEARABLES LAB",
      field: "Assistive Technology / Wearable Mechatronics",
      services: "Flex Sensing, Microcontroller Firmware, Gesture Translation, Speech Synthesis",
      year: "2020–2024",
      title: "Smart Glove for Sign Language Translation",
      subtitle: "Indian Patent Application No. 202041038106 — Real-Time Assistive Communication",
      intro: `A smart glove for recognizing and communicating sign language and associated method thereof, bridging communication between sign language users and non-users.`,
      headline: "EMPOWERING SILENT VOICES THROUGH SENSOR-FUSED TRANSLATION.",
      quote: `Bridging the communication barrier between speech-impaired individuals and society requires wearable technology that is lightweight, accurate, and completely unobtrusive.`,
      paragraph: `Invented by Jashwanth Kranthi Bopanna, Santosh Sanjeev, Bharath Varma Kantheti, Gowtham Sai Ponnekanti, Suhas Gangireddy, and G Pradeep Reddy.`,
      outcome: `Granted publication by the Indian Patent Office (App No. 202041038106).`,
      stats: [
        { label: "PATENT APPLICATION", value: "202041038106" },
        { label: "GESTURE ACCURACY", value: "98.2%" },
        { label: "TRANSLATION DELAY", value: "< 25 MS" },
        { label: "PATENT OFFICE", value: "INDIA" },
      ],
      link: "/Patents",
    },
  };

  const active = caseStudies[selectedCase] || caseStudies.uav;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-2xl overflow-y-auto p-2 sm:p-6 transition-all duration-300">
      <div className="max-w-6xl mx-auto case-studies text-left shadow-2xl relative">
        
        {/* Top Control Bar */}
        <div className="sticky top-0 z-30 bg-[#0d0d0d] px-6 py-4 flex items-center justify-between border-b border-white/10 text-white">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f3ff47]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#aaa]">
              AAC Research Case Study &bull; {active.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Case Switcher Tabs */}
            <div className="hidden md:flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-white/10">
              {[
                { id: "nav", label: "01 // Campus Nav" },
                { id: "energy", label: "02 // Smart Energy" },
                { id: "pill", label: "03 // Pill Reminder IP" },
                { id: "glove", label: "04 // Smart Glove IP" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedCase(item.id)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-colors ${
                    selectedCase === item.id ? "bg-[#1769FF] text-white font-bold" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono uppercase tracking-wider text-white flex items-center gap-1.5 transition-colors"
            >
              <FaTimes className="text-[10px]" />
              <span>Close (ESC)</span>
            </button>
          </div>
        </div>

        {/* garcy.studio .case-hero layout */}
        <div className="case-hero">
          <figure className="case-cover p-8 flex flex-col justify-between">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#f3ff47] bg-black/70 px-3 py-1 rounded-full w-fit border border-white/10">
              // FLAGSHIP CASE STUDY
            </div>

            <div>
              <div className="text-4xl sm:text-6xl font-extrabold text-white tracking-tighter uppercase font-sans mb-2">
                {active.title}
              </div>
              <p className="text-sm font-mono text-gray-400 uppercase tracking-wider">
                {active.subtitle}
              </p>
            </div>
          </figure>

          <section className="case-description">
            <p className="case-intro">{active.intro}</p>

            <dl className="case-meta">
              <dt>Client</dt>
              <dd>{active.client}</dd>
              <dt>Field</dt>
              <dd>{active.field}</dd>
              <dt>Services</dt>
              <dd>{active.services}</dd>
              <dt>Year</dt>
              <dd>{active.year}</dd>
            </dl>

            <h1>
              {active.title}
              <span>{active.subtitle}</span>
            </h1>
          </section>

          <div className="case-logo">
            <span>AAC // GRIET</span>
          </div>
        </div>

        {/* garcy.studio .case-row with .case-panel quote block */}
        <div className="case-row">
          <div className="case-panel">
            <p>{active.quote}</p>
            <h2>{active.headline}</h2>
          </div>

          <div className="bg-[#141414] p-8 rounded-xl flex flex-col justify-between border border-white/5">
            <div className="text-xs font-mono uppercase tracking-widest text-[#f3ff47] mb-6">
              // TELEMETRY &amp; OUTCOMES
            </div>

            <div className="grid grid-cols-2 gap-4">
              {active.stats.map((s) => (
                <div key={s.label} className="p-4 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mb-1">
                    {s.value}
                  </div>
                  <div className="text-[9.5px] font-mono text-gray-400 uppercase tracking-wider">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
              <span>STATUS: PRODUCTION VERIFIED</span>
              <span className="text-[#f3ff47]">&bull; LIVE</span>
            </div>
          </div>
        </div>

        {/* garcy.studio .case-paragraph statement block */}
        <section className="case-paragraph">
          <p>{active.paragraph}</p>
          <p className="mt-6 text-base text-gray-600 leading-relaxed font-sans font-normal">
            {active.outcome}
          </p>
        </section>

        {/* Footer Return Link */}
        <div className="p-8 bg-[#0a0a0a] flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 text-white">
          <Link
            href={active.link}
            onClick={onClose}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#f3ff47] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-lg"
          >
            <span>Explore Full {active.title} Module</span>
            <FaExternalLinkAlt className="text-[10px]" />
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="text-xs font-mono text-gray-400 hover:text-white uppercase tracking-wider"
          >
            &larr; Return to Studio Experience
          </button>
        </div>
      </div>
    </div>
  );
}

