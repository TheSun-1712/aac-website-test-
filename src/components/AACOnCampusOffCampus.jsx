import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaGraduationCap, FaRocket, FaArrowRight } from "react-icons/fa";

export default function AACOnCampusOffCampus({ isDark }) {
  const [activeTab, setActiveTab] = useState("on-campus");

  const onCampusItems = [
    {
      title: "Gprime 2026 Hackathon & Contest",
      category: "Events & Competitions",
      link: "/gprime2026-results",
      date: "Results Live",
      desc: "Premier competitive programming and hackathon event by AAC GRIET. View scores, solutions, and leaderboards.",
      tag: "Flagship Event",
      imageColor: "from-[#172E7C]/60 to-[#0F1E4A]/80",
    },
    {
      title: "Opulence & Annual Expo Showcase",
      category: "Annual Expo",
      link: "/Events",
      date: "Exhibition",
      desc: "Exhibiting cutting-edge engineering prototypes, autonomous models, and research posters.",
      tag: "Annual Expo",
      imageColor: "from-[#172E7C]/50 to-[#12245C]/70",
    },
    {
      title: "Faculty Mentorship & Core Leadership",
      category: "Leadership",
      link: "/Administration",
      date: "Interdisciplinary",
      desc: "Expert guidance from institute faculty advisors, industry partners, and student committee heads.",
      tag: "AAC Leadership",
      imageColor: "from-[#1D3A94]/60 to-[#0F1E4A]/80",
    },
  ];

  const innovationItems = [
    {
      title: "Autonomous Aircraft & Drone Systems",
      category: "R&D Projects",
      link: "/projects",
      date: "Patent Pending",
      desc: "Custom multi-rotor & fixed-wing autonomous aerial vehicles built for surveillance and payload delivery.",
      tag: "Autonomous Lab",
      imageColor: "from-cyan-600/50 to-[#0F1E4A]/80",
    },
    {
      title: "Patents & Intellectual Property",
      category: "Inventions",
      link: "/Patents",
      date: "50+ Filed",
      desc: "Innovations in IoT, machine learning, embedded sensors, and advanced manufacturing.",
      tag: "IP Creation",
      imageColor: "from-amber-600/40 to-[#0F1E4A]/80",
    },
    {
      title: "Student Startups & Incubated Ventures",
      category: "Incubation",
      link: "/Startups",
      date: "Incubated",
      desc: "Fostering entrepreneurial ventures, technology spinoffs, and industry-sponsored consultancy.",
      tag: "Startup Hub",
      imageColor: "from-[#DC2626]/40 to-[#0F1E4A]/80",
    },
  ];

  return (
    <section id="on-campus" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Switcher */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.4 }}
            className={`inline-flex items-center p-1.5 border rounded-full backdrop-blur-xl mb-4 ${
              isDark ? "liquid-glass-dark" : "liquid-glass-blue"
            }`}
          >
            <button
              onClick={() => setActiveTab("on-campus")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-sans font-semibold text-xs sm:text-sm tracking-wide transition-all ${
                activeTab === "on-campus"
                  ? isDark
                    ? "bg-[#DC2626] text-white shadow-md"
                    : "bg-[#E5C158] text-black font-bold shadow-md"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <FaGraduationCap />
              <span>On Campus (Academics &amp; Events)</span>
            </button>

            <button
              onClick={() => setActiveTab("innovation")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-sans font-semibold text-xs sm:text-sm tracking-wide transition-all ${
                activeTab === "innovation"
                  ? isDark
                    ? "bg-[#DC2626] text-white shadow-md"
                    : "bg-[#E5C158] text-black font-bold shadow-md"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <FaRocket />
              <span>Innovation (Projects &amp; Patents)</span>
            </button>
          </motion.div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl tracking-tight text-white">
            {activeTab === "on-campus" ? (
              <>AAC <span className={isDark ? "text-red-gradient" : "text-gold-gradient"}>Events &amp; Academics</span></>
            ) : (
              <>AAC <span className={isDark ? "text-red-gradient" : "text-gold-gradient"}>Projects &amp; Patents</span></>
            )}
          </h2>
        </div>

        {/* Flash Cards Grid - Slide in horizontally on vertical scroll */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {(activeTab === "on-campus" ? onCampusItems : innovationItems).map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 140 + idx * 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ amount: 0.2 }}
                whileHover={{ scale: 1.03, y: -8 }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: idx * 0.15 }}
                className={`border rounded-3xl overflow-hidden group transition-all flex flex-col justify-between shadow-2xl ${
                  isDark
                    ? "liquid-glass-dark hover:border-[#DC2626] hover:shadow-[0_0_25px_rgba(220,38,38,0.3)]"
                    : "liquid-glass-blue hover:border-[#E5C158] hover:shadow-[0_0_25px_rgba(229,193,88,0.3)]"
                }`}
              >
                {/* Header Card */}
                <div className={`h-36 bg-gradient-to-br ${item.imageColor} relative p-5 flex flex-col justify-between overflow-hidden border-b border-white/10`}>
                  <div className="flex justify-between items-center relative z-10">
                    <span className="font-sans font-semibold text-xs px-3 py-1 rounded-full border border-white/20 bg-black/60 text-[#F0D375]">
                      {item.category}
                    </span>
                    <span className="font-sans text-xs text-gray-200 font-medium">
                      {item.date}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <span className={`inline-block px-3 py-1 font-sans font-bold text-xs rounded-md ${
                      isDark ? "bg-[#DC2626] text-white" : "bg-[#E5C158] text-black"
                    }`}>
                      {item.tag}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className={`font-heading font-bold text-lg mb-2 text-white transition-colors ${
                      isDark ? "group-hover:text-[#DC2626]" : "group-hover:text-[#F0D375]"
                    }`}>
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-gray-200 leading-relaxed mb-5">
                      {item.desc}
                    </p>
                  </div>

                  <Link
                    href={item.link}
                    className={`inline-flex items-center gap-1.5 font-sans font-bold text-xs tracking-wide uppercase hover:underline ${
                      isDark ? "text-[#DC2626]" : "text-[#F0D375]"
                    }`}
                  >
                    <span>Explore Page</span>
                    <FaArrowRight size={10} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
