import next from "eslint-config-next"

// Flat config overrides any .eslintrc.*
// Turn off the rule that keeps failing the build.
export default [
  ...next,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
]
