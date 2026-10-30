import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCompass, FaUsers, FaLightbulb, FaTimes, FaArrowRight, FaRocket, FaSearch, FaGraduationCap } from "react-icons/fa";

export default function AACExploreSection({ isDark }) {
  const [activeModal, setActiveModal] = useState(null);

  const exploreData = [
    {
      id: "vision",
      title: "Vision & Mission",
      icon: FaRocket,
      subtitle: "Student-Focused Research Unit",
      body: "AAC aspires to be a pre-eminent student-focused research unit, preparing young minds in design thinking and innovation for societal problems. As an innovation center with the capacity to attract and engage the best talent in the institute, a culture of innovation and discovery is cultivated by supporting experiential learning and entrepreneurial endeavors among students.",
      tag: "Core Vision",
    },
    {
      id: "who",
      title: "Who We Are",
      icon: FaSearch,
      subtitle: "Inter-Disciplinary Research Center",
      body: "An inter-disciplinary research centre committed to excellence in teaching, learning, and research, bringing together experts with diverse backgrounds to address complex engineering and technological challenges.",
      tag: "Community",
    },
    {
      id: "offer",
      title: "What We Offer",
      icon: FaGraduationCap,
      subtitle: "Mentorship & Hands-on R&D",
      body: "Workshops, mentorship from industry experts, sponsored R&D projects, and opportunities to learn scientific and technical skills for real-world applications.",
      tag: "Opportunities",
    },
  ];

  return (
    <section id="explore" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-sans text-xs font-semibold tracking-wide uppercase mb-3 border backdrop-blur-md ${
              isDark
                ? "bg-[#DC2626]/20 border-[#DC2626]/40 text-[#DC2626]"
                : "bg-[#E5C158]/20 border-[#E5C158]/40 text-[#F0D375]"
            }`}
          >
            <FaCompass />
            <span>Discover AAC GRIET</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-extrabold text-3xl sm:text-4xl tracking-tight text-white mb-2"
          >
            Explore <span className={isDark ? "text-red-gradient" : "text-gold-gradient"}>What We Do</span>
          </motion.h2>

          <p className="font-sans text-sm sm:text-base leading-relaxed text-gray-200">
            Discover our commitment to academic excellence, innovation, and research that drives the future.
          </p>
        </div>

        {/* Fluid Horizontal Flash Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {exploreData.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 160 + idx * 60, scale: 0.94 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ amount: 0.25 }}
                whileHover={{ scale: 1.03, y: -8, x: -4 }}
                transition={{
                  type: "spring",
                  stiffness: 70,
                  damping: 22,
                  mass: 0.6,
                  delay: idx * 0.12,
                }}
                onClick={() => setActiveModal(item)}
                className={`p-7 rounded-3xl cursor-pointer group transition-all flex flex-col justify-between border shadow-2xl ${
                  isDark
                    ? "liquid-glass-dark hover:border-[#DC2626] hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
                    : "liquid-glass-blue hover:border-[#E5C158] hover:shadow-[0_0_30px_rgba(229,193,88,0.3)]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className={`p-3 rounded-2xl border ${
                      isDark
                        ? "bg-[#DC2626]/20 border-[#DC2626]/30 text-[#DC2626]"
                        : "bg-[#E5C158]/20 border-[#E5C158]/30 text-[#F0D375]"
                    }`}>
                      <Icon size={22} />
                    </span>
                    <span className={`font-sans text-xs font-bold px-3 py-1 rounded-md ${
                      isDark
                        ? "text-white bg-[#DC2626]"
                        : "text-black bg-[#E5C158]"
                    }`}>
                      {item.tag}
                    </span>
                  </div>

                  <span className="font-sans text-xs text-gray-300 font-medium block mb-1">
                    {item.subtitle}
                  </span>

                  <h3 className={`font-heading font-bold text-xl mb-3 text-white transition-colors ${
                    isDark ? "group-hover:text-[#DC2626]" : "group-hover:text-[#F0D375]"
                  }`}>
                    {item.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm leading-relaxed text-gray-200 line-clamp-4">
                    {item.body}
                  </p>
                </div>

                <div className={`mt-6 pt-4 border-t border-white/15 flex items-center justify-between font-sans font-bold text-xs ${
                  isDark ? "text-[#DC2626]" : "text-[#F0D375]"
                }`}>
                  <span>Read Full Card</span>
                  <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal Flash Card Dialog */}
        <AnimatePresence>
          {activeModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.88, x: 120 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.88, x: 120 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`p-8 rounded-3xl max-w-xl w-full shadow-2xl relative border ${
                  isDark ? "liquid-glass-dark border-[#DC2626]/50" : "liquid-glass-blue border-[#E5C158]/50"
                }`}
              >
                <button
                  onClick={() => setActiveModal(null)}
                  className="absolute top-6 right-6 p-2 rounded-full border border-white/20 text-gray-300 hover:text-white hover:border-white transition-colors"
                >
                  <FaTimes size={16} />
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <span className={`p-3 rounded-2xl border ${
                    isDark ? "bg-[#DC2626]/20 border-[#DC2626]/30 text-[#DC2626]" : "bg-[#E5C158]/20 border-[#E5C158]/30 text-[#F0D375]"
                  }`}>
                    <activeModal.icon size={22} />
                  </span>
                  <div>
                    <span className={`font-sans text-xs font-bold ${
                      isDark ? "text-[#DC2626]" : "text-[#F0D375]"
                    }`}>
                      {activeModal.tag}
                    </span>
                    <h3 className="font-heading font-bold text-2xl text-white">
                      {activeModal.title}
                    </h3>
                  </div>
                </div>

                <p className="font-sans text-sm sm:text-base leading-relaxed text-gray-200 mb-6">
                  {activeModal.body}
                </p>

                <div className="flex justify-end">
                  <button
                    onClick={() => setActiveModal(null)}
                    className={`px-6 py-2.5 font-sans font-bold text-xs rounded-full ${
                      isDark ? "bg-[#DC2626] text-[#FFFFFF] hover:bg-[#b91c1c]" : "bg-[#E5C158] text-black hover:bg-[#d4af37]"
                    }`}
                  >
                    Close Card
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
