import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { FaTimes, FaExternalLinkAlt } from "react-icons/fa";

// AAC Core Engineering Projects & Prototypes
const DOME_PROJECTS = [
  {
    id: "uav",
    title: "Autonomous Multi-Rotor UAV",
    services: "AERIAL ROBOTICS",
    image: "/images/8.webp",
    link: "/projects",
    year: "2024–2025",
    desc: "Autonomous multi-rotor UAV platform featuring edge obstacle avoidance, GPS waypoint guidance, and live telemetry downlink developed at AAC Robotics Lab.",
  },
  {
    id: "nav",
    title: "Intelligent Campus Navigation",
    services: "AR & INDOOR POSITIONING",
    image: "/images/pic.webp",
    link: "/projects",
    year: "2024–2025",
    desc: "Sub-meter AR indoor positioning and directional wayfinding system mapping GRIET campus complexes.",
  },
  {
    id: "pill",
    title: "Automated Pill Reminder",
    services: "PATENT 201941002559",
    image: "/images/AAC1.png",
    link: "/Patents",
    year: "PATENT PUBLISHED",
    desc: "Patented assistive medical adherence system with modular dosage cartridges and two-way verification.",
  },
  {
    id: "glove",
    title: "Smart Sign Language Glove",
    services: "PATENT 202041038106",
    image: "/images/AAC3.png",
    link: "/Patents",
    year: "PATENT PUBLISHED",
    desc: "Low-latency sensory wearable interpreting Indian Sign Language gestures into synthesized speech.",
  },
  {
    id: "energy",
    title: "Smart Campus Energy Grid",
    services: "IOT & SUSTAINABILITY",
    image: "/images/AAC2.png",
    link: "/projects",
    year: "2023–2025",
    desc: "Intelligent power telemetry network balancing building energy loads and optimizing institutional consumption.",
  },
  {
    id: "satellite",
    title: "Earth Imaging Space Payload",
    services: "ISRO NRSC MoU",
    image: "/images/AAC1.png",
    link: "/News",
    year: "RESEARCH MoU",
    desc: "High-resolution multispectral imaging payload designed under academic partnership with National Remote Sensing Centre.",
  },
  {
    id: "rover",
    title: "Autonomous Solar Rover",
    services: "AUTONOMOUS VEHICLES",
    image: "/images/8.webp",
    link: "/projects",
    year: "2025",
    desc: "All-terrain research rover utilizing solar harvesting and real-time obstacle avoidance telemetry.",
  },
  {
    id: "matrix",
    title: "AAC Core R&D Ecosystem",
    services: "LAB ECOSYSTEM",
    image: "/images/grietlogo.png",
    link: "/Research",
    year: "ROOM 3614",
    desc: "Flagship innovation hub incubating student engineering prototypes, patents, and multi-disciplinary research.",
  },
  {
    id: "gprime",
    title: "G-Prime Competitive Judge",
    services: "DISTRIBUTED SOFTWARE",
    image: "/images/AAC2.png",
    link: "/gprime2026-results",
    year: "CONTEST INFRA",
    desc: "Distributed sandboxed code evaluation engine supporting high-concurrency national coding competitions.",
  },
];

// Helper functions from the authentic Garcy dome.js
const mod = (value, size) => ((value % size) + size) % size;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

function wrapPosition(value, period) {
  return mod(value + period / 2, period) - period / 2;
}

function gridPeriods(count) {
  return { columns: count, rows: Math.max(1, Math.floor(count / 3)) };
}

function gridCell(column, row, count = 9) {
  return mod(column + 1 + mod(row + 1, gridPeriods(count).rows) * 3, count);
}

// Convert 4 quadrilateral warped corners to CSS matrix3d
function quadMatrix([p0, p1, p2, p3], width, height) {
  const dx1 = p1.x - p3.x, dy1 = p1.y - p3.y, dx2 = p2.x - p3.x, dy2 = p2.y - p3.y;
  const sx = p0.x - p1.x - p2.x + p3.x, sy = p0.y - p1.y - p2.y + p3.y;
  const denominator = dx1 * dy2 - dx2 * dy1;
  const g = denominator ? (sx * dy2 - dx2 * sy) / denominator : 0;
  const h = denominator ? (dx1 * sy - sx * dy1) / denominator : 0;
  const a = p1.x - p0.x + g * p1.x, b = p2.x - p0.x + h * p2.x;
  const d = p1.y - p0.y + g * p1.y, e = p2.y - p0.y + h * p2.y;
  return `matrix3d(${a / width},${d / width},0,${g / width},${b / height},${e / height},0,${h / height},0,0,1,0,${p0.x},${p0.y},0,1)`;
}

export default function GarcyProjectsGallery({ onSelectCase, onNavigateBack }) {
  const rootRef = useRef(null);
  const surfaceRef = useRef(null);

  const [selectedProject, setSelectedProject] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Dome coordinate state refs
  const stateRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    vx: 0,
    vy: 0,
    pointer: null,
    dragX: 0,
    dragY: 0,
    dragTargetX: 0,
    dragTargetY: 0,
    dragDistance: 0,
    cursorX: 0,
    cursorY: 0,
    cursorTargetX: 0,
    cursorTargetY: 0,
    lens: 0,
    lensTarget: 0,
    width: 0,
    height: 0,
    cardWidth: 0,
    cardHeight: 0,
    stepX: 0,
    stepY: 0,
    columns: 0,
    rows: 0,
    pool: [],
  });

  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(0);

  // Restore saved dome position if user returns from another page
  useEffect(() => {
    try {
      const savedX = sessionStorage.getItem("aac_dome_x");
      const savedY = sessionStorage.getItem("aac_dome_y");
      if (savedX !== null && savedY !== null) {
        stateRef.current.x = parseFloat(savedX) || 0;
        stateRef.current.targetX = stateRef.current.x;
        stateRef.current.y = parseFloat(savedY) || 0;
        stateRef.current.targetY = stateRef.current.y;
      }
    } catch (e) {}
  }, []);

  const saveState = useCallback(() => {
    try {
      sessionStorage.setItem("aac_dome_x", stateRef.current.x.toString());
      sessionStorage.setItem("aac_dome_y", stateRef.current.y.toString());
      sessionStorage.setItem("aac_last_section", "projects");
    } catch (e) {}
  }, []);

  // Build tile pool DOM elements
  const buildPool = useCallback(() => {
    const root = rootRef.current;
    const surface = surfaceRef.current;
    if (!root || !surface) return;

    const s = stateRef.current;
    const count = DOME_PROJECTS.length;
    const periods = gridPeriods(count);
    const cols = Math.ceil((Math.ceil(s.width / s.stepX) + 2) / periods.columns) * periods.columns;
    const period = periods.rows;
    const nextRows = Math.ceil((Math.ceil(s.height / s.stepY) + 2) / period) * period;

    if (cols === s.columns && nextRows === s.rows && s.pool.length > 0) return;

    s.columns = cols;
    s.rows = nextRows;
    surface.innerHTML = "";
    s.pool = [];

    const fragment = document.createDocumentFragment();

    for (let row = 0; row < nextRows; row++) {
      for (let col = 0; col < cols; col++) {
        const column = col - Math.floor(cols / 2);
        const line = row - Math.floor(nextRows / 2);
        const projectIndex = gridCell(column, line, count);
        const project = DOME_PROJECTS[projectIndex];

        const card = document.createElement("div");
        card.className = "dome-tile";
        card.setAttribute("role", "link");
        card.setAttribute("aria-label", project.title);
        card.tabIndex = -1;
        card.dataset.id = project.id;
        card.dataset.index = projectIndex.toString();

        // Image container
        const img = document.createElement("img");
        img.src = project.image;
        img.alt = project.title;
        img.draggable = false;
        img.loading = "eager";
        img.style.position = "absolute";
        img.style.inset = "0";
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        img.style.pointerEvents = "none";
        img.style.willChange = "transform";
        card.appendChild(img);

        // Caption overlay matching Garcy Studio exactly
        const caption = document.createElement("div");
        caption.className = "project-caption";
        caption.style.position = "absolute";
        caption.style.zIndex = "2";
        caption.style.left = "16px";
        caption.style.right = "16px";
        caption.style.bottom = "16px";
        caption.style.display = "flex";
        caption.style.alignItems = "flex-end";
        caption.style.justifyContent = "space-between";
        caption.style.gap = "8px";
        caption.style.pointerEvents = "none";

        const titleDiv = document.createElement("div");
        titleDiv.style.minWidth = "0";
        const h3 = document.createElement("h3");
        h3.textContent = project.title;
        h3.style.margin = "0";
        h3.style.fontSize = "16px";
        h3.style.fontWeight = "700";
        h3.style.color = "#fff";
        h3.style.letterSpacing = "-0.02em";
        h3.style.lineHeight = "1.15";
        titleDiv.appendChild(h3);

        const servDiv = document.createElement("div");
        servDiv.style.flexShrink = "0";
        servDiv.style.textAlign = "right";
        const span = document.createElement("span");
        span.textContent = project.services;
        span.style.fontFamily = "var(--garcy-mono, monospace)";
        span.style.fontSize = "9.5px";
        span.style.color = "#49A3FF";
        span.style.textTransform = "uppercase";
        span.style.letterSpacing = "0.08em";
        span.style.fontWeight = "600";
        servDiv.appendChild(span);

        caption.appendChild(titleDiv);
        caption.appendChild(servDiv);
        card.appendChild(caption);

        fragment.appendChild(card);
        s.pool.push({ card, img, column, line, project, visible: null });
      }
    }

    surface.appendChild(fragment);
  }, []);

  const measure = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;

    const s = stateRef.current;
    s.width = root.clientWidth;
    s.height = root.clientHeight;

    s.cardWidth = clamp(s.width / 3.12, 260, 560);
    s.cardHeight = s.cardWidth * (498 / 458);
    s.stepX = s.cardWidth + Math.max(12, s.cardWidth * 0.035);
    s.stepY = s.cardHeight + Math.max(12, s.cardWidth * 0.035);

    root.style.setProperty("--project-width", `${s.cardWidth}px`);
    root.style.setProperty("--project-height", `${s.cardHeight}px`);
    root.style.setProperty("--project-scale", String(s.cardWidth / 458));

    buildPool();
  }, [buildPool]);

  // Main 60fps Paint loop: Dome warping and 3D matrix projection
  const paint = useCallback(() => {
    const s = stateRef.current;
    if (!s.width || !s.height || !s.stepX || !s.stepY) return;

    function warp(px, py) {
      const nx = px / (s.width / 2);
      const ny = py / (s.height / 2);
      const factor = 1 + 0.15 * (nx * nx + ny * ny);
      let wx = px * factor;
      let wy = py * factor;
      const dx = wx - s.cursorX;
      const dy = wy - s.cursorY;
      const reach = s.stepX * 1.5;
      const push = 0.25 * s.lens * Math.exp(-(dx * dx + dy * dy) / (reach * reach));
      return { x: wx + dx * push, y: wy + dy * push };
    }

    s.pool.forEach((tile) => {
      const px = wrapPosition(tile.column * s.stepX + s.x, s.columns * s.stepX);
      const py = wrapPosition(tile.line * s.stepY + s.y, s.rows * s.stepY);

      const visible = Math.abs(px) < s.width / 2 + s.stepX && Math.abs(py) < s.height / 2 + s.stepY;

      if (tile.visible !== visible) {
        tile.card.style.visibility = visible ? "visible" : "hidden";
        tile.card.setAttribute("aria-hidden", String(!visible));
        tile.card.tabIndex = visible ? 0 : -1;
        tile.visible = visible;
      }

      if (!visible) return;

      const q = [
        warp(px - s.stepX / 2, py - s.stepY / 2),
        warp(px + s.stepX / 2, py - s.stepY / 2),
        warp(px - s.stepX / 2, py + s.stepY / 2),
        warp(px + s.stepX / 2, py + s.stepY / 2),
      ];

      const inset = (c, a, b) => {
        const da = Math.hypot(a.x - c.x, a.y - c.y) || 1;
        const db = Math.hypot(b.x - c.x, b.y - c.y) || 1;
        const gap = (s.stepX - s.cardWidth) / 2;
        return {
          x: c.x + gap * ((a.x - c.x) / da + (b.x - c.x) / db),
          y: c.y + gap * ((a.y - c.y) / da + (b.y - c.y) / db),
        };
      };

      const corners = [
        inset(q[0], q[1], q[2]),
        inset(q[1], q[0], q[3]),
        inset(q[2], q[0], q[3]),
        inset(q[3], q[1], q[2]),
      ];

      tile.card.style.transform = quadMatrix(corners, s.cardWidth, s.cardHeight);

      const driftX = clamp((s.cursorX - px) / (s.stepX * 1.5), -1, 1) * 14 * s.lens;
      const driftY = clamp((s.cursorY - py) / (s.stepX * 1.5), -1, 1) * 14 * s.lens;
      tile.img.style.transform = `translate3d(${driftX.toFixed(1)}px, ${driftY.toFixed(1)}px, 0) scale(1.06)`;
    });
  }, []);

  // Tick loop with momentum decay & smooth easing
  useEffect(() => {
    measure();
    lastTimeRef.current = performance.now();

    const tick = (now) => {
      const dt = Math.min(now - lastTimeRef.current, 50);
      lastTimeRef.current = now;
      const s = stateRef.current;

      if (s.pointer === null) {
        s.targetX += (s.vx * dt) / 16.67;
        s.targetY += (s.vy * dt) / 16.67;
        s.vx *= Math.pow(0.92, dt / 16.67);
        s.vy *= Math.pow(0.92, dt / 16.67);
      }

      const blend = 1 - Math.pow(0.88, dt / 16.67);
      s.x += (s.targetX - s.x) * blend;
      s.y += (s.targetY - s.y) * blend;

      s.cursorX += (s.cursorTargetX - s.cursorX) * (1 - Math.pow(0.88, dt / 16.67));
      s.cursorY += (s.cursorTargetY - s.cursorY) * (1 - Math.pow(0.88, dt / 16.67));

      const calm = 1 / (1 + (Math.abs(s.targetX - s.x) + Math.abs(s.targetY - s.y)) / 40);
      const desiredLens = s.lensTarget * calm;
      s.lens += (desiredLens - s.lens) * (1 - Math.pow(0.92, dt / 16.67));

      paint();
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    const handleResize = () => {
      measure();
      paint();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [measure, paint]);

  // Pointer interactions: Drag anywhere in 2D
  const handlePointerDown = (e) => {
    if (e.button !== 0 || e.target.closest("button") || e.target.closest(".case-modal")) return;
    const s = stateRef.current;
    s.pointer = e.pointerId;
    s.dragDistance = 0;
    s.dragX = e.clientX;
    s.dragY = e.clientY;
    s.dragTargetX = s.targetX;
    s.dragTargetY = s.targetY;
    s.vx = 0;
    s.vy = 0;

    setIsDragging(true);
    if (surfaceRef.current) {
      surfaceRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e) => {
    const s = stateRef.current;
    const root = rootRef.current;
    if (root) {
      const rect = root.getBoundingClientRect();
      s.cursorTargetX = e.clientX - rect.left - s.width / 2;
      s.cursorTargetY = e.clientY - rect.top - s.height / 2;
      s.lensTarget = 1;
    }

    if (e.pointerId !== s.pointer) return;

    const dx = e.clientX - s.dragX;
    const dy = e.clientY - s.dragY;
    s.dragDistance = Math.max(s.dragDistance, Math.hypot(dx, dy));

    const speed = 1.6;
    s.targetX = s.dragTargetX + dx * speed;
    s.targetY = s.dragTargetY + dy * speed;

    s.vx = dx * 0.4;
    s.vy = dy * 0.4;
  };

  const handlePointerUp = (e) => {
    const s = stateRef.current;
    if (e.pointerId === s.pointer) {
      setIsDragging(false);
      s.pointer = null;

      // If clicked without substantial dragging, open project details!
      if (s.dragDistance < 8) {
        const tile = e.target.closest(".dome-tile");
        if (tile) {
          const id = tile.dataset.id;
          const proj = DOME_PROJECTS.find((p) => p.id === id);
          if (proj) {
            saveState();
            if (onSelectCase) {
              onSelectCase(proj.id);
            } else {
              setSelectedProject(proj);
            }
          }
        }
      }
    }
  };

  // Mouse wheel: Pan freely in 2D
  const handleWheel = (e) => {
    const s = stateRef.current;
    s.targetX -= e.deltaX * 1.2;
    s.targetY -= e.deltaY * 1.2;
    s.vx = 0;
    s.vy = 0;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      const s = stateRef.current;
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home"].includes(e.key)) {
        e.preventDefault();
        s.vx = 0;
        s.vy = 0;
        if (e.key === "ArrowLeft") s.targetX += s.stepX * 0.8;
        if (e.key === "ArrowRight") s.targetX -= s.stepX * 0.8;
        if (e.key === "ArrowUp") s.targetY += s.stepY * 0.8;
        if (e.key === "ArrowDown") s.targetY -= s.stepY * 0.8;
        if (e.key === "Home") s.targetX = s.targetY = 0;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handlePrev = (e) => {
    e.stopPropagation();
    stateRef.current.targetX += stateRef.current.stepX * 1.2;
  };

  const handleNext = (e) => {
    e.stopPropagation();
    stateRef.current.targetX -= stateRef.current.stepX * 1.2;
  };

  return (
    <section
      ref={rootRef}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={() => {
        stateRef.current.lensTarget = 0;
      }}
      className={`projects relative w-full h-full overflow-hidden select-none bg-gradient-to-br from-[#121622] via-[#070A10] to-[#020306] text-[#EAF1FF] ${
        isDragging ? "dome-dragging cursor-grabbing" : "cursor-grab"
      }`}
      style={{
        position: "absolute",
        inset: 0,
        touchAction: "none",
      }}
    >
      {/* Top Breadcrumb Navigation */}
      <div className="relative z-30 flex items-center justify-between px-6 sm:px-10 pt-3 pb-2 border-b border-white/10 pointer-events-auto">
        <div className="flex items-center gap-3">
          {onNavigateBack ? (
            <button
              type="button"
              onClick={onNavigateBack}
              className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#49A3FF] font-semibold hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>← 02 // 3D HELIX</span>
            </button>
          ) : (
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#49A3FF] font-semibold">
              03 // SHOWCASE
            </span>
          )}
          <span className="text-white/20">/</span>
          <h2 className="font-sans font-bold text-xs sm:text-sm uppercase tracking-wider text-white">
            Engineering Projects &amp; Autonomous Systems
          </h2>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/50">
            DRAG ANYWHERE IN 2D OR SCROLL TO EXPLORE
          </span>
        </div>
      </div>

      {/* Infinite 2D Dome Canvas Surface */}
      <div
        ref={surfaceRef}
        className="dome-surface"
        style={{
          position: "absolute",
          inset: 0,
          touchAction: "none",
        }}
      />

      {/* Bottom Controls Pill (Back / Next) */}
      <div
        className="project-controls pointer-events-auto"
        style={{
          position: "absolute",
          zIndex: 40,
          bottom: "32px",
          right: "32px",
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          type="button"
          onClick={handlePrev}
          className="projects-back group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/15 text-xs font-semibold text-white transition-all shadow-lg cursor-pointer"
          aria-label="Previous projects"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span>Back</span>
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="projects-next group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/15 text-xs font-semibold text-white transition-all shadow-lg cursor-pointer"
          aria-label="Next projects"
        >
          <span>Next</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>

      {/* Detail Modal Overlay when clicking a project */}
      {selectedProject && (
        <div
          className="case-modal fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-fade-in pointer-events-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#090F1D] border border-[#49A3FF]/40 rounded-2xl p-6 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.95)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 text-white/50 hover:text-white p-2 text-sm cursor-pointer"
              aria-label="Close modal"
            >
              <FaTimes />
            </button>

            <span className="font-mono text-[10px] uppercase tracking-widest text-[#49A3FF] font-bold px-2.5 py-1 rounded bg-[#1769FF]/20 border border-[#1769FF]/40 inline-block mb-3">
              {selectedProject.services} // {selectedProject.year}
            </span>

            <h2 className="font-sans font-bold text-2xl sm:text-3xl text-white mb-4">
              {selectedProject.title}
            </h2>

            <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden mb-6 border border-white/10">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>

            <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed mb-6">
              {selectedProject.desc}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                onClick={() => setSelectedProject(null)}
                className="font-mono text-xs uppercase tracking-wider text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                ← Return to Collage
              </button>
              <a
                href={selectedProject.link}
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-black bg-[#49A3FF] hover:bg-white px-5 py-2.5 rounded-lg font-bold transition-all shadow-md"
              >
                <span>Full Project Page</span>
                <FaExternalLinkAlt className="text-[10px]" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
