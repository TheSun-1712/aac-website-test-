import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import BackgroundVideo from "@/components/BackgroundVideo";
import GarcyNavbar from "@/components/garcy/GarcyNavbar";
import GarcyFooter from "@/components/garcy/GarcyFooter";
import GarcyCommandPalette from "@/components/garcy/GarcyCommandPalette";
import GarcyCaseStudies from "@/components/garcy/GarcyCaseStudies";
import {
  FaBrain,
  FaFileAlt,
  FaLightbulb,
  FaRocket,
  FaBook,
  FaTrophy,
  FaArrowRight,
  FaExternalLinkAlt,
  FaMicrochip,
  FaEnvelope,
} from "react-icons/fa";

export default function ResearchPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);

  const quickLinks = [
    {
      code: "SEC-01",
      name: "PUBLICATIONS",
      path: "/Publications",
      domain: "ACADEMIC PEER-REVIEW",
      description:
        "Conference papers, IEEE proceedings, and scholarly research findings authored by AAC faculty and student fellows including IJERT machine learning papers.",
      tag: "SCOPUS / IJERT",
      icon: FaFileAlt,
    },
    {
      code: "SEC-02",
      name: "PATENTS",
      path: "/Patents",
      domain: "INTELLECTUAL PROPERTY",
      description:
        "Official patent publications filed with the Indian Patent Office, including the Automated Electronic Pill Reminder and Smart Glove for Sign Language.",
      tag: "PUBLISHED IP",
      icon: FaLightbulb,
    },
    {
      code: "SEC-03",
      name: "STARTUPS & INCUBATION",
      path: "/Startups",
      domain: "COMMERCIAL SPIN-OUTS",
      description:
        "Student-founded hardware and software ventures originated in AAC labs and incubated at GRIET, such as Koolgen Interactives and The Great Honey Co.",
      tag: "INCUBATED",
      icon: FaRocket,
    },
    {
      code: "SEC-04",
      name: "BOOKS & TREATISES",
      path: "/Books",
      domain: "KNOWLEDGE ARCHIVE",
      description:
        "Published technical treatises, game development manuals, and Python/ML engineering guides authored and illustrated by AAC members.",
      tag: "OPEN ACCESS",
      icon: FaBook,
    },
    {
      code: "SEC-05",
      name: "HACKATHONS & ACHIEVEMENTS",
      path: "/Achievements",
      domain: "COMPETITIVE RIGS",
      description:
        "National podium finishes, AICTE Vishwakarma Awards, strategic ISRO NRSC collaborations, and annual project road show honors.",
      tag: "NATIONAL PODIUMS",
      icon: FaTrophy,
    },
  ];

  return (
    <>
      <Head>
        <title>RESEARCH MATRIX // AAC GRIET</title>
        <meta
          name="description"
          content="Explore our research matrix, peer-reviewed publications, patent disclosures, and innovations at the Advanced Academic Center, GRIET."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <BackgroundVideo />

      {/* Ambient Dither & Dynamic Spotlight */}
      <div className="reel-dither" aria-hidden="true" />
      <div className="spotlight" aria-hidden="true" />

      {/* Main Stage Canvas */}
      <main className="stage relative overflow-hidden bg-[#08090C]/92 text-[#EAF1FF] min-h-screen pb-20">
        
        {/* Floating Header */}
        <GarcyNavbar
          onOpenSearch={() => setSearchOpen(true)}
          onOpenCaseStudies={() => setCaseStudiesOpen(true)}
        />

        {/* Hero Section */}
        <section className="pt-32 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[10.5px] font-semibold tracking-wide uppercase mb-4 border backdrop-blur-md bg-[#E5A93C]/15 border-[#E5A93C]/40 text-[#E5A93C]">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <span>LABORATORY ARCHIVE // GRIET R&amp;D</span>
              </div>

              <h1 className="font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tighter leading-none mb-4 text-[#EAF1FF] uppercase font-sans">
                Research <br />
                <span className="italic font-serif font-normal text-[#E5A93C] lowercase tracking-normal text-3xl sm:text-5xl">
                  matrix
                </span>{" "}
                Directory.
              </h1>

              <p className="text-sm sm:text-base text-[#9E988A] leading-relaxed max-w-2xl font-sans font-normal">
                Interdisciplinary research initiatives spanning cognitive deep learning, smart sensor grids, assistive wearables, and patentable biomedical hardware.
              </p>
            </div>

            {/* Quick KPI Badge Cluster */}
            <div className="flex items-center gap-4 font-mono text-xs text-[#9E988A] p-4 rounded-2xl bg-[#111318] border border-white/10">
              <div>
                <span className="text-[#9E988A] block text-[10px] uppercase">PROTOTYPES</span>
                <span className="text-2xl font-extrabold text-white">50+</span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <span className="text-[#9E988A] block text-[10px] uppercase">REGISTERED IP</span>
                <span className="text-2xl font-extrabold text-[#E5A93C]">2</span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <span className="text-[#9E988A] block text-[10px] uppercase">STATUS</span>
                <span className="text-xs font-bold text-[#10b981] block mt-1">● 24/7 ACTIVE</span>
              </div>
            </div>
          </div>
        </section>

        {/* Modular Grid of Research Portals */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <span className="font-mono text-xs uppercase font-bold text-[#E5A93C] tracking-wider">
              PRIMARY RESEARCH SECTORS // SELECT TO ACCESS
            </span>
            <span className="font-mono text-xs text-[#9E988A]">INDEX: 01 TO 05</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((sec) => {
              const Icon = sec.icon;
              return (
                <Link
                  key={sec.code}
                  href={sec.path}
                  className="garcy-glass-card p-7 flex flex-col justify-between hover:border-[#E5A93C]/70 transition-all duration-300 group hover:-translate-y-1 border border-white/15 shadow-xl bg-gradient-to-br from-[#111318] to-[#08090C]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5 font-mono text-xs">
                      <span className="font-bold text-[#E5A93C] px-2.5 py-0.5 rounded-full bg-[#08090C] border border-[#E5A93C]/30">
                        {sec.code}
                      </span>
                      <span className="text-[10px] font-mono text-[#9E988A] uppercase">
                        {sec.tag}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-10 h-10 rounded-xl bg-[#08090C] border border-white/10 flex items-center justify-center text-[#E5A93C]">
                        <Icon size={18} />
                      </span>
                      <h2 className="text-xl font-bold text-[#EAF1FF] uppercase tracking-tight group-hover:text-[#E5A93C] transition-colors font-sans">
                        {sec.name}
                      </h2>
                    </div>

                    <div className="font-mono text-[10px] text-[#E5A93C] uppercase tracking-wider mb-3">
                      &rarr; {sec.domain}
                    </div>

                    <p className="text-xs text-[#9E988A] leading-relaxed font-sans font-normal">
                      {sec.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                    <span className="text-[#9E988A] group-hover:text-white transition-colors uppercase font-bold text-[10px]">
                      Inspect Sector
                    </span>
                    <span className="text-[#E5A93C] font-bold group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}

            {/* Proposal Submission Card */}
            <div className="garcy-glass-card p-7 flex flex-col justify-between border border-[#E5A93C]/50 shadow-2xl bg-gradient-to-br from-[#111318] via-[#0d162a] to-[#08090C]">
              <div>
                <div className="flex items-center justify-between mb-5 font-mono text-xs">
                  <span className="font-bold text-[#10b981] px-2.5 py-0.5 rounded-full bg-[#08090C] border border-[#10b981]/30">
                    CALL FOR PROPOSALS
                  </span>
                  <span className="text-[10px] font-mono text-[#9E988A] uppercase">
                    COLLABORATION
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-3 font-sans">
                  Propose a New Initiative
                </h3>

                <p className="text-xs text-[#9E988A] font-sans leading-relaxed">
                  Have a challenging engineering or hardware problem statement? AAC accepts R&amp;D proposals from faculty, students, and external industry partners.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <a
                  href="mailto:aacgriet.org@gmail.com"
                  className="w-full py-3 rounded-xl bg-[#E5A93C] hover:bg-[#E5A93C] hover:text-black text-white text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <FaEnvelope className="text-[10px]" />
                  <span>Submit R&amp;D Proposal</span>
                </a>
              </div>
            </div>
          </div>
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
