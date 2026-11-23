import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import { getWhatsAppUrl, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../../config/siteConfig';

// Comprehensive array of 14+ Curated Pro Shop Products
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: 'Hydrolyzed Native Whey Isolate',
    edition: 'Formula No. 01 • Cold-Pressed',
    category: 'Nutrition',
    price: '₹5,499',
    details: '94% purity cold-pressed grass-fed isolate with bioactive enzymatic absorption matrix.',
    image: '/assets/product-1.jpg',
    status: 'In Stock',
    badge: 'Best Seller',
  },
  {
    id: 2,
    name: 'Architect Leather Lever Belt (11mm)',
    edition: 'Hand-Crafted English Bridle',
    category: 'Equipment',
    price: '₹8,999',
    details: 'Full-grain English bridle leather with micro-adjustable matte blackened zinc lever.',
    image: '/assets/product-2.jpg',
    status: 'Limited Stock',
    badge: 'IPF Approved',
  },
  {
    id: 3,
    name: 'Heavy French Terry Oversized Hoodie',
    edition: '520 GSM Minimalist Silhouette',
    category: 'Apparel',
    price: '₹4,200',
    details: 'Drop-shoulder structure with tonal embossed emblem and dense double-knit cuffs.',
    image: '/assets/product-3.jpg',
    status: 'In Stock',
    badge: 'Member Favorite',
  },
  {
    id: 4,
    name: 'Pure Micronized Creapure & Minerals',
    edition: 'Elemental Bioactive Complex',
    category: 'Nutrition',
    price: '₹2,199',
    details: 'Pharmaceutical grade creatine monohydrate combined with bioactive chelated electrolytes.',
    image: '/assets/product-4.jpg',
    status: 'In Stock',
    badge: 'Certified Clean',
  },
  {
    id: 5,
    name: '7mm Extreme Neoprene Knee Sleeves',
    edition: 'High-Rebound Compression Fit',
    category: 'Equipment',
    price: '₹3,850',
    details: 'Anatomical contoured dual-stitching providing unmatched warmth and joint stabilization.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    status: 'In Stock',
    badge: 'Heavy Lifting',
  },
  {
    id: 6,
    name: 'Matte Vantablack Steel Shaker (750ml)',
    edition: 'Insulated Double-Wall Stainless',
    category: 'Equipment',
    price: '₹1,699',
    details: 'Vacuum-sealed kitchen-grade stainless steel keeping shakes ice cold for 24 hours.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    status: 'In Stock',
    badge: 'Essential',
  },
  {
    id: 7,
    name: 'Titan High-Stim Pre-Workout Matrix',
    edition: 'Neuromuscular Focus Compound',
    category: 'Nutrition',
    price: '₹3,499',
    details: 'Clinically dosed L-Citrulline, Beta-Alanine, and Alpha-GPC for intense vascular pumps.',
    image: 'https://images.unsplash.com/photo-1584466977799-64b494c65e88?auto=format&fit=crop&w=800&q=80',
    status: 'In Stock',
    badge: 'High Performance',
  },
  {
    id: 8,
    name: 'Reinforced Cotton Heavy Lifting Straps',
    edition: 'Industrial Webbing Stitch',
    category: 'Equipment',
    price: '₹999',
    details: 'Extra-long 1.5 inch heavy cotton with neoprene wrist padding for max overload pulling.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    status: 'In Stock',
    badge: 'Overload Gear',
  },
  {
    id: 9,
    name: 'Drop-Shoulder Acid Wash Pump Cover',
    edition: '280 GSM Vintage Heavy Jersey',
    category: 'Apparel',
    price: '₹2,499',
    details: 'Pre-shrunk luxury cotton with custom distressed wash and golden crest embroidery.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    status: 'In Stock',
    badge: 'Streetwear Cut',
  },
  {
    id: 10,
    name: 'Deep Tissue Percussion Massager Gun',
    edition: 'Brushless High-Torque Motor',
    category: 'Equipment',
    price: '₹7,999',
    details: '16mm amplitude percussive therapy with 6 precision titanium-alloy interchangeable heads.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    status: 'Low Stock',
    badge: 'Recovery Pro',
  },
  {
    id: 11,
    name: 'Fermented Plant BCAA + Glutamine',
    edition: 'Intra-Workout Hydration',
    category: 'Nutrition',
    price: '₹2,799',
    details: '2:1:1 instantaneous amino ratio with Himalayan pink salt electrolytes for muscular endurance.',
    image: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=800&q=80',
    status: 'In Stock',
    badge: 'Zero Sugar',
  },
  {
    id: 12,
    name: 'TFC Military Heavy Duffel Bag (55L)',
    edition: 'Cordura 1000D Tactical Build',
    category: 'Apparel',
    price: '₹4,899',
    details: 'Weatherproof ballistic nylon with ventilated shoe chamber and dedicated lifting belt holster.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    status: 'In Stock',
    badge: 'Durability Guaranteed',
  },
  {
    id: 13,
    name: 'Ultra-Pure Magnesium Gym Chalk (8 Pack)',
    edition: 'Pharmaceutical Grade Block',
    category: 'Equipment',
    price: '₹799',
    details: '100% pure magnesium carbonate without toxic fillers, providing instantaneous dry grip.',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    status: 'In Stock',
    badge: 'Max Friction',
  },
  {
    id: 14,
    name: 'Compression Athletic Performance Shorts',
    edition: 'Four-Way Stretch Aeroflex',
    category: 'Apparel',
    price: '₹1,999',
    details: 'Built-in phone compression liner with laser-perforated cooling panels for mobility.',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
    status: 'In Stock',
    badge: 'Anti-Chafe',
  },
];

// Helper to auto-format price with ₹ prefix if missing
function formatPrice(price) {
  if (!price) return '₹0';
  const str = String(price).trim();
  if (str.startsWith('₹') || str.startsWith('Rs') || str.startsWith('INR')) {
    return str;
  }
  const cleanNum = parseFloat(str.replace(/[^0-9.]/g, ''));
  if (!isNaN(cleanNum)) {
    return `₹${cleanNum.toLocaleString('en-IN')}`;
  }
  return `₹${str}`;
}

// Single Product Card with Balanced Luxury Retail Layout
function ProductCardItem({ product, index }) {
  const [isHovered, setIsHovered] = useState(false);

  const formattedPrice = formatPrice(product.price);

  const handleInquire = () => {
    const url = getWhatsAppUrl(
      `Hello The Fitness Club, I would like to inquire about purchasing: ${product.name} (${formattedPrice}).`
    );
    window.open(url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.4) }}
      className="snap-center md:snap-start shrink-0 w-72 sm:w-80 md:w-96 select-none touch-pan-x touch-pan-y"
      style={{ touchAction: 'pan-x pan-y' }}
    >
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 240, damping: 20 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative w-full h-full min-h-[460px] overflow-hidden bg-[#0b0b0e] border border-white/[0.08] hover:border-[#c5a880]/70 transition-all duration-300 shadow-cinematic hover:shadow-[0_0_25px_rgba(197,168,128,0.35)] flex flex-col justify-between"
      >
        {/* Studio Product Stage (h-60 sm:h-64 w-full shrink-0) */}
        <div className="relative h-60 sm:h-64 w-full shrink-0 flex items-center justify-center p-5 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.12)_0%,#111116_55%,#09090c_100%)] overflow-hidden">
          <motion.div
            animate={{ scale: isHovered ? 1.06 : 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            className="w-full h-full flex items-center justify-center"
          >
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="max-h-full max-w-full object-contain filter contrast-[1.05] drop-shadow-[0_18px_30px_rgba(0,0,0,0.85)] transition-all duration-500"
            />
          </motion.div>

          {/* Top Badges */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-20">
            <span className="px-2.5 py-1 text-[9px] uppercase tracking-wider text-gray-300 bg-black/75 backdrop-blur-md border border-white/10 font-bold font-mono">
              {product.category}
            </span>
            <span className="px-2.5 py-1 text-[9px] uppercase tracking-wider text-[#e5c99e] bg-[#c5a880]/15 backdrop-blur-md border border-[#c5a880]/30 font-bold font-mono">
              {product.badge || product.status || 'In Stock'}
            </span>
          </div>
        </div>

        {/* Always-Visible Product Info Block */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-[#0b0b0e]">
          <div className="space-y-1.5">
            {product.edition && (
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono font-medium block truncate">
                {product.edition}
              </span>
            )}
            <h3 className="text-base sm:text-lg font-bold uppercase tracking-tight text-white group-hover:text-[#c5a880] transition-colors line-clamp-1 font-display">
              {product.name}
            </h3>
            {product.details && (
              <p className="text-xs text-gray-400 font-light leading-relaxed line-clamp-2">
                {product.details}
              </p>
            )}
          </div>

          {/* Bottom divider + Price & Action Row */}
          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-3">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono block">
                Price
              </span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-[#c5a880]">
                {formattedPrice}
              </span>
            </div>

            <button
              type="button"
              onClick={handleInquire}
              className="px-4 py-2 bg-[#c5a880] hover:bg-white text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer shrink-0"
            >
              <span>Inquire</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-black" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Master ProductsSection with horizontal snap scroll, category filtering, and desktop navigation
export default function ProductsSection({ products = [] }) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const scrollContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const allProducts = products && products.length > 0 ? products : DEFAULT_PRODUCTS;

  const categories = ['ALL', 'NUTRITION', 'EQUIPMENT', 'APPAREL'];

  const filteredProducts =
    activeCategory === 'ALL'
      ? allProducts
      : allProducts.filter((p) => p.category?.toUpperCase() === activeCategory);

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
  }, [filteredProducts]);

  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 380;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="products" className="py-24 sm:py-32 relative bg-black overflow-hidden selection:bg-[#c5a880] selection:text-black">
      {/* Ambient Lighting Spheres */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#c5a880]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-[#a07e4d]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* ==================== 1. EDITORIAL HEADER & FILTERS ==================== */}
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
                Curated Arsenal • Physical Performance
              </span>
              <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider font-mono font-bold bg-[#c5a880]/15 text-[#c5a880] border border-[#c5a880]/30">
                {filteredProducts.length} Items
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white font-display">
              The Pro Shop
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            {/* Minimalist Filter Navigation */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    if (scrollContainerRef.current) {
                      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                    }
                  }}
                  className={`px-4 py-2 text-[11px] uppercase tracking-widest font-mono font-semibold transition-all duration-300 border cursor-pointer ${
                    activeCategory === cat
                      ? 'border-[#c5a880] bg-[#c5a880] text-black shadow-sm font-bold'
                      : 'border-white/10 text-gray-400 hover:text-white hover:border-white/30 bg-[#0e0e12]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Desktop Navigation Chevrons */}
            <div className="hidden sm:flex items-center gap-2">
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

      {/* ==================== 2. HORIZONTAL SNAP CAROUSEL ==================== */}
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
          {filteredProducts.map((product, index) => (
            <ProductCardItem key={product._id || product.id || index} product={product} index={index} />
          ))}

          {/* End-of-Arsenal Custom Order Card */}
          <div
            className="snap-center md:snap-start shrink-0 w-72 sm:w-80 md:w-96 flex flex-col items-center justify-center p-8 bg-[#0b0b0e] border border-dashed border-[#c5a880]/40 text-center space-y-4 touch-pan-x touch-pan-y"
            style={{ touchAction: 'pan-x pan-y' }}
          >
            <div className="w-14 h-14 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880]">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight text-white font-display">
              Custom Gear Order
            </h3>
            <p className="text-xs text-gray-400 font-light max-w-xs">
              Need custom weight belts, oversized apparel drops, or bulk nutrition orders for Joshiyara Road HQ?
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1 w-full justify-center">
              <a
                href={getWhatsAppUrl('Hi The Fitness Club, I would like to place a custom order for pro shop gear.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#c5a880] text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors w-full sm:w-auto"
              >
                <span>WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] text-white text-xs font-bold uppercase tracking-widest hover:opacity-95 transition-opacity w-full sm:w-auto shadow-[0_0_15px_rgba(220,39,67,0.4)]"
              >
                <span>Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== 3. SCROLL PROGRESS INDICATOR & SWIPE HINT ==================== */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Progress Bar */}
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
          <span className="sm:hidden">← Swipe Horizontally to Explore Products →</span>
          <span className="hidden sm:inline">Use Mouse Wheel / Click Chevrons to Browse Gear</span>
        </div>
      </div>

      {/* ==================== 4. GLOWING FLOATING INSTAGRAM SHOWCASE ==================== */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 sm:mt-16">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="relative group"
        >
          {/* Multi-Layered Instagram Sunrise & Champagne Gold Aura Glow (Floating Pulsing Effect) */}
          <motion.div
            animate={{
              scale: [1, 1.025, 1],
              opacity: [0.35, 0.6, 0.35],
            }}
            transition={{
              repeat: Infinity,
              duration: 3.5,
              ease: 'easeInOut',
            }}
            className="absolute -inset-1.5 bg-gradient-to-r from-[#f09433] via-[#dc2743] via-[#bc1888] to-[#c5a880] rounded-3xl blur-2xl group-hover:opacity-95 transition-opacity duration-700 pointer-events-none"
          />

          {/* Floating Levitating Interactive Container */}
          <motion.a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            animate={{ y: [0, -8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: 'easeInOut',
            }}
            whileHover={{ scale: 1.015, y: -12 }}
            whileTap={{ scale: 0.985 }}
            className="relative block w-full bg-gradient-to-br from-[#121217] via-[#0d0d11] to-[#070709] border border-white/15 hover:border-[#c5a880] p-6 sm:p-9 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.85)] overflow-hidden cursor-pointer transition-all duration-300"
          >
            {/* Background Decorative Radial Shimmer */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-gradient-to-br from-[#dc2743]/20 via-[#bc1888]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-[#c5a880]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
              {/* Left Column: Floating Glowing Instagram Icon + Copy */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-5 sm:gap-6 text-center sm:text-left">
                {/* 3D Levitating Instagram Badge */}
                <div className="relative shrink-0">
                  {/* Outer Pulsing Glow Halo */}
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.95, 0.6] }}
                    transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                    className="absolute -inset-2 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] rounded-2xl blur-lg"
                  />

                  {/* Main Instagram Gradient Cube */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-[2.5px] shadow-[0_0_35px_rgba(220,39,67,0.65)] flex items-center justify-center transform group-hover:rotate-3 transition-transform duration-300">
                    <div className="w-full h-full rounded-[14px] bg-[#0b0b0e]/85 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-transparent transition-colors duration-300">
                      {/* High-Definition Official Instagram Glyphs */}
                      <svg
                        className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </div>
                  </div>

                  {/* Live Status Pulse Dot */}
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-black" />
                  </span>
                </div>

                {/* Typography & Offerings Details */}
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a880] font-bold">
                      OFFICIAL PRO SHOP INSTAGRAM
                    </span>
                    <span className="px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-wider bg-white/10 text-white rounded-full border border-white/15 font-semibold">
                      {INSTAGRAM_HANDLE}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white font-display group-hover:text-[#c5a880] transition-colors">
                    Iconic Threads <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888]">Pro Shop</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                    Exclusive Oversized Streetwear Drops • Hydrolyzed Native Whey • Micronized Creapure Creatine • Heavy Lifting Accessories
                  </p>

                  <span className="inline-block text-[11px] font-mono text-[#c5a880] pt-0.5">
                    Tap to view new arrivals, sizing guides & DM orders on Instagram →
                  </span>
                </div>
              </div>

              {/* Right Column: Floating Magnetic Action Button */}
              <div className="shrink-0 flex items-center">
                <div className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] text-white font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2.5 shadow-[0_0_30px_rgba(220,39,67,0.55)] group-hover:shadow-[0_0_45px_rgba(220,39,67,0.85)] group-hover:scale-105 transition-all">
                  <svg
                    className="w-4 h-4 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <span>Explore Drops</span>
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
