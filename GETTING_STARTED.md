# 🚀 Guide de démarrage - E&K Immobilier

## Étape 1 : Installer Node.js

### Windows
1. Téléchargez l'installateur LTS depuis [nodejs.org](https://nodejs.org/)
2. Lancez l'installateur
3. Cochez toutes les options (npm sera inclus automatiquement)
4. Acceptez les conditions et terminez l'installation
5. Redémarrez votre ordinateur

### Vérifier l'installation
Ouvrez PowerShell ou Command Prompt et tapez :
```powershell
node --version
npm --version
```

## Étape 2 : Installer les dépendances

Une fois Node.js installé, ouvrez le terminal dans le dossier du projet et exécutez :

```powershell
cd c:\Users\AdminGE\Desktop\kevin
npm install
```

Cela installera automatiquement :
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Et toutes les autres dépendances

## Étape 3 : Lancer le serveur de développement

```powershell
npm run dev
```

Ouvrez votre navigateur et accédez à : **http://localhost:3000**

## Étape 4 : Explorer le site

### Pages disponibles :
- **🏠 Accueil** : http://localhost:3000/
- **🏢 Propriétés** : http://localhost:3000/properties
- **📞 Contact** : http://localhost:3000/contact
- **⚙️ Admin** : http://localhost:3000/admin

## 📋 Détails du projet

### Propriétés par défaut
Le site inclut 2 appartements :
1. **Appartement Prestige** - 2 chambres, 1200€/mois - ✅ Disponible
2. **Studio Luxe** - 1 chambre, 800€/mois - ⏳ Réservé (disponible 15 août)

### Personnalisation

#### Modifier les propriétés
Éditez `lib/store.ts` - Section `defaultProperties`

#### Changer les couleurs
Éditez `tailwind.config.ts` - Section `colors`

#### Informations de l'agence
Éditez `components/Footer.tsx` pour mettre à jour :
- Téléphone
- Email
- Adresse
- Horaires

#### Ajouter vos images
Modifiez les URLs dans `lib/store.ts` :
```typescript
images: [
  'https://votre-domain.com/image1.jpg',
  'https://votre-domain.com/image2.jpg',
]
```

## 🎨 Couleurs actuelles

| Élément | Couleur | Code |
|---------|---------|------|
| Primaire | Bleu-gris | #1F2937 |
| Secondaire | Vert menthe | #10B981 |
| Accent | Or | #F59E0B |

## 📦 Build pour production

Quand vous êtes prêt à déployer :

```powershell
npm run build
npm start
```

## 🌐 Déploiement recommandé

### Vercel (gratuit et recommandé)
```powershell
npm install -g vercel
vercel
```

### Alternatives :
- Netlify
- Railway
- Render

## 📞 Besoin d'aide ?

Consultez la documentation complète dans **README.md**

---

**Profitez de votre nouveau site professionnel ! 🎉**
