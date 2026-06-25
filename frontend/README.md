# Frontend

Le frontend Next.js est encore à la racine du projet pour ne pas casser GitHub Pages.

À terme, on pourra déplacer l’app dans `frontend/`, mais pas maintenant : le site est déjà en ligne
et GitHub Pages sert les fichiers statiques depuis la racine.

Structure actuelle :

- `app/` : pages Next.js
- `components/` : composants React
- `lib/` : logique partagée côté frontend
- `backend/` : adaptateurs backend/API
- `database/` : schémas SQL et migrations
