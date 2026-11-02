import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// 6 Core AAC Focus Cards for the Helix
const CARDS = [
  {
    id: "projects",
    title: "R&D Projects & Prototypes",
    tag: "50+ BUILDS",
    subtitle: "Autonomous UAVs, AI Systems, IoT Hardware",
    image: "/images/pic.webp",
    link: "/projects",
    scatter: -0.38,
    spin: -25,
  },
  {
    id: "news",
    title: "News & Announcements",
    tag: "DISPATCHES",
    subtitle: "Hackathons, research MoUs, national updates",
    image: "/images/AAC2.png",
    link: "/News",
    scatter: 0.42,
    spin: 32,
  },
  {
    id: "achievements",
    title: "Achievements & Honors",
    tag: "AWARDS",
    subtitle: "AICTE National Vishwakarma & ISRO recognition",
    image: "/images/AAC3.png",
    link: "/Achievements",
    scatter: -0.22,
    spin: -18,
  },
  {
    id: "administration",
    title: "Administration & Mentors",
    tag: "LEADERSHIP",
    subtitle: "Faculty advisory, research guides, student core",
    image: "/images/grietlogo.png",
    link: "/Administration",
    scatter: 0.35,
    spin: 22,
  },
  {
    id: "about",
    title: "About AAC & Lab Ecosystem",
    tag: "ROOM 3614",
    subtitle: "20-year legacy of engineering curiosity & innovation",
    image: "/images/AAC1.png",
    link: "/About",
    scatter: -0.45,
    spin: -30,
  },
  {
    id: "patents",
    title: "Patents & Technology IP",
    tag: "PATENT CELL",
    subtitle: "Officially published national patents & utility models",
    image: "/images/8.webp",
    link: "/Patents",
    scatter: 0.28,
    spin: 15,
  },
];

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const mix = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);

export default function GarcyTornado({ onNavigateProjects, onNavigateHome }) {
  const router = useRouter();
  const sceneRef = useRef(null);
  const galleryRef = useRef(null);
  const centerTextRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  // Tornado 3D Physics State
  const flightTimeRef = useRef(0);
  const angleRef = useRef(0);
  const yawRef = useRef(0);
  const targetYawRef = useRef(0);
  const tiltRef = useRef(0);
  const targetTiltRef = useRef(0);
  const panRef = useRef(0);
  const targetPanRef = useRef(0);
  const velocityRef = useRef(0);

  const pointerRef = useRef(null);
  const lastPointerXRef = useRef(0);
  const lastPointerYRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(0);
  const isNavigatingRef = useRef(false);

  // Position function matching authentic Garcy moment.js
  const updatePositions = () => {
    const scene = sceneRef.current;
    const gallery = galleryRef.current;
    if (!scene || !gallery) return;

    const width = scene.clientWidth || 1200;
    const height = scene.clientHeight || 800;
    const isMobile = width < 768;

    // Radius tuned to give majestic space around center emblem
    const radius = isMobile ? Math.min(width * 0.44, 320) : Math.min(width * 0.42, 600);
    const step = isMobile ? 52 : 72;
    const cardWidth = isMobile ? clamp(width * 0.42, 180, 260) : clamp(width * 0.22, 240, 290);
    const cardHeight = cardWidth * 1.34;

    gallery.style.transform = `translate3d(0, ${panRef.current.toFixed(1)}px, 0) rotateX(${tiltRef.current.toFixed(1)}deg)`;

    const cardElements = gallery.querySelectorAll(".tornado-card-item");
    const count = CARDS.length;

    cardElements.forEach((card, index) => {
      const cardData = CARDS[index];
      const a = (index * 360) / count + angleRef.current + yawRef.current;
      const radians = (a * Math.PI) / 180;
      const depth = Math.cos(radians); // -1 (back) to +1 (front)
      const sinVal = Math.sin(radians);

      const targetY = (index - (count - 1) / 2) * step;
      const time = flightTimeRef.current - index * 60;

      // Authentic rise and assemble curves from Garcy moment.js
      const rise = clamp(time / 1400, 0, 1);
      const assemble = smooth(clamp((time - 800) / 1600, 0, 1));
      const lift = 1 - Math.pow(1 - rise, 3);

      const cloudX = cardData.scatter * width * 0.85;
      const cloudY = (index - (count - 1) / 2) * 35;

      const x = mix(cloudX, sinVal * radius, assemble);
      const y = mix(height * 0.85 + index * 14, mix(cloudY, targetY, assemble), lift);
      const z = mix(-240, depth * (isMobile ? 240 : 420), assemble);

      card.style.width = `${cardWidth.toFixed(0)}px`;
      card.style.height = `${cardHeight.toFixed(0)}px`;
      card.style.opacity = String(clamp(rise * 3, 0, 1));

      // Perspective tilt & rotation around center
      const rotY = a * assemble;
      const rotZ = cardData.spin * (1 - assemble);
      const scale = 0.78 + ((depth + 1) / 2) * 0.28;

      card.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${rotY.toFixed(1)}deg) rotateZ(${rotZ.toFixed(1)}deg) scale(${scale.toFixed(3)})`;

      // Depth z-index and subtle lighting
      card.style.zIndex = Math.round(((depth + 1) / 2) * 25) + 5;
      card.style.filter = `brightness(${(0.5 + ((depth + 1) / 2) * 0.6).toFixed(2)})`;
    });

    // Parallax sway on center branding
    if (centerTextRef.current) {
      const swayY = Math.sin((angleRef.current + yawRef.current) * (Math.PI / 180)) * 2.5;
      const swayX = -tiltRef.current * 0.3;
      centerTextRef.current.style.transform = `translate(-50%, -50%) rotateY(${swayY.toFixed(1)}deg) rotateX(${swayX.toFixed(1)}deg)`;
    }
  };

  // 60FPS Animation tick
  useEffect(() => {
    lastTimeRef.current = performance.now();

    const loop = (now) => {
      const delta = Math.min(now - lastTimeRef.current, 50);
      lastTimeRef.current = now;

      flightTimeRef.current += delta;

      // Idle calm rotation when not actively dragging
      if (pointerRef.current === null) {
        if (hoveredCardId === null) {
          angleRef.current += delta * 0.015; // Smooth slow revolution
        } else {
          angleRef.current += delta * 0.004; // Slower while inspecting
        }

        targetYawRef.current += (velocityRef.current * delta) / 16.67;
        velocityRef.current *= Math.pow(0.94, delta / 16.67);
      }

      // Smooth easing toward targets
      const ease = 1 - Math.exp(-delta / 95);
      yawRef.current = mix(yawRef.current, targetYawRef.current, ease);
      tiltRef.current = mix(tiltRef.current, targetTiltRef.current, ease);
      panRef.current = mix(panRef.current, targetPanRef.current, ease);

      updatePositions();
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    const handleResize = () => updatePositions();
    window.addEventListener("resize", handleResize);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [hoveredCardId]);

  // Pointer Drag handlers (horizontal rotates yaw, vertical tilts/pans)
  const handlePointerDown = (e) => {
    if (e.button !== 0 || e.target.closest("button")) return;
    pointerRef.current = e.pointerId;
    lastPointerXRef.current = e.clientX;
    lastPointerYRef.current = e.clientY;
    dragDistanceRef.current = 0;
    velocityRef.current = 0;
    setIsDragging(true);

    if (sceneRef.current) {
      sceneRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e) => {
    if (e.pointerId !== pointerRef.current) return;
    const dx = e.clientX - lastPointerXRef.current;
    const dy = e.clientY - lastPointerYRef.current;
    dragDistanceRef.current = Math.max(dragDistanceRef.current, Math.hypot(dx, dy));

    targetYawRef.current += dx * 0.28;
    velocityRef.current = clamp(dx * 0.2, -4, 4);

    const sceneH = sceneRef.current?.clientHeight || 800;
    targetTiltRef.current = clamp(targetTiltRef.current - dy * 0.06, -14, 14);
    targetPanRef.current = clamp(targetPanRef.current + dy * 0.5, -sceneH * 0.25, sceneH * 0.25);

    lastPointerXRef.current = e.clientX;
    lastPointerYRef.current = e.clientY;
  };

  const handlePointerUp = (e) => {
    if (e.pointerId === pointerRef.current) {
      pointerRef.current = null;
      setIsDragging(false);
    }
  };

  // Wheel navigation: Smooth down-scroll transitions to /projects
  useEffect(() => {
    const handleWheel = (e) => {
      if (pointerRef.current !== null || isNavigatingRef.current) return;
      if (e.deltaY > 55) {
        isNavigatingRef.current = true;
        if (onNavigateProjects) onNavigateProjects();
        else router.push("/projects");
      } else if (e.deltaY < -55) {
        isNavigatingRef.current = true;
        if (onNavigateHome) onNavigateHome();
        else router.push("/");
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [onNavigateProjects, onNavigateHome, router]);

  const handleCardClick = (link) => {
    if (dragDistanceRef.current > 7) return; // Ignore drag clicks
    try {
      sessionStorage.setItem("aac_last_section", "moment");
    } catch (e) {}
    router.push(link);
  };

  return (
    <section
      id="moment"
      ref={sceneRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`tornado-scene relative w-full h-full flex items-center justify-center overflow-hidden select-none bg-[#08090C] ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      style={{
        position: "absolute",
        inset: 0,
        perspective: "1700px",
        WebkitPerspective: "1700px",
        touchAction: "none",
      }}
    >
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#E5A93C]/5 blur-[220px]" />
      </div>

      {/* ====================================================================
          CENTER LOGO & HEADLINE — PROTECTED FOREGROUND (zIndex: 50)
          The cards orbit gracefully behind and around this center stage
          ==================================================================== */}
      <div
        ref={centerTextRef}
        className="absolute left-1/2 top-1/2 z-50 pointer-events-none flex flex-col items-center justify-center text-center px-6"
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Soft radial backdrop to preserve contrast */}
        <div
          className="absolute inset-0 -m-20 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(8, 9, 12, 0.95) 0%, rgba(8, 9, 12, 0.8) 48%, rgba(8, 9, 12, 0) 75%)",
          }}
        />

        {/* Club Logo Emblem */}
        <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 mb-3 drop-shadow-[0_8px_24px_rgba(229,169,60,0.45)]">
          <Image
            src="/images/logo.png"
            alt="Advanced Academic Center Logo"
            width={80}
            height={80}
            priority
            className="w-full h-full object-contain brightness-110"
          />
        </div>

        {/* Headline */}
        <div className="relative z-10">
          <h2 className="font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-none uppercase drop-shadow-md font-sans">
            CURIOSITY
          </h2>
          <h2 className="font-serif italic font-semibold text-2xl sm:text-3xl md:text-4xl text-[#E5A93C] tracking-tight leading-none mt-1">
            begins here.
          </h2>
          <p className="font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.24em] text-[#9E988A] mt-3 font-medium">
            Advanced Academic Center // GRIET
          </p>
        </div>
      </div>

      {/* ====================================================================
          3D SPIRAL HELIX CARD CONTAINER
          ==================================================================== */}
      <div
        ref={galleryRef}
        className="tornado-cards absolute left-1/2 top-1/2 w-0 h-0 pointer-events-auto"
        style={{
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
        }}
      >
        {CARDS.map((card) => (
          <div
            key={card.id}
            className="tornado-card-item absolute left-0 top-0 rounded-2xl overflow-hidden cursor-pointer transition-shadow duration-300 group"
            style={{
              transformOrigin: "center center",
              background: "#111318",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid #2A261F",
              boxShadow:
                "0 20px 50px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
              willChange: "transform, opacity",
            }}
            onMouseEnter={() => setHoveredCardId(card.id)}
            onMouseLeave={() => setHoveredCardId(null)}
            onClick={() => handleCardClick(card.link)}
          >
            {/* Card Image Thumbnail */}
            <div className="relative w-full h-[54%] overflow-hidden bg-[#08090C]">
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="270px"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-108 brightness-95 group-hover:brightness-110"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(17,19,24,0.1) 0%, rgba(17,19,24,0.95) 100%)",
                }}
              />
              {/* Category Pill */}
              <div className="absolute top-3 left-3 z-10">
                <span className="font-mono text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-[#08090C]/85 text-[#E5A93C] border border-[#2A261F] backdrop-blur-md">
                  {card.tag}
                </span>
              </div>
            </div>

            {/* Card Content Info */}
            <div className="p-4 flex flex-col justify-between h-[46%]">
              <div>
                <h3 className="font-bold text-[15px] sm:text-[16px] text-[#FAF6ED] font-sans leading-tight group-hover:text-[#F6C463] transition-colors">
                  {card.title}
                </h3>
                <p className="font-sans text-[11.5px] text-[#9E988A] leading-relaxed mt-1.5 line-clamp-2">
                  {card.subtitle}
                </p>
              </div>

              {/* Bottom link indicator */}
              <div className="flex items-center justify-between pt-2 border-t border-[#2A261F] mt-auto">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#E5A93C] font-semibold group-hover:text-[#F6C463]">
                  Explore Section
                </span>
                <span className="text-[#9E988A] group-hover:text-white transition-colors text-xs font-mono">
                  →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hint Text (.tornado-hint) */}
      <p className="tornado-hint" style={{ color: "#9E988A" }} aria-hidden="true">
        DRAG TO ROTATE HELIX &bull; SCROLL DOWN TO PROJECTS
      </p>

      {/* Down arrow to navigate to /projects */}
      <button
        type="button"
        onClick={() => {
          if (onNavigateProjects) onNavigateProjects();
          else router.push("/projects");
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center justify-center cursor-pointer group pointer-events-auto"
        aria-label="Continue to projects"
      >
        <div className="w-10 h-10 rounded-full border border-[#2A261F] bg-[#111318]/70 backdrop-blur-md flex items-center justify-center text-[#9E988A] group-hover:border-[#E5A93C] group-hover:text-[#E5A93C] transition-all shadow-lg">
          <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
            <path
              d="M5 1v8M1 5.5l4 3.5 4-3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
    </section>
  );
}
