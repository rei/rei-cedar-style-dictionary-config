import type StyleDictionary from 'style-dictionary';
import type { CreateConfigOptions } from './types';
import { 
  createCssConfig, 
  createScssConfig, 
  createLessConfig, 
  createJsConfig,
  createAndroidConfig,
  createIosConfig,
  createFigmaConfig,
  createSiteGlobalConfig,
  createSiteWebConfig,
  createSiteAndroidConfig,
  createSiteIosConfig
} from './configs';

/**
 * Creates a Style Dictionary configuration for the specified platform
 * @param options Configuration options
 * @returns Style Dictionary config object
 */
export const createConfig = (options: CreateConfigOptions): any => {
  const {
    platform,
    source,
    buildPath,
    include = [],
    platforms: selectedPlatforms,
    prefix = 'cdr',
    utilities,
    showFileHeader = false
  } = options;

  let platformConfigs: Record<string, any> = {};

  switch (platform) {
    case 'web':
      // Web supports multiple output formats
      const webPlatforms = selectedPlatforms || ['scss', 'less', 'css', 'js'];
      
      if (webPlatforms.includes('css')) {
        platformConfigs = { ...platformConfigs, ...createCssConfig(buildPath, prefix, showFileHeader) };
      }
      if (webPlatforms.includes('scss')) {
        platformConfigs = { ...platformConfigs, ...createScssConfig(buildPath, prefix, showFileHeader, utilities?.scss) };
      }
      if (webPlatforms.includes('less')) {
        platformConfigs = { ...platformConfigs, ...createLessConfig(buildPath, prefix, showFileHeader, utilities?.less) };
      }
      if (webPlatforms.includes('js')) {
        platformConfigs = { ...platformConfigs, ...createJsConfig(buildPath, prefix, showFileHeader) };
      }
      break;

    case 'android':
      platformConfigs = createAndroidConfig(buildPath, prefix, showFileHeader);
      break;

    case 'ios':
      platformConfigs = createIosConfig(buildPath, prefix, showFileHeader);
      break;

    case 'figma':
      platformConfigs = createFigmaConfig(buildPath, prefix, showFileHeader);
      break;

    case 'site/global':
      platformConfigs = createSiteGlobalConfig(buildPath, prefix, showFileHeader);
      break;

    case 'site/web':
      platformConfigs = createSiteWebConfig(buildPath, prefix, showFileHeader);
      break;

    case 'site/android':
      platformConfigs = createSiteAndroidConfig(buildPath, prefix, showFileHeader);
      break;

    case 'site/ios':
      platformConfigs = createSiteIosConfig(buildPath, prefix, showFileHeader);
      break;
  }

  return {
    include,
    source,
    preprocessors: ['tokens-studio'],
    platforms: platformConfigs,
    usesDtcg: true,
    log: {
      verbosity: 'verbose'
    }
  };
};
