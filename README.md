# NovaBank — Compte Bancaire & Redux Toolkit Showcase

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?style=for-the-badge&logo=react)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.11.2-purple?style=for-the-badge&logo=redux)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Turbopack](https://img.shields.io/badge/Turbopack-Enabled-0070F3?style=for-the-badge)

**Application bancaire fintech interactive multi-pages démontrant la puissance de Redux Toolkit et l'architecture Next.js 16 App Router.**

[Portfolio du Développeur](https://portfolio-7v49.vercel.app/) • [Profil GitHub](https://github.com/Ilyass123-Ng)

</div>

---

## Présentation du Projet

**NovaBank** est une application haut de gamme de gestion de trésorerie digitale et simulation bancaire. Conçue pour briller sur un portfolio d'ingénieur logiciel, elle allie rigueur architecturale (Redux Toolkit, typage strict TypeScript, immuabilité, zéro warning d'hydratation SSR) et excellence visuelle (design system exécutif Gris Fateh, Blanc, Cyan & Beige Champagne, arrière-plan animé en dérive style Antigravity, carte virtuelle EMV interactive, glassmorphism et animations 60fps).

---

## Architecture & Fonctionnalités

### 1. Multi-Pages App Router & Redux Centralisé
- **Tableau de Bord (`/`)** : Vue d'ensemble du solde, métriques globales, prévisualisation de la carte Visa et flux récents.
- **Opérations (`/operations`)** : Console de dépôts, débits et virements avec sélection visuelle de catégories via icônes vectorielles.
- **Transactions (`/transactions`)** : Moteur de recherche en temps réel, filtres par type d'opération, tri et export comptable CSV.
- **Mes Cartes (`/cards`)** : Carte Visa Infinite avec contrôles de sécurité (Sans contact NFC, 3D Secure, DAB) et gel instantané.
- **Analytique (`/analytics`)** : Score de santé budgétaire, capacité d'épargne et règle financière 50/30/20.

### 2. Gestion du Solde & Trésorerie en Temps Réel
- Calcul instantané et réactif du solde disponible via les réducteurs Redux.
- Détection et prévention strictes des découverts avec notifications de sécurité.
- Sélecteur multi-devises en un clic : **MAD (Dirham Marocain)**, **EUR (€)** et **USD ($)**.

### 3. Carte Bancaire Virtuelle Interactive
- Rendu réaliste d'une carte **Visa Infinite Obsidian & Cyan** avec puce EMV et antenne NFC.
- Masquage / affichage sécurisé du numéro de carte.
- **Fonctionnalité "Geler la carte"** : Verrouillage immédiat bloquant tout débit ou retrait non autorisé.
- Copie instantanée du **RIB interbancaire** dans le presse-papiers.
- Suivi du plafond mensuel autorisé (50 000 MAD).

### 4. Opérations Bancaires
- **Dépôts / Crédits** : Montants rapides prédéfinis (+100, +500, +1 000, +2 500, +5 000 MAD), sélection par icônes (Salaire, Freelance, Dépôt d'espèces) et libellés.
- **Retraits / Débits** : Validation stricte des fonds disponibles et blocage en cas de carte verrouillée.
- **Virements Instantanés** : Sélection directe de bénéficiaires enregistrés ou saisie d'un nouveau RIB, avec frais nuls (0.00 MAD).

### 5. Historique & Export Comptable
- Barre de recherche en temps réel par mot-clé, destinataire ou catégorie.
- Filtres rapides : *Tous*, *Dépôts*, *Retraits*, *Virements*.
- Tri dynamique par date ou par montant.
- **Export CSV Réel** : Téléchargement instantané d'un relevé bancaire complet au format `.csv`.
- Suppression unitaire d'opérations avec recalcul automatique du store.

---

## Stack Technique

- **Framework** : [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **State Management** : [@reduxjs/toolkit](https://redux-toolkit.js.org/) & [react-redux](https://react-redux.js.org/)
- **Langage** : [TypeScript](https://www.typescriptlang.org/) (Typage strict, RootState, AppDispatch)
- **Design System** : Palette Gris, Blanc, Noir & Cyan (Vanilla CSS)
- **Iconographie** : [Lucide React](https://lucide.dev/) (Icônes vectorielles professionnelles)
- **Typographie** : Plus Jakarta Sans & JetBrains Mono (via `next/font/google`)

---

## Architecture des Dossiers

```text
app/
├── Features/
│   └── compteSlice.ts       # Slice Redux : actions, reducers et état typé (CompteState)
├── Store/
│   └── store.ts             # Store Redux, typage RootState et AppDispatch
├── components/
│   ├── AntigravityGridBackground.tsx # Grille de carrés animée en dérive & particules zéro-G
│   ├── AppShell.tsx         # Layout principal avec Sidebar glassmorphism et TopNavbar
│   ├── Sidebar.tsx          # Navigation latérale multi-pages avec verre dépoli et trame animée
│   ├── TopNavbar.tsx        # En-tête, horloge temps réel, devises, démo
│   ├── RecruiterHeader.tsx  # Bannière storytelling recruteur & simulation de scénarios en 1 clic
│   ├── StatsCards.tsx       # Métriques agrégées (Solde, Revenus, Dépenses)
│   ├── CashFlowChart.tsx    # Courbe vectorielle SVG haute fidélité du flux de trésorerie
│   ├── VirtualCard.tsx      # Carte Visa Infinite Champagne & EMV, freeze, copie RIB
│   ├── OperationPanel.tsx   # Console Dépôt / Retrait / Virement
│   ├── TransactionHistory.tsx # Table, filtres, recherche et export CSV
│   ├── AnalyticsBreakdown.tsx # Répartition budgétaire et santé financière
│   └── ToastNotification.tsx # Système de feedback et alertes toast épuré
├── operations/
│   └── page.tsx             # Route /operations
├── transactions/
│   └── page.tsx             # Route /transactions
├── cards/
│   └── page.tsx             # Route /cards
├── analytics/
│   └── page.tsx             # Route /analytics
├── globals.css              # Tokens CSS Gris Fateh, Blanc, Cyan, Beige & animations GPU
├── layout.tsx               # Root layout, fonts Google et Providers
└── page.tsx                 # Tableau de bord principal
```

---

## Démarrage Rapide

### Prérequis
- [Node.js](https://nodejs.org/) (v18 ou supérieur)
- [npm](https://www.npmjs.com/) ou [pnpm](https://pnpm.io/)

### Installation & Lancement

```bash
# 1. Cloner le projet
git clone https://github.com/Ilyass123-Ng/tp-compt-bank-redux.git
cd tp-compt-bank-redux

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev
```

Accédez à [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## Auteur

**Ilyas Ennajy** — *Full-Stack Developer & Software Engineer*  
- Portfolio : [https://portfolio-7v49.vercel.app/](https://portfolio-7v49.vercel.app/)  
- GitHub : [@Ilyass123-Ng](https://github.com/Ilyass123-Ng)  
