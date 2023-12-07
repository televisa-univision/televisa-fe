/**
 * @module PrendeTV Download Asset Promo Card mock data
 */
const downloadAssets = {
  uid: '1',
  type: 'downloadassetpromocardtype',
  headLine: 'ARCHIVOS DE MARCA',
  contents: [
    {
      uid: '2',
      title: 'LOGOTIPO',
      image: {
        renditions: {
          original: {
            href: 'https://st1.uvnimg.com/3a/60/ff8a1c114b0cb94b76cf39d1fdaa/newversion.jpg',
          },
        },
      },
      file: {
        url: 'https://st1.uvnimg.com/20/4c/6a532c5c4215a5a5e1cf49908b11/prendetv-logos.zip',
      },
    },
    {
      uid: '3',
      title: 'SIZZLE REEL',
      image: {
        renditions: {
          original: {
            href: 'https://st1.uvnimg.com/3a/60/ff8a1c114b0cb94b76cf39d1fdaa/newversion.jpg',
          },
        },
      },
      file: {
        url: 'https://st1.uvnimg.com/b3/34/9738404c47feae5b936e16cb41a6/prendetv-prelaunch-tease-15-16x9.mp4.zip',
      },
    },
  ],
};

export default downloadAssets;
