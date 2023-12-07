import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import formatDate from '@univision/fe-utilities/helpers/date/formatDate';
import TimeLabel from '.';

let wrapper;

jest.mock('@univision/fe-utilities/helpers/date/formatDate', () => jest.fn(() => 'the date!'));

beforeAll(() => {
  wrapper = shallow(<TimeLabel className="blabblahblah" language="es" />);
});

/** @test {TimeLabel} */
describe('TimeLabel', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TimeLabel className="blabblahblah" language="es" />, div);
  });

  test('is a <time> element', () => {
    expect(wrapper.find('time')).toBeDefined();
  });

  test('renders the time in correct format', () => {
    expect(wrapper.text()).toBe(formatDate(new Date(), 'es'));
  });

  test('renders the className prop', () => {
    expect(wrapper.hasClass('blabblahblah')).toBeTruthy();
  });
});
