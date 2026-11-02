import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import BackgroundVideo from "@/components/BackgroundVideo";
import GarcyNavbar from "@/components/garcy/GarcyNavbar";
import GarcyFooter from "@/components/garcy/GarcyFooter";
import GarcyCommandPalette from "@/components/garcy/GarcyCommandPalette";
import GarcyCaseStudies from "@/components/garcy/GarcyCaseStudies";
import { useDatabase } from "@/hooks/useDatabase";
import {
  FaLightbulb,
  FaSearch,
  FaTimes,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaLayerGroup,
} from "react-icons/fa";

export default function PatentsPage() {
  const { data: patentsData } = useDatabase("patents");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatent, setSelectedPatent] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);

  const defaultPatents = [
    {
      id: "automated-pill-reminder",
      title: "An automated electronic device for reminding consumption of pills scheduled and even for missed schedules with specified two way confirmation along with replaceable pill compartments layer as value addition been facilitated to the changing requirements.",
      shortTitle: "Automated Electronic Pill Reminder Device",
      category: "Healthcare",
      status: "PUBLISHED ONLINE",
      patentOffice: "India",
      applicationNumber: "201941002559",
      date: "2019-01-21",
      inventors: [
        "Yelma Chethan Reddy",
        "Alence Abhinay",
        "B.S.V.S Anoop",
        "M Srikanth",
        "D.Naga pavan",
        "G Pradeep Reddy"
      ],
      description: "This patent is for an innovative device designed to help patients remember to take their medications on schedule. The device includes multiple pill compartments that can be customized and provides two-way confirmation to ensure medications are taken properly. It's especially useful for elderly patients or those with complex medication regimens.",
    },
    {
      id: "smart-glove-sign-language",
      title: "A SMART GLOVE FOR RECOGNIZING AND COMMUNICATING SIGN LANGUAGE AND ASSOCIATED METHOD THEREOF.",
      shortTitle: "Smart Glove for Sign Language Translation",
      category: "Assistive Technology",
      status: "PUBLISHED ONLINE",
      patentOffice: "India",
      applicationNumber: "202041038106",
      date: "2020-09-03",
      inventors: [
        "Jashwanth Kranthi Bopanna",
        "Santosh Sanjeev",
        "Bharath Varma Kantheti",
        "Gowtham Sai Ponnekanti",
        "Suhas Gangireddy",
        "G Pradeep Reddy"
      ],
      description: "This patent describes a wearable technology in the form of a glove that can recognize sign language gestures and translate them into text or speech. The smart glove uses sensors to detect hand movements and positions, enabling real-time communication for individuals who use sign language. This innovation aims to bridge communication gaps between sign language users and those who don't understand sign language.",
    },
  ];

  const displayPatents = patentsData && patentsData.length > 0 ? patentsData : defaultPatents;

  const filteredPatents = displayPatents.filter((patent) => {
    const title = patent.title || patent.shortTitle || "";
    const desc = patent.description || "";
    const appNo = patent.applicationNumber || "";
    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appNo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <Head>
        <title>PATENTS &amp; IP PIPELINE // AAC GRIET</title>
        <meta
          name="description"
          content="50+ verifiable patents and intellectual property filings created by students and faculty at AAC GRIET"
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
        <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[10.5px] font-semibold tracking-wide uppercase mb-4 border backdrop-blur-md bg-[#E5A93C]/15 border-[#E5A93C]/40 text-[#E5A93C]">
              <FaLightbulb className="text-[10px]" />
              <span>Intellectual Property Cell &bull; 50+ Inventions</span>
            </div>

            <h1 className="font-extrabold text-4xl sm:text-6xl tracking-tighter leading-tight mb-4 text-[#EAF1FF] uppercase font-sans">
              Patents &amp; Intellectual <br />
              <span className="italic font-serif font-normal text-[#E5A93C] lowercase tracking-normal text-3xl sm:text-5xl">
                property
              </span>{" "}
              Portfolio.
            </h1>

            <p className="text-sm sm:text-base text-[#9E988A] leading-relaxed font-sans font-normal">
              Official Indian Patent Office application filings spanning autonomous aerial robotics, edge computing neural units, and smart sensor meshes.
            </p>
          </div>

          {/* Search Bar */}
          <div className="garcy-glass-card p-4 sm:p-5 border border-white/15 mb-12 shadow-2xl max-w-2xl mx-auto">
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#08090C]/80 border border-white/10">
              <FaSearch className="text-[#9E988A] text-xs flex-shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by patent title, category, or application number..."
                className="w-full bg-transparent border-0 text-white placeholder-[#9E988A]/60 focus:outline-none text-xs font-mono"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="text-[10px] font-mono text-[#9E988A] hover:text-white uppercase"
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>

          {/* Patents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatents.map((patent, idx) => (
              <div
                key={patent.id || idx}
                onClick={() => setSelectedPatent(patent)}
                className="garcy-glass-card p-6 flex flex-col justify-between hover:border-[#E5A93C]/70 transition-all duration-300 group hover:-translate-y-1 cursor-pointer border border-white/15 shadow-xl bg-gradient-to-br from-[#111318] to-[#08090C]"
              >
                <div>
                  {/* Top Bar: Category & Status */}
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase mb-4">
                    <span className="text-[#9E988A] font-bold truncate max-w-[170px]">
                      {patent.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#08090C] text-[#E5A93C] border border-[#E5A93C]/40 text-[8.5px] font-bold">
                      {patent.status || "PUBLISHED"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#EAF1FF] mb-2 font-sans group-hover:text-[#E5A93C] transition-colors leading-snug">
                    {patent.shortTitle || patent.title}
                  </h3>

                  {/* Application No Box */}
                  <div className="p-2.5 rounded-lg bg-[#08090C]/80 border border-white/10 text-[10px] font-mono text-[#9E988A] mb-4 space-y-0.5">
                    <div className="text-white font-bold">App No. {patent.applicationNumber}</div>
                    <div className="text-[#E5A93C]">{patent.patentOffice} &bull; {patent.date}</div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#9E988A] leading-relaxed font-sans font-normal line-clamp-3 mb-6">
                    {patent.description}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#9E988A]">
                  <span className="group-hover:text-[#E5A93C] transition-colors flex items-center gap-1.5 uppercase font-bold text-[10px]">
                    <span>Inspect Patent</span>
                    <span>&rarr;</span>
                  </span>

                  <span className="text-[9px] font-mono text-[#9E988A]">
                    VERIFIED IP
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredPatents.length === 0 && (
            <div className="text-center py-20 text-[#9E988A] font-mono text-xs">
              No matching patents found for &ldquo;{searchTerm}&rdquo;
            </div>
          )}
        </section>

        {/* Patent Details Modal Drawer */}
        {selectedPatent && (
          <div
            className="fixed inset-0 z-[160] bg-[#08090C]/90 backdrop-blur-2xl flex items-center justify-center p-4"
            onClick={() => setSelectedPatent(null)}
          >
            <div
              className="garcy-glass-card max-w-xl w-full p-6 sm:p-8 text-left relative border border-[#E5A93C]/60 shadow-[0_0_60px_rgba(229, 169, 60,0.4)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between text-xs font-mono uppercase text-[#E5A93C] mb-5 font-bold">
                <span>{selectedPatent.category} // INTELLECTUAL PROPERTY</span>
                <button
                  type="button"
                  onClick={() => setSelectedPatent(null)}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-[#9E988A] hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Close"
                >
                  <FaTimes />
                </button>
              </div>

              <h3 className="text-2xl font-extrabold text-[#EAF1FF] mb-3 font-sans">
                {selectedPatent.title}
              </h3>

              <div className="p-3.5 rounded-xl bg-[#08090C]/80 border border-white/10 text-xs font-mono mb-5 space-y-1">
                <div>Registry: <span className="text-white font-bold">{selectedPatent.patentOffice}</span></div>
                <div>Application Number: <span className="text-[#E5A93C] font-bold">{selectedPatent.applicationNumber}</span></div>
                <div>Filing / Publication Date: <span className="text-white font-bold">{selectedPatent.date}</span></div>
                <div>Status: <span className="text-[#E5A93C] font-bold">{selectedPatent.status}</span></div>
              </div>

              <p className="text-sm text-[#9E988A] leading-relaxed mb-6 font-sans">
                {selectedPatent.description}
              </p>

              {selectedPatent.inventors && (
                <div className="mb-6">
                  <div className="text-[10px] font-mono uppercase text-[#9E988A] tracking-wider mb-2 font-semibold">
                    Inventors &amp; Assignees:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedPatent.inventors.map((inv) => (
                      <span
                        key={inv}
                        className="px-3 py-1 rounded-lg bg-[#08090C] border border-[#E5A93C]/30 text-xs font-mono text-[#EAF1FF]"
                      >
                        {inv}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-5 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setSelectedPatent(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider transition-all"
                >
                  Close (ESC)
                </button>

                <div className="text-xs font-mono text-[#E5A93C] flex items-center gap-1.5 font-bold">
                  <FaCheckCircle className="text-xs" />
                  <span>INDIAN PATENT OFFICE VERIFIED</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <GarcyFooter />

        {/* Command Palette (⌘K) */}
        <GarcyCommandPalette
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
        />

        {/* Case Study Drawer */}
        <GarcyCaseStudies
          isOpen={caseStudiesOpen}
          onClose={() => setCaseStudiesOpen(false)}
        />
      </main>
    </>
  );
}
