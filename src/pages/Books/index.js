import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import BackgroundVideo from "@/components/BackgroundVideo";
import GarcyNavbar from "@/components/garcy/GarcyNavbar";
import GarcyFooter from "@/components/garcy/GarcyFooter";
import GarcyCommandPalette from "@/components/garcy/GarcyCommandPalette";
import GarcyCaseStudies from "@/components/garcy/GarcyCaseStudies";
import { useDatabase } from "@/hooks/useDatabase";
import booksData from "@/components/Data/booksData";
import {
  FaBook,
  FaSearch,
  FaCalendarAlt,
  FaUserGraduate,
  FaExternalLinkAlt,
  FaTimes,
} from "react-icons/fa";

export default function BooksPage() {
  const { data: dbBooks } = useDatabase("books");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);

  const displayBooks = dbBooks && dbBooks.length > 0 ? dbBooks : booksData;

  const categories = [
    { id: "all", label: "All Treatises" },
    { id: "Game Development", label: "Game Dev" },
    { id: "Programming", label: "Python & Programming" },
    { id: "Machine Learning", label: "Machine Learning" },
    { id: "IoT", label: "IoT" },
    { id: "Java Programming", label: "Java" },
  ];

  const filteredBooks = displayBooks.filter((book) => {
    const titleMatch = (book.title || "").toLowerCase().includes(searchTerm.toLowerCase());
    const authorMatch = (Array.isArray(book.authors) ? book.authors.join(" ") : String(book.authors || ""))
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryMatch = selectedCategory === "all" || book.category === selectedCategory;
    return (titleMatch || authorMatch) && categoryMatch;
  });

  return (
    <>
      <Head>
        <title>TECHNICAL BOOKS &amp; TREATISES // AAC GRIET</title>
        <meta
          name="description"
          content="Student-authored technical books, programming treatises, and engineering guides published at Advanced Academic Center, GRIET."
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
              <FaBook className="text-[10px]" />
              <span>Authored Literature &bull; AAC Press</span>
            </div>

            <h1 className="font-extrabold text-4xl sm:text-6xl tracking-tighter leading-tight mb-4 text-[#EAF1FF] uppercase font-sans">
              Books &amp; <br />
              <span className="italic font-serif font-normal text-[#49A3FF] lowercase tracking-normal text-3xl sm:text-5xl">
                treatises
              </span>{" "}
              Archived.
            </h1>

            <p className="text-sm sm:text-base text-[#8793A8] leading-relaxed font-sans font-normal">
              Technical treatises, programming guides, and engineering deep-dives documented and published by AAC student researchers.
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
                placeholder="Search by book title or author..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#080B12] border border-white/10 text-xs font-mono text-white placeholder-[#8793A8]/60 focus:outline-none focus:border-[#1769FF]"
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
                      ? "bg-[#1769FF] text-white font-bold"
                      : "text-[#8793A8] hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Books Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                onClick={() => setSelectedBook(book)}
                className="garcy-glass-card p-6 flex flex-col justify-between hover:border-[#1769FF]/70 transition-all duration-300 group hover:-translate-y-1 cursor-pointer border border-white/15 shadow-xl bg-gradient-to-br from-[#101725] to-[#080B12]"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono uppercase text-[#8793A8] mb-4">
                    <span className="text-[9.5px] font-bold text-[#49A3FF] px-2.5 py-0.5 rounded-full bg-[#080B12] border border-[#1769FF]/30">
                      {book.category}
                    </span>
                    <span className="text-[#8793A8] font-mono text-[10px] flex items-center gap-1">
                      <FaCalendarAlt className="text-[9px]" />
                      <span>{book.year}</span>
                    </span>
                  </div>

                  {/* Book Cover Image */}
                  {book.cover && (
                    <div className="w-full h-48 rounded-xl overflow-hidden mb-5 border border-white/10 bg-[#080B12] flex items-center justify-center relative">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  )}

                  <h2 className="text-lg font-bold text-[#EAF1FF] mb-2 font-sans group-hover:text-[#49A3FF] transition-colors leading-snug">
                    {book.title}
                  </h2>

                  <p className="text-xs text-[#8793A8] leading-relaxed font-sans line-clamp-3 mb-6 font-normal">
                    {book.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#8793A8]">
                  <span className="group-hover:text-white transition-colors flex items-center gap-1.5 uppercase font-bold text-[10px]">
                    <span>Inspect Treatise</span>
                    <span className="text-[#49A3FF]">&rarr;</span>
                  </span>

                  <span className="text-[9.5px] font-mono text-[#49A3FF] uppercase font-bold">
                    AAC AUTHOR
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-16 text-[#8793A8] font-mono text-sm">
              No books found matching your filter criteria.
            </div>
          )}
        </section>

        {/* Book Details Modal */}
        {selectedBook && (
          <div
            className="fixed inset-0 z-[160] bg-[#080B12]/90 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedBook(null)}
          >
            <div
              className="garcy-glass-card max-w-2xl w-full p-6 sm:p-8 text-left relative border border-[#1769FF]/60 shadow-[0_0_60px_rgba(23,105,255,0.4)] my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between text-xs font-mono uppercase text-[#49A3FF] mb-5 font-bold">
                <span>{selectedBook.category} // BOOK TREATISE</span>
                <button
                  type="button"
                  onClick={() => setSelectedBook(null)}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-[#8793A8] hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Close"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 mb-6">
                {selectedBook.cover && (
                  <div className="w-full sm:w-44 h-56 rounded-xl overflow-hidden border border-white/15 bg-black flex-shrink-0">
                    <img
                      src={selectedBook.cover}
                      alt={selectedBook.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="text-2xl font-extrabold text-[#EAF1FF] font-sans mb-2">
                    {selectedBook.title}
                  </h3>
                  <div className="text-xs font-mono text-[#49A3FF] font-bold mb-4">
                    Published: {selectedBook.year} &bull; {selectedBook.category}
                  </div>
                  <div className="text-xs font-mono text-[#8793A8] uppercase mb-2">Authors:</div>
                  <div className="space-y-1.5 text-xs text-[#EAF1FF] font-sans">
                    {Array.isArray(selectedBook.authors) ? (
                      selectedBook.authors.map((a, i) => (
                        <div key={i} className="text-xs text-[#8793A8] leading-relaxed">
                          &bull; {a}
                        </div>
                      ))
                    ) : (
                      <div>{selectedBook.authors}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="text-[10px] font-mono uppercase text-[#8793A8] tracking-wider mb-2 font-semibold">
                  Treatise Overview:
                </div>
                <p className="text-xs sm:text-sm text-[#8793A8] leading-relaxed font-sans">
                  {selectedBook.description}
                </p>
              </div>
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
