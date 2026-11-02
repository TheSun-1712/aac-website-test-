import { useState } from "react";
import Link from "next/link";
import {
  FaTerminal,
  FaCheckCircle,
  FaArrowRight,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCode,
  FaBrain,
  FaRocket,
  FaMicrochip,
  FaLightbulb,
} from "react-icons/fa";

export default function GarcyJoinCommunity() {
  const [selectedDomain, setSelectedDomain] = useState("Deep Learning & Cognitive AI");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [pitch, setPitch] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const domains = [
    { name: "Deep Learning & Cognitive AI", icon: FaBrain },
    { name: "Internet of Things & Telemetry", icon: FaMicrochip },
    { name: "Web Development & Cloud", icon: FaCode },
    { name: "App Development & Mobile", icon: FaRocket },
    { name: "ML-Ops & Distributed Systems", icon: FaLightbulb },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="join" className="relative py-28 px-4 sm:px-6 max-w-7xl mx-auto border-b border-white/10">
      
      {/* Background Holographic Aura */}
      <div className="absolute left-1/2 -top-10 -translate-x-1/2 w-[650px] h-[450px] bg-[#E5A93C]/12 rounded-full blur-[160px] pointer-events-none" />

      {/* Top Banner Tag */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[10.5px] font-semibold tracking-wide uppercase mb-4 border backdrop-blur-md bg-[#E5A93C]/15 border-[#E5A93C]/40 text-[#E5A93C]">
          <FaTerminal className="text-[10px]" />
          <span>10 // Your Next Chapter &bull; Recruitment Terminal</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#EAF1FF] tracking-tighter uppercase leading-[1.04] mb-4 font-sans">
          The future is built by <br />
          <span className="italic font-serif font-normal text-[#E5A93C] lowercase tracking-normal text-3xl sm:text-5xl">
            those
          </span>{" "}
          who create it.
        </h2>

        <p className="text-sm sm:text-base text-[#9E988A] leading-relaxed max-w-2xl mx-auto font-sans font-normal">
          Have an idea? A curiosity? A problem worth solving? Join our interdisciplinary student laboratory and transform ambition into patentable breakthroughs.
        </p>
      </div>

      {/* Terminal & Application Grid (2 Columns: Terminal Form + Lab Telemetry Coordinates) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Interactive Application Terminal (7 Cols) */}
        <div className="lg:col-span-7 garcy-glass-card p-6 sm:p-8 border border-[#E5A93C]/40 bg-gradient-to-br from-[#111318] via-[#0d1424] to-[#08090C] shadow-2xl relative overflow-hidden flex flex-col justify-between">
          
          {/* Terminal Title Bar */}
          <div>
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#E5A93C]/60 border border-[#E5A93C]" />
                <span className="w-3 h-3 rounded-full bg-white/20" />
                <span className="w-3 h-3 rounded-full bg-white/10" />
                <span className="ml-2 font-bold text-[#E5A93C] uppercase tracking-wider text-[11px]">
                  AAC_INDUCTION_TERMINAL // v2.6
                </span>
              </div>
              <span className="text-[#9E988A] uppercase tracking-widest text-[9.5px]">
                STATUS: ACCEPTING_COHORTS
              </span>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E5A93C]/20 border-2 border-[#E5A93C] text-[#E5A93C] flex items-center justify-center mx-auto text-2xl shadow-[0_0_30px_rgba(229, 169, 60,0.5)]">
                  <FaCheckCircle />
                </div>
                <h3 className="text-2xl font-extrabold text-[#EAF1FF] font-sans">
                  Application Logged to AAC Archive
                </h3>
                <p className="text-xs sm:text-sm text-[#9E988A] max-w-md mx-auto leading-relaxed font-sans">
                  Thank you, <span className="text-white font-bold">{fullName}</span>. Your dossier has been routed to the student core committee for <span className="text-[#E5A93C] font-bold">{selectedDomain}</span>. You will receive an email confirmation at <span className="text-white font-bold">{email}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFullName("");
                    setEmail("");
                    setPortfolio("");
                    setPitch("");
                  }}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider transition-all border border-white/15"
                >
                  Submit Another Expression
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Domain Selection Pills */}
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#9E988A] tracking-wider mb-2 font-semibold">
                    1. Select Preferred Research Domain:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {domains.map((d) => {
                      const DomainIcon = d.icon;
                      const isSelected = selectedDomain === d.name;
                      return (
                        <button
                          key={d.name}
                          type="button"
                          onClick={() => setSelectedDomain(d.name)}
                          className={`p-2.5 rounded-xl text-left border text-xs font-mono flex items-center gap-2.5 transition-all ${
                            isSelected
                              ? "bg-[#E5A93C] text-white font-bold border-[#E5A93C] shadow-md"
                              : "bg-[#08090C]/80 text-[#9E988A] border-white/10 hover:border-white/20 hover:text-white"
                          }`}
                        >
                          <DomainIcon className="text-xs flex-shrink-0" />
                          <span className="truncate">{d.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & Email Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#9E988A] tracking-wider mb-1.5 font-semibold">
                      2. Full Name:
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Aditya Varma"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#08090C]/90 border border-white/15 text-white placeholder-[#9E988A]/50 focus:outline-none focus:border-[#E5A93C] text-xs font-mono transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#9E988A] tracking-wider mb-1.5 font-semibold">
                      3. Institute / Personal Email:
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. name@grietcollege.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#08090C]/90 border border-white/15 text-white placeholder-[#9E988A]/50 focus:outline-none focus:border-[#E5A93C] text-xs font-mono transition-colors"
                    />
                  </div>
                </div>

                {/* Portfolio / GitHub Link */}
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#9E988A] tracking-wider mb-1.5 font-semibold">
                    4. GitHub / Project Portfolio / LinkedIn (Optional):
                  </label>
                  <input
                    type="url"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    placeholder="https://github.com/your-username"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#08090C]/90 border border-white/15 text-white placeholder-[#9E988A]/50 focus:outline-none focus:border-[#E5A93C] text-xs font-mono transition-colors"
                  />
                </div>

                {/* Pitch */}
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#9E988A] tracking-wider mb-1.5 font-semibold">
                    5. What curiosity or engineering problem drives you?
                  </label>
                  <textarea
                    rows={3}
                    value={pitch}
                    onChange={(e) => setPitch(e.target.value)}
                    placeholder="Describe a hypothesis, hardware prototype, or software challenge you want to build at AAC..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#08090C]/90 border border-white/15 text-white placeholder-[#9E988A]/50 focus:outline-none focus:border-[#E5A93C] text-xs font-sans transition-colors resize-none"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#E5A93C] hover:bg-[#E5A93C] hover:text-black text-white text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_6px_24px_rgba(229, 169, 60,0.4)] flex items-center justify-center gap-2"
                >
                  <span>{isSubmitting ? "Routing to Core Committee..." : "Submit Expression of Interest &rarr;"}</span>
                </button>
              </form>
            )}
          </div>

          <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-[#9E988A]">
            <span>ENCRYPTED DIRECT CHANNEL</span>
            <span>AAC GRIET LAB PROTOCOL</span>
          </div>
        </div>

        {/* Right Column: Physical Coordinates & Lab Visiting Protocol (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          
          {/* Card 1: Physical Lab Location */}
          <div className="garcy-glass-card p-6 sm:p-7 border border-white/15 bg-gradient-to-br from-[#111318] to-[#08090C] shadow-xl">
            <div className="flex items-center gap-2.5 text-xs font-mono text-[#E5A93C] uppercase mb-4 font-bold">
              <FaMapMarkerAlt />
              <span>Physical Lab Location</span>
            </div>

            <h3 className="text-xl font-extrabold text-[#EAF1FF] mb-2 font-sans">
              Advanced Academic Center Core
            </h3>

            <p className="text-xs text-[#9E988A] leading-relaxed font-sans mb-4">
              Block 3, Room 3614 &bull; Gokaraju Rangaraju Institute of Engineering and Technology, Bachupally, Kukatpally, Hyderabad, TS 500090.
            </p>

            <div className="p-3 rounded-xl bg-[#08090C]/80 border border-white/10 text-[10.5px] font-mono text-[#9E988A] space-y-1">
              <div>Lab Access: <span className="text-[#EAF1FF] font-bold">24/7 Research Sessions (Daily)</span></div>
              <div>Official Email: <span className="text-[#E5A93C] font-bold">aacgriet.org@gmail.com</span></div>
            </div>
          </div>

          {/* Card 2: What Happens Next Protocol */}
          <div className="garcy-glass-card p-6 sm:p-7 border border-white/15 bg-gradient-to-br from-[#111318] to-[#08090C] shadow-xl">
            <div className="text-[10px] font-mono text-[#E5A93C] uppercase tracking-wider mb-2 font-bold">
              // RECRUITMENT TIMELINE &amp; SELECTION
            </div>

            <h4 className="text-base font-extrabold text-[#EAF1FF] mb-3 font-sans">
              What happens after submission?
            </h4>

            <ul className="space-y-2.5 text-xs font-sans text-[#9E988A]">
              <li className="flex items-start gap-2">
                <span className="font-mono text-[#E5A93C] font-bold text-[10px] mt-0.5">01</span>
                <span>Your application is reviewed by domain technical heads within 48 hours.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-[#E5A93C] font-bold text-[10px] mt-0.5">02</span>
                <span>Qualifiers receive an invitation to the Labstart technical assessment session.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-[#E5A93C] font-bold text-[10px] mt-0.5">03</span>
                <span>Accepted students join active patent prosecution teams with faculty mentorship.</span>
              </li>
            </ul>

            <div className="pt-4 mt-5 border-t border-white/10 flex items-center justify-between">
              <Link
                href="/About"
                className="text-xs font-mono text-[#E5A93C] hover:text-white uppercase flex items-center gap-1 font-bold transition-colors"
              >
                <span>Read Full Induction Rules</span>
                <FaArrowRight className="text-[9px]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

