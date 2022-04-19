const { format, formatISO, getYear } = require('date-fns');

const meta = require('../src/data/meta');

module.exports = {
  absURL: url => `${meta.url}${url}`,
  dateToFormat: (date, fmt) => format(date, fmt),
  dateToISO: date => formatISO(date).slice(0, -5),
  dateYear: dateStr => {
    const date = new Date(dateStr);
    return getYear(date);
  },
  stripSpaces: str => str.replace(/\s/g, ''),
};
