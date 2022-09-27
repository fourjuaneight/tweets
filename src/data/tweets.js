const fetch = require('isomorphic-fetch');

const getTweets = async () => {
  try {
    const response = await fetch('https://tweets.juanvillela.dev/api/tweets/');
    const tweets = await response.json();

    return tweets;
  } catch (error) {
    console.error(`[tweets-data]: ${error}`);
    process.exit(1);
  }
};

module.exports = getTweets;
