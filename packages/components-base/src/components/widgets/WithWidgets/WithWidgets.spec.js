import React from 'react';
import Loadable from 'react-loadable';
import { shallow } from 'enzyme';

import * as categories from '@univision/fe-commons/dist/constants/pageCategories';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import insertionPoints from './insertionPoints.json';
import * as getWidgetsConfig from './config';
import WithWidgets from '.';

describe('WithWidgets', () => {
  it('should insert Car Saver', async () => {
    const pageCategory = categories.AUTOS;
    const device = 'mobile';
    const data = {
      type: 'section'
    };
    Store.dispatch(setPageData({ pageCategory, device, data }));
    const ComponentWithWidgets = WithWidgets(<div />, [insertionPoints.belowHeader]);
    await Loadable.preloadAll();
    const wrapper = shallow(<ComponentWithWidgets />);
    // Main component
    expect(wrapper.children().at(0).find('div').length).toBe(1);
    // Below the component
    expect(wrapper.children().at(1).find('LoadableComponent').length).toBe(1);
    // Ad
    expect(wrapper.children().at(2).find('.uvs-ad-full-width').length).toBe(1);
  });

  it('should not add any widget if there is not match', async () => {
    const pageCategory = 'random';
    const device = 'mobile';
    const data = {
      type: 'section'
    };
    Store.dispatch(setPageData({ pageCategory, device, data }));
    const ComponentWithWidgets = WithWidgets(<div />, insertionPoints.aboveFooter);
    await Loadable.preloadAll();
    const wrapper = shallow(<ComponentWithWidgets />);
    expect(wrapper.children().length).toBe(1);
    expect(wrapper.children().at(0).find('div').length).toBe(1);
  });

  it('should not render any content if no component or insertion points are given', async () => {
    const pageCategory = 'random';
    const device = 'mobile';
    const data = {
      type: 'section'
    };
    Store.dispatch(setPageData({ pageCategory, device, data }));
    const ComponentWithWidgets = WithWidgets(null, null);
    await Loadable.preloadAll();
    const wrapper = shallow(<ComponentWithWidgets />);
    expect(wrapper.children().length).toBe(0);
  });

  it('should insert widgets above footer, if defined', async () => {
    const pageCategory = 'random';
    const device = 'mobile';
    const data = {
      type: 'article'
    };
    const pageData = { pageCategory, device, data };
    Store.dispatch(setPageData(pageData));
    spyOn(getWidgetsConfig, 'default').and.returnValue({
      random: [
        {
          insertionPoint: insertionPoints.aboveFooter,
          widget: {
            component: 'div',
            props: {
            },
          },
        }
      ]
    });
    const ComponentWithWidgets = WithWidgets(<div />, insertionPoints.aboveFooter);
    await Loadable.preloadAll();
    const wrapper = shallow(<ComponentWithWidgets />);
    expect(wrapper.children().length).toBe(2);
    expect(wrapper.children().at(0).find('div').length).toBe(1);
    expect(wrapper.children().at(1).find('div').length).toBe(1);
  });

  it('should insert the CivicScience widget', async () => {
    Store.dispatch(setPageData({
      pageCategory: 'RANDOM',
      data: {
        externalWidgets: {
          civicScience: '<script type="text/javascript" src="https://www.civicscience.com/widget/jspoll/?elt=2827b225-3477-7b34-7dea-88a6b5047569&tgtid=baa9bace-d093-7594-014e-f8c8db509e69" defer></script><div id="2827b225-3477-7b34-7dea-88a6b5047569"></div>'
        }
      }
    }));
    const ComponentWithWidgets = WithWidgets(<div />, insertionPoints.belowArticleBody);
    await Loadable.preloadAll();
    const wrapper = shallow(<ComponentWithWidgets />);
    // Main component
    expect(wrapper.children().at(0).find('div').length).toBe(1);
    // Below the component
    expect(wrapper.children().at(1).find('LoadableComponent').length).toBe(1);
  });
});

describe('getWidgetsConfig', () => {
  it('autos - returns CarSaver for mobile devices', () => {
    const widgetConfig = getWidgetsConfig.default({
      device: 'mobile',
      data: {
        type: 'article'
      }
    })[categories.AUTOS][0];
    const wrapper = shallow(<widgetConfig.widget.component />);
    expect(widgetConfig.widget.props.orientation).toBe('horizontal');
    wrapper.dive();
  });

  it('autos - returns CarSaver for mobile devices', async () => {
    const widgetConfig = getWidgetsConfig.default({
      device: 'desktop',
      data: {
        type: 'section'
      }
    })[categories.AUTOS][0];
    await Loadable.preloadAll();
    const wrapper = shallow(<widgetConfig.widget.component />);
    expect(wrapper.find('CarSaver').length).toBe(1);
    expect(widgetConfig.widget.props.orientation).toBe('horizontal');
    expect(widgetConfig.advertisement).toBeDefined();
  });
});
