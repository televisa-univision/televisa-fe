import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import features from '@univision/fe-commons/dist/config/features';

import TelevisaButtons from '.';

describe('UniNow test', () => {
  beforeEach(() => {
    features.widgets.isVixEnabled = () => true;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const element = <TelevisaButtons />;
    ReactDOM.render(element, div);
  });
  it('should render shop, uninow and prendetv buttons', () => {
    const wrapper = shallow(<TelevisaButtons />);
    expect(wrapper.find('ButtonTelevisa')).toHaveLength(2);
    expect(wrapper.find('ButtonPrendeTv')).toHaveLength(1);
  });
});
