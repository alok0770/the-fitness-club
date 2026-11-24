import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import Preloader from './components/common/Preloader';
import CustomCursor from './components/common/CustomCursor';
import Navbar from './components/common/Navbar';
import HeroSection from './components/hero/HeroSection';
import GallerySection from './components/gallery/GallerySection';
import EventsSection from './components/events/EventsSection';
import ProductsSection from './components/products/ProductsSection';
import PricingSection from './components/pricing/PricingSection';
import SmartContactBar from './components/common/SmartContactBar';
import Footer from './components/common/Footer';
import AdminPanel from './components/admin/AdminPanel';

import { fetchBootstrapData, CACHE_KEY } from './lib/api';

/**
 * Clean CMS Initializer.
 * Reads from localStorage cache (tfc_cms_cache_v1) or defaults to empty arrays.
 * Never falls back to hardcoded stock/demo items when content is deleted.
 */
function getInitialCmsData() {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      return {
        transformations: Array.isArray(parsed.transformations) ? parsed.transformations : [],
        events: Array.isArray(parsed.events) ? parsed.events : [],
        products: Array.isArray(parsed.products) ? parsed.products : [],
        plans: Array.isArray(parsed.plans) ? parsed.plans : [],
      };
    }
  } catch (err) {
    console.warn('[Cache] Could not parse localStorage CMS cache:', err);
  }

  return {
    transformations: [],
    events: [],
    products: [],
    plans: [],
  };
}

/**
 * Public Website (Zero-Wait Rendering + Silent Background Revalidation)
 */
function PublicWebsite() {
  // Always trigger the bespoke Gold Aura Silhouette entrance on every fresh page load
  const [isLoading, setIsLoading] = useState(true);

  // Instantly available content from cache or mock data
  const [cmsData, setCmsData] = useState(() => getInitialCmsData());

  // Silent background revalidation on mount (never blocks user UI or preloader)
  useEffect(() => {
    let isMounted = true;

    fetchBootstrapData()
      .then((data) => {
        if (!isMounted || !data) return;

        setCmsData((prev) => {
          const updated = {
            transformations: Array.isArray(data.transformations)
              ? data.transformations
              : prev.transformations,
            events: Array.isArray(data.events)
              ? data.events
              : prev.events,
            products: Array.isArray(data.products)
              ? data.products
              : prev.products,
            plans: Array.isArray(data.plans)
              ? data.plans
              : prev.plans,
          };

          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(updated));
          } catch (err) {
            console.warn('[Cache] Could not persist CMS cache:', err);
          }

          return updated;
        });
      })
      .catch((err) => {
        // Cold start or server sleeping: smoothly keep cached/local fallback data
        console.info('[Bootstrap] Backend waking up or offline, keeping instant cached UI:', err.message);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Momentum Smooth Scroll (Public Website)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.65,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.3,
      touchMultiplier: 1.2,
      syncTouch: false,
    });

    let animationFrameId;

    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col font-sans selection:bg-[#c5a880] selection:text-black antialiased">
      {/* 1. Minimalist Ultra-Luxury Gold Aura Silhouette Preloader */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* 2. Global Magnetic Spring Cursor (Desktop) */}
      <CustomCursor />

      {/* 3. Application Layout */}
      <Navbar />
      <main className="flex-1">
        <HeroSection isPreloading={isLoading} />
        <GallerySection items={cmsData.transformations} />
        <EventsSection events={cmsData.events} />
        <ProductsSection products={cmsData.products} />
        <PricingSection plans={cmsData.plans} />
      </main>
      <Footer />

      {/* 4. Non-Intrusive Glassmorphic Floating Action Bar */}
      <SmartContactBar />
    </div>
  );
}

/**
 * Root Application Router
 * Separates Public Website (/) from Owner Admin Console (/admin)
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="*" element={<PublicWebsite />} />
      </Routes>
    </BrowserRouter>
  );
}
