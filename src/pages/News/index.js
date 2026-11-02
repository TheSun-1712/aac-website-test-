import { useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import BackgroundVideo from "@/components/BackgroundVideo";
import GarcyNavbar from "@/components/garcy/GarcyNavbar";
import GarcyFooter from "@/components/garcy/GarcyFooter";
import GarcyCommandPalette from "@/components/garcy/GarcyCommandPalette";
import GarcyCaseStudies from "@/components/garcy/GarcyCaseStudies";
import { useDatabase } from "@/hooks/useDatabase";
import {
  FaRegNewspaper,
  FaSearch,
  FaCalendarAlt,
  FaTag,
  FaExternalLinkAlt,
  FaArrowRight,
} from "react-icons/fa";

export default function NewsPage() {
  const { data: dbNews } = useDatabase("news");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
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

  const filteredNews = newsList.filter((item) => {
    const titleMatch = (item.title || "").toLowerCase().includes(searchTerm.toLowerCase());
    const contentMatch = (item.content || item.description || "").toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch =
      activeCategory === "All" ||
      (item.categories || item.category || "").toUpperCase() === activeCategory.toUpperCase();
    return (titleMatch || contentMatch) && categoryMatch;
  });

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
          <div className="text-center max-w-3xl mx-auto mb-14">
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

            <p className="text-sm sm:text-base text-[#9E988A] leading-relaxed font-sans font-normal">
              Stay synchronized with the latest research breakthroughs, symposium recaps, and competition victories from the Advanced Academic Center.
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
                placeholder="Search news..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#08090C] border border-white/10 text-xs font-mono text-white placeholder-[#9E988A]/60 focus:outline-none focus:border-[#E5A93C]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-[#E5A93C] text-white font-bold"
                      : "text-[#9E988A] hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* News Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <div
                key={item.id || item._id}
                className="garcy-glass-card p-6 sm:p-7 flex flex-col justify-between hover:border-[#E5A93C]/70 transition-all duration-300 group hover:-translate-y-1 border border-white/15 shadow-xl bg-gradient-to-br from-[#111318] to-[#08090C]"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono uppercase text-[#9E988A] mb-4">
                    <span className="text-[9.5px] font-bold text-[#E5A93C] px-2.5 py-0.5 rounded-full bg-[#08090C] border border-[#E5A93C]/30">
                      {item.categories || item.category || "UPDATE"}
                    </span>
                    <span className="text-[#9E988A] font-mono text-[10px] flex items-center gap-1">
                      <FaCalendarAlt className="text-[9px]" />
                      <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                    </span>
                  </div>

                  {item.image && (
                    <div className="w-full h-44 rounded-xl overflow-hidden mb-4 border border-white/10 bg-[#08090C]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <h2 className="text-lg font-bold text-[#EAF1FF] mb-2 font-sans group-hover:text-[#E5A93C] transition-colors leading-snug">
                    {item.title}
                  </h2>

                  <p className="text-xs text-[#9E988A] leading-relaxed font-sans line-clamp-3 mb-6 font-normal">
                    {item.content || item.description || item._rawBody}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#9E988A]">
                  <span className="text-[9.5px] text-[#E5A93C] font-bold uppercase">
                    AAC BULLETIN
                  </span>
                  <span className="text-[9.5px] text-[#9E988A]">GRIET HYDERABAD</span>
                </div>
              </div>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-16 text-[#9E988A] font-mono text-sm">
              No news articles found matching your search.
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
