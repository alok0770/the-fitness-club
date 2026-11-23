/**
 * Global Configuration for The Fitness Club
 * Joshiyara Road HQ • Uttarkashi
 */

export const BRAND_NAME = 'The Fitness Club';
export const LOCATION = 'Joshiyara Road, Uttarkashi, Uttarakhand, India';
export const LOCATION_SHORT = 'Joshiyara Road HQ • Uttarkashi';
export const PHONE_DISPLAY = '+91 82660 60510';
export const PHONE_RAW = '918266060510';
export const PHONE_TEL = 'tel:+918266060510';
export const EMAIL = 'membership@thefitnessclub.in';
export const MAPS_URL = 'https://maps.google.com/?q=The+Fitness+Club+Joshiyara+Road+Uttarkashi';
export const INSTAGRAM_URL = 'https://www.instagram.com/iconicthreads.uk/';
export const INSTAGRAM_HANDLE = '@iconicthreads.uk';

/**
 * Generate direct WhatsApp deep-link with URL-encoded inquiry message
 * @param {string} message
 * @returns {string}
 */
export const getWhatsAppUrl = (message = '') => {
  const text = encodeURIComponent(message);
  return `https://wa.me/${PHONE_RAW}?text=${text}`;
};

export default {
  BRAND_NAME,
  LOCATION,
  LOCATION_SHORT,
  PHONE_DISPLAY,
  PHONE_RAW,
  PHONE_TEL,
  EMAIL,
  MAPS_URL,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  getWhatsAppUrl,
};
