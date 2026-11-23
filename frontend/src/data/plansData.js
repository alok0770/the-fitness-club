/**
 * Static Membership Plans for The Fitness Club (Joshiyara Road HQ, Uttarkashi)
 * 100% Standalone - No Backend/Database Required
 */

export const PLANS_DATA = [
  {
    id: 'month-base',
    code: 'PLAN-1M-BASE',
    name: '1-Month Base',
    durationMonths: 1,
    durationDays: 30,
    price: 1000,
    currency: 'INR',
    tier: 'MONTHLY_STANDARD',
    isActive: true,
    badge: null,
    featuresSummary: 'General Gym Floor & Free Weights Access',
    description: 'Ideal for focused athletes seeking uncompromising strength and free-weight access.',
  },
  {
    id: 'quarterly-pro',
    code: 'PLAN-STRENGTH-QTR',
    name: '3-Month Pro',
    durationMonths: 3,
    durationDays: 90,
    price: 2800,
    currency: 'INR',
    tier: 'QUARTERLY_STRENGTH',
    isActive: true,
    badge: 'Save ₹200',
    featuresSummary: 'Strength & Olympic Deck Peak Access',
    description: 'Our most balanced package for sustained progressive overload and body recomposition.',
  },
  {
    id: 'annual-vip',
    code: 'PLAN-TITAN-VIP',
    name: '12-Month VIP',
    durationMonths: 12,
    durationDays: 360,
    price: 10000,
    currency: 'INR',
    tier: 'TITAN_VIP',
    isActive: true,
    badge: 'Save ₹2,000',
    isPopular: true,
    featuresSummary: 'All Access + Personal Locker + Invitational Events',
    description: 'The definitive commitment for dedicated lifters demanding excellence.',
  },
];

export default PLANS_DATA;
