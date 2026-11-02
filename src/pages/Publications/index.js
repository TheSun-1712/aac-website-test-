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
  FaFileAlt,
  FaSearch,
  FaExternalLinkAlt,
  FaBook,
  FaCalendarAlt,
  FaUserGraduate,
  FaLayerGroup,
} from "react-icons/fa";

export default function PublicationsPage() {
  const { data: publicationsData } = useDatabase("publications");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);

  const defaultPublications = [
    {
      id: "wine-quality",
      title: "Ensemble–Based Wine Quality Detection using Hybrid Machine Learning Models",
      journal: "International Journal of Engineering Research and Technology (IJERT)",
      citation: "ISSN: 2278-0181, Vol. 13 Issue 01, August 2024",
      year: "2024",
      category: "Machine Learning",
      authors: ["Dodda Abhiram", "Siddharth Mahesh Balijepally", "Ekantha Sai Sundar"],
      abstract: "This paper proposes a novel ensemble learning method for accurately predicting wine quality using hybrid classification models, feature correlation metrics, and cross-validated decision trees.",
      keywords: ["machine learning", "ensemble models", "hybrid classification", "predictive analytics"],
      link: "https://www.ijert.org/",
      type: "Journal Paper",
    },
    {
      id: "pill-reminder-ip",
      title: "Design and Validation of Two-Way Electronic Verification for Scheduled Medication Compliance",
      journal: "AAC Technical Proceedings & Indian Patent Journal",
      citation: "Patent Application 201941002559",
      year: "2019",
      category: "Healthcare & Embedded",
      authors: ["Yelma Chethan Reddy", "Alence Abhinay", "B.S.V.S Anoop", "M Srikanth", "D. Naga pavan", "G Pradeep Reddy"],
      abstract: "Presents the architectural schema, firmware timing diagrams, and sensor validation for an automated electronic medication dispenser with multi-compartment replaceable layers and two-way confirmation.",
      keywords: ["biomedical", "medication compliance", "firmware", "iot healthcare"],
      link: "/Patents",
      type: "Technical Treatise",
    },
    {
      id: "smart-glove-translation",
      title: "Wearable Sensor-Fused Flex Matrix for Real-Time Sign Language Gesture Translation",
      journal: "AAC Assistive Tech Archive & Indian Patent Journal",
      citation: "Patent Application 202041038106",
      year: "2020",
      category: "Assistive Technology",
      authors: ["Jashwanth Kranthi Bopanna", "Santosh Sanjeev", "Bharath Varma Kantheti", "Gowtham Sai Ponnekanti", "Suhas Gangireddy", "G Pradeep Reddy"],
      abstract: "Details the design of a wearable smart glove combining flex sensor arrays and orientation telemetry to translate sign language gestures into synthesized speech and text with sub-25ms latency.",
      keywords: ["assistive tech", "wearables", "gesture recognition", "speech synthesis"],
      link: "/Patents",
      type: "Technical Treatise",
    },
  ];

  const displayPubs = publicationsData && publicationsData.length > 0 ? publicationsData : defaultPublications;

  const categories = [
    { id: "all", label: "All Publications" },
    { id: "Machine Learning", label: "Machine Learning" },
    { id: "Healthcare & Embedded", label: "Healthcare & Embedded" },
    { id: "Assistive Technology", label: "Assistive Tech" },
  ];

  const filteredPubs = displayPubs.filter((pub) => {
    const matchesSearch =
      (pub.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pub.journal || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(pub.authors) ? pub.authors.join(" ") : String(pub.authors || "")).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || pub.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Head>
        <title>RESEARCH PUBLICATIONS // AAC GRIET</title>
        <meta
          name="description"
          content="Peer-reviewed research publications, conference proceedings, and technical treatises from the Advanced Academic Center at GRIET"
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
              <FaFileAlt className="text-[10px]" />
              <span>Peer-Reviewed Literature &bull; AAC Archive</span>
            </div>

            <h1 className="font-extrabold text-4xl sm:text-6xl tracking-tighter leading-tight mb-4 text-[#EAF1FF] uppercase font-sans">
              Research <br />
              <span className="italic font-serif font-normal text-[#E5A93C] lowercase tracking-normal text-3xl sm:text-5xl">
                publications
              </span>{" "}
              &amp; Papers.
            </h1>

            <p className="text-sm sm:text-base text-[#9E988A] leading-relaxed font-sans font-normal">
              Scholarly journal papers, IEEE proceedings, and patentable technical treatises authored by student researchers and faculty advisors at GRIET.
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
                placeholder="Search by title, author, or journal..."
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

          {/* Publications List */}
          <div className="space-y-6">
            {filteredPubs.map((pub, idx) => (
              <div
                key={pub.id || idx}
                className="garcy-glass-card p-6 sm:p-8 flex flex-col justify-between hover:border-[#E5A93C]/70 transition-all duration-300 border border-white/15 shadow-xl bg-gradient-to-br from-[#111318] to-[#08090C]"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-xs font-mono">
                    <span className="text-[10px] font-bold text-[#E5A93C] px-2.5 py-0.5 rounded-full bg-[#08090C] border border-[#E5A93C]/30 uppercase">
                      {pub.category || "Research Paper"}
                    </span>
                    <span className="text-[#9E988A] flex items-center gap-2">
                      <FaCalendarAlt className="text-[10px]" />
                      <span>{pub.year}</span>
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-[#EAF1FF] mb-3 font-sans hover:text-[#E5A93C] transition-colors leading-snug">
                    {pub.title}
                  </h2>

                  <div className="text-xs font-mono text-[#9E988A] mb-3 flex items-center gap-2 flex-wrap">
                    <span className="text-[#EAF1FF] font-semibold">{pub.journal}</span>
                    {pub.citation && <span className="text-[#E5A93C]">&bull; {pub.citation}</span>}
                  </div>

                  <div className="text-xs font-sans text-[#9E988A] mb-4 flex items-center gap-2">
                    <FaUserGraduate className="text-[#E5A93C] flex-shrink-0" />
                    <span>
                      Authors:{" "}
                      <strong className="text-white">
                        {Array.isArray(pub.authors) ? pub.authors.join(", ") : pub.authors}
                      </strong>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#9E988A] leading-relaxed font-sans mb-6 pt-4 border-t border-white/10">
                    {pub.abstract || pub.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                    <span className="text-[#9E988A] uppercase text-[10px]">PEER-REVIEWED &bull; OPEN ACCESS</span>
                  </div>

                  {pub.link && (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#E5A93C] hover:text-white uppercase font-bold transition-colors"
                    >
                      <span>Access Publication</span>
                      <FaExternalLinkAlt className="text-[9px]" />
                    </a>
                  )}
                </div>
              </div>
            ))}

            {filteredPubs.length === 0 && (
              <div className="text-center py-16 text-[#9E988A] font-mono text-sm">
                No publications found matching your filter criteria.
              </div>
            )}
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
