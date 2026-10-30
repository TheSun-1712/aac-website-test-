import { useState, useEffect } from "react";
import Head from "next/head";
import BackgroundVideo from "@/components/BackgroundVideo";

// Garcy Studio Aesthetic Components for AAC GRIET
import GarcyBootLoader from "@/components/garcy/GarcyBootLoader";
import GarcyNavbar from "@/components/garcy/GarcyNavbar";
import GarcyHeroFan from "@/components/garcy/GarcyHeroFan";
import GarcyTornado from "@/components/garcy/GarcyTornado";
import GarcyStoryRunway from "@/components/garcy/GarcyStoryRunway";
import GarcyTelemetry from "@/components/garcy/GarcyTelemetry";
import GarcyResearchExplorer from "@/components/garcy/GarcyResearchExplorer";
import GarcyProjectsGallery from "@/components/garcy/GarcyProjectsGallery";
import GarcyEventsTimeline from "@/components/garcy/GarcyEventsTimeline";
import GarcyAchievementsProof from "@/components/garcy/GarcyAchievementsProof";
import GarcyAdministration from "@/components/garcy/GarcyAdministration";
import GarcyAboutEcosystem from "@/components/garcy/GarcyAboutEcosystem";
import GarcyInnovationDome from "@/components/garcy/GarcyInnovationDome";
import GarcyTestimonialsTrack from "@/components/garcy/GarcyTestimonialsTrack";
import GarcyJoinCommunity from "@/components/garcy/GarcyJoinCommunity";
import GarcyFooter from "@/components/garcy/GarcyFooter";
import GarcyCommandPalette from "@/components/garcy/GarcyCommandPalette";
import GarcyCaseStudies from "@/components/garcy/GarcyCaseStudies";

export default function Home() {
  const [bootCompleted, setBootCompleted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);

  // Mouse spotlight coordinates tracking (Garcy --light-x, --light-y effect)
  useEffect(() => {
    const handleMouseMove = (e) => {
      const xPercent = (e.clientX / window.innerWidth) * 100;
      const yPercent = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty("--light-x", `${xPercent}%`);
      document.documentElement.style.setProperty("--light-y", `${yPercent}%`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Global Keyboard shortcuts: ⌘K / Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Head>
        <title>ADVANCED ACADEMIC CENTER // GRIET HYDERABAD</title>
        <meta
          name="description"
          content="Advanced Academic Center (AAC) at GRIET Hyderabad. Interdisciplinary student research center for autonomous systems, patents, R&D projects, and publications."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Cinematic Fullscreen Background Video Reel */}
      <BackgroundVideo />

      {/* Ambient Dither & Dynamic Cursor Spotlight */}
      <div className="reel-dither" aria-hidden="true" />
      <div className="spotlight" aria-hidden="true" />

      {/* Booting Stage: 100% Silent Direct Entry */}
      {!bootCompleted && (
        <GarcyBootLoader
          onComplete={() => setBootCompleted(true)}
        />
      )}

      {/* Canvas Stage (.stage) */}
      <main className="stage relative overflow-hidden bg-[#080B12]/92 text-[#EAF1FF]">
        
        {/* Persistent Floating Header & Section Navigator */}
        <GarcyNavbar
          onOpenSearch={() => setSearchOpen(true)}
          onOpenCaseStudies={() => setCaseStudiesOpen(true)}
        />

        {/* Section 01: Hero & Interactive iOS Notification Fan Stack */}
        <GarcyHeroFan />

        {/* Section 02: The 3D Emblem Tornado Moment (#moment) */}
        <GarcyTornado
          onOpenCaseStudies={() => setCaseStudiesOpen(true)}
        />

        {/* Section 03: Explore AAC — The Editorial Story Runway */}
        <GarcyStoryRunway />

        {/* Section 04: Telemetry & Focus Breakdown */}
        <GarcyTelemetry />

        {/* Section 05: Phase 2 — Interactive Research Domain Explorer */}
        <GarcyResearchExplorer />

        {/* Section 06: Phase 2 — Pinned Projects Runway Gallery */}
        <GarcyProjectsGallery
          onSelectCase={(caseId) => {
            setCaseStudiesOpen(true);
          }}
        />

        {/* Section 07: Phase 2 — Split-Track Events Timeline */}
        <GarcyEventsTimeline />

        {/* Section 08: Phase 2 — Filterable Achievements Proof Engine */}
        <GarcyAchievementsProof />

        {/* Section 09: Phase 3 — Administration & Core Leadership Matrix */}
        <GarcyAdministration />

        {/* Section 10: Phase 3 — About Us Ecosystem & Induction Protocol */}
        <GarcyAboutEcosystem />

        {/* Section 11: Innovation Dome — Campus Life vs Off-Campus R&D */}
        <GarcyInnovationDome
          onSelectCase={(caseId) => {
            setCaseStudiesOpen(true);
          }}
        />

        {/* Section 12: Community & Alumni Testimonials Track */}
        <GarcyTestimonialsTrack />

        {/* Section 13: Phase 4 — Join the Community Recruitment Terminal */}
        <GarcyJoinCommunity />

        {/* Section 14: Minimalist Studio Footer */}
        <GarcyFooter />

        {/* Interactive 3D Search & Command Palette (⌘K) */}
        <GarcyCommandPalette
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
        />

        {/* In-Depth Project Case Studies Showcase Drawer */}
        <GarcyCaseStudies
          isOpen={caseStudiesOpen}
          onClose={() => setCaseStudiesOpen(false)}
        />
      </main>
    </>
  );
}
