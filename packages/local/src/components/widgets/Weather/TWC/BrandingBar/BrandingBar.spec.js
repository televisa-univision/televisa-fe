import React from 'react';
import { shallow } from 'enzyme';

import BrandingBar from '.';

describe('BrandingBar', () => {
  it('should render the image for the branding', () => {
    const wrapper = shallow(<BrandingBar />);
    expect(wrapper.find('Image')).toHaveLength(1);
  });
});
