import React from 'react';
import { ArrowUpRight, MapPin, Phone, Mail, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  BRAND_NAME,
  PHONE_DISPLAY,
  PHONE_TEL,
  EMAIL,
  CLUB_INSTAGRAM_URL,
  PRO_SHOP_INSTAGRAM_URL,
} from '../../config/siteConfig';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/[0.08] pt-24 pb-12 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20 p-0.5 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
              <img
                src="/assets/logo.png"
                alt="The Fitness Club Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <span className="text-xl font-bold uppercase tracking-widest text-white font-display block">
                {BRAND_NAME}
              </span>
              <span className="text-[9px] uppercase tracking-ultra text-gray-400 font-medium">
                Joshiyara Road • Uttarkashi
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-400 max-w-sm font-light leading-relaxed">
            An uncompromising physical institution dedicated to absolute strength, human biomechanics, and aesthetic refinement.
          </p>
          <div className="pt-2">
            <a
              href="#membership"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#c5a880] hover:text-white transition-colors"
            >
              <span>Apply for Private Membership</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Directory Links */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-white text-xs font-bold uppercase tracking-widest font-display">Directory</h4>
          <ul className="space-y-3 text-xs uppercase tracking-wider text-gray-400">
            <li><a href="#hero" className="hover:text-white transition-colors">The Sanctum</a></li>
            <li><a href="#transformations" className="hover:text-white transition-colors">Transformations</a></li>
            <li><a href="#events" className="hover:text-white transition-colors">Invitational Events</a></li>
            <li><a href="#products" className="hover:text-white transition-colors">The Pro Shop</a></li>
            <li>
              <a
                href={CLUB_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#c5a880] text-[#e5c99e] transition-colors flex items-center gap-1 font-mono text-[11px]"
              >
                <span>Club Instagram</span>
                <ArrowUpRight className="w-3 h-3 text-[#c5a880]" />
              </a>
            </li>
            <li>
              <a
                href={PRO_SHOP_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#c5a880] text-gray-400 transition-colors flex items-center gap-1 font-mono text-[11px]"
              >
                <span>Pro Shop (@iconic)</span>
                <ArrowUpRight className="w-3 h-3 text-[#c5a880]" />
              </a>
            </li>
          </ul>
        </div>

        {/* Disciplines */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-white text-xs font-bold uppercase tracking-widest font-display">Disciplines</h4>
          <ul className="space-y-3 text-xs uppercase tracking-wider text-gray-400">
            <li>Hypertrophy</li>
            <li>Raw Powerlifting</li>
            <li>Olympic Lifting</li>
            <li>Metabolic Conditioning</li>
          </ul>
        </div>

        {/* Exact Location & Access */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-white text-xs font-bold uppercase tracking-widest font-display">Location & Access</h4>
          <div className="space-y-2.5 text-xs text-gray-400 font-light leading-relaxed">
            <div className="flex items-start gap-2 text-gray-200">
              <MapPin className="w-3.5 h-3.5 text-[#c5a880] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">{BRAND_NAME}</p>
                <p className="text-gray-300">Joshiyara Road, Uttarkashi</p>
                <p className="text-gray-400">Uttarakhand, India</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1 text-gray-300">
              <Phone className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
              <a href={PHONE_TEL} className="hover:text-[#c5a880] transition-colors">{PHONE_DISPLAY}</a>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Mail className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
              <a href={`mailto:${EMAIL}`} className="hover:text-[#c5a880] transition-colors">{EMAIL}</a>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Instagram className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
              <a
                href={CLUB_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#c5a880] transition-colors font-mono text-[11px] text-[#e5c99e]"
              >
                @thefitnessclub_official
              </a>
            </div>
            <p className="text-[#c5a880] pt-2 text-[11px] uppercase tracking-wider font-medium">
              Floor Training Hours: Mon - Sat • Joshiyara Road HQ
            </p>
          </div>
        </div>
      </div>

      {/* Copyright Strip (Dead href="#" replaced with non-jumping span elements) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] uppercase tracking-widest text-gray-500 gap-4">
        <p className="text-center md:text-left">© 2026 {BRAND_NAME}. Joshiyara Road, Uttarkashi. All Rights Reserved.</p>
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2">
          <span className="hover:text-gray-300 transition-colors cursor-default select-none">Privacy Policy</span>
          <span className="hover:text-gray-300 transition-colors cursor-default select-none">Terms of Covenant</span>
          <Link to="/admin" className="text-gray-600 hover:text-[#c5a880] transition-colors">Owner Sanctum</Link>
          <span className="text-white/20 select-none hidden sm:inline">•</span>
          <a
            href="https://www.instagram.com/alok.xoxx/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Developed by Alok on Instagram"
            className="inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-gray-600 hover:text-[#c5a880] transition-colors duration-300"
          >
            <span>Developed by Alok</span>
            <Instagram className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
