import type StyleDictionary from 'style-dictionary';

export const dpTransitive = (sd: typeof StyleDictionary): void => {
  sd.registerTransform({
    name: 'size/dp-transitive',
    type: 'value',
    transitive: true,
    filter: (token) => token.$type === 'dimension',
    transform: (token) => {
      const val = parseFloat(token.$value);
      return val.toFixed(2) + 'dp';
    }
  });
};
