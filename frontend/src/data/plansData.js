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
    isPopular: false,
    featuresSummary: 'Full Gym Floor & Free Weights Access, Strength Machines & Lifting Zone, Floor Trainer Form Guidance, Dedicated Changing & Bag Storage Area',
    description: 'Flexible month-to-month gym access with hands-on floor guidance and complete free weight privileges.',
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
    isPopular: false,
    featuresSummary: 'Full Gym Floor & Free Weights Access, Custom Workout Split & Routine Plan, Monthly Strength & Progress Check-In, Priority Floor Trainer Support',
    description: 'Quarterly foundation designed for consistent progressive overload, personalized workout splits, and tangible results.',
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
    featuresSummary: 'Personalized Diet & Workout Roadmap, Priority 1-on-1 Form Guidance, 10% Pro Shop Discount, 2 Free Guest Day-Passes, 15-Day Travel Freeze',
    description: 'The definitive all-access VIP pass with comprehensive coaching roadmaps, pro shop savings, and membership freeze options.',
  },
];

export default PLANS_DATA;
