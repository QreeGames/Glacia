# Contributing to Glacia ❄️⚔️

Thank you for your interest in contributing to Glacia, an open-source Web3 game under the **QreeGames** organization!

---

## 🛠️ Development Setup

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/QreeGames/Glacia.git
   cd Glacia
   ```

2. **Branching Strategy:**
   - `master`: Stable production branch.
   - `dev`: Active development integration branch. All pull requests should target `dev`.
   - Feature branches: `feat/your-feature-name` or `fix/your-fix-name`.

---

## 🧪 Testing Guidelines

Before opening a pull request, ensure all test suites pass locally:

### Smart Contracts
```bash
cd contracts
cargo test
cargo clippy --all-targets -- -D warnings
```

### Backend
```bash
cd backend
npm install
npm test
```

### Frontend
```bash
cd frontend
npm install
npm run build
```

---

## 💬 Community & Questions
Feel free to open an issue or start a discussion on GitHub under [QreeGames/Glacia/issues](https://github.com/QreeGames/Glacia/issues).
