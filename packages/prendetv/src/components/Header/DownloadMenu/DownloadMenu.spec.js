/**
 * @module PrendeTV DownloadMenu Specs
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import gtmManager from '@univision/fe-commons/dist/utils/tracking/googleTagManager/gtmManager';

import DownloadMenu from '.';

jest.mock('@univision/fe-commons/dist/utils/tracking/googleTagManager/gtmManager', () => ({
  ...jest.requireActual('@univision/fe-commons/dist/utils/tracking/googleTagManager/gtmManager'),
  triggerEvent: jest.fn(),
}));

jest.useFakeTimers();

let map = {};
document.addEventListener = jest.fn((event, cb) => {
  map[event] = cb;
});

/**
* @test {DownloadMenu}
*/
describe('DownloadMenu component', () => {
  afterEach(() => {
    map = {};
  });
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DownloadMenu />, div);
  });
  it('should render correctly on mobile', () => {
    const wrapper = mount(<DownloadMenu device="mobile" />);
    wrapper.find('DownloadMenu__DownloadButton').simulate('click');
    expect(wrapper.find('DownloadMenu__CloseButton')).toHaveLength(1);
  });
  it('should render correctly on desktop', () => {
    const wrapper = mount(<DownloadMenu device="desktop" />);
    wrapper.find('DownloadMenu__DownloadButton').simulate('click');
    expect(wrapper.find('DownloadMenu__CloseButton')).toHaveLength(0);
  });
  it('should correctly trigger click action on links', () => {
    const wrapper = mount(<DownloadMenu device="desktop" />);
    wrapper.find('DownloadMenu__DownloadButton').simulate('click');
    wrapper.update();
    wrapper.find('DownloadMenu__AppLink').first().simulate('click');
    wrapper.update();
    expect(gtmManager.triggerEvent).toBeCalledWith({
      event_label: 'iOS App Store Icon',
      event_action: 'content_click',
      event_name: 'section',
    });
  });
  it('should handle clicks outside components', () => {
    const wrapper = mount(<DownloadMenu device="desktop" />);
    wrapper.find('DownloadMenu__DownloadButton').simulate('click');
    act(() => {
      map.mousedown({
        target: document.body,
      });
    });
    wrapper.update();

    expect(wrapper.find('DownloadMenu__Background').first().prop('isVisible')).toBeFalsy();
  });
  it('should ignore clicks outside components on mobile', () => {
    const wrapper = mount(<DownloadMenu device="mobile" />);
    wrapper.find('DownloadMenu__DownloadButton').simulate('click');
    act(() => {
      map.mousedown({
        target: document.body,
      });
    });
    wrapper.update();

    expect(wrapper.find('DownloadMenu__Background').first().prop('isVisible')).toBeTruthy();
  });
  it('should avoid jumping when clicking the dropdown button', () => {
    const wrapper = mount(<DownloadMenu device="desktop" />);
    const downloadButton = wrapper.find('DownloadMenu__DownloadButton');
    downloadButton.simulate('click');
    act(() => {
      map.mousedown({
        target: downloadButton.getDOMNode(),
      });
    });
    wrapper.update();
    expect(wrapper.find('DownloadMenu__Background').first().prop('isVisible')).toBeTruthy();
  });
  it('should close the dropdown on mobile when the close icon is tapped', () => {
    const wrapper = mount(<DownloadMenu device="mobile" />);
    wrapper.find('DownloadMenu__DownloadButton').simulate('click');
    wrapper.find('DownloadMenu__CloseButton').simulate('click');
    wrapper.update();
    expect(wrapper.find('DownloadMenu__Background').first().prop('isVisible')).toBeFalsy();
  });
});
