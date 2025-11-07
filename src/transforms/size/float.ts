import type StyleDictionary from 'style-dictionary';

export const float = (sd: typeof StyleDictionary): void => {
  sd.registerTransform({
    name: 'size/float',
    type: 'value',
    transitive: true,
    filter: (token) => token.$type === 'dimension' || token.$type === 'fontSize',
    transform: (token) => {
      const num = parseFloat(token.$value).toFixed(1);
      const unit = 'f';
      return `${num}${unit}`;
    }
  });
};
