import type StyleDictionary from 'style-dictionary';
import fs from 'fs-extra';
import path from 'path';
import concat from 'concat';

export const concatFiles = (sd: typeof StyleDictionary): void => {
  sd.registerAction({
    name: 'concat-files',
    do: (_dictionary, config) => {
      try {
        const buildPath = config.buildPath;
        const files = fs.readdirSync(buildPath);

        if (files.length === 0) {
          console.warn('No files found in the build path.');
          return;
        }

        // Determine the file extension from the first file
        const extension = path.extname(files[0]);
        const allPaths = files.map((f: string) => path.join(buildPath, f));
        const concatPaths = allPaths.filter((p: string) => !path.basename(p).includes('no_concat'));
        const noConcatPaths = allPaths.filter((p: string) => path.basename(p).includes('no_concat'));

        // Rename files with 'no_concat' in their name
        noConcatPaths.forEach((p: string) => {
          const newPath = p.replace('.no_concat', '');
          fs.renameSync(p, newPath);
        });

        // Concatenate files
        concat(concatPaths).then((r: string) => {
          const outFile = path.join(buildPath, `cdr-tokens${extension}`);
          fs.outputFileSync(outFile, r);
        });

        // Remove concatenated files
        concatPaths.forEach((p: string) => {
          fs.removeSync(p);
        });

        console.log('Successfully removed concatenated files');
      } catch (error) {
        console.error('Error during file concatenation process:', error);
      }
    },
    undo: (_dictionary, config) => {
      try {
        const buildPath = config.buildPath;
        fs.removeSync(buildPath);
        console.log(`Successfully removed ${buildPath}`);
      } catch (error) {
        console.error('Error removing build path:', error);
      }
    }
  });
};
