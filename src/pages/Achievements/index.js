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
  FaTrophy,
  FaAward,
  FaSearch,
  FaCheckCircle,
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaShieldAlt,
  FaLightbulb,
} from "react-icons/fa";

export default function AchievementsPage() {
  const { data: dbAchievements } = useDatabase("achievements");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
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

  const filtered = displayAchievements.filter((item) => {
    const matchesSearch =
      (item.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.desc || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.category || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || item.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

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
      <main className="stage relative overflow-hidden bg-[#080B12]/92 text-[#EAF1FF] min-h-screen pb-20">
        
        {/* Floating Header */}
        <GarcyNavbar
          onOpenSearch={() => setSearchOpen(true)}
          onOpenCaseStudies={() => setCaseStudiesOpen(true)}
        />

        {/* Hero Section */}
        <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[10.5px] font-semibold tracking-wide uppercase mb-4 border backdrop-blur-md bg-[#1769FF]/15 border-[#1769FF]/40 text-[#49A3FF]">
              <FaTrophy className="text-[10px]" />
              <span>Verifiable Milestones &bull; National Honors</span>
            </div>

            <h1 className="font-extrabold text-4xl sm:text-6xl tracking-tighter leading-tight mb-4 text-[#EAF1FF] uppercase font-sans">
              Achievements &amp; <br />
              <span className="italic font-serif font-normal text-[#49A3FF] lowercase tracking-normal text-3xl sm:text-5xl">
                milestones
              </span>{" "}
              Earned.
            </h1>

            <p className="text-sm sm:text-base text-[#8793A8] leading-relaxed font-sans font-normal">
              AICTE Vishwakarma Awards, strategic ISRO NRSC collaborations, official Indian Patent publications, and national hackathon podium finishes.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 garcy-glass-header p-3">
            <div className="relative w-full sm:w-80">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8793A8] text-xs" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search milestones or awards..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#080B12] border border-white/10 text-xs font-mono text-white placeholder-[#8793A8]/60 focus:outline-none focus:border-[#1769FF]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelectedFilter(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                    selectedFilter === f.id
                      ? "bg-[#1769FF] text-white font-bold"
                      : "text-[#8793A8] hover:text-white"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, idx) => (
              <div
                key={item.id || idx}
                className="garcy-glass-card p-6 sm:p-7 flex flex-col justify-between hover:border-[#1769FF]/70 transition-all duration-300 group hover:-translate-y-1 border border-white/15 shadow-xl bg-gradient-to-br from-[#101725] to-[#080B12]"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono uppercase mb-4">
                    <span className="text-[9.5px] font-bold text-[#49A3FF] px-2.5 py-0.5 rounded-full bg-[#080B12] border border-[#1769FF]/30">
                      {item.tag || item.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#080B12] text-[#49A3FF] border border-[#1769FF]/40 text-[8.5px] font-bold flex items-center gap-1">
                      <FaCheckCircle className="text-[7.5px]" />
                      <span>VERIFIED</span>
                    </span>
                  </div>

                  {/* Photo if present */}
                  {item.image && (
                    <div className="w-full h-44 rounded-xl overflow-hidden mb-5 border border-white/10 bg-[#080B12]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <h2 className="text-lg font-bold text-[#EAF1FF] mb-2 font-sans group-hover:text-[#49A3FF] transition-colors leading-snug">
                    {item.title}
                  </h2>

                  <div className="p-2.5 rounded-lg bg-[#080B12]/80 border border-white/10 text-[10px] font-mono text-[#8793A8] mb-4 space-y-0.5">
                    <div className="text-[#EAF1FF] font-semibold">{item.registry}</div>
                    <div className="text-[#49A3FF] font-bold">{item.date}</div>
                  </div>

                  <p className="text-xs text-[#8793A8] leading-relaxed font-sans font-normal mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  {item.link ? (
                    <Link
                      href={item.link}
                      className="inline-flex items-center gap-1.5 text-xs text-[#49A3FF] hover:text-white uppercase font-bold transition-colors"
                    >
                      <span>Inspect Evidence</span>
                      <FaExternalLinkAlt className="text-[9px]" />
                    </Link>
                  ) : (
                    <span className="text-[10px] text-[#8793A8] uppercase font-bold">
                      OFFICIAL CERTIFICATION
                    </span>
                  )}
                  <span className="text-[9px] text-[#8793A8] font-mono">GRIET AAC</span>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-[#8793A8] font-mono text-sm">
              No achievements found matching your filter criteria.
            </div>
          )}
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
