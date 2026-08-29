import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function HorizontalScrollLayout({
  children,
  isDark,
  activeTab,
  setActiveTab,
}) {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Soft spring for silky motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.3,
  });

  const sectionIds = [
    "hero",
    "explore",
    "telemetry",
    "3d-lab",
    "on-campus",
    "footer",
  ];

  // Keyframe mapping: Each panel holds steady for reading before gliding to the next!
  const x = useTransform(
    smoothProgress,
    [0, 0.15, 0.35, 0.55, 0.75, 0.95, 1],
    ["0vw", "0vw", "-100vw", "-200vw", "-300vw", "-400vw", "-500vw"]
  );

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      let idx = 0;
      if (latest < 0.25) idx = 0;
      else if (latest < 0.45) idx = 1;
      else if (latest < 0.65) idx = 2;
      else if (latest < 0.85) idx = 3;
      else if (latest < 0.95) idx = 4;
      else idx = 5;

      if (idx !== currentSectionIndex) {
        setCurrentSectionIndex(idx);
        if (setActiveTab && sectionIds[idx]) {
          setActiveTab(sectionIds[idx]);
        }
      }
    });
    return () => unsubscribe();
  }, [smoothProgress, currentSectionIndex, setActiveTab]);

  const scrollToPanel = (index) => {
    if (!targetRef.current) return;
    const scrollPoints = [0, 0.25, 0.45, 0.65, 0.85, 1.0];
    const targetY =
      targetRef.current.offsetTop +
      (scrollPoints[index] || 0) *
        (targetRef.current.offsetHeight - window.innerHeight);
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <div ref={targetRef} className="relative h-[650vh] w-full bg-transparent">
      {/* Sticky Screen Horizon Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        
        {/* Top Progress & Panel Title Indicator */}
        <div className="fixed top-20 left-0 right-0 z-40 px-6 sm:px-12 pointer-events-none">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className={`h-1.5 flex-1 rounded-full overflow-hidden backdrop-blur-md ${
              isDark ? "bg-white/10" : "bg-black/20"
            }`}>
              <motion.div
                className={`h-full rounded-full ${
                  isDark ? "bg-[#DC2626]" : "bg-[#E5C158]"
                }`}
                style={{ scaleX: smoothProgress, transformOrigin: "0%" }}
              />
            </div>
            <span className={`text-xs font-sans font-bold px-3.5 py-1 rounded-full backdrop-blur-md border shadow-lg ${
              isDark ? "bg-black/70 border-white/20 text-[#DC2626]" : "bg-black/70 border-white/20 text-[#F0D375]"
            }`}>
              FLASH DECK 0{currentSectionIndex + 1} / 0{sectionIds.length}
            </span>
          </div>
        </div>

        {/* Floating Left / Right Section Controls */}
        <div className="fixed bottom-8 right-8 z-40 flex items-center gap-3">
          <button
            onClick={() => scrollToPanel(Math.max(0, currentSectionIndex - 1))}
            disabled={currentSectionIndex === 0}
            className={`p-3.5 rounded-full border backdrop-blur-xl transition-all shadow-2xl ${
              currentSectionIndex === 0
                ? "opacity-30 cursor-not-allowed border-white/10 bg-black/40 text-gray-400"
                : isDark
                ? "bg-[#121217]/90 border-[#DC2626]/40 text-[#DC2626] hover:bg-[#DC2626] hover:text-white"
                : "bg-[#0F1E4A]/90 border-[#E5C158]/40 text-[#F0D375] hover:bg-[#E5C158] hover:text-black"
            }`}
            title="Previous Flash Panel"
          >
            <FaChevronLeft size={16} />
          </button>

          <button
            onClick={() => scrollToPanel(Math.min(sectionIds.length - 1, currentSectionIndex + 1))}
            disabled={currentSectionIndex === sectionIds.length - 1}
            className={`p-3.5 rounded-full border backdrop-blur-xl transition-all shadow-2xl ${
              currentSectionIndex === sectionIds.length - 1
                ? "opacity-30 cursor-not-allowed border-white/10 bg-black/40 text-gray-400"
                : isDark
                ? "bg-[#121217]/90 border-[#DC2626]/40 text-[#DC2626] hover:bg-[#DC2626] hover:text-white"
                : "bg-[#0F1E4A]/90 border-[#E5C158]/40 text-[#F0D375] hover:bg-[#E5C158] hover:text-black"
            }`}
            title="Next Flash Panel"
          >
            <FaChevronRight size={16} />
          </button>
        </div>

        {/* Horizontal Track Canvas */}
        <motion.div
          style={{ x }}
          className="flex flex-row w-[600vw] h-full"
        >
          {Array.isArray(children)
            ? children.map((child, idx) => (
                <div
                  key={idx}
                  id={sectionIds[idx]}
                  className="w-[100vw] h-screen flex-shrink-0 flex items-center justify-center px-4 sm:px-8 py-20"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.88, y: 40 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ amount: 0.35 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-7xl my-auto max-h-[88vh] overflow-y-auto scrollbar-thin"
                  >
                    {child}
                  </motion.div>
                </div>
              ))
            : children}
        </motion.div>
      </div>
    </div>
  );
}
