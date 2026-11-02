import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import GarcyNavbar from "@/components/garcy/GarcyNavbar";
import GarcyTornado from "@/components/garcy/GarcyTornado";
import GarcyCommandPalette from "@/components/garcy/GarcyCommandPalette";
import GarcyCaseStudies from "@/components/garcy/GarcyCaseStudies";

export default function MomentPage() {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);
  const isNavigatingRef = useRef(false);

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
        <title>3D SPIRAL HELIX // AAC GRIET</title>
        <meta
          name="description"
          content="Interactive 3D Spiral Helix exploration at Advanced Academic Center GRIET."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="reel-dither" aria-hidden="true" />
      <div className="spotlight" aria-hidden="true" />

      {/* Full-viewport stage — no footer, no overflow, fixed to viewport */}
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
        {/* Floating Navbar */}
        <GarcyNavbar
          onOpenSearch={() => setSearchOpen(true)}
          onOpenCaseStudies={() => setCaseStudiesOpen(true)}
        />

        {/* 3D Spiral Helix — fills remaining space */}
        <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
          <GarcyTornado
            onNavigateProjects={() => router.push("/projects")}
            onNavigateHome={() => router.push("/")}
          />
        </div>

        {/* Search Palette */}
        <GarcyCommandPalette
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
        />

        {/* Case Studies Drawer */}
        <GarcyCaseStudies
          isOpen={caseStudiesOpen}
          onClose={() => setCaseStudiesOpen(false)}
        />
      </main>
    </>
  );
}
