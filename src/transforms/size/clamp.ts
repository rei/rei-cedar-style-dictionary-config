import type StyleDictionary from 'style-dictionary';

export const cssClamp = (sd: typeof StyleDictionary): void => {
  sd.registerTransform({
    name: 'value/clamp',
    type: 'value',
    transitive: true,
    filter: (token) => token.$type === 'clamp',
    transform: (token) => {
      const v = token.$value;

      if (typeof v === 'string') return v;

      const { min, ideal, max } = v || {};
      if (!min || !ideal || !max) {
        throw new Error(`Clamp token ${token.name} must have min, ideal, and max values.`);
      }
      
      return `clamp(${min}, ${ideal}, ${max})`;
    },
  });
};
