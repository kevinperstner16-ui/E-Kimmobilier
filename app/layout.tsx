import type { Metadata } from 'next';
import './globals.css';
import DatabaseSync from '@/components/DatabaseSync';

export const metadata: Metadata = {
  title: 'E&K Immobilier - Trouvez votre chez-vous',
  description:
    'Découvrez nos appartements d\'exception avec disponibilité en temps réel. E&K Immobilier, votre partenaire de confiance pour trouver le logement idéal.',
  keywords: 'immobilier, appartements, location, E&K Immobilier',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-white">
        <DatabaseSync />
        {children}
      </body>
    </html>
  );
}
