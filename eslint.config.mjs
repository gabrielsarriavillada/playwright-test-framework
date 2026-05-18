// @ts-check
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import playwright from "eslint-plugin-playwright";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: ["node_modules/", "playwright-report/", "test-results/"],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ["tests/**/*.ts"],
    ...playwright.configs["flat/recommended"],
    rules: {
      "playwright/expect-expect": [
        "warn",
        {
          assertFunctionPatterns: ["^validate.*"],
        },
      ],
    },
  },

  prettier,
);
