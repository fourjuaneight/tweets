import { promises } from 'fs';
import { resolve } from 'path';

import chalk from 'chalk';
import dotenv from 'dotenv';
import fetch from 'isomorphic-fetch';

interface Tweet {
  id: string;
  tweet: string;
  date: string;
  url: string;
}

dotenv.config();

const dist = resolve(__dirname, '..', 'src/data');
const { writeFile } = promises;

(async () => {
  try {
    const response = await fetch('https://tweets.juanvillela.dev/api/tweets/');
    const data: Tweet[] = await response.json();

    await writeFile(`${dist}/tweets.json`, JSON.stringify(data, null, 2));
  } catch (error) {
    throw new Error(`${chalk.red('[ERROR]')} ${error}`);
  }
})();
