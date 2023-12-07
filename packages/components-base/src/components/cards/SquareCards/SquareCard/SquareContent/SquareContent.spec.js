import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import getFromMap from '@univision/fe-utilities/helpers/object/getFromMap';
import {
  ARTICLE,
  VIDEO, SOCCER_MATCH, LIVE_STREAM,
} from '@univision/fe-commons/dist/constants/contentTypes';

import contentOptions from '../contentOptions';
import SquareContent from '.';

const props = {
  advertisementBrand: 'Coca-cola',
  authors: [],
  durationString: '12 min',
  labelProps: {
    text: 'Label',
    type: 'default',
    href: 'url',
  },
  readTime: '12min',
  slideCount: 5,
  cardTheme: {},
  title: 'Title',
  theme: {},
  uid: '1',
  uri: 'url',
  updateDate: '2-12-2020',
  widgetContext: {},
};
describe('SquareContent', () => {
  it('should render without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <SquareContent />,
      div
    );
  });
  it('should render correctly with props for article showing title, badge and cta', () => {
    const cardContentOptions = {
      ...getFromMap(ARTICLE, contentOptions),
    };
    const wrapper = mount(
      <SquareContent
        size={LARGE}
        type={ARTICLE}
        {...props}
        contentOptions={cardContentOptions}
      />
    );
    expect(wrapper.find('SquareTitle').length).toBe(1);
    expect(wrapper.find('SquareBadge').length).toBe(1);
    expect(wrapper.find('SquareCTA').length).toBe(1);
  });
  it('should render correctly with props for video showing title, badge and cta', () => {
    const cardContentOptions = {
      ...getFromMap(VIDEO, contentOptions),
    };
    const wrapper = mount(
      <SquareContent
        size={MEDIUM}
        type={VIDEO}
        {...props}
        contentOptions={cardContentOptions}
      />
    );
    expect(wrapper.find('SquareTitle').length).toBe(1);
    expect(wrapper.find('SquareBadge').length).toBe(1);
    expect(wrapper.find('SquareCTA').length).toBe(1);
    expect(wrapper.find('SquareContent__Content')).toHaveStyleRule('position', 'absolute');
  });
  it('should render only title for socceer match', () => {
    const cardContentOptions = {
      ...getFromMap(SOCCER_MATCH, contentOptions),
    };
    const wrapper = mount(
      <SquareContent
        size={SMALL}
        type={SOCCER_MATCH}
        {...props}
        contentOptions={cardContentOptions}
      />
    );
    expect(wrapper.find('SquareTitle').length).toBe(1);
    expect(wrapper.find('SquareBadge').length).toBe(0);
    expect(wrapper.find('SquareCTA').length).toBe(0);
  });
  it('should not render cta for live stream', () => {
    const cardContentOptions = {
      ...getFromMap(LIVE_STREAM, contentOptions),
    };
    const wrapper = mount(
      <SquareContent
        size={SMALL}
        type={LIVE_STREAM}
        {...props}
        contentOptions={cardContentOptions}
      />
    );
    expect(wrapper.find('SquareTitle').length).toBe(1);
    expect(wrapper.find('SquareBadge').length).toBe(1);
    expect(wrapper.find('SquareCTA').length).toBe(0);
  });
  it('should render only badge for inline video type', () => {
    const cardContentOptions = {
      ...getFromMap('videoInline', contentOptions),
    };
    const wrapper = mount(
      <SquareContent
        size={SMALL}
        type={VIDEO}
        {...props}
        contentOptions={cardContentOptions}
      />
    );
    expect(wrapper.find('SquareTitle').length).toBe(0);
    expect(wrapper.find('SquareBadge').length).toBe(1);
    expect(wrapper.find('SquareCTA').length).toBe(0);
  });
});
