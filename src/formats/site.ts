import type StyleDictionary from 'style-dictionary';
import _ from 'lodash';

export const site = (sd: typeof StyleDictionary): void => {
  sd.registerFormat({
    name: 'site',
    format: ({ dictionary, platform }) => {
      const prefix = platform.prefix ? `${platform.prefix}-` : '';
      const toRet: Record<string, any[]> = {};
      const grouped = _.groupBy(dictionary.allTokens, 'docs.category');
      const keys = Object.keys(grouped);

      for (const key of keys) {
        const newKey = key === 'undefined' ? 'misc' : key;
        const catArr = grouped[key];
        toRet[newKey] = [];

        for (let i = 0, len = catArr.length; i < len; i++) {
          const current: any = { ...catArr[i] };

          if (_.has(current, 'mixin')) {
            current.mixin = `${prefix}${current.mixin}`;
          }

          delete current.path;
          toRet[newKey].push(current);
        }
      }

      return JSON.stringify(toRet, null, 2);
    }
  });
};
