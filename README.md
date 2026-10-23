# ⚔️ Glacia: On-Chain Tactical Battle Arena

[![CI Pipeline](https://github.com/QreeGames/Glacia/actions/workflows/ci.yml/badge.svg)](https://github.com/QreeGames/Glacia/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Network: Stellar Testnet](https://img.shields.io/badge/Stellar-Testnet-black?logo=stellar)](https://stellar.expert)
[![Built with Soroban](https://img.shields.io/badge/Smart%20Contracts-Soroban%20v22-blue)](https://soroban.stellar.org/)

**Glacia** is an asynchronous, turn-based $4 \times 4$ on-chain tactical deck battler built on the **Stellar** network using **Soroban** smart contracts. Players draft elemental champions (Frost, Flame, Void, Prism), position defense squads, and battle live or asynchronously with verifiable, deterministic on-chain combat calculation.

---

## ❄️ Features
- **Deterministic Soroban Battle Engine**: Combat calculations, elemental damage multipliers, and squad placement rules execute deterministically in Rust.
- **Asynchronous PvP**: Deploy defensive squads on-chain; any player can challenge them at any time without both players needing to be online simultaneously.
- **Gasless Sponsored Relayer**: New players can play immediately with guest accounts or Stellar wallets (Freighter, Albedo, xBull) with sponsored network fees.
- **Verifiable Battle Logs**: Every combat round emits structured Soroban contract events for replay verification.
- **Open-Source & Modular**: Card definitions, stats, ability modifiers, and arena skins can easily be expanded by community contributors.

---

## 🏛️ Monorepo Architecture

```
glacia/
├── contracts/       # Rust Soroban smart contracts (Deterministic battle state machine)
├── backend/         # Express / Node.js sponsored transaction relayer & battle indexer
└── frontend/        # React + Vite + Tailwind CSS Neo-Brutalist game interface
```

---

## 🚀 Quickstart

### Prerequisites
- [Node.js](https://nodejs.org/) (v20+)
- [Rust & Cargo](https://rustup.rs/) (v1.75+)
- [Stellar CLI](https://developers.stellar.org/docs/tools/developer-tools/cli/stellar-cli) (`v22+`)

### 1. Smart Contracts
```bash
cd contracts
cargo test
cargo build --target wasm32v1-none --release
```

### 2. Backend Relayer
```bash
cd backend
npm install
npm run dev
```

### 3. Frontend Client
```bash
cd frontend
npm install
npm run dev
```

---

## 🤝 Contributing
Glacia is open-source under the MIT license! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) guide before submitting PRs.

---

## 📜 License
[MIT](LICENSE) © 2026 [QreeGames](https://github.com/QreeGames)
