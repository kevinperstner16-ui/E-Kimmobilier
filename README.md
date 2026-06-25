# E&K Immobilier - Site Professionnel

Un site web moderne et professionnel pour l'agence immobilière E&K, permettant de présenter les propriétés disponibles avec gestion de la disponibilité en temps réel.

## 🚀 Fonctionnalités

- **Présentation des propriétés** : Galerie d'images, descriptions détaillées, équipements
- **Système de disponibilité** : Statut de disponibilité en temps réel pour chaque propriété
- **Pages détaillées** : Informations complètes sur chaque appartement avec formulaire de demande
- **Admin Dashboard** : Gestion des propriétés et des réservations
- **Design professionnel** : Interface moderne, responsive et élégante
- **Performance** : Optimisé pour les appareils mobiles et de bureau
- **Animations fluides** : Effets visuels subtiles et modernes

## 🛠️ Stack Technologique

- **Framework** : Next.js 15
- **React** : 19
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Animations** : Framer Motion
- **State Management** : Zustand
- **Icons** : Lucide React

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn

## 🔧 Installation

```bash
# Cloner le projet
cd kevin

# Installer les dépendances
npm install

# Ou avec yarn
yarn install
```

## 🚀 Démarrage

### Mode Développement
```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) pour voir le résultat.

### Production
```bash
npm run build
npm start
```

## 📁 Structure du Projet

```
.
├── app/
│   ├── layout.tsx              # Layout principal
│   ├── globals.css             # Styles globaux
│   ├── page.tsx                # Page d'accueil
│   ├── properties/
│   │   └── page.tsx            # Liste des propriétés
│   ├── property/
│   │   └── [id]/
│   │       └── page.tsx        # Détail d'une propriété
│   ├── contact/
│   │   └── page.tsx            # Page de contact
│   └── admin/
│       └── page.tsx            # Tableau de bord admin
├── components/
│   ├── Header.tsx              # Barre de navigation
│   ├── Footer.tsx              # Pied de page
│   ├── PropertyCard.tsx         # Carte de propriété
│   └── PropertyList.tsx         # Liste de propriétés
├── lib/
│   ├── types.ts                # Types TypeScript
│   └── store.ts                # Store Zustand
├── public/                     # Fichiers statiques
├── tailwind.config.ts          # Configuration Tailwind
├── tsconfig.json               # Configuration TypeScript
└── package.json                # Dépendances
```

## 📝 Pages

### 🏠 Accueil (`/`)
- Section héro avec appel à l'action
- Présentation des avantages
- Aperçu des propriétés
- Section CTA

### 🏢 Propriétés (`/properties`)
- Liste complète des appartements
- Filtrage par disponibilité

### 🔍 Détails Propriété (`/property/[id]`)
- Galerie d'images interactive
- Informations détaillées
- Formulaire de demande de visite
- Propriétés similaires

### 📞 Contact (`/contact`)
- Formulaire de contact
- Informations de l'agence
- Horaires d'ouverture
- Localisation

### ⚙️ Admin (`/admin`)
- Tableau de bord avec statistiques
- Gestion des propriétés (ajouter, modifier, supprimer)
- Gestion des réservations

## 🎨 Personnalisation

### Couleurs
Modifiez dans `tailwind.config.ts` :
```typescript
colors: {
  primary: '#1F2937',      // Bleu-gris foncé
  secondary: '#10B981',    // Vert menthe
  accent: '#F59E0B',       // Or
}
```

### Contenu
- Modifiez les propriétés par défaut dans `lib/store.ts`
- Updatez les informations d'entreprise dans `components/Footer.tsx`

### Images
- Remplacez les URLs d'images par vos propres images
- Utilisez des services d'hébergement d'images (Cloudinary, AWS S3, etc.)

## 📱 Responsive Design

Le site est entièrement responsive et optimisé pour :
- 📱 Téléphones (320px+)
- 📱 Tablettes (768px+)
- 🖥️ Ordinateurs (1024px+)
- 🖥️ Grands écrans (1280px+)

## 🔒 Sécurité

Recommandations pour la production :
- Implémenter une authentification pour l'admin
- Valider toutes les données côté serveur
- Utiliser HTTPS
- Implémenter CORS approprié
- Ajouter rate limiting sur les formulaires

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
npm install -g vercel
vercel
```

### Autres plateformes
- Netlify
- Heroku
- AWS
- DigitalOcean

## 📚 Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Zustand](https://github.com/pmndrs/zustand)

## 📄 Licence

Propriété de E&K Immobilier © 2024

## 🤝 Support

Pour toute question ou assistance, contactez : info@ek-immobilier.fr

---

**Développé avec ❤️ pour E&K Immobilier**
