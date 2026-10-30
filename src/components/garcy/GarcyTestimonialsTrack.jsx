import Link from "next/link";
import { FaArrowRight, FaLinkedin } from "react-icons/fa";

export default function GarcyTestimonialsTrack() {
  // Real Core Committee & Alumni from AAC Database
  const leaders = [
    {
      name: "Jayanth Potluri",
      role: "President",
      affiliation: "AAC Core Committee",
      desc: "Leading student research operations, autonomous hardware development, and national project exhibitions at GRIET.",
      tag: "PRESIDENT // LEAD",
      linkedin: "https://www.linkedin.com/in/jayanth-potluri-6a93b21ba/",
      quote: "ENGINEERING INNOVATION BEGINS WHEN STUDENTS OWN THE PROBLEM.",
    },
    {
      name: "Harsha Vardhini",
      role: "Vice President",
      affiliation: "AAC Core Committee",
      desc: "Spearheading interdisciplinary workshops, training modules, and hackathon organization for institute researchers.",
      tag: "VICE PRESIDENT",
      linkedin: null,
      quote: "FOSTERING TECHNICAL AGILITY ACROSS EVERY DISCIPLINE.",
    },
    {
      name: "Steven Gopaldas",
      role: "Head Training & Development",
      affiliation: "AAC Core Committee",
      desc: "Mentoring junior engineering cohorts in robotics, embedded firmware, and technical paper writing.",
      tag: "TRAINING HEAD",
      linkedin: "https://www.linkedin.com/in/stevengopaldas/",
      quote: "HANDS-ON FIRMWARE AND HARDWARE EXPERIMENTS IN THE LAB.",
    },
    {
      name: "G Suhas",
      role: "AAC Alumnus",
      affiliation: "Industry Engineer",
      desc: "Transformed student laboratory prototypes into scalable engineering solutions during undergraduate tenure at AAC.",
      tag: "ALUMNI MENTOR",
      linkedin: null,
      quote: "TAKING ACADEMIC PROTOTYPES TO PRODUCTION INTEGRATION.",
    },
  ];

  return (
    <section id="community" className="relative py-28 px-4 sm:px-6 max-w-7xl mx-auto border-b border-white/10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[10.5px] font-semibold tracking-wide uppercase mb-3 border backdrop-blur-md bg-[#1769FF]/15 border-[#1769FF]/40 text-[#49A3FF]">
            <span>06 // AAC Leadership &amp; Alumni</span>
          </div>

          <h2 className="font-extrabold text-3xl sm:text-5xl tracking-tighter text-[#EAF1FF] mb-2 uppercase font-sans">
            Minds that lead <br />
            <span className="italic font-serif font-normal text-[#49A3FF] lowercase tracking-normal text-3xl sm:text-5xl">
              the
            </span>{" "}
            ecosystem.
          </h2>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-4">
          <Link
            href="/Administration"
            className="text-xs font-mono text-[#8793A8] hover:text-[#49A3FF] transition-colors flex items-center gap-1.5 uppercase font-bold"
          >
            <span>Core Committee &bull; Administration</span>
            <FaArrowRight className="text-[10px]" />
          </Link>
        </div>
      </div>

      {/* Grid of 4 Leaders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {leaders.map((item, idx) => (
          <div
            key={item.name}
            className="garcy-glass-card p-6 flex flex-col justify-between hover:bg-[#131d30]/90 transition-all duration-300 h-full border border-white/15 group hover:-translate-y-1 hover:border-[#1769FF]/50"
          >
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#8793A8] mb-4">
                <span>0{idx + 1} // LEAD</span>
                <span className="text-[#49A3FF] px-2.5 py-0.5 rounded-full bg-[#080B12] border border-[#1769FF]/30 font-bold">
                  {item.tag}
                </span>
              </div>

              {/* Bold Quote Headline */}
              <h4 className="text-sm font-extrabold text-[#EAF1FF] mb-3 font-sans tracking-tight leading-snug group-hover:text-[#49A3FF] transition-colors">
                {item.quote}
              </h4>

              <p className="text-xs text-[#8793A8] leading-relaxed font-sans font-normal mb-6">
                {item.desc}
              </p>
            </div>

            {/* Persona Badge */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#080B12] flex items-center justify-center font-mono font-bold text-xs text-[#49A3FF] border border-white/10">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#EAF1FF] font-sans">{item.name}</div>
                  <div className="text-[9.5px] font-mono text-[#8793A8] uppercase">{item.role}</div>
                </div>
              </div>

              {item.linkedin && (
                <a
                  href={item.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-lg bg-white/5 hover:bg-[#1769FF] hover:text-white text-[#8793A8] flex items-center justify-center transition-colors"
                  title="LinkedIn Profile"
                >
                  <FaLinkedin className="text-xs" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
