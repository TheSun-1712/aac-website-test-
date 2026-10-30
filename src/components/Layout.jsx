// src/components/Layout.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GarcyNavbar from './garcy/GarcyNavbar';
import GarcyFooter from './garcy/GarcyFooter';
import GarcyCommandPalette from './garcy/GarcyCommandPalette';

const Layout = ({ children }) => {
  const [searchOpen, setSearchOpen] = useState(false);

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

  // Effect for smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.backgroundColor = '#080B12';
    document.documentElement.style.backgroundColor = '#080B12';
    document.documentElement.style.overflow = 'auto';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 16
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      }
    },
    exit: {
      opacity: 0,
      y: -16,
      transition: {
        duration: 0.25
      }
    }
  };

  return (
    <div 
      className="flex flex-col min-h-screen bg-[#080B12] text-[#EAF1FF]" 
      style={{ overflow: 'hidden' }}
    >
      <GarcyNavbar onOpenSearch={() => setSearchOpen(true)} />

      <AnimatePresence mode="wait">
        <motion.main 
          className="flex-grow w-full pt-20"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      
      <GarcyFooter />

      <GarcyCommandPalette
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </div>
  );
};

export default Layout;
