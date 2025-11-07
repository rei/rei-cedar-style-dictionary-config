import type StyleDictionary from 'style-dictionary';
import type { CedarToken } from '../../types.js';

export const space = (sd: typeof StyleDictionary): void => {
  sd.registerTransform({
    name: 'size/space',
    type: 'value',
    transitive: true,
    filter: (token) => (token.$type === 'dimension') && !!(token as CedarToken).spacingModifier,
    transform: (token) => {
      const { $value, spacingModifier } = token as CedarToken;
      const num = (parseFloat($value) * (spacingModifier || 1)).toFixed(1);
      return num;
    }
  });
};
