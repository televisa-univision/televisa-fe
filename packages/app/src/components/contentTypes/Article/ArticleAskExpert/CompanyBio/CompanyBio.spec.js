import React from 'react';
import { shallow } from 'enzyme';

import CompanyBio from '.';
import props from './__mocks__/CompanyMock.json';

/** @test {CompanyBio} */
describe('Company Bio', () => {
  it('should render Company Bio', () => {
    const wrapper = shallow(<CompanyBio {...props} />);
    expect(wrapper.find('CompanyBio__CompanyBioWrapper')).toHaveLength(1);
    expect(wrapper.find('CompanyBio__Lead')).toHaveLength(1);
    expect(wrapper.find('CompanyBio__Header')).toHaveLength(1);
    expect(wrapper.find('CompanyBio__Image')).toHaveLength(1);
    expect(wrapper.find('CompanyBio__Info')).toHaveLength(1);
  });
});
