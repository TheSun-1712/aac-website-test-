import React, { useState, useEffect, useRef } from "react";
import {
  FaTerminal,
  FaBroadcastTower,
  FaCalendarAlt,
  FaTag,
  FaSearch,
  FaCheckCircle,
  FaChevronRight,
  FaKeyboard,
  FaFileAlt,
  FaExternalLinkAlt,
  FaShareAlt,
  FaCopy,
} from "react-icons/fa";

export default function GarcyNewsTerminal({ newsList = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filterCategory, setFilterCategory] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const wireListRef = useRef(null);

  // Filtered news items
  const filteredItems = newsList.filter((item) => {
    const titleMatch = (item.title || "").toLowerCase().includes(searchTerm.toLowerCase());
    const contentMatch = (item.content || item.description || "").toLowerCase().includes(searchTerm.toLowerCase());
    const catMatch =
      filterCategory === "ALL" ||
      (item.categories || item.category || "").toUpperCase() === filterCategory.toUpperCase();
    return (titleMatch || contentMatch) && catMatch;
  });

  // Clamp selection index if list changes
  useEffect(() => {
    if (selectedIndex >= filteredItems.length) {
      setSelectedIndex(Math.max(0, filteredItems.length - 1));
    }
  }, [filteredItems.length, selectedIndex]);

  // Keyboard navigation: Arrow Up / Arrow Down
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't capture arrow keys if user is typing in an input
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(filteredItems.length - 1, prev + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(0, prev - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredItems.length]);

  // Auto-scroll active wire item into view
  useEffect(() => {
    if (wireListRef.current) {
      const activeEl = wireListRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  const activeItem = filteredItems[selectedIndex] || filteredItems[0] || null;

  const formatDate = (dateStr) => {
    if (!dateStr) return "2026.01.01";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return String(dateStr).slice(0, 10);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${yyyy}.${mm}.${dd}`;
    } catch {
      return "2026.01.01";
    }
  };

  const handleCopyRef = (item) => {
    const refCode = `AAC-DISPATCH-${item.id || item.slug || "ARCHIVE"}`;
    navigator.clipboard?.writeText(refCode);
    setCopiedId(item.id || "copied");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = ["ALL", "ACHIEVEMENT", "RESEARCH", "PARTNERSHIP"];

  return (
    <div className="w-full bg-[#08090C] border border-[#2A261F] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col transition-all">
      {/* ====================================================================
          TERMINAL HEADER / TELEMETRY STATUS BAR
          ==================================================================== */}
      <div className="bg-[#111318] border-b border-[#2A261F] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        {/* Left: Terminal Identification */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="h-4 w-px bg-[#2A261F]" />
          <div className="flex items-center gap-2 text-white">
            <FaTerminal className="text-[#E5A93C] text-xs" />
            <span className="font-bold tracking-wider text-xs">AAC COMMAND WIRE // TELETYPE FEED</span>
          </div>
          <span className="hidden md:inline-block px-2 py-0.5 rounded bg-[#E5A93C]/10 border border-[#E5A93C]/30 text-[#E5A93C] text-[10px] uppercase font-bold tracking-widest">
            CIPHER: AES-GCM-256
          </span>
        </div>

        {/* Right: Live Telemetry Status */}
        <div className="flex items-center gap-4 text-[#9E988A] text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-bold uppercase tracking-wider">FEED ACTIVE</span>
          </div>
          <span className="hidden sm:inline">BAUD: 115200</span>
          <span className="hidden lg:inline">DISPATCHES: {filteredItems.length}</span>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#08090C] border border-[#2A261F] text-[#9E988A]">
            <FaKeyboard className="text-[10px] text-[#E5A93C]" />
            <span className="text-[10px]">NAV: ↑ / ↓ KEYS</span>
          </div>
        </div>
      </div>

      {/* ====================================================================
          SUB-HEADER: FILTERS & SEARCH STRIP
          ==================================================================== */}
      <div className="bg-[#0c0e12] border-b border-[#2A261F] px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Category Toggles */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[10px] font-mono text-[#9E988A] uppercase mr-1 hidden sm:inline">
            // CHANNEL:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setFilterCategory(cat);
                setSelectedIndex(0);
              }}
              className={`px-3 py-1 rounded text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                filterCategory === cat
                  ? "bg-[#E5A93C] text-[#08090C] font-extrabold shadow-[0_0_12px_rgba(229,169,60,0.4)]"
                  : "bg-[#111318] text-[#9E988A] hover:text-white border border-[#2A261F] hover:border-white/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9E988A] text-[11px]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="FILTER TELEGRAMS..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#111318] border border-[#2A261F] text-xs font-mono text-white placeholder-[#9E988A]/60 focus:outline-none focus:border-[#E5A93C] transition-colors"
          />
        </div>
      </div>

      {/* ====================================================================
          SPLIT-SCREEN MAIN BAY: TELETYPE WIRE (LEFT) & PROJECTION BAY (RIGHT)
          ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] lg:h-[620px]">
        {/* ------------------------------------------------------------------
            LEFT FLANK: CHRONOLOGICAL TELETYPE STREAM (5 COLS)
            ------------------------------------------------------------------ */}
        <div
          ref={wireListRef}
          className="lg:col-span-5 bg-[#0a0c10] border-b lg:border-b-0 lg:border-r border-[#2A261F] overflow-y-auto max-h-[380px] lg:max-h-full divide-y divide-[#2A261F]/60 select-none custom-scroll"
        >
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-[#9E988A] font-mono text-xs">
              <FaBroadcastTower className="text-2xl text-[#9E988A]/40 mx-auto mb-2" />
              NO TRANSMISSIONS LOGGED UNDER THIS QUERY.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const dateStamp = formatDate(item.publishedAt);
              const category = item.categories || item.category || "UPDATE";

              return (
                <div
                  key={item.id || item.slug || idx}
                  data-index={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`p-3.5 sm:p-4 cursor-pointer transition-all duration-150 relative group ${
                    isSelected
                      ? "bg-[#111318] border-l-4 border-l-[#E5A93C] shadow-inner"
                      : "hover:bg-[#111318]/60 border-l-4 border-l-transparent"
                  }`}
                >
                  {/* Active Indicator Arrow */}
                  <div className="flex items-start gap-2.5">
                    <span
                      className={`font-mono text-xs mt-0.5 transition-transform ${
                        isSelected
                          ? "text-[#E5A93C] translate-x-0.5 font-bold"
                          : "text-[#9E988A]/40 group-hover:text-[#9E988A]"
                      }`}
                    >
                      {isSelected ? "▶" : "·"}
                    </span>

                    <div className="flex-1 min-w-0">
                      {/* Telegram Meta Line */}
                      <div className="flex items-center gap-2 font-mono text-[10px] text-[#9E988A] mb-1">
                        <span className="text-[#E5A93C] font-bold">{dateStamp}</span>
                        <span>//</span>
                        <span className="uppercase tracking-wider font-semibold text-white/70">
                          {category}
                        </span>
                        <span className="ml-auto text-[9px] text-[#9E988A]/50">
                          #{String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Telegram Headline */}
                      <p
                        className={`text-xs sm:text-sm font-sans font-bold leading-snug line-clamp-2 transition-colors ${
                          isSelected ? "text-white" : "text-white/80 group-hover:text-white"
                        }`}
                      >
                        {item.title}
                      </p>

                      {/* Condensed Teletype Preview */}
                      <p className="font-mono text-[10.5px] text-[#9E988A] truncate mt-1">
                        &gt; {item.content || item.description || "NO CARRIER DATA"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ------------------------------------------------------------------
            RIGHT FLANK: PROJECTOR VIEWPORT & DISPATCH BRIEF (7 COLS)
            ------------------------------------------------------------------ */}
        <div className="lg:col-span-7 bg-[#08090C] flex flex-col justify-between overflow-y-auto p-5 sm:p-7 relative">
          {activeItem ? (
            <div className="space-y-6 animate-fadeIn">
              {/* Viewport Top Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#2A261F] font-mono text-xs text-[#9E988A]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E5A93C]" />
                  <span className="font-bold text-white uppercase tracking-wider">
                    PROJECTION BAY // REF: AAC-WIRE-{activeItem.id || activeItem.slug || "001"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px]">
                  <span>DATE: {formatDate(activeItem.publishedAt)}</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <FaCheckCircle className="text-[10px]" /> DECRYPTED
                  </span>
                </div>
              </div>

              {/* High-Res Transmission Visual / Document Viewport */}
              {activeItem.image ? (
                <div className="relative w-full h-52 sm:h-64 rounded-xl overflow-hidden border border-[#2A261F] bg-[#111318] group shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                  {/* Subtle HUD reticles in corners */}
                  <div className="absolute top-2 left-2 z-10 font-mono text-[9px] text-[#E5A93C] bg-[#08090C]/80 px-1.5 py-0.5 rounded border border-[#E5A93C]/30 backdrop-blur-sm">
                    CAM // OPTIC-01
                  </div>
                  <div className="absolute top-2 right-2 z-10 font-mono text-[9px] text-[#9E988A] bg-[#08090C]/80 px-1.5 py-0.5 rounded border border-white/10 backdrop-blur-sm">
                    RES: HIGH-DEF
                  </div>

                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Amber Scanline Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-transparent to-transparent opacity-80" />

                  {/* Channel Tag Badge */}
                  <div className="absolute bottom-3 left-3 z-10">
                    <span className="px-3 py-1 rounded bg-[#E5A93C] text-[#08090C] font-mono text-[10px] font-extrabold uppercase tracking-wider shadow-lg">
                      {activeItem.categories || activeItem.category || "DISPATCH"}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-36 rounded-xl border border-dashed border-[#2A261F] bg-[#111318]/50 flex flex-col items-center justify-center text-[#9E988A] font-mono text-xs">
                  <FaFileAlt className="text-2xl text-[#E5A93C]/40 mb-2" />
                  <span>[IMAGE TELEMETRY NOT ENCLOSED // TEXT ONLY DISPATCH]</span>
                </div>
              )}

              {/* Main Headline */}
              <div>
                <span className="font-mono text-[10px] text-[#E5A93C] uppercase tracking-widest font-bold block mb-1">
                  // OFFICIAL PRESS DISPATCH
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-sans tracking-tight leading-snug">
                  {activeItem.title}
                </h2>
              </div>

              {/* Full Dispatch Paragraphs */}
              <div className="space-y-4 text-xs sm:text-sm text-[#9E988A] leading-relaxed font-sans bg-[#111318]/40 p-4 sm:p-5 rounded-xl border border-[#2A261F]">
                <p className="text-white/90">
                  {activeItem.content || activeItem.description || activeItem._rawBody || "Detailed dispatch content is synchronized via the central database."}
                </p>

                {activeItem.excerpt && (
                  <p className="italic text-[#9E988A] border-l-2 border-[#E5A93C] pl-3">
                    "{activeItem.excerpt}"
                  </p>
                )}
              </div>

              {/* Registry Technical Stamp & Footer Actions */}
              <div className="pt-4 border-t border-[#2A261F] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                <div className="space-y-0.5">
                  <div className="text-[10px] text-[#9E988A] uppercase">
                    ORIGIN: <span className="text-white font-bold">AAC GRIET HYDERABAD</span>
                  </div>
                  <div className="text-[9.5px] text-[#9E988A]/60">
                    HASH: 0x{Math.abs(hashCode(activeItem.title || "wire")).toString(16).toUpperCase()} // LATENCY: 24ms
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopyRef(activeItem)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111318] border border-[#2A261F] hover:border-[#E5A93C]/60 text-xs font-mono text-[#9E988A] hover:text-white transition-all cursor-pointer"
                  >
                    <FaCopy className="text-[10px] text-[#E5A93C]" />
                    <span>{copiedId ? "COPIED REF!" : "COPY REF"}</span>
                  </button>

                  {activeItem.link && (
                    <a
                      href={activeItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E5A93C] text-[#08090C] hover:bg-[#F6C463] text-xs font-mono font-bold uppercase transition-all shadow-[0_0_12px_rgba(229,169,60,0.35)]"
                    >
                      <span>EXTERNAL SOURCE</span>
                      <FaExternalLinkAlt className="text-[10px]" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="m-auto text-center text-[#9E988A] font-mono text-xs">
              <FaTerminal className="text-3xl text-[#9E988A]/40 mx-auto mb-2" />
              AWAITING WIRE SELECTION...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Simple deterministic hash for procedural teletype cryptographic stamp
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
}

