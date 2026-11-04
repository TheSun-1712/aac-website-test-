import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaTrophy,
  FaAward,
  FaShieldAlt,
  FaCertificate,
  FaExternalLinkAlt,
  FaTimes,
  FaEye,
  FaLock,
} from "react-icons/fa";

export default function GarcyAchievementsVault({ achievements = [] }) {
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [cardTilt, setCardTilt] = useState({});

  // Handle 3D perspective tilt relative to card center
  const handleMouseMove = (e, id) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setCardTilt((prev) => ({
      ...prev,
      [id]: { rotX, rotY, glareX, glareY },
    }));
  };

  const handleMouseLeave = (id) => {
    setHoveredId(null);
    setCardTilt((prev) => ({
      ...prev,
      [id]: { rotX: 0, rotY: 0, glareX: 50, glareY: 50 },
    }));
  };

  return (
    <div className="relative w-full p-4 sm:p-8 bg-[#08090C] text-[#FAF6ED] rounded-3xl border border-[#2A261F] overflow-hidden select-none">
      
      {/* Top Vault HUD Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#2A261F] pb-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#111318] border border-[#2A261F] flex items-center justify-center text-[#E5A93C]">
            <FaShieldAlt className="text-sm" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#E5A93C] font-bold block">
              // INSTRUMENT 02: HOLOGRAPHIC SPECIMEN VAULT
            </span>
            <h2 className="text-xs sm:text-sm font-sans font-semibold text-white tracking-wide">
              Intellectual Property Dossiers &amp; National Honors
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-[11px] text-[#9E988A]">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#111318] border border-[#2A261F]">
            <FaLock className="text-[#E5A93C] text-[10px]" />
            <span className="text-white/80">ACCESS LEVEL: VERIFIED RESEARCH</span>
          </span>
          <span className="hidden sm:inline px-3 py-1 rounded bg-[#111318] border border-[#2A261F] text-[#E5A93C] font-bold">
            {achievements.length} ARTIFACTS IN VAULT
          </span>
        </div>
      </div>

      {/* Isometric 3D Tilt Specimen Plate Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 perspective-[1200px]">
        {achievements.map((item, idx) => {
          const tilt = cardTilt[item.id] || { rotX: 0, rotY: 0, glareX: 50, glareY: 50 };
          const isHovered = hoveredId === item.id;

          return (
            <div
              key={item.id || idx}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseMove={(e) => handleMouseMove(e, item.id)}
              onMouseLeave={() => handleMouseLeave(item.id)}
              onClick={() => setSelectedAchievement(item)}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.rotX || 0}deg) rotateY(${tilt.rotY || 0}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
                transition: isHovered ? "transform 0.08s ease-out" : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className="group relative rounded-2xl bg-[#111318] border border-[#2A261F] hover:border-[#E5A93C]/70 p-6 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-pointer overflow-hidden"
            >
              {/* Dynamic Anisotropic Glare Highlight */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at ${tilt.glareX || 50}% ${tilt.glareY || 50}%, rgba(229, 169, 60, 0.15) 0%, transparent 65%)`,
                }}
              />

              {/* Top Meta Bar */}
              <div className="relative z-10 flex items-center justify-between text-[10px] font-mono mb-4">
                <span className="flex items-center gap-1.5 font-bold uppercase text-[#E5A93C] px-2.5 py-0.5 rounded bg-[#E5A93C]/10 border border-[#2A261F]">
                  <FaCertificate className="text-[9px]" />
                  <span>{item.tag || item.category || "HONOR"}</span>
                </span>
                <span className="text-[#9E988A] tracking-wider uppercase">
                  {item.date || "OFFICIAL RECORD"}
                </span>
              </div>

              {/* Specimen Media Thumbnail / Seal Preview */}
              <div className="relative z-10 w-full h-44 rounded-xl overflow-hidden mb-4 bg-[#08090C] border border-[#2A261F]">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                    <FaAward className="text-4xl text-[#E5A93C]/40 mb-2 group-hover:text-[#E5A93C] transition-colors" />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#9E988A]">
                      INSTITUTIONAL IP SPECIMEN
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111318] via-transparent to-transparent opacity-80" />
              </div>

              {/* Title & Registry Citation */}
              <div className="relative z-10">
                <h3 className="font-sans font-bold text-base sm:text-lg text-white mb-2 leading-snug group-hover:text-[#E5A93C] transition-colors">
                  {item.title}
                </h3>
                <span className="block font-mono text-[10px] text-[#9E988A] mb-3 truncate">
                  REGISTRY: {item.registry || "Government of India / AAC GRIET"}
                </span>
                <p className="font-sans text-xs text-[#9E988A] leading-relaxed line-clamp-3 mb-4">
                  {item.desc || item.content}
                </p>
              </div>

              {/* Bottom Inspection Trigger */}
              <div className="relative z-10 pt-3 border-t border-[#2A261F] flex items-center justify-between text-xs font-mono">
                <span className="inline-flex items-center gap-1.5 text-[#E5A93C] font-semibold tracking-wider group-hover:translate-x-1 transition-transform">
                  <FaEye className="text-[10px]" />
                  <span>INSPECT DOSSIER</span>
                </span>
                <span className="text-[#9E988A]/60 text-[9px]">
                  ID // {String(item.id || idx).slice(0, 10).toUpperCase()}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ====================================================================
          "INSPECT DOSSIER" HOLOGRAPHIC SPECIMEN MODAL
          ==================================================================== */}
      {selectedAchievement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-fade-in pointer-events-auto select-text"
          onClick={() => setSelectedAchievement(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#111318] border border-[#2A261F] rounded-2xl p-6 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedAchievement(null)}
              className="absolute top-5 right-5 text-[#9E988A] hover:text-white p-2 text-sm rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <FaTimes />
            </button>

            {/* Dossier Header */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#E5A93C] font-bold px-2.5 py-1 rounded bg-[#E5A93C]/10 border border-[#2A261F]">
                {selectedAchievement.tag || selectedAchievement.category || "HONOR"}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#9E988A] px-2.5 py-1 rounded bg-white/5 border border-[#2A261F]">
                {selectedAchievement.date || "OFFICIAL RECORD"}
              </span>
            </div>

            <h2 className="font-sans font-bold text-2xl sm:text-3xl text-white mb-2 leading-tight">
              {selectedAchievement.title}
            </h2>

            <div className="flex items-center gap-2 text-xs font-mono text-[#9E988A] mb-4">
              <span className="text-[#E5A93C]">Registry / Authority:</span>
              <span className="text-white/80">
                {selectedAchievement.registry || "Government of India / National Organization"}
              </span>
            </div>

            {selectedAchievement.image && (
              <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden mb-6 border border-[#2A261F]">
                <img
                  src={selectedAchievement.image}
                  alt={selectedAchievement.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="font-sans text-sm sm:text-base text-[#FAF6ED]/85 leading-relaxed mb-6">
              {selectedAchievement.desc || selectedAchievement.content}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#2A261F]">
              <button
                type="button"
                onClick={() => setSelectedAchievement(null)}
                className="font-mono text-xs uppercase tracking-wider text-[#9E988A] hover:text-white transition-colors cursor-pointer"
              >
                ← Return to Vault
              </button>

              {selectedAchievement.link && (
                <Link
                  href={selectedAchievement.link}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#E5A93C] hover:bg-[#F6C463] text-[#08090C] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  <span>Verification Dossier</span>
                  <FaExternalLinkAlt className="text-[10px]" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

