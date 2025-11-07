import type StyleDictionary from 'style-dictionary';
import _ from 'lodash';

export const stripAllPx = (sd: typeof StyleDictionary): void => {
  sd.registerTransform({
    name: 'size/strip-all-px',
    type: 'value',
    transitive: true,
    transform: (token) => {
      let cleanVal = token.$value;
      if (_.endsWith(token.$value, 'px')) {
        cleanVal = token.$value.slice(0, -2);
      }
      return cleanVal;
    }
  });
};
