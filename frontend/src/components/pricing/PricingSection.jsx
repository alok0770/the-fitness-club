import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';
import { PLANS_DATA } from '../../data/plansData';
import { getWhatsAppUrl } from '../../config/siteConfig';

export default function PricingSection({ plans: propPlans } = {}) {
  const [plans, setPlans] = useState(propPlans && propPlans.length > 0 ? propPlans : PLANS_DATA);
  const [cardioIncluded, setCardioIncluded] = useState(false);
  const scrollContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Horizontal Scroll Handling
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

  // Sync when propPlans changes from bootstrap
  useEffect(() => {
    if (propPlans && propPlans.length > 0) {
      setPlans(propPlans);
    }
  }, [propPlans]);

  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 380;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // WhatsApp Enrollment Inquiry Action (strictly 8266060510)
  const handleInquirePlan = (plan, calculatedPrice) => {
    const duration = Number(plan.durationMonths) || 1;
    const durationStr = duration === 1 ? '1-Month' : `${duration}-Month`;
    const message = `Hello The Fitness Club, I would like to enroll in the ${plan.name} (${
      cardioIncluded
        ? `₹${calculatedPrice.toLocaleString('en-IN')} with Cardio`
        : `₹${calculatedPrice.toLocaleString('en-IN')} Standard`
    } for ${durationStr}).`;
    window.open(getWhatsAppUrl(message), '_blank');
  };

  // Dynamic Highlighting & Math Utilities
  const maxDuration = plans.length > 0
    ? Math.max(...plans.map((p) => Number(p.durationMonths) || 1))
    : 12;

  const singleMonthPlan = plans.find((p) => (Number(p.durationMonths) || 1) === 1);
  const baseMonthlyPrice = singleMonthPlan ? Number(singleMonthPlan.price) : 1000;

  // Build luxury features list per plan
  const getPlanFeatures = (plan, duration, isVip) => {
    const features = [];

    if (plan.featuresSummary && plan.featuresSummary.trim()) {
      const parts = plan.featuresSummary
        .split(/[,;\n•]+/)
        .map((s) => s.trim())
        .filter(Boolean);
      features.push(...parts);
    }

    features.push('Full Sanctum & Heavy Iron Access');
    features.push('Calibrated Kilo Plates & Squat Racks');
    features.push(
      cardioIncluded
        ? 'Commercial Treadmills & Cardio Machines'
        : 'Standard Warm-Up Equipment Only'
    );
    features.push('Biometric 24/7 RFID Gate Access');
    features.push('Private Locker & Shower Facilities');

    if (duration >= 3) {
      features.push('Personalized Progressive Overload Protocol');
    }
    if (duration >= 6) {
      features.push('Biomechanical Technique Review');
      features.push('2 Complimentary Athlete Guest Passes');
    }
    if (duration >= 12 || isVip) {
      features.push('Quarterly Body Composition Scans');
      features.push('Permanent VIP Reserved Locker Option');
    }

    return Array.from(new Set(features)).slice(0, 6);
  };

  const getTierSubtitle = (duration, planTier) => {
    if (duration === 1) return 'Flexible Monthly Access';
    if (duration === 3) return 'Quarterly Foundation';
    if (duration === 6) return 'Semi-Annual Conditioning';
    if (duration >= 12) return 'The Titan Annual Pass';
    if (planTier) return planTier.replace(/_/g, ' ');
    return `${duration}-Month Membership`;
  };

  return (
    <section
      id="membership"
      className="py-24 sm:py-32 relative bg-black overflow-hidden selection:bg-[#c5a880] selection:text-black"
    >


      {/* Ambient Lighting Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#c5a880]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#a07e4d]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 mb-10 sm:mb-12">
        {/* ==================== 1. EDITORIAL HEADER & CONTROLS ==================== */}
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
                Transparent Pricing • Joshiyara Road HQ
              </span>
              <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider font-mono font-bold bg-[#c5a880]/15 text-[#c5a880] border border-[#c5a880]/30">
                Zero Admission Fees
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white font-display">
              Membership Tiers
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Premium Cardio Access Switcher */}
            <div className="inline-flex p-1 bg-[#111116] border border-white/10 rounded-full shadow-inner relative">
              <button
                type="button"
                onClick={() => setCardioIncluded(false)}
                className={`relative px-4 sm:px-5 py-2 text-xs uppercase tracking-wider font-mono font-semibold transition-colors duration-200 rounded-full z-10 ${
                  !cardioIncluded ? 'text-black font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                {!cardioIncluded && (
                  <motion.div
                    layoutId="pricingTierPill"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    className="absolute inset-0 bg-[#c5a880] rounded-full -z-10 shadow-sm"
                  />
                )}
                <span>Standard Access</span>
              </button>

              <button
                type="button"
                onClick={() => setCardioIncluded(true)}
                className={`relative px-4 sm:px-5 py-2 text-xs uppercase tracking-wider font-mono font-semibold transition-colors duration-200 rounded-full z-10 flex items-center gap-1.5 ${
                  cardioIncluded ? 'text-black font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                {cardioIncluded && (
                  <motion.div
                    layoutId="pricingTierPill"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    className="absolute inset-0 bg-[#c5a880] rounded-full -z-10 shadow-sm"
                  />
                )}
                <span>Cardio Included</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    cardioIncluded ? 'bg-black text-[#c5a880]' : 'bg-[#c5a880]/20 text-[#c5a880]'
                  }`}
                >
                  +₹200/mo
                </span>
              </button>
            </div>

            {/* Desktop Navigation Chevrons */}
            <div className="hidden sm:flex items-center gap-2 self-start sm:self-auto">
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

      {/* ==================== 2. MAIN STATIC CAROUSEL ==================== */}
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
          {plans.map((plan, index) => {
            const basePrice = Number(plan.price) || 0;
            const duration = Number(plan.durationMonths) || 1;

            // Dynamic calculation: base price + (200 * duration) when cardio is toggled ON
            const cardioSurcharge = cardioIncluded ? 200 * duration : 0;
            const displayedPrice = basePrice + cardioSurcharge;

            // Longest duration (12-Month) package automatically gets featured luxury highlight
            const isVip = Boolean(plan.isPopular || duration >= 12 || (duration === maxDuration && maxDuration > 1));

            // Billing cycle formatting
            const billingCycle =
              duration === 1
                ? '/ month'
                : duration === 12
                ? '/ year'
                : `/ ${duration} months`;

            // Monthly effective rate & dynamic savings
            const effectiveMonthly = duration > 1 ? Math.round(displayedPrice / duration) : null;
            const monthlyRefWithCardio = baseMonthlyPrice + (cardioIncluded ? 200 : 0);
            const standaloneSum = monthlyRefWithCardio * duration;
            const dynamicSavings = duration > 1 ? standaloneSum - displayedPrice : 0;

            const features = getPlanFeatures(plan, duration, isVip);
            const tierSubtitle = getTierSubtitle(duration, plan.tier);
            const ctaText =
              duration === 1
                ? 'Join 1-Month'
                : isVip
                ? 'Access VIP Annual'
                : `Claim ${duration}-Month Pass`;

            return (
              <motion.div
                key={plan._id || plan.id || plan.code || index}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="snap-center md:snap-start shrink-0 w-80 sm:w-96 select-none touch-pan-x touch-pan-y"
                style={{ touchAction: 'pan-x pan-y' }}
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className={`relative h-[560px] sm:h-[580px] flex flex-col justify-between p-8 sm:p-9 transition-all duration-300 ${
                    isVip
                      ? 'bg-gradient-to-b from-[#141312] via-[#0d0c0b] to-[#080808] border-2 border-[#c5a880] shadow-[0_0_35px_rgba(197,168,128,0.25)]'
                      : 'bg-[#0b0b0e] border border-white/10 hover:border-[#c5a880]/50 shadow-cinematic hover:shadow-[0_0_25px_rgba(197,168,128,0.2)]'
                  }`}
                >
                  {/* Top Corner Dynamic VIP / Most Popular Ribbon */}
                  {isVip && (
                    <div className="absolute -top-3.5 right-6 px-3.5 py-1 bg-[#c5a880] text-black text-[10px] uppercase font-mono tracking-widest font-extrabold shadow-md flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-black" />
                      <span>Most Popular</span>
                    </div>
                  )}

                  <div>
                    {/* Tier Title & Subtitle */}
                    <div className="space-y-1 mb-5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs uppercase tracking-wider text-gray-400 font-mono font-semibold">
                          {tierSubtitle}
                        </span>
                        {dynamicSavings > 0 && (
                          <span className="px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-mono font-bold bg-[#c5a880]/15 text-[#e5c99e] border border-[#c5a880]/30">
                            Save ₹{dynamicSavings.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-display">
                        {plan.name}
                      </h3>
                    </div>

                    {/* Animated Price Figure with AnimatePresence mode="wait" */}
                    <div className="pb-5 border-b border-white/[0.08] mb-5">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${plan.id || index}-${displayedPrice}-${cardioIncluded}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.22 }}
                          className="space-y-1"
                        >
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl sm:text-5xl font-black font-display tracking-tight text-[#c5a880]">
                              ₹{displayedPrice.toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs uppercase font-mono text-gray-400">
                              {billingCycle}
                            </span>
                          </div>

                          {effectiveMonthly && (
                            <div className="flex items-center gap-2 text-xs text-gray-300 font-mono">
                              <span>Effective: ₹{effectiveMonthly.toLocaleString('en-IN')} / mo</span>
                              {dynamicSavings > 0 && (
                                <span className="text-emerald-400">
                                  • Save ₹{dynamicSavings.toLocaleString('en-IN')}
                                </span>
                              )}
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>

                      <p className="text-xs text-gray-400 font-light mt-3 leading-relaxed line-clamp-2">
                        {plan.description ||
                          'Elite physical conditioning program with complete facility privileges at Joshiyara Road HQ.'}
                      </p>
                    </div>

                    {/* Features Bullet List */}
                    <div className="space-y-3 mb-6">
                      <span className="text-[10px] uppercase tracking-ultra text-gray-400 font-bold block font-sans">
                        Included In Pass:
                      </span>
                      <ul className="space-y-2.5 text-xs text-gray-300">
                        {features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                            <span className="leading-relaxed font-sans">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Conversion CTA Action Button */}
                  <div className="pt-4 border-t border-white/[0.06]">
                    <motion.button
                      type="button"
                      onClick={() => handleInquirePlan(plan, displayedPrice)}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3.5 px-6 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 shadow-sm ${
                        isVip
                          ? 'bg-[#c5a880] hover:bg-white text-black font-bold shadow-[0_0_20px_rgba(197,168,128,0.3)]'
                          : 'bg-white hover:bg-[#c5a880] text-black hover:text-black'
                      }`}
                    >
                      <span>{ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}

          {/* End-of-Pricing Consultation Card */}
          <div
            className="snap-center md:snap-start shrink-0 w-80 sm:w-96 flex flex-col items-center justify-center p-8 bg-[#0b0b0e] border border-dashed border-[#c5a880]/40 text-center space-y-4 touch-pan-x touch-pan-y"
            style={{ touchAction: 'pan-x pan-y' }}
          >
            <div className="w-14 h-14 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880]">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight text-white font-display">
              Custom Assessment
            </h3>
            <p className="text-xs text-gray-400 font-light max-w-xs leading-relaxed">
              Unsure which program fits your goals? Connect directly with the head coach at Joshiyara Road HQ.
            </p>
            <a
              href={getWhatsAppUrl('Hello The Fitness Club, I would like guidance on choosing the right membership plan.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#c5a880] text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
            >
              <span>Chat with Coach</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
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
              style={{ width: `${Math.max(scrollProgress, 12)}%` }}
              transition={{ ease: 'easeOut', duration: 0.15 }}
            />
          </div>
        </div>

        {/* Swipe Prompt */}
        <div className="flex items-center gap-3 text-gray-500 font-mono text-[11px] uppercase tracking-wider">
          <span className="sm:hidden">← Swipe Horizontally to View All Plans →</span>
          <span className="hidden sm:inline">Use Mouse Wheel / Click Chevrons to Explore Tiers</span>
        </div>
      </div>

      {/* Guarantee & Transparency Strip */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8">
        <div className="p-4 bg-[#0b0b0e] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2 text-zinc-300 font-sans">
            <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
            <span>Guaranteed zero hidden registration or maintenance fees. All memberships include GST tax invoices.</span>
          </div>
          <span className="font-mono text-[11px] text-[#a07e4d] dark:text-[#c5a880]">
            Immediate Biometric Activation at HQ
          </span>
        </div>
      </div>
    </section>
  );
}
