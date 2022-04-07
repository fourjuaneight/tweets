/**
 * Font loading via FontFace API to avoid FOUT.
 * After US charset subset files load, load full Latin chartset files.
 */
if ('fonts' in document) {
  const mdNichromeBlack = new FontFace(
    'MD Nichrome',
    'url(/assets/fonts/MD-Nichrome-Black.woff2) format("woff2"), url(/assets/fonts/MD-Nichrome-Black.woff) format("woff")',
    { weight: '900' }
  );
  const mdNichromeBlackOblique = new FontFace(
    'MD Nichrome',
    'url(/assets/fonts/MD-Nichrome-Black-Oblique.woff2) format("woff2"), url(/assets/fonts/MD-Nichrome-Black-Oblique.woff) format("woff")',
    { style: 'oblique', weight: '900' }
  );
  const mdNichromeDark = new FontFace(
    'MD Nichrome',
    'url(/assets/fonts/MD-Nichrome-Dark.woff2) format("woff2"), url(/assets/fonts/MD-Nichrome-Dark.woff) format("woff")',
    { weight: '500' }
  );
  const nunitoRegular = new FontFace(
    'Nunito',
    'url(/assets/fonts/Nunito-Regular.woff2) format("woff2"), url(/assets/fonts/Nunito-Regular.woff) format("woff")'
  );
  const nunitoBold = new FontFace(
    'Nunito',
    'url(/assets/fonts/Nunito-Bold.woff2) format("woff2"), url(/assets/fonts/Nunito-Bold.woff) format("woff")',
    { weight: '700' }
  );

  Promise.all([
    mdNichromeBlack.load(),
    mdNichromeBlackOblique.load(),
    mdNichromeDark.load(),
    nunitoBold.load(),
    nunitoRegular.load(),
  ]).then(fonts => {
    fonts.forEach(font => {
      document.fonts.add(font);
    });
  });
}
