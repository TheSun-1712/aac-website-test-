import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaCompass,
  FaExternalLinkAlt,
  FaRocket,
  FaLightbulb,
  FaAtom,
  FaGraduationCap,
  FaCalendarAlt,
  FaTimes,
  FaBook,
  FaUsers,
  FaNewspaper,
  FaTrophy,
  FaCode,
  FaLayerGroup,
} from "react-icons/fa";

export default function GarcyTornado({ onOpenCaseStudies }) {
  const router = useRouter();
  const containerRef = useRef(null);
  const emblemRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  // All 12 Authentic AAC GRIET Divisions & Pages
  const cardsData = [
    {
      id: 1,
      title: "Research Matrix",
      category: "INTERDISCIPLINARY R&D",
      badge: "5 DOMAINS",
      desc: "Deep Learning, IoT & Embedded Systems, Web & App Development, ML-Ops, and Scopus peer-reviewed publications.",
      link: "/Research",
      icon: FaAtom,
      tag: "Research Center",
      color: "from-[#101725]/95 via-[#0d1c38]/90 to-[#080B12]/95",
      accent: "#49A3FF",
    },
    {
      id: 2,
      title: "R&D Projects & Prototypes",
      category: "STUDENT INVENTIONS",
      badge: "50+ PROJECTS",
      desc: "Intelligent Campus Navigation, Smart Energy Systems, Autonomous Multi-Rotor UAVs, and hardware rigs.",
      link: "/projects",
      icon: FaRocket,
      tag: "Innovation Lab",
      color: "from-[#131b2e]/95 via-[#172545]/90 to-[#080B12]/95",
      accent: "#1769FF",
    },
    {
      id: 3,
      title: "Events & Symposiums",
      category: "FLAGSHIP GATHERINGS",
      badge: "EXPOS & CONCLAVES",
      desc: "AAC Expo 2026, Opulence, Data Analytics Conclaves, and state-of-the-art technical symposiums.",
      link: "/Events",
      icon: FaCalendarAlt,
      tag: "Community Arena",
      color: "from-[#0f172a]/95 via-[#18233d]/90 to-[#080B12]/95",
      accent: "#49A3FF",
    },
    {
      id: 4,
      title: "News & Announcements",
      category: "INSTITUTIONAL NEWS",
      badge: "LATEST UPDATES",
      desc: "Official announcements, national hackathon podium finishes, research MOUs, and center breakthroughs.",
      link: "/News",
      icon: FaNewspaper,
      tag: "Press & Media",
      color: "from-[#101725]/95 via-[#162138]/90 to-[#080B12]/95",
      accent: "#1769FF",
    },
    {
      id: 5,
      title: "Achievements & Honors",
      category: "NATIONAL EXCELLENCE",
      badge: "AICTE VISHWAKARMA",
      desc: "Prestigious AICTE National Vishwakarma Award, strategic NRSC (ISRO) MOU, and hackathon championship sweeps.",
      link: "/Achievements",
      icon: FaTrophy,
      tag: "Hall of Honor",
      color: "from-[#141d33]/95 via-[#1a2b52]/90 to-[#080B12]/95",
      accent: "#49A3FF",
    },
    {
      id: 6,
      title: "Administration & Mentors",
      category: "FACULTY LEADERSHIP",
      badge: "EST. 2004",
      desc: "Founded by Dr. S.N.N. Pandit, guided by Dr. Iyengar, Dr. Murthy, Dr. Arvind, and elected student leads.",
      link: "/Administration",
      icon: FaGraduationCap,
      tag: "Mentorship",
      color: "from-[#101725]/95 via-[#122240]/90 to-[#080B12]/95",
      accent: "#1769FF",
    },
    {
      id: 7,
      title: "About AAC & Lab Setup",
      category: "INSTITUTIONAL STORY",
      badge: "20+ YEARS",
      desc: "20-year legacy of engineering curiosity, our multi-stage student induction framework, and Room 3614 Block 3.",
      link: "/About",
      icon: FaCompass,
      tag: "Ecosystem",
      color: "from-[#121a2d]/95 via-[#18294a]/90 to-[#080B12]/95",
      accent: "#49A3FF",
    },
    {
      id: 8,
      title: "Patents & Intellectual Property",
      category: "PATENTS CELL",
      badge: "IPO PUBLISHED",
      desc: "Automated Pill Reminder Device (201941002559) and Smart Glove for Sign Language Translation (202041038106).",
      link: "/Patents",
      icon: FaLightbulb,
      tag: "IP Portfolio",
      color: "from-[#101725]/95 via-[#1c2742]/90 to-[#080B12]/95",
      accent: "#1769FF",
    },
    {
      id: 9,
      title: "Published Books",
      category: "ACADEMIC SCHOLARSHIP",
      badge: "5 VOLUMES",
      desc: "Textbooks and scholarly treatises on algorithms, numerical methods, and computing authored by AAC faculty.",
      link: "/Books",
      icon: FaBook,
      tag: "Publications",
      color: "from-[#131b2e]/95 via-[#16274a]/90 to-[#080B12]/95",
      accent: "#49A3FF",
    },
    {
      id: 10,
      title: "Distinguished Alumni",
      category: "GLOBAL FELLOWS",
      badge: "16+ LEADERS",
      desc: "AAC alumni thriving across Microsoft, Amazon, Qualcomm, Cognizant, and tier-1 research institutions worldwide.",
      link: "/Alumni",
      icon: FaUsers,
      tag: "Alumni Network",
      color: "from-[#101725]/95 via-[#152342]/90 to-[#080B12]/95",
      accent: "#1769FF",
    },
    {
      id: 11,
      title: "Student Tech Startups",
      category: "VENTURE INCUBATION",
      badge: "COMMERCIALIZED",
      desc: "Incubated student ventures: Koolgen Interactives, The Great Honey Company, MediTech, and CampusNav.",
      link: "/Startups",
      icon: FaRocket,
      tag: "Incubation",
      color: "from-[#101725]/95 via-[#192749]/90 to-[#080B12]/95",
      accent: "#49A3FF",
    },
    {
      id: 12,
      title: "Gprime 2026 Contest Results",
      category: "COMPETITIVE ARENA",
      badge: "LIVE LEADERBOARD",
      desc: "AAC's flagship algorithmic contest, problem statements, test cases, and real-time live performance analytics.",
      link: "/gprime2026-results",
      icon: FaCode,
      tag: "Contest Arena",
      color: "from-[#151c2e]/95 via-[#1f2f55]/90 to-[#080B12]/95",
      accent: "#1769FF",
    },
  ];

  const angleRef = useRef(0);
  const tiltRef = useRef(6);
  const velocityRef = useRef(0.18);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);
  const requestRef = useRef(null);

  // 3D Cylinder Physics Loop for 12 Divisions
  useEffect(() => {
    const total = cardsData.length;
    const radiusX = 490;
    const radiusZ = 400;
    const heightSpread = 160;

    const loop = () => {
      if (!isDragging) {
        angleRef.current += velocityRef.current;
        velocityRef.current *= 0.985;
        if (Math.abs(velocityRef.current) < 0.12) {
          velocityRef.current = 0.12;
        }
      }

      const container = containerRef.current;
      if (container) {
        const cards = container.querySelectorAll(".garcy-tornado-card");
        cards.forEach((card, idx) => {
          const theta = (angleRef.current + (idx * 360) / total) * (Math.PI / 180);
          const x = Math.sin(theta) * radiusX;
          const z = Math.cos(theta) * radiusZ;
          const y = Math.sin(theta * 2) * 20 + ((idx - total / 2) / total) * heightSpread;

          // Tangent angle so cards face comfortably toward the viewer
          const tangentY = Math.sin(theta) * -32;
          const rotX = -tiltRef.current * Math.cos(theta) * 0.35;

          const normZ = (z + radiusZ) / (2 * radiusZ);
          const scale = 0.82 + normZ * 0.28;
          const opacity = 0.38 + normZ * 0.62;
          const zIndex = Math.round(normZ * 100);

          card.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) rotateY(${tangentY}deg) rotateX(${rotX}deg) scale(${scale})`;
          card.style.opacity = opacity;
          card.style.zIndex = zIndex;
        });
      }

      // Center Emblem gentle 3D tilt reaction
      if (emblemRef.current) {
        const tiltX = (tiltRef.current * 0.3).toFixed(2);
        const tiltY = (Math.sin(angleRef.current * (Math.PI / 180)) * 5).toFixed(2);
        emblemRef.current.style.transform = `translate(-50%, -50%) rotateX(${-tiltX}deg) rotateY(${tiltY}deg)`;
      }

      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isDragging]);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    lastXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    lastYRef.current = e.clientY || (e.touches && e.touches[0].clientY) || 0;
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    const deltaX = clientX - lastXRef.current;
    const deltaY = clientY - lastYRef.current;

    angleRef.current += deltaX * 0.32;
    velocityRef.current = deltaX * 0.24;
    tiltRef.current = Math.max(-12, Math.min(16, tiltRef.current - deltaY * 0.1));

    lastXRef.current = clientX;
    lastYRef.current = clientY;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleLaunchPage = (link) => {
    setActiveCard(null);
    router.push(link);
  };

  return (
    <section
      id="moment"
      className="relative min-h-[105vh] py-24 flex flex-col items-center justify-center overflow-hidden border-t border-b border-white/10 select-none bg-gradient-to-b from-[#080B12] via-[#0b101d] to-[#080B12]"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
    >
      {/* Background Holographic Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[640px] h-[640px] rounded-full bg-[#1769FF]/10 blur-[140px]" />
      </div>

      {/* Top Section Header */}
      <div className="text-center z-10 max-w-3xl px-4 mb-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[10.5px] font-semibold tracking-widest uppercase mb-4 border backdrop-blur-md bg-[#1769FF]/15 border-[#1769FF]/40 text-[#49A3FF]">
          <FaCompass className="text-[10px]" />
          <span>02 // Interactive 3D Compass &bull; All 12 Divisions</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#EAF1FF] font-sans">
          Curiosity Begins Here. <br />
          <span className="text-[#49A3FF]">Navigate The Center.</span>
        </h2>
        <p className="font-mono text-xs text-[#8793A8] uppercase tracking-wider mt-3 max-w-xl mx-auto">
          Spin the interactive 3D portal or click any division card below to navigate directly into each repository.
        </p>
      </div>

      {/* 3D Tornado Viewport */}
      <div className="garcy-tornado-viewport relative w-full max-w-[1280px] h-[540px] sm:h-[600px] flex items-center justify-center">
        
        {/* ====================================================================
            CENTER EMBLEM (AAC CURIOSITY CORE)
            ==================================================================== */}
        <div
          ref={emblemRef}
          className="absolute z-20 pointer-events-none transition-transform duration-100 ease-out flex flex-col items-center justify-center"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-[#1769FF]/40 bg-[#080B12]/85 backdrop-blur-xl flex flex-col items-center justify-center shadow-[0_0_80px_rgba(23,105,255,0.4)] p-4">
            
            {/* Spinning Hologram Rings */}
            <div className="absolute inset-0 rounded-full border border-dashed border-[#49A3FF]/30 animate-spin" style={{ animationDuration: "35s" }} />
            <div className="absolute -inset-2 rounded-full border border-[#1769FF]/20 animate-pulse" />

            {/* Official AAC Emblem Logo */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
              <Image
                src="/images/AAC3.png"
                alt="AAC Emblem"
                width={112}
                height={112}
                priority
                className="object-contain filter drop-shadow-[0_0_16px_rgba(73,163,255,0.7)]"
              />
            </div>

            {/* Tagline Ribbon Under Logo */}
            <div className="relative z-10 text-center mt-1">
              <span className="block font-mono text-[8px] sm:text-[9px] tracking-widest uppercase font-bold text-[#49A3FF]">
                CURIOSITY BEGINS HERE
              </span>
              <span className="block font-mono text-[7px] text-[#8793A8] uppercase tracking-wider">
                ADVANCED ACADEMIC CENTER &bull; GRIET
              </span>
            </div>
          </div>
        </div>

        {/* ====================================================================
            ORBITING 3D CARDS (ALL 12 DIVISIONS)
            ==================================================================== */}
        <div className="garcy-tornado-cards" ref={containerRef}>
          {cardsData.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={`garcy-tornado-card bg-gradient-to-br ${card.color} p-4 sm:p-5 flex flex-col justify-between text-left garcy-glass-card border border-white/20 cursor-pointer shadow-2xl transition-shadow hover:shadow-[0_0_30px_rgba(23,105,255,0.5)]`}
                style={{
                  width: "280px",
                  height: "176px",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveCard(card);
                }}
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-wider">
                  <span className="flex items-center gap-1.5 font-bold text-[#EAF1FF]">
                    <Icon style={{ color: card.accent }} />
                    <span>{card.category}</span>
                  </span>
                  <span
                    className="px-2 py-0.5 rounded-full bg-[#080B12]/80 border font-bold text-[8px]"
                    style={{ color: card.accent, borderColor: `${card.accent}55` }}
                  >
                    {card.badge}
                  </span>
                </div>

                {/* Title & Desc */}
                <div className="my-auto py-1">
                  <h4 className="text-xs sm:text-sm font-extrabold text-[#EAF1FF] leading-snug font-sans">
                    {card.title}
                  </h4>
                  <p className="text-[10px] text-[#8793A8] line-clamp-2 mt-1 leading-snug font-sans">
                    {card.desc}
                  </p>
                </div>

                {/* Footer Tag & Direct Click Link */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[9px] font-mono text-[#8793A8]">
                  <span className="uppercase">{card.tag}</span>
                  <Link
                    href={card.link}
                    onClick={(e) => e.stopPropagation()}
                    className="font-bold text-xs flex items-center gap-1 text-[#49A3FF] hover:text-white transition-colors"
                  >
                    <span>ENTER</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Guidance Hint */}
      <div className="tornado-hint font-mono text-[10px] text-[#8793A8] tracking-widest uppercase mt-6">
        <span className="text-[#49A3FF] font-bold">&larr;&rarr;</span> Drag orbit to spin &bull; Click card to inspect or enter division
      </div>

      {/* Modal on Card Click */}
      {activeCard && (
        <div
          className="fixed inset-0 z-50 bg-[#080B12]/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setActiveCard(null)}
        >
          <div
            className="garcy-glass-card max-w-lg w-full p-6 sm:p-8 text-left relative border border-[#1769FF]/50 shadow-[0_0_50px_rgba(23,105,255,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between text-xs font-mono uppercase text-[#49A3FF] mb-3 font-bold">
              <span>{activeCard.category}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#080B12] border border-[#1769FF]/40 text-[10px]">
                {activeCard.badge}
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-[#EAF1FF] mb-3 font-sans">
              {activeCard.title}
            </h3>

            <p className="text-sm text-[#8793A8] leading-relaxed mb-6 font-sans">
              {activeCard.desc}
            </p>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleLaunchPage(activeCard.link)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#1769FF] hover:bg-[#49A3FF] hover:text-black text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(23,105,255,0.4)]"
              >
                <span>Launch {activeCard.title} Page</span>
                <FaExternalLinkAlt className="text-[10px]" />
              </button>

              <button
                type="button"
                onClick={() => setActiveCard(null)}
                className="px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-[#8793A8] uppercase transition-colors"
              >
                Close Preview
              </button>
            </div>

            <button
              type="button"
              onClick={() => setActiveCard(null)}
              className="absolute top-4 right-4 text-[#8793A8] hover:text-white text-base p-1"
              aria-label="Close"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
