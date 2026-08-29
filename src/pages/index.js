import { useState } from "react";
import Head from "next/head";
import KineticCursor from "@/components/KineticCursor";
import BackgroundVideo from "@/components/BackgroundVideo";
import AACNavbar from "@/components/AACNavbar";
import AACHero from "@/components/AACHero";
import AACExploreSection from "@/components/AACExploreSection";
import AACTelemetrySection from "@/components/AACTelemetrySection";
import AAC3DViewer from "@/components/AAC3DViewer";
import AACOnCampusOffCampus from "@/components/AACOnCampusOffCampus";
import AACFooter from "@/components/AACFooter";

export default function Home() {
  const [activeTab, setActiveTab] = useState("hero");
  // Default theme state: false = Club Blue & Soft Gold Theme, true = Dark Red & Obsidian Theme
  const [isDark, setIsDark] = useState(false);

  return (
    <>
      <Head>
        <title>ADVANCED ACADEMIC CENTER (AAC) // GRIET HYDERABAD</title>
        <meta
          name="description"
          content="Advanced Academic Center (AAC) at GRIET Hyderabad. Interdisciplinary student research center for autonomous systems, patents, R&D projects, and publications."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Fullscreen Video Player with Overlay for High Visibility */}
      <BackgroundVideo isDark={isDark} />

      {/* Reactive Trail Cursor */}
      <KineticCursor isDark={isDark} />

      {/* Main Container - Standard Vertical Page Flow */}
      <div className="min-h-screen relative font-sans text-white selection:bg-[#E5C158] selection:text-black overflow-x-hidden">
        
        {/* Floating Liquid Glass Navbar */}
        <AACNavbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDark={isDark}
          setIsDark={setIsDark}
        />

        {/* Section 01: Hero */}
        <AACHero isDark={isDark} />

        {/* Section 02: Explore AAC (Cards Slide Horizontally as you scroll down) */}
        <AACExploreSection isDark={isDark} />

        {/* Section 03: Telemetry & Metrics (Stats Slide Horizontally as you scroll down) */}
        <AACTelemetrySection isDark={isDark} />

        {/* Section 04: 3D Tech Lab & Drone Viewer */}
        <AAC3DViewer isDark={isDark} />

        {/* Section 05: On Campus vs Innovation (Flash Cards Slide Horizontally) */}
        <AACOnCampusOffCampus isDark={isDark} />

        {/* Section 06: Footer & Directory */}
        <AACFooter isDark={isDark} />

      </div>
    </>
  );
}
