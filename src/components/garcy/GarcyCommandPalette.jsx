import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaSearch, FaTimes, FaExternalLinkAlt } from "react-icons/fa";

export default function GarcyCommandPalette({ isOpen, onClose }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const directoryItems = [
    { title: "R&D Projects & Prototypes", path: "/projects", category: "Hardware", desc: "Autonomous drones, rovers, and sensor devices." },
    { title: "Patents & Intellectual Property", path: "/Patents", category: "IP", desc: "50+ patents filed by students and faculty." },
    { title: "Gprime 2026 Results & Solutions", path: "/gprime2026-results", category: "Contest", desc: "Live leaderboards and editorial challenge solutions." },
    { title: "IEEE & Scopus Publications", path: "/Publications", category: "Papers", desc: "Peer-reviewed scientific research index." },
    { title: "Annual Expo & Events", path: "/Events", category: "Expo", desc: "Opulence prototype exhibitions and seminars." },
    { title: "Student Startups & Ventures", path: "/Startups", category: "Ventures", desc: "Commercialized engineering spinoffs." },
    { title: "Research Focus Areas", path: "/Research", category: "Labs", desc: "IoT, Machine Learning, and embedded systems." },
    { title: "AAC Core Administration", path: "/Administration", category: "Team", desc: "Faculty advisors and student committee heads." },
    { title: "Alumni Network & Careers", path: "/Alumni", category: "Team", desc: "Graduates working at top global technology firms." },
    { title: "National Achievements", path: "/Achievements", category: "Awards", desc: "Hackathon wins and government honors." },
    { title: "Published Books & Manuals", path: "/Books", category: "Literature", desc: "Engineering monographs authored at AAC." },
    { title: "About AAC & Griet", path: "/About", category: "About", desc: "History, founding principles, and campus facilities." },
  ];

  const categories = ["all", "Hardware", "IP", "Contest", "Papers", "Expo", "Ventures"];

  const filtered = directoryItems.filter((item) => {
    const matchesFilter = selectedFilter === "all" || item.category === selectedFilter;
    const matchesQuery =
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  // Keyboard navigation for Search (ArrowUp, ArrowDown, Enter, Esc)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        router.push(filtered[selectedIndex].path);
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose, router]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[150] bg-[#08090C]/85 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-[#111318]/95 rounded-2xl relative border border-[#E5A93C]/40 shadow-[0_0_50px_rgba(229, 169, 60,0.35)] flex flex-col md:flex-row max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Column: Authentic 3D Floppy Disk Model */}
        <div className="hidden md:flex flex-col items-center justify-between p-6 bg-gradient-to-b from-[#131d30] to-[#0a0f18] border-r border-white/10 w-72 flex-shrink-0">
          <div className="w-full text-left">
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#E5A93C] bg-[#08090C] px-2.5 py-1 rounded-full border border-[#E5A93C]/40 font-bold">
              // ARCHIVE MEDIA
            </span>
            <h3 className="text-sm font-extrabold text-[#EAF1FF] font-sans mt-3 uppercase tracking-tight">
              AAC 3.5&quot; Floppy Disk
            </h3>
            <p className="text-[10.5px] font-mono text-[#9E988A] mt-1 leading-snug">
              Autonomous Systems &amp; R&amp;D Repository 2026
            </p>
          </div>

          {/* Detailed CSS 3D Floppy Disk Artifact */}
          <div className="my-6 transform hover:rotate-6 transition-transform duration-500">
            <div className="floppy-model" style={{ "--u": "0.75px" }}>
              <div className="floppy-face floppy-front relative">
                {/* Metallic Shutter */}
                <div className="floppy-shutter">
                  <div className="absolute right-[12%] top-[12%] w-[20%] h-[74%] rounded-[1px] bg-[#1a1c1e] shadow-inner" />
                </div>

                {/* Floppy Label */}
                <div className="floppy-label">
                  <div className="text-[8px] font-mono font-bold tracking-wider text-black">
                    AAC GRIET // DISK 01
                  </div>
                  <div className="my-1 border-b border-black/20" />
                  <div className="text-[7px] font-mono text-black/80">
                    <div>FORMAT: 1.44MB R&amp;D</div>
                    <div>SECTORS: 12 INDEXED</div>
                  </div>
                  <div className="mt-2 h-2.5 bg-repeating-linear-gradient-[90deg,#000_0_2px,transparent_2px_4px]" />
                </div>

                {/* Write protect notch */}
                <div className="absolute bottom-2 right-2 w-2 h-2 bg-black rounded-xs" />
                <div className="absolute bottom-2 left-2 w-2 h-2 bg-black rounded-xs" />
              </div>
            </div>
          </div>

          <div className="w-full text-center text-[9px] font-mono uppercase text-[#9E988A]">
            Press &uarr; &darr; to navigate &bull; ENTER to select
          </div>
        </div>

        {/* Right Column: Search & Results Directory */}
        <div className="flex-1 flex flex-col p-4 sm:p-6 overflow-hidden">
          {/* Top Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E5A93C] animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#EAF1FF] font-bold">
                AAC Archive &bull; Command Search
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 text-[#9E988A] hover:text-white flex items-center justify-center text-xs transition-colors"
              aria-label="Close"
            >
              <FaTimes />
            </button>
          </div>

          {/* Search Input Bar */}
          <div className="flex items-center gap-3 py-3 border-b border-white/10">
            <FaSearch className="text-[#9E988A] text-sm flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Search 12 AAC modules (e.g., Drones, Gprime, Patents)..."
              className="w-full bg-transparent border-0 text-[#EAF1FF] placeholder-[#9E988A]/60 focus:outline-none text-sm font-sans"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-[10px] font-mono uppercase text-[#9E988A] hover:text-white"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 py-3 overflow-x-auto border-b border-white/5 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedFilter(cat);
                  setSelectedIndex(0);
                }}
                className={`px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider transition-all flex-shrink-0 ${
                  selectedFilter === cat
                    ? "bg-[#E5A93C] text-white font-bold"
                    : "bg-white/5 text-[#9E988A] hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="overflow-y-auto flex-1 pr-1 space-y-1.5 mt-3">
            {filtered.length > 0 ? (
              filtered.map((item, idx) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={onClose}
                  className={`group flex items-center justify-between p-3 rounded-xl border transition-all ${
                    selectedIndex === idx
                      ? "bg-[#E5A93C]/20 border-[#E5A93C] translate-x-1"
                      : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="min-w-0 pr-4">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[8.5px] font-mono uppercase px-2 py-0.5 rounded bg-[#08090C] text-[#E5A93C] border border-[#E5A93C]/30 font-bold">
                        {item.category}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-[#EAF1FF] group-hover:text-[#E5A93C] transition-colors truncate">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-[#9E988A] font-sans truncate">
                      {item.desc}
                    </p>
                  </div>

                  <div className="text-xs font-mono text-[#9E988A] group-hover:text-[#E5A93C] flex items-center gap-1.5 flex-shrink-0">
                    <span className="text-[9px] uppercase hidden sm:inline">SELECT</span>
                    <FaExternalLinkAlt className="text-[9px]" />
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-12 text-[#9E988A] font-mono text-xs">
                No matching records found for &ldquo;{query}&rdquo;
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
