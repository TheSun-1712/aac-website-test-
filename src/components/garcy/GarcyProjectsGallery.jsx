import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import {
  FaTimes,
  FaExternalLinkAlt,
  FaGithub,
  FaGlobe,
  FaBookOpen,
  FaShareAlt,
  FaCheck,
  FaArrowLeft,
  FaTerminal,
} from "react-icons/fa";
import { useDatabase } from "@/hooks/useDatabase";

// AAC Core Engineering Projects & Prototypes
const DOME_PROJECTS = [
  {
    id: "uav",
    title: "Autonomous Multi-Rotor UAV",
    subtitle: "Next-gen aerial autonomy with sub-millisecond edge obstacle avoidance",
    client: "AAC ROBOTICS & AUTONOMOUS SYSTEMS LAB",
    field: "AERIAL ROBOTICS / EDGE AI",
    services: "PX4 AUTOPILOT, ROS2, JETSON NANO, LIDAR ODOMETRY",
    image: "/images/8.webp",
    link: "/projects",
    year: "2024–2025",
    desc: "Autonomous multi-rotor UAV platform featuring edge obstacle avoidance, GPS waypoint guidance, and live telemetry downlink developed at AAC Robotics Lab.",
    content: "Engineered from first principles with custom carbon-fiber airframes, onboard NVIDIA Jetson edge inference compute, and dual optical flow sensors for GPS-denied indoor flight stabilization. The platform streams high-throughput telemetry to the ground station over encrypted 5.8GHz links.",
    githubRepo: "https://github.com/AAC-GRIET",
    team: "AAC Robotics Lab Team",
  },
  {
    id: "nav",
    title: "Intelligent Campus Navigation",
    subtitle: "Sub-meter AR indoor positioning and directional wayfinding",
    client: "AAC MOBILE & AR RESEARCH LAB",
    field: "AUGMENTED REALITY / SPATIAL MAPPING",
    services: "AR SPATIAL MAPPING, INDOOR POSITIONING, LOW-LATENCY PATHFINDING",
    image: "/images/pic.webp",
    link: "/projects",
    year: "2024–2025",
    desc: "Sub-meter AR indoor positioning and directional wayfinding system mapping GRIET campus complexes.",
    content: "Combines localized radio fingerprinting, inertial dead-reckoning, and camera-based AR visual odometry. Eliminates orientation friction across collegiate corridors without external satellite reception.",
    githubRepo: "https://github.com/AAC-GRIET",
    team: "Abhiram Pedamallu, V. Dinesh Chandra, Seetaram Koushik",
  },
  {
    id: "pill",
    title: "Automated Pill Reminder",
    subtitle: "Indian Patent 201941002559 — Patented Two-Way Medication Compliance",
    client: "AAC BIOMEDICAL IP INVENTIONS CELL",
    field: "BIOMEDICAL DEVICES / EMBEDDED HEALTHCARE IP",
    services: "PATENT PROSECUTION, TWO-WAY VERIFICATION, CUSTOM PCB, REPLACEABLE MODULES",
    image: "/images/AAC1.png",
    link: "/Patents",
    year: "PATENT GRANTED",
    desc: "Patented assistive medical adherence system with modular dosage cartridges and two-way verification.",
    content: "Features automated dispensing carousels, tactile auditory reminders, and cryptographic two-way compliance logging to eradicate medication double-dosing among elderly patients.",
    githubRepo: "https://github.com/AAC-GRIET",
    team: "Yelma Chethan Reddy, Alence Abhinay, B.S.V.S Anoop, M Srikanth, D. Naga pavan, G Pradeep Reddy",
  },
  {
    id: "glove",
    title: "Smart Sign Language Glove",
    subtitle: "Indian Patent 202041038106 — Real-Time Sensory Gesture Translation",
    client: "AAC ASSISTIVE WEARABLES LAB",
    field: "ASSISTIVE TECH / WEARABLE MECHATRONICS",
    services: "FLEX TRANSDUCERS, REAL-TIME DSP, TEXT-TO-SPEECH, SENSOR FUSION",
    image: "/images/AAC3.png",
    link: "/Patents",
    year: "PATENT PUBLISHED",
    desc: "Low-latency sensory wearable interpreting Indian Sign Language gestures into synthesized speech.",
    content: "Integrates 5 conductive polymer flex sensors, 9-DOF IMU motion tracking, and embedded speech synthesis firmware operating with under 25ms end-to-end latency.",
    githubRepo: "https://github.com/AAC-GRIET",
    team: "Jashwanth Kranthi Bopanna, Santosh Sanjeev, Bharath Varma Kantheti, Gowtham Sai Ponnekanti, Suhas Gangireddy, G Pradeep Reddy",
  },
  {
    id: "energy",
    title: "Smart Campus Energy Grid",
    subtitle: "Real-time MQTT telemetry and predictive institutional load-balancing",
    client: "AAC IOT & SMART GRID LAB",
    field: "IOT / PREDICTIVE ANALYTICS / CLEAN-TECH",
    services: "DISTRIBUTED CT SENSORS, MQTT BROKER, EDGE ML, POWER FORECASTING",
    image: "/images/AAC2.png",
    link: "/projects",
    year: "2023–2025",
    desc: "Intelligent power telemetry network balancing building energy loads and optimizing institutional consumption.",
    content: "Monitors electrical substations across campus using custom ESP32 current transducer arrays. An autoregressive ML model dynamically shifts non-critical loads to prevent peak demand penalties.",
    githubRepo: "https://github.com/AAC-GRIET",
    team: "Abhiram Dodda, Manav, Srija Cherukuri",
  },
  {
    id: "satellite",
    title: "Earth Imaging Space Payload",
    subtitle: "Multispectral sensor instrumentation in partnership with ISRO NRSC",
    client: "ISRO NRSC RESEARCH ALLIANCE",
    field: "AEROSPACE INSTRUMENTATION / REMOTE SENSING",
    services: "MULTISPECTRAL SENSORS, RADIATION-HARDENED FPGA, TELEMETRY",
    image: "/images/AAC1.png",
    link: "/News",
    year: "RESEARCH MoU",
    desc: "High-resolution multispectral imaging payload designed under academic partnership with National Remote Sensing Centre.",
    content: "Engineered under institutional scientific agreement with NRSC, focusing on low-earth orbit imaging architectures and compression algorithms optimized for ground station transmission.",
    githubRepo: "https://github.com/AAC-GRIET",
    team: "AAC Space Payload Cell & Faculty Mentors",
  },
  {
    id: "rover",
    title: "Autonomous Solar Rover",
    subtitle: "All-terrain research rover utilizing adaptive solar tracking & LiDAR SLAM",
    client: "AAC VEHICULAR AUTONOMY CELL",
    field: "ROVER MECHATRONICS / FIELD ROBOTICS",
    services: "LIDAR SLAM, MPPT SOLAR HARVESTING, BRUSHLESS DRIVE, TELEMETRY",
    image: "/images/8.webp",
    link: "/projects",
    year: "2025",
    desc: "All-terrain research rover utilizing solar harvesting and real-time obstacle avoidance telemetry.",
    content: "Designed for unstructured outdoor terrain mapping, combining a 4-wheel independent rocker-bogie suspension with real-time 2D LiDAR SLAM and sun-tracking photovoltaic arrays.",
    githubRepo: "https://github.com/AAC-GRIET",
    team: "Autonomous Vehicles Group",
  },
  {
    id: "matrix",
    title: "AAC Core R&D Ecosystem",
    subtitle: "Flagship innovation cluster incubating student engineering prototypes",
    client: "ADVANCED ACADEMIC CENTER // GRIET",
    field: "INTERDISCIPLINARY SYSTEMS / INNOVATION HUB",
    services: "HARDWARE RAPID PROTOTYPING, PATENT DRAFTING, EMBEDDED LABS",
    image: "/images/grietlogo.png",
    link: "/Research",
    year: "ROOM 3614",
    desc: "Flagship innovation hub incubating student engineering prototypes, patents, and multi-disciplinary research.",
    content: "Operating out of Room 3614 at GRIET, AAC provides undergraduate researchers with precision lab benches, RF spectrum analyzers, 3D printing farms, and high-performance compute clusters.",
    githubRepo: "https://github.com/AAC-GRIET",
    team: "Core Committee, Alumni & Faculty Mentors",
  },
  {
    id: "gprime",
    title: "G-Prime Competitive Judge",
    subtitle: "High-concurrency distributed sandbox engine for algorithmic championships",
    client: "GPRIME STEERING COMMITTEE",
    field: "DISTRIBUTED SOFTWARE / SANDBOX RUNTIMES",
    services: "DOCKER RUNTIME, SECURE EVALUATION, WEBSOCKET TELEMETRY, CIPHER",
    image: "/images/AAC2.png",
    link: "/gprime2026-results",
    year: "CONTEST INFRA",
    desc: "Distributed sandboxed code evaluation engine supporting high-concurrency national coding competitions.",
    content: "Evaluates untrusted multi-language user submissions within micro-sandboxes with sub-80ms response times, real-time telemetry leaderboards, and automated test-case generation.",
    githubRepo: "https://github.com/AAC-GRIET",
    team: "Software Systems Engineering Cohort",
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

export default function GarcyProjectsGallery({
  initialProjects = [],
  onSelectCase,
  onNavigateBack,
}) {
  const { data: dbProjects } = useDatabase("projects", initialProjects);
  const rootRef = useRef(null);
  const surfaceRef = useRef(null);

  const [selectedProject, setSelectedProject] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && selectedProject) {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  const handleCopyProjectRef = (proj) => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/projects#${proj.id}`;
      navigator.clipboard?.writeText(url);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const projectsData = useMemo(() => {
    const list =
      dbProjects && dbProjects.length > 0
        ? dbProjects
        : initialProjects && initialProjects.length > 0
        ? initialProjects
        : DOME_PROJECTS;

    return list.map((p) => {
      const teamStr = Array.isArray(p.names)
        ? p.names.join(", ")
        : (Array.isArray(p.authors) ? p.authors.join(", ") : (p.names || p.author || p.team || "AAC Research Cohort"));
      const categoryStr = (p.categories || p.category || "Autonomous Systems").toUpperCase();
      return {
        id: p.id || p._id || p.slug || `proj-${Math.random()}`,
        title: p.title || "Engineering Project",
        subtitle: p.subtitle || p.tagline || `${categoryStr} Research Prototype`,
        client: p.client || p.lab || "AAC RESEARCH LAB // GRIET",
        field: p.field || p.domain || categoryStr,
        services: p.techStack || p.services || (p.technologies ? (Array.isArray(p.technologies) ? p.technologies.join(", ") : p.technologies) : categoryStr),
        image: p.mainImageUrl || p.image || "/images/pic.webp",
        link: p.website || p.demoLink || p.liveUrl || p.link || `/projects/${p.id || p._id || p.slug || ""}`,
        githubRepo: p.githubRepo || p.github || p.githubUrl || p.repo || "https://github.com/AAC-GRIET",
        paperLink: p.paperLink || p.docLink || p.documentation || "",
        year: p.publishedAt ? new Date(p.publishedAt).getFullYear().toString() : (p.year || "2025"),
        desc: p.description || p.intro || p.content || "Autonomous engineering prototype engineered at the Advanced Academic Center.",
        content: p.content || p.description || "",
        team: teamStr,
        raw: p,
      };
    });
  }, [dbProjects, initialProjects]);

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

      {/* Full-Viewport Garcy Studio Project Showcase Overlay (as in reference video) */}
      {selectedProject && (
        <div
          className="case-modal fixed inset-0 z-50 bg-[#08090C]/96 backdrop-blur-2xl p-3 sm:p-5 lg:p-7 flex flex-col justify-center items-center pointer-events-auto animate-fadeIn overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="w-full max-w-[1720px] h-full max-h-[96vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">
              
              {/* ====================================================================
                  LEFT COLUMN: THE BIG PANEL WITH UPLOADED IMAGE (50-55% width)
                  ==================================================================== */}
              <div className="lg:col-span-6 h-[440px] sm:h-[520px] lg:h-full relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#2A261F] bg-[#111318] shadow-[0_25px_60px_rgba(0,0,0,0.9)] group flex flex-col justify-between">
                {/* The Full Uploaded Image */}
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover absolute inset-0 select-none group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />

                {/* Subtle vignette gradient for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090C]/90 via-transparent to-[#08090C]/70 pointer-events-none" />

                {/* Top-Left Bar over image: Brand + Back Pill Button */}
                <div className="relative z-10 p-5 sm:p-7 flex items-center justify-between pointer-events-auto">
                  <div className="flex flex-col gap-2.5">
                    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/80 font-bold drop-shadow">
                      aac // griet
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(null)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white font-sans text-xs font-semibold hover:border-[#E5A93C] transition-all cursor-pointer shadow-lg active:scale-95 group/back"
                    >
                      <FaArrowLeft className="text-[10px] text-[#E5A93C] group-hover/back:-translate-x-0.5 transition-transform" />
                      <span>Back</span>
                    </button>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-[#E5A93C] uppercase tracking-wider font-bold">
                    {selectedProject.services?.split(",")[0] || "AUTONOMOUS PROTOTYPE"}
                  </span>
                </div>

                {/* Bottom Over Image: Archival Specimen Indicator */}
                <div className="relative z-10 p-5 sm:p-7">
                  <span className="font-mono text-[9.5px] text-[#9E988A] uppercase tracking-widest block mb-0.5">
                    // SPECIMEN ARCHIVE
                  </span>
                  <p className="font-mono text-xs text-white/90 font-bold truncate">
                    REF: {selectedProject.id.toUpperCase()} // RESOLUTION: HIGH-DEF
                  </p>
                </div>
              </div>

              {/* ====================================================================
                  RIGHT COLUMN: TWO STACKED PANELS
                  ==================================================================== */}
              <div className="lg:col-span-6 flex flex-col gap-4 lg:gap-6 h-full min-h-0">
                
                {/* ------------------------------------------------------------------
                    TOP-RIGHT PANEL: BRIEF, SPECS TABLE, AND PROJECT TITLE
                    ------------------------------------------------------------------ */}
                <div className="flex-1 bg-[#111318] border border-[#2A261F] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-y-auto">
                  {/* Top utility row */}
                  <div className="flex items-center justify-between border-b border-[#2A261F] pb-3 mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#E5A93C] font-bold">
                      // SPECIFICATION DOSSIER
                    </span>

                    <div className="flex items-center gap-2">
                      <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#08090C] border border-[#2A261F] text-[#9E988A] font-mono text-[10px]">
                        <span className="text-[#E5A93C]">⌘K</span>
                        <span>SEARCH</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedProject(null)}
                        className="w-8 h-8 rounded-lg bg-[#08090C] border border-[#2A261F] text-[#9E988A] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Close project"
                      >
                        <FaTimes className="text-xs" />
                      </button>
                    </div>
                  </div>

                  {/* Overview paragraph */}
                  <div className="space-y-3 mb-4">
                    <p className="font-sans text-xs sm:text-sm text-[#FAF6ED]/85 leading-relaxed font-normal">
                      {selectedProject.desc || selectedProject.content || "The Advanced Academic Center team engineered this high-performance system combining distributed intelligence, edge inference, and sensory feedback."}
                    </p>
                  </div>

                  {/* Monospaced Technical Specifications Table */}
                  <div className="grid grid-cols-2 gap-y-3 gap-x-6 my-2 py-4 border-y border-[#2A261F] font-mono text-[10.5px] sm:text-[11.5px]">
                    <div>
                      <span className="text-[#9E988A] uppercase tracking-wider block text-[10px] mb-0.5">CLIENT</span>
                      <span className="text-white font-semibold uppercase">{selectedProject.client || "AAC RESEARCH LAB"}</span>
                    </div>
                    <div>
                      <span className="text-[#9E988A] uppercase tracking-wider block text-[10px] mb-0.5">FIELD</span>
                      <span className="text-white font-semibold uppercase">{selectedProject.field || selectedProject.services}</span>
                    </div>
                    <div>
                      <span className="text-[#9E988A] uppercase tracking-wider block text-[10px] mb-0.5">SERVICES</span>
                      <span className="text-white font-semibold uppercase truncate block" title={selectedProject.services}>
                        {selectedProject.services || "HARDWARE, EMBEDDED C++, EDGE AI"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#9E988A] uppercase tracking-wider block text-[10px] mb-0.5">YEAR</span>
                      <span className="text-[#E5A93C] font-bold uppercase">{selectedProject.year || "2024–2025"}</span>
                    </div>
                  </div>

                  {/* Project Title and Subtitle */}
                  <div className="pt-3">
                    <h2 className="font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
                      {selectedProject.title}
                    </h2>
                    <p className="font-sans text-xs sm:text-sm text-[#9E988A] mt-1.5 font-normal">
                      {selectedProject.subtitle || "Quietly disrupting the boundaries of autonomous engineering."}
                    </p>
                  </div>
                </div>

                {/* ------------------------------------------------------------------
                    BOTTOM-RIGHT PANEL: CONTENT & ICON BUTTONS
                    ------------------------------------------------------------------ */}
                <div className="flex-1 bg-[#111318] border border-[#2A261F] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-y-auto">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[#2A261F] pb-3 font-mono text-[10px] text-[#9E988A] uppercase tracking-wider">
                      <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        ENGINEERING TELEMETRY &amp; ACCESS
                      </span>
                      <span className="text-[#9E988A]">AAC REPOSITORY // VERIFIED</span>
                    </div>

                    {/* Detailed Body Paragraphs / Team */}
                    <div className="font-sans text-xs sm:text-sm text-[#9E988A] leading-relaxed max-h-36 overflow-y-auto pr-2 custom-scroll">
                      <p className="text-white/80">
                        {selectedProject.content && selectedProject.content !== selectedProject.desc
                          ? selectedProject.content
                          : "Full project source code, schematic blueprints, and benchmark logs are maintained within the AAC central repository. Research fellows may clone the test environment or review published patents."}
                      </p>

                      {selectedProject.team && (
                        <div className="mt-3 pt-3 border-t border-[#2A261F]/60 flex items-center gap-2 font-mono text-[10.5px]">
                          <span className="text-[#E5A93C] uppercase font-bold">Contributors:</span>
                          <span className="text-white/90">{selectedProject.team}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tactile Icon Buttons for Opening Project Links */}
                  <div className="pt-4 border-t border-[#2A261F] flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2 font-mono text-[10px] text-[#9E988A] uppercase tracking-widest">
                      <span>PROJECT LINKS // ACTION PROTOCOLS:</span>
                    </div>

                    {/* Row of Tactile Icon Buttons */}
                    <div className="flex items-center gap-3">
                      {/* 1. GitHub Icon Button */}
                      {selectedProject.githubRepo && (
                        <a
                          href={selectedProject.githubRepo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative group w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#08090C] border border-[#2A261F] hover:border-[#E5A93C] text-[#9E988A] hover:text-[#E5A93C] hover:bg-[#181A20] flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-[0_0_20px_rgba(229,169,60,0.35)] active:scale-95 cursor-pointer"
                          aria-label="GitHub Repository"
                          title="Open GitHub Repository"
                        >
                          <FaGithub className="text-lg sm:text-xl" />
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#08090C] border border-[#2A261F] text-[9.5px] font-mono text-[#E5A93C] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-20">
                            GitHub
                          </span>
                        </a>
                      )}

                      {/* 2. Live Project / Demo Icon Button */}
                      {(selectedProject.link || selectedProject.demoLink) && (
                        <a
                          href={selectedProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative group w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#08090C] border border-[#2A261F] hover:border-[#E5A93C] text-[#9E988A] hover:text-[#E5A93C] hover:bg-[#181A20] flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-[0_0_20px_rgba(229,169,60,0.35)] active:scale-95 cursor-pointer"
                          aria-label="Live Project Page"
                          title="Open Live Project Page"
                        >
                          <FaGlobe className="text-lg sm:text-xl" />
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#08090C] border border-[#2A261F] text-[9.5px] font-mono text-[#E5A93C] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-20">
                            Live Demo
                          </span>
                        </a>
                      )}

                      {/* 3. Paper / Patent Documentation Icon Button */}
                      {(selectedProject.paperLink || selectedProject.services?.includes("PATENT")) && (
                        <a
                          href={selectedProject.paperLink || "/Patents"}
                          target={selectedProject.paperLink ? "_blank" : "_self"}
                          rel="noopener noreferrer"
                          className="relative group w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#08090C] border border-[#2A261F] hover:border-[#E5A93C] text-[#9E988A] hover:text-[#E5A93C] hover:bg-[#181A20] flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-[0_0_20px_rgba(229,169,60,0.35)] active:scale-95 cursor-pointer"
                          aria-label="Documentation / Patent"
                          title="View Patent / Research Docs"
                        >
                          <FaBookOpen className="text-base sm:text-lg" />
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#08090C] border border-[#2A261F] text-[9.5px] font-mono text-[#E5A93C] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-20">
                            Patent Docs
                          </span>
                        </a>
                      )}

                      {/* 4. Direct External Link Icon Button */}
                      <a
                        href={selectedProject.link || "/projects"}
                        className="relative group w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#08090C] border border-[#2A261F] hover:border-[#E5A93C] text-[#9E988A] hover:text-[#E5A93C] hover:bg-[#181A20] flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-[0_0_20px_rgba(229,169,60,0.35)] active:scale-95 cursor-pointer"
                        aria-label="Direct Link"
                        title="Open Project Direct Link"
                      >
                        <FaExternalLinkAlt className="text-base" />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#08090C] border border-[#2A261F] text-[9.5px] font-mono text-[#E5A93C] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-20">
                          Direct Link
                        </span>
                      </a>

                      {/* 5. Share / Copy Link Icon Button */}
                      <button
                        type="button"
                        onClick={() => handleCopyProjectRef(selectedProject)}
                        className="relative group w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#08090C] border border-[#2A261F] hover:border-[#E5A93C] text-[#9E988A] hover:text-[#E5A93C] hover:bg-[#181A20] flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-[0_0_20px_rgba(229,169,60,0.35)] active:scale-95 cursor-pointer"
                        aria-label="Share / Copy Link"
                        title="Share Project"
                      >
                        {copiedRef ? (
                          <FaCheck className="text-emerald-400 text-sm" />
                        ) : (
                          <FaShareAlt className="text-base" />
                        )}
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#08090C] border border-[#2A261F] text-[9.5px] font-mono text-[#E5A93C] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-20">
                          {copiedRef ? "Copied!" : "Share Link"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
