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
  FaFileAlt,
  FaSearch,
  FaTimes,
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaBookOpen,
} from "react-icons/fa";

export default function PublicationsPage() {
  const { data: publicationsData } = useDatabase("publications");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);

  const defaultPublications = [
    {
      id: "wine-quality",
      title: "Ensemble–Based Wine Quality Detection using Hybrid Machine Learning Models",
      journal: "International Journal of Engineering Research and Technology (IJERT)",
      citation: "ISSN: 2278-0181, Vol. 13 Issue 01, August 2024",
      date: "August 2024",
      category: "Machine Learning",
      image: "/images/AAC2.png",
      authors: ["Dodda Abhiram", "Siddharth Mahesh Balijepally", "Ekantha Sai Sundar"],
      description:
        "Proposes a novel ensemble learning method for accurately predicting wine quality using hybrid classification models, feature correlation metrics, and cross-validated decision trees.",
      registry: "IJERT Scopus Journal",
      link: "https://www.ijert.org/",
      ctaText: "Access IJERT Journal",
      participants: "Dodda Abhiram & AAC Researchers",
    },
    {
      id: "uav-swarm-rl",
      title: "Multi-Agent Reinforcement Learning for Decentralized UAV Swarm Formations",
      journal: "IEEE Aerospace & Electronic Systems Proceedings",
      citation: "IEEE Conference on Autonomous Systems, 2023",
      date: "2023",
      category: "Autonomous Systems",
      image: "/images/pic.webp",
      authors: ["AAC Autonomous Flight Team", "Faculty Guides"],
      description:
        "Presents decentralized policy gradient algorithms allowing autonomous drone fleets to maintain dynamic aerodynamic formations amidst turbulence without central communication.",
      registry: "IEEE Xplore Proceedings",
      link: "/projects",
      ctaText: "View Swarm Project",
      participants: "UAV Lab Contingent",
    },
    {
      id: "pill-reminder-ip",
      title: "Design and Validation of Two-Way Electronic Verification for Medication Compliance",
      journal: "AAC Technical Proceedings & Indian Patent Journal",
      citation: "Patent Application 201941002559",
      date: "2019",
      category: "Healthcare & Embedded",
      image: "/images/AAC1.png",
      authors: ["Yelma Chethan Reddy", "Alence Abhinay", "B.S.V.S Anoop", "M Srikanth", "D. Naga pavan", "G Pradeep Reddy"],
      description:
        "Presents architectural schemas, firmware timing diagrams, and sensor validation for an automated electronic medication dispenser with multi-compartment replaceable layers.",
      registry: "Indian Patent Registry",
      link: "/Patents",
      ctaText: "Inspect Patent Record",
      participants: "6 AAC Inventors",
    },
    {
      id: "smart-glove-translation",
      title: "Wearable Sensor-Fused Flex Matrix for Real-Time Sign Language Gesture Translation",
      journal: "AAC Assistive Tech Archive & Indian Patent Journal",
      citation: "Patent Application 202041038106",
      date: "2020",
      category: "Assistive Technology",
      image: "/images/AAC3.png",
      authors: ["Jashwanth Kranthi Bopanna", "Santosh Sanjeev", "Bharath Varma Kantheti", "Gowtham Sai Ponnekanti", "Suhas Gangireddy", "G Pradeep Reddy"],
      description:
        "Details the design of a wearable smart glove combining flex sensor arrays and orientation telemetry to translate sign language gestures into synthesized speech and text.",
      registry: "Assistive Tech Cell",
      link: "/Patents",
      ctaText: "Inspect Wearable Patent",
      participants: "Assistive Tech Fellows",
    },
    {
      id: "microgrid-power-balance",
      title: "Microgrid Power Balancing via Distributed Consensus Optimization",
      journal: "IEEE Transactions on Smart Grid Systems",
      citation: "Special Issue on Campus Renewable Energy, 2022",
      date: "2022",
      category: "Energy Systems",
      image: "/images/8.webp",
      authors: ["AAC Energy Group", "Dr. J Praveen"],
      description:
        "Investigates decentralized frequency regulation and peer-to-peer load leveling in renewable campus microgrids using low-latency IoT power metering nodes.",
      registry: "IEEE PES Chapter",
      link: "/projects",
      ctaText: "Inspect Energy Build",
      participants: "Power Systems Fellows",
    },
    {
      id: "edge-neuromorphic-biosensor",
      title: "Edge Neuromorphic Spike Classification for Wearable Biosensors",
      journal: "Biomedical Engineering Letters",
      citation: "Vol. 14, Issue 2, 2024",
      date: "2024",
      category: "Machine Learning",
      image: "/images/AAC2.png",
      authors: ["Biomedical AI Fellows", "GRIET AAC"],
      description:
        "Examines hardware neuromorphic architectures executing continuous arrhythmia classification on wearable biosensors with sub-50 microamp current draw.",
      registry: "Biomedical AI Archive",
      link: "/Research",
      ctaText: "View Research Lab",
      participants: "Edge Compute Fellows",
    },
  ];

  const displayPubs =
    publicationsData && publicationsData.length > 0 ? publicationsData : defaultPublications;

  const categories = [
    { id: "all", label: "All Publications" },
    { id: "Machine Learning", label: "Machine Learning" },
    { id: "Autonomous Systems", label: "Autonomous Systems" },
    { id: "Healthcare & Embedded", label: "Healthcare & Embedded" },
    { id: "Assistive Technology", label: "Assistive Tech" },
    { id: "Energy Systems", label: "Energy Systems" },
  ];

  const availableYears = useMemo(() => {
    const years = new Set();
    displayPubs.forEach((item) => {
      const match = (item.date || item.year || "").match(/\b(20\d\d)\b/);
      if (match) years.add(match[1]);
    });
    return ["all", ...Array.from(years).sort((a, b) => b.localeCompare(a))];
  }, [displayPubs]);

  const filtered = useMemo(() => {
    return displayPubs.filter((pub) => {
      const title = (pub.title || "").toLowerCase();
      const journal = (pub.journal || "").toLowerCase();
      const authors = (Array.isArray(pub.authors) ? pub.authors.join(" ") : String(pub.authors || "")).toLowerCase();
      const desc = (pub.description || pub.abstract || "").toLowerCase();
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch = !q || title.includes(q) || journal.includes(q) || authors.includes(q) || desc.includes(q);

      const matchesCat = selectedCategory === "all" || pub.category === selectedCategory;

      let itemYear = "";
      const match = (pub.date || pub.year || "").match(/\b(20\d\d)\b/);
      if (match) itemYear = match[1];

      const matchesYear = selectedYear === "all" || itemYear === selectedYear;

      return matchesSearch && matchesCat && matchesYear;
    });
  }, [displayPubs, searchTerm, selectedCategory, selectedYear]);

  return (
    <>
      <Head>
        <title>RESEARCH PUBLICATIONS // AAC GRIET</title>
        <meta
          name="description"
          content="Peer-reviewed research publications, conference proceedings, and technical treatises from AAC GRIET."
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
              <FaBookOpen className="text-[10px]" />
              <span>Peer-Reviewed Literature &bull; IEEE &amp; Scopus Proceedings</span>
            </div>

            <h1 className="font-extrabold text-4xl sm:text-6xl tracking-tighter leading-tight mb-4 text-[#EAF1FF] uppercase font-sans">
              Scholarly &amp; Research <br />
              <span className="italic font-serif font-normal text-[#E5A93C] lowercase tracking-normal text-3xl sm:text-5xl">
                publications
              </span>{" "}
              Index.
            </h1>

            <p className="text-sm sm:text-base text-[#9E988A] leading-relaxed font-sans font-normal mb-8">
              International journal papers, conference proceedings, and engineering treatises authored by AAC student fellows and faculty mentors.
            </p>

            {/* Interactive Search Bar */}
            <div className="relative max-w-lg mx-auto mb-6">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E988A] text-xs pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search publications by title, journal, author, or keyword..."
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
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? "bg-[#E5A93C] text-[#08090C] font-bold shadow-md"
                      : "bg-[#111318] text-[#9E988A] hover:text-white border border-[#2A261F]"
                  }`}
                >
                  {cat.label}
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
              Showing <span className="text-[#E5A93C] font-bold">{filtered.length}</span> of {displayPubs.length} publications
              {(searchTerm || selectedCategory !== "all" || selectedYear !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setSelectedYear("all");
                  }}
                  className="ml-3 text-[10px] text-[#E5A93C] hover:underline cursor-pointer"
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>

          {/* 3D Zoom Fly-Through Gallery (Matching Events & Achievements) */}
          <div className="mb-14">
            <Garcy3DZoomGallery items={filtered} category="publications" />
          </div>

          {/* Publication List Grid */}
          <div className="pt-8 border-t border-white/10">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white uppercase font-sans tracking-tight mb-6 text-center sm:text-left">
              Published Papers &amp; Proceedings Archive
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((pub) => (
                <div
                  key={pub.id}
                  className="garcy-glass-card p-6 flex flex-col justify-between hover:border-[#E5A93C]/70 transition-all duration-300 group hover:-translate-y-1 border border-white/15 shadow-xl bg-gradient-to-br from-[#111318] to-[#08090C]"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase mb-4">
                      <span className="text-[#9E988A] font-bold truncate max-w-[170px]">
                        {pub.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#08090C] text-[#E5A93C] border border-[#E5A93C]/40 text-[8.5px] font-bold">
                        {pub.date || pub.year}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#EAF1FF] mb-2 font-sans group-hover:text-[#E5A93C] transition-colors leading-snug">
                      {pub.title}
                    </h3>

                    <div className="p-2.5 rounded-lg bg-[#08090C]/80 border border-white/10 text-[10px] font-mono text-[#9E988A] mb-4 space-y-0.5">
                      <div className="text-white font-bold">{pub.journal}</div>
                      <div className="text-[#E5A93C]">{pub.citation}</div>
                    </div>

                    {pub.authors && (
                      <div className="mb-3 text-[11px] font-mono text-[#9E988A]">
                        <span className="text-[#E5A93C] font-bold">Authors: </span>
                        <span>{Array.isArray(pub.authors) ? pub.authors.join(", ") : pub.authors}</span>
                      </div>
                    )}

                    <p className="text-xs text-[#9E988A] leading-relaxed font-sans font-normal line-clamp-3 mb-6">
                      {pub.description || pub.abstract}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#9E988A]">
                    {pub.link ? (
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group-hover:text-[#E5A93C] transition-colors flex items-center gap-1.5 uppercase font-bold text-[10px]"
                      >
                        <span>Access Document</span>
                        <FaExternalLinkAlt className="text-[9px]" />
                      </a>
                    ) : (
                      <span className="text-[#9E988A]">ACADEMIC ARCHIVE</span>
                    )}
                    <span className="text-[9px] font-mono text-[#10b981]">PEER-REVIEWED</span>
                  </div>
                </div>
              ))}
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
