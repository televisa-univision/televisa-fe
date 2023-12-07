import React from 'react';
import { shallow } from 'enzyme';

import StationContact from '.';

/** @test {StationContact} */
describe('StationContact', () => {
  it('renders the StationContact', () => {
    const wrapper = shallow(<StationContact onClose={jest.fn()} />);
    expect(wrapper.find('StationPopup'));
  });

  it('handles close', () => {
    const onClose = jest.fn();
    const wrapper = shallow(<StationContact onClose={onClose} />);
    wrapper.instance().handleClose();
    expect(onClose).toHaveBeenCalledWith('stationContact');
  });

  it('should return the social network url', () => {
    const wrapper = shallow(
      <StationContact
        onClose={jest.fn()}
        socialNetworks={[{ name: 'Facebook', url: 'https://facebook.com' }]}
      />
    );
    expect(wrapper.instance().getSocialNetworkLink('Facebook')).toEqual('https://facebook.com');
  });
});
