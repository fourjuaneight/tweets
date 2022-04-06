const { minify } = require('html-minifier');

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
};
