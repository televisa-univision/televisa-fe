import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

import Caption from '.';

/** @test {Caption} */
describe('Caption ', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Caption content=" " />, div);
  });

  it('should add the vertical class', () => {
    const wrapper = shallow(<Caption content=" " type="slideshowVertical" />);
    expect(wrapper.find('.vertical').length).toBe(1);
  });

  it('renders a credit if available', () => {
    const wrapper = shallow(<Caption content="content" credit="hello" />);
    expect(wrapper.find('.credit').props().dangerouslySetInnerHTML.__html).toEqual(` ${localization.get('credit')}: hello`); /* eslint-disable-line no-underscore-dangle */
  });

  it('renders a title if available', () => {
    const wrapper = shallow(<Caption content="content" credit="hello" title="title" />);
    expect(wrapper.find('.title').text()).toEqual('title ');
  });
});
