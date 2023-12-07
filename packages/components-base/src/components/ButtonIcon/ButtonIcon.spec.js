import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import ButtonIcon from '.';

/** @test {ButtonIcon} */
describe('ButtonIcon ', () => {
  const ButtonWithIcon = (
    <ButtonIcon
      icon="play"
      type="video"
      url="http://univision.com"
    />
  );

  it('should render the component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ButtonIcon />, div);
  });

  it('should render the component with an icon', () => {
    const wrapper = shallow(ButtonWithIcon);
    expect(wrapper.find('Icon').length).toBe(1);
  });
});
