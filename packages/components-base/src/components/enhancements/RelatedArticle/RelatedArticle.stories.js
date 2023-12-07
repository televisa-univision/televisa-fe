import React from 'react';

import { storiesOf } from '@storybook/react';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { image } from '../../../config/storyMocks';
import RelatedArticle from '.';

storiesOf('Enhancement/Article Enhancement', module)
  .add('Default (Español)', () => {
    localization.setLanguage('es');
    return (
      <RelatedArticle
        uri="http://theurl.com"
        title="Sasquatch spotted in North Carolina!"
        image={image}
      />
    );
  })
  .add('Default (English)', () => {
    localization.setLanguage('en');
    return (
      <RelatedArticle
        uri="http://theurl.com"
        title="Sasquatch spotted in North Carolina!"
        image={image}
      />
    );
  })
  .add('LiveBlog Style', () => {
    localization.setLanguage('es');
    return (
      <RelatedArticle
        uri="http://theurl.com"
        title="Sasquate spotted in North Carolina!"
        image={image}
        isLiveBlog
      />
    );
  })
  .add('Left aligned', () => {
    localization.setLanguage('es');
    return (
      <RelatedArticle
        uri="http://theurl.com"
        title="Sasquatch spotted in North Carolina!"
        image={image}
        alignment="left"
      />
    );
  })
  .add('Right aligned', () => {
    localization.setLanguage('es');
    return (
      <RelatedArticle
        uri="http://theurl.com"
        title="Sasquatch spotted in North Carolina!"
        image={image}
        alignment="right"
      />
    );
  })
  .add('Showing sharing options', () => {
    localization.setLanguage('es');
    return (
      <RelatedArticle
        uri="http://theurl.com"
        title="Sasquatch spotted in North Carolina!"
        image={image}
        showShare
      />
    );
  });
