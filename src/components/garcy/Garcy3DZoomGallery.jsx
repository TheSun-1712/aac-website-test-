import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaGithub,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { resolveItemImage } from "@/lib/placeholders";

/**
 * Garcy3DZoomGallery
 * Recreates the authentic 3D Z-axis camera fly-through from the reference video:
 * - Only photos fly and scale smoothly through 3D space (no double-exposed text clutter).
 * - The active description dossier sits cleanly beside the 3D tunnel, updating with fluid crossfade.
 * - Buttery-smooth continuous scrolling with inertia, drag, keyboard arrows, and step buttons.
 */
export default function Garcy3DZoomGallery({
  items = [],
  category = "events", // "events" | "news" | "achievements"
}) {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const wheelTimeout = useRef(null);
  const dragStartY = useRef(0);
  const isDragging = useRef(false);

  // Clamp target progress if items change
  useEffect(() => {
    if (targetProgress.current >= items.length) {
      targetProgress.current = Math.max(0, items.length - 1);
    }
  }, [items.length]);

  // Buttery-smooth 60fps lerp animation loop
  useEffect(() => {
    let animId;
    const update = () => {
      const diff = targetProgress.current - currentProgress.current;
      if (Math.abs(diff) > 0.0005) {
        // High-precision smooth fluid inertia
        currentProgress.current += diff * 0.095;
        setScrollProgress(currentProgress.current);
      } else if (currentProgress.current !== targetProgress.current) {
        currentProgress.current = targetProgress.current;
        setScrollProgress(targetProgress.current);
      }
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [items.length]);

  // Non-passive wheel listener attached to container to prevent page scroll jitter while zooming
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      // Prevent browser default page scroll when actively wheeling over the gallery
      e.preventDefault();
      const delta = e.deltaY * 0.0018;
      targetProgress.current = Math.max(
        0,
        Math.min(items.length - 1, targetProgress.current + delta)
      );

      // Smoothly settle to nearest focal item when user pauses
      clearTimeout(wheelTimeout.current);
      wheelTimeout.current = setTimeout(() => {
        targetProgress.current = Math.round(targetProgress.current);
      }, 200);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [items.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        targetProgress.current = Math.min(items.length - 1, Math.round(targetProgress.current) + 1);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        targetProgress.current = Math.max(0, Math.round(targetProgress.current) - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items.length]);

  // Touch and drag interactions
  const handleTouchStart = (e) => {
    dragStartY.current = e.touches ? e.touches[0].clientY : e.clientY;
    isDragging.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const currentY = e.touches ? e.touches[0].clientY : e.clientY;
    const diff = (dragStartY.current - currentY) * 0.004;
    targetProgress.current = Math.max(
      0,
      Math.min(items.length - 1, targetProgress.current + diff)
    );
    dragStartY.current = currentY;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    // Settle to nearest card on release
    targetProgress.current = Math.round(targetProgress.current);
  };

  const handleStep = (direction) => {
    const next = Math.round(targetProgress.current) + direction;
    targetProgress.current = Math.max(0, Math.min(items.length - 1, next));
  };

  const activeIndex = Math.max(
    0,
    Math.min(items.length - 1, Math.round(scrollProgress))
  );
  const activeItem = items[activeIndex] || items[0];

  if (!items || items.length === 0) {
    return (
      <div className="w-full py-20 text-center text-[#9E988A] font-sans text-sm">
        No entries available.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      className="relative w-full max-w-7xl mx-auto select-none flex flex-col justify-between"
    >
      {/* ====================================================================
          MAIN STAGE: 3D ZOOM IMAGE TUNNEL (LEFT) + CLEAN DESCRIPTION (RIGHT)
          ==================================================================== */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center min-h-[520px] lg:min-h-[580px]">
        
        {/* ------------------------------------------------------------------
            LEFT: 3D CAMERA ZOOM VIEWPORT (IMAGES ONLY - SMOOTH & DIRECT)
            ------------------------------------------------------------------ */}
        <div
          className="lg:col-span-7 relative w-full h-[360px] sm:h-[440px] lg:h-[540px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#2A261F] bg-[#111318]/90 shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ perspective: "1000px" }}
        >
          {items.map((item, idx) => {
            const rel = idx - scrollProgress;

            // Only render items within visible 3D horizon
            if (rel < -1.2 || rel > 3.0) return null;

            // Authentic 3D fly-through physics from reference video:
            // 1. Z-Depth: approaching items travel along Z-axis toward user
            const z = rel * -480;

            // 2. Scale: smooth zoom forward into camera as rel approaches 0 and passes
            const scale = rel <= 0 ? 1 + -rel * 1.35 : Math.max(0.35, 1 - rel * 0.28);

            // 3. Opacity: Crisp 1.0 at focal point; fades out smoothly as it zooms past
            let opacity = 1;
            if (rel > 0) {
              opacity = Math.max(0.15, 1 - rel * 0.32);
            } else {
              opacity = Math.max(0, 1 - -rel * 1.35);
            }

            const resolvedImg = resolveItemImage(
              item.mainImageUrl || item.image || item.img,
              category,
              idx
            );

            return (
              <div
                key={item.id || item._id || idx}
                style={{
                  position: "absolute",
                  inset: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `translate3d(0px, 0px, ${z}px) scale(${scale})`,
                  opacity: opacity,
                  zIndex: Math.round(100 - rel * 10),
                  pointerEvents: "none",
                  willChange: "transform, opacity",
                }}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[#2A261F] bg-[#08090C] shadow-2xl flex items-center justify-center">
                  <img
                    src={resolvedImg}
                    alt={item.title || "Club Event"}
                    className="w-full h-full object-contain select-none"
                    onError={(e) => {
                      e.currentTarget.src = "/images/pic.webp";
                    }}
                  />
                  {/* Subtle dark bottom vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08090C]/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>

        {/* ------------------------------------------------------------------
            RIGHT: CRISP, CLEAN DESCRIPTION DOSSIER (NO OVERLAPPING TEXT)
            ------------------------------------------------------------------ */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left p-2 sm:p-4">
          {activeItem && (
            <div className="space-y-5 animate-fadeIn">
              {/* Category & Date Line */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C]/40 text-[#E5A93C] text-xs font-semibold uppercase tracking-wider">
                  {activeItem.category || activeItem.categories || activeItem.type || "Event"}
                </span>

                <span className="text-xs text-[#9E988A] flex items-center gap-1.5 font-medium">
                  <FaCalendarAlt className="text-[#E5A93C] text-[11px]" />
                  <span>
                    {activeItem.date ||
                      (activeItem.publishedAt
                        ? new Date(activeItem.publishedAt).toLocaleDateString()
                        : "2024–2025")}
                  </span>
                </span>
              </div>

              {/* Event Title */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-sans tracking-tight leading-snug">
                {activeItem.title || activeItem.event}
              </h2>

              {/* Venue / Location */}
              {(activeItem.location || activeItem.venue || activeItem.registry) && (
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[#9E988A]">
                  <FaMapMarkerAlt className="text-[#E5A93C] text-xs flex-shrink-0" />
                  <span className="text-white/90 font-medium">
                    {activeItem.location || activeItem.venue || activeItem.registry}
                  </span>
                </div>
              )}

              {/* Full Event Narrative Description */}
              <div className="bg-[#111318] border border-[#2A261F] p-5 sm:p-6 rounded-2xl text-xs sm:text-sm text-[#9E988A] leading-relaxed font-sans shadow-lg">
                <p className="text-white/90">
                  {activeItem.description ||
                    activeItem.content ||
                    activeItem.detailedDescription ||
                    activeItem.desc ||
                    "Official event hosted by the Advanced Academic Center."}
                </p>

                {activeItem.participants && (
                  <div className="mt-3 pt-3 border-t border-[#2A261F] text-xs text-[#E5A93C] font-semibold">
                    Delegation: <span className="text-white/90">{activeItem.participants}</span>
                  </div>
                )}
              </div>

              {/* Primary Call to Action Button */}
              <div className="pt-2 flex items-center gap-3">
                {activeItem.path || activeItem.link || activeItem.ctaLink ? (
                  <Link
                    href={activeItem.path || activeItem.link || activeItem.ctaLink || "#"}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#E5A93C] hover:bg-[#F6C463] text-[#08090C] text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(229,169,60,0.35)] cursor-pointer"
                  >
                    <span>{activeItem.ctaText || "Explore Details"}</span>
                    <FaExternalLinkAlt className="text-[10px]" />
                  </Link>
                ) : null}

                {activeItem.githubRepo && (
                  <a
                    href={activeItem.githubRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-[#111318] border border-[#2A261F] hover:border-[#E5A93C] text-[#9E988A] hover:text-[#E5A93C] flex items-center justify-center transition-all cursor-pointer"
                    title="GitHub Repository"
                  >
                    <FaGithub className="text-base" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ====================================================================
          CLEAN BOTTOM NAVIGATION CONTROLS (Prev / Next & Item Title)
          ==================================================================== */}
      <div className="mt-8 pt-4 border-t border-[#2A261F] flex flex-wrap items-center justify-between gap-4 text-xs text-[#9E988A]">
        {/* Left & Right Step Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleStep(-1)}
            disabled={activeIndex <= 0}
            className="w-9 h-9 rounded-xl bg-[#111318] border border-[#2A261F] text-white hover:text-[#E5A93C] disabled:opacity-30 disabled:hover:text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Previous"
          >
            <FaChevronLeft className="text-xs" />
          </button>
          <button
            type="button"
            onClick={() => handleStep(1)}
            disabled={activeIndex >= items.length - 1}
            className="w-9 h-9 rounded-xl bg-[#111318] border border-[#2A261F] text-white hover:text-[#E5A93C] disabled:opacity-30 disabled:hover:text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Next"
          >
            <FaChevronRight className="text-xs" />
          </button>
          <span className="ml-2 font-mono text-xs text-[#E5A93C] font-bold">
            {activeIndex + 1} / {items.length}
          </span>
        </div>

        {/* Center Current Title */}
        <div className="text-center font-sans font-semibold text-white/90 text-xs sm:text-sm truncate max-w-sm sm:max-w-md">
          {activeItem?.title || activeItem?.event}
        </div>

        {/* Step Dots */}
        <div className="flex items-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                targetProgress.current = i;
              }}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activeIndex === i
                  ? "w-6 bg-[#E5A93C]"
                  : "w-1.5 bg-[#2A261F] hover:bg-white/40"
              }`}
              aria-label={`Jump to ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
