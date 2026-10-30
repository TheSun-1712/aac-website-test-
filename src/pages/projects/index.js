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
  FaRocket,
  FaAtom,
  FaLightbulb,
  FaMicrochip,
  FaSearch,
  FaExternalLinkAlt,
  FaLayerGroup,
  FaFilter,
} from "react-icons/fa";

export default function ProjectsPage() {
  const { data: projectsData } = useDatabase("projects");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);

  const defaultProjects = [
    {
      id: "intelligent-campus-navigation",
      title: "Intelligent Campus Navigation System",
      domain: "App Development & Mobile Architectures",
      category: "software",
      status: "CAMPUS DEPLOYED",
      badgeColor: "#49A3FF",
      description: "An AI-powered navigation system designed to help students and visitors navigate the GRIET campus efficiently using augmented reality, indoor positioning systems, and machine learning.",
      specs: ["AR Directional Overlay", "Indoor Sub-Meter Accuracy", "100% Campus Mapped"],
      caseId: "nav",
    },
    {
      id: "smart-energy-management",
      title: "Smart Energy Management System",
      domain: "Internet of Things & Telemetry",
      category: "iot",
      status: "RESEARCH ACTIVE",
      badgeColor: "#1769FF",
      description: "IoT-based energy monitoring and optimization system for reducing campus energy consumption using smart sensors, MQTT telemetry, and predictive load analytics.",
      specs: ["18% Power Reduction", "80+ Sensor Nodes", "Predictive Analytics"],
      caseId: "energy",
    },
    {
      id: "automated-pill-reminder",
      title: "Automated Electronic Pill Reminder Device",
      domain: "Biomedical & Embedded Systems",
      category: "biomedical",
      status: "PATENT 201941002559",
      badgeColor: "#49A3FF",
      description: "An automated electronic device for reminding medication schedules with two-way confirmation and replaceable pill compartments. Officially published by the Indian Patent Office.",
      specs: ["Two-Way Confirmation", "Custom Compartments", "Indian Patent Published"],
      caseId: "pill",
    },
    {
      id: "smart-glove-sign-language",
      title: "Smart Glove for Sign Language Translation",
      domain: "Assistive Technology & Wearables",
      category: "hardware",
      status: "PATENT 202041038106",
      badgeColor: "#1769FF",
      description: "Wearable assistive sensor glove translating sign language hand gestures into real-time speech and text. Officially published by the Indian Patent Office.",
      specs: ["Flex Sensor Array", "< 25ms Translation Delay", "Indian Patent Published"],
      caseId: "glove",
    },
    {
      id: "gprime-judge-engine",
      title: "G-Prime Competitive Algorithmic Evaluation Engine",
      domain: "Distributed Systems & Algorithms",
      category: "software",
      status: "PRODUCTION LIVE",
      badgeColor: "#49A3FF",
      description: "Sandboxed multi-stage algorithmic evaluation engine powering G-Prime coding contests, executing multi-language test suites with sub-80ms judge response time.",
      specs: ["42+ Competing Teams", "Rapidfire & Cascade", "< 80ms Latency"],
      caseId: "gprime",
    },
  ];

  const displayProjects = projectsData && projectsData.length > 0 ? projectsData : defaultProjects;

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "robotics", label: "Autonomous UAVs" },
    { id: "ai", label: "Edge AI & Vision" },
    { id: "iot", label: "IoT & Embedded" },
    { id: "software", label: "Distributed Software" },
  ];

  const filteredProjects = displayProjects.filter((item) => {
    const title = item.title || item.name || "";
    const desc = item.description || "";
    const matchesQuery =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain =
      selectedDomain === "all" || item.category === selectedDomain;
    return matchesQuery && matchesDomain;
  });

  return (
    <>
      <Head>
        <title>R&amp;D PROJECTS DIRECTORY // AAC GRIET</title>
        <meta
          name="description"
          content="Explore 50+ interdisciplinary student engineering projects, autonomous systems, and patents at AAC GRIET"
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
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[10.5px] font-semibold tracking-wide uppercase mb-4 border backdrop-blur-md bg-[#1769FF]/15 border-[#1769FF]/40 text-[#49A3FF]">
              <FaAtom className="text-[10px]" />
              <span>R&amp;D Repository &bull; 50+ Indexed Builds</span>
            </div>

            <h1 className="font-extrabold text-4xl sm:text-6xl tracking-tighter leading-tight mb-4 text-[#EAF1FF] uppercase font-sans">
              Engineering Projects &amp; <br />
              <span className="italic font-serif font-normal text-[#49A3FF] lowercase tracking-normal text-3xl sm:text-5xl">
                autonomous
              </span>{" "}
              Systems.
            </h1>

            <p className="text-sm sm:text-base text-[#8793A8] leading-relaxed font-sans font-normal">
              From high-endurance autonomous multi-rotor aircraft to deep-tech edge neural units and distributed benchmark engines.
            </p>
          </div>

          {/* Search Bar & Domain Filters */}
          <div className="garcy-glass-card p-4 sm:p-5 border border-white/15 mb-12 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-4">
              
              {/* Search Input */}
              <div className="flex-1 w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#080B12]/80 border border-white/10">
                <FaSearch className="text-[#8793A8] text-xs flex-shrink-0" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search projects by keyword (e.g., UAV, Jetson, LoRa, Neural)..."
                  className="w-full bg-transparent border-0 text-white placeholder-[#8793A8]/60 focus:outline-none text-xs font-mono"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="text-[10px] font-mono text-[#8793A8] hover:text-white uppercase"
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
                    onClick={() => setSelectedDomain(cat.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all flex-shrink-0 ${
                      selectedDomain === cat.id
                        ? "bg-[#1769FF] text-white font-bold shadow-md"
                        : "bg-[#101725] text-[#8793A8] hover:text-white border border-white/10"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((item, idx) => (
              <div
                key={item.id}
                className="garcy-glass-card p-6 flex flex-col justify-between hover:border-[#1769FF]/70 transition-all duration-300 group hover:-translate-y-1 border border-white/15 shadow-xl bg-gradient-to-br from-[#101725] to-[#080B12]"
              >
                <div>
                  {/* Top Bar: Domain & Badge */}
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase mb-4">
                    <span className="text-[#8793A8] font-bold truncate max-w-[170px]">
                      {item.domain}
                    </span>
                    <span
                      className="px-2.5 py-0.5 rounded-full bg-[#080B12] text-[8.5px] font-bold border"
                      style={{
                        color: item.badgeColor || "#49A3FF",
                        borderColor: `${item.badgeColor || "#49A3FF"}55`,
                      }}
                    >
                      {item.status || "ACTIVE LAB"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#EAF1FF] mb-2.5 font-sans group-hover:text-[#49A3FF] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#8793A8] leading-relaxed font-sans font-normal mb-6">
                    {item.description}
                  </p>
                </div>

                <div>
                  {/* Specs row if available */}
                  {item.specs && (
                    <div className="grid grid-cols-3 gap-1.5 mb-5 pt-3 border-t border-white/10 text-[9px] font-mono text-[#8793A8]">
                      {item.specs.map((sp) => (
                        <div key={sp} className="p-1.5 rounded bg-[#080B12]/80 border border-white/5 text-center truncate">
                          {sp}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bottom Actions */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    {item.caseId ? (
                      <button
                        type="button"
                        onClick={() => setCaseStudiesOpen(true)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#49A3FF] hover:text-white transition-colors"
                      >
                        <FaLayerGroup className="text-[10px]" />
                        <span>Case Study &rarr;</span>
                      </button>
                    ) : (
                      <Link
                        href={`/projects/${item.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#49A3FF] hover:text-white transition-colors"
                      >
                        <span>Specifications</span>
                        <FaExternalLinkAlt className="text-[9px]" />
                      </Link>
                    )}

                    <span className="text-[9px] font-mono text-[#8793A8] uppercase">
                      AAC // 0{idx + 1}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-[#8793A8] font-mono text-xs">
              No matching projects found for query &ldquo;{searchTerm}&rdquo;
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
