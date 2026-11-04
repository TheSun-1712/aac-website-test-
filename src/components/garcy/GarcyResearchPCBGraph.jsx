import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  FaMicrochip,
  FaBrain,
  FaRobot,
  FaBolt,
  FaHandsHelping,
  FaArrowRight,
  FaExternalLinkAlt,
  FaTimes,
  FaBook,
  FaFileAlt,
  FaRocket,
} from "react-icons/fa";

export default function GarcyResearchPCBGraph() {
  const [activeDomainId, setActiveDomainId] = useState("ai");
  const canvasRef = useRef(null);

  const DOMAINS = [
    {
      id: "ai",
      title: "AI & Autonomous Vision",
      code: "DOM-01 // COGNITIVE LAB",
      icon: FaBrain,
      x: 0.22,
      y: 0.28,
      status: "ACTIVE BATCH INFERENCE",
      desc: "Low-latency edge AI pipelines, computer vision models for aerial tracking, and real-time ensemble classifiers running on embedded GPU platforms.",
      equipment: ["NVIDIA Jetson Orin AGX", "Dual RTX Workstations", "Thermal Multi-Spectral Camera"],
      publications: "IJERT Scopus Classification & IEEE ML Proceedings",
      linkedPath: "/Publications",
      linkedLabel: "Explore ML Publications",
    },
    {
      id: "robotics",
      title: "Aerial Robotics & Avionics",
      code: "DOM-02 // AUTONOMOUS UAV",
      icon: FaRobot,
      x: 0.78,
      y: 0.28,
      status: "TELEMETRY LINK ACTIVE",
      desc: "Autonomous multi-rotor UAV platforms featuring onboard obstacle avoidance, GPS waypoint guidance, and high-bandwidth telemetry developed in partnership with ISRO NRSC.",
      equipment: ["Carbon-Fiber Hexacopter Rig", "Pixhawk 6X Autopilot", "915MHz Telemetry Transceiver"],
      publications: "Autonomous Waypoint Guidance & Obstacle Avoidance",
      linkedPath: "/projects",
      linkedLabel: "Explore Drone Builds",
    },
    {
      id: "iot",
      title: "IoT & Smart Campus Grids",
      code: "DOM-03 // SENSOR MESH",
      icon: FaBolt,
      x: 0.22,
      y: 0.74,
      status: "80+ TELEMETRY NODES",
      desc: "Distributed institutional power monitoring mesh utilizing ESP32 microcontrollers, secure MQTT broker protocols, and automated predictive load balancing.",
      equipment: ["ESP32-S3 Mesh Nodes", "Industrial Current Transformers", "Self-Hosted EMQX Broker"],
      publications: "Campus Energy Conservation & Predictive Load Modeling",
      linkedPath: "/projects",
      linkedLabel: "Explore IoT Systems",
    },
    {
      id: "wearables",
      title: "Assistive Wearables & IP",
      code: "DOM-04 // BIOMEDICAL IP",
      icon: FaHandsHelping,
      x: 0.78,
      y: 0.74,
      status: "2 PUBLISHED PATENTS",
      desc: "Patented assistive medical technology and sensory wearables designed to bridge communication gaps for the speech-impaired and guarantee verified medication adherence.",
      equipment: ["Biomedical Flex Sensors", "Custom 3D Print Enclosures", "Synthesized Speech DSP"],
      publications: "Patent 201941002559 & Patent 202041038106",
      linkedPath: "/Patents",
      linkedLabel: "Inspect Official Patents",
    },
  ];

  const activeDomain = DOMAINS.find((d) => d.id === activeDomainId) || DOMAINS[0];

  // Animated PCB Traces & Electrical Pulses
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let t = 0;

    const render = () => {
      t += 0.02;
      const w = (canvas.width = canvas.offsetWidth * window.devicePixelRatio || 1000);
      const h = (canvas.height = canvas.offsetHeight * window.devicePixelRatio || 500);
      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.5;

      // Draw faint background grid
      ctx.strokeStyle = "rgba(42, 38, 31, 0.4)";
      ctx.lineWidth = 1;
      const step = 32 * window.devicePixelRatio;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw orthogonal copper PCB traces from Core to each Domain
      DOMAINS.forEach((domain) => {
        const dx = w * domain.x;
        const dy = h * domain.y;
        const isFocused = domain.id === activeDomainId;

        ctx.strokeStyle = isFocused ? "rgba(229, 169, 60, 0.9)" : "rgba(158, 152, 138, 0.25)";
        ctx.lineWidth = isFocused ? 2.5 * window.devicePixelRatio : 1.5 * window.devicePixelRatio;

        // Orthogonal routing: Horizontal then Vertical
        const midX = (cx + dx) / 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(midX, cy);
        ctx.lineTo(midX, dy);
        ctx.lineTo(dx, dy);
        ctx.stroke();

        // Terminal solder pads
        ctx.fillStyle = isFocused ? "#E5A93C" : "#9E988A";
        ctx.beginPath();
        ctx.arc(midX, cy, 3 * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.arc(midX, dy, 3 * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();

        // Electrical pulse packet travelling along the trace
        const progress = (t * (isFocused ? 1.5 : 0.8) + (domain.x * 2)) % 1;
        let px = cx, py = cy;
        const seg1 = Math.abs(midX - cx);
        const seg2 = Math.abs(dy - cy);
        const seg3 = Math.abs(dx - midX);
        const total = seg1 + seg2 + seg3;

        const d = progress * total;
        if (d <= seg1) {
          px = cx + (midX - cx) * (d / seg1);
          py = cy;
        } else if (d <= seg1 + seg2) {
          px = midX;
          py = cy + (dy - cy) * ((d - seg1) / seg2);
        } else {
          px = midX + (dx - midX) * ((d - seg1 - seg2) / seg3);
          py = dy;
        }

        // Draw glowing electron
        ctx.fillStyle = isFocused ? "#FFFFFF" : "#E5A93C";
        ctx.shadowColor = "#E5A93C";
        ctx.shadowBlur = 10 * window.devicePixelRatio;
        ctx.beginPath();
        ctx.arc(px, py, (isFocused ? 4 : 2.5) * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeDomainId]);

  return (
    <div className="relative w-full p-4 sm:p-8 bg-[#08090C] text-[#FAF6ED] rounded-3xl border border-[#2A261F] overflow-hidden select-none">
      
      {/* Top Schematic Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#2A261F] pb-4 mb-6 z-20 relative">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#111318] border border-[#2A261F] flex items-center justify-center text-[#E5A93C]">
            <FaMicrochip className="text-sm" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#E5A93C] font-bold block">
              // INSTRUMENT 03: ARCHITECTURAL SCHEMATIC
            </span>
            <h2 className="text-xs sm:text-sm font-sans font-semibold text-white tracking-wide">
              Integrated PCB Node Graph &bull; Core Research Matrix
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-[#9E988A]">
          <span className="px-3 py-1 rounded bg-[#111318] border border-[#2A261F] text-[#E5A93C] font-bold">
            AAC CORE 3614 // 4 ACTIVE BUS LINES
          </span>
        </div>
      </div>

      {/* Main PCB Canvas & Node Overlay */}
      <div className="relative w-full h-[480px] sm:h-[540px] rounded-2xl bg-[#0B0D12] border border-[#2A261F] overflow-hidden mb-6">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none" />

        {/* Central Processor Node: AAC Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#111318] border-2 border-[#E5A93C] flex flex-col items-center justify-center shadow-[0_0_35px_rgba(229,169,60,0.35)] p-2">
            <div className="w-8 h-8 rounded-full bg-[#E5A93C]/15 flex items-center justify-center text-[#E5A93C] mb-1">
              <FaMicrochip className="text-base" />
            </div>
            <span className="font-mono text-[10px] font-black text-white tracking-wider text-center">
              AAC CORE
            </span>
            <span className="font-mono text-[8.5px] text-[#E5A93C] tracking-widest uppercase">
              ROOM 3614
            </span>
            {/* Corner solder pins */}
            <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-[#E5A93C]" />
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E5A93C]" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-[#E5A93C]" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-[#E5A93C]" />
          </div>
        </div>

        {/* 4 Quadrant Domain Nodes */}
        {DOMAINS.map((domain) => {
          const isSelected = domain.id === activeDomainId;
          const IconComponent = domain.icon;

          return (
            <button
              key={domain.id}
              type="button"
              onClick={() => setActiveDomainId(domain.id)}
              style={{
                left: `${domain.x * 100}%`,
                top: `${domain.y * 100}%`,
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-2xl border transition-all duration-300 text-left cursor-pointer group ${
                isSelected
                  ? "bg-[#161922] border-[#E5A93C] shadow-[0_0_30px_rgba(229,169,60,0.4)] scale-105"
                  : "bg-[#111318]/90 border-[#2A261F] hover:border-white/40 hover:scale-102"
              }`}
            >
              <div className="flex items-center gap-2.5 mb-1.5">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-colors ${
                    isSelected ? "bg-[#E5A93C] text-[#08090C]" : "bg-[#08090C] text-[#E5A93C]"
                  }`}
                >
                  <IconComponent />
                </div>
                <div>
                  <span className="font-mono text-[8.5px] uppercase tracking-widest text-[#9E988A] block">
                    {domain.code}
                  </span>
                  <h4 className="font-sans font-bold text-xs sm:text-sm text-white tracking-tight">
                    {domain.title}
                  </h4>
                </div>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[8.5px] text-[#E5A93C]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C] animate-pulse" />
                <span>{domain.status}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Domain Blueprint Telemetry Drawer */}
      <div className="w-full bg-[#111318] border border-[#2A261F] rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#E5A93C] uppercase tracking-widest mb-2 font-bold">
              <span>{activeDomain.code}</span>
              <span>&bull;</span>
              <span>STATUS: {activeDomain.status}</span>
            </div>

            <h3 className="font-sans font-bold text-2xl text-white mb-3">
              {activeDomain.title}
            </h3>

            <p className="font-sans text-xs sm:text-sm text-[#9E988A] leading-relaxed mb-4 max-w-3xl">
              {activeDomain.desc}
            </p>

            {/* Testbench Hardware Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] text-white/50 uppercase">TESTBENCH RIGS:</span>
              {activeDomain.equipment.map((eq, i) => (
                <span
                  key={i}
                  className="font-mono text-[10px] px-2.5 py-1 rounded bg-[#08090C] border border-[#2A261F] text-[#FAF6ED]"
                >
                  {eq}
                </span>
              ))}
            </div>
          </div>

          {/* Action Link */}
          <div className="flex-shrink-0">
            <Link
              href={activeDomain.linkedPath}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E5A93C] hover:bg-[#F6C463] text-[#08090C] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg cursor-pointer"
            >
              <span>{activeDomain.linkedLabel}</span>
              <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

