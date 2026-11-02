import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import BackgroundVideo from "@/components/BackgroundVideo";
import GarcyNavbar from "@/components/garcy/GarcyNavbar";
import GarcyFooter from "@/components/garcy/GarcyFooter";
import GarcyCommandPalette from "@/components/garcy/GarcyCommandPalette";
import GarcyCaseStudies from "@/components/garcy/GarcyCaseStudies";
import { useDatabase } from "@/hooks/useDatabase";
import {
  FaCalendarAlt,
  FaSearch,
  FaMapMarkerAlt,
  FaRocket,
  FaArrowRight,
  FaExternalLinkAlt,
  FaUsers,
} from "react-icons/fa";

export default function EventsPage() {
  const { data: eventsData } = useDatabase("events");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);

  const defaultEvents = [
    {
      id: "opulence",
      title: "Opulence — Flagship Technical Symposium",
      date: "JUNE 2024",
      category: "symposium",
      status: "ANNUAL FLAGSHIP",
      badgeColor: "#E5A93C",
      description: "AAC's flagship symposium with 400+ participants and distinguished speakers: Pranali Bose (ML Engineer), Raunak Bagga (Koolgen CEO), Srikanth Reddy (Great Honey Co). Included Ideathon (21 teams), G-Prime (42 teams), and LLM workshops.",
      path: "/Events/Opulence2023",
      venue: "GRIET Campus, Hyderabad",
      participants: "400+ Students & 5 Faculty",
    },
    {
      id: "gprime",
      title: "G-Prime Competitive Coding Contest",
      date: "ANNUAL EDITION",
      category: "hackathon",
      status: "RESULTS LIVE",
      badgeColor: "#E5A93C",
      description: "Premier competitive programming contest featuring Rapidfire speed testing, Cascade problem sets, and Data Structures challenges with sub-second judging.",
      path: "/gprime2026-results",
      venue: "AAC Labs & Distributed Engine",
      participants: "42+ Teams",
    },
    {
      id: "expo2023",
      title: "AAC Expo 2023 — Technology Exhibition",
      date: "DECEMBER 2023",
      category: "symposium",
      status: "COMPLETED",
      badgeColor: "#E5A93C",
      description: "Annual project expo showcasing revolutionary student prototypes in IoT, deep learning, biomedical sensing, and autonomous hardware.",
      path: "/Events/Expo2023",
      venue: "GRIET Campus, Hyderabad",
      participants: "Institute-Wide Cohort",
    },
    {
      id: "conclave",
      title: "Data Analytics Conclave",
      date: "GUEST KEYNOTE",
      category: "symposium",
      status: "KEYNOTE SESSIONS",
      badgeColor: "#E5A93C",
      description: "Impactful data science platform led by Mr. Satish Yellanki (20+ years IT exposure, Oracle database optimization and business intelligence expert).",
      path: "/Events/Conclave",
      venue: "GRIET Campus, Hyderabad",
      participants: "250+ Engineers",
    },
    {
      id: "awards",
      title: "AAC Awards Ceremony & Project Road Show",
      date: "ANNUAL AWARDS",
      category: "hackathon",
      status: "PROJECT CERTIFICATION",
      badgeColor: "#E5A93C",
      description: "First-ever road show of completed student projects inaugurated by Chief Guest A.V.V. Prasad (NRSC), Guest of Honor M.G. Sekharam, and Dean Dr. Ramamurthy Suri.",
      path: "/Events/Awards",
      venue: "GRIET Campus Auditorium",
      participants: "All Project Teams",
    },
    {
      id: "cyber-security",
      title: "Cyber Security Seminar & Workshop",
      date: "WORKSHOP",
      category: "symposium",
      status: "EDUCATIONAL",
      badgeColor: "#E5A93C",
      description: "Cyber security symposium covering enterprise attack vectors, vulnerability scanning, and secure firmware development with guest expert Mr. M. Prasanna.",
      path: "/Events/CyberSecuritySeminar",
      venue: "GRIET Campus, Hyderabad",
      participants: "200+ Students",
    },
    {
      id: "labstart",
      title: "AAC Research Lab Inauguration",
      date: "FACILITY LAUNCH",
      category: "bootcamp",
      status: "ACTIVE 24/7 LAB",
      badgeColor: "#E5A93C",
      description: "Official opening of AAC's dedicated laboratory space in Block 3, Room 3614, boosted by Dr. M.G. Sekharam, Dr. J. Praveen, and Dr. S. Ramamurthy.",
      path: "/Events/Labstart",
      venue: "Block 3, Room 3614, GRIET",
      participants: "Faculty & Fellows",
    },
    {
      id: "expo2022",
      title: "AAC Expo 2022 — Annual Showcase",
      date: "DECEMBER 2022",
      category: "symposium",
      status: "COMPLETED",
      badgeColor: "#E5A93C",
      description: "Exposition of undergraduate technical projects, hardware models, and research prototypes developed under faculty guidance.",
      path: "/Events/Expo2022",
      venue: "GRIET Campus, Hyderabad",
      participants: "AAC Members & Mentors",
    },
  ];

  const displayEvents = eventsData && eventsData.length > 0 ? eventsData : defaultEvents;

  const categories = [
    { id: "all", label: "All Events" },
    { id: "hackathon", label: "Hackathons" },
    { id: "symposium", label: "Symposiums" },
    { id: "bootcamp", label: "Bootcamps" },
  ];

  const filteredEvents = displayEvents.filter((item) => {
    const title = item.title || item.event || "";
    const desc = item.description || "";
    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat =
      categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <>
      <Head>
        <title>EVENTS &amp; CONCLAVES // AAC GRIET</title>
        <meta
          name="description"
          content="Explore hackathons, technical symposiums, and project expos organized by AAC GRIET"
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
        <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[10.5px] font-semibold tracking-wide uppercase mb-4 border backdrop-blur-md bg-[#E5A93C]/15 border-[#E5A93C]/40 text-[#E5A93C]">
              <FaCalendarAlt className="text-[10px]" />
              <span>Events &bull; Conclaves &bull; Hackathons</span>
            </div>

            <h1 className="font-extrabold text-4xl sm:text-6xl tracking-tighter leading-tight mb-4 text-[#EAF1FF] uppercase font-sans">
              Events &amp; Technical <br />
              <span className="italic font-serif font-normal text-[#E5A93C] lowercase tracking-normal text-3xl sm:text-5xl">
                gathering
              </span>{" "}
              Chronicle.
            </h1>

            <p className="text-sm sm:text-base text-[#9E988A] leading-relaxed font-sans font-normal">
              Flagship competitive programming championships, annual hardware expos, and technical training bootcamps hosted at AAC GRIET.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="garcy-glass-card p-4 sm:p-5 border border-white/15 mb-12 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-4">

              {/* Search Input */}
              <div className="flex-1 w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#08090C]/80 border border-white/10">
                <FaSearch className="text-[#9E988A] text-xs flex-shrink-0" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search events by name, venue, or keyword..."
                  className="w-full bg-transparent border-0 text-white placeholder-[#9E988A]/60 focus:outline-none text-xs font-mono"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="text-[10px] font-mono text-[#9E988A] hover:text-white uppercase"
                  >
                    CLEAR
                  </button>
                )}
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all flex-shrink-0 ${categoryFilter === cat.id
                        ? "bg-[#E5A93C] text-white font-bold shadow-md"
                        : "bg-[#111318] text-[#9E988A] hover:text-white border border-white/10"
                      }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((item, idx) => (
              <div
                key={item.id || idx}
                className="garcy-glass-card p-6 flex flex-col justify-between hover:border-[#E5A93C]/70 transition-all duration-300 group hover:-translate-y-1 border border-white/15 shadow-xl bg-gradient-to-br from-[#111318] to-[#08090C]"
              >
                <div>
                  {/* Top Bar: Date & Status Badge */}
                  <div className="flex items-center justify-between text-xs font-mono uppercase text-[#9E988A] mb-4">
                    <span className="flex items-center gap-1.5 text-[#EAF1FF] font-bold">
                      <FaCalendarAlt className="text-[#E5A93C] text-[10px]" />
                      <span>{item.date}</span>
                    </span>
                    <span
                      className="px-2.5 py-0.5 rounded-full bg-[#08090C] text-[8.5px] font-bold border"
                      style={{
                        color: item.badgeColor || "#E5A93C",
                        borderColor: `${item.badgeColor || "#E5A93C"}55`,
                      }}
                    >
                      {item.status || "EVENT"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#EAF1FF] mb-2.5 font-sans group-hover:text-[#E5A93C] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Metadata: Venue & Participants */}
                  <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-[#9E988A] mb-4">
                    {item.venue && (
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-[#E5A93C]" />
                        <span className="truncate max-w-[140px]">{item.venue}</span>
                      </span>
                    )}
                    {item.participants && (
                      <span className="flex items-center gap-1">
                        <FaUsers className="text-[#E5A93C]" />
                        <span>{item.participants}</span>
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#9E988A] leading-relaxed font-sans font-normal mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action Link */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href={item.path || "/Events"}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#E5A93C] hover:text-white transition-colors"
                  >
                    <span>Inspect Event</span>
                    <FaArrowRight className="text-[9px]" />
                  </Link>

                  <span className="text-[9px] font-mono text-[#9E988A] uppercase">
                    AAC // 0{idx + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-20 text-[#9E988A] font-mono text-xs">
              No matching events found for query &ldquo;{searchTerm}&rdquo;
            </div>
          )}
        </section>

        {/* Footer */}
        <GarcyFooter />

        {/* Command Palette (⌘K) */}
        <GarcyCommandPalette
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
        />

        {/* Case Study Drawer */}
        <GarcyCaseStudies
          isOpen={caseStudiesOpen}
          onClose={() => setCaseStudiesOpen(false)}
        />
      </main>
    </>
  );
}
