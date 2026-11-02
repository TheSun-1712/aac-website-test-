import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";

const NOTIFICATIONS = [
  {
    id: 1,
    avatar: "/images/AAC1.png",
    sender: "AICTE  •  NATIONAL EXCELLENCE",
    time: "NOW",
    message: "AAC wins the AICTE National Vishwakarma Award.",
    link: "/Achievements",
  },
  {
    id: 2,
    avatar: "/images/AAC2.png",
    sender: "ISRO  •  NRSC MoU SIGNED",
    time: "NOW",
    message: "AAC partners with ISRO NRSC for advanced satellite imaging R&D.",
    link: "/News",
  },
  {
    id: 3,
    avatar: "/images/AAC3.png",
    sender: "GPRIME 2026  •  LEADERBOARD LIVE",
    time: "NOW",
    message: "Gprime 2026 results are live! Check the national leaderboard.",
    link: "/gprime2026-results",
  },
  {
    id: 4,
    avatar: "/images/pic.webp",
    sender: "AAC AUTONOMOUS LAB  •  PROTOTYPE",
    time: "NOW",
    message: "Autonomous multi-rotor UAV prototype campus flight verified.",
    link: "/projects",
  },
];

export default function GarcyHeroFan({ onContinue }) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showArrow, setShowArrow] = useState(false);

  // Sequential arrival of notifications like iOS drops
  useEffect(() => {
    const timers = [
      setTimeout(() => setCurrentIndex(0), 300),
      setTimeout(() => setCurrentIndex(1), 1800),
      setTimeout(() => setCurrentIndex(2), 3300),
      setTimeout(() => setCurrentIndex(3), 4800),
      setTimeout(() => setShowArrow(true), 5600),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleCardClick = (e, link) => {
    e.stopPropagation();
    if (isExpanded && link) {
      router.push(link);
    } else {
      // Toggle expand / collapse
      setIsExpanded((prev) => !prev);
    }
  };

  const handleScrollDown = () => {
    if (onContinue) {
      onContinue();
    } else {
      router.push("/moment");
    }
  };

  const activeNotif = NOTIFICATIONS[currentIndex];

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden select-none bg-[#08090C] py-20 px-4"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#E5A93C]/5 blur-[160px]" />
      </div>

      {/* ====================================================================
          iOS NOTIFICATION STACK — centered, popping sequentially & expandable (sec_05 -> sec_06)
          ==================================================================== */}
      <div className="relative z-10 w-full max-w-[560px] mx-auto flex flex-col items-center justify-center">
        {!isExpanded ? (
          /* COLLAPSED STACK VIEW (Matching sec_04 and sec_05) */
          <div
            className="relative w-full cursor-pointer"
            onClick={(e) => handleCardClick(e, null)}
          >
            {/* Layer -2 */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-4 w-[90%] h-[84px] rounded-2xl pointer-events-none transition-all duration-500"
              style={{
                background: "rgba(12, 18, 32, 0.5)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                opacity: currentIndex >= 2 ? 0.7 : 0,
                transform: "translate(-50%, 18px) scale(0.92)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
              }}
            />

            {/* Layer -1 */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-2 w-[95%] h-[88px] rounded-2xl pointer-events-none transition-all duration-500"
              style={{
                background: "rgba(14, 21, 38, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                opacity: currentIndex >= 1 ? 0.85 : 0,
                transform: "translate(-50%, 9px) scale(0.96)",
                boxShadow: "0 12px 35px rgba(0,0,0,0.65)",
              }}
            />

            {/* Active Front Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNotif.id}
                initial={{ opacity: 0, y: -45, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.96 }}
                transition={{
                  type: "spring",
                  stiffness: 340,
                  damping: 26,
                  mass: 0.8,
                }}
                className="relative z-10 w-full flex items-center gap-4 p-4 sm:p-5 rounded-2xl border transition-all group"
                style={{
                  background: "rgba(16, 24, 42, 0.92)",
                  backdropFilter: "blur(32px)",
                  WebkitBackdropFilter: "blur(32px)",
                  borderColor: "rgba(255, 255, 255, 0.12)",
                  boxShadow:
                    "0 24px 60px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.12), 0 0 0 1px rgba(229, 169, 60,0.2)",
                }}
              >
                {/* Avatar Icon */}
                <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-[#0A0F1A] border border-white/15 shadow-inner">
                  <Image
                    src={activeNotif.avatar}
                    alt={activeNotif.sender}
                    width={64}
                    height={64}
                    priority
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-white/50 truncate font-semibold">
                      {activeNotif.sender}
                    </span>
                    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[#E5A93C] flex-shrink-0 font-bold px-1.5 py-0.5 rounded bg-[#E5A93C]/15 border border-[#E5A93C]/30">
                      {activeNotif.time}
                    </span>
                  </div>

                  <p className="text-[16px] sm:text-[18px] md:text-[20px] font-bold text-[#EAF1FF] leading-snug font-sans tracking-tight">
                    {activeNotif.message}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          /* EXPANDED NOTIFICATIONS LIST (Matching sec_06.png) */
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full flex flex-col gap-3"
          >
            {NOTIFICATIONS.map((notif) => (
              <div
                key={notif.id}
                onClick={(e) => handleCardClick(e, notif.link)}
                className="w-full flex items-center gap-4 p-4 sm:p-5 rounded-2xl border cursor-pointer hover:border-[#E5A93C]/50 transition-all group"
                style={{
                  background: "rgba(16, 24, 42, 0.92)",
                  backdropFilter: "blur(32px)",
                  WebkitBackdropFilter: "blur(32px)",
                  borderColor: "rgba(255, 255, 255, 0.12)",
                  boxShadow: "0 12px 35px rgba(0,0,0,0.7)",
                }}
              >
                <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-[#0A0F1A] border border-white/15">
                  <Image
                    src={notif.avatar}
                    alt={notif.sender}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-white/50 truncate font-semibold">
                      {notif.sender}
                    </span>
                    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[#E5A93C] flex-shrink-0 font-bold px-1.5 py-0.5 rounded bg-[#E5A93C]/15 border border-[#E5A93C]/30">
                      {notif.time}
                    </span>
                  </div>

                  <p className="text-[16px] sm:text-[18px] font-bold text-[#EAF1FF] leading-snug font-sans tracking-tight group-hover:text-[#E5A93C] transition-colors">
                    {notif.message}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Stack Counter Indicator / Collapse Hint */}
        <div
          className="mt-4 flex items-center gap-2 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          <span className="font-mono text-[9px] uppercase tracking-wider text-white/50">
            {isExpanded ? "Click to stack notifications" : "Click to view all notifications"}
          </span>
          <div className="flex items-center gap-1">
            {NOTIFICATIONS.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "w-4 bg-[#E5A93C]" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ====================================================================
          SCROLL ARROW PROMPT (Bottom Center)
          ==================================================================== */}
      <AnimatePresence>
        {showArrow && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            onClick={handleScrollDown}
            className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group"
          >
            <span className="font-mono text-[9.5px] uppercase tracking-widest text-white/40 group-hover:text-[#E5A93C] transition-colors">
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-9 h-9 rounded-full border border-white/15 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/60 group-hover:border-[#E5A93C] group-hover:text-[#E5A93C] transition-colors shadow-lg"
            >
              <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                <path
                  d="M5 1v8M1 5.5l4 3.5 4-3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
