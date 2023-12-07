import React from 'react';
import { mount } from 'enzyme';

import AllSectionsWithProfile from '.';
import AllSections from './Base';

describe('AllSectionsWithProfile', () => {
  it('should render a AllSections', () => {
    const wrapper = mount(<AllSectionsWithProfile />);
    expect(wrapper.find(AllSections)).toHaveLength(1);
  });

  it('should render a AllSections with correct props', () => {
    const wrapper = mount(<AllSectionsWithProfile test />);
    expect(wrapper.find(AllSections)).toHaveLength(1);
    expect(wrapper.find(AllSections).props('test')).toBeTruthy();
  });
});
