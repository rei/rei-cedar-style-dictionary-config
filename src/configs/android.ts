import type { PlatformConfig } from '../types.js';
import { filterSourceTokensAndType } from '../utils.js';

export const createAndroidConfig = (buildPath: string, prefix = 'cdr', showFileHeader = false): Record<string, PlatformConfig> => ({
  android: {
    prefix,
    buildPath,
    options: {
      showFileHeader
    },
    transforms: [
      'name/snake',
      'size/space',
      'size/dp-transitive',
      'size/sp',
      'color/hex8android'
    ],
    files: [
      {
        destination: 'colors.xml',
        filter: (token) => filterSourceTokensAndType(token, 'color'),
        format: 'android/resources'
      },
      {
        destination: 'font_dimens.xml',
        filter: (token) => filterSourceTokensAndType(token, 'fontSize'),
        format: 'android/fontDimens'
      },
      {
        destination: 'dimens.xml',
        filter: (token) => filterSourceTokensAndType(token, 'dimension'),
        format: 'android/dimens'
      }
    ]
  }
});
