import React from 'react';

import { storiesOf } from '@storybook/react';

import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import insertionPoints from './insertionPoints.json';
import WithWidgets from '.';

storiesOf('WithWidgets', module)
  .add('belowHeader', () => {
    Store.dispatch(setPageData({
      pageCategory: 'autos',
    }));
    let Element = <div>Header</div>;
    Element = WithWidgets(Element, insertionPoints.belowHeader);
    return <Element />;
  })
  .add('belowArticleBody', () => {
    let Element = <div>Article body</div>;
    Element = WithWidgets(Element, insertionPoints.belowArticleBody);
    return <Element />;
  });
