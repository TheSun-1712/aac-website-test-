import { useEffect, useRef } from "react";

export default function BackgroundVideo({ isDark }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {/* Background Video Player */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover scale-105 filter brightness-90 contrast-105"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      {/* Light Translucent Glass Overlay for High Video Visibility */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          isDark
            ? "bg-gradient-to-b from-[#08080A]/65 via-[#08080A]/50 to-[#08080A]/70"
            : "bg-gradient-to-b from-[#0F1E4A]/55 via-[#172E7C]/45 to-[#0F1E4A]/65"
        }`}
      />
    </div>
  );
}
