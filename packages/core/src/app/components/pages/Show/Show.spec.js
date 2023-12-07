import React from 'react';
import { shallow } from 'enzyme';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import features from '@univision/fe-commons/dist/config/features';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

import Show from './Show';

const widgets = [
  <div className="cont" key="0">
    Hello World!
  </div>,
  <div className="cont" key="1">
    Hello World!
  </div>,
  <div className="cont" key="2">
    Hello World!
  </div>,
  <div className="cont" key="3">
    Hello World!
  </div>,
  <div className="cont" key="4">
    Hello World!
  </div>,
];

describe('Show spec', () => {
  it('should show a hidden h1 if primary topic is available', () => {
    const dataWithTopic = {
      data: {
        primaryTopic: 'Hello World',
        title: 'Page title',
      },
    };
    Store.dispatch(setPageData(dataWithTopic));
    const wrapper = shallow(<Show debug widgets={widgets} staticWidgets={widgets} />);
    expect(wrapper.find('Title').first().prop('hidden')).toBe(true);
  });

  it('should update tab variant', () => {
    features.shows.isShortform = jest.fn();
    features.shows.showsRedesign = jest.fn();
    features.shows.isShortform.mockReturnValueOnce(true);
    features.shows.showsRedesign.mockReturnValueOnce(true);
    const wrapper = shallow(<Show widgets={widgets} staticWidgets={widgets} />);
    expect(wrapper.state().tabVariant).toBe('dark');
    wrapper.instance().onTabChange(0);
    expect(wrapper.state().tabVariant).toBe('dark');
    wrapper.instance().onTabChange(1);
    expect(wrapper.state().tabVariant).toBe('light');
  });

  it('should set correct start tab', () => {
    features.header.activeTab = jest.fn();
    features.header.activeTab.mockReturnValue(1);
    const wrapper = shallow(<Show widgets={widgets} staticWidgets={widgets} />);
    expect(wrapper.instance().startTab).toBe(1);
  });

  it('should render the main div', () => {
    storeHelpers.getPageData = jest.fn();
    storeHelpers.getPageData.mockReturnValueOnce(null);
    features.header.activeTab.mockReturnValue(true);
    const wrapper = shallow(<Show widgets={widgets} staticWidgets={widgets} />);
    expect(wrapper.find('div.app-container')).toBeDefined();
  });

  it('should update tab variant if active tab is different', () => {
    const mockPageData = {
      data: {
        primaryTag: {
          name: 'al punto',
        },
      },
    };
    storeHelpers.getPageData.mockReturnValueOnce(mockPageData);
    const wrapper = shallow(<Show widgets={widgets} staticWidgets={widgets} />);
    expect(wrapper.state().tabVariant).toBe('light');
  });

  it('should update tab if startTab to 0 when tabIndex undefined and hasLongform is true and have more than 5 videos', () => {
    const mockPageData = {
      data: {
        primaryTag: {
          name: 'primary Tag',
        },
        staticWidgets: [{
          contents: [{
            longform: true,
          },
          {
            longform: true,
          },
          {
            longform: true,
          },
          {
            longform: true,
          },
          {
            longform: true,
          },
          {
            longform: true,
          },
          {
            longform: true,
          },
          ],
        },
        ],
      },
    };
    storeHelpers.getPageData.mockReturnValueOnce(mockPageData);
    const wrapper = shallow(<Show widgets={widgets} staticWidgets={widgets} />);
    expect(wrapper.instance().startTab).toBe(0);
  });

  it('should update tab if startTab to 1 when tabIndex undefined and hasLongform is true and have less than 5 videos', () => {
    const mockPageData = {
      data: {
        primaryTag: {
          name: 'primary Tag',
        },
        staticWidgets: [{
          contents: [{
            longform: true,
          },
          ],
        },
        ],
      },
    };
    storeHelpers.getPageData.mockReturnValueOnce(mockPageData);
    const wrapper = shallow(<Show widgets={widgets} staticWidgets={widgets} />);
    expect(wrapper.instance().startTab).toBe(1);
  });

  it('should update tab if tabIndex exist and hasLongform is true', () => {
    const mockPageData = {
      data: {
        primaryTag: {
          name: 'el dragon',
        },
        staticWidgets: [{
          contents: [{
            longform: true,
          },
          ],
        },
        ],
      },
    };
    storeHelpers.getPageData.mockReturnValueOnce(mockPageData);
    const wrapper = shallow(<Show widgets={widgets} staticWidgets={widgets} />);
    expect(wrapper.instance().mainTabTitle).toBe(localization.get('fullEpisodes'));
  });
});
