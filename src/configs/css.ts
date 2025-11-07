import type { PlatformConfig } from '../types';

export const createCssConfig = (buildPath: string, prefix = 'cdr', showFileHeader = false): Record<string, PlatformConfig> => ({
  css: {
    prefix,
    buildPath,
    options: {
      showFileHeader
    },
    transformGroup: 'tokens-studio',
    transforms: [
      'attribute/deprecated',
      'name/kebab',
      'size/space',
      'size/px-to-rem-transitive',
      'value/clamp'
    ],
    files: [
      {
        destination: 'cdr-tokens.css',
        format: 'css/variables',
        filter: 'remove-source-tokens'
      }
    ]
  }
});
