import Link from "next/link";
import Image from "next/image";
import { FaArrowUp, FaEnvelope } from "react-icons/fa";

export default function GarcyFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const directoryLinks = [
    { label: "R&D Projects Lab", href: "/projects" },
    { label: "Patents Pipeline", href: "/Patents" },
    { label: "Gprime 2026 Results", href: "/gprime2026-results" },
    { label: "IEEE Publications", href: "/Publications" },
    { label: "Annual Expo & Opulence", href: "/Events" },
    { label: "Startups & Ventures", href: "/Startups" },
    { label: "Research Labs & IoT", href: "/Research" },
    { label: "Alumni Directory", href: "/Alumni" },
    { label: "Administration & Heads", href: "/Administration" },
    { label: "National Achievements", href: "/Achievements" },
    { label: "Published Books", href: "/Books" },
    { label: "About AAC & Griet", href: "/About" },
  ];

  return (
    <footer className="relative bg-[#06080e] text-[#8793A8] pt-20 pb-12 px-4 sm:px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          
          {/* Brand & Mission Column */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-6 h-6 flex items-center justify-center">
                <Image
                  src="/images/AAC3.png"
                  alt="AAC Logo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-[#EAF1FF] font-sans uppercase">
                AAC <span className="text-[#8793A8] font-normal">// GRIET</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#8793A8] leading-relaxed max-w-sm mb-6 font-sans font-normal">
              Advanced Academic Center &bull; Gokaraju Rangaraju Institute of Engineering and Technology. Preparing future engineers through autonomous systems, robotics, and patentable deep-tech inventions.
            </p>

            <div className="text-[11px] font-mono text-[#8793A8] space-y-1">
              <div>Room 3614, Block 3, GRIET Campus &bull; Hyderabad 500090</div>
              <div>Official Email: <a href="mailto:aacgriet.org@gmail.com" className="text-[#49A3FF] hover:underline font-bold">aacgriet.org@gmail.com</a></div>
              <div>Instagram: <a href="https://instagram.com/aac_grietofficial?igshid=YmMyMTA2M2Y=" target="_blank" rel="noopener noreferrer" className="text-[#49A3FF] hover:underline">@aac_grietofficial</a></div>
            </div>
          </div>

          {/* Directory Column */}
          <div className="md:col-span-7">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#EAF1FF] mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1769FF]" />
              <span>Center Directory &bull; 12 Indexed Nodes</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2.5 gap-x-4 text-xs font-mono">
              {directoryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-[#49A3FF] transition-colors truncate text-[#8793A8]"
                >
                  &rarr; {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#8793A8]/70 gap-4">
          <div>
            &copy; {new Date().getFullYear()} ADVANCED ACADEMIC CENTER (AAC) GRIET. ALL RIGHTS RESERVED.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#1769FF] hover:text-white text-[#8793A8] transition-all uppercase text-[10px] border border-white/5 font-mono"
          >
            <span>Return To Top</span>
            <FaArrowUp className="text-[9px]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
