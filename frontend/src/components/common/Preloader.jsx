import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Minimalist Ultra-Luxury "Gold Aura Silhouette" Preloader (~2.0s)
 * The Fitness Club (Joshiyara Road HQ • Uttarkashi)
 *
 * Visual Choreography:
 * - Phase 1 (0.0s -> 1.05s): Silhouette emergence + upward energy hairlines + 0000 -> 9000+ counter
 * - Phase 2 (1.05s -> 1.55s): 9000+ surge micro-pulse + brand typography reveal
 * - Phase 3 (1.55s -> 2.05s): Seamless curtain lift (y: '-100%') to reveal live Hero video underneath
 */
export default function Preloader({ onComplete }) {
  const shouldReduceMotion = useReducedMotion();
  const [counterText, setCounterText] = useState('0000');
  const [isSurge, setIsSurge] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    // Accessibility: instant fade for users with motion sensitivity
    if (shouldReduceMotion) {
      const timer = setTimeout(() => onCompleteRef.current?.(), 250);
      return () => clearTimeout(timer);
    }

    // Phase 1 Counter Animation (0.0s -> 1.05s: 0000 -> 9000+)
    const startTime = performance.now();
    const duration = 1050; // ms
    let rafId;

    const updateCounter = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Smooth exponential acceleration curve
      const eased = Math.pow(progress, 2.4);
      const val = Math.floor(eased * 9000);

      if (progress < 1) {
        setCounterText(String(val).padStart(4, '0'));
        rafId = requestAnimationFrame(updateCounter);
      } else {
        setCounterText('9000+');
      }
    };

    rafId = requestAnimationFrame(updateCounter);

    // Phase 2: Peak Surge & Brand Lock at 1.05s
    const surgeTimer = setTimeout(() => {
      setIsSurge(true);
      setCounterText('9000+');
    }, 1050);

    // Phase 3: Seamless Curtain Lift at 1.55s (pointer-events released instantly)
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 1550);

    // Complete Sequence: Unmount preloader at 2.05s (total duration ~2.05s)
    const completeTimer = setTimeout(() => {
      if (onCompleteRef.current) onCompleteRef.current();
    }, 2050);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(surgeTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [shouldReduceMotion]);

  // Reduced motion fallback
  if (shouldReduceMotion) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[999999] bg-[#0b0b0e] pointer-events-none"
      />
    );
  }

  // 6 subtle background vertical gold energy hairlines drifting upward
  const energyHairlines = [
    { left: '22%', height: 'h-24', delay: 0.05, duration: 1.1 },
    { left: '36%', height: 'h-36', delay: 0.25, duration: 1.25 },
    { left: '49%', height: 'h-44', delay: 0.1, duration: 1.15 },
    { left: '63%', height: 'h-32', delay: 0.35, duration: 1.3 },
    { left: '76%', height: 'h-40', delay: 0.18, duration: 1.2 },
    { left: '88%', height: 'h-28', delay: 0.4, duration: 1.1 },
  ];

  return (
    <motion.div
      initial={{ y: '0%' }}
      animate={{ y: isExiting ? '-100%' : '0%' }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      className={`fixed inset-0 z-[999999] bg-[#0b0b0e] flex flex-col items-center justify-center overflow-hidden select-none will-change-transform ${
        isExiting ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
    >
      {/* =========================================================================
          BACKGROUND: SUBTLE VERTICAL GOLD ENERGY HAIRLINES DRIFTING UPWARD
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {energyHairlines.map((line, idx) => (
          <motion.div
            key={idx}
            style={{ left: line.left }}
            initial={{ y: 30, opacity: 0 }}
            animate={{
              y: isExiting ? -80 : -50,
              opacity: isExiting ? 0 : [0, 0.3, 0],
            }}
            transition={{
              duration: line.duration,
              delay: line.delay,
              repeat: isExiting ? 0 : Infinity,
              ease: 'easeInOut',
            }}
            className={`absolute top-1/2 -translate-y-1/2 w-[1px] ${line.height} bg-gradient-to-t from-transparent via-[#c5a880] to-transparent will-change-transform`}
          />
        ))}
      </div>

      {/* =========================================================================
          MAIN CENTER STAGE: SILHOUETTE + SURGE GLOW + COUNTER + TYPOGRAPHY
          ========================================================================= */}
      <motion.div
        animate={{
          opacity: isExiting ? 0 : 1,
          y: isExiting ? -16 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeIn' }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-4 will-change-transform"
      >
        {/* Silhouette Wrapper with Soft Gold Glow Backing */}
        <div className="relative flex items-center justify-center mb-2">
          {/* Subtle Ambient Gold Radial Glow behind the silhouette */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0.12 }}
            animate={{
              scale: isSurge ? [1.0, 1.25, 1.1] : 1.0,
              opacity: isSurge ? 0.38 : 0.18,
            }}
            transition={{
              duration: isSurge ? 0.45 : 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute w-44 h-44 sm:w-60 sm:h-60 rounded-full bg-[#c5a880]/20 blur-2xl pointer-events-none will-change-transform"
          />

          {/* Golden Aura Silhouette Image with Radial Mask */}
          <motion.img
            src="/assets/goku-aura.png"
            alt="The Fitness Club Gold Aura Silhouette"
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{
              opacity: 0.95,
              scale: isSurge ? [1.02, 1.06, 1.03] : 1.02,
              y: 0,
            }}
            transition={{
              duration: isSurge ? 0.45 : 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              maskImage: 'radial-gradient(circle, black 55%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(circle, black 55%, transparent 100%)',
            }}
            className="w-48 h-48 sm:w-64 sm:h-64 object-contain mix-blend-lighten pointer-events-none filter drop-shadow-[0_0_15px_rgba(197,168,128,0.25)] will-change-transform"
          />
        </div>

        {/* Phase 1: 0000 -> 9000+ Monospace Ki Counter & Hairline Progress Bar */}
        <div className="flex flex-col items-center justify-center mt-1 mb-3">
          <div className="text-xs font-mono font-semibold tracking-[0.35em] text-[#c5a880] mb-2 tabular-nums">
            {counterText}
          </div>

          {/* Hairline Progress Bar (w-32 h-[1px]) */}
          <div className="w-32 h-[1px] bg-white/10 relative overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
              className="h-full bg-[#c5a880] origin-left"
            />
          </div>
        </div>

        {/* Phase 2: Peak Surge Brand Typography Reveal (Triggers at 1.05s) */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{
            opacity: isSurge ? 1 : 0,
            y: isSurge ? 0 : 8,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <h1 className="text-xl sm:text-3xl font-display font-black uppercase tracking-[0.28em] text-white">
            THE FITNESS CLUB
          </h1>

          <p className="mt-1.5 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.32em] text-white/50">
            BREAK YOUR LIMITS • JOSHIYARA ROAD HQ
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
