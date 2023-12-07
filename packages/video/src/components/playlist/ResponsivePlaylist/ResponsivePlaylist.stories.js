/* eslint-disable require-jsdoc */
import React from 'react';

import { storiesOf } from '@storybook/react';
import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';
import BKPIndicator from '@univision/fe-commons/dist/components/breakpoint/BreakPointIndicator';
import Store from '@univision/fe-commons/dist/store/store';

import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import ResponsivePlaylist from '.';

const url = 'http://univision.com/noticias';

['mobile', 'tablet', 'desktop'].map((device) => {
  return storiesOf('Layout/ResponsivePlaylist', module)
    .add(device, () => {
      Store.dispatch(setPageData({
        device,
        theme: { primary: '#BC0D0D' },
      }));
      return (
        <ApiProvider
          url={url}
          render={d => (
            <div>
              <BKPIndicator />
              <ResponsivePlaylist
                content={d.widgets[1].contents}
                activeIndex={1}
                onClick={() => {}}
              />
            </div>
          )}
        />
      );
    });
});
