import type StyleDictionary from 'style-dictionary';
import type { TransformConfig } from '../../types';
import { BASE_FONT_SIZE } from '../../utils';

export const pxToRemTransitive = (sd: typeof StyleDictionary): void => {
  sd.registerTransform({
    name: 'size/px-to-rem-transitive',
    type: 'value',
    transitive: true,
    filter: (token) => token.$type === 'dimension' || token.$type === 'fontSize',
    transform: (token, config) => {
      const REM = (config as TransformConfig)?.basePxFontSize || BASE_FONT_SIZE;
      const tokens = token.$value.split(' ');

      const result = tokens.map((value: string) => {
        const parsedValue = parseFloat(value);

        if (parsedValue === 0 || !value) {
          return '0';
        }

        if (!value.includes('rem')) {
          const num = (parseFloat(value) / REM);
          const unit = num !== 0 ? 'rem' : '';

          return `${num}${unit}`;
        }

        return value;
      });

      return result.join(' ');
    }
  });
};
