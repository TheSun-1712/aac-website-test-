import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import AACVideoLoader from "./AACVideoLoader";

export default function GarcyBootLoader({ onComplete }) {
  const [dismissed, setDismissed] = useState(false);

  const handleEnter = () => {
    setDismissed(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 450);
  };

  // Keyboard shortcut: Pressing Enter or Space immediately enters
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        handleEnter();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  if (dismissed) return null;

  const buttonVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[100] bg-[#08090C] text-[#EAF1FF] flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden"
      >
        {/* ====================================================================
            TOP WATERMARK HEADER (Non-overlapping Flex Row)
            ==================================================================== */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 z-10 border-b border-white/5 pb-4">
          <div className="max-w-md space-y-1">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#E5A93C] font-bold block">
              GRIET HYDERABAD &bull; ADVANCED ACADEMIC CENTER
            </span>
            <p className="font-sans text-xs sm:text-sm text-[#9E988A] leading-snug">
              Where curiosity evolves into research, and innovation becomes reality.
            </p>
          </div>

          <div className="text-left sm:text-right flex-shrink-0">
            <span className="font-mono text-[10px] sm:text-xs text-[#9E988A] uppercase tracking-widest flex items-center gap-1.5 sm:justify-end font-semibold">
              <span className="text-[#E5A93C] font-bold text-sm">*</span>
              <span>Curiosity Begins Here &bull; EST. 2004</span>
            </span>
          </div>
        </div>

        {/* ====================================================================
            CENTER HERO: AUTHENTIC ANIMATED CLUB LOGO (loading.mp4)
            ==================================================================== */}
        <div className="my-auto z-20 flex flex-col items-center justify-center text-center px-4 w-full max-w-4xl mx-auto py-2 sm:py-4">
          
          {/* Ambient Hologram Glow Behind Logo */}
          <div className="relative w-full max-w-[560px] sm:max-w-[680px] flex flex-col items-center justify-center mb-6 select-none">
            <div className="absolute inset-0 bg-[#E5A93C]/15 blur-[100px] rounded-full pointer-events-none" />

            {/* Hardware-accelerated Video Animation (loading.mp4 keyed in real-time) */}
            <div className="relative z-10 w-full flex items-center justify-center">
              <AACVideoLoader />
            </div>

            {/* Official Stylized Subtitle: ADVANCED ACADEMIC CENTER */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="w-full px-2 relative z-10 h-7 sm:h-9 md:h-11 flex items-center justify-center mt-0.5"
            >
              <img
                src="/images/logo_subtitle.png"
                alt="ADVANCED ACADEMIC CENTER"
                className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(229,169,60,0.7)]"
              />
            </motion.div>
          </div>

          {/* HIGHLY VISIBLE ELECTRIC BLUE BUTTON */}
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center"
          >
            <button
              type="button"
              onClick={handleEnter}
              className="enter-direct group cursor-pointer"
            >
              <span>Enter Advanced Academic Center</span>
              <FaArrowRight className="text-xs group-hover:translate-x-1.5 transition-transform" />
            </button>

            <span className="text-[10px] font-mono text-[#9E988A]/70 uppercase tracking-widest mt-4 block">
              Press Enter or click to enter
            </span>
          </motion.div>
        </div>

        {/* ====================================================================
            BOTTOM METADATA RUNWAY (Clean, Non-overlapping Flex Row)
            ==================================================================== */}
        <div className="w-full border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 z-10 text-[10.5px] font-mono text-[#9E988A] uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="text-white/40">DIRECTORATE:</span>
            <span className="text-white font-semibold">GRIET / AUTONOMOUS</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
            <span className="text-white/40">R&amp;D STATUS:</span>
            <span className="text-[#E5A93C] font-semibold">ACTIVE RESEARCH LAB</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-white/40">LOCATION:</span>
            <span className="text-white font-semibold">ROOM 3614 BLOCK 3</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
