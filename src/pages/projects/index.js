import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import GarcyNavbar from "@/components/garcy/GarcyNavbar";
import GarcyProjectsGallery from "@/components/garcy/GarcyProjectsGallery";
import GarcyCommandPalette from "@/components/garcy/GarcyCommandPalette";
import GarcyCaseStudies from "@/components/garcy/GarcyCaseStudies";

export default function ProjectsPage() {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState(null);

  // Mouse spotlight tracking
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

  // ⌘K / Ctrl+K for command palette
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
        <title>PROJECTS & PROTOTYPES // AAC GRIET</title>
        <meta
          name="description"
          content="3D cylindrical dome panorama of student engineering builds, autonomous UAVs, and published patents at AAC GRIET."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="reel-dither" aria-hidden="true" />
      <div className="spotlight" aria-hidden="true" />

      {/* Full-viewport stage — no footer, fixed to viewport, no scroll leakage */}
      <main
        style={{
          position: "fixed",
          inset: "4px",
          borderRadius: "20px",
          background: "#08090C",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          isolation: "isolate",
          border: "1px solid #2A261F",
        }}
      >
        {/* Floating Header */}
        <GarcyNavbar
          onOpenSearch={() => setSearchOpen(true)}
          onOpenCaseStudies={() => setCaseStudiesOpen(true)}
        />

        {/* 3D Dome Gallery — fills remaining height */}
        <div style={{ flex: 1, position: "relative", minHeight: 0, overflow: "hidden" }}>
          <GarcyProjectsGallery
            onNavigateBack={() => router.push("/moment")}
          />
        </div>

        {/* Search Palette */}
        <GarcyCommandPalette
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
        />

        {/* Detailed Case Studies Drawer */}
        <GarcyCaseStudies
          isOpen={caseStudiesOpen}
          onClose={() => setCaseStudiesOpen(false)}
          caseId={selectedCaseId}
        />
      </main>
    </>
  );
}
