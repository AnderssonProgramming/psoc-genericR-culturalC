'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { User, LogOut, Trophy, BookOpen, Menu, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NavBar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
    setShowUserMenu(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-slate-900/50 backdrop-blur-xl border-b border-white/5 z-50 shadow-lg shadow-black/10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <a
            href="/"
            className="text-2xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            ⚡ Gender Quest
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="/"
            className="text-slate-300 hover:text-white font-medium transition-colors hover:scale-105 transform"
          >
            Inicio
          </a>
          <a
            href="/game"
            className="text-slate-300 hover:text-white font-medium transition-colors hover:scale-105 transform flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 px-4 py-2 rounded-xl border border-purple-500/30"
          >
            🎮 Jugar Quiz
          </a>
          <a
            href="/leaderboard"
            className="text-slate-300 hover:text-white font-medium transition-colors hover:scale-105 transform flex items-center gap-2"
          >
            <Trophy className="w-4 h-4" />
            Ranking
          </a>
          <a
            href="/sections"
            className="text-slate-300 hover:text-white font-medium transition-colors hover:scale-105 transform flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Secciones
          </a>
          <a
            href="/chat"
            className="text-slate-300 hover:text-white font-medium transition-colors hover:scale-105 transform flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Chatbot
          </a>

          {/* User Menu or Login Button */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-white">{user.username}</p>
                  <p className="text-xs text-slate-400">Ver perfil</p>
                </div>
              </button>

              {/* User dropdown menu */}
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                  >
                    {/* User info */}
                    <div className="p-4 border-b border-white/10">
                      <p className="text-sm font-bold text-white">{user.username}</p>
                      <p className="text-xs text-slate-400 mt-1">{user.email}</p>
                    </div>

                    {/* Menu items */}
                    <div className="p-2">
                      <a
                        href="/leaderboard"
                        className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                      >
                        <Trophy className="w-4 h-4" />
                        Ver Ranking
                      </a>
                    </div>

                    {/* Logout */}
                    <div className="p-2 border-t border-white/10">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                      >
                        <LogOut className="w-4 h-4" />
                        Cerrar Sesión
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <a
              href="/login"
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white rounded-xl font-bold hover:from-indigo-600 hover:via-purple-600 hover:to-fuchsia-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 transform hover:scale-105 active:scale-95 transition-all"
            >
              Ingresar
            </a>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden text-white"
        >
          {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="container mx-auto px-6 py-4 space-y-3">
              <a
                href="/"
                className="block text-slate-300 hover:text-white font-medium transition-colors py-2"
              >
                Inicio
              </a>
              <a
                href="/game"
                className="block text-slate-300 hover:text-white font-medium transition-colors py-2 flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 px-4 rounded-xl border border-purple-500/30"
              >
                🎮 Jugar Quiz
              </a>
              <a
                href="/leaderboard"
                className="block text-slate-300 hover:text-white font-medium transition-colors py-2 flex items-center gap-2"
              >
                <Trophy className="w-4 h-4" />
                Ranking
              </a>
              <a
                href="/sections"
                className="block text-slate-300 hover:text-white font-medium transition-colors py-2 flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Secciones
              </a>
              <a
                href="/chat"
                className="block text-slate-300 hover:text-white font-medium transition-colors py-2 flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Chatbot
              </a>

              {user ? (
                <>
                  <div className="border-t border-white/10 pt-3 mt-3">
                    <p className="text-sm font-bold text-white mb-2">{user.username}</p>
                    <p className="text-xs text-slate-400 mb-3">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-red-400 hover:text-red-300 font-medium transition-colors py-2 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <a
                  href="/login"
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white rounded-xl font-bold mt-3"
                >
                  Ingresar
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
