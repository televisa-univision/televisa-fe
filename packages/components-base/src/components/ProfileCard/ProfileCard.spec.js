import React from 'react';
import { shallow, mount } from 'enzyme';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import Store from '@univision/fe-commons/dist/store/store';
import ProfileCard from '.';
import data from './mockData.json';

afterEach(() => {
  jest.clearAllMocks();
});

describe('ProfileCard component tests', () => {
  it('returns null if the component has no data', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const wrapper = shallow(<ProfileCard />);
    expect(wrapper.getElement()).toBe(null);
  });

  it('should render correctly with data', () => {
    const wrapper = mount(<ProfileCard {...data[0]} />);
    expect(wrapper.getElement()).toBeDefined();
  });

  it('should render correctly without primaryTag', () => {
    const wrapper = mount(<ProfileCard {...data[0]} primaryTag={null} />);
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('Link').at(0).props()).toHaveProperty('href', data[0].uri);
  });

  it('should render correctly without uri', () => {
    const wrapper = mount(<ProfileCard {...data[0]} uri={null} />);
    expect(wrapper.find('Link').at(0).props()).toHaveProperty('href', data[0].primaryTag.link);
  });

  it('should render correctly miniBio', () => {
    const wrapper = shallow(<ProfileCard {...data[0]} />);
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('ProfileCard__Description').html()).toContain(data[0].miniBio);
  });

  it('should render description when not have miniBio', () => {
    const wrapper = shallow(<ProfileCard {...data[0]} miniBio={null} />);
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('ProfileCard__RichDescription').dive().html()).toContain(data[0].description);
  });

  it('should render title', () => {
    const wrapper = shallow(<ProfileCard {...data[0]} />);
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('ProfileCard__Title').html()).toContain(data[0].title);
  });
  it('should not render title if it is null', () => {
    const wrapper = shallow(<ProfileCard {...data[0]} title={null} />);
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('ProfileCard__Title')).toHaveLength(0);
  });

  it('should render with isTalent options', () => {
    const wrapper = mount(<ProfileCard {...data[0]} isTalent variant="dark" />);
    expect(wrapper.find('BioDescription')).toHaveLength(1);
  });
});

describe('ProfileCard tracking', () => {
  it('should track clicks on the Profile Card', () => {
    const wrapper = shallow(
      <ProfileCard
        {...data[0]}
        widgetContext={{ type: 'test' }}
      />
    );
    Store.dispatch(setPageData({ data: { type: 'section' } }));
    const trackerSpy = jest.spyOn(WidgetTracker, 'track');
    wrapper.dive().find('ProfileCard__HoverLink').simulate('click');
    expect(trackerSpy).toHaveBeenLastCalledWith(
      expect.any(Function),
      {
        contentTitle: data[0].title,
        target: 'content',
        widgetContext: { type: 'test' },
        contentUid: data[0].uid,
      }
    );
  });
});
