import { useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import BackgroundVideo from "@/components/BackgroundVideo";
import GarcyNavbar from "@/components/garcy/GarcyNavbar";
import GarcyFooter from "@/components/garcy/GarcyFooter";
import GarcyCommandPalette from "@/components/garcy/GarcyCommandPalette";
import GarcyCaseStudies from "@/components/garcy/GarcyCaseStudies";
import Garcy3DZoomGallery from "@/components/garcy/Garcy3DZoomGallery";
import { useDatabase } from "@/hooks/useDatabase";
import {
  FaCalendarAlt,
  FaSearch,
  FaTimes,
  FaFilter,
} from "react-icons/fa";

export default function EventsPage() {
  const { data: eventsData } = useDatabase("events");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
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
      mainImageUrl: "https://res.cloudinary.com/aacgriet/image/upload/v1730537987/AAC-web/news_events/expo2023/wxvfrd1n979puot2zgny.jpg",
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
      mainImageUrl: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100162/AAC-web/news_events/Juniorshackathon2_opwpyj.jpg",
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
      mainImageUrl: "/images/pic.webp",
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
      mainImageUrl: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100167/AAC-web/news_events/nrsc5_e8it62.jpg",
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
      mainImageUrl: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100184/AAC-web/news_events/vishwakarma_zzzwlh.jpg",
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
      mainImageUrl: "/images/AAC2.png",
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
      mainImageUrl: "/images/8.webp",
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
      mainImageUrl: "/images/AAC1.png",
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

  // Extract distinct years dynamically from events
  const availableYears = useMemo(() => {
    const years = new Set();
    displayEvents.forEach((item) => {
      const match = (item.date || "").match(/\b(20\d\d)\b/);
      if (match) years.add(match[1]);
      else if (item.publishedAt) years.add(new Date(item.publishedAt).getFullYear().toString());
      else if (item.actualDate) years.add(new Date(item.actualDate).getFullYear().toString());
    });
    return ["all", ...Array.from(years).sort((a, b) => b.localeCompare(a))];
  }, [displayEvents]);

  const filteredEvents = useMemo(() => {
    return displayEvents.filter((item) => {
      const title = (item.title || item.event || "").toLowerCase();
      const desc = (item.description || item.content || "").toLowerCase();
      const venue = (item.venue || item.location || "").toLowerCase();
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch = !q || title.includes(q) || desc.includes(q) || venue.includes(q);

      const matchesCat = categoryFilter === "all" || item.category === categoryFilter;

      let itemYear = "";
      const match = (item.date || "").match(/\b(20\d\d)\b/);
      if (match) itemYear = match[1];
      else if (item.publishedAt) itemYear = new Date(item.publishedAt).getFullYear().toString();
      else if (item.actualDate) itemYear = new Date(item.actualDate).getFullYear().toString();

      const matchesYear = selectedYear === "all" || itemYear === selectedYear;

      return matchesSearch && matchesCat && matchesYear;
    });
  }, [displayEvents, searchTerm, categoryFilter, selectedYear]);

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

            <p className="text-sm sm:text-base text-[#9E988A] leading-relaxed font-sans font-normal mb-8">
              Flagship competitive programming championships, annual hardware expos, and technical training bootcamps hosted at AAC GRIET.
            </p>

            {/* Interactive Search Bar */}
            <div className="relative max-w-lg mx-auto mb-6">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E988A] text-xs pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search events by title, keyword, or venue..."
                className="w-full pl-10 pr-10 py-3 rounded-2xl bg-[#111318] border border-[#2A261F] text-white placeholder-[#9E988A]/60 text-xs font-sans focus:outline-none focus:border-[#E5A93C] transition-colors shadow-lg"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9E988A] hover:text-white transition-colors p-1"
                  aria-label="Clear search"
                >
                  <FaTimes className="text-xs" />
                </button>
              )}
            </div>

            {/* Filter Rows: Categories & Years */}
            <div className="space-y-3">
              {/* Category Filter Pills */}
              <div className="flex items-center justify-center gap-2 overflow-x-auto scrollbar-none pb-1 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      categoryFilter === cat.id
                        ? "bg-[#E5A93C] text-[#08090C] font-bold shadow-md"
                        : "bg-[#111318] text-[#9E988A] hover:text-white border border-[#2A261F]"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Year-Wise / Date Filter Pills */}
              {availableYears.length > 2 && (
                <div className="flex items-center justify-center gap-1.5 overflow-x-auto scrollbar-none pb-1 flex-wrap font-mono text-[11px]">
                  <span className="text-[#9E988A] text-[10px] uppercase font-bold mr-1 flex items-center gap-1">
                    <FaFilter className="text-[9px] text-[#E5A93C]" />
                    YEAR:
                  </span>
                  {availableYears.map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setSelectedYear(yr)}
                      className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                        selectedYear === yr
                          ? "bg-[#E5A93C]/20 border border-[#E5A93C] text-[#E5A93C] font-bold"
                          : "bg-[#111318] text-[#9E988A] hover:text-white border border-[#2A261F]"
                      }`}
                    >
                      {yr === "all" ? "All Years" : yr}
                    </button>
                  ))}
                </div>
              )}

              {/* Results count indicator */}
              <div className="text-[11px] font-mono text-[#9E988A] pt-1">
                Showing <span className="text-[#E5A93C] font-bold">{filteredEvents.length}</span> of {displayEvents.length} events
              </div>
            </div>
          </div>

          {/* 3D Zoom Fly-Through Gallery */}
          <div className="mb-14">
            <Garcy3DZoomGallery
              items={filteredEvents}
              category="events"
            />
          </div>
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
