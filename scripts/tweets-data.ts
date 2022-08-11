import { promises } from 'fs';
import { resolve } from 'path';

import dotenv from 'dotenv';
import fetch from 'isomorphic-fetch';
import { getYear, parseISO } from 'date-fns';

import logger from './logger';

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
    const years: number[] = data
      .map(({ date }) => getYear(parseISO(date)))
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => b - a);

    await writeFile(`${dist}/tweets.json`, JSON.stringify(data, null, 2));
    await writeFile(`${dist}/tweetYears.json`, JSON.stringify(years, null, 2));

    logger.info('[tweets-data]: Tweets data updated and saved.');
    process.exit(0);
  } catch (error) {
    logger.error(`[tweets-data]: ${error}`);
    process.exit(1);
  }
})();
