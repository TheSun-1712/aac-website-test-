import { useEffect, useRef } from "react";

export default function BackgroundVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
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
        className="w-full h-full object-cover scale-105 filter brightness-75 contrast-110"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      {/* Cinematic Translucent Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/75 via-[#080808]/60 to-[#080808]/85" />
    </div>
  );
}
