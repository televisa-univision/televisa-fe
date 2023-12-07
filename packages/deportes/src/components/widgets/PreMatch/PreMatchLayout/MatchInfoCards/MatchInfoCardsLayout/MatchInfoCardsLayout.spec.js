import React from 'react';
import { shallow } from 'enzyme';

import MatchInfoCardsLayout from '.';

let props;
let incompleteProps;
beforeEach(() => {
  incompleteProps = {
    official: {
      name: '',
    },
    site: {
      name: '',
      capacity: ''
    },
    tournament: {
      name: '', week: ''
    },
    screen: {
      name: '', logo: ''
    }
  };
  props = {
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
      name: 'Univision', logo: 'image.png'
    }
  };
});

describe('MatchInfoCardsLayout tests', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<MatchInfoCardsLayout {...props} eventId="943034" />);
    expect(wrapper.find('.container')).toHaveLength(1);
  });
  it('should render MatchInfoCard components even though info is not available', () => {
    const wrapper = shallow(<MatchInfoCardsLayout {...incompleteProps} eventId="943034" />);
    expect(wrapper.find('.info').length).toBe(4);
  });
});
