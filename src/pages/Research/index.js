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
  FaFlask,
  FaSearch,
  FaTimes,
  FaCalendarAlt,
  FaFileAlt,
  FaLightbulb,
  FaRocket,
  FaBook,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";

export default function ResearchPage() {
  const { data: dbResearch } = useDatabase("research");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);

  const defaultResearch = [
    {
      id: "uav-swarm-nav",
      title: "Autonomous Aerial Drone Swarm Navigation",
      category: "Autonomous Systems",
      date: "2024",
      image: "/images/pic.webp",
      venue: "AAC Autonomous Systems Lab",
      description:
        "Distributed collision-avoidance algorithms and multi-agent coordination for autonomous quadcopter fleets operating reliably in GPS-denied environments.",
      path: "/projects",
      ctaText: "Inspect Lab Builds",
      participants: "8 Fellows & Dr. J. Praveen",
    },
    {
      id: "smart-glove-translation",
      title: "Smart Assistive Glove for Real-Time Sign Language Synthesis",
      category: "Assistive Tech",
      date: "2023",
      image: "/images/AAC3.png",
      venue: "Indian Patent Office & AAC IP Cell",
      description:
        "Wearable flex sensor glove translating continuous Indian Sign Language gestures into synthesized speech and text with sub-25ms response latency.",
      path: "/Patents",
      ctaText: "View Patent Filing",
      participants: "Inventors Jashwanth Kranthi & Team",
    },
    {
      id: "neuromorphic-edge-ai",
      title: "Edge-AI Neuromorphic Computing for Biomedical Monitoring",
      category: "Biomedical IoT",
      date: "2024",
      image: "/images/AAC1.png",
      venue: "Advanced Computing Lab",
      description:
        "Ultra-low power on-chip spiking neural network architecture executing real-time arrhythmia detection on micro-watt battery budgets.",
      path: "/Publications",
      ctaText: "Read IEEE Abstract",
      participants: "Edge Compute Group",
    },
    {
      id: "nrsc-satellite-sensing",
      title: "Dual-Band Satellite Remote Sensing with NRSC ISRO",
      category: "Aerospace Sensing",
      date: "2023",
      image: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100167/AAC-web/news_events/nrsc5_e8it62.jpg",
      venue: "NRSC (ISRO) Hyderabad",
      description:
        "Institutional collaborative R&D pipeline analyzing multi-spectral geospatial satellite data for precision agricultural yield classification and canopy density modeling.",
      path: "/Achievements",
      ctaText: "Explore MoU Scope",
      participants: "NRSC Senior Scientists & AAC",
    },
    {
      id: "electronic-pill-reminder",
      title: "Automated Electronic Pill Reminder Device (Patent 201941002559)",
      category: "Biomedical IoT",
      date: "2020",
      image: "/images/AAC2.png",
      venue: "National IP Registry & AAC Lab",
      description:
        "Two-way verified pharmaceutical dispenser with customizable modular compartments ensuring geriatric patient compliance and remote caregiver notification.",
      path: "/Patents",
      ctaText: "Inspect Patent Claims",
      participants: "Yelma Chethan Reddy & Co-Inventors",
    },
    {
      id: "ensemble-wine-quality",
      title: "Ensemble Machine Learning for Predictive Material Analysis",
      category: "Cognitive AI",
      date: "2024",
      image: "/images/8.webp",
      venue: "IJERT Scopus Journal",
      description:
        "Hybrid ensemble classification framework combining gradient boosting and deep random forest models to predict chemical composition quality with 98.4% accuracy.",
      path: "/Publications",
      ctaText: "Read Journal Paper",
      participants: "Dodda Abhiram & AAC Researchers",
    },
    {
      id: "soil-moisture-radar",
      title: "Sub-surface Precision Agricultural Soil Moisture Radar Array",
      category: "Aerospace Sensing",
      date: "2022",
      image: "/images/pic.webp",
      venue: "AAC Embedded Sensing Lab",
      description:
        "FMCW high-frequency radar ground-penetrating array calibrated for real-time root-zone moisture telemetry without physical soil disruption.",
      path: "/projects",
      ctaText: "Review Hardware Setup",
      participants: "IoT & Sensor Lab",
    },
    {
      id: "decentralized-microgrid",
      title: "Decentralized Microgrid Peer-to-Peer Energy Routing Protocol",
      category: "Autonomous Systems",
      date: "2023",
      image: "/images/AAC1.png",
      venue: "GRIET Campus Microgrid",
      description:
        "Consensus-driven smart inverter load-balancing network optimizing rooftop solar storage and distribution across university campus blocks.",
      path: "/projects",
      ctaText: "Inspect Microgrid Topology",
      participants: "Smart Grid Fellows",
    },
  ];

  const displayResearch =
    dbResearch && dbResearch.length > 0 ? dbResearch : defaultResearch;

  const categories = [
    { id: "all", label: "All Research" },
    { id: "Autonomous Systems", label: "Autonomous Systems" },
    { id: "Assistive Tech", label: "Assistive Tech" },
    { id: "Biomedical IoT", label: "Biomedical IoT" },
    { id: "Cognitive AI", label: "Cognitive AI" },
    { id: "Aerospace Sensing", label: "Aerospace Sensing" },
  ];

  const availableYears = useMemo(() => {
    const years = new Set();
    displayResearch.forEach((item) => {
      const match = (item.date || "").match(/\b(20\d\d)\b/);
      if (match) years.add(match[1]);
      else if (item.publishedAt) years.add(new Date(item.publishedAt).getFullYear().toString());
    });
    return ["all", ...Array.from(years).sort((a, b) => b.localeCompare(a))];
  }, [displayResearch]);

  const filtered = useMemo(() => {
    return displayResearch.filter((item) => {
      const title = (item.title || "").toLowerCase();
      const desc = (item.description || item.desc || "").toLowerCase();
      const venue = (item.venue || item.location || "").toLowerCase();
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch = !q || title.includes(q) || desc.includes(q) || venue.includes(q);

      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      let itemYear = "";
      const match = (item.date || "").match(/\b(20\d\d)\b/);
      if (match) itemYear = match[1];
      else if (item.publishedAt) itemYear = new Date(item.publishedAt).getFullYear().toString();

      const matchesYear = selectedYear === "all" || itemYear === selectedYear;

      return matchesSearch && matchesCategory && matchesYear;
    });
  }, [displayResearch, searchTerm, selectedCategory, selectedYear]);

  const subpagePortals = [
    {
      title: "Patents & Intellectual Property",
      tag: "OFFICIALLY PUBLISHED",
      path: "/Patents",
      icon: FaLightbulb,
      description: "Automated pill reminder device, smart glove for sign language translation, and new utility patents.",
    },
    {
      title: "Peer-Reviewed Publications",
      tag: "SCOPUS / IEEE",
      path: "/Publications",
      icon: FaFileAlt,
      description: "Scholarly journal papers, machine learning treatises, and conference proceedings authored by AAC fellows.",
    },
    {
      title: "Startups & Commercial Spinoffs",
      tag: "INCUBATED VENTURES",
      path: "/Startups",
      icon: FaRocket,
      description: "Commercial student enterprises, deep-tech hardware spinouts, and seed-funded initiatives originating from AAC.",
    },
    {
      title: "Authored Books & Manuals",
      tag: "ENGINEERING TEXTS",
      path: "/Books",
      icon: FaBook,
      description: "Technical volumes, game engineering handbooks, and open-source computing guides written by AAC faculty.",
    },
  ];

  return (
    <>
      <Head>
        <title>RESEARCH &amp; INNOVATION // AAC GRIET</title>
        <meta
          name="description"
          content="Explore student research initiatives, patents, peer-reviewed publications, and deep-tech prototypes at the Advanced Academic Center, GRIET."
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
              <FaFlask className="text-[10px]" />
              <span>Interdisciplinary Research &bull; Deep-Tech Laboratories</span>
            </div>

            <h1 className="font-extrabold text-4xl sm:text-6xl tracking-tighter leading-tight mb-4 text-[#EAF1FF] uppercase font-sans">
              Research &amp; <br />
              <span className="italic font-serif font-normal text-[#E5A93C] lowercase tracking-normal text-3xl sm:text-5xl">
                innovation
              </span>{" "}
              Initiatives.
            </h1>

            <p className="text-sm sm:text-base text-[#9E988A] leading-relaxed font-sans font-normal mb-8">
              Explore interdisciplinary projects spanning autonomous aerial robotics, assistive wearable hardware, edge neuromorphic units, and satellite remote sensing.
            </p>

            {/* Interactive Search Bar */}
            <div className="relative max-w-lg mx-auto mb-6">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E988A] text-xs pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search research by title, domain, or laboratory..."
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
              Showing <span className="text-[#E5A93C] font-bold">{filtered.length}</span> of {displayResearch.length} research projects
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
          <div className="mb-16">
            <Garcy3DZoomGallery items={filtered} category="research" />
          </div>

          {/* Subpage Exploration Portals */}
          <div className="pt-10 border-t border-white/10">
            <div className="text-center max-w-xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase font-sans tracking-tight">
                Explore Research Portals
              </h2>
              <p className="text-xs sm:text-sm text-[#9E988A] mt-2 font-sans">
                Access official patent registrations, IEEE proceedings, incubated ventures, and published books.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {subpagePortals.map((portal) => {
                const Icon = portal.icon;
                return (
                  <Link
                    key={portal.path}
                    href={portal.path}
                    className="garcy-glass-card p-6 flex flex-col justify-between hover:border-[#E5A93C]/70 transition-all duration-300 group hover:-translate-y-1 border border-white/15 shadow-xl bg-gradient-to-br from-[#111318] to-[#08090C]"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="w-10 h-10 rounded-xl bg-[#08090C] border border-white/10 flex items-center justify-center text-[#E5A93C] group-hover:scale-110 transition-transform">
                          <Icon size={16} />
                        </span>
                        <span className="text-[9px] font-mono text-[#E5A93C] px-2 py-0.5 rounded-full bg-[#E5A93C]/10 border border-[#E5A93C]/30">
                          {portal.tag}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white uppercase tracking-tight group-hover:text-[#E5A93C] transition-colors mb-2 font-sans">
                        {portal.title}
                      </h3>

                      <p className="text-xs text-[#9E988A] leading-relaxed font-sans line-clamp-3">
                        {portal.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#E5A93C]">
                      <span>Open Section</span>
                      <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Proposal Submission Callout */}
            <div className="mt-8 garcy-glass-card p-6 sm:p-8 rounded-2xl border border-[#E5A93C]/40 bg-gradient-to-r from-[#111318] via-[#161a24] to-[#08090C] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] font-mono text-[#10b981] font-bold uppercase tracking-wider block">
                  Collaborative R&amp;D Pipeline
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-sans uppercase">
                  Have an R&amp;D Proposal or Innovation?
                </h3>
                <p className="text-xs text-[#9E988A] max-w-xl font-sans">
                  AAC welcomes student and faculty project proposals in autonomous robotics, biomedical wearables, and embedded AI.
                </p>
              </div>

              <a
                href="mailto:aacgriet.org@gmail.com"
                className="px-6 py-3 rounded-xl bg-[#E5A93C] hover:bg-[#F6C463] text-[#08090C] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg flex-shrink-0"
              >
                <FaEnvelope className="text-xs" />
                <span>Submit R&amp;D Proposal</span>
              </a>
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
