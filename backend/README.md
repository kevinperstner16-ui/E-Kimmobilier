# Backend

Ce dossier contient la couche backend/API du projet.

Pour l’instant le site est hébergé sur GitHub Pages, donc il n’y a pas de serveur Node privé.
On utilise donc Supabase directement côté navigateur, avec une clé publique.

Important :

- c’est une vraie base PostgreSQL ;
- c’est mieux que le localStorage pour partager les annonces/demandes entre appareils ;
- pour une sécurité professionnelle complète, il faudra plus tard déployer un backend privé
  sur Vercel/Netlify/Render avec une clé serveur Supabase.
