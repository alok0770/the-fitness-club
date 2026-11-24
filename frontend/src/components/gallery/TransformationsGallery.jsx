import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Award, Maximize2, X } from 'lucide-react';

// Comprehensive array of 12+ curated Transformations
const DEFAULT_TRANSFORMATIONS = [
  {
    id: 1,
    name: 'Alok Rana',
    category: 'Hypertrophy & V-Taper',
    achievement: '+9 kg Lean Muscle',
    duration: '24 Weeks',
    weightChange: '56 kg → 65 kg',
    bodyFat: '18% → 10%',
    beforeImage: '/assets/alok-before.jpg',
    afterImage: '/assets/alok-after.jpg',
    quote: 'Disciplined progressive overload and metabolic nutrition at The Fitness Club.',
  },
  {
    id: 2,
    name: 'David Reynolds',
    category: 'Strength & Recomposition',
    achievement: '+140 kg Big 3 Total',
    duration: '24 Weeks',
    weightChange: '74 kg → 83 kg',
    bodyFat: '14% → 11%',
    beforeImage: '/assets/transformation-2-before.jpg',
    afterImage: '/assets/transformation-2-after.jpg',
    quote: 'Focused biomechanics and relentless accountability. Zero fluff.',
  },
  {
    id: 3,
    name: 'Elena Rostova',
    category: 'Athletic Conditioning',
    achievement: '-8 kg Fat Loss',
    duration: '20 Weeks',
    weightChange: '64 kg → 56 kg',
    bodyFat: '23% → 13%',
    beforeImage: '/assets/transformation-3-before.jpg',
    afterImage: '/assets/transformation-3-after.jpg',
    quote: 'Explosive output, cardiovascular stamina, and physique definition.',
  },
  {
    id: 4,
    name: 'Vikramaditya Rawat',
    category: 'Olympic Power & Mass',
    achievement: '+12 kg Lean Mass',
    duration: '32 Weeks',
    weightChange: '68 kg → 80 kg',
    bodyFat: '16% → 11%',
    beforeImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    quote: 'Structured periodization transformed my physique and squat numbers completely.',
  },
  {
    id: 5,
    name: 'Ananya Chauhan',
    category: 'Tone & Core Density',
    achievement: '-11 kg Fat Loss',
    duration: '18 Weeks',
    weightChange: '67 kg → 56 kg',
    bodyFat: '26% → 15%',
    beforeImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
    quote: 'Consistent high-intensity weight training reshaped my posture and confidence.',
  },
  {
    id: 6,
    name: 'Rohan Semwal',
    category: 'Upper Body Hypertrophy',
    achievement: '+7 kg Muscle',
    duration: '16 Weeks',
    weightChange: '62 kg → 69 kg',
    bodyFat: '17% → 12%',
    beforeImage: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    quote: 'Focused heavy compound lifts with zero wasted hours.',
  },
  {
    id: 7,
    name: 'Meera Panwar',
    category: 'Lean Athletic Sculpt',
    achievement: '-9 kg Fat Loss',
    duration: '22 Weeks',
    weightChange: '65 kg → 56 kg',
    bodyFat: '24% → 14%',
    beforeImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    quote: 'Scientific caloric deficit combined with progressive overload works every time.',
  },
  {
    id: 8,
    name: 'Karan Negi',
    category: 'Raw Powerlifting Mass',
    achievement: '+15 kg Clean Bulk',
    duration: '36 Weeks',
    weightChange: '70 kg → 85 kg',
    bodyFat: '15% → 13%',
    beforeImage: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80',
    quote: 'Deadlift climbed to 220kg while building dense back thickness.',
  },
  {
    id: 9,
    name: 'Pooja Bisht',
    category: 'Functional Recomposition',
    achievement: '-12 kg Fat Loss',
    duration: '24 Weeks',
    weightChange: '72 kg → 60 kg',
    bodyFat: '28% → 16%',
    beforeImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1584466977799-64b494c65e88?auto=format&fit=crop&w=800&q=80',
    quote: 'The coaches helped me reverse knee pain and drop 12kg of adipose tissue.',
  },
  {
    id: 10,
    name: 'Siddharth Bhatt',
    category: 'V-Taper & Shoulder Width',
    achievement: '+8 kg Deltoid Mass',
    duration: '20 Weeks',
    weightChange: '65 kg → 73 kg',
    bodyFat: '16% → 11%',
    beforeImage: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    quote: 'Strict lateral raises and heavy overhead pressing delivered dramatic shoulder caps.',
  },
  {
    id: 11,
    name: 'Aarav Sharma',
    category: 'Total Body Transformation',
    achievement: '-15 kg Body Fat',
    duration: '28 Weeks',
    weightChange: '88 kg → 73 kg',
    bodyFat: '25% → 12%',
    beforeImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&w=800&q=80',
    quote: 'Went from zero gym experience to benching 100kg and seeing full six-pack abs.',
  },
  {
    id: 12,
    name: 'Simran Walia',
    category: 'Glute & Posterior Chain',
    achievement: '+5 kg Lean Mass',
    duration: '16 Weeks',
    weightChange: '52 kg → 57 kg',
    bodyFat: '21% → 15%',
    beforeImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
    quote: 'Barbell hip thrusts and Romanian deadlifts completely transformed my athletic build.',
  },
];

// Single Transformation Card with zero-crop full-visibility photo stage & solid structured info footer
function TransformationCardItem({ item, index, onOpenLightbox }) {
  const [viewState, setViewState] = useState('after'); // 'before' | 'after'

  const currentImage = viewState === 'after'
    ? (item.afterImage || item.beforeImage)
    : (item.beforeImage || item.afterImage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
      className="snap-center md:snap-start shrink-0 w-[300px] sm:w-[340px] md:w-[360px] select-none touch-pan-x touch-pan-y"
      style={{ touchAction: 'pan-x pan-y' }}
    >
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 240, damping: 20 }}
        className="group relative w-full overflow-hidden bg-[#0b0b0e] border border-white/[0.08] hover:border-[#c5a880]/70 transition-all duration-300 shadow-cinematic hover:shadow-[0_0_25px_rgba(197,168,128,0.35)] flex flex-col"
      >
        {/* ================= DEDICATED TOP CONTROL BAR (Off the athlete's photo) ================= */}
        <div className="bg-[#0d0d11] border-b border-white/[0.08] px-4 py-2.5 flex items-center justify-between shrink-0 z-20">
          {/* Tactile Before / After Segmented Pill Switcher */}
          <div className="flex items-center bg-black/60 p-0.5 border border-white/10 rounded-sm">
            <button
              type="button"
              onClick={() => setViewState('before')}
              className={`px-3 py-1 text-[10px] uppercase tracking-wider font-mono font-bold transition-all duration-200 cursor-pointer ${
                viewState === 'before'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Before
            </button>
            <button
              type="button"
              onClick={() => setViewState('after')}
              className={`px-3 py-1 text-[10px] uppercase tracking-wider font-mono font-bold transition-all duration-200 cursor-pointer ${
                viewState === 'after'
                  ? 'bg-[#c5a880] text-black shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              After
            </button>
          </div>

          {/* Duration Badge & Lightbox Expand Button */}
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider bg-black/60 border border-[#c5a880]/30 text-[#e5c99e] font-semibold">
              {item.duration || '12 Weeks'}
            </span>
            <button
              type="button"
              onClick={() => onOpenLightbox(item)}
              title="Full View / Lightbox"
              aria-label="View Full Photos"
              className="w-7 h-7 bg-black/60 border border-white/15 hover:border-[#c5a880] text-gray-300 hover:text-[#c5a880] flex items-center justify-center transition-colors cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ================= ZERO-CROP FULL-VISIBILITY PHOTO STAGE (aspect-[3/4]) ================= */}
        <div
          onClick={() => onOpenLightbox(item)}
          className="relative w-full aspect-[3/4] overflow-hidden bg-black cursor-pointer flex items-center justify-center"
        >
          {/* Smart Zero-Crop Layering: Darkened Blurred Ambient Backdrop */}
          <img
            src={currentImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-35 brightness-50 pointer-events-none"
          />

          {/* Main Sharp Photo on Top (100% visible, zero cropping, zero dark body vignette) */}
          <AnimatePresence mode="wait">
            <motion.img
              key={viewState}
              src={currentImage}
              alt={`${item.name} - ${viewState}`}
              loading="lazy"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.4 }}
              transition={{ duration: 0.22 }}
              className="relative z-10 w-full h-full object-contain filter contrast-[1.04] group-hover:scale-[1.02] transition-transform duration-500"
            />
          </AnimatePresence>
        </div>

        {/* ================= STRUCTURED INFO FOOTER (Solid #0e0e12 Surface) ================= */}
        <div className="p-5 bg-[#0e0e12] border-t border-white/[0.08] flex-1 flex flex-col justify-between space-y-3.5">
          <div>
            {item.category && (
              <span className="text-[10px] uppercase tracking-ultra text-[#c5a880] font-bold block mb-1 font-sans truncate">
                {item.category}
              </span>
            )}
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white font-display truncate">
                {item.name}
              </h3>
              {item.achievement && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#c5a880]/15 text-[#e5c99e] border border-[#c5a880]/30 shrink-0">
                  <Award className="w-3 h-3 text-[#c5a880]" />
                  {item.achievement}
                </span>
              )}
            </div>
          </div>

          {/* Clean 2-column stats bar - ONLY render each stat if the value exists! */}
          {(Boolean(item.weightChange) || Boolean(item.bodyFat)) && (
            <div className="pt-2.5 border-t border-white/[0.08] grid grid-cols-2 gap-3 text-xs">
              {item.weightChange ? (
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-mono">
                    Weight Change
                  </span>
                  <span className="text-white font-semibold font-mono text-[11px]">
                    {item.weightChange}
                  </span>
                </div>
              ) : <div />}

              {item.bodyFat ? (
                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-mono">
                    Body Fat Shift
                  </span>
                  <span className="text-emerald-400 font-semibold font-mono text-[11px]">
                    {item.bodyFat}
                  </span>
                </div>
              ) : <div />}
            </div>
          )}

          {item.quote && (
            <p className="text-[11px] text-gray-400 font-light italic leading-relaxed line-clamp-2 pt-1 border-t border-white/[0.04]">
              "{item.quote}"
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Master TransformationsGallery Component with strictly horizontal scroll, snapping, and touch navigation
export default function TransformationsGallery({ items = [] }) {
  const scrollContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [lightboxItem, setLightboxItem] = useState(null);

  const allTransformations = items && items.length > 0 ? items : DEFAULT_TRANSFORMATIONS;

  const updateScrollState = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const maxScroll = scrollWidth - clientWidth;

    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < maxScroll - 20);

    if (maxScroll > 0) {
      setScrollProgress((scrollLeft / maxScroll) * 100);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();

    return () => container.removeEventListener('scroll', updateScrollState);
  }, []);

  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 380;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="transformations" className="py-24 sm:py-32 relative bg-black overflow-hidden selection:bg-[#c5a880] selection:text-black">
      {/* Ambient Lighting Spheres */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-[#c5a880]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#a07e4d]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* ==================== 1. EDITORIAL HEADER & NAVIGATION ==================== */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ type: 'spring', stiffness: 70, damping: 20 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] md:text-xs uppercase tracking-ultra text-[#a07e4d] dark:text-[#c5a880] font-bold block font-sans">
                Documented Trajectories • Verified Athletes
              </span>
              <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider font-mono font-bold bg-[#c5a880]/15 text-[#c5a880] border border-[#c5a880]/30">
                {allTransformations.length}+ Documented
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white font-display">
              Transformations
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <p className="text-xs sm:text-sm text-gray-400 max-w-sm font-light leading-relaxed">
              Every physique represents deliberate, data-driven adaptation at Joshiyara Road HQ. Swipe horizontally to view full gallery.
            </p>

            {/* Desktop Navigation Chevrons */}
            <div className="hidden sm:flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll Left"
                className="w-11 h-11 bg-[#111116] border border-white/10 hover:border-[#c5a880] text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#c5a880] hover:text-black shadow-sm cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                aria-label="Scroll Right"
                className="w-11 h-11 bg-[#111116] border border-white/10 hover:border-[#c5a880] text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#c5a880] hover:text-black shadow-sm cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ==================== 2. HORIZONTAL SCROLL CAROUSEL ==================== */}
      <div className="relative w-full">
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto overflow-y-visible overscroll-x-contain flex flex-nowrap gap-6 sm:gap-8 snap-x snap-proximity scroll-smooth no-scrollbar py-6 px-6 md:px-12 touch-pan-x touch-pan-y"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-x pan-y',
          }}
        >
          {allTransformations.map((item, index) => (
            <TransformationCardItem
              key={item._id || item.id || index}
              item={item}
              index={index}
              onOpenLightbox={(selected) => setLightboxItem(selected)}
            />
          ))}

          {/* End-of-Gallery Prompt Card */}
          <div className="snap-center md:snap-start shrink-0 w-72 sm:w-80 md:w-96 flex flex-col items-center justify-center p-8 bg-[#0b0b0e] border border-dashed border-[#c5a880]/40 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight text-white font-display">
              Begin Your Trajectory
            </h3>
            <p className="text-xs text-gray-400 font-light max-w-xs">
              Join the private roster at Joshiyara Road HQ and document your own transformation.
            </p>
            <a
              href="#membership"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#c5a880] text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
            >
              <span>Apply for Access</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ==================== 3. MOBILE SWIPE HINT & PROGRESS INDICATOR ==================== */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Subtle Horizontal Scroll Progress Bar */}
        <div className="flex-1 max-w-md">
          <div className="w-full h-1 bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-[#c5a880]"
              style={{ width: `${Math.max(scrollProgress, 8)}%` }}
              transition={{ ease: 'easeOut', duration: 0.15 }}
            />
          </div>
        </div>

        {/* Swipe Prompt */}
        <div className="flex items-center gap-3 text-gray-500 font-mono text-[11px] uppercase tracking-wider">
          <span className="sm:hidden">← Swipe Horizontally to Explore →</span>
          <span className="hidden sm:inline">Use Mouse Wheel / Arrow Keys / Click Chevrons</span>
        </div>
      </div>

      {/* ==================== 4. FULL-VIEW LIGHTBOX MODAL ==================== */}
      <AnimatePresence>
        {lightboxItem && (
          <div
            className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#0b0b0e] border border-[#c5a880]/50 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-auto"
            >
              {/* Lightbox Header */}
              <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#0e0e12]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#c5a880] font-bold">
                      VERIFIED ATHLETE SPOTLIGHT
                    </span>
                    {lightboxItem.duration && (
                      <span className="px-2 py-0.5 text-[9px] font-mono uppercase bg-white/10 text-gray-300 font-semibold">
                        {lightboxItem.duration}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white font-display mt-0.5">
                    {lightboxItem.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxItem(null)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Side-by-Side Photos Stage */}
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 bg-black">
                {/* Before Photo */}
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">
                      Phase 1 — Starting Baseline
                    </span>
                  </div>
                  <div className="relative aspect-[3/4] bg-[#0b0b0e] border border-white/10 overflow-hidden flex items-center justify-center">
                    {lightboxItem.beforeImage ? (
                      <img
                        src={lightboxItem.beforeImage}
                        alt={`${lightboxItem.name} Before`}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <span className="text-xs text-gray-600 font-mono">No before photo available</span>
                    )}
                  </div>
                </div>

                {/* After Photo */}
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#c5a880]">
                      Phase 2 — Documented Result
                    </span>
                  </div>
                  <div className="relative aspect-[3/4] bg-[#0b0b0e] border border-[#c5a880]/40 overflow-hidden flex items-center justify-center shadow-[0_0_25px_rgba(197,168,128,0.2)]">
                    {lightboxItem.afterImage ? (
                      <img
                        src={lightboxItem.afterImage}
                        alt={`${lightboxItem.name} After`}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <span className="text-xs text-gray-600 font-mono">No after photo available</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Lightbox Footer Stats */}
              <div className="p-4 sm:p-5 border-t border-white/10 bg-[#0e0e12] flex flex-wrap items-center justify-between gap-4 shrink-0">
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                  {lightboxItem.achievement && (
                    <div className="flex items-center gap-1.5 text-[#e5c99e]">
                      <Award className="w-4 h-4 text-[#c5a880]" />
                      <span className="font-bold">{lightboxItem.achievement}</span>
                    </div>
                  )}
                  {lightboxItem.weightChange && (
                    <div className="text-gray-300">
                      <span className="text-gray-500 mr-1.5 font-normal">WEIGHT:</span>
                      <span className="font-semibold text-white">{lightboxItem.weightChange}</span>
                    </div>
                  )}
                  {lightboxItem.bodyFat && (
                    <div className="text-emerald-400">
                      <span className="text-gray-500 mr-1.5 font-normal">BODY FAT:</span>
                      <span className="font-semibold">{lightboxItem.bodyFat}</span>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setLightboxItem(null)}
                  className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider transition-colors ml-auto cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
