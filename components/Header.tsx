'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { LogIn, LogOut, Menu, UserPlus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/auth-store';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const currentUser = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E&K</span>
              </div>
              <span className="text-xl font-bold text-primary hidden sm:inline">
                E&K Immobilier
              </span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-secondary transition-colors"
            >
              Accueil
            </Link>
            <Link
              href="/properties"
              className="text-gray-700 hover:text-secondary transition-colors"
            >
              Propriétés
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-secondary transition-colors"
            >
              Contact
            </Link>
            {mounted && currentUser?.role === 'admin' && (
              <Link href="/admin" className="text-gray-700 hover:text-secondary transition-colors">
                Admin
              </Link>
            )}
            {mounted && currentUser ? (
              <div className="flex items-center gap-3">
                <span className="max-w-32 truncate text-sm font-semibold text-primary">
                  {currentUser.name}
                </span>
                <button onClick={handleLogout} className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-white hover:bg-opacity-90">
                  <LogOut size={17} /> Déconnexion
                </button>
              </div>
            ) : mounted ? (
              <div className="flex items-center gap-3">
                <Link href="/login" className="flex items-center gap-2 text-gray-700 hover:text-secondary">
                  <LogIn size={17} /> Connexion
                </Link>
                <Link href="/register" className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-white hover:bg-opacity-90">
                  <UserPlus size={17} /> Inscription
                </Link>
              </div>
            ) : null}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-4 pb-4 border-t pt-4"
          >
            <Link
              href="/"
              className="block text-gray-700 hover:text-secondary transition-colors py-2"
            >
              Accueil
            </Link>
            <Link
              href="/properties"
              className="block text-gray-700 hover:text-secondary transition-colors py-2"
            >
              Propriétés
            </Link>
            <Link
              href="/contact"
              className="block text-gray-700 hover:text-secondary transition-colors py-2"
            >
              Contact
            </Link>
            {mounted && currentUser?.role === 'admin' && (
              <Link href="/admin" onClick={() => setIsOpen(false)} className="block py-2 text-gray-700 hover:text-secondary">
                Administration
              </Link>
            )}
            {mounted && currentUser ? (
              <>
                <p className="py-2 text-sm font-semibold text-primary">Connecté : {currentUser.name}</p>
                <button onClick={handleLogout} className="mt-2 flex w-full items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-white">
                  <LogOut size={18} /> Déconnexion
                </button>
              </>
            ) : mounted ? (
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link href="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 rounded-lg border border-secondary px-3 py-2 text-secondary">
                  <LogIn size={17} /> Connexion
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 rounded-lg bg-secondary px-3 py-2 text-white">
                  <UserPlus size={17} /> Inscription
                </Link>
              </div>
            ) : null}
          </motion.div>
        )}
      </nav>
    </header>
  );
}
