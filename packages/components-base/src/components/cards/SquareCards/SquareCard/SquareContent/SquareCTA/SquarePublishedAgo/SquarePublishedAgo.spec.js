import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';

import {
  DARKER_GREY,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import * as is24HoursAgo from '@univision/fe-utilities/helpers/date/is24HoursAgo';

import SquarePublishedAgo from '.';

/**
 * Create a new SquarePublishedAgo
 * @param {Object} props - props
 * @param {function} createType - the creation type (mount/shallow)
 * @returns {JSX}
 */
const makePublishedAgo = (props = {}, createType = shallow) => {
  const element = (
    <SquarePublishedAgo {...props} />
  );
  return createType(element);
};

describe('SquareCard component tests', () => {
  beforeAll(() => {
    delete window.location;
    const location = new URL('https://www.univision.com');
    location.replace = jest.fn();
    window.location = location;
  });
  it('renders without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <SquarePublishedAgo />,
      div
    );
  });
  it('renders correctly with valid props for 24 hours past date', () => {
    const is24HoursAgoSpy = jest.spyOn(is24HoursAgo, 'default').mockImplementation(() => false);
    const wrapper = makePublishedAgo({ updateDate: '2020-05-02T13:56:34-04:00' }, mount);
    expect(is24HoursAgoSpy).toHaveBeenCalled();
    expect(wrapper.find('TimeAgo')).toHaveLength(1);
  });
  it('renders correctly with valid props for 24 hours past date', () => {
    const is24HoursAgoSpy = jest.spyOn(is24HoursAgo, 'default').mockImplementation(() => true);
    const wrapper = makePublishedAgo({ updateDate: '2020-05-02T13:56:34-04:00' }, mount);
    expect(is24HoursAgoSpy).toHaveBeenCalled();
    expect(wrapper.text()).toBe('Mayo 2 2020');
  });
  it('renders correctly for list card', () => {
    const wrapper = makePublishedAgo({ updateDate: '2020-05-02T13:56:34-04:00', isListCard: true }, mount);
    expect(wrapper.find('Icon').prop('fill')).toBe(DARKER_GREY);
  });
  it('renders correctly for list card with with is dark prop', () => {
    const wrapper = makePublishedAgo({ updateDate: '2020-05-02T13:56:34-04:00', isDark: true, isListCard: true }, mount);
    expect(wrapper.find('Icon').prop('fill')).toBe(WHITE);
  });
});
