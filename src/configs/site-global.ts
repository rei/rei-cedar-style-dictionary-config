import type { PlatformConfig } from '../types.js';

export const createSiteGlobalConfig = (buildPath: string, prefix = 'cdr', showFileHeader = false): Record<string, PlatformConfig> => ({
  siteGlobal: {
    prefix,
    buildPath,
    options: {
      showFileHeader
    },
    transforms: [
      'attribute/deprecated',
      'name/kebab',
      'size/strip-all-px-js',
      'size/space-js',
      'size/px-to-rem-transitive',
      'time/seconds',
      'value/clamp'
    ],
    files: [
      {
        destination: 'global.json',
        format: 'site',
        filter: 'remove-source-tokens'
      }
    ]
  }
});
