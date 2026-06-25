'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useAuthStore } from '@/lib/auth-store';
import { KeyRound, Mail } from 'lucide-react';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';

export default function ResetPasswordPage() {
  const updatePassword = useAuthStore((state) => state.updatePassword);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setEmail(params.get('email') || '');
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }

    if (password !== confirmation) {
      setError('Les deux mots de passe ne correspondent pas.');
      return;
    }

    const result = updatePassword(email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setIsDone(true);
    setMessage(result.message);
    setPassword('');
    setConfirmation('');
  };

  return (
    <>
      <Header />
      <main className="min-h-[70vh] bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10">
              <KeyRound className="text-secondary" size={28} />
            </div>
            <h1 className="text-3xl font-bold text-primary">Nouveau mot de passe</h1>
            <p className="mt-2 text-gray-600">Choisissez le nouveau mot de passe de votre compte.</p>
          </div>

          {isDone ? (
            <div className="space-y-5">
              <p className="rounded-lg bg-green-50 p-3 text-sm font-semibold text-green-700">{message}</p>
              <Link
                href="/login"
                className="block w-full rounded-lg bg-secondary px-4 py-3 text-center font-bold text-white hover:bg-opacity-90"
              >
                Se connecter
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-gray-700">Email</span>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    autoComplete="email"
                    className="w-full rounded-lg border border-gray-300 py-2.5 pl-11 pr-4 focus:ring-2 focus:ring-secondary"
                    placeholder="vous@exemple.fr"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-gray-700">Nouveau mot de passe</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-secondary"
                  placeholder="8 caractères minimum"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-gray-700">Confirmation</span>
                <input
                  type="password"
                  value={confirmation}
                  onChange={(event) => setConfirmation(event.target.value)}
                  required
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-secondary"
                  placeholder="Retapez le mot de passe"
                />
              </label>

              {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

              <button className="w-full rounded-lg bg-secondary px-4 py-3 font-bold text-white hover:bg-opacity-90">
                Modifier mon mot de passe
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
