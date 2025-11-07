import type StyleDictionary from 'style-dictionary';

export const removeSourceTokens = (sd: typeof StyleDictionary): void => {
  sd.registerFilter({
    name: 'remove-source-tokens',
    filter: (token) => token.path[0] !== 'options' && token.path[0] !== 'theme'
  });
};
