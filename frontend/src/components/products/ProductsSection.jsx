import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ShoppingBag,
} from 'lucide-react';
import { getWhatsAppUrl, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../../config/siteConfig';

// Comprehensive array of 14+ Curated Pro Shop Products
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: 'Hydrolyzed Native Whey Isolate',
    edition: '2kg • 66 Servings • Cold-Pressed',
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
    edition: '11mm Thickness • Heavy Bridle Leather',
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
    edition: '520 GSM • Drop-Shoulder Silhouette',
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
    edition: '250g • 83 Servings • Unflavoured',
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
    edition: '7mm Neoprene • IPF Spec Compression',
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
    edition: '750ml • Kitchen-Grade Steel',
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
    edition: '300g • 30 Servings • Max Vascularity',
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
    edition: '1.5 Inch Heavy Webbing • Neoprene Padded',
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
    edition: '280 GSM • Vintage Heavy Jersey',
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
    edition: '16mm Stroke • 6 Titanium Heads',
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
    edition: '400g • 40 Servings • Electrolytes',
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
    edition: '55L Capacity • Cordura 1000D Tactical',
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
    edition: '8 Blocks • 100% Pure Magnesium',
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
    edition: 'Aeroflex Liner • Laser Perforated',
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

  // Split edition into clean spec tags if present
  const specTags = product.edition
    ? product.edition
        .split(/[•|,]+/)
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const hasDetails = Boolean(product.details && product.details.trim());

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
        className="group relative w-full h-full overflow-hidden bg-[#0b0b0e] border border-white/[0.08] hover:border-[#c5a880]/70 transition-all duration-300 shadow-cinematic hover:shadow-[0_0_25px_rgba(197,168,128,0.35)] flex flex-col justify-between"
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

        {/* Rich, Always-Visible Info Block (p-5 flex-1 flex flex-col gap-3) */}
        <div className="p-5 flex-1 flex flex-col justify-between bg-[#0b0b0e]">
          <div className="space-y-2.5">
            {/* Product Title */}
            <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white group-hover:text-[#c5a880] transition-colors font-display line-clamp-1">
              {product.name}
            </h3>

            {/* Pack Size / Spec Pills */}
            {specTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {specTags.map((spec, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider bg-white/[0.04] text-[#c5a880] border border-[#c5a880]/20 rounded-sm"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            )}

            {/* Product Specifications / Description */}
            <p className="text-xs sm:text-[13px] text-gray-300 leading-relaxed line-clamp-3 font-light">
              {hasDetails
                ? product.details
                : specTags.length === 0
                ? 'Available directly at The Fitness Club Pro Shop, Joshiyara Road HQ.'
                : ''}
            </p>
          </div>

          {/* Bottom Price & Action Bar (mt-auto pt-4 border-t border-white/[0.08] flex items-center justify-between) */}
          <div className="mt-4 pt-3.5 border-t border-white/[0.08] flex items-center justify-between gap-3">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono block">
                Price
              </span>
              <span className="text-2xl font-mono font-bold text-[#c5a880]">
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
  const [isBannerHovered, setIsBannerHovered] = useState(false);

  const allProducts = products && products.length > 0 ? products : DEFAULT_PRODUCTS;

  // Sourcing Lookbook Images for Fan preview
  const fallbackImages = ['/assets/product-1.jpg', '/assets/product-2.jpg', '/assets/product-3.jpg'];
  const lookbookImages = [0, 1, 2].map((i) => allProducts[i]?.image || fallbackImages[i]);

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
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-black/60 border border-white/20 text-white hover:border-[#c5a880] hover:text-[#c5a880] text-xs font-bold uppercase tracking-widest transition-colors w-full sm:w-auto"
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

      {/* ==================== 4. LUXURY EDITORIAL LOOKBOOK INSTAGRAM BANNER ==================== */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 sm:mt-16">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="relative group"
          onMouseEnter={() => setIsBannerHovered(true)}
          onMouseLeave={() => setIsBannerHovered(false)}
        >
          {/* Subtle Ambient Gold Radial Glow (No loud neon/pink!) */}
          <div className="absolute -inset-1 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.18)_0%,rgba(197,168,128,0.05)_50%,transparent_80%)] rounded-3xl blur-2xl group-hover:opacity-100 opacity-60 transition-opacity duration-700 pointer-events-none" />

          {/* Full-width obsidian card */}
          <div className="relative w-full bg-gradient-to-br from-[#111116] via-[#0b0b0e] to-[#08080a] border border-[#c5a880]/25 group-hover:border-[#c5a880]/60 p-7 sm:p-10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-500">
            {/* Subtle background luxury accents */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#c5a880]/[0.04] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#c5a880]/[0.05] rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
              {/* Left Column (Editorial Copy & CTA) */}
              <div className="flex-1 space-y-4 text-center lg:text-left">
                {/* Subtle gold eyebrow pill with clean monochrome Instagram icon */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] border border-[#c5a880]/30 rounded-full">
                  <svg
                    className="w-3.5 h-3.5 text-[#c5a880]"
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
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#e5c99e] font-semibold">
                    OFFICIAL PRO SHOP • @ICONICTHREADS.UK
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white font-display">
                    ICONIC THREADS
                  </h3>
                  <p className="text-xs sm:text-sm font-mono tracking-widest text-[#c5a880] uppercase font-semibold">
                    CURATED DROPS & NUTRITION
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-xl">
                  Oversized gym streetwear, verified supplements & heavy lifting gear — daily drops and direct DM orders.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#c5a880] hover:bg-white text-black font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-[0_0_20px_rgba(197,168,128,0.25)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] cursor-pointer"
                  >
                    <span>VIEW ON INSTAGRAM</span>
                    <ArrowUpRight className="w-4 h-4 text-black" />
                  </a>

                  <span className="text-[11px] font-mono text-gray-400">
                    Direct Orders via Instagram DM
                  </span>
                </div>
              </div>

              {/* Right Column (Animated 3-Card Lookbook Fan) */}
              <div className="relative w-full lg:w-auto flex items-center justify-center py-6 sm:py-8 lg:py-0 px-4">
                <div className="relative w-64 sm:w-72 md:w-80 h-52 sm:h-60 flex items-center justify-center">
                  {/* Card 0 (Left Fan Card) */}
                  <motion.div
                    animate={
                      isBannerHovered
                        ? { x: -65, y: -4, rotate: -10, scale: 0.95 }
                        : { x: -35, y: 6, rotate: -6, scale: 0.9 }
                    }
                    transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                    className="absolute w-32 sm:w-36 md:w-40 aspect-[4/5] rounded-xl bg-[#0e0e12] border border-[#c5a880]/30 shadow-2xl overflow-hidden p-2 flex items-center justify-center z-10 pointer-events-none"
                  >
                    <div className="w-full h-full rounded-lg bg-black/60 overflow-hidden flex items-center justify-center">
                      <img
                        src={lookbookImages[0]}
                        alt="Lookbook 1"
                        className="w-full h-full object-contain filter contrast-[1.04]"
                      />
                    </div>
                  </motion.div>

                  {/* Card 2 (Right Fan Card) */}
                  <motion.div
                    animate={
                      isBannerHovered
                        ? { x: 65, y: -4, rotate: 10, scale: 0.95 }
                        : { x: 35, y: 6, rotate: 6, scale: 0.9 }
                    }
                    transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                    className="absolute w-32 sm:w-36 md:w-40 aspect-[4/5] rounded-xl bg-[#0e0e12] border border-[#c5a880]/30 shadow-2xl overflow-hidden p-2 flex items-center justify-center z-10 pointer-events-none"
                  >
                    <div className="w-full h-full rounded-lg bg-black/60 overflow-hidden flex items-center justify-center">
                      <img
                        src={lookbookImages[2]}
                        alt="Lookbook 3"
                        className="w-full h-full object-contain filter contrast-[1.04]"
                      />
                    </div>
                  </motion.div>

                  {/* Card 1 (Center Front Card with Idle Float) */}
                  <motion.div
                    animate={
                      isBannerHovered
                        ? { y: -12, scale: 1.05, rotate: 0 }
                        : { y: [0, -6, 0], scale: 1, rotate: 0 }
                    }
                    transition={
                      isBannerHovered
                        ? { type: 'spring', stiffness: 220, damping: 22 }
                        : { repeat: Infinity, duration: 3.5, ease: 'easeInOut' }
                    }
                    className="relative w-36 sm:w-40 md:w-44 aspect-[4/5] rounded-xl bg-[#14141a] border border-[#c5a880]/60 shadow-[0_15px_35px_rgba(0,0,0,0.9)] overflow-hidden p-2.5 flex flex-col justify-between z-20"
                  >
                    <div className="w-full flex-1 rounded-lg bg-black/70 overflow-hidden flex items-center justify-center relative">
                      <img
                        src={lookbookImages[1]}
                        alt="Lookbook 2"
                        className="w-full h-full object-contain filter contrast-[1.06]"
                      />
                    </div>
                    <div className="mt-2 py-0.5 px-2 bg-black/80 backdrop-blur-md border border-[#c5a880]/30 text-center rounded">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#e5c99e] font-semibold truncate block">
                        @iconicthreads.uk
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
