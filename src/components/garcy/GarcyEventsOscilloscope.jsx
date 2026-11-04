import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaArrowRight,
  FaExternalLinkAlt,
  FaBroadcastTower,
  FaWaveSquare,
} from "react-icons/fa";

export default function GarcyEventsOscilloscope({ events = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isScrubbing, setIsScrubbing] = useState(false);
  const canvasRef = useRef(null);
  const dialRef = useRef(null);

  // Normalize events list
  const normalizedEvents = useMemo(() => {
    return events.map((ev, idx) => ({
      id: ev.id || `event-${idx}`,
      title: ev.title || ev.event || "AAC Event",
      date: ev.date || (ev.publishedAt ? new Date(ev.publishedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "ACTIVE"),
      category: (ev.category || ev.categories || "symposium").toLowerCase(),
      status: ev.status || (idx === 0 ? "UPCOMING // ACTIVE" : "TRANSMISSION ARCHIVED"),
      desc: ev.description || ev.content || "Technical session hosted by Advanced Academic Center at GRIET.",
      venue: ev.venue || "GRIET Campus, Hyderabad",
      participants: ev.participants || "Faculty & Fellows",
      path: ev.path || (ev.slug ? `/Events/${ev.slug}` : `/Events/${ev.id || ""}`),
      freq: (120.4 + idx * 8.6).toFixed(2),
    }));
  }, [events]);

  // Filtered timeline
  const filteredEvents = useMemo(() => {
    if (activeCategory === "all") return normalizedEvents;
    return normalizedEvents.filter((ev) => ev.category.includes(activeCategory));
  }, [normalizedEvents, activeCategory]);

  const currentEvent = filteredEvents[activeIndex] || filteredEvents[0] || normalizedEvents[0];

  // Keep activeIndex within bounds when category changes
  useEffect(() => {
    if (activeIndex >= filteredEvents.length) {
      setActiveIndex(Math.max(0, filteredEvents.length - 1));
    }
  }, [filteredEvents.length, activeIndex]);

  // Real-time Oscilloscope Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let time = 0;

    const renderWaveform = () => {
      time += 0.035;
      const w = (canvas.width = canvas.offsetWidth * window.devicePixelRatio || 800);
      const h = (canvas.height = canvas.offsetHeight * window.devicePixelRatio || 240);
      ctx.clearRect(0, 0, w, h);

      // Background grid graticules (military CRT style)
      ctx.strokeStyle = "rgba(42, 38, 31, 0.4)";
      ctx.lineWidth = 1;
      const gridSpacing = 40 * window.devicePixelRatio;
      for (let x = 0; x < w; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Center baseline
      const centerY = h / 2;
      ctx.strokeStyle = "rgba(229, 169, 60, 0.25)";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(w, centerY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Calculate dynamic resonance based on active index
      const baseFreq = 0.008 + (activeIndex + 1) * 0.003;
      const amplitude = h * 0.28 + (isScrubbing ? 14 : 0);

      // Oscilloscope primary beam (Rich Gold-Amber)
      ctx.lineWidth = 2.5 * window.devicePixelRatio;
      ctx.strokeStyle = "#E5A93C";
      ctx.shadowColor = "#E5A93C";
      ctx.shadowBlur = 12 * window.devicePixelRatio;

      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        // Complex waveform: Fundamental + 2nd harmonic + modulated noise spike
        const spikeEnvelope = Math.exp(-Math.pow((x - w * 0.5) / (w * 0.25), 2));
        const y =
          centerY +
          Math.sin(x * baseFreq + time * 3) * amplitude * 0.75 +
          Math.cos(x * baseFreq * 2.2 - time * 2) * (amplitude * 0.35) +
          Math.sin(x * 0.04 + time * 8) * (spikeEnvelope * 18);

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Secondary ambient reflection beam
      ctx.shadowBlur = 0;
      ctx.lineWidth = 1 * window.devicePixelRatio;
      ctx.strokeStyle = "rgba(246, 196, 99, 0.35)";
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const y =
          centerY +
          Math.sin(x * baseFreq * 0.8 + time * 2) * (amplitude * 0.5) +
          Math.cos(x * baseFreq * 1.5 - time) * 12;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(renderWaveform);
    };

    renderWaveform();
    return () => cancelAnimationFrame(animId);
  }, [activeIndex, isScrubbing]);

  // Handle scrubber drag along the time dial
  const handleScrubberPointer = (e) => {
    const dial = dialRef.current;
    if (!dial) return;
    const rect = dial.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const nextIdx = Math.round(pos * (filteredEvents.length - 1));
    setActiveIndex(nextIdx);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-4 sm:p-8 bg-[#08090C] text-[#FAF6ED] overflow-hidden select-none">
      
      {/* ====================================================================
          TOP INSTRUMENT BAR
          ==================================================================== */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#2A261F] pb-4 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#111318] border border-[#2A261F] flex items-center justify-center text-[#E5A93C]">
            <FaWaveSquare className="text-sm" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#E5A93C] font-bold block">
              // INSTRUMENT 01: TIME-DIAL OSCILLOSCOPE
            </span>
            <h2 className="text-xs sm:text-sm font-sans font-semibold text-white tracking-wide">
              AAC Event Timeline &amp; Technical Symposia
            </h2>
          </div>
        </div>

        {/* Live Frequency & Status Telemetry */}
        <div className="flex items-center gap-4 font-mono text-[11px] text-[#9E988A]">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#111318] border border-[#2A261F]">
            <FaBroadcastTower className="text-[#E5A93C] animate-pulse text-[10px]" />
            <span className="text-white/90">FREQ:</span>
            <span className="text-[#E5A93C] font-bold">{currentEvent?.freq || "142.80"} MHz</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded bg-[#111318] border border-[#2A261F]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-white/80">CHANNEL: {activeIndex + 1}/{filteredEvents.length}</span>
          </div>
        </div>
      </div>

      {/* ====================================================================
          CENTER VIEWPORT: OSCILLOSCOPE WAVEFORM + FLOATING BLUEPRINT DOSSIER
          ==================================================================== */}
      <div className="relative flex-1 my-3 sm:my-6 flex flex-col md:flex-row items-center justify-between gap-6 min-h-[300px] z-10">
        
        {/* Oscilloscope Visualizer Box */}
        <div className="relative w-full md:w-5/12 h-48 md:h-full rounded-2xl bg-[#111318] border border-[#2A261F] overflow-hidden flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          <div className="flex items-center justify-between px-4 py-2 border-b border-[#2A261F] bg-[#0C0E14] text-[10px] font-mono text-[#9E988A]">
            <span className="text-[#E5A93C] font-semibold">SIGNAL MON: TELEMETRY RESONANCE</span>
            <span>SCALE: 10ms/DIV</span>
          </div>
          <div className="relative flex-1 w-full h-full">
            <canvas ref={canvasRef} className="w-full h-full block" />
            <div className="absolute bottom-3 left-4 text-[9.5px] font-mono text-[#9E988A]/80 tracking-wider">
              PEAK MODULATION: ACTIVE EVENT SYNC
            </div>
          </div>
        </div>

        {/* Active Event Blueprint Card */}
        <div className="w-full md:w-7/12 rounded-2xl bg-[#111318] border border-[#2A261F] p-6 sm:p-8 flex flex-col justify-between shadow-[0_25px_70px_rgba(0,0,0,0.85)] relative overflow-hidden">
          {/* Subtle Ambient Background Watermark */}
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 font-mono text-[90px] font-black text-white/[0.02] pointer-events-none select-none">
            {activeIndex + 1}
          </div>

          <div>
            {/* Header badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`font-mono text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded border ${
                currentEvent.status.includes("ACTIVE") || currentEvent.status.includes("LIVE")
                  ? "bg-[#E5A93C]/15 border-[#E5A93C] text-[#E5A93C]"
                  : "bg-white/5 border-[#2A261F] text-[#9E988A]"
              }`}>
                {currentEvent.status}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#9E988A] px-2.5 py-1 rounded bg-[#08090C] border border-[#2A261F]">
                DATE: {currentEvent.date}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#E5A93C] px-2.5 py-1 rounded bg-[#08090C] border border-[#2A261F]">
                BAND: {currentEvent.category.toUpperCase()}
              </span>
            </div>

            <h3 className="font-sans font-bold text-xl sm:text-2xl text-white mb-3 tracking-tight">
              {currentEvent.title}
            </h3>

            <p className="font-sans text-xs sm:text-sm text-[#9E988A] leading-relaxed mb-6">
              {currentEvent.desc}
            </p>

            {/* Coordinates & Attendee Telemetry Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-[#08090C]/80 border border-[#2A261F]/80">
              <div className="flex items-center gap-2 text-xs font-mono text-[#9E988A]">
                <FaMapMarkerAlt className="text-[#E5A93C] text-sm shrink-0" />
                <span className="truncate">{currentEvent.venue}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#9E988A]">
                <FaUsers className="text-[#E5A93C] text-sm shrink-0" />
                <span className="truncate">{currentEvent.participants}</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-4 border-t border-[#2A261F]">
            <span className="font-mono text-[10.5px] text-[#9E988A]">
              TELEMETRY ID // {currentEvent.id.toUpperCase()}
            </span>

            <Link
              href={currentEvent.path || "/Events"}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#E5A93C] hover:bg-[#F6C463] text-[#08090C] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              <span>Explore Dossier</span>
              <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
        </div>
      </div>

      {/* ====================================================================
          BOTTOM SCRUBBER CONTROL DIAL: HORIZONTAL TIME SCALES
          ==================================================================== */}
      <div className="w-full bg-[#111318] border border-[#2A261F] rounded-2xl p-4 sm:p-5 z-20">
        
        {/* Category Tuning Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#9E988A] font-semibold">
            CHRONO-DIAL FREQUENCY BANDS:
          </span>
          <div className="flex items-center gap-1.5">
            {[
              { id: "all", label: "ALL FREQUENCIES" },
              { id: "hackathon", label: "HACKATHONS" },
              { id: "symposium", label: "SYMPOSIUMS" },
              { id: "bootcamp", label: "BOOTCAMPS" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  setActiveIndex(0);
                }}
                className={`font-mono text-[9.5px] uppercase tracking-wider px-3 py-1 rounded transition-colors ${
                  activeCategory === cat.id
                    ? "bg-[#E5A93C] text-[#08090C] font-bold"
                    : "bg-[#08090C] text-[#9E988A] hover:text-white border border-[#2A261F]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Linear Track */}
        <div
          ref={dialRef}
          onPointerDown={(e) => {
            setIsScrubbing(true);
            dialRef.current.setPointerCapture(e.pointerId);
            handleScrubberPointer(e);
          }}
          onPointerMove={(e) => {
            if (isScrubbing) handleScrubberPointer(e);
          }}
          onPointerUp={(e) => {
            setIsScrubbing(false);
          }}
          className="relative h-12 w-full bg-[#08090C] border border-[#2A261F] rounded-xl flex items-center px-4 cursor-ew-resize select-none overflow-hidden"
        >
          {/* Tick markers */}
          <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none opacity-40">
            {Array.from({ length: 28 }).map((_, i) => (
              <div
                key={i}
                className={`w-[1px] ${i % 4 === 0 ? "h-6 bg-[#E5A93C]" : "h-3 bg-[#9E988A]"}`}
              />
            ))}
          </div>

          {/* Event Nodes along track */}
          <div className="absolute inset-x-6 flex items-center justify-between">
            {filteredEvents.map((ev, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={ev.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(idx);
                  }}
                  className={`group relative z-10 flex flex-col items-center cursor-pointer`}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${
                      isSelected
                        ? "bg-[#E5A93C] border-white scale-125 shadow-[0_0_12px_#E5A93C]"
                        : "bg-[#111318] border-[#9E988A] group-hover:border-[#E5A93C]"
                    }`}
                  />
                  <span
                    className={`font-mono text-[8.5px] uppercase tracking-wider mt-1.5 transition-colors hidden sm:block ${
                      isSelected ? "text-[#E5A93C] font-bold" : "text-[#9E988A] group-hover:text-white"
                    }`}
                  >
                    {ev.date}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Scrubber Head Needle */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-[#E5A93C] shadow-[0_0_12px_#E5A93C] pointer-events-none transition-all duration-75"
            style={{
              left: `${(activeIndex / Math.max(1, filteredEvents.length - 1)) * 92 + 4}%`,
            }}
          />
        </div>

        <div className="flex items-center justify-between mt-2.5 font-mono text-[9px] text-[#9E988A]">
          <span>DRAG OR CLICK TIMELINE TO SCRUB EVENTS</span>
          <span>{filteredEvents.length} ARCHIVAL TRANSMISSIONS VERIFIED</span>
        </div>
      </div>
    </div>
  );
}

