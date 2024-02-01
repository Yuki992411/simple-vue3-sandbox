const buildEslintCommand = (filenames) => `eslint ${filenames.join(' ')}`

/** @type {import("lint-staged").Config} */
export default {
  '*.{ts,vue}': [buildEslintCommand, 'prettier --write', () => 'pnpm type-check'],
  '*.{md,yaml,json,js,mjs}': 'prettier --write'
}
