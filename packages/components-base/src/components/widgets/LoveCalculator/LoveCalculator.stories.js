import React, { Fragment } from 'react';

import { storiesOf } from '@storybook/react';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import BreakPoint from '@univision/fe-commons/dist/components/breakpoint/BreakPointIndicator';
import getTheme from '@univision/fe-commons/dist/utils/themes/themes';

import LoveCalculator from '.';

const theme = getTheme('/horoscopos');

storiesOf('LoveCalculator', module)
  .add('default', () => {
    Store.dispatch(setPageData({
      data: {
        sharing: {
          options: {
            facebook: {},
            twitter: {},
            mail: {},
          },
        },
      },
    }));
    return (
      <Fragment>
        <BreakPoint />
        <LoveCalculator theme={theme} />
      </Fragment>
    );
  });
