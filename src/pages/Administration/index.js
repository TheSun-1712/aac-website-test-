import { useState, useMemo } from "react";
import Head from "next/head";
import Image from "next/image";
import BackgroundVideo from "@/components/BackgroundVideo";
import GarcyNavbar from "@/components/garcy/GarcyNavbar";
import GarcyFooter from "@/components/garcy/GarcyFooter";
import GarcyCommandPalette from "@/components/garcy/GarcyCommandPalette";
import GarcyCaseStudies from "@/components/garcy/GarcyCaseStudies";
import { useDatabase } from "@/hooks/useDatabase";
import {
  coreCommitteeData,
  getAvailableYears,
} from "@/components/Data/coreCommitteeData";
import {
  FaUserTie,
  FaGraduationCap,
  FaLinkedin,
  FaEnvelope,
  FaAward,
  FaUsers,
  FaLightbulb,
  FaTimes,
  FaExternalLinkAlt,
} from "react-icons/fa";

export default function AdministrationPage() {
  const { data: dbCommittee } = useDatabase("corecommittee");
  const [activeCategory, setActiveCategory] = useState("instigators");

  const availableYears = useMemo(() => {
    const staticYears = getAvailableYears();
    const dbYears = (dbCommittee || []).map((m) => String(m.year)).filter(Boolean);
    const set = new Set([...dbYears, ...staticYears]);
    return Array.from(set).sort((a, b) => b.localeCompare(a));
  }, [dbCommittee]);

  const [selectedYear, setSelectedYear] = useState(availableYears[0] || "2025");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);

  // 01 // Instigators
  const instigatorData = [
    {
      id: "pandit",
      name: "Dr. S.N.N. Pandit",
      occupation: "FOUNDING MENTOR & INITIATOR",
      about:
        "Dr. S.N.N. Pandit was the founder head of the statistics department in Dibrugarh University, Assam. Dr. Pandit gave the idea of 'Advanced Academic Center' in 2004 as a forum to generate creative ideas involving faculty and students at the time of his visit to GRIET in 2003-04 when he had motivated faculty towards research. Dr. Pandit has also supervised 35 Ph.D scholars in a variety of domains. He was the founder director of Center Of Quantitative Methods at Osmania University.",
      image:
        "https://res.cloudinary.com/aacgriet/image/upload/v1664100148/AAC-web/mentors/pandith_s8bqhh.jpg",
      tier: "FOUNDING MENTOR",
      expertise: ["Quantitative Methods", "Statistical Modeling", "Academic Architecture", "Ph.D. Supervision"],
      email: "aacgriet.org@gmail.com",
    },
    {
      id: "iyengar",
      name: "Dr. Satteluri R.K. Iyengar",
      occupation: "FOUNDING PILLAR & ACADEMIC DEAN",
      about:
        "Dr. S.R.K. Iyengar was professor at IIT Delhi in the department of Mathematics for over 38 years. Dr. Iyengar worked as a post-doctoral fellow at the Oxford University Computing Laboratory, U.K. He is the author of over half a dozen textbooks, which have won industrial acclaim. Dr. Iyengar served GRIET between 2004 to 2012 with distinction. He brought in good academic culture in the institute and was the first Dean of Academic Affairs at GRIET. Dr. Iyengar is one of the foundational pillars of the Advanced Academic Center.",
      image:
        "https://res.cloudinary.com/aacgriet/image/upload/v1664100147/AAC-web/mentors/iyengar_dmrolm.jpg",
      tier: "FOUNDING PILLAR",
      expertise: ["Computational Mathematics", "Numerical Analysis", "Oxford Research", "Curriculum Standards"],
      email: "aacgriet.org@gmail.com",
    },
  ];

  // 02 // Head Advisors
  const headAdvisorData = [
    {
      id: "murthy",
      name: "Dr. Jandhyala N Murthy",
      occupation: "DIRECTOR, GRIET",
      about:
        "Dr. Jandhyala N Murthy after voluntarily taking retirement from the IAF as a Wing Commander in 2001, joined as a professor in the Department of Mechanical Engineering at GRIET. Later on taking up the position as the Director of GRIET since 31 January 2018, after a successful tenure as the Principal of GRIET since March 2004. His areas of interest span the Thermal Engineering domain, Gas Turbine Combustion Chambers, simulation, and education.",
      image:
        "https://res.cloudinary.com/aacgriet/image/upload/v1752569355/AAC-web/mentors/jandhyala.png",
      tier: "DIRECTORATE",
      expertise: ["Aerospace Engineering", "Thermal Simulation", "Institutional Policy", "Gas Turbine Combustion"],
      email: "director@griet.ac.in",
    },
    {
      id: "praveen",
      name: "Dr. J Praveen",
      occupation: "PRINCIPAL, GRIET",
      about:
        "Dr. J Praveen has contributed to major research areas in Power Electronics and has published more than 80 research papers in reputed International and National Journals and Conferences. He is Registered as a PhD Guide at Department of Electrical and Electronics Engineering, J.N.T University. Along with other achievements, he received International Certification on 'High Impact Teaching Skills' by Dale Carnegie & Associates Inc. Trainers (USA), Mission 10x, Wipro Technologies.",
      image:
        "https://res.cloudinary.com/aacgriet/image/upload/v1664100147/AAC-web/mentors/jpraveen_mzj4fp.jpg",
      tier: "PRINCIPAL",
      expertise: ["Power Electronics", "Renewable Energy", "JNTU PhD Guide", "Institutional Leadership"],
      email: "principal@griet.ac.in",
    },
    {
      id: "kiran",
      name: "Dr. Mamidi Kiran Kumar",
      occupation: "DEAN, AAC",
      about:
        "Dr. Mamidi Kiran Kumar, an Associate Professor in the Department of Artificial Intelligence and Machine Learning Engineering at Gokaraju Rangaraju Institute of Engineering and Technology (GRIET) in Hyderabad, is a Rajeev Gandhi National Fellowship awardee. Specializing in Area-based Localization Techniques for Wireless Sensor Networks with over a decade of academic and research experience.",
      image:
        "https://res.cloudinary.com/dltvvelmx/image/upload/v1694781872/kiran1610_hhgs1v.jpg",
      tier: "DEAN AAC",
      expertise: ["AI & ML Engineering", "Wireless Sensor Networks", "Localization", "Research Incubation"],
      email: "aacgriet.org@gmail.com",
    },
  ];

  // 03 // Advisors
  const advisorData = [
    {
      id: "arvind",
      name: "Dr. Arvind Vishnubhatla",
      occupation: "PROFESSOR, ECE GRIET",
      about:
        "Dr. Arvind Vishnubhatla is currently working as Professor at GRIET. His areas of research and interests include Signal Processing, Embedded Systems, and System Design. He worked on GSM switch Microlite Development of a Distributed digital control system for the automation of Steel plants.",
      image:
        "https://res.cloudinary.com/aacgriet/image/upload/v1664100146/AAC-web/mentors/aravind_gnf36b.jpg",
      tier: "FACULTY ADVISOR",
      expertise: ["Signal Processing", "Embedded Systems", "System Automation", "Hardware Architectures"],
      email: "arvind@griet.ac.in",
    },
    {
      id: "madhav",
      name: "Dr. G.V.K. Madhav",
      occupation: "SYSTEMS ENGINEER, HPE HPC R&D",
      about:
        "Dr. G.V.K. Madhav works for HPE (Hewlett-Packard Enterprise) in the HPC (High Performance Computing) RnD division. For his Master's thesis he worked using GPUs for improving the performance of LiFE (Linear Fascicle Evaluation) software published at 'OHBM 2018 Conference'.",
      image:
        "https://res.cloudinary.com/aacgriet/image/upload/v1664100147/AAC-web/mentors/madhav1_fuuehs.jpg",
      tier: "INDUSTRY ADVISOR",
      expertise: ["High Performance Computing", "GPU Acceleration", "HPE Systems", "Parallel Processing"],
      email: "aacgriet.org@gmail.com",
    },
    {
      id: "satish",
      name: "Mr. Satish Yellanki",
      occupation: "CORPORATE SPECIALIST & TRAINER",
      about:
        "Mr. Satish is a corporate specialist with an experience of about 22 years in the industry. He has provided solutions to diversified domains in healthcare, insurance, education, and hospitality with specialization in system analysis and solution-based architecture.",
      image:
        "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_400/v1664100153/AAC-web/mentors/sss_sv2h2p.jpg",
      tier: "CORPORATE SPECIALIST",
      expertise: ["System Analysis", "Solution Architecture", "Enterprise Scaling", "Corporate Training"],
      email: "aacgriet.org@gmail.com",
    },
    {
      id: "pradeep",
      name: "Mr. Pradeep Palelli",
      occupation: "CO-FOUNDER & CEO, THANOS TECH",
      about:
        "Mr. Pradeep brings professional leadership in autonomous aerial technologies and start-ups. Pradeep is responsible for business and operations at Thanos Technologies. He previously handled Operations, Service, and Sales across various technology ventures.",
      image:
        "https://res.cloudinary.com/aacgriet/image/upload/v1664100150/AAC-web/mentors/pradeepp_j0e7p3.jpg",
      tier: "STARTUP MENTOR",
      expertise: ["Autonomous Aerial Vehicles", "Hardware Startup Ops", "UAV Systems", "Venture Building"],
      email: "aacgriet.org@gmail.com",
    },
    {
      id: "naresh",
      name: "Dr. Naresh Kumar Mallenahalli",
      occupation: "SCIENTIST, NRSC (ISRO)",
      about:
        "Dr. Naresh works in the software group of satellite data processing at National Remote Sensing Centre (ISRO), Hyderabad. His research interests include mathematical modeling, simulations, computational intelligence, and statistical machine learning.",
      image:
        "https://res.cloudinary.com/aacgriet/image/upload/v1664100152/AAC-web/mentors/naresh_x933qn.png",
      tier: "ISRO SCIENTIST",
      expertise: ["Satellite Data Processing", "Remote Sensing Analytics", "Mathematical Modeling", "Machine Learning"],
      email: "aacgriet.org@gmail.com",
    },
    {
      id: "seshadri",
      name: "Shri Kidambi Seshadri",
      occupation: "SCIENTIST, NRSC ISRO/DOS",
      about:
        "Shri Kidambi Seshadri was the recipient of the 'ISRO award' for 2007 under the RGNDWM project. He worked as project manager in preparation of state-of-art groundwater prospects maps using Remote Sensing (RS) and GIS techniques, and headed Mineral Exploration Geo-environmental Studies.",
      image:
        "https://res.cloudinary.com/aacgriet/image/upload/v1664100151/AAC-web/mentors/seshadri_kdwupb.jpg",
      tier: "ISRO SCIENTIST",
      expertise: ["GIS & Geospatial Analysis", "Remote Sensing Maps", "Geo-Environmental R&D", "ISRO Research"],
      email: "aacgriet.org@gmail.com",
    },
  ];

  // Helper for committee images
  const getCommitteeImageUrl = (image) => {
    if (!image) return "/images/placeholder-avatar.png";
    if (image.startsWith("http")) return image;
    return `https://drive.google.com/uc?export=view&id=${image}`;
  };

  // Group current committee members strictly by tier, merging DB entries with fallback
  const currentMembers = useMemo(() => {
    const staticMembers = coreCommitteeData[selectedYear] || [];
    const dynamicMembers = (dbCommittee || []).filter(
      (m) => String(m.year) === String(selectedYear)
    );
    if (dynamicMembers.length > 0) {
      const names = new Set(dynamicMembers.map((m) => (m.name || "").toLowerCase()));
      return [
        ...dynamicMembers,
        ...staticMembers.filter((m) => !names.has((m.name || "").toLowerCase())),
      ];
    }
    return staticMembers;
  }, [selectedYear, dbCommittee]);
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
    {
      key: "instigators",
      code: "01",
      label: "Instigators",
      icon: FaLightbulb,
      count: instigatorData.length,
    },
    {
      key: "headadvisors",
      code: "02",
      label: "Head Advisors",
      icon: FaGraduationCap,
      count: headAdvisorData.length,
    },
    {
      key: "advisors",
      code: "03",
      label: "Advisors",
      icon: FaUserTie,
      count: advisorData.length,
    },
    {
      key: "committee",
      code: "04",
      label: "Core Committee",
      icon: FaUsers,
      count: currentMembers.length,
    },
  ];

  return (
    <>
      <Head>
        <title>ADMINISTRATION // LEADERSHIP &amp; MENTORS // AAC GRIET</title>
        <meta
          name="description"
          content="Meet the visionary founders, distinguished faculty advisors, ISRO scientists, and elected student core committee driving AAC GRIET."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <BackgroundVideo />

      {/* Ambient Dither & Dynamic Spotlight */}
      <div className="reel-dither" aria-hidden="true" />
      <div className="spotlight" aria-hidden="true" />

      {/* Main Stage Canvas */}
      <main className="stage relative overflow-hidden bg-[#08090C]/92 text-[#EAF1FF] min-h-screen pb-24">
        
        {/* Floating Header */}
        <GarcyNavbar
          onOpenSearch={() => setSearchOpen(true)}
          onOpenCaseStudies={() => setCaseStudiesOpen(true)}
        />

        {/* Hero Banner Section */}
        <section className="pt-32 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[10.5px] font-semibold tracking-wide uppercase mb-4 border backdrop-blur-md bg-[#E5A93C]/15 border-[#E5A93C]/40 text-[#E5A93C]">
              <FaGraduationCap className="text-[10px]" />
              <span>Leadership Architecture &bull; Mentorship Matrix</span>
            </div>

            <h1 className="font-extrabold text-4xl sm:text-6xl tracking-tighter leading-tight mb-4 text-[#EAF1FF] uppercase font-sans">
              Administration &amp; <br />
              <span className="italic font-serif font-normal text-[#E5A93C] lowercase tracking-normal text-3xl sm:text-5xl">
                mentorship
              </span>{" "}
              Council.
            </h1>

            <p className="text-sm sm:text-base text-[#9E988A] leading-relaxed font-sans font-normal">
              Meet the visionary instigators, distinguished academic heads, ISRO scientists, and student core committee who steer the research endeavors of AAC GRIET.
            </p>
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
                      ? "!bg-[#E5A93C]/20 !border-[#E5A93C] shadow-[0_0_20px_rgba(229, 169, 60,0.35)]"
                      : "border-white/10 hover:border-white/20 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5 font-mono text-[10px]">
                    <span className={active ? "text-[#E5A93C] font-bold" : "text-[#9E988A]"}>
                      {tab.code} // SECTOR
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full font-mono text-[9px] font-bold ${
                        active
                          ? "bg-[#E5A93C] text-white"
                          : "bg-white/10 text-[#9E988A]"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon className={active ? "text-[#E5A93C] text-xs" : "text-[#9E988A] text-xs"} />
                    <span className={`font-sans font-extrabold text-sm sm:text-base uppercase tracking-tight ${active ? "text-white" : "text-[#9E988A]"}`}>
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
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-3 mb-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase font-sans">
                  The Instigators
                </h2>
                <p className="font-sans text-xs sm:text-sm text-[#9E988A] max-w-3xl mt-1">
                  The visionary minds who conceived and established the Advanced Academic Center in 2004, laying the foundation for academic excellence and student research innovation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {instigatorData.map((person) => (
                  <div
                    key={person.id}
                    className="garcy-glass-card p-6 sm:p-8 rounded-2xl border border-white/15 bg-gradient-to-br from-[#111318] to-[#08090C] hover:border-[#E5A93C]/60 transition-all flex flex-col justify-between"
                  >
                    <div className="flex flex-col sm:flex-row gap-5 items-start">
                      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border border-white/20 bg-[#111318] flex-shrink-0">
                        <img
                          src={person.image}
                          alt={person.name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
                            {person.name}
                          </h3>
                        </div>
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#E5A93C]/20 border border-[#E5A93C]/40 text-[#E5A93C] text-[9.5px] font-mono font-bold uppercase">
                          {person.occupation}
                        </span>
                        <p className="text-xs text-[#9E988A] leading-relaxed font-sans line-clamp-4">
                          {person.about}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#9E988A]">
                      <button
                        type="button"
                        onClick={() => setSelectedPerson(person)}
                        className="text-[#E5A93C] hover:text-white flex items-center gap-1.5 font-bold uppercase"
                      >
                        <span>Full Biography</span>
                        <FaExternalLinkAlt className="text-[9px]" />
                      </button>
                      <span className="text-[9.5px] text-[#9E988A]">EST. 2004 FOUNDER</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ====================================================================
              SECTOR 02: HEAD ADVISORS
              ==================================================================== */}
          {activeCategory === "headadvisors" && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-3 mb-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase font-sans">
                  Head Advisors &amp; Directorate
                </h2>
                <p className="font-sans text-xs sm:text-sm text-[#9E988A] max-w-3xl mt-1">
                  The guiding forces who steer the institutional vision of GRIET, providing high-level administrative governance, research grants, and student mentorship.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {headAdvisorData.map((person) => (
                  <div
                    key={person.id}
                    className="garcy-glass-card p-6 sm:p-7 rounded-2xl border border-white/15 bg-gradient-to-br from-[#111318] to-[#08090C] hover:border-[#E5A93C]/60 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative w-full h-44 rounded-xl overflow-hidden border border-white/15 bg-[#111318] mb-4">
                        <img
                          src={person.image}
                          alt={person.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#10b981]/15 border border-[#10b981]/40 text-[#10b981] text-[9.5px] font-mono font-bold uppercase mb-2">
                        {person.occupation}
                      </span>
                      <h3 className="text-xl font-bold text-white font-sans mb-2">
                        {person.name}
                      </h3>
                      <p className="text-xs text-[#9E988A] leading-relaxed font-sans line-clamp-3">
                        {person.about}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#9E988A]">
                      <button
                        type="button"
                        onClick={() => setSelectedPerson(person)}
                        className="text-[#E5A93C] hover:text-white flex items-center gap-1.5 font-bold uppercase"
                      >
                        <span>Inspect Profile</span>
                        <FaExternalLinkAlt className="text-[9px]" />
                      </button>
                      <span className="text-[9.5px] text-[#9E988A]">GRIET COUNCIL</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ====================================================================
              SECTOR 03: ADVISORS
              ==================================================================== */}
          {activeCategory === "advisors" && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-3 mb-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase font-sans">
                  Advisory Council &bull; Industry &amp; ISRO Scientists
                </h2>
                <p className="font-sans text-xs sm:text-sm text-[#9E988A] max-w-3xl mt-1">
                  Distinguished senior scientists from ISRO NRSC, high-performance computing engineers at HPE, technology startup CEOs, and tenured GRIET professors.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {advisorData.map((person) => (
                  <div
                    key={person.id}
                    className="garcy-glass-card p-6 sm:p-7 rounded-2xl border border-white/15 bg-gradient-to-br from-[#111318] to-[#08090C] hover:border-[#E5A93C]/60 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative w-full h-44 rounded-xl overflow-hidden border border-white/15 bg-[#111318] mb-4">
                        <img
                          src={person.image}
                          alt={person.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#E5A93C]/20 border border-[#E5A93C]/40 text-[#E5A93C] text-[9.5px] font-mono font-bold uppercase mb-2">
                        {person.occupation}
                      </span>
                      <h3 className="text-lg font-bold text-white font-sans mb-2">
                        {person.name}
                      </h3>
                      <p className="text-xs text-[#9E988A] leading-relaxed font-sans line-clamp-3">
                        {person.about}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#9E988A]">
                      <button
                        type="button"
                        onClick={() => setSelectedPerson(person)}
                        className="text-[#E5A93C] hover:text-white flex items-center gap-1.5 font-bold uppercase"
                      >
                        <span>Full Dossier</span>
                        <FaExternalLinkAlt className="text-[9px]" />
                      </button>
                      <span className="text-[9.5px] text-[#9E988A]">ADVISORY CELL</span>
                    </div>
                  </div>
                ))}
              </div>
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
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase font-sans">
                    Elected Core Committee
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-[#9E988A] max-w-2xl mt-1">
                    The student leaders driving peer-to-peer technical development, project mentoring, hackathons, and lab operations.
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs text-[#9E988A] uppercase tracking-wider font-semibold mr-1">
                    ACADEMIC COHORT:
                  </span>
                  {availableYears.map((year) => (
                    <button
                      key={year}
                      type="button"
                      onClick={() => setSelectedYear(year)}
                      className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                        selectedYear === year
                          ? "bg-[#E5A93C] text-white shadow-[0_0_15px_rgba(229, 169, 60,0.5)] border border-[#E5A93C]"
                          : "bg-white/5 text-[#9E988A] border border-white/10 hover:border-white/20 hover:text-white"
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
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E5A93C]" />
                    <h3 className="font-mono text-xs uppercase tracking-widest text-[#E5A93C] font-bold">
                      EXECUTIVE PRESIDENCY // COHORT {selectedYear}
                    </h3>
                  </div>

                  <div className="flex justify-center items-stretch gap-6 flex-wrap">
                    {presVp.map((member) => (
                      <div
                        key={`${selectedYear}-${member.name}`}
                        className="garcy-glass-card w-[240px] sm:w-[260px] p-4 rounded-xl border border-white/15 bg-gradient-to-br from-[#111318] to-[#08090C] hover:border-[#E5A93C]/80 transition-all flex flex-col justify-between group shadow-xl"
                      >
                        <div className="relative w-full h-[230px] rounded-lg overflow-hidden border border-white/15 bg-[#08090C] mb-3 flex-shrink-0">
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
                          <h4 className="font-bold text-sm text-white uppercase tracking-tight group-hover:text-[#E5A93C] transition-colors mb-1">
                            {member.name}
                          </h4>
                          <p className="font-mono text-[10.5px] font-bold text-[#E5A93C] uppercase tracking-wider">
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
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                    <h3 className="font-mono text-xs uppercase tracking-widest text-[#10b981] font-bold">
                      HEADS OF DOMAINS &amp; WINGS // COHORT {selectedYear}
                    </h3>
                  </div>

                  <div className="flex justify-center items-stretch gap-5 sm:gap-6 flex-wrap">
                    {heads.map((member) => (
                      <div
                        key={`${selectedYear}-${member.name}`}
                        className="garcy-glass-card w-[220px] sm:w-[240px] p-3.5 rounded-xl border border-white/15 bg-gradient-to-br from-[#111318] to-[#08090C] hover:border-[#E5A93C]/80 transition-all flex flex-col justify-between group shadow-lg"
                      >
                        <div className="relative w-full h-[200px] rounded-lg overflow-hidden border border-white/15 bg-[#08090C] mb-3 flex-shrink-0">
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
                          <h4 className="font-bold text-xs sm:text-sm text-white uppercase tracking-tight group-hover:text-[#E5A93C] transition-colors mb-1">
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
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#9E988A]" />
                    <h3 className="font-mono text-xs uppercase tracking-widest text-[#9E988A] font-bold">
                      COORDINATORS &amp; CORE FELLOWS // COHORT {selectedYear}
                    </h3>
                  </div>

                  <div className="flex justify-center items-stretch gap-4 sm:gap-5 flex-wrap">
                    {others.map((member) => (
                      <div
                        key={`${selectedYear}-${member.name}`}
                        className="garcy-glass-card w-[200px] sm:w-[220px] p-3 rounded-xl border border-white/10 bg-gradient-to-br from-[#111318] to-[#08090C] hover:border-[#E5A93C]/60 transition-all flex flex-col justify-between group shadow-md"
                      >
                        <div className="relative w-full h-[180px] rounded-lg overflow-hidden border border-white/10 bg-[#08090C] mb-2.5 flex-shrink-0">
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
                          <h4 className="font-bold text-xs text-white uppercase tracking-tight group-hover:text-[#E5A93C] transition-colors mb-0.5">
                            {member.name}
                          </h4>
                          <p className="font-mono text-[9px] text-[#9E988A] uppercase tracking-wider">
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
        </section>

        {/* Person Dossier Modal */}
        {selectedPerson && (
          <div
            className="fixed inset-0 z-50 bg-[#08090C]/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedPerson(null)}
          >
            <div
              className="garcy-glass-card max-w-lg w-full p-6 sm:p-8 text-left relative border border-[#E5A93C]/50 shadow-[0_0_50px_rgba(229, 169, 60,0.35)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/20 bg-[#111318] flex-shrink-0">
                  <img
                    src={selectedPerson.image}
                    alt={selectedPerson.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#E5A93C] font-bold block mb-1">
                    {selectedPerson.occupation || selectedPerson.tier}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white font-sans">
                    {selectedPerson.name}
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#9E988A] leading-relaxed mb-6 font-sans">
                {selectedPerson.about}
              </p>

              {selectedPerson.expertise && (
                <div className="mb-6">
                  <span className="font-mono text-[10px] uppercase text-[#E5A93C] font-bold block mb-2">
                    Research &amp; Domain Expertise
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPerson.expertise.map((exp) => (
                      <span
                        key={exp}
                        className="px-2.5 py-1 rounded bg-[#E5A93C]/15 border border-[#E5A93C]/30 text-white font-mono text-[10px]"
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
                    className="text-xs font-mono text-[#E5A93C] hover:text-white flex items-center gap-1.5 font-bold"
                  >
                    <FaEnvelope />
                    <span>Contact Office</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedPerson(null)}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-[#9E988A] uppercase transition-colors"
                >
                  Close Dossier
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPerson(null)}
                className="absolute top-4 right-4 text-[#9E988A] hover:text-white text-base p-1"
                aria-label="Close"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        )}

        <GarcyFooter />

        <GarcyCommandPalette
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
        />

        <GarcyCaseStudies
          isOpen={caseStudiesOpen}
          onClose={() => setCaseStudiesOpen(false)}
        />
      </main>
    </>
  );
}
