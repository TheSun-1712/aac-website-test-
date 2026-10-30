import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaVolumeUp, FaVolumeMute, FaBars, FaTimes, FaRocket, FaSun, FaMoon } from "react-icons/fa";

export default function AACNavbar({ activeTab, setActiveTab, isDark, setIsDark }) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

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
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(960, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(480, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } catch (e) {
        // Fallback
      }
    }
  };

  const navLinks = [
    { href: "/", label: "Home", id: "hero" },
    { href: "/About", label: "About AAC", id: "explore" },
    { href: "/Events", label: "Events & Expo", id: "events-page" },
    { href: "/projects", label: "Projects", id: "projects-page" },
    { href: "/Patents", label: "Patents", id: "patents-page" },
    { href: "/Research", label: "Research", id: "research-page" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? "liquid-glass-dark py-3"
            : "liquid-glass-blue py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="font-heading font-extrabold text-2xl tracking-tight flex items-center gap-1.5">
            <span className={isDark ? "text-red-gradient" : "text-gold-gradient"}>AAC</span>
            <span className="text-white">GRIET</span>
          </div>

          <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-white/20 text-xs font-sans font-medium text-gray-200">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isDark ? "bg-[#DC2626]" : "bg-[#E5C158]"
              }`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                isDark ? "bg-[#DC2626]" : "bg-[#E5C158]"
              }`}></span>
            </span>
            <span className="font-semibold text-gray-200">
              Research &amp; Innovation Center
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className={`hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border backdrop-blur-xl ${
          isDark
            ? "bg-[#121217]/80 border-white/10"
            : "bg-[#0F1E4A]/80 border-[#E5C158]/30 shadow-lg"
        }`}>
          {navLinks.map((link) => {
            const isActive = router.pathname === link.href || activeTab === link.id;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold tracking-wide transition-all ${
                  isActive
                    ? isDark
                      ? "text-white bg-[#DC2626] shadow-sm"
                      : "text-black bg-[#E5C158] font-bold shadow-md"
                    : "text-gray-200 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          
          {/* Light/Blue & Gold vs Dark Red Theme Switcher */}
          <button
            onClick={() => setIsDark(!isDark)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-sans font-semibold transition-all ${
              isDark
                ? "border-[#DC2626] bg-[#DC2626]/20 text-white hover:bg-[#DC2626]/30"
                : "border-[#E5C158] bg-[#E5C158]/20 text-[#F0D375] hover:bg-[#E5C158]/30"
            }`}
          >
            {isDark ? (
              <>
                <FaSun className="text-[#E5C158]" />
                <span className="hidden sm:inline">Club Blue &amp; Gold</span>
              </>
            ) : (
              <>
                <FaMoon className="text-white" />
                <span className="hidden sm:inline">Dark Red Theme</span>
              </>
            )}
          </button>

          {/* Gprime Link */}
          <Link href="/gprime2026-results" className="hidden sm:inline-flex">
            <button className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-sans font-semibold rounded-full transition-all hover:scale-105 ${
              isDark
                ? "bg-[#DC2626] text-white hover:bg-[#b91c1c]"
                : "bg-[#E5C158] text-black font-bold hover:bg-[#d4af37] shadow-md"
            }`}>
              <FaRocket size={12} />
              <span>Gprime 2026</span>
            </button>
          </Link>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-sans font-semibold transition-all ${
              soundEnabled
                ? isDark
                  ? "border-[#DC2626] bg-[#DC2626]/20 text-[#DC2626]"
                  : "border-[#E5C158] bg-[#E5C158]/20 text-[#F0D375]"
                : "border-white/20 text-gray-300 hover:text-white"
            }`}
          >
            {soundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border bg-white/5 border-white/10 text-white"
          >
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-b px-6 py-6 ${
              isDark
                ? "liquid-glass-dark text-white"
                : "liquid-glass-blue text-white"
            }`}
          >
            <div className="flex flex-col gap-4 font-sans font-semibold text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-white/10 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-xs">→</span>
                </Link>
              ))}
              <Link
                href="/gprime2026-results"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 flex items-center gap-2 font-bold ${
                  isDark ? "text-[#DC2626]" : "text-[#F0D375]"
                }`}
              >
                <FaRocket />
                <span>Gprime 2026 Results →</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
