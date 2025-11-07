import type { PlatformConfig, UtilityFilesConfig } from '../types';

export const createScssConfig = (
  buildPath: string, 
  prefix = 'cdr', 
  showFileHeader = false,
  utilities?: UtilityFilesConfig['scss']
): Record<string, PlatformConfig> => {
  const actions: string[] = ['concat-files'];

  // Add utility actions if paths are provided
  if (utilities?.['media-queries']) {
    actions.unshift('include-media-queries-scss');
  }
  if (utilities?.['container-queries']) {
    actions.unshift('include-container-queries-scss');
  }
  if (utilities?.['display']) {
    actions.unshift('include-display-scss');
  }
  if (utilities?.['deprecate']) {
    actions.unshift('include-deprecate-scss');
  }

  return {
    scss: {
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
          destination: 'cdr-variable.scss',
          format: 'scss/variables',
          filter: 'remove-source-tokens'
        },
        {
          destination: 'cdr-mixins.scss',
          format: 'scss/mixin'
        },
        {
          destination: 'utility-map.no_concat.scss',
          format: 'scss/map'
        }
      ],
      actions
    }
  };
};
