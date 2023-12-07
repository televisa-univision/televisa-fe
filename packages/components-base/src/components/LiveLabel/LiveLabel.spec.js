import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import LiveLabel from '.';

const defaultProps = {
  icon: 'dot',
  type: 'liveblog',
};

/** @test {LiveLabel} */
describe('Live Label Spec', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(React.createElement(LiveLabel), div);
  });
  it('should render a "Liveblog" label', () => {
    const wrapper = shallow(<LiveLabel {...defaultProps} />);
    expect(wrapper.find('span').text()).toEqual('Liveblog');
    expect(wrapper.find('LiveIcon')).toHaveLength(1);
  });
  it('should render a "Env vivo" label', () => {
    const wrapper = shallow(<LiveLabel {...defaultProps} videoType="livestream" />);
    expect(wrapper.find('span').text()).toEqual('En vivo');
    expect(wrapper.find('LiveIcon')).toHaveLength(1);
  });
  it('should render a "Env vivo" label from leadType', () => {
    const wrapper = shallow(<LiveLabel {...defaultProps} type="article" leadType="livestream" />);
    expect(wrapper.find('span').text()).toEqual('En vivo');
    expect(wrapper.find('LiveIcon')).toHaveLength(1);
  });
  it('should render a key icon if `authRequired`', () => {
    const wrapper = shallow(<LiveLabel {...defaultProps} authRequired videoType="livestream" />);
    expect(wrapper.find('span').text()).toEqual('En vivo');
    expect(wrapper.find('Icon')).toHaveLength(1);
    expect(wrapper.find('LiveIcon')).toHaveLength(1);
  });
  it('should return null if requirements are not met', () => {
    const wrapper = shallow(<LiveLabel type="" videoType="" />);
    expect(wrapper.type()).toBeNull();
  });

  it('should add appropriate classnames from props', () => {
    const wrapper = shallow(<LiveLabel {...defaultProps} isCondensed hasGradient />);
    expect(wrapper.find('.uvs-font-c-regular')).toHaveLength(1);
    expect(wrapper.find('.hasGradient')).toHaveLength(1);
  });
});
