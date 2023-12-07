import React from 'react';
import { shallow } from 'enzyme';
import Comscore from './Comscore';

describe('Comscore', () => {
  const expected = {
    vars: {
      c2: '14222911',
    },
    extraUrlParams: {
      comscorekw: 'amp',
    },
  };

  it('should render the tracking for comscore', () => {
    expected.vars.c2 = '14222911';
    const wrapper = shallow(<Comscore />);
    // eslint-disable-next-line no-underscore-dangle
    const tracking = JSON.parse(wrapper.children().prop('dangerouslySetInnerHTML').__html);
    expect(tracking).toEqual(expected);
  });
});
