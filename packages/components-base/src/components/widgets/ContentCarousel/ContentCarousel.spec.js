import React from 'react';
import { mount, shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import mockPageApiData from './__mocks__/mockPageApiData.json';

import ContentCarousel from '.';

const content = mockPageApiData.data.widgets[28].contents;

/** @test {ContentCarousel} */
describe('ContentCarousel ', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ContentCarousel content={content} settings={{}} />, div);
  });

  it('returns null if no content available', () => {
    const wrapper = shallow(<ContentCarousel content={[]} />);
    expect(wrapper.getElement()).toBe(null);
  });

  it('returns null if content prop is not an array', () => {
    const wrapper = shallow(<ContentCarousel content={{}} />);
    expect(wrapper.getElement()).toBe(null);
  });

  it('hides heading if not available', () => {
    const wrapper = mount(<ContentCarousel content={content} settings={{ title: null }} />);
    expect(wrapper.find('TopicBar')).toHaveLength(0);
    expect(wrapper.find('.noTitle')).toHaveLength(1);
  });

  it('shows heading if available', () => {
    const wrapper = mount(<ContentCarousel content={content} settings={{ title: 'title' }} />);
    expect(wrapper.find('TopicBar').prop('settings')).toEqual({ title: 'title' });
    expect(wrapper.find('TopicBar')).toHaveLength(1);
    expect(wrapper.find('.noTitle')).toHaveLength(0);
  });
});
