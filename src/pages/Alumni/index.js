import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import BackgroundVideo from "@/components/BackgroundVideo";
import GarcyNavbar from "@/components/garcy/GarcyNavbar";
import GarcyFooter from "@/components/garcy/GarcyFooter";
import GarcyCommandPalette from "@/components/garcy/GarcyCommandPalette";
import GarcyCaseStudies from "@/components/garcy/GarcyCaseStudies";
import { useDatabase } from "@/hooks/useDatabase";
import alumniData from "@/components/Data/Alumniaac";
import {
  FaGraduationCap,
  FaSearch,
  FaUserGraduate,
  FaBriefcase,
  FaBuilding,
  FaExternalLinkAlt,
} from "react-icons/fa";

export default function AlumniPage() {
  const { data: dbAlumni } = useDatabase("alumni");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);

  const displayAlumni = dbAlumni && dbAlumni.length > 0 ? dbAlumni : alumniData;

  const filteredAlumni = displayAlumni.filter((alumnus) => {
    const name = alumnus.Name || alumnus.name || "";
    const designation = alumnus.Designation || alumnus.designation || "";
    const company = alumnus.Company || alumnus.company || "";
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <Head>
        <title>ALUMNI DIRECTORY // AAC GRIET</title>
        <meta
          name="description"
          content="AAC GRIET Alumni Network: Connecting generations of student researchers, engineers, inventors, and entrepreneurs."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <BackgroundVideo />

      {/* Ambient Dither & Dynamic Spotlight */}
      <div className="reel-dither" aria-hidden="true" />
      <div className="spotlight" aria-hidden="true" />

      {/* Main Stage Canvas */}
      <main className="stage relative overflow-hidden bg-[#080B12]/92 text-[#EAF1FF] min-h-screen pb-20">
        
        {/* Floating Header */}
        <GarcyNavbar
          onOpenSearch={() => setSearchOpen(true)}
          onOpenCaseStudies={() => setCaseStudiesOpen(true)}
        />

        {/* Hero Section */}
        <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[10.5px] font-semibold tracking-wide uppercase mb-4 border backdrop-blur-md bg-[#1769FF]/15 border-[#1769FF]/40 text-[#49A3FF]">
              <FaGraduationCap className="text-[10px]" />
              <span>Global Network &bull; Former AAC Researchers</span>
            </div>

            <h1 className="font-extrabold text-4xl sm:text-6xl tracking-tighter leading-tight mb-4 text-[#EAF1FF] uppercase font-sans">
              AAC Alumni <br />
              <span className="italic font-serif font-normal text-[#49A3FF] lowercase tracking-normal text-3xl sm:text-5xl">
                directory
              </span>{" "}
              &amp; Legacy.
            </h1>

            <p className="text-sm sm:text-base text-[#8793A8] leading-relaxed font-sans font-normal">
              Connecting generations of Advanced Academic Center inventors, software engineers, and founders shaping industry and research across the globe.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-12 garcy-glass-header p-2.5">
            <div className="relative w-full">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8793A8] text-xs" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search alumni by name..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#080B12] border border-white/10 text-xs font-mono text-white placeholder-[#8793A8]/60 focus:outline-none focus:border-[#1769FF]"
              />
            </div>
          </div>

          {/* Alumni Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {filteredAlumni.map((alumnus) => {
              const name = alumnus.Name || alumnus.name;
              const img = alumnus.Image || alumnus.image;
              const designation = alumnus.Designation || alumnus.designation || "AAC Graduate";
              return (
                <div
                  key={alumnus.Id || alumnus.id || name}
                  className="garcy-glass-card p-5 flex flex-col justify-between hover:border-[#1769FF]/70 transition-all duration-300 group hover:-translate-y-1 border border-white/15 shadow-xl bg-gradient-to-br from-[#101725] to-[#080B12] text-center"
                >
                  <div>
                    {/* Alumni Photo */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-2xl overflow-hidden mb-4 border-2 border-[#1769FF]/30 group-hover:border-[#49A3FF] transition-all bg-[#080B12] shadow-lg relative">
                      {img ? (
                        <img
                          src={img}
                          alt={name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-mono font-black text-2xl text-[#49A3FF]">
                          {name?.charAt(0)}
                        </div>
                      )}
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-[#EAF1FF] font-sans group-hover:text-[#49A3FF] transition-colors leading-snug mb-1">
                      {name}
                    </h2>

                    <div className="text-[11px] font-mono text-[#8793A8]">
                      {designation}
                    </div>
                  </div>

                  <div className="pt-3 mt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#8793A8]">
                    <span>ALUMNUS</span>
                    <span className="text-[#49A3FF] font-bold">GRIET AAC</span>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredAlumni.length === 0 && (
            <div className="text-center py-16 text-[#8793A8] font-mono text-sm">
              No alumni found matching your search.
            </div>
          )}
        </section>

        {/* Global Footer */}
        <GarcyFooter />

        {/* Command Palette */}
        <GarcyCommandPalette
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
        />

        {/* Case Studies Drawer */}
        <GarcyCaseStudies
          isOpen={caseStudiesOpen}
          onClose={() => setCaseStudiesOpen(false)}
        />
      </main>
    </>
  );
}
