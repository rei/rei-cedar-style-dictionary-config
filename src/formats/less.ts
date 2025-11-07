import type StyleDictionary from 'style-dictionary';
import _ from 'lodash';

export const less = (sd: typeof StyleDictionary): void => {
  sd.registerFormat({
    name: 'less/mixin',
    format: ({ dictionary, platform }) => {
      const prefix = platform.prefix ? `${platform.prefix}-` : '';
      const mixins: string[] = [];
      const mixinProperties = _.filter(dictionary.allTokens, (o: any) => _.has(o, 'mixin'));
      const mixinNames = _.uniq(mixinProperties.map((o: any) => o.mixin));

      mixinNames.forEach((name) => {
        const singleMixinProps = _.filter(mixinProperties, (o: any) => o.mixin === name);
        const declarations: string[] = [];
        let mixin = '';

        singleMixinProps.forEach((o: any) => {
          if (o.property) {
            declarations.push(`${o.property}: ${o.$value};`);
          }
        });

        mixin = `.${_.kebabCase(`${prefix}-${name}`)}() {
  ${declarations.join('\n  ')}
}`;

        mixins.push(mixin);
      });

      return `${mixins.join('\n\n')}\n`;
    }
  });
};
