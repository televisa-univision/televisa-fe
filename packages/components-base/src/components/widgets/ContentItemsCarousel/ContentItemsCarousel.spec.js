import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import features from '@univision/fe-commons/dist/config/features';
import ContentItemsCarousel from '.';
import ContentCard from '../../ContentCard';
import TopicBar from '../../TopicBar';
import mockData from './mockData.json';

jest.useFakeTimers();
features.shows.showsRedesign = jest.fn(() => false);
storeHelpers.getDevice = jest.fn();
storeHelpers.getPageData = jest.fn();

const props = {
  settings: {
    title: 'test',
  },
  content: mockData,
};

/** @test {ContentItemsCarousel} */
describe('ContentItemsCarousel Spec', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
    jest.clearAllTimers();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ContentItemsCarousel {...props} />, div);
  });

  it('should send resize event on mount to fix slick sizing issue', () => {
    global.dispatchEvent = jest.fn();
    const wrapper = shallow(<ContentItemsCarousel {...props} />);
    wrapper.instance().componentDidMount();
    jest.runAllTimers();
    expect(global.dispatchEvent).toHaveBeenCalled();
  });

  it('should add author to ContentCard', () => {
    const content = [{ ...props.content[0], authors: [{ title: 'test' }] }];
    const wrapper = shallow(<ContentItemsCarousel {...props} content={content} />);
    expect(wrapper.find(ContentCard).props().authors[0]).toHaveProperty('title', 'test');
  });

  it('should render in dark mode', () => {
    features.shows.showsRedesign.mockReturnValueOnce(true);
    const content = [{ ...props.content[0], authors: [{ title: 'test' }] }];
    const wrapper = shallow(<ContentItemsCarousel {...props} content={content} />);
    expect(wrapper.find(TopicBar).props().variant).toBe('dark');
  });
});

describe('tracking', () => {
  it('should track clicks on the slider arrows', () => {
    const instance = shallow(<ContentItemsCarousel {...props} widgetContext={{ type: 'test' }} />).instance();
    spyOn(WidgetTracker, 'track');
    instance.onClickArrow();
    expect(WidgetTracker.track).toHaveBeenLastCalledWith(expect.any(Function), { target: 'nav_arrow', widgetContext: { type: 'test' } });
  });
});
