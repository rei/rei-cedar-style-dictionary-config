import type StyleDictionary from 'style-dictionary';
import _ from 'lodash';

export const stripAllPxJs = (sd: typeof StyleDictionary): void => {
  sd.registerTransform({
    name: 'size/strip-all-px-js',
    type: 'value',
    transitive: true,
    filter: (token) => !token.name.match('Prominence'),
    transform: (token) => {
      let cleanVal = token.$value;
      if (_.endsWith(token.$value, 'px')) {
        cleanVal = token.$value.slice(0, -2);
      }
      return cleanVal;
    }
  });
};
