import Link from "next/link";
import { FaRocket, FaSearch, FaGraduationCap, FaCompass, FaExternalLinkAlt } from "react-icons/fa";

export default function GarcyStoryRunway() {
  const exploreData = [
    {
      id: "vision",
      number: "01",
      title: "Vision & Mission",
      icon: FaRocket,
      subtitle: "STUDENT-FOCUSED RESEARCH UNIT",
      body: "AAC aspires to be a pre-eminent student-focused research unit, preparing young minds in design thinking and innovation for societal problems. As an innovation center with the capacity to attract and engage the best talent in the institute, a culture of discovery is cultivated through experiential learning and entrepreneurial endeavors.",
      tag: "Core Vision",
      link: "/About",
    },
    {
      id: "who",
      number: "02",
      title: "Who We Are",
      icon: FaSearch,
      subtitle: "INTER-DISCIPLINARY RESEARCH CENTER",
      body: "An inter-disciplinary research centre committed to excellence in teaching, learning, and research, bringing together faculty and student engineers with diverse backgrounds to address complex engineering and technological challenges.",
      tag: "Community",
      link: "/Administration",
    },
    {
      id: "offer",
      number: "03",
      title: "What We Offer",
      icon: FaGraduationCap,
      subtitle: "MENTORSHIP & HANDS-ON R&D",
      body: "Specialized workshops, mentorship from industry experts, sponsored R&D projects, patent prosecution support, and opportunities to learn advanced technical skills for real-world autonomous applications.",
      tag: "Opportunities",
      link: "/projects",
    },
  ];

  const partners = [
    { name: "GRIET HYDERABAD", role: "Autonomous Institute" },
    { name: "NRSC (ISRO)", role: "Official MOU Partner" },
    { name: "IEEE STUDENT BRANCH", role: "Technical Chapter" },
    { name: "IIC MHRD", role: "Innovation Cell" },
    { name: "NAAC A++ ACCREDITED", role: "Highest Grade" },
  ];

  return (
    <section id="explore" className="relative py-28 px-4 sm:px-6 max-w-7xl mx-auto">
      
      {/* Top Editorial Headline */}
      <div className="max-w-4xl mb-16 text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[10.5px] font-semibold tracking-wide uppercase mb-4 border backdrop-blur-md bg-[#1769FF]/15 border-[#1769FF]/40 text-[#49A3FF]">
          <FaCompass className="text-[10px]" />
          <span>03 // Discover AAC GRIET</span>
        </div>
        
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#EAF1FF] tracking-tighter uppercase leading-[1.08] mb-6 font-sans">
          A Center Committed <br />
          <span className="italic font-serif font-normal text-[#49A3FF] lowercase tracking-normal text-3xl sm:text-5xl">
            to
          </span>{" "}
          Excellence.
        </h2>

        <div className="story-copy space-y-4">
          <p>
            AAC works on some of the most challenging frontiers of student engineering:{" "}
            <em>autonomous systems</em>, <em>intelligent edge hardware</em>, and <em>patentable IP</em>.
          </p>
          <p className="text-sm sm:text-lg text-[#8793A8] font-normal leading-relaxed">
            Fostering innovation, experiential learning, and entrepreneurship across disciplines at Gokaraju Rangaraju Institute of Engineering and Technology.
          </p>
        </div>
      </div>

      {/* 3 Pillars Grid with Exact AAC Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {exploreData.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="garcy-glass-card p-6 sm:p-8 flex flex-col justify-between hover:border-[#1769FF]/60 transition-all duration-300 group border border-white/15"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono uppercase text-[#8793A8] mb-6">
                  <span className="w-10 h-10 rounded-xl bg-[#101725] flex items-center justify-center text-[#49A3FF] text-base border border-white/10">
                    <Icon />
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#080B12] border border-[#1769FF]/30 text-[9.5px] text-[#49A3FF] font-bold">
                    {item.tag}
                  </span>
                </div>

                <div className="text-[10px] font-mono text-[#8793A8] uppercase tracking-wider mb-1 font-semibold">
                  {item.subtitle}
                </div>

                <h3 className="text-2xl font-bold text-[#EAF1FF] mb-3 group-hover:text-[#49A3FF] transition-colors font-sans">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#8793A8] leading-relaxed font-sans font-normal">
                  {item.body}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#8793A8] group-hover:text-white transition-colors">
                <Link href={item.link} className="flex items-center gap-1.5 hover:text-[#49A3FF]">
                  <span>Explore More</span>
                  <FaExternalLinkAlt className="text-[9px]" />
                </Link>
                <span className="text-[#49A3FF] opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Institutional Accreditation Wall */}
      <div className="logo-wall">
        {partners.map((partner) => (
          <div key={partner.name} className="logo-slot">
            <div className="text-xs sm:text-sm font-bold font-mono tracking-wider text-[#EAF1FF]">
              {partner.name}
            </div>
            <div className="text-[9px] font-mono text-[#8793A8] uppercase mt-0.5">
              {partner.role}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
