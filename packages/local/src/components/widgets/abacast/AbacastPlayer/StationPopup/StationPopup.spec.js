import React from 'react';
import { shallow } from 'enzyme';

import Styles from './StationPopup.scss';
import StationPopup, { StationPopupComponent } from '.';

/** @test {StationPopup} */
describe('StationPopup', () => {
  it('renders the StationPopup', () => {
    const wrapper = shallow(<StationPopupComponent title="Contact" onClose={jest.fn()} />);
    expect(wrapper.find(`div.${Styles.popup}`));
  });

  it('renders the StationPopup Overlay', () => {
    const wrapper = shallow(<StationPopup />);
    expect(wrapper.find(`div.${Styles.popupOverlay}`));
  });
});
