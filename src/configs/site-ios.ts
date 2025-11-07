import type { PlatformConfig } from '../types';

export const createSiteIosConfig = (buildPath: string, prefix = 'cdr', showFileHeader = false): Record<string, PlatformConfig> => ({
  siteIos: {
    prefix,
    buildPath,
    options: {
      showFileHeader
    },
    transforms: [
      'attribute/deprecated',
      'name/pascal',
      'color/UIColor',
      'size/strip-px',
      'size/space',
      'size/float'
    ],
    files: [
      {
        destination: 'ioson',
        format: 'site',
        filter: 'remove-source-tokens'
      }
    ]
  }
});
