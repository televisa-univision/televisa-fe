import React from 'react';

import { storiesOf } from '@storybook/react';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import * as languages from '@univision/fe-commons/dist/utils/localization/languages';

import RelatedTags from '.';

storiesOf('Clickable/RelatedTags', module)
  .add('En Español', () => {
    localization.setLanguage(languages.ES);
    return (
      <RelatedTags
        tags={[{ name: 'Related Tag #1', link: '#', color: 'green' }, { name: 'Related Tag #2', link: '#', color: 'red' }]}
      />
    );
  })
  .add('In English', () => {
    localization.setLanguage(languages.EN);
    return (
      <RelatedTags
        tags={[{ name: 'Related Tag #1', link: '#', color: '#808080' }, { name: 'Related Tag #2', link: '#', color: 'blue' }]}
      />
    );
  })
  .add('Custom Separator Using |', () => {
    localization.setLanguage(languages.EN);
    return (
      <RelatedTags
        separator="|"
        tags={[{ name: 'Related Tag #1', link: '#', color: '#808080' }, { name: 'Related Tag #2', link: '#', color: 'blue' }]}
      />
    );
  })
  .add('Mixed links', () => {
    localization.setLanguage(languages.EN);
    return (
      <RelatedTags
        tags={[
          { name: 'Related Tag Link 1', link: '#', color: 'green' },
          { name: 'Related Tag No Link 1' },
          { name: 'Related Tag Link 2', link: '#' },
          { name: 'Related Tag No Link 2' },
          { name: 'Related Tag No Link 3' },
          { name: 'Related Tag Link 3', link: '#' },
        ]}
      />
    );
  });
