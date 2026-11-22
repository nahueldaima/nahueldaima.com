import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  ignores: [
    'content/**',
    '.next/**',
    'next-env.d.ts',
    'lib/icons.generated.ts',
  ],
})
