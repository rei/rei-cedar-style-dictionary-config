import type StyleDictionary from 'style-dictionary';
import type { CedarToken } from '../../types.js';

export const spaceJs = (sd: typeof StyleDictionary): void => {
  sd.registerTransform({
    name: 'size/space-js',
    type: 'value',
    transitive: true,
    filter: (token) => (token.$type === 'dimension') && !!(token as CedarToken).spacingModifier,
    transform: (token) => {
      const { $value, spacingModifier } = token as CedarToken;
      const num = (parseInt($value) * (spacingModifier || 1));
      return num.toString();
    }
  });
};
