import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { FaTimes, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { useDatabase } from "@/hooks/useDatabase";

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
    githubRepo: "https://github.com/AAC-GRIET",
    team: "AAC Robotics Lab Team",
  },
  {
    id: "nav",
    title: "Intelligent Campus Navigation",
    services: "AR & INDOOR POSITIONING",
    image: "/images/pic.webp",
    link: "/projects",
    year: "2024–2025",
    desc: "Sub-meter AR indoor positioning and directional wayfinding system mapping GRIET campus complexes.",
    githubRepo: "https://github.com/AAC-GRIET",
    team: "Abhiram Pedamallu, V. Dinesh Chandra, Seetaram Koushik",
  },
  {
    id: "pill",
    title: "Automated Pill Reminder",
    services: "PATENT 201941002559",
    image: "/images/AAC1.png",
    link: "/Patents",
    year: "PATENT PUBLISHED",
    desc: "Patented assistive medical adherence system with modular dosage cartridges and two-way verification.",
    githubRepo: "https://github.com/AAC-GRIET",
    team: "Yelma Chethan Reddy, Alence Abhinay, B.S.V.S Anoop",
  },
  {
    id: "glove",
    title: "Smart Sign Language Glove",
    services: "PATENT 202041038106",
    image: "/images/AAC3.png",
    link: "/Patents",
    year: "PATENT PUBLISHED",
    desc: "Low-latency sensory wearable interpreting Indian Sign Language gestures into synthesized speech.",
    githubRepo: "https://github.com/AAC-GRIET",
    team: "Jashwanth Kranthi Bopanna, Santosh Sanjeev, Bharath Varma",
  },
  {
    id: "energy",
    title: "Smart Campus Energy Grid",
    services: "IOT & SUSTAINABILITY",
    image: "/images/AAC2.png",
    link: "/projects",
    year: "2023–2025",
    desc: "Intelligent power telemetry network balancing building energy loads and optimizing institutional consumption.",
    githubRepo: "https://github.com/AAC-GRIET",
    team: "Abhiram Dodda, Manav, Srija Cherukuri",
  },
  {
    id: "satellite",
    title: "Earth Imaging Space Payload",
    services: "ISRO NRSC MoU",
    image: "/images/AAC1.png",
    link: "/News",
    year: "RESEARCH MoU",
    desc: "High-resolution multispectral imaging payload designed under academic partnership with National Remote Sensing Centre.",
    githubRepo: "https://github.com/AAC-GRIET",
    team: "AAC Space Payload Cell",
  },
  {
    id: "rover",
    title: "Autonomous Solar Rover",
    services: "AUTONOMOUS VEHICLES",
    image: "/images/8.webp",
    link: "/projects",
    year: "2025",
    desc: "All-terrain research rover utilizing solar harvesting and real-time obstacle avoidance telemetry.",
    githubRepo: "https://github.com/AAC-GRIET",
    team: "Autonomous Vehicles Group",
  },
  {
    id: "matrix",
    title: "AAC Core R&D Ecosystem",
    services: "LAB ECOSYSTEM",
    image: "/images/grietlogo.png",
    link: "/Research",
    year: "ROOM 3614",
    desc: "Flagship innovation hub incubating student engineering prototypes, patents, and multi-disciplinary research.",
    githubRepo: "https://github.com/AAC-GRIET",
    team: "Core Committee & Fellows",
  },
  {
    id: "gprime",
    title: "G-Prime Competitive Judge",
    services: "DISTRIBUTED SOFTWARE",
    image: "/images/AAC2.png",
    link: "/gprime2026-results",
    year: "CONTEST INFRA",
    desc: "Distributed sandboxed code evaluation engine supporting high-concurrency national coding competitions.",
    githubRepo: "https://github.com/AAC-GRIET",
    team: "Software Systems Engineering",
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
  const { data: dbProjects } = useDatabase("projects");
  const rootRef = useRef(null);
  const surfaceRef = useRef(null);

  const [selectedProject, setSelectedProject] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const projectsData = useMemo(() => {
    if (dbProjects && dbProjects.length > 0) {
      return dbProjects.map((p) => ({
        id: p.id || p._id || p.slug || `proj-${Math.random()}`,
        title: p.title || "Project",
        services: (p.categories || p.category || "ENGINEERING").toUpperCase(),
        image: p.mainImageUrl || p.image || "/images/pic.webp",
        link: p.link || `/projects/${p.id || p._id || p.slug || ""}`,
        year: p.publishedAt ? new Date(p.publishedAt).getFullYear().toString() : (p.year || "2025"),
        desc: p.description || p.content || "",
        content: p.content || "",
        githubRepo: p.githubRepo || p.github || p.githubUrl || p.repo || "",
        team: Array.isArray(p.names) ? p.names.join(", ") : (p.names || p.author || p.team || ""),
        raw: p,
      }));
    }
    return DOME_PROJECTS;
  }, [dbProjects]);

  // Dome coordinate state refs
  const stateRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    vx: 0,
    vy: 0,
    pointer: null,
    dragDistance: 0,
    lastMoveX: 0,
    lastMoveY: 0,
    lastMoveTime: 0,
    clickedTileId: null,
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
    const count = projectsData.length;
    const periods = gridPeriods(count);
    const cols = Math.ceil((Math.ceil(s.width / s.stepX) + 2) / periods.columns) * periods.columns;
    const period = periods.rows;
    const nextRows = Math.ceil((Math.ceil(s.height / s.stepY) + 2) / period) * period;

    if (cols === s.columns && nextRows === s.rows && s.pool.length > 0 && s.lastCount === count) return;

    s.columns = cols;
    s.rows = nextRows;
    s.lastCount = count;
    surface.innerHTML = "";
    s.pool = [];

    const fragment = document.createDocumentFragment();

    for (let row = 0; row < nextRows; row++) {
      for (let col = 0; col < cols; col++) {
        const column = col - Math.floor(cols / 2);
        const line = row - Math.floor(nextRows / 2);
        const projectIndex = gridCell(column, line, count);
        const project = projectsData[projectIndex];

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
        span.style.color = "#E5A93C";
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
  }, [projectsData]);

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

  // Re-measure and build when projects data updates
  useEffect(() => {
    measure();
  }, [measure]);

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
        if (Math.abs(s.vx) > 0.02) {
          s.targetX += (s.vx * dt) / 16.67;
          s.vx *= Math.pow(0.92, dt / 16.67);
        } else {
          s.vx = 0;
        }
        if (Math.abs(s.vy) > 0.02) {
          s.targetY += (s.vy * dt) / 16.67;
          s.vy *= Math.pow(0.92, dt / 16.67);
        } else {
          s.vy = 0;
        }
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
    s.lastMoveX = e.clientX;
    s.lastMoveY = e.clientY;
    s.lastMoveTime = performance.now();
    s.vx = 0;
    s.vy = 0;

    const tile = e.target.closest(".dome-tile");
    s.clickedTileId = tile ? tile.dataset.id : null;

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

    const now = performance.now();
    const dt = Math.max(1, now - (s.lastMoveTime || now));
    const deltaX = e.clientX - s.lastMoveX;
    const deltaY = e.clientY - s.lastMoveY;

    s.dragDistance += Math.hypot(deltaX, deltaY);

    const speed = 1.35;
    s.targetX += deltaX * speed;
    s.targetY += deltaY * speed;

    if (dt > 0) {
      const instVx = (deltaX / dt) * 16.67 * speed;
      const instVy = (deltaY / dt) * 16.67 * speed;
      s.vx = s.vx * 0.4 + instVx * 0.6;
      s.vy = s.vy * 0.4 + instVy * 0.6;
    }

    s.lastMoveX = e.clientX;
    s.lastMoveY = e.clientY;
    s.lastMoveTime = now;
  };

  const handlePointerUp = (e) => {
    const s = stateRef.current;
    if (e.pointerId === s.pointer) {
      setIsDragging(false);
      s.pointer = null;

      // If released after pause, kill momentum so it stays exactly where released
      const now = performance.now();
      if (now - (s.lastMoveTime || now) > 60) {
        s.vx = 0;
        s.vy = 0;
      } else {
        s.vx = clamp(s.vx, -35, 35);
        s.vy = clamp(s.vy, -25, 25);
      }

      saveState();

      // If clicked without dragging (dragDistance < 10), open project details!
      if (s.dragDistance < 10 && s.clickedTileId) {
        const proj =
          projectsData.find((p) => String(p.id) === String(s.clickedTileId)) ||
          DOME_PROJECTS.find((p) => String(p.id) === String(s.clickedTileId));
        if (proj) {
          if (onSelectCase) {
            onSelectCase(proj.id);
          } else {
            setSelectedProject(proj);
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
      className={`projects relative w-full h-full overflow-hidden select-none bg-[#08090C] text-[#FAF6ED] ${
        isDragging ? "dome-dragging cursor-grabbing" : "cursor-grab"
      }`}
      style={{
        position: "absolute",
        inset: 0,
        touchAction: "none",
      }}
    >
      {/* Top Breadcrumb Navigation */}
      <div className="relative z-30 flex items-center justify-between px-6 sm:px-10 pt-3 pb-2 border-b border-[#2A261F] pointer-events-auto">
        <div className="flex items-center gap-3">
          {onNavigateBack ? (
            <button
              type="button"
              onClick={onNavigateBack}
              className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#E5A93C] hover:text-[#F6C463] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>← 02 // 3D HELIX</span>
            </button>
          ) : (
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#E5A93C] font-semibold">
              03 // SHOWCASE
            </span>
          )}
          <span className="text-[#9E988A]/40">/</span>
          <h2 className="font-sans font-bold text-xs sm:text-sm uppercase tracking-wider text-white">
            Engineering Projects &amp; Autonomous Systems
          </h2>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#9E988A]">
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
          className="projects-back group flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111318] hover:bg-[#181A20] backdrop-blur-xl border border-[#2A261F] text-xs font-semibold text-[#FAF6ED] hover:text-[#E5A93C] transition-all shadow-lg cursor-pointer"
          aria-label="Previous projects"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span>Back</span>
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="projects-next group flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111318] hover:bg-[#181A20] backdrop-blur-xl border border-[#2A261F] text-xs font-semibold text-[#FAF6ED] hover:text-[#E5A93C] transition-all shadow-lg cursor-pointer"
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
            className="relative w-full max-w-2xl bg-[#111318] border border-[#2A261F] rounded-2xl p-6 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 text-[#9E988A] hover:text-white p-2 text-sm cursor-pointer rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Close modal"
            >
              <FaTimes />
            </button>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#E5A93C] font-bold px-2.5 py-1 rounded bg-[#E5A93C]/10 border border-[#2A261F]">
                {selectedProject.services}
              </span>
              {selectedProject.year && (
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#9E988A] px-2.5 py-1 rounded bg-white/5 border border-[#2A261F]">
                  {selectedProject.year}
                </span>
              )}
            </div>

            <h2 className="font-sans font-bold text-2xl sm:text-3xl text-white mb-2">
              {selectedProject.title}
            </h2>

            {selectedProject.team && (
              <div className="flex items-center gap-2 text-xs font-mono text-[#9E988A] mb-4">
                <span className="text-[#E5A93C]">Team:</span>
                <span className="text-white/80">{selectedProject.team}</span>
              </div>
            )}

            <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden mb-6 border border-[#2A261F]">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>

            <p className="font-sans text-sm sm:text-base text-[#FAF6ED]/85 leading-relaxed mb-4">
              {selectedProject.desc}
            </p>

            {selectedProject.content && selectedProject.content !== selectedProject.desc && (
              <div className="font-sans text-xs sm:text-sm text-[#9E988A] leading-relaxed mb-6 bg-white/[0.02] p-4 rounded-xl border border-white/5 whitespace-pre-line">
                {selectedProject.content}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#2A261F]">
              <button
                onClick={() => setSelectedProject(null)}
                className="font-mono text-xs uppercase tracking-wider text-[#9E988A] hover:text-white transition-colors cursor-pointer"
              >
                ← Return to Collage
              </button>
              
              <div className="flex items-center gap-3">
                {selectedProject.githubRepo && (
                  <a
                    href={selectedProject.githubRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-white bg-[#181A20] hover:bg-[#20242C] border border-[#2A261F] hover:border-[#E5A93C]/40 px-4 py-2.5 rounded-lg font-semibold transition-all shadow-md"
                  >
                    <FaGithub className="text-sm text-[#E5A93C]" />
                    <span>GitHub Repo</span>
                  </a>
                )}
                <a
                  href={selectedProject.link}
                  className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#08090C] bg-[#E5A93C] hover:bg-[#F6C463] px-5 py-2.5 rounded-lg font-bold transition-all shadow-md"
                >
                  <span>Full Project Page</span>
                  <FaExternalLinkAlt className="text-[10px]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
