import type StyleDictionary from 'style-dictionary';
import _ from 'lodash';

export const scssMap = (sd: typeof StyleDictionary): void => {
  sd.registerFormat({
    name: 'scss/map',
    format: ({ dictionary }) => {
      let scss = '';
      const utilityTokens = _.filter(dictionary.allTokens, (o: any) => o['utility-class'] === true);
      const categories = _.groupBy(utilityTokens, 'docs.category');

      // loop through categories
      const catKeys = Object.keys(categories);
      catKeys.forEach((cat) => {
        // loop through types
        const types = _.groupBy(categories[cat], 'docs.type');
        const typeKeys = Object.keys(types);
        typeKeys.forEach((type) => {
          let formattedType = type === 'undefined' ? '' : `-${type}`;
          if (type === cat) {
            formattedType = '';
          }
          scss += `$${cat}${formattedType}: (\n  `;

          types[type].forEach((token: any, i: number) => {
            if (i !== 0) {
              scss += ',\n  ';
            }
            if (token.name.includes('-family')) {
              scss += `${token.name}: '${token.$value}'`;
            } else {
              scss += `${token.name}: ${token.$value}`;
            }
          });

          scss += '\n);\n';
        });
      });

      return scss;
    }
  });
};
