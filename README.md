# Collector

**Collector** est une marketplace française pour les objets de collection : jouets vintage, figurines, comics, retro gaming et plus encore.

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Fonctionnalités

- 🛍️ **Navigation** — Parcourir les articles, boutiques et catégories
- 🏪 **Gestion de boutiques** — Créer et gérer vos propres boutiques
- 📦 **Gestion d'articles** — Ajouter, modifier et supprimer des articles
- 🔐 **Authentification** — Inscription et connexion sécurisées
- 🌙 **Mode sombre** — Thème clair/sombre avec détection système
- 🇫🇷 **Interface française** — UI entièrement en français

## 🛠️ Stack Technique

| Technologie | Description |
|-------------|-------------|
| [Next.js 16](https://nextjs.org) | Framework React avec App Router et SSR |
| [TypeScript](https://typescriptlang.org) | Typage statique |
| [Tailwind CSS 4](https://tailwindcss.com) | Framework CSS utility-first |
| [shadcn/ui](https://ui.shadcn.com) | Composants UI accessibles |
| [React Query](https://tanstack.com/query) | Gestion du cache et des requêtes |
| [next-themes](https://github.com/pacocoursey/next-themes) | Gestion des thèmes |
| [Zod](https://zod.dev) | Validation des schémas |
| [Playwright](https://playwright.dev) | Tests end-to-end |

## 📋 Prérequis

- Node.js 20+
- npm ou pnpm
- API Symfony (voir [collector-api](../collector-api))

## 🚀 Installation

```bash
# Cloner le repository
git clone https://github.com/votre-username/collector.git
cd collector/collector-web

# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env.local
# Éditer .env.local avec votre URL API
```

## ⚙️ Configuration

Créez un fichier `.env.local` :

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_SITE_NAME=Collector
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 💻 Développement

```bash
# Démarrer le serveur de développement
npm run dev

# Linter
npm run lint

# Build production
npm run build
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🧪 Tests

```bash
# Lancer tous les tests
npm run test

# Tests avec interface graphique
npm run test:ui

# Tests en mode visible
npm run test:headed

# Voir le rapport
npm run test:report
```

## 📁 Structure du Projet

```
src/
├── app/                    # Routes Next.js (App Router)
│   ├── (auth)/            # Pages d'authentification
│   ├── (dashboard)/       # Pages du tableau de bord
│   └── (main)/            # Pages publiques
├── components/
│   ├── ui/                # Composants shadcn/ui
│   ├── layout/            # Header, Footer, Sidebar
│   ├── shared/            # Composants réutilisables
│   ├── items/             # Composants articles
│   ├── shops/             # Composants boutiques
│   └── categories/        # Composants catégories
├── config/                # Configuration (theme, navigation)
├── hooks/                 # Hooks React personnalisés
├── lib/
│   ├── api/              # Client API et services
│   ├── utils/            # Utilitaires
│   └── validations/      # Schémas Zod
└── types/                 # Types TypeScript
```

## 🎨 Palette de Couleurs

| Couleur | Hex | Usage |
|---------|-----|-------|
| Beige chaud | `#efc595` | Secondaire, avertissements |
| Vert lime | `#81c14b` | Primaire (mode sombre), accents |
| Vert moyen | `#2e933c` | Marque, succès |
| Vert forêt | `#297045` | Primaire (mode clair) |
| Bleu-vert foncé | `#204e4a` | Texte, arrière-plans sombres |

## 🔗 API

L'application consomme une API Symfony API Platform avec format JSON-LD/Hydra.

Endpoints principaux :
- `GET /api/items` — Liste des articles
- `GET /api/shops` — Liste des boutiques
- `GET /api/categories` — Liste des catégories
- `GET /api/users` — Liste des utilisateurs

## 📄 License

MIT © Collector
