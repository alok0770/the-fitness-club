import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Tuned spring physics for smooth, responsive cursor follow
  const springConfig = { damping: 24, stiffness: 300, mass: 0.35 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible((prev) => (prev ? prev : true));
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleInteractiveOver = (e) => {
      const target = e.target;
      if (
        target &&
        typeof target.closest === 'function' &&
        target.closest('a, button, [role="button"], input, textarea, select')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleInteractiveOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleInteractiveOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Sleek Luxury Gold Trailing Ring (NO SOLID WHITE BLOBS) */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.4 : 1,
          borderColor: isHovered ? '#c5a880' : 'rgba(197, 168, 128, 0.45)',
          backgroundColor: isHovered ? 'rgba(197, 168, 128, 0.08)' : 'transparent',
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none transition-colors duration-200"
      />

      {/* Center Precise Metallic Gold Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 0.7 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 450, damping: 30 }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#c5a880] pointer-events-none shadow-[0_0_8px_rgba(197,168,128,0.8)]"
      />
    </div>
  );
}
