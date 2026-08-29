import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaVolumeUp, FaVolumeMute, FaBars, FaTimes, FaCircle } from "react-icons/fa";

export default function LN4Navbar({ activeTab, setActiveTab }) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      // Play a quick synth blip sound safely using Web Audio API
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } catch (e) {
        // Fallback silently if audio context not supported
      }
    }
  };

  const navLinks = [
    { id: "hero", label: "HERO" },
    { id: "telemetry", label: "TELEMETRY" },
    { id: "3d-gear", label: "3D GEAR" },
    { id: "on-track", label: "ON TRACK" },
    { id: "off-track", label: "OFF TRACK" },
    { id: "merch", label: "LN4 STORE" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0a0a0c]/90 backdrop-blur-xl border-b border-[#D2FF00]/20 py-3 shadow-2xl shadow-black/80"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo & Live Status */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative font-syne font-extrabold text-2xl tracking-tighter text-white flex items-center gap-1">
            <span className="text-[#D2FF00] group-hover:drop-shadow-[0_0_10px_#D2FF00] transition-all">LN</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">4</span>
            <span className="text-xs font-chakra font-bold text-[#D2FF00] ml-0.5 tracking-widest uppercase bg-[#D2FF00]/10 px-1.5 py-0.5 rounded border border-[#D2FF00]/30">
              F1
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/10 text-xs font-chakra tracking-widest text-gray-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D2FF00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D2FF00]"></span>
            </span>
            <span className="text-[#D2FF00] font-semibold">STATUS: READY</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#121217]/80 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setActiveTab && setActiveTab(link.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-chakra font-bold tracking-wider transition-all duration-200 ${
                  isActive
                    ? "text-black bg-[#D2FF00] shadow-[0_0_15px_rgba(210,255,0,0.5)]"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Controls: Sound Toggle & Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-chakra font-bold tracking-wider transition-all duration-300 ${
              soundEnabled
                ? "border-[#D2FF00] bg-[#D2FF00]/15 text-[#D2FF00] shadow-[0_0_12px_rgba(210,255,0,0.3)]"
                : "border-white/20 text-gray-400 hover:text-white hover:border-white/40"
            }`}
          >
            {soundEnabled ? <FaVolumeUp className="text-[#D2FF00]" /> : <FaVolumeMute />}
            <span className="hidden sm:inline">{soundEnabled ? "SOUND ON" : "SOUND OFF"}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:text-[#D2FF00]"
          >
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0c]/98 border-b border-[#D2FF00]/20 px-6 py-6"
          >
            <div className="flex flex-col gap-4 font-chakra font-bold text-sm tracking-wider">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => {
                    setActiveTab && setActiveTab(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 border-b border-white/5 text-gray-300 hover:text-[#D2FF00] flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-[#D2FF00]">→</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
