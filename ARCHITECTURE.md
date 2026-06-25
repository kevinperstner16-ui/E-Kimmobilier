# 🏗️ Architecture du Projet - E&K Immobilier

## 📐 Vue d'ensemble

```
kevin/
├── app/                    # Pages et layouts Next.js
├── components/            # Composants React réutilisables
├── lib/                   # Utilitaires, types, store
├── public/               # Fichiers statiques
├── .vscode/              # Configuration VS Code
├── package.json          # Dépendances npm
├── tsconfig.json         # Configuration TypeScript
├── tailwind.config.ts    # Configuration Tailwind CSS
├── next.config.ts        # Configuration Next.js
└── README.md             # Documentation
```

---

## 📁 Structure détaillée

### 📂 app/ - Pages et Layouts

```
app/
├── layout.tsx                    # Layout racine
├── globals.css                   # Styles globaux
├── page.tsx                      # Page d'accueil (/)
├── properties/
│   └── page.tsx                  # Liste des propriétés
├── property/
│   └── [id]/
│       └── page.tsx              # Détails d'une propriété
├── contact/
│   └── page.tsx                  # Page de contact
└── admin/
    └── page.tsx                  # Tableau de bord admin
```

**Structure Next.js App Router** :
- `page.tsx` = Route publique
- `layout.tsx` = Wrapper pour enfants
- `[id]` = Route dynamique avec paramètre

---

### 🧩 components/ - Composants réutilisables

```
components/
├── Header.tsx                    # Navigation principale
│   ├── Logo
│   ├── Menu desktop
│   ├── Mobile menu
│   └── Liens
├── Footer.tsx                    # Pied de page
│   ├── Informations agence
│   ├── Liens rapides
│   ├── Contact
│   └── Réseaux sociaux
├── PropertyCard.tsx              # Carte d'une propriété
│   ├── Image
│   ├── Titre et localisation
│   ├── Prix
│   ├── Caractéristiques
│   └── Bouton "Voir détails"
└── PropertyList.tsx              # Grille de propriétés
    ├── Récupère les données
    ├── Boucle sur PropertyCard
    └── Layout responsive
```

**Conventions** :
- Composants `'use client'` pour interactivité client
- Props typées avec TypeScript
- Nommage descriptif (PropertyCard, not PCard)

---

### 📚 lib/ - Logique partagée

```
lib/
├── types.ts                      # Définitions TypeScript
│   ├── Property interface
│   ├── Booking interface
│   └── Review interface
└── store.ts                      # Zustand store
    ├── État des propriétés
    ├── État des réservations
    └── Actions (add, update, delete)
```

#### types.ts
```typescript
export type Property = {
  id: string;
  name: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  available: boolean;
  // ...
}

export type Booking = {
  id: string;
  propertyId: string;
  name: string;
  email: string;
  // ...
}
```

#### store.ts (Zustand)
```typescript
const usePropertyStore = create((set) => ({
  properties: [],
  bookings: [],
  addProperty: (property) => set(...),
  updateProperty: (id, property) => set(...),
  deleteProperty: (id) => set(...),
  // ...
}))
```

---

## 🔄 Flux de données

### 1️⃣ Pages & Composants

```
Page (app/page.tsx)
    ↓
Header + Footer (layout)
    ↓
PropertyList (composant)
    ↓
PropertyCard × N (boucle)
    ↓
Données du Store (Zustand)
```

### 2️⃣ Mise à jour des données

```
User Action (click, form)
    ↓
Event Handler
    ↓
Store.addProperty/updateProperty/deleteProperty
    ↓
State Update
    ↓
Re-render Components
    ↓
UI Update
```

---

## 🎨 Styles et Design

### Tailwind CSS
- **Utilitaire-first** : classes directement dans JSX
- **Responsive** : `md:`, `lg:`, `xl:` prefixes
- **States** : `hover:`, `focus:`, `active:` etc.

Exemple :
```tsx
<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
  Content
</div>
```

### Animations (Framer Motion)
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Icônes (Lucide React)
```tsx
import { Home, MapPin, Phone } from 'lucide-react';

<Home size={24} className="text-secondary" />
```

---

## 🔐 Gestion d'état

### Zustand (Léger et performant)

```typescript
// Utilisation dans composants
const { properties, addProperty } = usePropertyStore();

// Hook personnalisé
const properties = usePropertyStore(state => state.properties);
```

**Avantages** :
- ✅ Léger (2KB)
- ✅ Simple à apprendre
- ✅ Pas de boilerplate
- ✅ Performant

**Alternatives** : Redux, Context, Jotai

---

## 🌍 Routing

### Structure Next.js App Router

| Route | Fichier | Description |
|-------|---------|-------------|
| `/` | app/page.tsx | Accueil |
| `/properties` | app/properties/page.tsx | Listing |
| `/property/1` | app/property/[id]/page.tsx | Détails |
| `/contact` | app/contact/page.tsx | Contact |
| `/admin` | app/admin/page.tsx | Admin |

### Dynamic Routes
```typescript
// app/property/[id]/page.tsx
export default function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = params as { id: string };
  // ...
}
```

---

## 🛠️ Configuration

### tsconfig.json
- Mode strict TypeScript activé
- Alias `@/*` pour imports simplifiés

### tailwind.config.ts
- Thème personnalisé (couleurs, animations)
- Extensions d'animations

### next.config.ts
- Optimisation images
- Support TypeScript strict

---

## 📦 Dépendances principales

| Package | Version | Utilité |
|---------|---------|---------|
| next | 15 | Framework |
| react | 19 | Bibliothèque UI |
| typescript | 5 | Typage |
| tailwindcss | 3.3 | Styles |
| framer-motion | 10.16 | Animations |
| zustand | 4.4 | État global |
| lucide-react | 0.263 | Icônes |

---

## 🔄 Cycle de vie

### 1. Chargement initial
```
Utilisateur accède à /
    ↓
Next.js charge app/page.tsx
    ↓
Appelle Header + PropertyList
    ↓
Zustand initialise les données
    ↓
Composants rendent
    ↓
Page affichée
```

### 2. Interaction utilisateur
```
Click sur "Voir détails"
    ↓
Navigate vers /property/[id]
    ↓
Charge app/property/[id]/page.tsx
    ↓
Récupère propriété du store
    ↓
Affiche détails + galerie
```

### 3. Admin - Ajouter propriété
```
Remplit formulaire
    ↓
Submit → handleAddProperty()
    ↓
store.addProperty(newProperty)
    ↓
State updated
    ↓
Liste re-renderée
    ↓
Propriété affichée
```

---

## 🎯 Bonnes pratiques utilisées

### ✅ Sécurité
- TypeScript : Typage strict
- Validation côté client
- Pas d'injection XSS possible

### ✅ Performance
- Next.js optimisations
- Lazy loading d'images
- Animations GPU
- Code splitting automatique

### ✅ UX/UI
- Navigation intuitive
- Mobile-first design
- Animations fluides
- Feedback utilisateur clair

### ✅ Maintenabilité
- Code organisé et modulaire
- Types TypeScript explicites
- Nommage cohérent
- Composants réutilisables

---

## 🚀 Scalabilité future

### Pour ajouter une BDD :
1. Remplacer Zustand par API calls
2. Créer API routes (app/api/*)
3. Connecter à PostgreSQL/MongoDB

### Pour ajouter un système de paiement :
1. Intégrer Stripe API
2. Créer webhook handlers
3. Sauvegarder transactions

### Pour ajouter authentification :
1. NextAuth ou similar
2. Pages protégées (/admin)
3. Middleware de vérification

---

## 📊 Diagramme de composants

```
RootLayout
├── Header
├── [Page Content]
│   ├── Hero Section
│   ├── PropertyList
│   │   └── PropertyCard (×N)
│   │       ├── Image Gallery
│   │       ├── Property Info
│   │       └── Amenities
│   └── CTA Section
└── Footer
```

---

## 🔗 Flux de données complet

```
Browser Request
    ↓
Next.js Server
    ↓
Render Page Component
    ↓
Use Zustand Store
    ↓
Render Child Components (Header, PropertyList, Footer)
    ↓
Hydrate Client Side
    ↓
Interactive Components Ready
    ↓
User Interactions
    ↓
State Updates via Store
    ↓
Re-render & Update DOM
```

---

## 📝 Conventions de nommage

### Fichiers
- Pages : `page.tsx`
- Composants : `ComponentName.tsx`
- Utilities : `utilityName.ts`
- Styles : inclus dans fichier

### Variables
- Propriétés : `camelCase`
- Constantes : `UPPER_CASE`
- Types : `PascalCase`

### Composants
- Fonctions : `export default` pour pages
- Exports nommés pour composants réutilisables

---

## 🎓 Pour apprendre plus

- [Next.js App Router](https://nextjs.org/docs/app)
- [React Hooks](https://react.dev/reference/react)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Architecture moderne, scalable et maintenable ! 🎉**
