/* eslint-disable require-jsdoc */
import React from 'react';
import { getDevice } from '@univision/fe-commons/dist/utils/storybook';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import { storiesOf } from '@storybook/react';
import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';

import AbacastSchedule from './AbacastSchedule';

const device = getDevice();

storiesOf('Widgets/AbacastSchedule', module)
  .add('default', () => {
    Store.dispatch(setPageData({ device }));
    return (
      <ApiProvider
        url="http://univision.com/los-angeles/klve"
        render={api => (
          <AbacastSchedule
            schedule={api.brandable.radioStation.radioSchedule}
            title={api.title}
          />
        )}
      />
    );
  });
