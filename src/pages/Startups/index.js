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
  FaSearch,
  FaBuilding,
  FaExternalLinkAlt,
  FaLightbulb,
  FaCheckCircle,
  FaHandshake,
} from "react-icons/fa";

export default function StartupsPage() {
  const { data: dbStartups } = useDatabase("startups");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);

  const defaultStartups = [
    {
      id: "koolgen",
      name: "Koolgen Interactives",
      founder: "Raunak Bagga (AAC Alumnus)",
      category: "Interactive Tech & Gaming",
      status: "Active Enterprise",
      color: "blue",
      description: "Pioneering interactive 3D virtual environments, interactive digital twins, and immersive game engine architectures. Keynote speaker at Opulence 2024.",
      metric: "Opulence Keynote",
      link: "https://koolgen.com",
    },
    {
      id: "great-honey",
      name: "The Great Honey Company",
      founder: "Srikanth Reddy Tenneti (AAC Alumnus)",
      category: "Food & Sustainability",
      status: "Commercial Scale",
      color: "orange",
      description: "Sustainable agricultural venture connecting ethically harvested natural produce directly to consumers through digital traceability and testing.",
      metric: "Opulence Speaker",
      link: "#",
    },
    {
      id: "meditech-systems",
      name: "AAC MediTech Inventions",
      founder: "Chethan Reddy & AAC IP Fellows",
      category: "HealthTech & Patents",
      status: "Patent Commercialization",
      color: "purple",
      description: "Commercializing the patented Automated Electronic Pill Reminder Device (Application No. 201941002559) with customizable compartments and verified two-way adherence.",
      metric: "Patent 201941002559",
      link: "/Patents",
    },
    {
      id: "assistive-wearables",
      name: "GestureVoice Assistive Technologies",
      founder: "Jashwanth Bopanna & AAC Fellows",
      category: "Assistive Wearables",
      status: "Patent Commercialization",
      color: "green",
      description: "Engineering wearable sensory gloves translating sign language hand gestures into real-time synthesized speech and text (Patent Application No. 202041038106).",
      metric: "Patent 202041038106",
      link: "/Patents",
    },
    {
      id: "campus-nav",
      name: "CampusNav Spatial Systems",
      founder: "Abhiram Pedamallu & Dinesh Chandra",
      category: "AR & Spatial AI",
      status: "Campus Deployment",
      color: "indigo",
      description: "Augmented reality indoor orientation and positioning platform mapping institutional campuses and large-scale complex facilities without GPS dependency.",
      metric: "100% GRIET Mapped",
      link: "/projects",
    },
  ];

  const displayStartups = dbStartups && dbStartups.length > 0 ? dbStartups : defaultStartups;

  const categories = [
    { id: "all", label: "All Ventures" },
    { id: "Interactive Tech & Gaming", label: "Interactive / Gaming" },
    { id: "Food & Sustainability", label: "Sustainability" },
    { id: "HealthTech & Patents", label: "HealthTech IP" },
    { id: "Assistive Wearables", label: "Assistive Tech" },
    { id: "AR & Spatial AI", label: "Spatial AI" },
  ];

  const filteredStartups = displayStartups.filter((item) => {
    const nameMatch = (item.name || item.title || "").toLowerCase().includes(searchTerm.toLowerCase());
    const founderMatch = (item.founder || "").toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = selectedCategory === "all" || item.category === selectedCategory;
    return (nameMatch || founderMatch) && categoryMatch;
  });

  return (
    <>
      <Head>
        <title>INCUBATED STARTUPS // AAC GRIET</title>
        <meta
          name="description"
          content="Student technology ventures, deep-tech commercial spinoffs, and alumni startups founded at Advanced Academic Center, GRIET."
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
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[10.5px] font-semibold tracking-wide uppercase mb-4 border backdrop-blur-md bg-[#E5A93C]/15 border-[#E5A93C]/40 text-[#E5A93C]">
              <FaRocket className="text-[10px]" />
              <span>Incubation Cell &bull; Commercial Spinoffs</span>
            </div>

            <h1 className="font-extrabold text-4xl sm:text-6xl tracking-tighter leading-tight mb-4 text-[#EAF1FF] uppercase font-sans">
              Student <br />
              <span className="italic font-serif font-normal text-[#E5A93C] lowercase tracking-normal text-3xl sm:text-5xl">
                startups
              </span>{" "}
              &amp; Spinoffs.
            </h1>

            <p className="text-sm sm:text-base text-[#9E988A] leading-relaxed font-sans font-normal">
              From collegiate engineering prototypes to commercial enterprises. Mentorship, intellectual property protection, and alumni ventures founded at GRIET.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 garcy-glass-header p-3">
            <div className="relative w-full sm:w-80">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9E988A] text-xs" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search startups or founders..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#08090C] border border-white/10 text-xs font-mono text-white placeholder-[#9E988A]/60 focus:outline-none focus:border-[#E5A93C]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? "bg-[#E5A93C] text-white font-bold"
                      : "text-[#9E988A] hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Startups Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStartups.map((startup, idx) => (
              <div
                key={startup.id || idx}
                className="garcy-glass-card p-6 sm:p-7 flex flex-col justify-between hover:border-[#E5A93C]/70 transition-all duration-300 group hover:-translate-y-1 border border-white/15 shadow-xl bg-gradient-to-br from-[#111318] to-[#08090C]"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono uppercase text-[#9E988A] mb-4">
                    <span className="text-[9.5px] font-bold text-[#E5A93C] px-2.5 py-0.5 rounded-full bg-[#08090C] border border-[#E5A93C]/30">
                      {startup.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#08090C] text-[#E5A93C] border border-[#E5A93C]/40 text-[8.5px] font-bold flex items-center gap-1">
                      <FaCheckCircle className="text-[7.5px]" />
                      <span>{startup.status}</span>
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-[#EAF1FF] mb-1 font-sans group-hover:text-[#E5A93C] transition-colors leading-snug">
                    {startup.name || startup.title}
                  </h2>

                  <div className="text-xs font-mono text-[#9E988A] mb-4">
                    Founded by: <strong className="text-white">{startup.founder}</strong>
                  </div>

                  <p className="text-xs text-[#9E988A] leading-relaxed font-sans mb-6 font-normal">
                    {startup.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#9E988A]">
                  <span className="text-[10px] text-[#E5A93C] font-bold uppercase">
                    {startup.metric || "AAC INCUBATED"}
                  </span>

                  {startup.link && startup.link !== "#" ? (
                    <Link
                      href={startup.link}
                      className="inline-flex items-center gap-1.5 text-xs text-[#E5A93C] hover:text-white uppercase font-bold transition-colors"
                    >
                      <span>Explore</span>
                      <FaExternalLinkAlt className="text-[9px]" />
                    </Link>
                  ) : (
                    <span className="text-[9px] font-mono text-[#9E988A]">GRIET ECOSYSTEM</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredStartups.length === 0 && (
            <div className="text-center py-16 text-[#9E988A] font-mono text-sm">
              No startups found matching your filter criteria.
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
