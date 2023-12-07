import React from 'react';
import { shallow } from 'enzyme';

import WidgetPlaceholder from '.';

describe('WidgetPlaceholder', () => {
  it('should render empty div if content is empty', () => {
    const wrapper = shallow(<WidgetPlaceholder content={[]} />);
    expect(wrapper.children().length).toBe(0);
  });

  it('should not render TopicBar if there is not a title', () => {
    const wrapper = shallow(<WidgetPlaceholder content={[{}]} />);
    expect(wrapper.find('TopicBar').length).toBe(0);
  });

  it('should render if TopicBar if there is a title', () => {
    const wrapper = shallow(<WidgetPlaceholder
      content={[{}]}
      settings={{
        title: 'Title',
      }}
    />);
    expect(wrapper.find('TopicBar').length).toBe(1);
  });

  it('should render Tag when we have parent', () => {
    const wrapper = shallow(<WidgetPlaceholder
      content={[{
        parent: {
          title: 'test',
          uri: 'test',
        },
      }]}
      settings={{
        title: 'Title',
      }}
    />);
    expect(wrapper.find('Link').length).toBe(2);
  });
});
