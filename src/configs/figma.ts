import type { PlatformConfig } from '../types';

export const createFigmaConfig = (buildPath: string, prefix = 'cdr', showFileHeader = false): Record<string, PlatformConfig> => ({
  figma: {
    prefix,
    buildPath,
    options: {
      showFileHeader
    },
    transforms: [
      'attribute/deprecated',
      'name/kebab',
      'size/space',
      'size/px-to-rem-transitive'
    ],
    files: [
      {
        destination: 'figmaon',
        format: 'figma'
      }
    ]
  }
});
