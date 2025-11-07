import type StyleDictionary from 'style-dictionary';
import fs from 'fs-extra';
import path from 'path';

export const createIncludeUtilityAction = (
  name: string,
  utilityType: string,
  extension: 'scss' | 'less'
) => {
  return (sd: typeof StyleDictionary, utilityFilePath?: string): void => {
    sd.registerAction({
      name,
      do: (_dictionary, config) => {
        if (!utilityFilePath) {
          console.warn(`No utility file path provided for ${name}, skipping...`);
          return;
        }

        try {
          const outputDir = config.buildPath;
          const outputFile = path.join(outputDir, `${utilityType}.${extension}`);

          // Ensure the output directory exists
          fs.ensureDirSync(outputDir);

          // Copy the utility file to the output directory
          fs.copyFileSync(utilityFilePath, outputFile);
          console.log(`Successfully copied ${utilityFilePath} to ${outputFile}`);
        } catch (error) {
          console.error(`Error including ${utilityType} ${extension.toUpperCase()} file:`, error);
        }
      },
      undo: (_dictionary, config) => {
        try {
          const outputDir = config.buildPath;
          const outputFile = path.join(outputDir, `${utilityType}.${extension}`);

          // Remove the specific file
          fs.removeSync(outputFile);
          console.log(`Successfully removed ${outputFile}`);
        } catch (error) {
          console.error(`Error removing ${utilityType} ${extension.toUpperCase()} file:`, error);
        }
      }
    });
  };
};

// Pre-configured action creators
export const includeDisplayScss = createIncludeUtilityAction('include-display-scss', 'display', 'scss');
export const includeMediaQueriesScss = createIncludeUtilityAction('include-media-queries-scss', 'media-queries', 'scss');
export const includeContainerQueriesScss = createIncludeUtilityAction('include-container-queries-scss', 'container-queries', 'scss');
export const includeDeprecateScss = createIncludeUtilityAction('include-deprecate-scss', 'deprecate', 'scss');

export const includeDisplayLess = createIncludeUtilityAction('include-display-less', 'display', 'less');
export const includeMediaQueriesLess = createIncludeUtilityAction('include-media-queries-less', 'media-queries', 'less');
export const includeContainerQueriesLess = createIncludeUtilityAction('include-container-queries-less', 'container-queries', 'less');
