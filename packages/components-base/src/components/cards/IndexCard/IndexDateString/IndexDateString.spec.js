import React from 'react';
import { mount } from 'enzyme';

import IndexDateString from '.';

describe('IndexDateString', () => {
  it('should return publish date and update date in words', () => {
    const publishDate = new Date('Tue Dec 10 2020 16:11:55 GMT-0500');
    const updateDate = new Date();
    const wrapper = mount(<IndexDateString
      publishDate={publishDate.toISOString()}
      updateDate={updateDate.toISOString()}
      showUpdateDate
    />);
    expect(wrapper.find('div').at(1).text()).toBe('Pub. 10 Dic 2020 – 04:11 PM EST');
    expect(wrapper.find('div').at(2).text()).toBe('Act. hace menos de un minuto');
  });
  it('should only return publish date', () => {
    const today = new Date();
    const wrapper = mount(<IndexDateString
      publishDate={today.toISOString()}
      updateDate={null}
      showUpdateDate
    />);
    const expectedRegex = /menos\s+de\s+un\s+minuto$/;
    expect(expectedRegex.test(wrapper.find('time').text())).toBe(true);
  });
  it('should return publish and update date', () => {
    const publishDate = new Date('Tue Dec 10 2020 16:11:55 GMT-0500');
    const updateDate = new Date('Tue Dec 11 2020 16:11:55 GMT-0500');
    const wrapper = mount(<IndexDateString
      publishDate={publishDate.toISOString()}
      updateDate={updateDate.toISOString()}
      showUpdateDate
    />);
    expect(wrapper.find('div').at(1).text()).toBe('Pub. 10 Dic 2020 – 04:11 PM EST');
    expect(wrapper.find('div').at(2).text()).toBe('Act. 11 Dic 2020 – 04:11 PM EST');
  });
  it('should return publish and hide update date', () => {
    const publishDate = new Date('Tue Dec 10 2020 16:11:55 GMT-0500');
    const updateDate = new Date('Tue Dec 11 2020 16:11:55 GMT-0500');
    const wrapper = mount(<IndexDateString
      publishDate={publishDate.toISOString()}
      updateDate={updateDate.toISOString()}
      showUpdateDate={false}
    />);
    expect(wrapper.find('div').at(1).text()).toBe('10 Dic 2020 – 04:11 PM EST');
  });
  it('should return publish and hide update date 2', () => {
    const publishDate = new Date('Tue Dec 10 2020 16:11:55 GMT-0500');
    const updateDate = new Date();
    const wrapper = mount(<IndexDateString
      publishDate={publishDate.toISOString()}
      updateDate={updateDate.toISOString()}
      showUpdateDate={false}
    />);
    expect(wrapper.find('div').at(1).text()).toBe('10 Dic 2020 – 04:11 PM EST');
  });
  it('should return a null value by passing null parameters', () => {
    const wrapper = mount(<IndexDateString
      publishDate={null}
      updateDate={null}
    />);
    expect(wrapper.find('div').at(0).text()).toBe('');
  });
  it('should return a null value by passing null parameters and show update date', () => {
    const wrapper = mount(<IndexDateString
      publishDate={null}
      updateDate={null}
      showUpdateDate
    />);
    expect(wrapper.find('div').at(0).text()).toBe('');
  });
  it('should return a relative value', () => {
    const publishDate = new Date();
    publishDate.setHours(publishDate.getHours() - 2);
    const wrapper = mount(<IndexDateString publishDate={publishDate.toISOString()} />);
    expect(wrapper.find('time').text()).toBe('hace 2 horas');
  });
  it('should return an absolute value', () => {
    const publishDate = new Date();
    publishDate.setHours(publishDate.getHours() - 36);
    const wrapper = mount(<IndexDateString publishDate={publishDate.toISOString()} />);
    expect(wrapper.find('IndexDateString__Container')).toHaveLength(1);
  });
});
