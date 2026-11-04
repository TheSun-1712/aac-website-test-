import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  FaCompass,
  FaUserTie,
  FaGraduationCap,
  FaEnvelope,
  FaShieldAlt,
  FaTimes,
  FaUsers,
  FaAward,
} from "react-icons/fa";

export default function GarcyAdminRadarDeck({
  instigators = [],
  headAdvisors = [],
  advisors = [],
  committeeMembers = [],
  availableYears = ["2025", "2024", "2023", "2022"],
  selectedYear = "2025",
  onYearChange,
}) {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [hoveredBlip, setHoveredBlip] = useState(null);
  const canvasRef = useRef(null);

  // Group tiers into rings
  const radarNodes = useMemo(() => {
    const nodes = [];

    // Inner Ring: Instigators & Heads (Radius ~ 0.28)
    const tier1 = [...instigators, ...headAdvisors];
    tier1.forEach((p, idx) => {
      const angle = (idx / Math.max(1, tier1.length)) * Math.PI * 2 - Math.PI / 2;
      nodes.push({
        ...p,
        ring: "CORE PATRONS",
        ringIndex: 1,
        radiusPct: 0.28,
        angle,
        callsign: p.tier || "DIRECTORATE",
      });
    });

    // Middle Ring: Faculty Advisors (Radius ~ 0.55)
    advisors.forEach((p, idx) => {
      const angle = (idx / Math.max(1, advisors.length)) * Math.PI * 2 - Math.PI / 3;
      nodes.push({
        ...p,
        ring: "RESEARCH GUIDES",
        ringIndex: 2,
        radiusPct: 0.55,
        angle,
        callsign: p.tier || "FACULTY GUIDE",
      });
    });

    // Outer Ring: Student Committee for selectedYear (Radius ~ 0.82)
    const yearMembers = committeeMembers.filter(
      (m) => String(m.year) === String(selectedYear) || !m.year
    );
    const committeeToDisplay = yearMembers.length > 0 ? yearMembers : committeeMembers.slice(0, 12);

    committeeToDisplay.forEach((p, idx) => {
      const angle = (idx / Math.max(1, committeeToDisplay.length)) * Math.PI * 2;
      nodes.push({
        ...p,
        id: p.id || p.Id || `comm-${idx}`,
        name: p.name || p.Name,
        occupation: p.designation || p.Designation || "Core Committee",
        image: p.image || p.Image || "/images/pic.webp",
        ring: `STUDENT FLIGHT LEADS (${selectedYear})`,
        ringIndex: 3,
        radiusPct: 0.82,
        angle,
        callsign: p.designation || "SYSTEMS FELLOW",
      });
    });

    return nodes;
  }, [instigators, headAdvisors, advisors, committeeMembers, selectedYear]);

  // Set default selected person
  useEffect(() => {
    if (!selectedPerson && radarNodes.length > 0) {
      setSelectedPerson(radarNodes[0]);
    }
  }, [radarNodes, selectedPerson]);

  // Real-time Canvas Radar Sweep Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let sweepAngle = 0;

    const render = () => {
      sweepAngle = (sweepAngle + 0.02) % (Math.PI * 2);
      const w = (canvas.width = canvas.offsetWidth * window.devicePixelRatio || 600);
      const h = (canvas.height = canvas.offsetHeight * window.devicePixelRatio || 600);
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(cx, cy) * 0.92;

      // Draw Range Rings (Concentric circles)
      ctx.lineWidth = 1;
      [0.28, 0.55, 0.82].forEach((pct, idx) => {
        const r = maxR * pct;
        ctx.strokeStyle = idx === 0 ? "rgba(229, 169, 60, 0.4)" : "rgba(42, 38, 31, 0.8)";
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Crosshairs & Radial azimuth lines
      ctx.strokeStyle = "rgba(42, 38, 31, 0.5)";
      ctx.beginPath();
      ctx.moveTo(cx - maxR, cy);
      ctx.lineTo(cx + maxR, cy);
      ctx.moveTo(cx, cy - maxR);
      ctx.lineTo(cx, cy + maxR);
      ctx.stroke();

      // Draw Rotating Sweeping Beam
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
      gradient.addColorStop(0, "rgba(229, 169, 60, 0.25)");
      gradient.addColorStop(1, "rgba(229, 169, 60, 0.0)");

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, maxR, sweepAngle - 0.35, sweepAngle);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Sharp sweep needle
      ctx.strokeStyle = "#E5A93C";
      ctx.lineWidth = 1.5 * window.devicePixelRatio;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(sweepAngle) * maxR, cy + Math.sin(sweepAngle) * maxR);
      ctx.stroke();
      ctx.restore();

      // Draw Member Blips
      radarNodes.forEach((node) => {
        const r = maxR * node.radiusPct;
        const x = cx + Math.cos(node.angle) * r;
        const y = cy + Math.sin(node.angle) * r;

        // Check if radar sweep just passed this blip
        const angleDiff = Math.abs(((sweepAngle - node.angle + Math.PI * 4) % (Math.PI * 2)));
        const isPinged = angleDiff < 0.2;
        const isSelected = selectedPerson?.id === node.id || hoveredBlip?.id === node.id;

        // Outer blip ping
        if (isPinged || isSelected) {
          ctx.strokeStyle = isSelected ? "#FFFFFF" : "#E5A93C";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(x, y, (isSelected ? 10 : 8) * window.devicePixelRatio, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Inner solid blip dot
        ctx.fillStyle = isSelected ? "#FFFFFF" : isPinged ? "#F6C463" : "#E5A93C";
        ctx.beginPath();
        ctx.arc(x, y, (isSelected ? 4.5 : 3) * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [radarNodes, selectedPerson, hoveredBlip]);

  return (
    <div className="relative w-full p-4 sm:p-8 bg-[#08090C] text-[#FAF6ED] rounded-3xl border border-[#2A261F] overflow-hidden select-none">
      
      {/* Top Flight Deck Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#2A261F] pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#111318] border border-[#2A261F] flex items-center justify-center text-[#E5A93C]">
            <FaCompass className="text-sm" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#E5A93C] font-bold block">
              // INSTRUMENT 04: RADAR FLIGHT DECK
            </span>
            <h2 className="text-xs sm:text-sm font-sans font-semibold text-white tracking-wide">
              Organizational Command &bull; Mentorship Azimuth Scope
            </h2>
          </div>
        </div>

        {/* Year Rotary Switch */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-[#9E988A] uppercase">COMMITTEE EPOCH:</span>
          <div className="flex items-center gap-1 bg-[#111318] p-1 rounded-xl border border-[#2A261F]">
            {availableYears.slice(0, 5).map((yr) => (
              <button
                key={yr}
                type="button"
                onClick={() => onYearChange && onYearChange(yr)}
                className={`font-mono text-[10px] px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  selectedYear === yr
                    ? "bg-[#E5A93C] text-[#08090C] font-bold"
                    : "text-[#9E988A] hover:text-white"
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Radar Layout: 360° Scope on Left, Tactical Dossier on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Radar Scope Viewport */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[460px] aspect-square rounded-full bg-[#0B0D12] border-2 border-[#2A261F] shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden flex items-center justify-center">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

            {/* Clickable Overlay Hit Targets for each blip */}
            <div className="absolute inset-0">
              {radarNodes.map((node) => {
                const maxPct = 46; // radius percentage in CSS coords
                const r = maxPct * node.radiusPct;
                const left = 50 + Math.cos(node.angle) * r;
                const top = 50 + Math.sin(node.angle) * r;

                return (
                  <button
                    key={node.id}
                    type="button"
                    onMouseEnter={() => setHoveredBlip(node)}
                    onMouseLeave={() => setHoveredBlip(null)}
                    onClick={() => setSelectedPerson(node)}
                    style={{ left: `${left}%`, top: `${top}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full cursor-pointer z-20 group flex items-center justify-center"
                    title={`${node.name} (${node.callsign})`}
                  >
                    <span className="w-2 h-2 rounded-full bg-transparent group-hover:scale-150 transition-transform" />
                  </button>
                );
              })}
            </div>

            {/* Scope Center Cross Indicator */}
            <div className="pointer-events-none absolute text-[8.5px] font-mono text-[#E5A93C]/70 tracking-widest uppercase">
              AZM: 360° // AAC
            </div>
          </div>

          {/* Range Ring Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4 font-mono text-[9px] text-[#9E988A]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E5A93C]" />
              <span>INNER: FOUNDING MENTORS</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FAF6ED]" />
              <span>MID: RESEARCH ADVISORS</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#9E988A]" />
              <span>OUTER: FLIGHT LEADS ({selectedYear})</span>
            </span>
          </div>
        </div>

        {/* Tactical Member Dossier Panel */}
        <div className="lg:col-span-5 bg-[#111318] border border-[#2A261F] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {selectedPerson ? (
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono mb-4 pb-3 border-b border-[#2A261F]">
                <span className="text-[#E5A93C] font-bold uppercase tracking-widest">
                  {selectedPerson.ring}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#08090C] border border-[#2A261F] text-[#FAF6ED]">
                  ROLE // {selectedPerson.callsign}
                </span>
              </div>

              {/* Headshot with CRT scanlines */}
              <div className="flex items-start gap-4 mb-5">
                <div className="relative w-24 h-28 sm:w-28 sm:h-32 rounded-xl overflow-hidden bg-[#08090C] border border-[#2A261F] shrink-0">
                  <img
                    src={selectedPerson.image || "/images/pic.webp"}
                    alt={selectedPerson.name}
                    className="w-full h-full object-cover filter grayscale contrast-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111318] via-transparent to-transparent opacity-60" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-xl sm:text-2xl text-white mb-1 leading-snug">
                    {selectedPerson.name}
                  </h3>
                  <span className="font-mono text-xs text-[#E5A93C] block mb-2 font-semibold">
                    {selectedPerson.occupation}
                  </span>
                  {selectedPerson.department && (
                    <span className="font-mono text-[10px] text-[#9E988A] block mb-1">
                      DEPT: {selectedPerson.department}
                    </span>
                  )}
                  {selectedPerson.year && (
                    <span className="font-mono text-[10px] text-[#9E988A] block">
                      TENURE: {selectedPerson.year}
                    </span>
                  )}
                </div>
              </div>

              {/* Bio & Credentials */}
              <p className="font-sans text-xs sm:text-sm text-[#9E988A] leading-relaxed mb-5 max-h-40 overflow-y-auto pr-1">
                {selectedPerson.about || selectedPerson.desc || "Executive member directing undergraduate student research at AAC GRIET."}
              </p>

              {/* Expertise Tags */}
              {selectedPerson.expertise && selectedPerson.expertise.length > 0 && (
                <div className="mb-5">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#9E988A] block mb-2">
                    CORE SPECIALIZATIONS:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPerson.expertise.map((exp, i) => (
                      <span
                        key={i}
                        className="font-mono text-[9.5px] px-2.5 py-1 rounded bg-[#08090C] border border-[#2A261F] text-[#FAF6ED]"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action */}
              {selectedPerson.email && (
                <div className="pt-4 border-t border-[#2A261F] flex items-center justify-between">
                  <a
                    href={`mailto:${selectedPerson.email}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E5A93C] hover:bg-[#F6C463] text-[#08090C] font-mono text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    <FaEnvelope className="text-[10px]" />
                    <span>Contact Profile</span>
                  </a>
                  <span className="font-mono text-[9px] text-[#9E988A]">
                    VERIFIED AAC CREDENTIAL
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="py-20 text-center font-mono text-xs text-[#9E988A]">
              HOVER OR CLICK ANY RADAR BLIP TO INSPECT PROFILE
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

