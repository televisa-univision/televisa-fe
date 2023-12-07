import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import SocialNetworkLink from '.';

describe('SocialNetworkLink', () => {
  const network = { name: 'instagram', url: 'followus.com' };

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SocialNetworkLink {...network} />, div);
  });

  it('should call onClick handler', () => {
    const clickHandlerSpy = jest.fn();
    const wrapper = shallow(<SocialNetworkLink {...network} onClick={clickHandlerSpy} />);

    wrapper.simulate('click');

    expect(clickHandlerSpy).toHaveBeenCalled();
    expect(clickHandlerSpy).toHaveBeenCalledTimes(1);
  });
});
