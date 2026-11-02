import { useState } from "react";
import Link from "next/link";
import {
  FaTrophy,
  FaLightbulb,
  FaFileAlt,
  FaAward,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaShieldAlt,
} from "react-icons/fa";

export default function GarcyAchievementsProof() {
  const [activeFilter, setActiveFilter] = useState("all");

  const telemetryBadges = [
    { label: "Patents Published", value: "2 IP Filings", note: "Indian Patent Registry" },
    { label: "Vishwakarma Award", value: "National Honor", note: "AICTE Recognition" },
    { label: "MOU with NRSC", value: "ISRO Partner", note: "Space & Remote Sensing" },
    { label: "Active Student Fellows", value: "400+", note: "Across 5 Domains" },
  ];

  const proofs = [
    {
      id: "pat-1",
      category: "patents",
      tag: "PUBLISHED ONLINE",
      title: "Automated Electronic Pill Reminder Device with Two-Way Confirmation",
      registry: "Indian Patent Office",
      appNo: "App No. 201941002559",
      date: "Published 2019",
      desc: "An automated electronic device for reminding pill consumption with two-way confirmation and replaceable pill compartments. Invented by Yelma Chethan Reddy, Alence Abhinay, B.S.V.S Anoop, M Srikanth, D. Naga pavan, G Pradeep Reddy.",
      link: "/Patents",
      icon: FaLightbulb,
      verified: true,
    },
    {
      id: "pat-2",
      category: "patents",
      tag: "PUBLISHED ONLINE",
      title: "Smart Glove for Recognizing & Communicating Sign Language",
      registry: "Indian Patent Office",
      appNo: "App No. 202041038106",
      date: "Published 2020",
      desc: "Wearable smart glove sensor architecture translating sign language gestures into text and speech in real-time. Invented by Jashwanth Kranthi Bopanna, Santosh Sanjeev, Bharath Varma Kantheti, Gowtham Sai Ponnekanti, Suhas Gangireddy, G Pradeep Reddy.",
      link: "/Patents",
      icon: FaLightbulb,
      verified: true,
    },
    {
      id: "vishwa-1",
      category: "hackathons",
      tag: "NATIONAL HONOR",
      title: "AICTE Vishwakarma Award 2018",
      registry: "AICTE / MHRD Govt of India",
      appNo: "National Recognition",
      date: "2018",
      desc: "Prestigious national recognition honoring AAC student engineering innovation, technical rigor, and impactful problem-solving.",
      link: "/Achievements",
      icon: FaTrophy,
      verified: true,
      image: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100184/AAC-web/news_events/vishwakarma_zzzwlh.jpg"
    },
    {
      id: "mou-1",
      category: "hackathons",
      tag: "STRATEGIC PARTNERSHIP",
      title: "Signing of Official R&D MOU with NRSC (ISRO)",
      registry: "National Remote Sensing Centre",
      appNo: "Strategic Research Alliance",
      date: "MOU In Force",
      desc: "Official collaboration with NRSC for joint research projects, remote sensing data analysis, and student exposure to national space technology initiatives.",
      link: "/Achievements",
      icon: FaShieldAlt,
      verified: true,
      image: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100167/AAC-web/news_events/nrsc5_e8it62.jpg"
    },
    {
      id: "pub-1",
      category: "publications",
      tag: "PEER REVIEWED",
      title: "Ensemble–Based Wine Quality Detection using Hybrid Machine Learning Models",
      registry: "IJERT (ISSN: 2278-0181)",
      appNo: "Vol. 13 Issue 01",
      date: "August 2024",
      desc: "Novel ensemble hybrid machine learning framework authored by Dodda Abhiram, Siddharth Mahesh Balijepally, and Ekantha Sai Sundar.",
      link: "/Publications",
      icon: FaFileAlt,
      verified: true,
    },
    {
      id: "hack-multi",
      category: "hackathons",
      tag: "NATIONAL PODIUMS",
      title: "Multiple National & Regional Hackathon Champions",
      registry: "GRIET & Inter-College Competitions",
      appNo: "AAC Innovation Contingents",
      date: "Annual Victories",
      desc: "AAC teams consistently secure first place podiums across coding competitions, technical ideathons, and project road shows judged by senior scientists.",
      link: "/Achievements",
      icon: FaAward,
      verified: true,
      image: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100162/AAC-web/news_events/Juniorshackathon2_opwpyj.jpg"
    },
  ];

  const categories = [
    { id: "all", label: "All Proofs (6)" },
    { id: "patents", label: "Patents (50+ Filed)" },
    { id: "hackathons", label: "Hackathons & Trophies" },
    { id: "publications", label: "IEEE Publications" },
  ];

  const filtered =
    activeFilter === "all"
      ? proofs
      : proofs.filter((p) => p.category === activeFilter);

  return (
    <section id="achievements" className="relative py-28 px-4 sm:px-6 max-w-7xl mx-auto border-b border-white/10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[10.5px] font-semibold tracking-wide uppercase mb-3 border backdrop-blur-md bg-[#E5A93C]/15 border-[#E5A93C]/40 text-[#E5A93C]">
            <span>07 // Verified Institutional Achievements</span>
          </div>

          <h2 className="font-extrabold text-3xl sm:text-5xl tracking-tighter text-[#EAF1FF] mb-2 uppercase font-sans">
            Proof, not <br />
            <span className="italic font-serif font-normal text-[#E5A93C] lowercase tracking-normal text-3xl sm:text-5xl">
              claims.
            </span>
          </h2>
        </div>

        <p className="mt-4 md:mt-0 text-xs sm:text-sm text-[#9E988A] max-w-sm font-sans font-normal leading-relaxed">
          Verifiable patent application registries, national hackathon trophies, and peer-reviewed IEEE publications.
        </p>
      </div>

      {/* Top 4 Proof Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {telemetryBadges.map((badge) => (
          <div
            key={badge.label}
            className="p-5 rounded-2xl bg-[#111318]/80 border border-white/15 flex flex-col justify-between shadow-lg"
          >
            <div className="text-[10px] font-mono uppercase text-[#9E988A] tracking-wider">
              {badge.label}
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#E5A93C] my-2">
              {badge.value}
            </div>
            <div className="text-[10px] font-mono text-[#EAF1FF] flex items-center gap-1">
              <FaCheckCircle className="text-[#E5A93C] text-[9px]" />
              <span>{badge.note}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveFilter(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all flex-shrink-0 ${
              activeFilter === cat.id
                ? "bg-[#E5A93C] text-white font-bold shadow-[0_4px_16px_rgba(229, 169, 60,0.4)]"
                : "bg-[#111318] text-[#9E988A] hover:text-white border border-white/10 hover:border-white/20"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Verified Proof Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="garcy-glass-card p-6 flex flex-col justify-between hover:border-[#E5A93C]/70 transition-all duration-300 group hover:-translate-y-1 border border-white/15 shadow-xl"
            >
              <div>
                {/* Header Tag + Verified Pill */}
                <div className="flex items-center justify-between text-xs font-mono uppercase mb-4">
                  <span className="flex items-center gap-1.5 text-[#E5A93C] font-bold text-[10px]">
                    <Icon className="text-xs" />
                    <span>{item.tag}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#08090C] text-[#E5A93C] border border-[#E5A93C]/40 text-[8.5px] font-bold flex items-center gap-1">
                    <FaCheckCircle className="text-[7.5px]" />
                    <span>VERIFIED</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#EAF1FF] mb-2 font-sans group-hover:text-[#E5A93C] transition-colors leading-snug">
                  {item.title}
                </h3>

                {/* Registry & Application No */}
                <div className="p-2.5 rounded-lg bg-[#08090C]/80 border border-white/10 text-[10px] font-mono text-[#9E988A] mb-4 space-y-0.5">
                  <div className="text-[#EAF1FF] font-semibold">{item.registry}</div>
                  <div className="text-[#E5A93C] font-bold">{item.appNo} &bull; {item.date}</div>
                </div>

                {/* Evidence Photo Preview */}
                {item.image && (
                  <div className="w-full h-32 rounded-lg overflow-hidden mb-4 border border-white/10">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Description */}
                <p className="text-xs text-[#9E988A] leading-relaxed font-sans font-normal mb-6">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Direct Link */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <Link
                  href={item.link}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#E5A93C] hover:text-white transition-colors uppercase font-bold"
                >
                  <span>Inspect Evidence</span>
                  <FaExternalLinkAlt className="text-[9px]" />
                </Link>

                <span className="text-[9px] font-mono text-[#9E988A] uppercase">
                  AAC ARCHIVE
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

