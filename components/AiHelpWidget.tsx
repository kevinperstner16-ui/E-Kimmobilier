'use client';

import Link from 'next/link';
import { FormEvent, useMemo, useRef, useState } from 'react';
import { Bot, Home, MessageCircle, Send, UserRound, X } from 'lucide-react';
import { useAuthStore } from '@/lib/auth-store';
import { usePropertyStore } from '@/lib/store';
import { formatFrenchDate, getAvailabilityLabel } from '@/lib/availability';

type ChatMessage = {
  id: string;
  role: 'assistant' | 'user';
  text: string;
};

const quickQuestions = [
  'Quels biens sont disponibles ?',
  'Comment faire une demande de visite ?',
  'Comment suivre ma demande ?',
  'J ai un probleme de compte',
];

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9@. ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export default function AiHelpWidget() {
  const properties = usePropertyStore((state) => state.properties);
  const bookings = usePropertyStore((state) => state.bookings);
  const currentUser = useAuthStore((state) => state.currentUser);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Bonjour, je suis l'assistant E&K. Je peux aider sur les biens, les demandes de visite, le suivi, les comptes et l'espace admin.",
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const availableProperties = useMemo(
    () => properties.filter((property) => property.available),
    [properties]
  );

  const createPropertySummary = () => {
    if (!properties.length) {
      return "Je ne trouve aucune annonce chargee pour le moment. Essaie la page Proprietes ou contacte l'equipe E&K.";
    }

    const lines = properties.slice(0, 5).map((property) => {
      const status = getAvailabilityLabel(property);
      return `- ${property.name}, ${property.location}, ${property.bedrooms} chambre(s), ${property.area}m2, ${property.price}€/mois, ${status}`;
    });

    return [
      `Il y a ${properties.length} bien(s) sur le site, dont ${availableProperties.length} disponible(s).`,
      ...lines,
      'Pour voir les photos et envoyer une demande, va dans Proprietes.',
    ].join('\n');
  };

  const findMatchingProperty = (question: string) => {
    const normalizedQuestion = normalize(question);

    return properties.find((property) => {
      const haystack = normalize(
        [property.name, property.location, property.description, ...property.amenities].join(' ')
      );
      return haystack
        .split(' ')
        .filter((word) => word.length >= 4)
        .some((word) => normalizedQuestion.includes(word));
    });
  };

  const answerQuestion = (question: string) => {
    const q = normalize(question);
    const matchedProperty = findMatchingProperty(question);

    if (matchedProperty) {
      return [
        `${matchedProperty.name} est a ${matchedProperty.location}.`,
        `Prix : ${matchedProperty.price}€/mois. Surface : ${matchedProperty.area}m2. Chambres : ${matchedProperty.bedrooms}.`,
        `Statut : ${getAvailabilityLabel(matchedProperty)}.`,
        matchedProperty.availableFrom
          ? `Date indiquee : ${formatFrenchDate(matchedProperty.availableFrom)}.`
          : '',
        'Tu peux ouvrir la page du bien depuis Proprietes pour voir les photos et demander une visite.',
      ]
        .filter(Boolean)
        .join('\n');
    }

    if (/(dispo|disponible|bien|appartement|studio|prix|loyer|chambre|surface|annonce|location)/.test(q)) {
      return createPropertySummary();
    }

    if (/(visite|reservation|demande|rendez|rdv|book)/.test(q)) {
      return [
        "Pour faire une demande de visite :",
        '1. Ouvre la page Proprietes.',
        '2. Choisis le bien qui t interesse.',
        '3. Remplis le formulaire de demande.',
        '4. Garde la reference pour suivre le statut dans Suivi demande.',
      ].join('\n');
    }

    if (/(suivi|reference|statut|dossier|demande)/.test(q)) {
      return "Pour suivre une demande, va dans Suivi demande puis entre ton email ou ta reference. Si tu as perdu ta reference, utilise ton email.";
    }

    if (/(contact|telephone|tel|email|mail|adresse|agence)/.test(q)) {
      return "Pour contacter E&K, utilise la page Contact. Tu peux y laisser ton nom, ton email, ton telephone et ton message.";
    }

    if (/(compte|connexion|login|inscription|mot de passe|mdp|reset|password)/.test(q)) {
      return "Pour un probleme de compte, essaie d'abord Connexion ou Inscription. Si tu as oublie ton mot de passe, demande a l'equipe E&K de t'envoyer un lien de reset.";
    }

    if (/(admin|administration|dashboard|tableau)/.test(q)) {
      if (currentUser?.role === 'admin') {
        return "Tu es connecte en admin. Tu peux ouvrir le tableau admin pour gerer les annonces, reservations, comptes et logs selon tes permissions.";
      }

      return "L'espace admin est reserve aux comptes autorises. Connecte-toi avec un compte admin pour y acceder.";
    }

    if (/(bonjour|salut|hello|cc|coucou)/.test(q)) {
      return "Bonjour ! Tu peux me demander les biens disponibles, comment reserver une visite, suivre une demande ou regler un souci de compte.";
    }

    if (bookings.length && /(combien|nombre|reservations|demandes)/.test(q)) {
      return `Il y a ${bookings.length} demande(s) de visite enregistree(s) dans ce navigateur. Pour les gerer, ouvre le panneau admin avec un compte autorise.`;
    }

    return "Je peux aider sur les annonces, les disponibilites, les prix, les visites, le suivi de demande, les comptes et l'admin. Reformule ta question avec le nom du bien ou le sujet.";
  };

  const sendMessage = (value = input) => {
    const question = value.trim();
    if (!question) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: question,
    };
    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      text: answerQuestion(question),
    };

    setMessages((state) => [...state, userMessage, assistantMessage]);
    setInput('');
    window.setTimeout(() => inputRef.current?.focus(), 20);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <div className="fixed bottom-4 right-4 z-[70]">
      {isOpen && (
        <div className="mb-3 flex h-[min(620px,calc(100vh-7rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-primary px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <div>
                <p className="text-sm font-bold leading-tight">Assistant E&K</p>
                <p className="text-xs text-white/80">Aide site et annonces</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded p-1 hover:bg-white/10"
              aria-label="Fermer l'assistant"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                    <Bot size={16} />
                  </span>
                )}
                <div
                  className={`max-w-[82%] whitespace-pre-line rounded-lg px-3 py-2 text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'bg-secondary text-white'
                      : 'border border-gray-200 bg-white text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
                {message.role === 'user' && (
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <UserRound size={16} />
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 bg-white p-3">
            <div className="mb-3 grid grid-cols-2 gap-2">
              {quickQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => sendMessage(question)}
                  className="rounded-lg border border-gray-200 px-2 py-2 text-left text-xs font-semibold text-gray-700 hover:border-secondary hover:text-secondary"
                >
                  {question}
                </button>
              ))}
            </div>

            <div className="mb-3 flex gap-2 text-xs">
              <Link
                href="/properties"
                className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-2 py-1 font-semibold text-gray-700 hover:text-secondary"
                onClick={() => setIsOpen(false)}
              >
                <Home size={14} />
                Proprietes
              </Link>
              <Link
                href="/contact"
                className="rounded-lg bg-gray-100 px-2 py-1 font-semibold text-gray-700 hover:text-secondary"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/suivi"
                className="rounded-lg bg-gray-100 px-2 py-1 font-semibold text-gray-700 hover:text-secondary"
                onClick={() => setIsOpen(false)}
              >
                Suivi
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Pose ta question..."
              />
              <button
                type="submit"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-white hover:bg-opacity-90"
                aria-label="Envoyer"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-white shadow-xl transition-transform hover:scale-105"
        aria-label="Ouvrir l'assistant E&K"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={26} />}
      </button>
    </div>
  );
}
