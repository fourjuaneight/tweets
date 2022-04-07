const { minify } = require('html-minifier');
const meta = require('../src/data/meta.json');

const shouldTransformHTML = outputPath =>
  outputPath &&
  outputPath.endsWith('.html') &&
  process.env.ELEVENTY_ENV === 'production';

module.exports = {
  htmlmin: (content, outputPath) => {
    if (shouldTransformHTML(outputPath)) {
      return minify(content, {
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        useShortDoctype: true,
      });
    }

    return content;
  },
  absURL: (content, outputPath) => {
    if (shouldTransformHTML(outputPath)) {
      return content.replace(/(.*)/g, `${meta.url}/$1/`);
    }

    return content;
  },
  dateYear: (content, outputPath) => {
    if (shouldTransformHTML(outputPath)) {
      const date = new Date(content);
      return date.getFullYear();
    }

    return content;
  },
};
