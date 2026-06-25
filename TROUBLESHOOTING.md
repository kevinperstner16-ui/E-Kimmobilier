# 🔧 Dépannage - E&K Immobilier

## 🚨 Problèmes courants et solutions

### 1. ❌ "npm is not recognized"

**Problème** : Node.js n'est pas installé ou pas dans le PATH

**Solution** :
1. Téléchargez Node.js depuis [nodejs.org](https://nodejs.org/)
2. Installez la version **LTS** (recommandée)
3. Cochez "Add to PATH" pendant l'installation
4. Redémarrez votre ordinateur
5. Ouvrez un nouveau terminal et essayez `npm --version`

---

### 2. ❌ Erreur "Module not found"

**Problème** : Les dépendances ne sont pas installées

**Solution** :
```powershell
# Assurez-vous d'être dans le bon dossier
cd c:\Users\AdminGE\Desktop\kevin

# Supprimez node_modules et le cache
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Réinstallez
npm install
```

---

### 3. ❌ Port 3000 déjà utilisé

**Problème** : "Port 3000 is already in use"

**Solution** :
```powershell
# Trouvez le processus utilisant le port 3000
Get-NetTCPConnection -LocalPort 3000 | Select OwningProcess

# Tue le processus (remplacez PID par le numéro)
Stop-Process -Id PID -Force

# Ou lancez sur un port différent
npm run dev -- -p 3001
```

---

### 4. ❌ Erreur de compilation TypeScript

**Problème** : "Type 'X' is not assignable to type 'Y'"

**Solution** :
1. Vérifiez les types dans `lib/types.ts`
2. Assurez-vous que `tsconfig.json` est correct
3. Redémarrez le serveur de dev
4. Vérifiez les imports

Exemple :
```typescript
// ❌ Faux
const prop: Property = { name: 'Test' }; // Manquent des propriétés

// ✅ Correct
const prop: Property = {
  id: '1',
  name: 'Test',
  // ... autres propriétés requises
};
```

---

### 5. ❌ Les images ne s'affichent pas

**Problème** : Images 404 ou grises

**Solution** :
1. Vérifiez l'URL de l'image dans `lib/store.ts`
2. Utilisez des domaines autorisés dans `next.config.ts`
3. Testez l'URL dans le navigateur

```typescript
// next.config.ts
images: {
  remotePatterns: [
    { protocol: "https", hostname: "images.unsplash.com" },
    { protocol: "https", hostname: "votre-domain.com" },
  ],
}
```

---

### 6. ❌ Admin dashboard vide

**Problème** : Pas de propriétés affichées

**Solution** :
1. Vérifiez `lib/store.ts` - les données par défaut doivent être là
2. Videz le cache du navigateur (Ctrl+Shift+Delete)
3. Rechargez la page (F5)
4. Testez dans un navigateur privé

```typescript
// lib/store.ts - Doit avoir defaultProperties
const defaultProperties: Property[] = [
  { id: '1', name: 'Propriété 1', ... },
  // ...
];
```

---

### 7. ❌ Styles Tailwind non appliqués

**Problème** : Classes Tailwind ignorées

**Solution** :
1. Vérifiez le chemin dans `tailwind.config.ts`
2. Redémarrez le serveur de dev
3. Vérifiez que vous utilisez les bons noms de classe

```typescript
// tailwind.config.ts
content: [
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
]
```

---

### 8. ❌ Animations ne fonctionnent pas

**Problème** : Framer Motion sans effet

**Solution** :
1. Assurez-vous que le composant est marqué `'use client'`
2. Vérifiez que `framer-motion` est installé
3. Testez les animations simples d'abord

```typescript
'use client'; // ← Important pour Framer Motion

import { motion } from 'framer-motion';

export default function Component() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      Content
    </motion.div>
  );
}
```

---

### 9. ❌ Routes dynamiques ne fonctionnent pas

**Problème** : `/property/1` donne une erreur 404

**Solution** :
1. Assurez-vous que la structure est correcte :
   ```
   app/property/[id]/page.tsx
   ```
2. Testez avec la bonne structure :
   ```typescript
   export default function PropertyPage({ params }: PropertyDetailPageProps) {
     const { id } = params as { id: string };
     // ...
   }
   ```

---

### 10. ❌ Zustand store ne persiste pas

**Problème** : Les données disparaissent au refresh

**Solution** :
C'est normal ! Zustand stocke en mémoire. Pour la persistence :

```typescript
// Pour localStorage (optionnel)
import { persist } from 'zustand/middleware';

export const usePropertyStore = create(
  persist(
    (set) => ({ /* ... */ }),
    { name: 'property-storage' }
  )
);
```

---

## 🔍 Diagnostic

### Vérifier votre environnement

```powershell
# Vérifier Node.js
node --version

# Vérifier npm
npm --version

# Vérifier les dépendances
npm list next react typescript

# Vérifier le port 3000
Get-NetTCPConnection -LocalPort 3000 | Select OwningProcess

# Afficher les fichiers du projet
Get-ChildItem -Recurse -Filter "*.tsx" | Select-Object Name, Directory
```

---

## 📋 Checklist de dépannage

- [ ] Node.js installé ? `node --version`
- [ ] npm disponible ? `npm --version`
- [ ] Dépendances installées ? `ls node_modules`
- [ ] Fichiers en place ? `ls app/`, `ls components/`
- [ ] Port 3000 libre ? 
- [ ] Aucun cache navigateur ?
- [ ] Serveur relancé après modification ?
- [ ] TypeScript OK ? `npm run build`

---

## 🐛 Erreurs spécifiques

### "Cannot find module '@/components/Header'"

**Cause** : Alias @/ mal configuré

**Fix** : Vérifiez `tsconfig.json` :
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

### "Unexpected token '<' in JSON at position 0"

**Cause** : Next.js rend du HTML au lieu de JSON

**Fix** : Assurez-vous d'appeler les bonnes routes :
- ✅ Pages : `/page.tsx`
- ✅ API : `app/api/route.ts`

---

### "usePropertyStore is not a function"

**Cause** : Store mal importé ou composant pas en `'use client'`

**Fix** :
```typescript
'use client'; // ← Ajoutez ceci

import { usePropertyStore } from '@/lib/store';
```

---

## 🚀 Performance

### Trop lent ?

1. **Vérifiez les images** :
   ```powershell
   # Les images doivent être optimisées
   # Utilisez les URL avec ?w=800&q=80
   ```

2. **Vérifiez le build** :
   ```powershell
   npm run build
   npm start
   ```

3. **Analysez le bundle** :
   ```powershell
   npm run build
   # Vérifiez la taille dans .next/static/
   ```

---

## 💾 Reset complet

Si tout est cassé, recommencez depuis zéro :

```powershell
# Supprimez les fichiers générés
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Réinstallez
npm install

# Relancez
npm run dev
```

---

## 📞 Ressources d'aide

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Communautés
- [Next.js Discord](https://discord.gg/nextjs)
- [React Discord](https://discord.gg/react)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)

### Outils utiles
- [vercel.com](https://vercel.com) - Déploiement
- [chatgpt.com](https://chatgpt.com) - Questions IA
- [github.com](https://github.com) - Partage de code

---

## 📝 Rapport d'erreur

Si vous rencontrez un problème non documenté, créez un rapport :

1. **Décrivez le problème** : Que se passe-t-il ?
2. **Étapes à reproduire** : Comment reproduire l'erreur ?
3. **Comportement attendu** : Qu'est-ce que ça devrait faire ?
4. **Comportement réel** : Qu'est-ce qui se passe réellement ?
5. **Environnement** :
   - Version Node.js : `node --version`
   - Système d'exploitation : Windows/Mac/Linux
   - Navigateur : Chrome/Firefox/Safari

---

**🎯 Vous avez d'autres questions ? Consultez les autres fichiers de documentation !**
