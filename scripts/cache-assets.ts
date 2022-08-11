import { resolve } from 'path';

import dotenv from 'dotenv';
import glob from 'glob';
import { replaceInFile, ReplaceInFileConfig } from 'replace-in-file';

import logger from './logger';

dotenv.config();

const globSync = glob.sync;
const SITE_URL: string = 'https://tweets.juanvillela.dev';
const timestamp: number = Math.floor(new Date().getTime() / 1000);

// Glob options. Pass directory to search and files to ignore
const cwd = resolve(__dirname, '..', 'dist');
const ignore = ['sw.js'];

// Find all JS, CSS, and font files in rendered output
(async () => {
  // create matched files array
  const files = globSync('**/*.{js,css,woff,woff2}', {
    cwd,
    ignore,
  });
  const sw = globSync('sw.js', { cwd });
  const newFiles = files.map(toCache => `'/${toCache}'`).toString();

  // find and replace options; add hash ID, files to cache array, and site base URL
  const replaceOptions: ReplaceInFileConfig = {
    files: [`${cwd}/${sw[0]}`],
    from: [/\["staticAssets"\]/g, /"version"/g, /baseURL/g],
    to: [`[${newFiles}]`, `'${timestamp}'`, `${SITE_URL}`],
  };

  try {
    await replaceInFile(replaceOptions);

    logger.info('[cache-assets]: SW updated.');
    process.exit(0);
  } catch (error) {
    logger.error(`[cache-assets]: ${error}`);
    process.exit(1);
  }
})();
