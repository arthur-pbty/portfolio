import js from "@eslint/js";
import next from "eslint-config-next";
import tseslint from "typescript-eslint";

const config = [
  // Base JavaScript recommended rules
  js.configs.recommended,

  // TypeScript recommended rules
  ...tseslint.configs.recommended,

  // Next.js recommended rules
  ...next,

  {
    rules: {
      // ===== Code quality =====
      "no-console": "warn",
      "prefer-const": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],

      // ===== TypeScript =====
      "@typescript-eslint/no-unused-vars": ["warn"],

      // ===== React / Next =====
      "react-hooks/exhaustive-deps": "warn",
      "react/react-in-jsx-scope": "off",

      // ===== Style =====
      semi: ["error", "always"],
      quotes: ["error", "double"],
    },
  },

  {
    ignores: [
      "node_modules",
      ".next",
      "dist",
      "out",
    ],
  },
];

export default config;