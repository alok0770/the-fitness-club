import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export default function HeroSection({ isPreloading = false }) {
  const containerRef = useRef(null);

  // Parallax tracking for smooth foreground displacement on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacityContent = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const yContent = useTransform(scrollYProgress, [0, 0.75], ['0%', '15%']);

  // Spring physics for buttery luxury animations
  const springTransition = {
    type: 'spring',
    stiffness: 90,
    damping: 22,
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-[85svh] sm:h-[90svh] lg:h-screen overflow-hidden bg-[#0b0b0e] flex items-center justify-center select-none"
    >
      {/* 1. Cinematic Auto-Playing Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/assets/hero-bg.jpg"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        >
          <source src="/gym-video.mp4" type="video/mp4" />
          <source src="/videos/gym-video.mp4" type="video/mp4" />
          <source src="/gym%20video.mov" type="video/quicktime" />
          <source src="/gym-video.mov" type="video/quicktime" />
          <source src="/videos/gym-video.mov" type="video/quicktime" />
        </video>
      </div>

      {/* 2. Luxury Vantablack & Gold Blending Overlays */}
      {/* Top-to-bottom cinematic vignette to keep navbar crisp and blend seamlessly into #0b0b0e */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-[#0b0b0e] pointer-events-none" />

      {/* Subtle radial dark vignette ensuring 100% foreground contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.25)_0%,rgba(11,11,14,0.75)_65%,#0b0b0e_100%)] pointer-events-none" />

      {/* Subtle warm gold ambient radiance */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#c5a880]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* 3. Minimalist Foreground Content (Anti-Clutter) */}
      <motion.div
        style={{ opacity: opacityContent, y: yContent }}
        className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 w-full text-center flex flex-col items-center pt-16 sm:pt-20 pb-16"
      >
        {/* Subtle Gold Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isPreloading ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-5 sm:mb-6 border border-[#c5a880]/30 bg-black/60 backdrop-blur-md rounded-full shadow-[0_0_20px_rgba(197,168,128,0.15)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-pulse" />
          <span className="text-[10px] sm:text-xs uppercase tracking-widest font-mono font-bold text-[#c5a880]">
            JOSHIYARA ROAD HQ • UTTARKASHI
          </span>
        </motion.div>

        {/* High-Impact Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={isPreloading ? { opacity: 0, y: 25 } : { opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight sm:tracking-tighter font-display text-white leading-none max-w-4xl"
        >
          THE FITNESS CLUB
        </motion.h1>

        {/* Short 1-Line Luxury Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isPreloading ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.32 }}
          className="text-sm sm:text-base md:text-lg text-gray-300 font-light tracking-wide max-w-xl mx-auto pt-4 sm:pt-5 leading-relaxed"
        >
          Where relentless discipline meets uncompromising design and calibrated iron.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isPreloading ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 pt-8 sm:pt-9 w-full sm:w-auto"
        >
          <motion.a
            href="#membership"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            transition={springTransition}
            className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-[#c5a880] text-black hover:bg-white font-bold uppercase tracking-widest text-xs transition-colors duration-300 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(197,168,128,0.35)]"
          >
            <span>Explore Memberships</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>

          <motion.a
            href="#transformations"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            transition={springTransition}
            className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-black/50 hover:bg-white/[0.08] border border-white/20 hover:border-[#c5a880]/60 text-white font-semibold uppercase tracking-widest text-xs backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
          >
            <span>View Transformations</span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* 4. Non-Intrusive Scroll Down Prompt */}
      <motion.a
        href="#transformations"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        aria-label="Scroll to Transformations"
        className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-gray-400 hover:text-[#c5a880] transition-colors duration-300 select-none group"
      >
        <span className="text-[9px] uppercase tracking-widest font-mono text-gray-400 group-hover:text-[#c5a880]">
          Scroll
        </span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#c5a880]" />
      </motion.a>
    </section>
  );
}
