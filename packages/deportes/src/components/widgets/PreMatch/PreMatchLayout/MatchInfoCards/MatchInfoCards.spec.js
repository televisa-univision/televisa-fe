import React from 'react';
import { shallow } from 'enzyme';

import MatchInfoCards from '.';

let emptyProps;
let props;
beforeEach(() => {
  emptyProps = {};
  props = {
    infoCards: {
      official: {
        name: 'Erick Yair Miranda Galindo',
      },
      site: {
        name: 'Estadio Cuauhtémoc',
        capacity: '33,042'
      },
      tournament: {
        name: 'Mexican Primera (Apertura)', week: '8'
      },
      screen: {
        name: 'UDN', logo: 'https://neulionsmbnyc-a.akamaihd.net/u/univisionnow2/thumbs/channels/68_es.png'
      }
    }
  };
});

describe('MatchInfoCards tests', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<MatchInfoCards {...props} />);
    expect(wrapper.find('.container')).toHaveLength(1);
  });
  it('should renders fallback if props are empty', () => {
    const wrapper = shallow(<MatchInfoCards {...emptyProps} />);
    expect(wrapper.find('div.noInfo').length).toBe(1);
  });
});
