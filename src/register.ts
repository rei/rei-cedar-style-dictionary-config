import type StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

// Import transforms
import * as transforms from './transforms/index.js';

// Import formats
import * as formats from './formats/index.js';

// Import filters
import * as filters from './filters/index.js';

// Import actions
import * as actions from './actions/index.js';

/**
 * Registers all Cedar-specific transforms, formats, filters, and actions
 * with Style Dictionary
 * @param sd Style Dictionary instance
 * @param utilityPaths Optional paths to utility files for actions
 */
export const registerAllExtensions = (
  sd: typeof StyleDictionary,
  utilityPaths?: {
    scss?: {
      'display'?: string;
      'media-queries'?: string;
      'container-queries'?: string;
      'deprecate'?: string;
    };
    less?: {
      'display'?: string;
      'media-queries'?: string;
      'container-queries'?: string;
    };
  }
): void => {
  // Register tokens-studio transforms
  register(sd);

  // Register custom transforms
  transforms.deprecated(sd);
  transforms.dpTransitive(sd);
  transforms.space(sd);
  transforms.spaceJs(sd);
  transforms.pxToRemTransitive(sd);
  transforms.stripPx(sd);
  transforms.stripAllPx(sd);
  transforms.stripAllPxJs(sd);
  transforms.float(sd);
  transforms.cssClamp(sd);

  // Register custom formats
  formats.scssMixin(sd);
  formats.scssMap(sd);
  formats.less(sd);
  formats.site(sd);
  formats.figma(sd);

  // Register custom filters
  filters.removeSourceTokens(sd);

  // Register custom actions
  actions.concatFiles(sd);
  
  // Register utility actions with optional paths
  if (utilityPaths?.scss?.['display']) {
    actions.includeDisplayScss(sd, utilityPaths.scss['display']);
  }
  if (utilityPaths?.scss?.['media-queries']) {
    actions.includeMediaQueriesScss(sd, utilityPaths.scss['media-queries']);
  }
  if (utilityPaths?.scss?.['container-queries']) {
    actions.includeContainerQueriesScss(sd, utilityPaths.scss['container-queries']);
  }
  if (utilityPaths?.scss?.['deprecate']) {
    actions.includeDeprecateScss(sd, utilityPaths.scss['deprecate']);
  }
  
  if (utilityPaths?.less?.['display']) {
    actions.includeDisplayLess(sd, utilityPaths.less['display']);
  }
  if (utilityPaths?.less?.['media-queries']) {
    actions.includeMediaQueriesLess(sd, utilityPaths.less['media-queries']);
  }
  if (utilityPaths?.less?.['container-queries']) {
    actions.includeContainerQueriesLess(sd, utilityPaths.less['container-queries']);
  }
};
