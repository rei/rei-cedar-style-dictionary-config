import type { PlatformConfig, UtilityFilesConfig } from '../types.js';

export const createLessConfig = (
  buildPath: string, 
  prefix = 'cdr', 
  showFileHeader = false,
  utilities?: UtilityFilesConfig['less']
): Record<string, PlatformConfig> => {
  const actions: string[] = ['concat-files'];

  // Add utility actions if paths are provided
  if (utilities?.['media-queries']) {
    actions.unshift('include-media-queries-less');
  }
  if (utilities?.['container-queries']) {
    actions.unshift('include-container-queries-less');
  }
  if (utilities?.['display']) {
    actions.unshift('include-display-less');
  }

  return {
    less: {
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
          destination: 'cdr-variable.less',
          format: 'less/variables',
          filter: 'remove-source-tokens'
        },
        {
          destination: 'cdr-mixins.less',
          format: 'less/mixin',
          filter: 'remove-source-tokens'
        }
      ],
      actions
    }
  };
};
