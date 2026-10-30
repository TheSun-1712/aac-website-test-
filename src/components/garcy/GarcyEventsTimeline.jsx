import { useState } from "react";
import Link from "next/link";
import {
  FaRocket,
  FaCalendarAlt,
  FaAward,
  FaArrowRight,
  FaExternalLinkAlt,
  FaMapMarkerAlt,
  FaUsers,
} from "react-icons/fa";

export default function GarcyEventsTimeline() {
  const [activeTab, setActiveTab] = useState("all");

  const timelineEvents = [
    {
      id: "opulence",
      title: "Opulence 2024 / 2023 — Flagship Technical Symposium",
      category: "SYMPOSIUM",
      date: "JUNE 2024",
      status: "ANNUAL FLAGSHIP",
      venue: "GRIET Campus, Hyderabad",
      participants: "400+ Students & 5 Faculty",
      desc: "Distinguished speakers Pranali Bose (ML Engineer), Raunak Bagga (CEO Koolgen Interactives), and Srikanth Reddy Tenneti (Founder The Great Honey Co). Included Ideathon (21 teams), G-Prime (42 teams), and LLM workshops.",
      badgeColor: "#1769FF",
      link: "/Events/Opulence2023",
      actionText: "Read Symposium Report",
      track: "expos",
    },
    {
      id: "gprime",
      title: "G-Prime Competitive Algorithmic Championship",
      category: "CONTEST",
      date: "ANNUAL EDITION",
      status: "RESULTS LIVE",
      venue: "AAC Innovation Core & Labs",
      participants: "42+ Registered Teams",
      desc: "Premier multi-round competitive programming contest featuring Rapidfire speed testing, Cascade problem sets, and Data Structures & Algorithms challenges.",
      badgeColor: "#49A3FF",
      link: "/gprime2026-results",
      actionText: "View Live Results",
      track: "competitions",
    },
    {
      id: "expo2023",
      title: "AAC Expo 2023 — Technology Exhibition",
      category: "EXPO",
      date: "DECEMBER 2023",
      status: "COMPLETED",
      venue: "GRIET Campus, Hyderabad",
      participants: "Entire Institute Cohort",
      desc: "Showcase of revolutionary student-built inventions and prototypes across IoT, deep learning, biomedical sensing, and autonomous hardware.",
      badgeColor: "#1769FF",
      link: "/Events/Expo2023",
      actionText: "View 2023 Expo",
      track: "expos",
    },
    {
      id: "conclave",
      title: "Data Analytics Conclave",
      category: "CONCLAVE",
      date: "GUEST KEYNOTE",
      status: "KEYNOTE SESSIONS",
      venue: "GRIET Campus, Hyderabad",
      participants: "250+ Engineers",
      desc: "Impactful data science platform led by Mr. Satish Yellanki (20+ years IT exposure, Oracle database optimization and business intelligence specialist).",
      badgeColor: "#49A3FF",
      link: "/Events/Conclave",
      actionText: "Read Keynote Archive",
      track: "expos",
    },
    {
      id: "awards",
      title: "AAC Awards Ceremony & Project Road Show",
      category: "CEREMONY",
      date: "ANNUAL AWARDS",
      status: "PROJECT CERTIFICATION",
      venue: "GRIET Campus Auditorium",
      participants: "All Project Teams",
      desc: "First-ever road show of completed student projects inaugurated by Chief Guest A.V.V. Prasad (NRSC), Guest of Honor M.G. Sekharam, and Dean Dr. Ramamurthy Suri.",
      badgeColor: "#1769FF",
      link: "/Events/Awards",
      actionText: "Ceremony Dossier",
      track: "competitions",
    },
    {
      id: "labstart",
      title: "AAC Research Lab Inauguration",
      category: "MILESTONE",
      date: "FACILITY LAUNCH",
      status: "ACTIVE 24/7 LAB",
      venue: "Room 3614, Block 3, GRIET",
      participants: "Faculty & Fellows",
      desc: "Official opening of AAC's dedicated laboratory space for conclaves and research-level projects, boosted by Dr. M.G. Sekharam, Dr. J. Praveen, and Dr. S. Ramamurthy.",
      badgeColor: "#49A3FF",
      link: "/Events/Labstart",
      actionText: "Lab Facility History",
      track: "expos",
    },
  ];

  const filteredEvents =
    activeTab === "all"
      ? timelineEvents
      : timelineEvents.filter((e) => e.track === activeTab);

  return (
    <section id="events" className="relative py-28 px-4 sm:px-6 max-w-7xl mx-auto border-b border-white/10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[10.5px] font-semibold tracking-wide uppercase mb-3 border backdrop-blur-md bg-[#1769FF]/15 border-[#1769FF]/40 text-[#49A3FF]">
            <span>06 // Events &amp; Competition Timeline</span>
          </div>

          <h2 className="font-extrabold text-3xl sm:text-5xl tracking-tighter text-[#EAF1FF] mb-2 uppercase font-sans">
            Where the community <br />
            <span className="italic font-serif font-normal text-[#49A3FF] lowercase tracking-normal text-3xl sm:text-5xl">
              comes together.
            </span>
          </h2>
        </div>

        {/* Track Filter Tabs */}
        <div className="flex items-center gap-2 garcy-glass-header p-1.5 mt-6 md:mt-0">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
              activeTab === "all"
                ? "bg-[#1769FF] text-white font-bold"
                : "text-[#8793A8] hover:text-white"
            }`}
          >
            All Tracks
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("competitions")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
              activeTab === "competitions"
                ? "bg-[#1769FF] text-white font-bold"
                : "text-[#8793A8] hover:text-white"
            }`}
          >
            Competitions
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("expos")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
              activeTab === "expos"
                ? "bg-[#1769FF] text-white font-bold"
                : "text-[#8793A8] hover:text-white"
            }`}
          >
            Expos &amp; Conclaves
          </button>
        </div>
      </div>

      {/* Illuminating Timeline Vertical Track */}
      <div className="relative">
        {/* Central Electric Blue Circuit Spine */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#1769FF] via-[#49A3FF]/40 to-transparent" />

        <div className="space-y-8 relative">
          {filteredEvents.map((ev, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={ev.id}
                className={`flex flex-col md:flex-row items-center gap-6 ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content Card (Half width on desktop) */}
                <div className="w-full md:w-[calc(50%-32px)]">
                  <div className="garcy-glass-card p-6 sm:p-7 border border-white/15 hover:border-[#1769FF]/60 transition-all duration-300 group hover:-translate-y-1">
                    {/* Header: Date + Status */}
                    <div className="flex items-center justify-between text-xs font-mono uppercase text-[#8793A8] mb-4">
                      <span className="flex items-center gap-1.5 text-[#EAF1FF] font-bold">
                        <FaCalendarAlt className="text-[#49A3FF] text-[10px]" />
                        <span>{ev.date}</span>
                      </span>
                      <span
                        className="px-2.5 py-0.5 rounded-full bg-[#080B12] text-[9px] font-bold border"
                        style={{ color: ev.badgeColor, borderColor: `${ev.badgeColor}55` }}
                      >
                        {ev.status}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-[#EAF1FF] mb-2 font-sans group-hover:text-[#49A3FF] transition-colors leading-snug">
                      {ev.title}
                    </h3>

                    {/* Metadata Pills */}
                    <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-[#8793A8] mb-4">
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-[#49A3FF]" />
                        <span>{ev.venue}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <FaUsers className="text-[#49A3FF]" />
                        <span>{ev.participants}</span>
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#8793A8] leading-relaxed mb-6 font-sans font-normal">
                      {ev.desc}
                    </p>

                    {/* Action Link */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <Link
                        href={ev.link}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#49A3FF] hover:text-white transition-colors"
                      >
                        <span>{ev.actionText}</span>
                        <FaArrowRight className="text-[9px]" />
                      </Link>

                      <span className="text-[9px] font-mono text-[#8793A8] uppercase">
                        NODE 0{index + 1}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Central Pulse Node */}
                <div className="hidden md:flex w-16 items-center justify-center relative z-10 flex-shrink-0">
                  <div className="w-5 h-5 rounded-full bg-[#080B12] border-2 border-[#1769FF] flex items-center justify-center shadow-[0_0_14px_rgba(23,105,255,0.8)]">
                    <div className="w-2 h-2 rounded-full bg-[#49A3FF] animate-ping" />
                  </div>
                </div>

                {/* Empty opposite spacer on desktop */}
                <div className="hidden md:block w-[calc(50%-32px)]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

