import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Calendar,
  ShoppingBag,
  CreditCard,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
} from 'lucide-react';
import {
  removeToken,
  fetchAdminTransformations,
  createTransformation,
  updateTransformation,
  deleteTransformation,
  fetchAdminEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  fetchAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchAdminPlans,
  createPlan,
  updatePlan,
  deletePlan,
} from '../../lib/api';
import AdminItemModal from './AdminItemModal';

const TABS = [
  { id: 'transformations', label: 'Transformations', icon: Sparkles },
  { id: 'events', label: 'Invitational Events', icon: Calendar },
  { id: 'products', label: 'Pro Shop Products', icon: ShoppingBag },
  { id: 'plans', label: 'Membership Plans', icon: CreditCard },
];

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('transformations');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalState, setModalState] = useState({ isOpen: false, item: null });
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', message: string }

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const loadCurrentTabItems = async () => {
    setIsLoading(true);
    try {
      let data = [];
      if (activeTab === 'transformations') data = await fetchAdminTransformations();
      if (activeTab === 'events') data = await fetchAdminEvents();
      if (activeTab === 'products') data = await fetchAdminProducts();
      if (activeTab === 'plans') data = await fetchAdminPlans();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      showToast(err.message || 'Failed to fetch items from backend', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCurrentTabItems();
  }, [activeTab]);

  const handleOpenAdd = () => {
    setModalState({ isOpen: true, item: null });
  };

  const handleOpenEdit = (item) => {
    setModalState({ isOpen: true, item });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, item: null });
  };

  const handleSaveItem = async (formData) => {
    const isEdit = Boolean(modalState.item?.id);
    const id = modalState.item?.id;

    if (activeTab === 'transformations') {
      if (isEdit) await updateTransformation(id, formData);
      else await createTransformation(formData);
    } else if (activeTab === 'events') {
      if (isEdit) await updateEvent(id, formData);
      else await createEvent(formData);
    } else if (activeTab === 'products') {
      if (isEdit) await updateProduct(id, formData);
      else await createProduct(formData);
    } else if (activeTab === 'plans') {
      if (isEdit) await updatePlan(id, formData);
      else await createPlan(formData);
    }

    showToast(`${isEdit ? 'Updated' : 'Created'} item successfully!`);
    await loadCurrentTabItems();
  };

  const handleDeleteItem = async (item) => {
    const title = item.name || item.title || `Item #${item.id}`;
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      if (activeTab === 'transformations') await deleteTransformation(item.id);
      if (activeTab === 'events') await deleteEvent(item.id);
      if (activeTab === 'products') await deleteProduct(item.id);
      if (activeTab === 'plans') await deletePlan(item.id);

      showToast(`Deleted "${title}" successfully.`);
      await loadCurrentTabItems();
    } catch (err) {
      showToast(err.message || 'Failed to delete item', 'error');
    }
  };

  const handleLogoutClick = () => {
    removeToken();
    if (onLogout) onLogout();
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col selection:bg-[#c5a880] selection:text-black">
      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 right-4 z-[999999] px-4 py-3 rounded shadow-2xl border text-xs flex items-center gap-2 ${
              toast.type === 'error'
                ? 'bg-red-950/95 border-red-500 text-red-200'
                : 'bg-black/95 border-[#c5a880] text-white'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-400" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-[#c5a880]" />
            )}
            <span className="font-mono">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Console Navigation Bar */}
      <header className="bg-[#0b0b0e] border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-[#c5a880]/40 p-0.5 bg-black">
            <img src="/assets/logo.png" alt="Logo" className="w-full h-full object-contain rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#c5a880] font-bold">
                JOSHIYARA ROAD HQ
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-black font-display tracking-widest text-white uppercase">
              OWNER ADMIN CONSOLE
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 border border-white/15 hover:border-[#c5a880] text-gray-300 hover:text-white text-xs font-mono uppercase tracking-wider hidden sm:flex items-center gap-1.5 transition-colors"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#c5a880]" />
          </a>
          <button
            type="button"
            onClick={handleLogoutClick}
            className="px-3.5 py-1.5 bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl w-full mx-auto p-4 sm:p-8 flex-1 flex flex-col">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 overflow-x-auto pb-1 no-scrollbar mb-6">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-xs font-mono uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-[#c5a880] text-white bg-white/[0.04]'
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/[0.02]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#c5a880]' : 'text-gray-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Section Header with "Add New" Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-display font-black uppercase tracking-wider text-white">
              {TABS.find((t) => t.id === activeTab)?.label}
            </h2>
            <p className="text-xs text-gray-400 font-mono mt-0.5">
              {items.length} {items.length === 1 ? 'item' : 'items'} loaded from database
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-5 py-2.5 bg-[#c5a880] hover:bg-[#e5c99e] text-black font-display font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-[0_0_15px_rgba(197,168,128,0.25)] transition-all cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 text-black" />
            <span>Add New Item</span>
          </button>
        </div>

        {/* Table / Card List */}
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center p-16 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#c5a880] mb-3" />
            <p className="text-xs font-mono uppercase tracking-widest text-gray-400">
              Loading {activeTab}...
            </p>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 border border-dashed border-white/10 p-12 flex flex-col items-center justify-center text-center bg-[#0b0b0e]">
            <p className="text-sm font-mono text-gray-400 mb-4">
              No items found in {activeTab}.
            </p>
            <button
              type="button"
              onClick={handleOpenAdd}
              className="px-4 py-2 border border-[#c5a880] text-[#c5a880] hover:bg-[#c5a880] hover:text-black text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
            >
              + Create First Item
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item, idx) => {
              const imageSrc = item.afterImage || item.beforeImage || item.image;
              return (
                <div
                  key={item.id || idx}
                  className="bg-[#0b0b0e] border border-white/10 hover:border-[#c5a880]/50 transition-all p-4 sm:p-5 flex flex-col justify-between shadow-lg"
                >
                  <div>
                    {/* Thumbnail Preview */}
                    <div className="w-full h-40 bg-black/80 border border-white/10 overflow-hidden mb-3 relative flex items-center justify-center">
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt="Thumbnail"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-600 gap-1.5">
                          <ImageIcon className="w-8 h-8" />
                          <span className="text-[10px] font-mono">No Image</span>
                        </div>
                      )}

                      {/* Top Badges */}
                      <div className="absolute top-2 left-2 flex items-center gap-1.5">
                        {item.displayOrder !== undefined && (
                          <span className="px-2 py-0.5 bg-black/80 text-[10px] font-mono text-white/70 border border-white/10">
                            #{item.displayOrder}
                          </span>
                        )}
                        {item.badge && (
                          <span className="px-2 py-0.5 bg-[#c5a880] text-[10px] font-mono text-black font-bold uppercase">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Titles */}
                    <h3 className="font-display font-bold text-base sm:text-lg text-white uppercase tracking-tight line-clamp-1">
                      {item.name || item.title}
                    </h3>
                    <p className="text-xs text-[#c5a880] font-mono mb-2">
                      {item.achievement || item.tag || item.edition || (item.price ? `₹${item.price}` : '')}
                    </p>

                    {/* Secondary details */}
                    <p className="text-xs text-gray-400 font-light line-clamp-2">
                      {item.quote || item.caption || item.details || item.featuresSummary || item.description}
                    </p>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(item)}
                      className="px-3 py-1.5 bg-white/10 hover:bg-[#c5a880] hover:text-black text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item)}
                      className="px-3 py-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Edit / Add Modal */}
      {modalState.isOpen && (
        <AdminItemModal
          key={`${activeTab}-${modalState.item?.id ?? 'new'}`}
          isOpen={modalState.isOpen}
          item={modalState.item}
          tab={activeTab}
          onClose={handleCloseModal}
          onSave={handleSaveItem}
        />
      )}
    </div>
  );
}
