import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  FaSearch,
  FaBars,
  FaTimes,
  FaLayerGroup,
  FaArrowRight,
  FaChevronDown,
} from "react-icons/fa";

export default function GarcyNavbar({ onOpenSearch, onOpenCaseStudies }) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
    setMoreDropdownOpen(false);
  }, [router.pathname]);

  const primaryNavItems = [
    { label: "Research", href: "/Research" },
    { label: "Projects", href: "/projects" },
    { label: "Events", href: "/Events" },
    { label: "News", href: "/News" },
    { label: "Achievements", href: "/Achievements" },
    { label: "Administration", href: "/Administration" },
    { label: "About", href: "/About" },
  ];

  const moreNavItems = [
    { label: "Patents", href: "/Patents", badge: "IP Cell" },
    { label: "Books", href: "/Books", badge: "Authored" },
    { label: "Alumni", href: "/Alumni", badge: "Network" },
    { label: "Startups", href: "/Startups", badge: "Incubated" },
    { label: "G-Prime", href: "/gprime2026-results", badge: "Contest" },
  ];

  const isActive = (href) => {
    if (!router || !router.pathname) return false;
    if (href === "/" && router.pathname === "/") return true;
    if (href !== "/" && router.pathname.toLowerCase().startsWith(href.toLowerCase())) return true;
    return false;
  };

  const isMoreActive = moreNavItems.some((item) => isActive(item.href));

  return (
    <>
      <header className="fixed top-3 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none transition-all duration-300">
        <div className="max-w-[1480px] mx-auto flex items-center justify-between">
          
          {/* Studio Brand Logo Pill */}
          <Link
            href="/"
            className="pointer-events-auto garcy-glass-header px-3.5 py-2 flex items-center gap-2.5 group hover:border-[#1769FF]/60 transition-all shadow-lg"
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              <Image
                src="/images/AAC3.png"
                alt="AAC Logo"
                width={20}
                height={20}
                className="object-contain drop-shadow-[0_0_8px_rgba(23,105,255,0.8)] group-hover:scale-110 transition-transform"
              />
            </div>
            <span className="font-extrabold text-xs sm:text-sm tracking-tight text-white font-sans uppercase">
              AAC <span className="text-[#8793A8] font-normal group-hover:text-[#49A3FF] transition-colors">// GRIET</span>
            </span>
          </Link>

          {/* Desktop Section Navigation Center Pill */}
          <nav className="hidden lg:flex items-center gap-1 garcy-glass-header px-2.5 py-1.5 pointer-events-auto shadow-xl">
            {primaryNavItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                    active
                      ? "text-[#49A3FF] bg-[#1769FF]/20 border border-[#1769FF]/40 font-bold shadow-[0_0_12px_rgba(23,105,255,0.3)]"
                      : "text-[#8793A8] hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* More Divisions Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setMoreDropdownOpen((prev) => !prev)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 flex items-center gap-1 ${
                  isMoreActive || moreDropdownOpen
                    ? "text-[#49A3FF] bg-[#1769FF]/20 border border-[#1769FF]/40 font-bold"
                    : "text-[#8793A8] hover:text-white hover:bg-white/10"
                }`}
              >
                <span>More</span>
                <FaChevronDown className={`text-[9px] transition-transform ${moreDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {moreDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 py-2 rounded-xl bg-[#080B12]/95 border border-[#1769FF]/30 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.8)] z-50">
                  {moreNavItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMoreDropdownOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-2 text-xs font-mono uppercase transition-colors ${
                          active
                            ? "text-[#49A3FF] bg-[#1769FF]/20 font-bold"
                            : "text-[#8793A8] hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <span>{item.label}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[#49A3FF]">
                          {item.badge}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Icons */}
          <div className="header-actions pointer-events-auto flex items-center gap-2">
            
            {/* Quick Case Study Drawer Button */}
            {onOpenCaseStudies && (
              <button
                type="button"
                onClick={onOpenCaseStudies}
                className="profile-button text-[#EAF1FF] hover:text-[#49A3FF] transition-colors"
                title="View In-Depth Project Case Studies"
                aria-label="Open Case Studies"
              >
                <FaLayerGroup />
              </button>
            )}

            {/* Tactile ⌘K Search Shortcut Button */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="search-shortcut group"
              title="Search Archive (⌘K)"
              aria-label="Search Archive"
            >
              <div className="flex flex-col items-center leading-none">
                <span className="text-[10px] text-[#8793A8] group-hover:text-[#49A3FF] transition-colors font-mono">⌘K</span>
                <FaSearch className="text-[10px] mt-0.5 text-[#8793A8] group-hover:text-white transition-colors" />
              </div>
            </button>

            {/* Quick Portal CTA */}
            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1769FF]/20 hover:bg-[#1769FF] text-[#49A3FF] hover:text-white text-xs font-mono font-semibold uppercase tracking-wider border border-[#1769FF]/40 transition-all shadow-md"
            >
              <span>Projects</span>
              <FaArrowRight className="text-[9px]" />
            </Link>

            {/* Mobile Drawer Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 rounded-lg bg-[#101725]/80 border border-white/10 flex items-center justify-center text-[#8793A8] hover:text-white"
              aria-label="Menu"
            >
              {mobileOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#080B12]/98 backdrop-blur-2xl flex flex-col justify-start pt-20 px-6 pb-8 lg:hidden overflow-y-auto">
          <div className="flex flex-col gap-1 text-sm font-mono uppercase tracking-widest text-[#8793A8] max-w-md mx-auto w-full">
            <span className="text-[10px] font-mono text-[#49A3FF] uppercase tracking-widest px-3 py-1 font-bold">
              Core Divisions
            </span>
            {primaryNavItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors border-b border-white/5 ${
                    active ? "text-[#49A3FF] bg-[#1769FF]/15 font-bold" : "hover:text-[#49A3FF]"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-[#49A3FF] text-xs">&rarr;</span>
                </Link>
              );
            })}

            <span className="text-[10px] font-mono text-[#49A3FF] uppercase tracking-widest px-3 pt-4 pb-1 font-bold">
              More Repositories
            </span>
            {moreNavItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors border-b border-white/5 ${
                    active ? "text-[#49A3FF] bg-[#1769FF]/15 font-bold" : "hover:text-[#49A3FF]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{item.label}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[#8793A8]">
                      {item.badge}
                    </span>
                  </div>
                  <span className="text-[#49A3FF] text-xs">&rarr;</span>
                </Link>
              );
            })}
            
            <div className="pt-4 flex flex-col gap-2">
              {onOpenCaseStudies && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenCaseStudies();
                  }}
                  className="flex items-center gap-3 text-left py-2.5 px-3 rounded-lg bg-[#101725] text-white font-bold border border-white/10"
                >
                  <FaLayerGroup className="text-[#1769FF]" />
                  <span>Project Case Studies Drawer</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  if (onOpenSearch) onOpenSearch();
                }}
                className="flex items-center gap-3 text-left py-2.5 px-3 rounded-lg bg-[#101725] text-[#49A3FF] font-bold border border-white/10"
              >
                <FaSearch />
                <span>Search Directory (⌘K)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
