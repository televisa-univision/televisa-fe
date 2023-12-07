import React from 'react';
import { shallow } from 'enzyme';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import Tabs from '@univision/fe-components-base/dist/components/widgets/Tabs';

import features from '@univision/fe-commons/dist/config/features';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

import mockData from '../../../../__mocks__/uvnShowPageData.json';
import Show, { ShowBackground } from '.';

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
  it('should show a hidden h1 if primary topic is not available', () => {
    const wrapper = shallow(<Show pageData={mockData} />);
    expect(wrapper.find('Title').first().prop('hidden')).toBe(true);
    expect(wrapper.find('Title').first(0).render().text())
      .toBe('Médicos, Línea De Vida - Noticias y más');
  });

  it('should show a hidden h1 if primary topic is available', () => {
    mockData.data.primaryTopic = 'foo';
    const wrapper = shallow(<Show pageData={mockData} />);
    expect(wrapper.find('Title').first(0).render().text()).toBe('foo');
  });

  it('should apply correct style if dark on variant', () => {
    const wrapper = shallow(<ShowBackground tabVariant={'dark'} />);
    expect(wrapper).toHaveStyleRule(
      'background-color',
      '#000000'
    );
    expect(wrapper).toHaveStyleRule(
      'color',
      '#ffffff'
    );
  });

  it('should apply correct style if light on variant', () => {
    const wrapper = shallow(<ShowBackground tabVariant={'light'} />);
    expect(wrapper).toHaveStyleRule(
      'background-color',
      '#ffffff'
    );
  });

  it('should update tab variant', () => {
    features.shows.isShortform = jest.fn();
    features.shows.showsRedesign = jest.fn();
    features.shows.isShortform.mockReturnValueOnce(true);
    features.shows.showsRedesign.mockReturnValueOnce(true);
    const wrapper = shallow(<Show pageData={mockData} />);
    expect(wrapper.props().tabVariant).toBe('dark');
    const tabFirstBtn = wrapper.find(Tabs).at(0);
    const ontabchange = tabFirstBtn.props().onTabChange;
    ontabchange(1);
    wrapper.update();
    expect(wrapper.props().tabVariant).toBe('light');
    ontabchange(0);
    wrapper.update();
    expect(wrapper.props().tabVariant).toBe('dark');
  });

  it('should set correct start tab', () => {
    features.header.activeTab = jest.fn();
    features.header.activeTab.mockReturnValue(1);
    const wrapper = shallow(<Show pageData={mockData} />);
    const tab = wrapper.find(Tabs);
    expect(tab.props().startTab).toBe(1);
  });

  it('should render the main div', () => {
    storeHelpers.getPageData = jest.fn();
    storeHelpers.getPageData.mockReturnValueOnce(null);
    features.header.activeTab.mockReturnValue(true);
    const wrapper = shallow(<Show pageData={mockData} />);
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
    const wrapper = shallow(<Show pageData={mockPageData} />);
    expect(wrapper.props().tabVariant).toBe('light');
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
    const wrapper = shallow(<Show pageData={mockPageData} />);
    const tab = wrapper.find(Tabs);
    expect(tab.props().startTab).toBe(0);
  });

  it('should update tab if startTab to 1 when tabIndex undefined and hasLongform is true and have less than 5 videos', () => {
    const mockPageData = {
      data: {
        primaryTag: {
          name: 'primary Tag',
        },
        widgets,
        staticWidgets: [{
          contents: [{
            longform: true,
          },
          ],
        },
        ],
      },
    };
    const wrapper = shallow(<Show pageData={mockPageData} />);
    const tab = wrapper.find(Tabs);
    expect(tab.props().startTab).toBe(1);
  });

  it('should update tab if tabIndex exist and hasLongform is true', () => {
    const mockPageData = {
      data: {
        primaryTag: {
          name: 'el dragon',
        },
        widgets,
        staticWidgets: [{
          contents: [{
            longform: true,
          },
          ],
        },
        ],
      },
    };
    const wrapper = shallow(<Show pageData={mockPageData} />);
    const tab = wrapper.find(Tabs);
    const tabFirstDiv = tab.find('div').at(0);
    expect(tabFirstDiv.getElement().props.label).toBe(localization.get('fullEpisodes'));
  });
});
