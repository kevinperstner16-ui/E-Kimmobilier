'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useAuthStore } from '@/lib/auth-store';
import { LockKeyhole, Mail, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function RegisterPage() {
  const register = useAuthStore((state) => state.register);
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    if (password !== confirmation) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    const result = register(name, email, password);
    if (!result.success) {
      setError(result.message);
      return;
    }
    router.push('/');
  };

  return (
    <>
      <Header />
      <main className="min-h-[70vh] bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10">
              <UserPlus className="text-secondary" size={28} />
            </div>
            <h1 className="text-3xl font-bold text-primary">Inscription</h1>
            <p className="mt-2 text-gray-600">Créez votre compte gratuitement</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-gray-700">Nom complet</span>
              <input value={name} onChange={(event) => setName(event.target.value)} required className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-secondary" placeholder="Votre nom" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-gray-700">Email</span>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" className="w-full rounded-lg border border-gray-300 py-2.5 pl-11 pr-4 focus:ring-2 focus:ring-secondary" placeholder="vous@exemple.fr" />
              </div>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-gray-700">Mot de passe</span>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-3 text-gray-400" size={20} />
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} autoComplete="new-password" className="w-full rounded-lg border border-gray-300 py-2.5 pl-11 pr-4 focus:ring-2 focus:ring-secondary" placeholder="8 caractères minimum" />
              </div>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-gray-700">Confirmer le mot de passe</span>
              <input type="password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} required autoComplete="new-password" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-secondary" placeholder="Retapez le mot de passe" />
            </label>

            {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

            <button className="w-full rounded-lg bg-secondary px-4 py-3 font-bold text-white hover:bg-opacity-90">
              Créer mon compte
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Déjà inscrit ?{' '}
            <Link href="/login" className="font-bold text-secondary hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
