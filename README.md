# 🚀 Electron + React + TypeScript + Vite Template

![Electron](https://img.shields.io/badge/Electron-2C2E3A?style=for-the-badge&logo=electron&logoColor=9FEAF9) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

⚡ A production-ready template for building cross-platform desktop applications with:

- ⚛️ React with TypeScript type safety
- ⚡ Lightning-fast Vite build system with HMR
- 🖥️ Electron for native desktop capabilities
- 🧹 Comprehensive ESLint configuration
- 🏗️ Pre-configured project structure

⚠️ **Important Note**: While this template supports multiple package managers, Electron has known compatibility issues with pnpm due to its hardlinking behavior. We strongly recommend using npm or yarn instead for optimal performance and reliability.

## ✨ Key Features

| Category | Feature |
|----------|---------|
| 🖥️ **Electron** | Ready-to-use main/preload scripts |
| ⚛️ **React** | Type-safe components with TSX |
| ⚡ **Vite** | Instant HMR and optimized builds |
| 🧹 **Code Quality** | Comprehensive ESLint setup |
| 🎨 **UI** | Built-in theme provider |
| 🌐 **Platforms** | Windows, macOS & Linux support |

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
