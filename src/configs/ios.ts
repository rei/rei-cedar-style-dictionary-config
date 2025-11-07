import type { PlatformConfig } from '../types.js';
import { filterSourceTokensAndType } from '../utils.js';

export const createIosConfig = (buildPath: string, prefix = 'cdr', showFileHeader = false): Record<string, PlatformConfig> => ({
  ios: {
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
        destination: 'CdrSize.h',
        format: 'ios/static.h',
        filter: (token) => filterSourceTokensAndType(token, ['dimension', 'fontSize']),
        options: {
          type: 'float',
          className: 'CdrSize'
        }
      },
      {
        destination: 'CdrSize.m',
        format: 'ios/static.m',
        filter: (token) => filterSourceTokensAndType(token, ['dimension', 'fontSize']),
        options: {
          type: 'float',
          className: 'CdrSize'
        }
      },
      {
        destination: 'CdrColor.h',
        format: 'ios/colors.h',
        filter: (token) => filterSourceTokensAndType(token, 'color'),
        options: {
          type: 'CdrColorName',
          className: 'CdrColor'
        }
      },
      {
        destination: 'CdrColor.m',
        format: 'ios/colors.m',
        filter: (token) => filterSourceTokensAndType(token, 'color'),
        options: {
          type: 'CdrColorName',
          className: 'CdrColor'
        }
      }
    ]
  }
});
