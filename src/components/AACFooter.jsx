import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowUp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function AACFooter({ isDark }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const aacLinks = [
    { label: "Achievements", href: "/Achievements" },
    { label: "Events & Expo", href: "/Events" },
    { label: "Patents Filed", href: "/Patents" },
    { label: "Projects", href: "/projects" },
    { label: "Publications", href: "/Publications" },
    { label: "Research", href: "/Research" },
    { label: "Startups", href: "/Startups" },
    { label: "Alumni", href: "/Alumni" },
  ];

  return (
    <footer className={`border-t pt-16 pb-10 relative overflow-hidden transition-colors duration-500 ${
      isDark
        ? "liquid-glass-dark border-white/10 text-white"
        : "liquid-glass-blue border-[#E5C158]/30 text-white"
    }`}>
      
      {/* Subtle Marquee Divider */}
      <div className="overflow-hidden whitespace-nowrap border-b border-white/10 pb-8 mb-12 select-none opacity-20">
        <div className={`inline-block animate-marquee font-heading font-extrabold text-[5vw] uppercase tracking-tight ${
          isDark ? "text-stroke-red" : "text-stroke-gold"
        }`}>
          Advanced Academic Center // AAC GRIET // Research &amp; Development // Patents // Autonomous Systems &nbsp;
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Left Brand info */}
          <div className="md:col-span-5 space-y-3">
            <div className="font-heading font-extrabold text-2xl tracking-tight flex items-center gap-2">
              <span className={isDark ? "text-red-gradient" : "text-gold-gradient"}>AAC</span>
              <span className="text-white">GRIET Hyderabad</span>
            </div>

            <p className="font-sans text-sm text-gray-200 leading-relaxed max-w-sm">
              Advanced Academic Center (AAC) is an interdisciplinary research and innovation center committed to student research, patent creation, and technology development at GRIET.
            </p>

            <div className="space-y-1.5 font-sans text-xs text-gray-300 pt-1">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className={isDark ? "text-[#DC2626]" : "text-[#F0D375]"} />
                <span>GRIET, Bachupally, Hyderabad, Telangana 500090</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className={isDark ? "text-[#DC2626]" : "text-[#F0D375]"} />
                <span>aac@griet.ac.in</span>
              </div>
            </div>
          </div>

          {/* Middle Nav Links */}
          <div className="md:col-span-4 space-y-3 font-sans font-semibold text-xs tracking-wider">
            <div className={`font-heading font-bold text-sm mb-3 ${isDark ? "text-[#DC2626]" : "text-[#F0D375]"}`}>
              AAC Directory
            </div>
            <div className="grid grid-cols-2 gap-2">
              {aacLinks.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="text-gray-200 hover:text-white transition-colors py-1 flex items-center gap-1.5"
                >
                  <span>→</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Social & Quick Actions */}
          <div className="md:col-span-3 space-y-3 font-sans font-semibold text-xs tracking-wider">
            <div className={`font-heading font-bold text-sm mb-3 ${isDark ? "text-[#DC2626]" : "text-[#F0D375]"}`}>
              Connect &amp; Explore
            </div>
            <div className="space-y-2.5">
              <Link
                href="/gprime2026-results"
                className={`block p-3 text-center font-bold rounded-xl transition-all shadow-lg ${
                  isDark ? "bg-[#DC2626] text-white hover:bg-[#b91c1c]" : "bg-[#E5C158] text-black hover:bg-[#d4af37]"
                }`}
              >
                Check Gprime 2026 Results
              </Link>

              <div className="flex gap-2.5 pt-1">
                <a href="#" className="p-2.5 border border-white/20 rounded-xl flex-1 text-center font-bold text-gray-200 hover:text-white bg-black/30 hover:border-white transition-all">
                  LinkedIn
                </a>
                <a href="#" className="p-2.5 border border-white/20 rounded-xl flex-1 text-center font-bold text-gray-200 hover:text-white bg-black/30 hover:border-white transition-all">
                  GitHub
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back To Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-gray-300">
          <div>
            © {new Date().getFullYear()} Advanced Academic Center (AAC), GRIET Hyderabad. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className={`flex items-center gap-2 px-4 py-2 border rounded-full font-semibold transition-all ${
              isDark
                ? "bg-white/10 border-white/20 text-[#DC2626] hover:bg-[#DC2626] hover:text-white"
                : "bg-white/10 border-white/20 text-[#F0D375] hover:bg-[#E5C158] hover:text-black shadow-md"
            }`}
          >
            <span>Back to Top</span>
            <FaArrowUp size={11} />
          </button>
        </div>
      </div>
    </footer>
  );
}
