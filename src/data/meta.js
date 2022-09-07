module.exports = {
  title: 'Tweet Archive',
  description:
    "This is my tweet archive. Why? I don't trust anyone —let alone Twitter— with my data.",
  url:
    process.env.ELEVENTY_ENV === 'development'
      ? ''
      : 'https://tweets.juanvillela.dev',
  social: 'galewindalbert',
  lang: 'en',
  locale: 'en_us',
  colors: {
    primary: '#9333ea',
    secondary: '#0a799d',
  },
};
