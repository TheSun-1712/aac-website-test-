import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFlagCheckered, FaGamepad, FaCamera, FaStore, FaCalendarAlt, FaTrophy } from "react-icons/fa";

export default function OnTrackOffTrackSection() {
  const [activeTab, setActiveTab] = useState("on-track");

  const onTrackItems = [
    {
      title: "BRITISH GRAND PRIX // SILVERSTONE",
      category: "PODIUM VICTORY",
      date: "2024 / 2025",
      desc: "Emotional home race podium at Silverstone in front of 160,000 screaming fans.",
      tag: "P1 / P2 FINISH",
      imageColor: "from-amber-500/20 to-[#D2FF00]/10",
    },
    {
      title: "MIAMI GRAND PRIX // MAIDEN WIN",
      category: "HISTORIC VICTORY",
      date: "MAIDEN WIN",
      desc: "Dominant victory in Miami securing Lando's first Formula 1 Grand Prix win.",
      tag: "P1 CHAMPION",
      imageColor: "from-cyan-500/20 to-blue-600/10",
    },
    {
      title: "DUTCH GRAND PRIX // ZANDVOORT",
      category: "QUALIFYING POLE",
      date: "POLE POSITION",
      desc: "Commanding pole position with a lap time 0.356s faster than the competition.",
      tag: "POLE LAP",
      imageColor: "from-[#D2FF00]/20 to-emerald-600/10",
    },
  ];

  const offTrackItems = [
    {
      title: "QUADRANT // GAMING & CONTENT",
      category: "ESPORTS & CONTENT",
      date: "FOUNDER",
      desc: "Lando's esports & gaming lifestyle brand connecting gaming culture with motorsport.",
      tag: "FOUNDER & CEO",
      imageColor: "from-purple-600/20 to-pink-500/10",
    },
    {
      title: "LN4 BRAND & APPAREL",
      category: "LIFESTYLE",
      date: "OFFICIAL MERCH",
      desc: "Exclusive driver merch drops including limited edition caps, hoodies, and race helmets.",
      tag: "LN4 COLLECTION",
      imageColor: "from-[#D2FF00]/20 to-yellow-500/10",
    },
    {
      title: "PHOTOGRAPHY & FILM",
      category: "CREATIVE PASSION",
      date: "35MM FILM",
      desc: "Capturing behind-the-scenes moments from the F1 paddock on analog 35mm film.",
      tag: "CREATIVE ARCHIVE",
      imageColor: "from-slate-700/40 to-slate-900/40",
    },
  ];

  return (
    <section id="on-track" className="py-24 bg-[#0a0a0c] text-white relative overflow-hidden">
      
      {/* Background ambient accents */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#D2FF00]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Navigation Switcher (ON TRACK vs OFF TRACK) */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center p-1.5 bg-[#121217] border border-white/10 rounded-full backdrop-blur-xl mb-6">
            <button
              onClick={() => setActiveTab("on-track")}
              className={`flex items-center gap-3 px-8 py-3 rounded-full font-chakra font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 ${
                activeTab === "on-track"
                  ? "bg-[#D2FF00] text-black shadow-[0_0_20px_rgba(210,255,0,0.5)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <FaFlagCheckered />
              <span>ON TRACK</span>
            </button>

            <button
              onClick={() => setActiveTab("off-track")}
              aria-controls="off-track"
              className={`flex items-center gap-3 px-8 py-3 rounded-full font-chakra font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 ${
                activeTab === "off-track"
                  ? "bg-[#D2FF00] text-black shadow-[0_0_20px_rgba(210,255,0,0.5)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <FaGamepad />
              <span>OFF TRACK</span>
            </button>
          </div>

          <h2 className="font-syne font-extrabold text-4xl sm:text-6xl uppercase tracking-tighter">
            {activeTab === "on-track" ? (
              <>F1 RACING <span className="text-[#D2FF00]">HIGHLIGHTS</span></>
            ) : (
              <>LIFESTYLE & <span className="text-[#D2FF00]">BRANDS</span></>
            )}
          </h2>
        </div>

        {/* Content Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {(activeTab === "on-track" ? onTrackItems : offTrackItems).map((item, idx) => (
              <div
                key={idx}
                className="bg-[#121217] border border-white/10 rounded-3xl overflow-hidden group hover:border-[#D2FF00] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Header Canvas Card */}
                <div className={`h-48 bg-gradient-to-br ${item.imageColor} relative p-6 flex flex-col justify-between overflow-hidden border-b border-white/10`}>
                  <div className="absolute inset-0 bg-cyber-grid opacity-20" />
                  
                  <div className="flex justify-between items-center relative z-10">
                    <span className="font-chakra font-bold text-xs text-[#D2FF00] bg-black/60 px-3 py-1 rounded-full border border-white/10">
                      {item.category}
                    </span>
                    <span className="font-chakra text-xs text-gray-300">
                      {item.date}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <span className="inline-block px-3 py-1 bg-[#D2FF00] text-black font-chakra font-bold text-xs tracking-wider rounded-md">
                      {item.tag}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-syne font-bold text-xl text-white mb-3 group-hover:text-[#D2FF00] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 font-space text-sm leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>

                  <a
                    href="#merch"
                    className="inline-flex items-center gap-2 font-chakra font-bold text-xs text-[#D2FF00] tracking-widest uppercase hover:underline"
                  >
                    <span>EXPLORE DETAILS</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
