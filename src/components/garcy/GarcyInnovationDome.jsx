import { useState } from "react";
import Link from "next/link";
import { FaGraduationCap, FaRocket, FaArrowRight, FaLayerGroup } from "react-icons/fa";

export default function GarcyInnovationDome({ onSelectCase }) {
  const [activeTab, setActiveTab] = useState("on-campus");

  const onCampusItems = [
    {
      title: "Gprime 2026 Hackathon & Contest",
      category: "EVENTS & COMPETITIONS",
      link: "/gprime2026-results",
      date: "RESULTS LIVE",
      desc: "Premier competitive programming and hackathon event by AAC GRIET. View scores, solutions, and leaderboards.",
      tag: "Flagship Event",
      caseId: "gprime",
    },
    {
      title: "Opulence & Annual Expo Showcase",
      category: "ANNUAL EXPO",
      link: "/Events",
      date: "EXHIBITION",
      desc: "Exhibiting cutting-edge engineering prototypes, autonomous models, and research posters.",
      tag: "Annual Expo",
      caseId: "uav",
    },
    {
      title: "Faculty Mentorship & Core Leadership",
      category: "LEADERSHIP",
      link: "/Administration",
      date: "INTERDISCIPLINARY",
      desc: "Expert guidance from institute faculty advisors, industry partners, and student committee heads.",
      tag: "AAC Leadership",
      caseId: "patents",
    },
  ];

  const innovationItems = [
    {
      title: "Autonomous Aircraft & Drone Systems",
      category: "R&D PROJECTS",
      link: "/projects",
      date: "PATENT PENDING",
      desc: "Custom multi-rotor & fixed-wing autonomous aerial vehicles built for surveillance and payload delivery.",
      tag: "Autonomous Lab",
      caseId: "uav",
    },
    {
      title: "Patents & Intellectual Property",
      category: "INVENTIONS",
      link: "/Patents",
      date: "50+ FILED",
      desc: "Innovations in IoT, machine learning, embedded sensors, and advanced manufacturing.",
      tag: "IP Creation",
      caseId: "patents",
    },
    {
      title: "Student Startups & Incubated Ventures",
      category: "INCUBATION",
      link: "/Startups",
      date: "15+ INCUBATED",
      desc: "Empowering student-led technology startups with funding, mentorship, and commercialization guidance.",
      tag: "Incubation Cell",
      caseId: "startups",
    },
  ];

  const displayItems = activeTab === "on-campus" ? onCampusItems : innovationItems;

  return (
    <section id="innovation" className="relative py-28 px-4 sm:px-6 max-w-7xl mx-auto border-b border-white/10">
      
      {/* Header and Tab Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[10.5px] font-semibold tracking-wide uppercase mb-3 border backdrop-blur-md bg-[#1769FF]/15 border-[#1769FF]/40 text-[#49A3FF]">
            {activeTab === "on-campus" ? <FaGraduationCap className="text-[10px]" /> : <FaRocket className="text-[10px]" />}
            <span>05 // Campus Life &amp; Innovation Dome</span>
          </div>

          <h2 className="font-extrabold text-3xl sm:text-5xl tracking-tighter text-[#EAF1FF] mb-2 uppercase font-sans">
            On Campus <br />
            <span className="italic font-serif font-normal text-[#49A3FF] lowercase tracking-normal text-3xl sm:text-5xl">
              versus
            </span>{" "}
            Innovation.
          </h2>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 garcy-glass-header p-1.5 mt-6 md:mt-0 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("on-campus")}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === "on-campus"
                ? "bg-[#1769FF] text-white font-bold shadow-[0_4px_20px_rgba(23,105,255,0.4)]"
                : "text-[#8793A8] hover:text-white hover:bg-white/10"
            }`}
          >
            <FaGraduationCap />
            <span>On Campus (Events &amp; Culture)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("innovation")}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === "innovation"
                ? "bg-[#1769FF] text-white font-bold shadow-[0_4px_20px_rgba(23,105,255,0.4)]"
                : "text-[#8793A8] hover:text-white hover:bg-white/10"
            }`}
          >
            <FaRocket />
            <span>Innovation (R&amp;D &amp; Patents)</span>
          </button>
        </div>
      </div>

      {/* Grid of 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayItems.map((item) => (
          <div
            key={item.title}
            className="group garcy-glass-card p-6 sm:p-7 flex flex-col justify-between hover:border-[#1769FF]/60 transition-all duration-300 hover:-translate-y-1 border border-white/15"
          >
            <div>
              {/* Category & Badge */}
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider mb-4">
                <span className="text-[#8793A8] font-bold">{item.category}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#080B12] text-[#49A3FF] border border-[#1769FF]/30 font-bold">
                  {item.tag}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#EAF1FF] mb-2 group-hover:text-[#49A3FF] transition-colors leading-snug font-sans">
                {item.title}
              </h3>

              {/* Date / Status Tag */}
              <div className="text-[10px] font-mono text-[#49A3FF] uppercase tracking-wide mb-3">
                STATUS: {item.date}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#8793A8] leading-relaxed font-sans font-normal">
                {item.desc}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#8793A8]">
              <Link
                href={item.link}
                className="hover:text-[#49A3FF] transition-colors flex items-center gap-1 uppercase"
              >
                <span>OPEN DIRECTORY</span>
                <FaArrowRight className="text-[9px]" />
              </Link>

              {onSelectCase && (
                <button
                  type="button"
                  onClick={() => onSelectCase(item.caseId)}
                  className="px-2.5 py-1 rounded-lg bg-[#1769FF]/20 hover:bg-[#1769FF] hover:text-white text-[10px] uppercase font-bold transition-all text-[#49A3FF] flex items-center gap-1"
                >
                  <FaLayerGroup className="text-[9px]" />
                  <span>CASE STUDY &rarr;</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
