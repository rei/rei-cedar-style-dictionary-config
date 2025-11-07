import type { PlatformConfig } from '../types';

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
        destination: 'androidon',
        format: 'site',
        filter: 'remove-source-tokens'
      }
    ]
  }
});
