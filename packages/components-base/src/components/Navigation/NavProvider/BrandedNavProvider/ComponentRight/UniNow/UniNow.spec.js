import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import features from '@univision/fe-commons/dist/config/features';

import UniNow from '.';

describe('UniNow test', () => {
  beforeEach(() => {
    jest.spyOn(features.header, 'buttonUniNow').mockReturnValueOnce('enVivoTvIcon');
    features.widgets.isVixEnabled = () => true;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render without crashing', () => {
    jest.spyOn(features.widgets, 'isVixEnabled').mockReturnValue(false);
    const div = document.createElement('div');
    const element = <UniNow />;
    ReactDOM.render(element, div);
  });
  it('should render shop, uninow and prendetv buttons', () => {
    const wrapper = shallow(<UniNow />);
    expect(wrapper.find('ButtonShop')).toHaveLength(1);
    expect(wrapper.find('ButtonUniNow')).toHaveLength(1);
    expect(wrapper.find('ButtonPrendeTv')).toHaveLength(1);
  });
});
