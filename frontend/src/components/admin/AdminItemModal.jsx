import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Loader2, Image as ImageIcon, Check, ChevronDown, Trash2 } from 'lucide-react';
import { uploadImage } from '../../lib/api';

export default function AdminItemModal({
  isOpen,
  onClose,
  tab, // 'transformations' | 'events' | 'products' | 'plans'
  item, // null for new, or existing item object
  onSave,
}) {
  const [formData, setFormData] = useState(() => {
    if (item) {
      return {
        ...item,
        price: item.price != null ? String(item.price) : '',
        durationMonths: item.durationMonths != null ? String(item.durationMonths) : '1',
        durationDays: item.durationDays != null ? String(item.durationDays) : '',
        displayOrder: item.displayOrder != null ? String(item.displayOrder) : '1',
      };
    }
    if (tab === 'transformations') {
      return {
        name: '',
        duration: '12 Weeks',
        achievement: '',
        weightChange: '',
        beforeImage: '',
        afterImage: '',
        category: 'Hypertrophy & V-Taper',
        bodyFat: '',
        quote: '',
        displayOrder: '1',
      };
    }
    if (tab === 'events') {
      return {
        title: '',
        tag: 'STRENGTH MEET',
        caption: '',
        image: '',
        date: '',
        time: '',
        location: 'Joshiyara Road HQ',
        badge: 'Members Only',
        description: '',
        displayOrder: '1',
      };
    }
    if (tab === 'products') {
      return {
        name: '',
        category: 'Nutrition',
        price: '₹899',
        status: 'In Stock',
        image: '',
        details: '',
        edition: '',
        badge: '',
        displayOrder: '1',
      };
    }
    if (tab === 'plans') {
      return {
        name: '',
        durationMonths: '1',
        price: '1000',
        isActive: true,
        isPopular: false,
        featuresSummary: '',
        description: '',
        code: '',
        durationDays: '30',
        tier: '',
        badge: '',
        displayOrder: '1',
      };
    }
    return {};
  });

  const [showMoreOptions, setShowMoreOptions] = useState(false);
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
      let payload = { ...formData };

      if (tab === 'transformations') {
        payload.displayOrder = parseInt(formData.displayOrder, 10) || 1;
        payload.category = formData.category?.trim() || 'Hypertrophy & V-Taper';
      } else if (tab === 'events') {
        payload.displayOrder = parseInt(formData.displayOrder, 10) || 1;
        payload.location = formData.location?.trim() || 'Joshiyara Road HQ';
        payload.badge = formData.badge?.trim() || 'Members Only';
      } else if (tab === 'products') {
        payload.displayOrder = parseInt(formData.displayOrder, 10) || 1;
        // Format price to ensure it has ₹ prefix if user just typed a number like 899
        let priceVal = (formData.price || '').trim();
        if (priceVal && !priceVal.startsWith('₹') && !priceVal.startsWith('Rs') && !priceVal.startsWith('INR')) {
          priceVal = `₹${priceVal}`;
        }
        payload.price = priceVal;
        payload.status = formData.status || 'In Stock';
        payload.category = formData.category || 'Nutrition';
      } else if (tab === 'plans') {
        const months = parseInt(formData.durationMonths, 10) || 1;
        const days = formData.durationDays && formData.durationDays.trim() !== ''
          ? parseInt(formData.durationDays, 10) || (months * 30)
          : months * 30;
        const basePrice = parseFloat(formData.price) || 0;
        const order = parseInt(formData.displayOrder, 10) || 1;
        const code = (formData.code && formData.code.trim()) ? formData.code.trim() : `M${months}`;
        const tier = (formData.tier && formData.tier.trim())
          ? formData.tier.trim()
          : (months >= 12 ? 'VIP' : months >= 3 ? 'PRO' : 'STANDARD');

        payload = {
          ...payload,
          code,
          durationMonths: months,
          durationDays: days,
          price: basePrice,
          currency: 'INR',
          tier,
          displayOrder: order,
          isActive: formData.isActive ?? true,
          isPopular: formData.isPopular ?? false,
        };
      }

      await onSave(payload);
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
          {/* ============================================================== */}
          {/* TAB 1: TRANSFORMATIONS */}
          {/* ============================================================== */}
          {tab === 'transformations' && (
            <>
              {/* Primary / Essential Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-300 block mb-1">
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
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-300 block mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration || ''}
                    onChange={(e) => handleChange('duration', e.target.value)}
                    placeholder="e.g. 12 Weeks"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-300 block mb-1">
                    Result Highlight *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.achievement || ''}
                    onChange={(e) => handleChange('achievement', e.target.value)}
                    placeholder="e.g. +9 kg Lean Muscle"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-300 block mb-1">
                    Weight Change
                  </label>
                  <input
                    type="text"
                    value={formData.weightChange || ''}
                    onChange={(e) => handleChange('weightChange', e.target.value)}
                    placeholder="e.g. 56 kg → 65 kg"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
              </div>

              {/* Before & After Photo Uploads */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {/* Before Photo */}
                <div className="p-3 border border-white/15 bg-black/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#c5a880] font-bold">
                      Before Photo
                    </span>
                    {formData.beforeImage && (
                      <button
                        type="button"
                        onClick={() => handleChange('beforeImage', '')}
                        className="text-[10px] font-mono uppercase text-red-400 hover:text-red-300 flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>
                  {formData.beforeImage && (
                    <div className="relative w-full h-32 bg-black border border-white/10 overflow-hidden flex items-center justify-center">
                      <img
                        src={formData.beforeImage}
                        alt="Before Preview"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer px-3 py-1.5 bg-white/10 hover:bg-[#c5a880] hover:text-black text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 shrink-0">
                      {uploadingField === 'beforeImage' ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Upload className="w-3.5 h-3.5" />
                      )}
                      <span>Upload</span>
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
                      placeholder="Paste image URL..."
                      className="flex-1 bg-black/60 border border-white/15 px-2.5 py-1.5 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                {/* After Photo */}
                <div className="p-3 border border-white/15 bg-black/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#c5a880] font-bold">
                      After Photo
                    </span>
                    {formData.afterImage && (
                      <button
                        type="button"
                        onClick={() => handleChange('afterImage', '')}
                        className="text-[10px] font-mono uppercase text-red-400 hover:text-red-300 flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>
                  {formData.afterImage && (
                    <div className="relative w-full h-32 bg-black border border-white/10 overflow-hidden flex items-center justify-center">
                      <img
                        src={formData.afterImage}
                        alt="After Preview"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer px-3 py-1.5 bg-white/10 hover:bg-[#c5a880] hover:text-black text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 shrink-0">
                      {uploadingField === 'afterImage' ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Upload className="w-3.5 h-3.5" />
                      )}
                      <span>Upload</span>
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
                      placeholder="Paste image URL..."
                      className="flex-1 bg-black/60 border border-white/15 px-2.5 py-1.5 text-xs text-white outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Collapsible Secondary Fields */}
              <div className="pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowMoreOptions(!showMoreOptions)}
                  className="flex items-center justify-between w-full py-2 text-xs font-mono uppercase tracking-wider text-gray-400 hover:text-[#c5a880] transition-colors cursor-pointer"
                >
                  <span>More Options (Optional)</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showMoreOptions ? 'rotate-180 text-[#c5a880]' : ''}`} />
                </button>

                {showMoreOptions && (
                  <div className="pt-3 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                          Body Fat Shift
                        </label>
                        <input
                          type="text"
                          value={formData.bodyFat || ''}
                          onChange={(e) => handleChange('bodyFat', e.target.value)}
                          placeholder="e.g. 18% → 10%"
                          className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                          Athlete Quote / Testimonial
                        </label>
                        <input
                          type="text"
                          value={formData.quote || ''}
                          onChange={(e) => handleChange('quote', e.target.value)}
                          placeholder="e.g. Disciplined progressive overload and metabolic nutrition..."
                          className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                          Display Order
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={formData.displayOrder ?? '1'}
                          onChange={(e) => handleChange('displayOrder', e.target.value)}
                          placeholder="1"
                          className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ============================================================== */}
          {/* TAB 2: EVENTS */}
          {/* ============================================================== */}
          {tab === 'events' && (
            <>
              {/* Primary / Essential Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-300 block mb-1">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="e.g. Iron Clash: Deadlift Night"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-300 block mb-1">
                    Tag / Badge
                  </label>
                  <input
                    type="text"
                    value={formData.tag || ''}
                    onChange={(e) => handleChange('tag', e.target.value)}
                    placeholder="e.g. STRENGTH MEET"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-gray-300 block mb-1">
                  Short 1-Line Caption
                </label>
                <input
                  type="text"
                  value={formData.caption || ''}
                  onChange={(e) => handleChange('caption', e.target.value)}
                  placeholder="e.g. Heavy iron, raw chalk, and personal records under the lights."
                  className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                />
              </div>

              {/* Event Photo Upload */}
              <div className="p-3 border border-white/15 bg-black/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#c5a880] font-bold">
                    Event Photo
                  </span>
                  {formData.image && (
                    <button
                      type="button"
                      onClick={() => handleChange('image', '')}
                      className="text-[10px] font-mono uppercase text-red-400 hover:text-red-300 flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>
                {formData.image && (
                  <div className="relative w-full h-36 bg-black border border-white/10 overflow-hidden flex items-center justify-center">
                    <img
                      src={formData.image}
                      alt="Event Preview"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer px-3 py-1.5 bg-white/10 hover:bg-[#c5a880] hover:text-black text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 shrink-0">
                    {uploadingField === 'image' ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>Upload</span>
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
                    placeholder="Paste image URL..."
                    className="flex-1 bg-black/60 border border-white/15 px-2.5 py-1.5 text-xs text-white outline-none"
                  />
                </div>
              </div>

              {/* Collapsible Secondary Fields */}
              <div className="pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowMoreOptions(!showMoreOptions)}
                  className="flex items-center justify-between w-full py-2 text-xs font-mono uppercase tracking-wider text-gray-400 hover:text-[#c5a880] transition-colors cursor-pointer"
                >
                  <span>More Options (Optional)</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showMoreOptions ? 'rotate-180 text-[#c5a880]' : ''}`} />
                </button>

                {showMoreOptions && (
                  <div className="pt-3 space-y-4">
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
                          placeholder="Joshiyara Road HQ"
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
                          type="text"
                          inputMode="numeric"
                          value={formData.displayOrder ?? '1'}
                          onChange={(e) => handleChange('displayOrder', e.target.value)}
                          placeholder="1"
                          className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                        Detailed Description
                      </label>
                      <textarea
                        rows={2}
                        value={formData.description || ''}
                        onChange={(e) => handleChange('description', e.target.value)}
                        placeholder="Comprehensive event details..."
                        className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] p-3 text-sm text-white outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ============================================================== */}
          {/* TAB 3: PRODUCTS */}
          {/* ============================================================== */}
          {tab === 'products' && (
            <>
              {/* Primary / Essential Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-300 block mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="e.g. Whey Isolate, Lever Belt"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-300 block mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category || 'Apparel'}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  >
                    <option value="Apparel">Apparel</option>
                    <option value="Nutrition">Nutrition</option>
                    {formData.category && !['Apparel', 'Nutrition'].includes(formData.category) && (
                      <option value={formData.category}>{formData.category}</option>
                    )}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-300 block mb-1">
                    Price in ₹ *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.price || ''}
                    onChange={(e) => handleChange('price', e.target.value)}
                    placeholder="e.g. 899 or ₹899"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-300 block mb-1">
                    Stock Status
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

              {/* Product Photo Upload */}
              <div className="p-3 border border-white/15 bg-black/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#c5a880] font-bold">
                    Product Photo
                  </span>
                  {formData.image && (
                    <button
                      type="button"
                      onClick={() => handleChange('image', '')}
                      className="text-[10px] font-mono uppercase text-red-400 hover:text-red-300 flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>
                {formData.image && (
                  <div className="relative w-full h-36 bg-black border border-white/10 overflow-hidden flex items-center justify-center p-2">
                    <img
                      src={formData.image}
                      alt="Product Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer px-3 py-1.5 bg-white/10 hover:bg-[#c5a880] hover:text-black text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 shrink-0">
                    {uploadingField === 'image' ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>Upload</span>
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
                    placeholder="Paste image URL..."
                    className="flex-1 bg-black/60 border border-white/15 px-2.5 py-1.5 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-gray-300 block mb-1">
                  Pack Size / Weight / Variant
                </label>
                <input
                  type="text"
                  value={formData.edition || ''}
                  onChange={(e) => handleChange('edition', e.target.value)}
                  placeholder="e.g. 250g • 83 Servings • Unflavoured"
                  className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-gray-300 block mb-1">
                  Product Details / Specifications
                </label>
                <textarea
                  rows={2}
                  value={formData.details || ''}
                  onChange={(e) => handleChange('details', e.target.value)}
                  placeholder="e.g. Pure micronised creatine monohydrate (3g per serving) for strength & recovery."
                  className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] p-3 text-sm text-white outline-none"
                />
              </div>

              {/* Collapsible Secondary Fields */}
              <div className="pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowMoreOptions(!showMoreOptions)}
                  className="flex items-center justify-between w-full py-2 text-xs font-mono uppercase tracking-wider text-gray-400 hover:text-[#c5a880] transition-colors cursor-pointer"
                >
                  <span>More Options (Optional)</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showMoreOptions ? 'rotate-180 text-[#c5a880]' : ''}`} />
                </button>

                {showMoreOptions && (
                  <div className="pt-3 space-y-4">
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
                          type="text"
                          inputMode="numeric"
                          value={formData.displayOrder ?? '1'}
                          onChange={(e) => handleChange('displayOrder', e.target.value)}
                          placeholder="1"
                          className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ============================================================== */}
          {/* TAB 4: MEMBERSHIP PLANS */}
          {/* ============================================================== */}
          {tab === 'plans' && (
            <>
              {/* Primary / Essential Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-300 block mb-1">
                    Plan Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="e.g. 1-Month Base, 3-Month Pro, 12-Month VIP"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-300 block mb-1">
                    Duration (Months) *
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    required
                    value={formData.durationMonths ?? '1'}
                    onChange={(e) => handleChange('durationMonths', e.target.value)}
                    placeholder="1"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-gray-300 block mb-1">
                  Base Price (₹) *
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  value={formData.price ?? '1000'}
                  onChange={(e) => handleChange('price', e.target.value)}
                  placeholder="1000"
                  className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                />
              </div>

              {/* Toggles Strip */}
              <div className="flex flex-wrap items-center gap-6 py-3 px-4 bg-black/40 border border-white/10">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.isActive ?? true}
                    onChange={(e) => handleChange('isActive', e.target.checked)}
                    className="accent-[#c5a880] w-4 h-4 cursor-pointer"
                  />
                  <span className={`text-xs font-mono uppercase font-semibold ${
                    (formData.isActive ?? true) ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {(formData.isActive ?? true) ? '● Active (Visible on Public Site)' : '○ Hidden (Inactive on Public Site)'}
                  </span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.isPopular ?? false}
                    onChange={(e) => handleChange('isPopular', e.target.checked)}
                    className="accent-[#c5a880] w-4 h-4 cursor-pointer"
                  />
                  <span className="text-xs font-mono uppercase text-[#c5a880] font-bold">
                    ★ Featured VIP / Most Popular
                  </span>
                </label>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-gray-300 block mb-1">
                  Included Perks (Comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.featuresSummary || ''}
                  onChange={(e) => handleChange('featuresSummary', e.target.value)}
                  placeholder="Full Gym Floor Access, Floor Trainer Form Guidance, Changing & Bag Storage"
                  className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                />
                <span className="text-[10px] text-gray-500 font-mono mt-1 block">
                  Tip: Leave blank to use realistic tier-based defaults automatically.
                </span>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-gray-300 block mb-1">
                  Short 1-Line Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description || ''}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Flexible month-to-month gym access with hands-on floor guidance..."
                  className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] p-3 text-sm text-white outline-none"
                />
              </div>

              {/* Collapsible Secondary Fields */}
              <div className="pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowMoreOptions(!showMoreOptions)}
                  className="flex items-center justify-between w-full py-2 text-xs font-mono uppercase tracking-wider text-gray-400 hover:text-[#c5a880] transition-colors cursor-pointer"
                >
                  <span>More Options (Optional)</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showMoreOptions ? 'rotate-180 text-[#c5a880]' : ''}`} />
                </button>

                {showMoreOptions && (
                  <div className="pt-3 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                          Plan Code (Auto if blank)
                        </label>
                        <input
                          type="text"
                          value={formData.code || ''}
                          onChange={(e) => handleChange('code', e.target.value)}
                          placeholder={`M${parseInt(formData.durationMonths, 10) || 1}`}
                          className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                          Duration (Days)
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={formData.durationDays || ''}
                          onChange={(e) => handleChange('durationDays', e.target.value)}
                          placeholder={String((parseInt(formData.durationMonths, 10) || 1) * 30)}
                          className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                        />
                      </div>
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
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          type="text"
                          inputMode="numeric"
                          value={formData.displayOrder ?? '1'}
                          onChange={(e) => handleChange('displayOrder', e.target.value)}
                          placeholder="1"
                          className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] px-3.5 py-2 text-sm text-white outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
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
