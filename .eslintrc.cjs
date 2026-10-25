module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint", "react-hooks"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist/", "node_modules/"],
  rules: {
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    indent: ["error", 2, { SwitchCase: 1 }],
    quotes: ["error", "double", { avoidEscape: true }],
    semi: ["error", "always"],
    "comma-dangle": ["error", "only-multiline"],
    "object-curly-spacing": ["error", "always"],
    "react-hooks/set-state-in-effect": "off",
  },
};
