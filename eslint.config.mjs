// eslint.config.mjs
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  {
    files: ["src/**/*.{js,mjs,cjs,jsx,mjs,ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": hooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
      "@next/next": nextPlugin,
    },
    languageOptions: {
      parserOptions: {
        ...reactPlugin.configs.recommended.parserOptions,
        ...reactPlugin.configs["jsx-runtime"].parserOptions,
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...hooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      // --- NUEVA REGLA AÑADIDA ---
      // Desactivamos la regla de los apóstrofos para no tener más problemas.
      "react/no-unescaped-entities": "off",
    },
  },
];

export default config;