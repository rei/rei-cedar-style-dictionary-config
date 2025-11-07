import type { PlatformConfig } from '../types';

export const createJsConfig = (buildPath: string, prefix = 'cdr', showFileHeader = false): Record<string, PlatformConfig> => ({
  js: {
    prefix,
    buildPath,
    options: {
      showFileHeader
    },
    transforms: [
      'attribute/deprecated',
      'name/pascal',
      'size/strip-all-px-js',
      'size/space-js',
      'value/clamp'
    ],
    files: [
      {
        destination: 'cdr-tokens.cjs',
        format: 'javascript/module-flat',
        filter: 'remove-source-tokens'
      },
      {
        destination: 'cdr-tokens.mjs',
        format: 'javascript/es6',
        filter: 'remove-source-tokens'
      },
      {
        format: 'typescript/es6-declarations',
        destination: 'cdr-tokens.d.mts',
        filter: 'remove-source-tokens'
      }
    ]
  }
});
