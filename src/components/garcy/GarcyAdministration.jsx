import { useState } from "react";
import Link from "next/link";
import {
  coreCommitteeData,
  getAvailableYears,
} from "@/components/Data/coreCommitteeData";
import {
  FaUserTie,
  FaGraduationCap,
  FaLinkedin,
  FaEnvelope,
  FaTimes,
  FaExternalLinkAlt,
  FaAward,
  FaUsers,
  FaLightbulb,
} from "react-icons/fa";

export default function GarcyAdministration() {
  const [activeCategory, setActiveCategory] = useState("instigators");
  const availableYears = getAvailableYears();
  const [selectedYear, setSelectedYear] = useState(availableYears[0] || "2025");
  const [selectedPerson, setSelectedPerson] = useState(null);

  // 01 // Instigators
  const instigators = [
    {
      id: "pandit",
      name: "Dr. S.N.N. Pandit",
      role: "Founder & Chief Mentor",
      dept: "GRIET Research Directorate",
      tier: "FOUNDING MENTOR",
      image: "https://res.cloudinary.com/aacgriet/image/upload/v1664100148/AAC-web/mentors/pandith_s8bqhh.jpg",
      bio: "Dr. S.N.N. Pandit was the founder head of the statistics department in Dibrugarh University, Assam. Dr. Pandit gave the idea of 'Advanced Academic Center' in 2004 as a forum to generate creative ideas involving faculty and students. He was founder director of Center Of Quantitative Methods at Osmania University, supervising 35 Ph.D scholars.",
      expertise: ["Quantitative Methods", "Statistical Modeling", "Academic Architecture", "Ph.D. Supervision"],
      email: "aacgriet.org@gmail.com",
    },
    {
      id: "iyengar",
      name: "Dr. Satteluri R.K. Iyengar",
      role: "Founding Pillar & Academic Dean",
      dept: "GRIET Academic Affairs",
      tier: "FOUNDING PILLAR",
      image: "https://res.cloudinary.com/aacgriet/image/upload/v1664100147/AAC-web/mentors/iyengar_dmrolm.jpg",
      bio: "Professor at IIT Delhi in the Department of Mathematics for over 38 years. Worked as a post-doctoral fellow at Oxford University Computing Laboratory, U.K. Author of over half a dozen celebrated textbooks and the first Dean of Academic Affairs at GRIET.",
      expertise: ["Computational Mathematics", "Numerical Analysis", "Oxford Research", "Curriculum Standards"],
      email: "aacgriet.org@gmail.com",
    },
  ];

  // 02 // Head Advisors
  const headAdvisors = [
    {
      id: "murthy",
      name: "Dr. Jandhyala N Murthy",
      role: "Director, GRIET",
      dept: "Institutional Directorate",
      tier: "DIRECTORATE",
      image: "https://res.cloudinary.com/aacgriet/image/upload/v1752569355/AAC-web/mentors/jandhyala.png",
      bio: "Director of GRIET and former Wing Commander in the IAF. Principal of GRIET since 2004 before taking up the Director position. Areas of interest span Thermal Engineering, Gas Turbine Combustion Chambers, simulation, and academic innovation.",
      expertise: ["Aerospace Engineering", "Thermal Simulation", "Institutional Leadership", "Turbine Dynamics"],
      email: "director@griet.ac.in",
    },
    {
      id: "praveen",
      name: "Dr. J Praveen",
      role: "Principal, GRIET",
      dept: "Academic Administration",
      tier: "PRINCIPAL",
      image: "https://res.cloudinary.com/aacgriet/image/upload/v1664100147/AAC-web/mentors/jpraveen_mzj4fp.jpg",
      bio: "Major contributor to Power Electronics research with over 80 publications in reputed International and National Journals and Conferences. Registered PhD Guide at JNT University with Dale Carnegie High Impact Teaching certification.",
      expertise: ["Power Electronics", "Renewable Energy", "JNTU PhD Guide", "Institutional Standards"],
      email: "principal@griet.ac.in",
    },
    {
      id: "kiran",
      name: "Dr. Mamidi Kiran Kumar",
      role: "Dean, AAC",
      dept: "AIML Department",
      tier: "DEAN AAC",
      image: "https://res.cloudinary.com/dltvvelmx/image/upload/v1694781872/kiran1610_hhgs1v.jpg",
      bio: "Associate Professor in AIML at GRIET and Rajeev Gandhi National Fellowship awardee. Specializing in Area-based Localization Techniques for Wireless Sensor Networks with over a decade of research incubation.",
      expertise: ["AI & ML Engineering", "Wireless Sensor Networks", "Localization", "Research Incubation"],
      email: "aacgriet.org@gmail.com",
    },
  ];

  // 03 // Advisors
  const advisors = [
    {
      id: "arvind",
      name: "Dr. Arvind Vishnubhatla",
      role: "Professor, ECE GRIET",
      dept: "Hardware & DSP Lab",
      tier: "FACULTY ADVISOR",
      image: "https://res.cloudinary.com/aacgriet/image/upload/v1664100146/AAC-web/mentors/aravind_gnf36b.jpg",
      bio: "Professor at GRIET specializing in Signal Processing, Embedded Systems, and System Design. Worked on GSM switch development and distributed control systems for steel plant automation.",
      expertise: ["Signal Processing", "Embedded Systems", "Hardware Architectures", "DSP Automation"],
      email: "arvind@griet.ac.in",
    },
    {
      id: "madhav",
      name: "Dr. G.V.K. Madhav",
      role: "Systems Engineer, HPE HPC R&D",
      dept: "High Performance Computing",
      tier: "INDUSTRY ADVISOR",
      image: "https://res.cloudinary.com/aacgriet/image/upload/v1664100147/AAC-web/mentors/madhav1_fuuehs.jpg",
      bio: "Works for Hewlett-Packard Enterprise in HPC R&D division. Published at OHBM 2018 Conference for improving GPU acceleration performance in neuroimaging computation.",
      expertise: ["HPC R&D", "GPU Acceleration", "Parallel Processing", "HPE Infrastructure"],
      email: "aacgriet.org@gmail.com",
    },
    {
      id: "satish",
      name: "Mr. Satish Yellanki",
      role: "Corporate Specialist & Trainer",
      dept: "Enterprise Solutions",
      tier: "CORPORATE SPECIALIST",
      image: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_400/v1664100153/AAC-web/mentors/sss_sv2h2p.jpg",
      bio: "Over 22 years of corporate industry experience providing solutions across healthcare, insurance, education, and hospitality with deep specialization in system analysis.",
      expertise: ["System Analysis", "Solution Architecture", "Enterprise Scaling", "Corporate Strategy"],
      email: "aacgriet.org@gmail.com",
    },
    {
      id: "pradeep",
      name: "Mr. Pradeep Palelli",
      role: "Co-Founder & CEO, Thanos Tech",
      dept: "Autonomous Aerial Robotics",
      tier: "STARTUP MENTOR",
      image: "https://res.cloudinary.com/aacgriet/image/upload/v1664100150/AAC-web/mentors/pradeepp_j0e7p3.jpg",
      bio: "Leads Thanos Technologies in autonomous aerial technologies and drone innovation. Mentors AAC student innovators in hardware product engineering and commercial ventures.",
      expertise: ["Autonomous UAVs", "Hardware Ventures", "Aerial Robotics", "Operations & Scale"],
      email: "aacgriet.org@gmail.com",
    },
    {
      id: "naresh",
      name: "Dr. Naresh Kumar Mallenahalli",
      role: "Scientist, NRSC (ISRO)",
      dept: "Satellite Data Processing",
      tier: "ISRO SCIENTIST",
      image: "https://res.cloudinary.com/aacgriet/image/upload/v1664100152/AAC-web/mentors/naresh_x933qn.png",
      bio: "Works in satellite data processing group at National Remote Sensing Centre (ISRO). Research spans mathematical modeling, simulations, and statistical machine learning.",
      expertise: ["Satellite Data", "Remote Sensing Analytics", "Mathematical Modeling", "ISRO Protocols"],
      email: "aacgriet.org@gmail.com",
    },
    {
      id: "seshadri",
      name: "Shri Kidambi Seshadri",
      role: "Scientist, NRSC ISRO/DOS",
      dept: "Geo-Environmental Division",
      tier: "ISRO SCIENTIST",
      image: "https://res.cloudinary.com/aacgriet/image/upload/v1664100151/AAC-web/mentors/seshadri_kdwupb.jpg",
      bio: "Recipient of the ISRO Award 2007 under the RGNDWM project. Led mineral exploration, state-of-the-art groundwater prospect maps using Remote Sensing (RS) and GIS techniques.",
      expertise: ["GIS & Geospatial Analysis", "Remote Sensing", "Geo-Environmental R&D", "ISRO Awardee"],
      email: "aacgriet.org@gmail.com",
    },
  ];

  // Helper for committee images
  const getCommitteeImageUrl = (image) => {
    if (!image) return "/images/placeholder-avatar.png";
    if (image.startsWith("http")) return image;
    return `https://drive.google.com/uc?export=view&id=${image}`;
  };

  // Group current committee members strictly by tier
  const currentMembers = coreCommitteeData[selectedYear] || [];
  const presVp = currentMembers.filter((m) =>
    (m.designation || "").toLowerCase().includes("president")
  );
  const heads = currentMembers.filter(
    (m) =>
      (m.designation || "").toLowerCase().includes("head") &&
      !(m.designation || "").toLowerCase().includes("president")
  );
  const others = currentMembers.filter(
    (m) =>
      !(m.designation || "").toLowerCase().includes("president") &&
      !(m.designation || "").toLowerCase().includes("head")
  );

  const tabs = [
    { key: "instigators", code: "01", label: "Instigators", icon: FaLightbulb, count: instigators.length },
    { key: "headadvisors", code: "02", label: "Head Advisors", icon: FaGraduationCap, count: headAdvisors.length },
    { key: "advisors", code: "03", label: "Advisors", icon: FaUserTie, count: advisors.length },
    { key: "committee", code: "04", label: "Core Committee", icon: FaUsers, count: currentMembers.length },
  ];

  return (
    <section id="administration" className="relative py-28 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[10.5px] font-semibold tracking-wide uppercase mb-4 border backdrop-blur-md bg-[#1769FF]/15 border-[#1769FF]/40 text-[#49A3FF]">
            <FaUserTie className="text-[10px]" />
            <span>09 // Mentorship Architecture &bull; All 4 Sectors</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#EAF1FF] tracking-tighter uppercase leading-[1.08] font-sans">
            Administration &amp; <br />
            <span className="italic font-serif font-normal text-[#49A3FF] lowercase tracking-normal text-3xl sm:text-5xl">
              mentorship
            </span>{" "}
            Council.
          </h2>
        </div>

        <Link
          href="/Administration"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl garcy-glass-card hover:border-[#1769FF] text-xs font-mono font-bold uppercase tracking-wider text-[#49A3FF] hover:text-white transition-all shadow-md flex-shrink-0"
        >
          <span>Full Administration Directory</span>
          <FaExternalLinkAlt className="text-[9px]" />
        </Link>
      </div>

      {/* 4 Division Sector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {tabs.map((tab) => {
          const active = activeCategory === tab.key;
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveCategory(tab.key)}
              className={`p-4 rounded-xl text-left transition-all relative border garcy-glass-header ${
                active
                  ? "!bg-[#1769FF]/20 !border-[#1769FF] shadow-[0_0_20px_rgba(23,105,255,0.35)]"
                  : "border-white/10 hover:border-white/20 hover:bg-white/5"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5 font-mono text-[10px]">
                <span className={active ? "text-[#49A3FF] font-bold" : "text-[#8793A8]"}>
                  {tab.code} // SECTOR
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full font-mono text-[9px] font-bold ${
                    active
                      ? "bg-[#1769FF] text-white"
                      : "bg-white/10 text-[#8793A8]"
                  }`}
                >
                  {tab.count}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon className={active ? "text-[#49A3FF] text-xs" : "text-[#8793A8] text-xs"} />
                <span className={`font-sans font-extrabold text-sm sm:text-base uppercase tracking-tight ${active ? "text-white" : "text-[#8793A8]"}`}>
                  {tab.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ====================================================================
          SECTOR 01: INSTIGATORS
          ==================================================================== */}
      {activeCategory === "instigators" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {instigators.map((person) => (
            <div
              key={person.id}
              className="garcy-glass-card p-6 sm:p-8 rounded-2xl border border-white/15 bg-gradient-to-br from-[#101725] to-[#080B12] hover:border-[#1769FF]/60 transition-all flex flex-col justify-between"
            >
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border border-white/20 bg-[#101725] flex-shrink-0">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
                    {person.name}
                  </h3>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#1769FF]/20 border border-[#1769FF]/40 text-[#49A3FF] text-[9.5px] font-mono font-bold uppercase">
                    {person.role}
                  </span>
                  <p className="text-xs text-[#8793A8] leading-relaxed font-sans line-clamp-4">
                    {person.bio}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#8793A8]">
                <button
                  type="button"
                  onClick={() => setSelectedPerson(person)}
                  className="text-[#49A3FF] hover:text-white flex items-center gap-1.5 font-bold uppercase"
                >
                  <span>Full Biography</span>
                  <FaExternalLinkAlt className="text-[9px]" />
                </button>
                <span className="text-[9.5px] text-[#8793A8]">EST. 2004 FOUNDER</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ====================================================================
          SECTOR 02: HEAD ADVISORS
          ==================================================================== */}
      {activeCategory === "headadvisors" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {headAdvisors.map((person) => (
            <div
              key={person.id}
              className="garcy-glass-card p-6 sm:p-7 rounded-2xl border border-white/15 bg-gradient-to-br from-[#101725] to-[#080B12] hover:border-[#1769FF]/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full h-44 rounded-xl overflow-hidden border border-white/15 bg-[#101725] mb-4">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#10b981]/15 border border-[#10b981]/40 text-[#10b981] text-[9.5px] font-mono font-bold uppercase mb-2">
                  {person.role}
                </span>
                <h3 className="text-xl font-bold text-white font-sans mb-2">
                  {person.name}
                </h3>
                <p className="text-xs text-[#8793A8] leading-relaxed font-sans line-clamp-3">
                  {person.bio}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#8793A8]">
                <button
                  type="button"
                  onClick={() => setSelectedPerson(person)}
                  className="text-[#49A3FF] hover:text-white flex items-center gap-1.5 font-bold uppercase"
                >
                  <span>Inspect Profile</span>
                  <FaExternalLinkAlt className="text-[9px]" />
                </button>
                <span className="text-[9.5px] text-[#8793A8]">GRIET COUNCIL</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ====================================================================
          SECTOR 03: ADVISORS
          ==================================================================== */}
      {activeCategory === "advisors" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advisors.map((person) => (
            <div
              key={person.id}
              className="garcy-glass-card p-6 sm:p-7 rounded-2xl border border-white/15 bg-gradient-to-br from-[#101725] to-[#080B12] hover:border-[#1769FF]/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full h-44 rounded-xl overflow-hidden border border-white/15 bg-[#101725] mb-4">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#1769FF]/20 border border-[#1769FF]/40 text-[#49A3FF] text-[9.5px] font-mono font-bold uppercase mb-2">
                  {person.role}
                </span>
                <h3 className="text-lg font-bold text-white font-sans mb-2">
                  {person.name}
                </h3>
                <p className="text-xs text-[#8793A8] leading-relaxed font-sans line-clamp-3">
                  {person.bio}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#8793A8]">
                <button
                  type="button"
                  onClick={() => setSelectedPerson(person)}
                  className="text-[#49A3FF] hover:text-white flex items-center gap-1.5 font-bold uppercase"
                >
                  <span>Full Dossier</span>
                  <FaExternalLinkAlt className="text-[9px]" />
                </button>
                <span className="text-[9.5px] text-[#8793A8]">ADVISORY CELL</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ====================================================================
          SECTOR 04: CORE COMMITTEE (YEAR-WISE FILTERED)
          ==================================================================== */}
      {activeCategory === "committee" && (
        <div className="space-y-8">
          {/* Year Selector Toolbar */}
          <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white uppercase font-sans">
                Core Committee Cohort {selectedYear}
              </h3>
              <p className="font-sans text-xs text-[#8793A8] mt-1">
                Elected student leaders driving domain research, technical hackathons, and lab operations.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs text-[#8793A8] uppercase tracking-wider font-semibold mr-1">
                COHORT YEAR:
              </span>
              {availableYears.map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() => setSelectedYear(year)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                    selectedYear === year
                      ? "bg-[#1769FF] text-white shadow-[0_0_15px_rgba(23,105,255,0.5)] border border-[#49A3FF]"
                      : "bg-white/5 text-[#8793A8] border border-white/10 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* TIER 1: PRESIDENT & VICE PRESIDENT */}
          {presVp.length > 0 && (
            <div className="space-y-3">
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#49A3FF] font-bold block">
                EXECUTIVE LEADERSHIP
              </span>

              <div className="flex justify-center items-stretch gap-6 flex-wrap">
                {presVp.map((member) => (
                  <div
                    key={`${selectedYear}-${member.name}`}
                    className="garcy-glass-card w-[240px] sm:w-[250px] p-4 rounded-xl border border-white/15 bg-gradient-to-br from-[#101725] to-[#080B12] hover:border-[#1769FF]/80 transition-all flex flex-col justify-between group shadow-xl"
                  >
                    <div className="relative w-full h-[220px] rounded-lg overflow-hidden border border-white/15 bg-[#080B12] mb-3 flex-shrink-0">
                      <img
                        src={getCommitteeImageUrl(member.image)}
                        alt={member.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = "/images/AAC3.png";
                        }}
                      />
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute top-2.5 right-2.5 w-7 h-7 bg-[#0077b5] text-white rounded-lg flex items-center justify-center opacity-90 hover:opacity-100 shadow transition-opacity"
                          title="LinkedIn Profile"
                        >
                          <FaLinkedin size={13} />
                        </a>
                      )}
                    </div>

                    <div className="text-center pt-1">
                      <h4 className="font-bold text-sm text-white uppercase tracking-tight group-hover:text-[#49A3FF] transition-colors mb-1">
                        {member.name}
                      </h4>
                      <p className="font-mono text-[10.5px] font-bold text-[#49A3FF] uppercase tracking-wider">
                        {member.designation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TIER 2: HEADS OF WINGS */}
          {heads.length > 0 && (
            <div className="space-y-3 pt-4">
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#10b981] font-bold block">
                HEADS OF DOMAINS &amp; WINGS
              </span>

              <div className="flex justify-center items-stretch gap-5 sm:gap-6 flex-wrap">
                {heads.map((member) => (
                  <div
                    key={`${selectedYear}-${member.name}`}
                    className="garcy-glass-card w-[220px] sm:w-[230px] p-3.5 rounded-xl border border-white/15 bg-gradient-to-br from-[#101725] to-[#080B12] hover:border-[#1769FF]/80 transition-all flex flex-col justify-between group shadow-lg"
                  >
                    <div className="relative w-full h-[190px] rounded-lg overflow-hidden border border-white/15 bg-[#080B12] mb-3 flex-shrink-0">
                      <img
                        src={getCommitteeImageUrl(member.image)}
                        alt={member.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = "/images/AAC3.png";
                        }}
                      />
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute top-2 right-2 w-6 h-6 bg-[#0077b5] text-white rounded flex items-center justify-center opacity-85 hover:opacity-100 shadow transition-opacity"
                          title="LinkedIn Profile"
                        >
                          <FaLinkedin size={12} />
                        </a>
                      )}
                    </div>

                    <div className="text-center pt-1">
                      <h4 className="font-bold text-xs sm:text-sm text-white uppercase tracking-tight group-hover:text-[#49A3FF] transition-colors mb-1">
                        {member.name}
                      </h4>
                      <p className="font-mono text-[10px] font-bold text-[#10b981] uppercase tracking-wider">
                        {member.designation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TIER 3: ASSISTANT COORDINATORS & COMMITTEE MEMBERS */}
          {others.length > 0 && (
            <div className="space-y-3 pt-4">
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#8793A8] font-bold block">
                COORDINATORS &amp; CORE FELLOWS
              </span>

              <div className="flex justify-center items-stretch gap-4 sm:gap-5 flex-wrap">
                {others.map((member) => (
                  <div
                    key={`${selectedYear}-${member.name}`}
                    className="garcy-glass-card w-[190px] sm:w-[210px] p-3 rounded-xl border border-white/10 bg-gradient-to-br from-[#101725] to-[#080B12] hover:border-[#1769FF]/60 transition-all flex flex-col justify-between group shadow-md"
                  >
                    <div className="relative w-full h-[170px] rounded-lg overflow-hidden border border-white/10 bg-[#080B12] mb-2.5 flex-shrink-0">
                      <img
                        src={getCommitteeImageUrl(member.image)}
                        alt={member.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = "/images/AAC3.png";
                        }}
                      />
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute top-2 right-2 w-6 h-6 bg-[#0077b5] text-white rounded flex items-center justify-center opacity-85 hover:opacity-100 shadow transition-opacity"
                          title="LinkedIn Profile"
                        >
                          <FaLinkedin size={11} />
                        </a>
                      )}
                    </div>

                    <div className="text-center pt-1">
                      <h4 className="font-bold text-xs text-white uppercase tracking-tight group-hover:text-[#49A3FF] transition-colors mb-0.5">
                        {member.name}
                      </h4>
                      <p className="font-mono text-[9px] text-[#8793A8] uppercase tracking-wider">
                        {member.designation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Person Detail Modal */}
      {selectedPerson && (
        <div
          className="fixed inset-0 z-50 bg-[#080B12]/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelectedPerson(null)}
        >
          <div
            className="garcy-glass-card max-w-lg w-full p-6 sm:p-8 text-left relative border border-[#1769FF]/50 shadow-[0_0_50px_rgba(23,105,255,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/20 bg-[#101725] flex-shrink-0">
                <img
                  src={selectedPerson.image}
                  alt={selectedPerson.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#49A3FF] font-bold block mb-1">
                  {selectedPerson.role || selectedPerson.tier}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-sans">
                  {selectedPerson.name}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#8793A8] leading-relaxed mb-6 font-sans">
              {selectedPerson.bio}
            </p>

            {selectedPerson.expertise && (
              <div className="mb-6">
                <span className="font-mono text-[10px] uppercase text-[#49A3FF] font-bold block mb-2">
                  Specialization &amp; Expertise
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPerson.expertise.map((exp) => (
                    <span
                      key={exp}
                      className="px-2.5 py-1 rounded bg-[#1769FF]/15 border border-[#1769FF]/30 text-white font-mono text-[10px]"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              {selectedPerson.email && (
                <a
                  href={`mailto:${selectedPerson.email}`}
                  className="text-xs font-mono text-[#49A3FF] hover:text-white flex items-center gap-1.5 font-bold"
                >
                  <FaEnvelope />
                  <span>Contact Office</span>
                </a>
              )}
              <button
                type="button"
                onClick={() => setSelectedPerson(null)}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-[#8793A8] uppercase transition-colors"
              >
                Close Dossier
              </button>
            </div>

            <button
              type="button"
              onClick={() => setSelectedPerson(null)}
              className="absolute top-4 right-4 text-[#8793A8] hover:text-white text-base p-1"
              aria-label="Close"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
