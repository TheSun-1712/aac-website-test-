import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            if (onComplete) onComplete();
          }, 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#070E24] text-white overflow-hidden selection:bg-none"
        >
          {/* Ambient Glowing Background Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#172E7C]/40 rounded-full filter blur-[120px] pointer-events-none animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#E5C158]/20 rounded-full filter blur-[120px] pointer-events-none animate-pulse" />

          {/* Centered Video Card Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center max-w-md w-full px-6"
          >
            {/* Video Player Box with Liquid Glass Styling */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border border-[#E5C158]/40 shadow-[0_0_50px_rgba(229,193,88,0.25)] bg-[#0A163A]/80 backdrop-blur-xl mb-6 group">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover scale-105"
              >
                <source src="/loading-short.mp4" type="video/mp4" />
              </video>

              {/* Glass Overlay with Pulsing Ring */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A163A]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none" />
            </div>

            {/* Title & Branding */}
            <div className="text-center space-y-1.5 mb-6">
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-white">
                <span className="text-gold-gradient">ADVANCED ACADEMIC CENTER</span>
              </h2>
              <p className="font-sans text-xs tracking-widest uppercase text-gray-300 font-semibold">
                GRIET HYDERABAD // R&amp;D LABS
              </p>
            </div>

            {/* Progress Meter */}
            <div className="w-full max-w-xs space-y-2">
              <div className="flex justify-between items-center text-xs font-sans font-bold text-gray-200 px-1">
                <span>INITIALIZING ENGINE</span>
                <span className="text-[#F0D375]">{progress}%</span>
              </div>

              <div className="w-full h-2 rounded-full overflow-hidden p-0.5 bg-black/60 border border-white/20 backdrop-blur-md">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#172E7C] via-[#E5C158] to-[#DC2626]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
