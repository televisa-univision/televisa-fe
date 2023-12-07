import React from 'react';
import { shallow } from 'enzyme';

import { LANDSCAPE } from '@univision/fe-commons/dist/constants/cardTypes';

import LoadingCard from '.';

describe('LoadingCard', () => {
  it('should render the LoadingCard', () => {
    const wrapper = shallow(<LoadingCard type={LANDSCAPE} />);
    expect(wrapper.find('div')).toBeDefined();
  });
  it('should render the loading spinner', () => {
    const wrapper = shallow(<LoadingCard type={LANDSCAPE} showSpinner />);
    expect(wrapper.find('LoadingCard__StyledLoading')).toHaveLength(1);
  });
});
