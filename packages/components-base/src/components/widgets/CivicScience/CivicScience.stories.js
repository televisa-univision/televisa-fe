import React from 'react';
import { storiesOf } from '@storybook/react';

import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import CivicScience from '.';

storiesOf('Widgets/CivicScience', module)
  .add('default', () => {
    Store.dispatch(setPageData({
      data: {
        externalWidgets: {
          civicScience: '<script type="text/javascript" src="https://www.civicscience.com/widget/jspoll/?elt=2827b225-3477-7b34-7dea-88a6b5047569&tgtid=baa9bace-d093-7594-014e-f8c8db509e69" defer></script><div id="2827b225-3477-7b34-7dea-88a6b5047569"></div>',
        },
      },
    }));
    return <CivicScience />;
  });
