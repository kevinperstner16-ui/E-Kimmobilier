'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-gray-800 text-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
            <p className="text-gray-200 text-lg">
              Une question ? Envoyez-nous un message et nous vous répondrons rapidement.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-primary mb-8">
                Informations de contact
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone size={24} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-1">Téléphone</h3>
                    <p className="text-gray-600">+33 6 06 73 77 99</p>
                    <p className="text-gray-600">+33 6 7064 06 84</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail size={24} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-1">Email</h3>
                    <p className="text-gray-600">info@ek-immobilier.fr</p>
                    <p className="text-gray-600">support@ek-immobilier.fr</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-1">Adresse</h3>
                    <p className="text-gray-600">NANCY</p>
                    <p className="text-gray-600">54000, Nancy</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock size={24} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-1">Horaires</h3>
                    <p className="text-gray-600">Lun - Ven: 9h - 18h</p>
                    <p className="text-gray-600">Sam: 10h - 16h</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-primary mb-8">Envoyez-nous un message</h2>

                {submitted && (
                  <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg border border-green-300">
                    ✓ Merci ! Votre message a été envoyé avec succès.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                      placeholder="Votre email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                      placeholder="Votre numéro"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Sujet
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="question">Question générale</option>
                      <option value="visite">Demande de visite</option>
                      <option value="reservation">Réservation</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                      placeholder="Votre message..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-secondary hover:bg-opacity-90 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
                  >
                    Envoyer le message
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
