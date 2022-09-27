const fetch = require('isomorphic-fetch');
const { getYear, parseISO } = require('date-fns');

const getYears = async () => {
  try {
    const response = await fetch('https://tweets.juanvillela.dev/api/tweets/');
    const data = await response.json();
    const years = data
      .map(({ date }) => getYear(parseISO(date)))
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => b - a);

    return years;
  } catch (error) {
    console.error(`[tweets-data]: ${error}`);
    process.exit(1);
  }
};

module.exports = getYears;
