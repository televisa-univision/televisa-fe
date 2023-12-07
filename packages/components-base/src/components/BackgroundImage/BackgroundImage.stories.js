import React from 'react';

import { storiesOf } from '@storybook/react';

import Styles from './BackgroundImage.stories.scss';
import BackgroundImage from '.';

const image = {
  type: 'image',
  title: 'Imagen del lugar del tiroteo en Virginia',
  caption: 'Imagen del lugar del tiroteo en Virginia',
  credit: null,
  renditions: {
    original: {
      href: 'http://univision-bs.s3.amazonaws.com/6f/c3/b06507cd4f16962d78e7fe86d211/2017-06-14t124046z-2096246918-rc1f6f762ed0-rtrmadp-3-virginia-shooting.JPG',
      width: 1000,
      height: 666,
    },
    '16x9-med': {
      href: 'http://qa.univision.psdops.com/dims4/default/dafb400/2147483647/crop/1000x563%2B0%2B35/resize/400x225/quality/75/?url=http%3A%2F%2Funivision-bs.s3.amazonaws.com%2F6f%2Fc3%2Fb06507cd4f16962d78e7fe86d211%2F2017-06-14t124046z-2096246918-rc1f6f762ed0-rtrmadp-3-virginia-shooting.JPG',
      width: 400,
      height: 225,
    },
    '16x9': {
      href: 'http://qa.univision.psdops.com/dims4/default/ace40e0/2147483647/crop/1000x563%2B0%2B35/resize/1240x698/quality/75/?url=http%3A%2F%2Funivision-bs.s3.amazonaws.com%2F6f%2Fc3%2Fb06507cd4f16962d78e7fe86d211%2F2017-06-14t124046z-2096246918-rc1f6f762ed0-rtrmadp-3-virginia-shooting.JPG',
      width: 1240,
      height: 698,
    },
    '16x9-mobile': {
      href: 'http://qa.univision.psdops.com/dims4/default/9d2e097/2147483647/crop/1000x563%2B0%2B35/resize/480x270/quality/75/?url=http%3A%2F%2Funivision-bs.s3.amazonaws.com%2F6f%2Fc3%2Fb06507cd4f16962d78e7fe86d211%2F2017-06-14t124046z-2096246918-rc1f6f762ed0-rtrmadp-3-virginia-shooting.JPG',
      width: 480,
      height: 270,
    },
    '16x9-sm': {
      href: 'http://qa.univision.psdops.com/dims4/default/b468e04/2147483647/crop/1000x561%2B0%2B36/resize/246x138/quality/75/?url=http%3A%2F%2Funivision-bs.s3.amazonaws.com%2F6f%2Fc3%2Fb06507cd4f16962d78e7fe86d211%2F2017-06-14t124046z-2096246918-rc1f6f762ed0-rtrmadp-3-virginia-shooting.JPG',
      width: 246,
      height: 138,
    },
    '16x9-tablet': {
      href: 'http://qa.univision.psdops.com/dims4/default/4614ebf/2147483647/crop/1000x563%2B0%2B35/resize/1024x576/quality/75/?url=http%3A%2F%2Funivision-bs.s3.amazonaws.com%2F6f%2Fc3%2Fb06507cd4f16962d78e7fe86d211%2F2017-06-14t124046z-2096246918-rc1f6f762ed0-rtrmadp-3-virginia-shooting.JPG',
      width: 1024,
      height: 576,
    },
    '16x9-extended': {
      href: 'http://qa.univision.psdops.com/dims4/default/bafa900/2147483647/crop/1000x563%2B0%2B35/resize/1440x810/quality/75/?url=http%3A%2F%2Funivision-bs.s3.amazonaws.com%2F6f%2Fc3%2Fb06507cd4f16962d78e7fe86d211%2F2017-06-14t124046z-2096246918-rc1f6f762ed0-rtrmadp-3-virginia-shooting.JPG',
      width: 1440,
      height: 810,
    },
  },
};

storiesOf('Images/BackgroundImage', module)
  .add('without Blur', () => <BackgroundImage image={image} className={Styles.block} />)
  .add('with Blur', () => <BackgroundImage blur image={image} className={Styles.block} />);
