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
  FaTrophy,
  FaSearch,
  FaTimes,
  FaFilter,
  FaCalendarAlt,
} from "react-icons/fa";

export default function AchievementsPage() {
  const { data: dbAchievements } = useDatabase("achievements");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);

  const defaultAchievements = [
    {
      id: "vishwakarma-award",
      title: "AICTE Vishwakarma Award 2018",
      category: "National Honor",
      type: "award",
      date: "2018",
      tag: "GOVT OF INDIA",
      image: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100184/AAC-web/news_events/vishwakarma_zzzwlh.jpg",
      registry: "All India Council for Technical Education (AICTE)",
      desc: "Prestigious national recognition honoring AAC student engineering innovation, practical problem-solving ethics, and community-driven technology solutions.",
    },
    {
      id: "nrsc-mou",
      title: "Signing of Official R&D MOU with NRSC (ISRO)",
      category: "Strategic Alliance",
      type: "mou",
      date: "MOU Signed",
      tag: "SPACE & SENSING",
      image: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100167/AAC-web/news_events/nrsc5_e8it62.jpg",
      registry: "National Remote Sensing Centre (NRSC) / ISRO",
      desc: "Institutional memorandum of understanding signed between GRIET AAC and NRSC, fostering collaborative student research, remote sensing data analytics, and aerospace workshops.",
    },
    {
      id: "hackathons-champions",
      title: "Several Hackathons Champions & Road Show",
      category: "Competitive Rigs",
      type: "hackathon",
      date: "Continuous",
      tag: "MULTIPLE PODIUMS",
      image: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100162/AAC-web/news_events/Juniorshackathon2_opwpyj.jpg",
      registry: "National & Regional Competitions",
      desc: "AAC contingent teams consistently claim 1st place victories across national hackathons, culminating in the annual AAC Road Show witnessed by NRSC senior scientists.",
    },
    {
      id: "patent-pill-reminder",
      title: "Automated Electronic Pill Reminder Device (Patent 201941002559)",
      category: "Intellectual Property",
      type: "patent",
      date: "Published 2019",
      tag: "INDIAN PATENT",
      registry: "Indian Patent Office",
      image: "/images/AAC1.png",
      desc: "Official patent publication for a medication reminder device with two-way confirmation and customizable replaceable compartments. Invented by 6 AAC fellows.",
      link: "/Patents",
    },
    {
      id: "patent-smart-glove",
      title: "Smart Glove for Sign Language Translation (Patent 202041038106)",
      category: "Intellectual Property",
      type: "patent",
      date: "Published 2020",
      tag: "INDIAN PATENT",
      registry: "Indian Patent Office",
      image: "/images/AAC3.png",
      desc: "Official patent publication for a wearable flex sensor glove translating sign language gestures into instant synthesized speech and text in real-time.",
      link: "/Patents",
    },
    {
      id: "pub-wine-quality",
      title: "Peer-Reviewed Scopus Publication in IJERT Journal",
      category: "Research Scholarship",
      type: "publication",
      date: "August 2024",
      tag: "SCOPUS / IJERT",
      registry: "IJERT (ISSN: 2278-0181, Vol. 13)",
      image: "/images/AAC2.png",
      desc: "Scholarly research paper on ensemble-based machine learning for predictive quality classification authored by Dodda Abhiram and fellow AAC researchers.",
      link: "/Publications",
    },
  ];

  const displayAchievements =
    dbAchievements && dbAchievements.length > 0 ? dbAchievements : defaultAchievements;

  const filters = [
    { id: "all", label: "All Milestones" },
    { id: "award", label: "National Honors" },
    { id: "mou", label: "Strategic MOUs" },
    { id: "hackathon", label: "Hackathons" },
    { id: "patent", label: "Patents" },
  ];

  // Dynamically extract distinct years from achievements
  const availableYears = useMemo(() => {
    const years = new Set();
    displayAchievements.forEach((item) => {
      const match = (item.date || "").match(/\b(20\d\d)\b/);
      if (match) {
        years.add(match[1]);
      } else if (item.year) {
        years.add(String(item.year));
      } else if (item.publishedAt) {
        years.add(new Date(item.publishedAt).getFullYear().toString());
      } else if (item.createdAt) {
        years.add(new Date(item.createdAt).getFullYear().toString());
      }
    });
    return ["all", ...Array.from(years).sort((a, b) => b.localeCompare(a))];
  }, [displayAchievements]);

  const filtered = useMemo(() => {
    return displayAchievements.filter((item) => {
      const title = (item.title || "").toLowerCase();
      const desc = (item.desc || item.description || "").toLowerCase();
      const category = (item.category || "").toLowerCase();
      const registry = (item.registry || "").toLowerCase();
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        title.includes(q) ||
        desc.includes(q) ||
        category.includes(q) ||
        registry.includes(q);

      const matchesFilter = selectedFilter === "all" || item.type === selectedFilter;

      let itemYear = "";
      const match = (item.date || "").match(/\b(20\d\d)\b/);
      if (match) itemYear = match[1];
      else if (item.year) itemYear = String(item.year);
      else if (item.publishedAt) itemYear = new Date(item.publishedAt).getFullYear().toString();
      else if (item.createdAt) itemYear = new Date(item.createdAt).getFullYear().toString();

      const matchesYear = selectedYear === "all" || itemYear === selectedYear;

      return matchesSearch && matchesFilter && matchesYear;
    });
  }, [displayAchievements, searchTerm, selectedFilter, selectedYear]);

  return (
    <>
      <Head>
        <title>ACHIEVEMENTS &amp; AWARDS // AAC GRIET</title>
        <meta
          name="description"
          content="National awards, AICTE Vishwakarma honors, NRSC MOU partnerships, and hackathon championships achieved by AAC GRIET."
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
              <FaTrophy className="text-[10px]" />
              <span>Verifiable Milestones &bull; National Honors</span>
            </div>

            <h1 className="font-extrabold text-4xl sm:text-6xl tracking-tighter leading-tight mb-4 text-[#EAF1FF] uppercase font-sans">
              Achievements &amp; <br />
              <span className="italic font-serif font-normal text-[#E5A93C] lowercase tracking-normal text-3xl sm:text-5xl">
                milestones
              </span>{" "}
              Earned.
            </h1>

            <p className="text-sm sm:text-base text-[#9E988A] leading-relaxed font-sans font-normal mb-8">
              AICTE Vishwakarma Awards, strategic ISRO NRSC collaborations, official Indian Patent publications, and national hackathon podium finishes.
            </p>

            {/* Interactive Search Bar */}
            <div className="relative max-w-lg mx-auto mb-6">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E988A] text-xs pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search achievements by title, milestone, or registry..."
                className="w-full pl-10 pr-10 py-3 rounded-2xl bg-[#111318] border border-[#2A261F] text-white placeholder-[#9E988A]/60 text-xs font-sans focus:outline-none focus:border-[#E5A93C] transition-colors shadow-lg"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9E988A] hover:text-white text-xs p-1"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto scrollbar-none pb-2 mb-3">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelectedFilter(f.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    selectedFilter === f.id
                      ? "bg-[#E5A93C] text-[#08090C] font-bold shadow-md"
                      : "bg-[#111318] text-[#9E988A] hover:text-white border border-[#2A261F]"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Dynamic Year Filter Pills */}
            {availableYears.length > 2 && (
              <div className="flex items-center justify-center gap-1.5 overflow-x-auto scrollbar-none pb-2 mb-3">
                <span className="text-[10px] font-mono text-[#9E988A] uppercase tracking-wider mr-1 flex items-center gap-1">
                  <FaCalendarAlt className="text-[9px] text-[#E5A93C]" />
                  Year:
                </span>
                {availableYears.map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setSelectedYear(yr)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-mono tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                      selectedYear === yr
                        ? "bg-[#E5A93C]/20 border border-[#E5A93C] text-[#E5A93C] font-bold"
                        : "bg-[#111318]/60 text-[#9E988A] hover:text-white border border-white/5"
                    }`}
                  >
                    {yr === "all" ? "All Years" : yr}
                  </button>
                ))}
              </div>
            )}

            {/* Result Counter & Active Filter Badge */}
            <div className="text-[11px] font-mono text-[#9E988A] mt-2">
              Showing <span className="text-[#E5A93C] font-bold">{filtered.length}</span> of {displayAchievements.length} achievements
              {(searchTerm || selectedFilter !== "all" || selectedYear !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedFilter("all");
                    setSelectedYear("all");
                  }}
                  className="ml-3 text-[10px] text-[#E5A93C] hover:underline cursor-pointer"
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>

          {/* 3D Zoom Fly-Through Gallery */}
          <div className="mb-14">
            <Garcy3DZoomGallery
              items={filtered}
              category="achievements"
            />
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
