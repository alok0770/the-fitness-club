import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, ArrowUpRight } from 'lucide-react';
import { getWhatsAppUrl } from '../../config/siteConfig';

/**
 * ============================================================================
 * EVENTS_DATA — EDITORIAL INVITATIONAL MEETS & SQUAD GATHERINGS
 * ============================================================================
 * HOW TO SWAP WITH REAL GYM PHOTOS:
 * To replace these documentary photos with your own real gym shots, simply
 * drop your images into `frontend/public/images/events/` named:
 *   - /images/events/event-1.jpg (Iron Clash: Deadlift & PR Night)
 *   - /images/events/event-2.jpg (Strength & Grip Challenge)
 *   - /images/events/event-3.jpg (The Fitness Club: Squad Night)
 *   - /images/events/event-4.jpg (Sunday Outdoor Conditioning)
 *
 * All 4 photos are rendered through a unified 35mm editorial CSS grading
 * filter, so new real gym photos automatically inherit the moody, high-contrast,
 * low-saturation documentary aesthetic without touching any layout code.
 * ============================================================================
 */
export const EVENTS_DATA = [
  {
    id: 'iron-clash',
    title: 'Iron Clash: Deadlift & PR Night',
    tag: 'STRENGTH MEET',
    caption: 'Heavy iron, raw chalk, and personal records under the lights.',
    image: '/images/events/event-1.jpg',
    fallbackImage:
      'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?auto=format&fit=crop&w=1600&q=85',
  },
  {
    id: 'strength-grip-challenge',
    title: 'Strength & Grip Challenge',
    tag: 'COMMUNITY SHOWDOWN',
    caption: 'Monthly head-to-head endurance and grip battles for the squad.',
    image: '/images/events/event-2.jpg',
    fallbackImage:
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1600&q=85',
  },
  {
    id: 'squad-night',
    title: 'The Fitness Club: Squad Night',
    tag: 'CLUB CELEBRATION',
    caption: 'Celebrating milestones, anniversaries, and the people who build this floor.',
    image: '/images/events/event-3.jpg',
    fallbackImage:
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1600&q=85',
  },
  {
    id: 'outdoor-conditioning',
    title: 'Sunday Outdoor Conditioning',
    tag: 'OUTDOOR RUN CLUB',
    caption: 'Sunrise sprints and recovery sessions beyond the gym walls.',
    image: '/images/events/event-4.jpg',
    fallbackImage:
      'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1600&q=85',
  },
];

// Single Event Card with 35mm Documentary Filter and Spring Hover Glow
function EventCardItem({ event, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4) }}
      className="snap-center md:snap-start shrink-0 w-80 sm:w-96 md:w-[440px] select-none touch-pan-x touch-pan-y"
      style={{ touchAction: 'pan-x pan-y' }}
    >
      <motion.article
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 240, damping: 20 }}
        className="group relative aspect-[16/10] w-full overflow-hidden bg-[#0b0b0e] border border-white/10 hover:border-[#c5a880]/60 transition-all duration-300 shadow-cinematic hover:shadow-[0_0_25px_rgba(197,168,128,0.25)] flex flex-col justify-between"
      >
        {/* 35mm Raw Documentary Image with Unified CSS Grading */}
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          onError={(e) => {
            if (event.fallbackImage && e.currentTarget.src !== event.fallbackImage) {
              e.currentTarget.src = event.fallbackImage;
            }
          }}
          className="w-full h-full object-cover object-center grayscale-[30%] contrast-[1.08] brightness-[0.85] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105"
        />

        {/* Cinematic Vantablack Multi-Stop Gradient Masks */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0e] via-[#0b0b0e]/45 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Top-Left Subtle Gold Pill Tag */}
        <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/75 backdrop-blur-md border border-[#c5a880]/30 text-[9px] sm:text-[10px] uppercase tracking-widest font-mono font-bold text-[#c5a880] shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-pulse" />
            {event.tag}
          </span>
        </div>

        {/* Bottom-Left Anchored Title & 1-Line Caption */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 z-20 flex flex-col justify-end">
          <h3 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-white font-display group-hover:text-[#c5a880] transition-colors duration-300">
            {event.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 font-light mt-1.5 leading-relaxed line-clamp-2 max-w-xl">
            {event.caption}
          </p>
        </div>
      </motion.article>
    </motion.div>
  );
}

export default function InvitationalEvents({ events = [] } = {}) {
  const displayEvents = events && events.length > 0 ? events : EVENTS_DATA;
  const scrollContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
    const scrollAmount = 440;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="events"
      className="py-20 sm:py-28 relative bg-[#0b0b0e] overflow-hidden selection:bg-[#c5a880] selection:text-black"
    >


      {/* Subtle Warm Gold Ambient Radiances */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#c5a880]/5 rounded-full blur-[180px] pointer-events-none" />

      {/* ==================== 1. EDITORIAL HEADER & SCROLL CHEVRONS ==================== */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8 sm:mb-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] md:text-xs uppercase tracking-ultra text-[#a07e4d] dark:text-[#c5a880] font-bold block font-sans">
                Joshiyara Road HQ • Uttarkashi
              </span>
              <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider font-mono font-bold bg-[#c5a880]/15 text-[#c5a880] border border-[#c5a880]/30">
                Raw Documentary
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-display">
              Invitational Events
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <p className="hidden lg:block text-xs text-gray-400 font-light max-w-sm leading-relaxed text-right">
              Authentic moments captured on the training floor. Sanctioned power meets, squad challenges, and sunrise conditioning.
            </p>

            {/* Desktop Left / Right Navigation Chevrons */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll Left"
                className="w-11 h-11 bg-[#111116] border border-white/10 hover:border-[#c5a880] text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#c5a880] hover:text-black shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                aria-label="Scroll Right"
                className="w-11 h-11 bg-[#111116] border border-white/10 hover:border-[#c5a880] text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#c5a880] hover:text-black shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ==================== 2. STRICTLY HORIZONTAL SNAP-SCROLL CONTAINER ==================== */}
      <div className="relative w-full">
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto overflow-y-visible overscroll-x-contain flex flex-nowrap gap-6 sm:gap-8 snap-x snap-proximity scroll-smooth no-scrollbar py-4 px-6 md:px-12 touch-pan-x touch-pan-y"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-x pan-y',
          }}
        >
          {displayEvents.map((event, index) => (
            <EventCardItem key={event._id || event.id || index} event={event} index={index} />
          ))}

          {/* End-of-Carousel Host Sanctioned Meet Card */}
          <div
            className="snap-center md:snap-start shrink-0 w-80 sm:w-96 md:w-[440px] aspect-[16/10] flex flex-col items-center justify-center p-8 bg-[#0b0b0e] border border-dashed border-[#c5a880]/40 text-center space-y-3.5 select-none touch-pan-x touch-pan-y"
            style={{ touchAction: 'pan-x pan-y' }}
          >
            <div className="w-12 h-12 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880]">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight text-white font-display">
              Sanction a Private Meet
            </h3>
            <p className="text-xs text-gray-400 font-light max-w-xs leading-relaxed">
              Host a sanctioned tournament or private clinic at Joshiyara Road HQ.
            </p>
            <a
              href={getWhatsAppUrl('Hello The Fitness Club, I would like to inquire about hosting a sanctioned meet or event.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#c5a880] text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
            >
              <span>Sanction Event</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ==================== 3. PROGRESS INDICATOR & SWIPE HINT ==================== */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Subtle Horizontal Scroll Progress Bar */}
        <div className="flex-1 max-w-md">
          <div className="w-full h-1 bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-[#c5a880]"
              style={{ width: `${Math.max(scrollProgress, 25)}%` }}
              transition={{ ease: 'easeOut', duration: 0.15 }}
            />
          </div>
        </div>

        {/* Swipe Prompt */}
        <div className="flex items-center gap-3 text-gray-500 font-mono text-[11px] uppercase tracking-wider">
          <span className="sm:hidden">← Swipe Horizontally to View All Meets →</span>
          <span className="hidden sm:inline">Use Mouse Wheel / Click Chevrons to Explore Meets</span>
        </div>
      </div>
    </section>
  );
}
