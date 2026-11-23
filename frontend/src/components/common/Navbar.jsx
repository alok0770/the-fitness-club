import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-2xl border-b border-white/[0.07] py-4 shadow-cinematic'
          : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo - The Fitness Club */}
        <a href="#hero" className="flex items-center gap-3.5 group">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 group-hover:border-[#c5a880] transition-colors duration-300 shadow-[0_0_15px_rgba(197,168,128,0.2)]">
            <img
              src="/assets/logo.png"
              alt="The Fitness Club Logo"
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-widest uppercase text-white font-display">
              The Fitness Club
            </span>
            <span className="text-[9px] uppercase tracking-ultra text-gray-400 font-medium -mt-1">
              Joshiyara Road • Uttarkashi
            </span>
          </div>
        </a>

        {/* Clean Minimalist Links */}
        <nav className="hidden md:flex items-center gap-9 text-xs uppercase tracking-widest text-gray-300 font-medium">
          <a href="#transformations" className="hover:text-[#c5a880] transition-colors duration-200">
            Transformations
          </a>
          <a href="#events" className="hover:text-[#c5a880] transition-colors duration-200">
            Invitational Events
          </a>
          <a href="#products" className="hover:text-[#c5a880] transition-colors duration-200">
            The Pro Shop
          </a>
          <a href="#membership" className="hover:text-[#c5a880] transition-colors duration-200">
            Memberships
          </a>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-5">
          <a
            href="#membership"
            className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-none border border-white/20 hover:border-[#c5a880] bg-black/40 hover:bg-[#c5a880] text-white hover:text-black transition-all duration-300 text-xs font-semibold uppercase tracking-widest"
          >
            <span>Request Access</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#c5a880] group-hover:text-black transition-colors" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 focus:outline-none"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/10 px-6 py-8 flex flex-col gap-6 text-center">
          <a
            href="#transformations"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold tracking-widest uppercase text-gray-200 hover:text-[#c5a880]"
          >
            Transformations
          </a>
          <a
            href="#events"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold tracking-widest uppercase text-gray-200 hover:text-[#c5a880]"
          >
            Invitational Events
          </a>
          <a
            href="#products"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold tracking-widest uppercase text-gray-200 hover:text-[#c5a880]"
          >
            The Pro Shop
          </a>
          <a
            href="#membership"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold tracking-widest uppercase text-gray-200 hover:text-[#c5a880]"
          >
            Membership Tiers
          </a>
          <a
            href="#membership"
            onClick={() => setMobileMenuOpen(false)}
            className="py-3 border border-[#c5a880] bg-[#c5a880] text-black text-xs font-bold uppercase tracking-widest"
          >
            Request Access
          </a>
        </div>
      )}
    </header>
  );
}
