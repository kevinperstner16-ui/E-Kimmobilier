'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">E&K</span>
              </div>
              <h3 className="text-xl font-bold">E&K Immobilier</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Votre partenaire de confiance pour trouver le logement idéal.
              Propriétés de qualité et service professionnel.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Liens rapides</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-secondary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/properties"
                  className="hover:text-secondary transition-colors"
                >
                  Propriétés
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-secondary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-secondary transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Nous contacter</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-secondary" />
                <a
                  href="tel:+33123456789"
                  className="hover:text-secondary transition-colors"
                >
                  +33 6 06 73 79 99
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-secondary" />
                <a
                  href="mailto:info@ek-immobilier.fr"
                  className="hover:text-secondary transition-colors"
                >
                  info@ek-immobilier.fr
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={18} className="text-secondary mt-1" />
                <span>54000 Nancy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-gray-700 pt-8 flex justify-between items-center">
          <p className="text-sm text-gray-300">
            &copy; 2026 E&K Immobilier. Tous droits réservés.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-gray-300 hover:text-secondary transition-colors"
            >
              <span className="text-sm font-semibold">Facebook</span>
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-secondary transition-colors"
            >
              <span className="text-sm font-semibold">Instagram</span>
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-secondary transition-colors"
            >
              <span className="text-sm font-semibold">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
