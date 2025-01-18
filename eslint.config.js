import eslint from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import nodePlugin from "eslint-plugin-n";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";
import packageJson from "eslint-plugin-package-json/configs/recommended";
import perfectionist from "eslint-plugin-perfectionist";
import pluginPromise from "eslint-plugin-promise";
import react from "eslint-plugin-react";
import hooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tailwind from "eslint-plugin-tailwindcss";
import testingLibrary from "eslint-plugin-testing-library";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import globals from "globals";
import tseslint from "typescript-eslint";

import projectPackageJson from "./package.json" with { type: "json" };

export default [
  {
    ignores: [".vite/", "coverage/", "dist/", "**/_generated/"],
  },
  ...tseslint.config({
    extends: [
      eslint.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    files: ["**/*.{ts,tsx,js,cjs,mjs}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        sourceType: "module",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      "@typescript-eslint/no-unsafe-argument": ["off"],
      "@typescript-eslint/no-unsafe-assignment": ["off"],
      "@typescript-eslint/no-unsafe-call": ["off"],
      "@typescript-eslint/no-unsafe-member-access": ["off"],
      "@typescript-eslint/no-unsafe-return": ["off"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/only-throw-error": ["off"],
      "no-unused-vars": "off",
    },
  }),
  ...tseslint.config({
    extends: [tseslint.configs.disableTypeChecked],
    files: ["**/*.{js,cjs,mjs}"],
  }),
  ...tailwind.configs["flat/recommended"],
  nodePlugin.configs["flat/recommended-script"],
  perfectionist.configs["recommended-natural"],
  packageJson,
  testingLibrary.configs["flat/react"],
  reactRefresh.configs.vite,
  pluginPromise.configs["flat/recommended"],
  eslintPluginUnicorn.configs["flat/recommended"],
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    ...react.configs.flat.recommended,
    ...react.configs.flat["jsx-runtime"],
    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,
      ...react.configs.flat["jsx-runtime"].languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
      parserOptions: {
        sourceType: "module",
        ...react.configs.flat.recommended.languageOptions.parserOptions,
        ...react.configs.flat["jsx-runtime"].languageOptions.parserOptions,
      },
    },
    rules: {
      "react/button-has-type": ["error"],
      "react/default-props-match-prop-types": ["error"],
      "react/destructuring-assignment": ["error"],
      "react/forward-ref-uses-ref": ["error"],
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "function-declaration",
          unnamedComponents: "arrow-function",
        },
      ],
      "react/hook-use-state": ["error"],
      "react/jsx-boolean-value": ["error", "never"],
      "react/jsx-child-element-spacing": ["error"],
      "react/jsx-curly-brace-presence": [
        "error",
        { children: "never", props: "never" },
      ],
      "react/jsx-fragments": ["error", "syntax"],
      "react/jsx-handler-names": [
        "error",
        { checkInlineFunction: true, checkLocalVariables: true },
      ],
      "react/jsx-no-comment-textnodes": ["error"],
      "react/jsx-no-constructed-context-values": ["error"],
      "react/jsx-no-leaked-render": ["error"],
      "react/jsx-no-useless-fragment": ["error"],
      "react/jsx-pascal-case": ["error"],
      "react/jsx-props-no-spread-multi": ["error"],
      "react/jsx-wrap-multilines": ["error", { declaration: "parens" }],
      "react/no-access-state-in-setstate": ["error"],
      "react/no-array-index-key": ["error"],
      "react/no-multi-comp": ["error"],
      "react/no-object-type-as-default-prop": ["error"],
      "react/no-unstable-nested-components": ["error"],
      "react/self-closing-comp": ["error"],
      "react/style-prop-object": ["error"],
      "react/void-dom-elements-no-children": ["error"],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    rules: {
      "id-denylist": ["error", "e", "cb"],
      "n/file-extension-in-import": ["error", "always"],
      "n/no-missing-import": ["off"],
      "unicorn/better-regex": "error",
      "unicorn/filename-case": ["off"],
      "unicorn/no-null": ["off"] /* Necessary for tanstack-query */,
      "unicorn/no-useless-undefined": [
        "error",
        { checkArguments: false, checkArrowFunctionBody: false },
      ],
      "unicorn/prevent-abbreviations": ["off"],
      "unicorn/switch-case-braces": ["error", "avoid"],
    },
  },
  {
    files: ["src/**/*.test.ts"],
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      "vitest/expect-expect": [
        "error",
        {
          assertFunctionNames: ["expect", "expectIsOk", "expectIsError"],
        },
      ],
      "vitest/max-nested-describe": ["error", { max: 3 }],
    },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
  },
  {
    plugins: {
      "no-relative-import-paths": noRelativeImportPaths,
    },
    rules: {
      "no-relative-import-paths/no-relative-import-paths": [
        "warn",
        {
          allowSameFolder: true,
          prefix: projectPackageJson.name,
          rootDir: "src",
        },
      ],
    },
  },
  {
    plugins: {
      "react-hooks": hooks,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      ...hooks.configs.recommended.rules,
    },
  },
];
