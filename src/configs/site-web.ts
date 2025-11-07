import type { PlatformConfig } from '../types';

export const createSiteWebConfig = (buildPath: string, prefix = 'cdr', showFileHeader = false): Record<string, PlatformConfig> => ({
  siteWeb: {
    prefix,
    buildPath,
    options: {
      showFileHeader
    },
    transformGroup: 'tokens-studio',
    transforms: [
      'attribute/deprecated',
      'name/kebab',
      'size/strip-px',
      'size/space-js',
      'size/px-to-rem-transitive',
      'time/seconds',
      'value/clamp'
    ],
    files: [
      {
        destination: 'webon',
        format: 'site',
        filter: 'remove-source-tokens'
      }
    ]
  }
});
