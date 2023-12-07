import React from 'react';
import { shallow } from 'enzyme';

import UforiaIcon from '.';
import Styles from './UforiaIcon.scss';

/** @test {UforiaIcon} */
describe('UforiaIcon', () => {
  it('renders the UforiaIcon', () => {
    const wrapper = shallow(<UforiaIcon name="close" onClick={jest.fn()} />);
    expect(wrapper.find(`div.${Styles.icon}`));
  });

  it('handles click', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<UforiaIcon name="close" onClick={onClick} />);
    wrapper.instance().handleClick({ stopPropagation: jest.fn() });
    expect(onClick).toHaveBeenCalled();
  });
});
