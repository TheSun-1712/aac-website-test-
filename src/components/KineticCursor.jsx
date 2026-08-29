import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function KineticCursor({ isDark = false }) {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest("a") ||
        target.dataset.cursorHover === "true"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const ringBorderColor = isDark
    ? "border-[#DC2626]/80 shadow-[0_0_15px_#DC2626]"
    : "border-[#E5C158]/90 shadow-[0_0_15px_rgba(229,193,88,0.5)]";

  const ringBg = isDark
    ? "rgba(220, 38, 38, 0.15)"
    : "rgba(229, 193, 88, 0.2)";

  const coreColor = isDark ? "bg-[#DC2626]" : "bg-[#F0D375]";

  return (
    <>
      {/* Outer Glow Ring */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border ${ringBorderColor}`}
        animate={{
          x: mousePosition.x - (isHovered ? 24 : 12),
          y: mousePosition.y - (isHovered ? 24 : 12),
          width: isHovered ? 48 : 24,
          height: isHovered ? 48 : 24,
          scale: isHovered ? 1.2 : 1,
          backgroundColor: isHovered ? ringBg : "rgba(0, 0, 0, 0)",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 350, mass: 0.3 }}
      />

      {/* Inner Precision Core */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full ${coreColor}`}
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          width: 6,
          height: 6,
        }}
        transition={{ type: "spring", damping: 35, stiffness: 500, mass: 0.1 }}
      />
    </>
  );
}
