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
  FaLightbulb,
  FaSearch,
  FaTimes,
  FaCalendarAlt,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaFileContract,
} from "react-icons/fa";

export default function PatentsPage() {
  const { data: patentsData } = useDatabase("patents");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedPatent, setSelectedPatent] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);

  const defaultPatents = [
    {
      id: "automated-pill-reminder",
      title: "Automated Electronic Pill Reminder Device (Patent 201941002559)",
      shortTitle: "Automated Electronic Pill Reminder Device",
      category: "Biomedical Devices",
      status: "OFFICIALLY PUBLISHED",
      patentOffice: "Indian Patent Office",
      applicationNumber: "201941002559",
      date: "2019",
      image: "/images/AAC1.png",
      registry: "Indian Patent Office & AAC IP Cell",
      inventors: [
        "Yelma Chethan Reddy",
        "Alence Abhinay",
        "B.S.V.S Anoop",
        "M Srikanth",
        "D. Naga pavan",
        "G Pradeep Reddy",
      ],
      description:
        "An innovative automated electronic device reminding consumption of pills scheduled and missed schedules with two-way confirmation and modular replaceable compartment layers.",
    },
    {
      id: "smart-glove-sign-language",
      title: "Smart Glove for Sign Language Translation (Patent 202041038106)",
      shortTitle: "Smart Glove for Sign Language Translation",
      category: "Assistive Technology",
      status: "OFFICIALLY PUBLISHED",
      patentOffice: "Indian Patent Office",
      applicationNumber: "202041038106",
      date: "2020",
      image: "/images/AAC3.png",
      registry: "Indian Patent Office & AAC IP Cell",
      inventors: [
        "Jashwanth Kranthi Bopanna",
        "Santosh Sanjeev",
        "Bharath Varma Kantheti",
        "Gowtham Sai Ponnekanti",
        "Suhas Gangireddy",
        "G Pradeep Reddy",
      ],
      description:
        "Wearable sensor glove mapping 5-finger flex angles and inertial telemetry to synthesize sign language into real-time spoken audio and on-screen text.",
    },
    {
      id: "uav-collision-avoidance",
      title: "Autonomous Collision-Avoidance Aerial Quadcopter Array",
      shortTitle: "Autonomous Collision-Avoidance Drone Array",
      category: "Robotics & Drones",
      status: "PUBLICATION PENDING",
      patentOffice: "Indian Patent Office",
      applicationNumber: "202341018942",
      date: "2023",
      image: "/images/pic.webp",
      registry: "AAC Autonomous Systems Cell",
      inventors: ["AAC UAV Team", "Faculty Advisory", "Student Fellows"],
      description:
        "Distributed multi-sensor proximity mesh and low-latency flight computer for autonomous swarm collision avoidance in tight indoor corridors without GPS telemetry.",
    },
    {
      id: "solar-micro-inverter",
      title: "Solar Micro-Inverter with Peer-to-Peer Load Balancing",
      shortTitle: "Solar Micro-Inverter with P2P Balancing",
      category: "Clean Energy & IoT",
      status: "PROVISIONAL FILED",
      patentOffice: "Indian Patent Office",
      applicationNumber: "202241045120",
      date: "2022",
      image: "/images/8.webp",
      registry: "Renewable Energy Lab",
      inventors: ["AAC Energy Fellows", "Dr. J Praveen"],
      description:
        "High-efficiency bidirectional inverter unit coordinating decentralized microgrid energy routing across neighboring educational laboratory blocks.",
    },
    {
      id: "wearable-ecg-patch",
      title: "Low-Cost Wearable ECG Telemetry Patch with Edge Neural Filter",
      shortTitle: "Wearable ECG Telemetry Patch",
      category: "Biomedical Devices",
      status: "APPLICATION FILED",
      patentOffice: "Indian Patent Office",
      applicationNumber: "202441029810",
      date: "2024",
      image: "/images/AAC2.png",
      registry: "Biomedical Engineering Unit",
      inventors: ["Wearables Group", "AAC Fellows"],
      description:
        "Skin-adherent dual-electrode physiological sensor patch featuring on-device neuromorphic noise suppression for continuous clinical arrhythmia telemetry.",
    },
    {
      id: "optical-fruit-scanner",
      title: "Contactless Optical Fruit Freshness & Ripeness Scanner",
      shortTitle: "Contactless Optical Ripeness Scanner",
      category: "AgriTech & Sensing",
      status: "APPLICATION FILED",
      patentOffice: "Indian Patent Office",
      applicationNumber: "202341067219",
      date: "2023",
      image: "/images/pic.webp",
      registry: "AgriTech Sensing Lab",
      inventors: ["Precision Agri Team", "Student Fellows"],
      description:
        "Multi-wavelength spectrophotometric handheld device computing Brix sugar levels and shelf-life indices without puncturing or damaging organic produce.",
    },
  ];

  const displayPatents =
    patentsData && patentsData.length > 0 ? patentsData : defaultPatents;

  const categories = [
    { id: "all", label: "All Patents" },
    { id: "Biomedical Devices", label: "Biomedical Devices" },
    { id: "Assistive Technology", label: "Assistive Tech" },
    { id: "Robotics & Drones", label: "Robotics & Drones" },
    { id: "Clean Energy & IoT", label: "Clean Energy & IoT" },
    { id: "AgriTech & Sensing", label: "AgriTech" },
  ];

  const availableYears = useMemo(() => {
    const years = new Set();
    displayPatents.forEach((item) => {
      const match = (item.date || "").match(/\b(20\d\d)\b/);
      if (match) years.add(match[1]);
      else if (item.publishedAt) years.add(new Date(item.publishedAt).getFullYear().toString());
    });
    return ["all", ...Array.from(years).sort((a, b) => b.localeCompare(a))];
  }, [displayPatents]);

  const filtered = useMemo(() => {
    return displayPatents.filter((item) => {
      const title = (item.title || item.shortTitle || "").toLowerCase();
      const desc = (item.description || "").toLowerCase();
      const appNo = (item.applicationNumber || "").toLowerCase();
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch = !q || title.includes(q) || desc.includes(q) || appNo.includes(q);

      const matchesCat =
        selectedCategory === "all" || item.category === selectedCategory;

      let itemYear = "";
      const match = (item.date || "").match(/\b(20\d\d)\b/);
      if (match) itemYear = match[1];
      else if (item.publishedAt) itemYear = new Date(item.publishedAt).getFullYear().toString();

      const matchesYear = selectedYear === "all" || itemYear === selectedYear;

      return matchesSearch && matchesCat && matchesYear;
    });
  }, [displayPatents, searchTerm, selectedCategory, selectedYear]);

  return (
    <>
      <Head>
        <title>PATENTS &amp; IP PORTFOLIO // AAC GRIET</title>
        <meta
          name="description"
          content="Official Indian Patent Office application filings and intellectual property disclosures created by AAC GRIET."
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
              <FaLightbulb className="text-[10px]" />
              <span>Intellectual Property Cell &bull; Published Patents</span>
            </div>

            <h1 className="font-extrabold text-4xl sm:text-6xl tracking-tighter leading-tight mb-4 text-[#EAF1FF] uppercase font-sans">
              Patents &amp; Intellectual <br />
              <span className="italic font-serif font-normal text-[#E5A93C] lowercase tracking-normal text-3xl sm:text-5xl">
                property
              </span>{" "}
              Portfolio.
            </h1>

            <p className="text-sm sm:text-base text-[#9E988A] leading-relaxed font-sans font-normal mb-8">
              Official Indian Patent Office filings spanning automated pharmaceutical dispensers, sign language translating wearables, autonomous drone arrays, and optical scanners.
            </p>

            {/* Interactive Search Bar */}
            <div className="relative max-w-lg mx-auto mb-6">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E988A] text-xs pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by patent title, application number, or keyword..."
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
              Showing <span className="text-[#E5A93C] font-bold">{filtered.length}</span> of {displayPatents.length} patents
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
            <Garcy3DZoomGallery items={filtered} category="patents" />
          </div>

          {/* Detailed Patent Cards Grid */}
          <div className="pt-8 border-t border-white/10">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white uppercase font-sans tracking-tight mb-6 text-center sm:text-left">
              Patent Registry Dossiers
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((patent) => (
                <div
                  key={patent.id}
                  onClick={() => setSelectedPatent(patent)}
                  className="garcy-glass-card p-6 flex flex-col justify-between hover:border-[#E5A93C]/70 transition-all duration-300 group hover:-translate-y-1 cursor-pointer border border-white/15 shadow-xl bg-gradient-to-br from-[#111318] to-[#08090C]"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase mb-4">
                      <span className="text-[#9E988A] font-bold truncate max-w-[170px]">
                        {patent.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#08090C] text-[#E5A93C] border border-[#E5A93C]/40 text-[8.5px] font-bold">
                        {patent.status}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#EAF1FF] mb-2 font-sans group-hover:text-[#E5A93C] transition-colors leading-snug">
                      {patent.shortTitle || patent.title}
                    </h3>

                    <div className="p-2.5 rounded-lg bg-[#08090C]/80 border border-white/10 text-[10px] font-mono text-[#9E988A] mb-4 space-y-0.5">
                      <div className="text-white font-bold">App No. {patent.applicationNumber}</div>
                      <div className="text-[#E5A93C]">{patent.patentOffice} &bull; {patent.date}</div>
                    </div>

                    <p className="text-xs text-[#9E988A] leading-relaxed font-sans font-normal line-clamp-3 mb-6">
                      {patent.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#9E988A]">
                    <span className="group-hover:text-[#E5A93C] transition-colors flex items-center gap-1.5 uppercase font-bold text-[10px]">
                      <span>Inspect Claims</span>
                      <span>&rarr;</span>
                    </span>
                    <span className="text-[9px] font-mono text-[#10b981]">VERIFIED IP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Patent Modal Dossier */}
        {selectedPatent && (
          <div
            className="fixed inset-0 z-50 bg-[#08090C]/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedPatent(null)}
          >
            <div
              className="garcy-glass-card max-w-2xl w-full p-6 sm:p-8 text-left relative border border-[#E5A93C]/50 shadow-[0_0_50px_rgba(229,169,60,0.35)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#E5A93C]/20 border border-[#E5A93C]/40 text-[#E5A93C] font-bold">
                  {selectedPatent.category}
                </span>
                <span className="text-[10px] font-mono text-[#9E988A]">
                  {selectedPatent.patentOffice} &bull; {selectedPatent.date}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-4 font-sans leading-snug">
                {selectedPatent.title}
              </h2>

              <div className="p-3 rounded-xl bg-[#08090C] border border-white/10 font-mono text-xs text-[#9E988A] mb-5">
                <span className="text-white font-bold block mb-1">
                  Application Number: {selectedPatent.applicationNumber}
                </span>
                <span>Status: <strong className="text-[#10b981]">{selectedPatent.status}</strong></span>
              </div>

              <div className="mb-5">
                <h4 className="text-xs font-mono text-[#E5A93C] uppercase tracking-wider font-bold mb-2">
                  Technical Abstract &amp; Specifications
                </h4>
                <p className="text-xs sm:text-sm text-[#9E988A] leading-relaxed font-sans">
                  {selectedPatent.description}
                </p>
              </div>

              {selectedPatent.inventors && (
                <div className="mb-6">
                  <h4 className="text-xs font-mono text-[#E5A93C] uppercase tracking-wider font-bold mb-2">
                    Inventor Registry
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPatent.inventors.map((inv) => (
                      <span
                        key={inv}
                        className="px-2.5 py-1 rounded-lg bg-[#111318] border border-white/10 text-white font-mono text-[10px]"
                      >
                        {inv}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedPatent(null)}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-[#9E988A] uppercase transition-colors"
                >
                  Close Dossier
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPatent(null)}
                className="absolute top-4 right-4 text-[#9E988A] hover:text-white text-base p-1"
                aria-label="Close"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        )}

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
