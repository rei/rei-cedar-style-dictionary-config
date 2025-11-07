import type StyleDictionary from 'style-dictionary';
import { cleanMeta } from '@divriots/style-dictionary-to-figma';
import _ from 'lodash';

// Deep map function
const deepMap = (obj: any, mapper: (obj: any) => any): any => {
  return mapper(_.mapValues(obj, (v) => _.isPlainObject(v) ? deepMap(v, mapper) : v));
};

export const figma = (sd: typeof StyleDictionary): void => {
  sd.registerFormat({
    name: 'figma',
    format: ({ dictionary }) => {
      const propsToRemove = ['isSource', 'attributes', 'path', 'docs', 'newToken', 'name', 'docCategory', 'docExample'];
      
      // Custom transformer that preserves original references
      const preserveReferences = (tokens: any) => {
        return deepMap(tokens, (obj) => {
          return _.mapValues(obj, (value) => {
            if (value && value.original && value.original.$value && typeof value.original.$value === 'string') {
              // Preserve the original reference value and remove the 'options.' prefix
              return {
                $value: value.original.$value.replace('options.', ''),
                $type: value.$type,
                ...(value.original.$description && { $description: value.original.$description }),
                ...(value.filePath && { filePath: value.filePath })
              };
            }
            return value;
          });
        });
      };

      // First preserve references, then clean metadata
      const transformedTokens = cleanMeta(
        preserveReferences(dictionary.tokens),
        { cleanMeta: propsToRemove }
      );

      return JSON.stringify(transformedTokens, null, 2);
    }
  });
};
