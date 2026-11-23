import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, MapPin } from 'lucide-react';
import { PHONE_TEL, getWhatsAppUrl, MAPS_URL } from '../../config/siteConfig';

export default function SmartContactBar() {
  const actions = [
    {
      id: 'call',
      label: 'Call',
      icon: Phone,
      href: PHONE_TEL,
      color: 'hover:text-[#c5a880]',
      hoverGlow: 'hover:shadow-[0_0_15px_rgba(197,168,128,0.4)]',
      ariaLabel: 'Call The Fitness Club Front Desk',
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: MessageCircle,
      href: getWhatsAppUrl('Hello The Fitness Club, I would like to inquire about membership access.'),
      color: 'hover:text-emerald-400',
      hoverGlow: 'hover:shadow-[0_0_15px_rgba(52,211,153,0.4)]',
      ariaLabel: 'Message The Fitness Club on WhatsApp',
    },
    {
      id: 'directions',
      label: 'Directions',
      icon: MapPin,
      href: MAPS_URL,
      color: 'hover:text-[#c5a880]',
      hoverGlow: 'hover:shadow-[0_0_15px_rgba(197,168,128,0.4)]',
      ariaLabel: 'Get directions to Joshiyara Road Headquarters',
    },
  ];

  return (
    <motion.aside
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.6 }}
      aria-label="Quick Actions"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 select-none pointer-events-auto"
    >
      <div className="flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 bg-black/75 backdrop-blur-xl border border-white/15 hover:border-[#c5a880]/50 shadow-[0_15px_35px_rgba(0,0,0,0.85)] rounded-full transition-colors duration-300">
        {/* Subtle Operational Status Pill */}
        <div className="flex items-center gap-1.5 pl-1 pr-2 sm:pr-2.5 border-r border-white/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-wider text-gray-300 font-semibold">
            HQ Open
          </span>
        </div>

        {/* 3 Sleek Quick Action Icon-Buttons */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <motion.a
                key={action.id}
                href={action.href}
                target={action.id === 'call' ? '_self' : '_blank'}
                rel={action.id === 'call' ? undefined : 'noopener noreferrer'}
                aria-label={action.ariaLabel}
                title={action.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className={`p-2 sm:p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/5 text-gray-300 ${action.color} ${action.hoverGlow} flex items-center justify-center transition-all duration-200`}
              >
                <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </motion.a>
            );
          })}
        </div>
      </div>
    </motion.aside>
  );
}
