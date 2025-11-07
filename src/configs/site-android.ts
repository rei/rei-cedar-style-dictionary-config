import type { PlatformConfig } from '../types.js';

export const createSiteAndroidConfig = (buildPath: string, prefix = 'cdr', showFileHeader = false): Record<string, PlatformConfig> => ({
  siteAndroid: {
    prefix,
    buildPath,
    options: {
      showFileHeader
    },
    transforms: [
      'attribute/deprecated',
      'name/snake',
      'size/space',
      'size/dp-transitive',
      'size/sp',
      'color/hex8android'
    ],
    files: [
      {
        destination: 'android.json',
        format: 'site',
        filter: 'remove-source-tokens'
      }
    ]
  }
});
