import React from 'react';
import { mount } from 'enzyme';

import PrintComponent from './PrintComponent';

const user = {
  firstName: 'User',
  lastName: 'Test',
  email: 'foo@gmail.com',
  phone: '867274676',
  resumeFileName: 'resume.pdf',
};

describe('Quick Apply component', () => {
  it('should render PrintComponent', () => {
    const wrapper = mount(
      <PrintComponent {...user} />
    );

    expect(wrapper.find('Print')).toBeDefined();
    expect(wrapper.find('PrintComponent__TextPrint').at(0).text()).toBe(user.firstName);
    expect(wrapper.find('PrintComponent__TextPrint').at(1).text()).toBe(user.lastName);
    expect(wrapper.find('PrintComponent__TextPrint').at(2).text()).toBe(user.email);
    expect(wrapper.find('PrintComponent__TextPrint').at(3).text()).toBe(user.phone);
    expect(wrapper.find('PrintComponent__TextPrint').at(4).text()).toBe(user.resumeFileName);
  });

  it('should render PrintComponent without resume', () => {
    const userWithNoResume = { ...user };
    delete userWithNoResume.resumeFileName;
    const wrapper = mount(
      <PrintComponent {...userWithNoResume} />
    );

    expect(wrapper.find('Print')).toBeDefined();
    expect(wrapper.find('PrintComponent__TextPrint').at(0).text()).toBe(user.firstName);
    expect(wrapper.find('PrintComponent__TextPrint').at(1).text()).toBe(user.lastName);
    expect(wrapper.find('PrintComponent__TextPrint').at(2).text()).toBe(user.email);
    expect(wrapper.find('PrintComponent__TextPrint').at(3).text()).toBe(user.phone);
    expect(wrapper.find('PrintComponent__TextPrint')).toHaveLength(4);
  });
});
