# SAHEL BIEN-ÊTRE

Boutique e-commerce indépendante de produits de bien-être, beauté et nutrition, construite avec React + Vite + TypeScript, Node.js/Express et Supabase.

## Démarrage

Prérequis: Node.js 20+ et npm 10+.

```bash
npm install
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
npm run dev
```

Frontend: http://localhost:5173 — API: http://localhost:4000/api/health.

## Configuration Supabase

1. Créer un projet Supabase dédié à Sahel Bien-Être.
2. Copier l'URL du projet et la clé publishable dans `frontend/.env`.
3. Dans le backend, définir `SUPABASE_URL` et la clé secrète serveur `SUPABASE_SECRET_KEY` dans `backend/.env`.
4. Exécuter `supabase/migrations/202610310001_initial_schema.sql` dans le SQL Editor.
5. Exécuter `supabase/seed.sql` pour créer les catégories et 12 références de catalogue à valider.

**Sécurité:** ne jamais exposer la clé secrète/service_role dans le frontend, dans un dépôt Git ou dans une variable `VITE_*`. Les produits du seed sont inactifs, sans prix, jusqu'à vérification des tarifs, stocks, références et photos. Les rôles administrateurs doivent être attribués par une opération serveur/SQL de confiance, jamais depuis les métadonnées modifiables du client.

## Déploiement

Frontend: Vercel, root directory `frontend`, build `npm run build`, output `dist`. API: héberger le dossier `backend` sur un service Node.js et définir ses variables d'environnement. Le frontend et l'API doivent avoir leurs URL autorisées respectives.

## Catalogue et conformité

Le catalogue initial contient des références de produits couramment commercialisées sous la marque Forever Living Products. Vérifier la disponibilité locale et les références exactes auprès du distributeur/fabricant avant activation. Les descriptions ne font aucune promesse médicale. Sahel Bien-Être est une boutique indépendante et ne doit pas se présenter comme un site officiel de Forever Living sans autorisation écrite. Utiliser uniquement des logos et visuels dont les droits sont confirmés.
