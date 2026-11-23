import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { loginAdmin } from '../../lib/api';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [serverWakingHint, setServerWakingHint] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Show friendly hint if response takes longer than 2.5s (e.g. Render spin up)
    const hintTimer = setTimeout(() => {
      setServerWakingHint(true);
    }, 2500);

    try {
      const data = await loginAdmin(username.trim(), password);
      clearTimeout(hintTimer);
      if (onLoginSuccess) {
        onLoginSuccess(data);
      }
    } catch (err) {
      clearTimeout(hintTimer);
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
      setServerWakingHint(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] flex flex-col justify-center items-center p-6 selection:bg-[#c5a880] selection:text-black">
      {/* Subtle Radial Gold Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#c5a880]/10 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-[#0b0b0e] border border-white/10 p-8 sm:p-10 shadow-2xl relative z-10"
      >
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-full border border-[#c5a880]/40 p-1 bg-black/80 mb-3 shadow-[0_0_20px_rgba(197,168,128,0.2)] flex items-center justify-center">
            <img
              src="/assets/logo.png"
              alt="The Fitness Club Logo"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#c5a880]">
              JOSHIYARA ROAD HQ
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-[0.2em] text-white font-display">
            OWNER CONSOLE
          </h1>
          <p className="text-xs text-gray-400 mt-1 font-light">
            Sign in to manage dynamic site content & tiers
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3.5 bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-start gap-2.5"
          >
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Server Wakeup Hint (Render cold-start) */}
        {serverWakingHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-3 bg-[#c5a880]/10 border border-[#c5a880]/30 text-[#e5c99e] text-xs flex items-center gap-2 font-mono"
          >
            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#c5a880]" />
            <span>Connecting to server... waking up container.</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                autoComplete="username"
                className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] text-white text-sm px-4 py-3 pl-10 outline-none transition-colors"
                disabled={isLoading}
              />
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                autoComplete="current-password"
                className="w-full bg-black/60 border border-white/15 focus:border-[#c5a880] text-white text-sm px-4 py-3 pl-10 outline-none transition-colors"
                disabled={isLoading}
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-[#c5a880] hover:bg-[#e5c99e] text-black font-display font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(197,168,128,0.25)] cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-black" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Console</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </>
            )}
          </button>
        </form>

        {/* Return to Public Website */}
        <div className="mt-8 pt-5 border-t border-white/10 text-center">
          <a
            href="/"
            className="text-xs font-mono uppercase tracking-wider text-gray-400 hover:text-[#c5a880] transition-colors"
          >
            ← Return to Public Website
          </a>
        </div>
      </motion.div>
    </div>
  );
}
