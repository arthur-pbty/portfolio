# Portfolio Arthur P

Portfolio personnel développé avec Next.js 16 (App Router), React 19 et TypeScript.

Site en ligne: [portfolio.arthurp.fr](https://portfolio.arthurp.fr)

## Aperçu

Ce projet présente:

- Une page d'accueil structurée en sections (Hero, About, Projects, Homelab, Sailing)
- Une page dédiée aux photos
- Une base SEO (robots/sitemap)

## Stack technique

- Next.js 16
- React 19
- TypeScript
- ESLint

## Lancer le projet en local

```bash
npm install
npm run dev
```

Application disponible sur `http://localhost:3000`.

## Scripts utiles

```bash
npm run dev    # développement
npm run lint   # vérification ESLint
npm run build  # build production
npm run start  # démarrage après build
```

## Déploiement

Le projet peut être déployé sur un serveur Node.js ou une plateforme compatible Next.js.

Exemple de flux:

1. `npm ci`
2. `npm run build`
3. `npm run start`

## Checklist avant push GitHub

- Vérifier que les secrets ne sont pas commités (`.env*`, clés privées, tokens)
- Vérifier que les fichiers locaux IDE sont ignorés (`.vscode/`, `.idea/`)
- Vérifier que les dossiers de build/deps sont ignorés (`.next/`, `node_modules/`)

## Backlink

Projet officiel: [portfolio.arthurp.fr](https://portfolio.arthurp.fr)
