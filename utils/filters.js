/* eslint-disable no-unused-vars */
const {
  format,
  formatISO,
  getYear,
  formatRelative,
  parseISO,
  differenceInDays,
} = require('date-fns');

const meta = require('../src/data/meta');

module.exports = {
  absURL: url => `${meta.url}/${url}`,
  cleanURL: url => url.replace(/\.html$/g, ''),
  dateToFormat: (date, fmt) => format(parseISO(date), fmt),
  dateToISO: date => formatISO(date).slice(0, -5),
  dateToRelative: date => {
    const distance = differenceInDays(parseISO(date), new Date());

    if (distance < -6) {
      return format(parseISO(date), 'PPPp');
    } else {
      return formatRelative(parseISO(date), new Date(), {
        weekStartsOn: 1,
      });
    }
  },
  dateToYear: date => getYear(parseISO(date)),
  dateYear: dateStr => getYear(new Date(dateStr)),
  stripSpaces: str => str.replace(/\s/g, ''),
  tweetUrls: url =>
    url.replace(
      // eslint-disable-next-line no-useless-escape
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g,
      (match, p1, p2) =>
        `<a class="break-words" href="${match}" target="_blank" rel="noopener noreferrer">${match}</a>`
    ),
  twitterUsername: str =>
    str.replace(
      /@([a-zA-Z0-9_]+)/g,
      (match, username) =>
        `<a class="break-words" href="https://twitter.com/${username}" target="_blank" rel="noopener noreferrer">@${username}</a>`
    ),
  unicodeToEmoji: text =>
    text.replace(/([0-9]{1}\/[0-9]{1}$)/g, ' $1').replace(/U\+/g, '&#x'),
};
