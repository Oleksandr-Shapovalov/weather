module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react-refresh", "react", "@typescript-eslint", "prettier"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "import/prefer-default-export": "off",
    "import/extensions": "off",
    "react/require-default-props": "off",
    "import/no-extraneous-dependencies": "off",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        patterns: ["@/*/*/*/*/"],
      },
    ],
  },
};
