import React from 'react';
import { shallow } from 'enzyme';

import LotteryWebView from './LotteryWebView';

describe('LotteryWebView Widget', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<LotteryWebView market="Miami" />);
    expect(wrapper.find('Lottery')).toHaveLength(1);
  });

  it('should not render if a market prop is empty', () => {
    const wrapper = shallow(<LotteryWebView />);
    expect(wrapper.find('Lottery')).toHaveLength(0);
  });
});
