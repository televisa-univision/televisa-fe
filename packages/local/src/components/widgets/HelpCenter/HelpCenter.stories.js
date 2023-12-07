import React from 'react';
import { storiesOf } from '@storybook/react';

import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';

import HelpCenter from '.';

const url = 'https://uat.x.univision.com/_preview/0000017f-08c0-da6a-afff-28f102cc0000/UAT';

storiesOf('Widgets/HelpCenter', module)
  .addDecorator((story) => {
    return <div className="uvs-container">{story()}</div>;
  })
  .add('default', () => {
    return (
      <ApiProvider
        url={url}
        env="uat"
        render={api => (
          <HelpCenter content={api.widgets[1].contents} />
        )}
      />
    );
  });
