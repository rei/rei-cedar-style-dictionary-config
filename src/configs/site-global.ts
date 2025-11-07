import type { PlatformConfig } from '../types';

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
        destination: 'globalon',
        format: 'site',
        filter: 'remove-source-tokens'
      }
    ]
  }
});
