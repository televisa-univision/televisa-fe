import React from 'react';
import { shallow } from 'enzyme';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import GridLatestVideos from '.';

let props;
let wrapper;

beforeEach(() => {
  props = {
    content: [
      { type: 'video', title: 'test 1', parent: { title: 'Al punto' } },
      { type: 'video', title: 'test 2' },
      { type: 'video', title: 'test 3' },
      { type: 'video', title: 'test 4' },
    ],
    settings: {
      title: 'Capítulos: Al punto',
      type: 'allgridlatestvideos',
    },
  };

  wrapper = shallow(<GridLatestVideos {...props} />);
});

describe('Gird Latest Video', () => {
  it('should render as expected', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render content card', () => {
    expect(wrapper.find('.cardWrapper')).toHaveLength(4);
  });

  it('should render TopicBar', () => {
    expect(wrapper.find('TopicBar')).toHaveLength(1);
  });
});

describe('Gird with null content Video', () => {
  const wrapperNull = shallow(<GridLatestVideos />);
  it('should render as expected', () => {
    expect(wrapperNull).toHaveLength(1);
  });

  it('should trigger event on click', () => {
    WidgetTracker.track = jest.fn();
    const imgWrapper = wrapper.find('.imgWrapper');
    imgWrapper.simulate('click');
    expect(WidgetTracker.track).toBeCalled();
  });
});
