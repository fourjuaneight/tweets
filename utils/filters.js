const { format, formatISO } = require('date-fns');

module.exports = {
  dateToFormat: (date, fmt) => format(date, fmt),
  dateToISO: date => formatISO(date).slice(0, -5),
  stripSpaces: str => str.replace(/\s/g, ''),
};
