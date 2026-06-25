# 🎨 Guide de Personnalisation - E&K Immobilier

## 📋 Table des matières
1. [Modifier les informations agence](#modifier-les-informations-agence)
2. [Ajouter des propriétés](#ajouter-des-propriétés)
3. [Changer les couleurs](#changer-les-couleurs)
4. [Ajouter des images](#ajouter-des-images)
5. [Modifier le contenu](#modifier-le-contenu)

---

## Modifier les informations agence

### Téléphone, Email, Adresse

**Fichier** : `components/Footer.tsx`

Cherchez cette section et modifiez :
```typescript
<a href="tel:+33123456789">
  +33 1 23 45 67 89  // ← Votre numéro
</a>

<a href="mailto:info@ek-immobilier.fr">
  info@ek-immobilier.fr  // ← Votre email
</a>

<span>123 Avenue de la Paix, 75000 Paris</span>  // ← Votre adresse
```

### Logo/Nom de l'agence

**Fichier** : `components/Header.tsx`

Cherchez :
```typescript
<span className="text-xl font-bold text-primary hidden sm:inline">
  E&K Immobilier  // ← Votre nom
</span>
```

---

## Ajouter des propriétés

### Méthode 1 : Code (Recommandé pour démarrer)

**Fichier** : `lib/store.ts`

Cherchez `defaultProperties` et ajoutez une nouvelle propriété :

```typescript
{
  id: '3',
  name: 'T3 Vue Mer',
  location: 'Bord de plage',
  price: 1500,
  bedrooms: 3,
  bathrooms: 2,
  area: 90,
  description: 'Magnifique T3 avec vue directe sur la mer...',
  images: [
    'https://images.unsplash.com/photo-XXXXX?w=800&q=80',
    'https://images.unsplash.com/photo-XXXXX?w=800&q=80',
  ],
  amenities: ['WiFi', 'Climatisation', 'Parking', 'Vue mer'],
  available: true,
  features: {
    wifi: true,
    parking: true,
    heating: true,
    airConditioning: true,
    kitchen: true,
    balcony: true,
  },
}
```

### Méthode 2 : Admin Dashboard

1. Ouvrez http://localhost:3000/admin
2. Cliquez sur "Ajouter une propriété"
3. Remplissez le formulaire
4. Cliquez sur "Créer la propriété"

---

## Changer les couleurs

**Fichier** : `tailwind.config.ts`

Cherchez la section `colors` et modifiez :

```typescript
colors: {
  primary: '#1F2937',      // Couleur principale (texte, headings)
  secondary: '#10B981',    // Couleur boutons, éléments importants
  accent: '#F59E0B',       // Couleur accents
}
```

### Exemples de combinaisons :

#### 🔵 Bleu & Cyan
```typescript
primary: '#1E40AF',    // Bleu profond
secondary: '#06B6D4',  // Cyan
accent: '#0EA5E9',     // Bleu ciel
```

#### 💜 Pourpre & Rose
```typescript
primary: '#6B21A8',    // Pourpre foncé
secondary: '#EC4899',  // Rose
accent: '#A855F7',     // Violet
```

#### 🌳 Vert & Teal
```typescript
primary: '#15803D',    // Vert foncé
secondary: '#14B8A6',  // Teal
accent: '#10B981',     // Vert menthe
```

#### 🔴 Rouge & Orange
```typescript
primary: '#7F1D1D',    // Rouge foncé
secondary: '#DC2626',  // Rouge vif
accent: '#F97316',     // Orange
```

---

## Ajouter des images

### Sources d'images recommandées :

1. **Unsplash** (Gratuit, haute qualité)
   - https://unsplash.com
   - Recherchez "apartment", "interior", "bedroom"

2. **Pexels** (Gratuit)
   - https://pexels.com

3. **Votre propre serveur** (Recommandé)
   - Utilisez AWS S3, Cloudinary, ou similaire

### Format des URLs

```typescript
images: [
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
]
```

---

## Modifier le contenu

### Page d'accueil

**Fichier** : `app/page.tsx`

Modifiez les textes :
```typescript
<h1 className="text-5xl md:text-6xl font-bold mb-6">
  Trouvez votre <span className="text-secondary">Chez-vous</span>
</h1>

<p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
  Découvrez nos appartements d'exception...  // ← Votre texte
</p>
```

### Page de contact

**Fichier** : `app/contact/page.tsx`

Modifiez les informations :
```typescript
<p className="text-gray-600">+33 1 23 45 67 89</p>      // Téléphone
<p className="text-gray-600">info@ek-immobilier.fr</p>  // Email
<p className="text-gray-600">123 Avenue de la Paix</p>  // Adresse
<p className="text-gray-600">Lun - Ven: 9h - 18h</p>    // Horaires
```

### Menu de navigation

**Fichier** : `components/Header.tsx`

Modifiez les liens :
```typescript
<Link href="/" className="...">Accueil</Link>
<Link href="/properties" className="...">Propriétés</Link>
<Link href="/contact" className="...">Contact</Link>
<Link href="/admin" className="...">Admin</Link>
```

---

## 🎨 Personnalisation avancée

### Modifier les animations

**Fichier** : `tailwind.config.ts`

```typescript
keyframes: {
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  slideUp: {
    '0%': { transform: 'translateY(20px)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },
}
```

### Ajouter des fonts personnalisées

**Fichier** : `app/layout.tsx`

```typescript
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
```

---

## ✅ Checklist de personnalisation

### Avant lancement :
- [ ] Logo/Nom agence
- [ ] Téléphone
- [ ] Email
- [ ] Adresse
- [ ] Horaires
- [ ] Propriétés réelles
- [ ] Images de qualité
- [ ] Couleurs adaptées
- [ ] Contenu français correct
- [ ] Liens sociaux (Facebook, Instagram)
- [ ] Domaine personnalisé

---

## 🚀 Prochaines étapes

### Ajouter des fonctionnalités :
1. **Système de réservation** - Calendrier de disponibilité
2. **Email confirmations** - Notifications automatiques
3. **Paiement en ligne** - Dépôts de garantie
4. **Commentaires clients** - Avis et évaluations
5. **Blog** - Articles sur l'immobilier
6. **Virtual tour** - Visite 3D des appartements

### Services recommandés :
- **Email** : Sendgrid, Mailgun, Brevo
- **Paiement** : Stripe, PayPal, Square
- **Photos 3D** : Matterport, Zillow 3D
- **Hosting** : Vercel, Netlify, AWS

---

## 📞 Besoin d'aide ?

Consultez la documentation officielle :
- [Next.js](https://nextjs.org/docs)
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

**Bonne personnalisation ! 🎉**
