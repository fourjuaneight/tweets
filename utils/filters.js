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
  dateToFormat: (date, fmt) => format(date, fmt),
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
  dateYear: dateStr => {
    const date = new Date(dateStr);
    return getYear(date);
  },
  stripSpaces: str => str.replace(/\s/g, ''),
};
