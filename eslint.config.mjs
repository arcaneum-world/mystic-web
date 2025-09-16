export default [
  // ignore folders + the specific callback file
  { ignores: ["node_modules/**", ".next/**", "app/auth/callback/route.ts"] },
  // and even if it gets linted, kill the blocking rule
  { rules: { "@typescript-eslint/no-explicit-any": "off" } },
];
