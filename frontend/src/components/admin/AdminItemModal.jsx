import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Loader2, Image as ImageIcon, Check } from 'lucide-react';
import { uploadImage } from '../../lib/api';

export default function AdminItemModal({
  isOpen,
  onClose,
  tab, // 'transformations' | 'events' | 'products' | 'plans'
  item, // null for new, or existing item object
  onSave,
}) {
  const [formData, setFormData] = useState(() => {
    if (item) return { ...item };
    if (tab === 'transformations') {
      return {
        name: '',
        category: 'Hypertrophy & V-Taper',
        achievement: '',
        duration: '24 Weeks',
        weightChange: '',
        bodyFat: '',
        beforeImage: '',
        afterImage: '',
        quote: '',
        displayOrder: 1,
      };
    }
    if (tab === 'events') {
      return {
        title: '',
        tag: 'STRENGTH MEET',
        category: 'Strength & Power',
        date: '',
        time: '',
        location: 'Joshiyara Road HQ',
        badge: 'Members Only',
        caption: '',
        description: '',
        image: '',
        displayOrder: 1,
      };
    }
    if (tab === 'products') {
      return {
        name: '',
        edition: '',
        category: 'Nutrition',
        price: '₹2,499',
        details: '',
        image: '',
        status: 'In Stock',
        badge: '',
        displayOrder: 1,
      };
    }
    if (tab === 'plans') {
      return {
        code: 'M1',
        name: '',
        durationMonths: 1,
        durationDays: 30,
        price: 1000,
        currency: 'INR',
        tier: 'STANDARD',
        isActive: true,
        badge: '',
        isPopular: false,
        featuresSummary: '',
        description: '',
        displayOrder: 1,
      };
    }
    return {};
  });

  const [uploadingField, setUploadingField] = useState(null); // 'image' | 'beforeImage' | 'afterImage'
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (e, targetField) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(targetField);
    setError(null);
    try {
      const url = await uploadImage(file);
      handleChange(targetField, url);
    } catch (err) {
      setError(`Upload failed: ${err.message}. You can also enter an image URL directly.`);
    } finally {
      setUploadingField(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save item');
    } finally {
      setIsSaving(false);
    }
  };

  const getTitle = () => {
    const mode = item ? 'Edit' : 'Add New';
    switch (tab) {
      case 'transformations': return `${mode} Transformation`;
      case 'events': return `${mode} Event`;
      case 'products': return `${mode} Product`;
      case 'plans': return `${mode} Membership Plan`;
      default: return `${mode} Item`;
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-[#0b0b0e] border border-[#c5a880]/40 p-6 sm:p-8 shadow-2xl relative my-8 text-white max-h-[90vh] flex flex-col justify-between overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a880] block">
              CONSOLE EDITOR
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-wider text-white">
              {getTitle()}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="my-3 p-3 bg-red-950/60 border border-red-500/50 text-red-200 text-xs shrink-0">
            {error}
          </div>
        )}

        {/* Scrollable Form Body */}
        <form id="admin-item-form" onSubmit={handleSubmit} className="overflow-y-auto py-5 space-y-4 pr-1">
          {/* TAB 1: TRANSFORMATIONS */}
          {tab === 'transformations' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Athlete Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="e.g. Alok Rana"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Category / Protocol
                  </label>
                  <input
                    type="text"
                    value={formData.category || ''}
                    onChange={(e) => handleChange('category', e.target.value)}
                    placeholder="e.g. Hypertrophy & V-Taper"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Key Achievement
                  </label>
                  <input
                    type="text"
                    value={formData.achievement || ''}
                    onChange={(e) => handleChange('achievement', e.target.value)}
                    placeholder="+9 kg Lean Muscle"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration || ''}
                    onChange={(e) => handleChange('duration', e.target.value)}
                    placeholder="24 Weeks"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder ?? 1}
                    onChange={(e) => handleChange('displayOrder', parseInt(e.target.value) || 0)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Weight Change
                  </label>
                  <input
                    type="text"
                    value={formData.weightChange || ''}
                    onChange={(e) => handleChange('weightChange', e.target.value)}
                    placeholder="56 kg → 65 kg"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Body Fat Shift
                  </label>
                  <input
                    type="text"
                    value={formData.bodyFat || ''}
                    onChange={(e) => handleChange('bodyFat', e.target.value)}
                    placeholder="18% → 10%"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
              </div>

              {/* Before & After Image Uploads */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Before Image */}
                <div className="p-3.5 border border-white/10 bg-black/40 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#c5a880] block font-bold">
                    Before Image
                  </span>
                  {formData.beforeImage && (
                    <img
                      src={formData.beforeImage}
                      alt="Before preview"
                      className="w-full h-32 object-cover border border-white/10"
                    />
                  )}
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer px-3 py-1.5 bg-white/10 hover:bg-[#c5a880] hover:text-black text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5">
                      {uploadingField === 'beforeImage' ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Upload className="w-3.5 h-3.5" />
                      )}
                      <span>Upload File</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'beforeImage')}
                      />
                    </label>
                    <input
                      type="text"
                      value={formData.beforeImage || ''}
                      onChange={(e) => handleChange('beforeImage', e.target.value)}
                      placeholder="or paste URL"
                      className="flex-1 bg-black/60 border border-white/15 px-2 py-1 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                {/* After Image */}
                <div className="p-3.5 border border-white/10 bg-black/40 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#c5a880] block font-bold">
                    After Image
                  </span>
                  {formData.afterImage && (
                    <img
                      src={formData.afterImage}
                      alt="After preview"
                      className="w-full h-32 object-cover border border-white/10"
                    />
                  )}
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer px-3 py-1.5 bg-white/10 hover:bg-[#c5a880] hover:text-black text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5">
                      {uploadingField === 'afterImage' ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Upload className="w-3.5 h-3.5" />
                      )}
                      <span>Upload File</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'afterImage')}
                      />
                    </label>
                    <input
                      type="text"
                      value={formData.afterImage || ''}
                      onChange={(e) => handleChange('afterImage', e.target.value)}
                      placeholder="or paste URL"
                      className="flex-1 bg-black/60 border border-white/15 px-2 py-1 text-xs text-white outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                  Athlete Quote / Testimonial
                </label>
                <textarea
                  rows={2}
                  value={formData.quote || ''}
                  onChange={(e) => handleChange('quote', e.target.value)}
                  placeholder="Disciplined progressive overload..."
                  className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] p-3 text-sm text-white outline-none"
                />
              </div>
            </>
          )}

          {/* TAB 2: EVENTS */}
          {tab === 'events' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="Iron Clash: Deadlift & PR Night"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Header Tag
                  </label>
                  <input
                    type="text"
                    value={formData.tag || ''}
                    onChange={(e) => handleChange('tag', e.target.value)}
                    placeholder="STRENGTH MEET"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    value={formData.date || ''}
                    onChange={(e) => handleChange('date', e.target.value)}
                    placeholder="Every Last Friday"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Time
                  </label>
                  <input
                    type="text"
                    value={formData.time || ''}
                    onChange={(e) => handleChange('time', e.target.value)}
                    placeholder="19:00 - 22:00"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => handleChange('location', e.target.value)}
                    placeholder="Main Platform"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Badge / Access
                  </label>
                  <input
                    type="text"
                    value={formData.badge || ''}
                    onChange={(e) => handleChange('badge', e.target.value)}
                    placeholder="Members Only"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder ?? 1}
                    onChange={(e) => handleChange('displayOrder', parseInt(e.target.value) || 0)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
              </div>

              {/* Event Image Upload */}
              <div className="p-3.5 border border-white/10 bg-black/40 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#c5a880] block font-bold">
                  Event Photo
                </span>
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Event preview"
                    className="w-full h-36 object-cover border border-white/10"
                  />
                )}
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer px-3 py-1.5 bg-white/10 hover:bg-[#c5a880] hover:text-black text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5">
                    {uploadingField === 'image' ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>Upload File</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'image')}
                    />
                  </label>
                  <input
                    type="text"
                    value={formData.image || ''}
                    onChange={(e) => handleChange('image', e.target.value)}
                    placeholder="or paste URL"
                    className="flex-1 bg-black/60 border border-white/15 px-2 py-1 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                  Card Caption (Short 1-line subtitle)
                </label>
                <input
                  type="text"
                  value={formData.caption || ''}
                  onChange={(e) => handleChange('caption', e.target.value)}
                  placeholder="Heavy iron, raw chalk, and personal records under the lights."
                  className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                  Detailed Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description || ''}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Full event details..."
                  className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] p-3 text-sm text-white outline-none"
                />
              </div>
            </>
          )}

          {/* TAB 3: PRODUCTS */}
          {tab === 'products' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Hydrolyzed Native Whey Isolate"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Edition / Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.edition || ''}
                    onChange={(e) => handleChange('edition', e.target.value)}
                    placeholder="Formula No. 01 • Cold-Pressed"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category || 'Nutrition'}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  >
                    <option value="Nutrition">Nutrition</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Apparel">Apparel</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Price in INR *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.price || ''}
                    onChange={(e) => handleChange('price', e.target.value)}
                    placeholder="₹5,499"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status || 'In Stock'}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Limited Stock">Limited Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Pre-Order">Pre-Order</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Badge (e.g. Best Seller)
                  </label>
                  <input
                    type="text"
                    value={formData.badge || ''}
                    onChange={(e) => handleChange('badge', e.target.value)}
                    placeholder="Best Seller"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder ?? 1}
                    onChange={(e) => handleChange('displayOrder', parseInt(e.target.value) || 0)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
              </div>

              {/* Product Image Upload */}
              <div className="p-3.5 border border-white/10 bg-black/40 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#c5a880] block font-bold">
                  Product Image
                </span>
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Product preview"
                    className="w-full h-36 object-contain border border-white/10 bg-black"
                  />
                )}
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer px-3 py-1.5 bg-white/10 hover:bg-[#c5a880] hover:text-black text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5">
                    {uploadingField === 'image' ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>Upload File</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'image')}
                    />
                  </label>
                  <input
                    type="text"
                    value={formData.image || ''}
                    onChange={(e) => handleChange('image', e.target.value)}
                    placeholder="or paste URL"
                    className="flex-1 bg-black/60 border border-white/15 px-2 py-1 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                  Product Specifications / Details
                </label>
                <textarea
                  rows={2}
                  value={formData.details || ''}
                  onChange={(e) => handleChange('details', e.target.value)}
                  placeholder="94% purity cold-pressed isolate..."
                  className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] p-3 text-sm text-white outline-none"
                />
              </div>
            </>
          )}

          {/* TAB 4: MEMBERSHIP PLANS */}
          {tab === 'plans' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Plan Code (e.g. M1, M3, M12)
                  </label>
                  <input
                    type="text"
                    value={formData.code || ''}
                    onChange={(e) => handleChange('code', e.target.value)}
                    placeholder="M1"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Plan Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="1-Month Base"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Duration (Months) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.durationMonths ?? 1}
                    onChange={(e) => handleChange('durationMonths', parseInt(e.target.value) || 1)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Duration (Days)
                  </label>
                  <input
                    type="number"
                    value={formData.durationDays || ''}
                    onChange={(e) => handleChange('durationDays', parseInt(e.target.value) || 0)}
                    placeholder="30"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Base Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.price ?? 1000}
                    onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
                    placeholder="1000"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Tier (STANDARD, PRO, VIP)
                  </label>
                  <input
                    type="text"
                    value={formData.tier || ''}
                    onChange={(e) => handleChange('tier', e.target.value)}
                    placeholder="STANDARD"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Savings Badge (e.g. Save ₹200)
                  </label>
                  <input
                    type="text"
                    value={formData.badge || ''}
                    onChange={(e) => handleChange('badge', e.target.value)}
                    placeholder="Save ₹200"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder ?? 1}
                    onChange={(e) => handleChange('displayOrder', parseInt(e.target.value) || 0)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 py-2 border-y border-white/10">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.isActive ?? true}
                    onChange={(e) => handleChange('isActive', e.target.checked)}
                    className="accent-[#c5a880] w-4 h-4"
                  />
                  <span className="text-xs font-mono uppercase text-gray-300">Is Active on Website</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.isPopular ?? false}
                    onChange={(e) => handleChange('isPopular', e.target.checked)}
                    className="accent-[#c5a880] w-4 h-4"
                  />
                  <span className="text-xs font-mono uppercase text-[#c5a880] font-bold">Featured VIP / Most Popular</span>
                </label>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                  Features Summary (Comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.featuresSummary || ''}
                  onChange={(e) => handleChange('featuresSummary', e.target.value)}
                  placeholder="Full Sanctum Access, Biometric RFID, Locker Facilities"
                  className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                  Plan Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description || ''}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Flexible month-to-month commitment..."
                  className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] p-3 text-sm text-white outline-none"
                />
              </div>
            </>
          )}
        </form>

        {/* Action Buttons Footer */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-gray-300 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="admin-item-form"
            disabled={isSaving}
            className="px-6 py-2.5 bg-[#c5a880] hover:bg-[#e5c99e] text-black font-display font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-[0_0_15px_rgba(197,168,128,0.3)] transition-colors cursor-pointer"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-black" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5 text-black" />
                <span>{item ? 'Save Changes' : 'Create Item'}</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
