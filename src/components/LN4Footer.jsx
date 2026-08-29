import { motion } from "framer-motion";
import { FaArrowUp, FaTwitter, FaInstagram, FaYoutube, FaTwitch, FaDiscord } from "react-icons/fa";

export default function LN4Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socials = [
    { name: "INSTAGRAM", icon: FaInstagram, href: "#" },
    { name: "TWITTER / X", icon: FaTwitter, href: "#" },
    { name: "YOUTUBE", icon: FaYoutube, href: "#" },
    { name: "TWITCH", icon: FaTwitch, href: "#" },
    { name: "DISCORD", icon: FaDiscord, href: "#" },
  ];

  return (
    <footer className="bg-[#050507] text-white border-t border-[#D2FF00]/20 pt-20 pb-12 relative overflow-hidden">
      
      {/* Infinite Continuous Kinetic Ticker */}
      <div className="overflow-hidden whitespace-nowrap border-b border-white/10 pb-12 mb-16 select-none opacity-25">
        <div className="inline-block animate-marquee font-syne font-black text-[9vw] uppercase tracking-tighter text-stroke-neon">
          LANDO NORRIS // LN4 // FORMULA 1 // McLAREN // SPEED & PRECISION // QUADRANT &nbsp;
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Left Brand info */}
          <div className="md:col-span-5 space-y-4">
            <div className="font-syne font-extrabold text-4xl tracking-tighter text-white flex items-center gap-2">
              <span className="text-[#D2FF00]">LN4</span>
              <span>DIGITAL</span>
            </div>

            <p className="text-gray-400 font-space text-sm max-w-sm leading-relaxed">
              Official digital ecosystem for Formula 1 driver Lando Norris #4. Engineered with high-speed performance, WebGL 3D, and scroll choreographies.
            </p>

            <div className="font-chakra text-xs text-gray-500 tracking-widest uppercase">
              COORDINATES: 52°04&apos;14.3&quot;N 1°01&apos;01.4&quot;W
            </div>
          </div>

          {/* Middle Nav Links */}
          <div className="md:col-span-3 space-y-3 font-chakra font-bold text-xs tracking-widest uppercase">
            <div className="text-[#D2FF00] mb-4">QUICK NAVIGATION</div>
            <a href="#hero" className="block text-gray-300 hover:text-[#D2FF00] transition-colors">01. HERO</a>
            <a href="#telemetry" className="block text-gray-300 hover:text-[#D2FF00] transition-colors">02. CAREER TELEMETRY</a>
            <a href="#3d-gear" className="block text-gray-300 hover:text-[#D2FF00] transition-colors">03. 3D GEAR VIEWER</a>
            <a href="#on-track" className="block text-gray-300 hover:text-[#D2FF00] transition-colors">04. ON / OFF TRACK</a>
            <a href="#merch" className="block text-gray-300 hover:text-[#D2FF00] transition-colors">05. LN4 STORE</a>
          </div>

          {/* Right Social Grid */}
          <div className="md:col-span-4 space-y-3 font-chakra font-bold text-xs tracking-widest uppercase">
            <div className="text-[#D2FF00] mb-4">CONNECT & FOLLOW</div>
            <div className="grid grid-cols-2 gap-3">
              {socials.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    className="flex items-center gap-2 p-3 bg-[#121217] border border-white/10 rounded-xl text-gray-300 hover:text-black hover:bg-[#D2FF00] hover:border-[#D2FF00] transition-all"
                  >
                    <Icon size={14} />
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom copyright & back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-chakra text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} LANDO NORRIS / LN4 BRAND. ALL RIGHTS RESERVED.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 bg-[#121217] border border-white/10 hover:border-[#D2FF00] rounded-full text-[#D2FF00] hover:bg-[#D2FF00] hover:text-black transition-all"
          >
            <span>BACK TO TOP</span>
            <FaArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
