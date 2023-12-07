import React, { Fragment } from 'react';

import { storiesOf } from '@storybook/react';
import BKPIndicator from '@univision/fe-commons/dist/components/breakpoint/BreakPointIndicator';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import horoscopesTheme from '@univision/fe-commons/dist/themes/horoscopos';
import Horoscope from '.';

storiesOf('Horoscope', module)
  .add('default', () => {
    Store.dispatch(setPageData({
      data: {
        sharing: {
          options: {
            facebook: {},
            twitter: {
              via: 'Univision',
            },
            mail: {},
          },
        },
      },
    }));
    return (
      <Fragment>
        <BKPIndicator />
        <Horoscope theme={horoscopesTheme()} />
      </Fragment>
    );
  });
