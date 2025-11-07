import type StyleDictionary from 'style-dictionary';
import _ from 'lodash';
import type { CedarToken } from '../types';

export const scssMixin = (sd: typeof StyleDictionary): void => {
  sd.registerFormat({
    name: 'scss/mixin',
    format: ({ dictionary, platform }) => {
      const prefix = platform.prefix ? `${platform.prefix}-` : '';
      const mixins: string[] = [];
      const mixinProperties = _.filter(dictionary.allTokens, (o: any) => _.has(o, 'mixin')) as CedarToken[];
      const mixinNames = _.uniq(mixinProperties.map((o) => o.mixin));

      mixinNames.forEach((name) => {
        const singleMixinProps = _.filter(mixinProperties, (o) => o.mixin === name);
        const prefixedName = _.kebabCase(`${prefix}-${name}`);
        const declarations: string[] = [];
        let mixin = '';

        singleMixinProps.forEach((o) => {
          if (o.property) {
            declarations.push(`${o.property}: ${o.$value};`);
          }
        });

        if (singleMixinProps[0].attributes?.deprecated === true) {
          // DEPRECATED
          const deprecateYear = singleMixinProps[0].attributes['deprecated-year'];
          const deprecateRelease = singleMixinProps[0].attributes['deprecated-release'];
          const deprecatedTokens: string[] = [];
          const prefixedNewName = _.has(singleMixinProps[0], 'newMixin')
            ? `"${_.kebabCase(`${prefix}-${singleMixinProps[0].newMixin}`)}"`
            : null;

          singleMixinProps.forEach((token) => {
            const tokenStr = _.has(token, 'newToken')
              ? `'${token.name}' use '${_.kebabCase(`${prefix}-${token.newToken}`)}' instead`
              : token.name;
            deprecatedTokens.push(tokenStr);
          });

          mixin = `// DEPRECATED
@mixin ${prefixedName}() {
  ${declarations.join('\n  ')}
  @include deprecate-mixin(${deprecateYear}, "${deprecateRelease}", "${prefixedName}", ${prefixedNewName});
}`;
        } else {
          // NOT DEPRECATED
          mixin = `@mixin ${prefixedName}() {
  ${declarations.join('\n  ')}
}

%${prefixedName} {
  ${declarations.join('\n  ')}
}`;
        }

        mixins.push(mixin);
      });

      return `${mixins.join('\n\n')}\n`;
    }
  });
};
