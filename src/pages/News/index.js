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
  FaRegNewspaper,
  FaSearch,
  FaTimes,
  FaFilter,
} from "react-icons/fa";

export default function NewsPage() {
  const { data: dbNews } = useDatabase("news");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);

  const fallbackNews = [
    {
      id: "national-hackathon-win",
      title: "AAC Students Win National Hackathon with Innovative IoT Health System",
      slug: "aac-students-win-national-hackathon",
      content:
        "The Advanced Academic Center team has achieved remarkable success at the National Hackathon. Our students presented an innovative healthcare monitoring system that uses IoT sensors and machine learning algorithms to predict health issues before they become critical.",
      publishedAt: "2024-03-15T00:00:00.000Z",
      categories: "ACHIEVEMENT",
      image: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100162/AAC-web/news_events/Juniorshackathon2_opwpyj.jpg",
    },
    {
      id: "microsoft-partnership",
      title: "New AI Research Collaboration with Industry Leaders",
      slug: "new-research-partnership-industry",
      content:
        "AAC announces an expanded research initiative focusing on applied artificial intelligence in engineering education and low-latency computer vision pipelines.",
      publishedAt: "2024-02-20T00:00:00.000Z",
      categories: "RESEARCH",
      image: "https://res.cloudinary.com/aacgriet/image/upload/v1730537987/AAC-web/news_events/expo2023/wxvfrd1n979puot2zgny.jpg",
    },
    {
      id: "nrsc-mou-announcement",
      title: "Official R&D Strategic Alliance with NRSC (ISRO)",
      slug: "nrsc-mou-announcement",
      content:
        "GRIET Advanced Academic Center solidifies long-term scientific partnership with the National Remote Sensing Centre for student research into satellite data and geospatial analytics.",
      publishedAt: "2024-01-10T00:00:00.000Z",
      categories: "PARTNERSHIP",
      image: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100167/AAC-web/news_events/nrsc5_e8it62.jpg",
    },
  ];

  const newsList = dbNews && dbNews.length > 0 ? dbNews : fallbackNews;

  const categories = ["All", "ACHIEVEMENT", "RESEARCH", "PARTNERSHIP"];

  // Extract distinct years dynamically
  const availableYears = useMemo(() => {
    const years = new Set();
    newsList.forEach((item) => {
      let yr = "";
      if (item.publishedAt) yr = new Date(item.publishedAt).getFullYear().toString();
      else if (item.date) {
        const match = item.date.match(/\b(20\d\d)\b/);
        if (match) yr = match[1];
      }
      if (yr) years.add(yr);
    });
    return ["all", ...Array.from(years).sort((a, b) => b.localeCompare(a))];
  }, [newsList]);

  const filteredNews = useMemo(() => {
    return newsList.filter((item) => {
      const q = searchTerm.toLowerCase().trim();
      const titleMatch = !q || (item.title || "").toLowerCase().includes(q);
      const contentMatch = !q || (item.content || item.description || "").toLowerCase().includes(q);

      const categoryMatch =
        activeCategory === "All" ||
        (item.categories || item.category || "").toUpperCase() === activeCategory.toUpperCase();

      let itemYear = "";
      if (item.publishedAt) itemYear = new Date(item.publishedAt).getFullYear().toString();
      else if (item.date) {
        const match = item.date.match(/\b(20\d\d)\b/);
        if (match) itemYear = match[1];
      }
      const yearMatch = selectedYear === "all" || itemYear === selectedYear;

      return (titleMatch || contentMatch) && categoryMatch && yearMatch;
    });
  }, [newsList, searchTerm, activeCategory, selectedYear]);

  return (
    <>
      <Head>
        <title>NEWS &amp; ANNOUNCEMENTS // AAC GRIET</title>
        <meta
          name="description"
          content="Latest announcements, hackathon victories, research breakthroughs, and institutional updates from AAC GRIET."
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
              <FaRegNewspaper className="text-[10px]" />
              <span>Center News &bull; Press &amp; Updates</span>
            </div>

            <h1 className="font-extrabold text-4xl sm:text-6xl tracking-tighter leading-tight mb-4 text-[#EAF1FF] uppercase font-sans">
              News &amp; <br />
              <span className="italic font-serif font-normal text-[#E5A93C] lowercase tracking-normal text-3xl sm:text-5xl">
                announcements
              </span>{" "}
              Live.
            </h1>

            <p className="text-sm sm:text-base text-[#9E988A] leading-relaxed font-sans font-normal mb-8">
              Stay synchronized with the latest research breakthroughs, symposium recaps, and competition victories from the Advanced Academic Center.
            </p>

            {/* Interactive Search Bar */}
            <div className="relative max-w-lg mx-auto mb-6">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E988A] text-xs pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search news by title or keyword..."
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
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      activeCategory === cat
                        ? "bg-[#E5A93C] text-[#08090C] font-bold shadow-md"
                        : "bg-[#111318] text-[#9E988A] hover:text-white border border-[#2A261F]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Year-Wise Filter Pills */}
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
                Showing <span className="text-[#E5A93C] font-bold">{filteredNews.length}</span> of {newsList.length} articles
              </div>
            </div>
          </div>

          {/* 3D Zoom Fly-Through Gallery */}
          <div className="mb-14">
            <Garcy3DZoomGallery
              items={filteredNews}
              category="news"
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
