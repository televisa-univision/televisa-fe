import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import * as AdTypes from '../../../../utils/ads/ad-types';
import AdProxy from '.';

/** @test {AdProxy} */
describe('AdProxy ', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AdProxy type={AdTypes.TOP_AD} />, div);
  });

  it('should render with custom class', () => {
    const wrapper = shallow(<AdProxy type={AdTypes.TOP_AD} className="uvs-ad" />);

    expect(wrapper.find('.uvs-ad')).toHaveLength(1);
  });

  it('should not render if not have valid type', () => {
    const wrapper = shallow(<AdProxy />);

    expect(wrapper.html()).toBeNull();
  });
});
