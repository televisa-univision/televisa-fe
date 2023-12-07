import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import SoccerPersonStats from '.';

const props = {
  age: 35,
  dateOfBirth: '1985-07-13',
  height: 185,
  id: '33376',
  name: 'Guillermo Ochoa',
  nationality: 'Mexico',
  positionRegular: 'goalkeeper',
  team: {
    abbreviation: 'AME',
    id: '1292',
    logo: 'https://st1.uvnimg.com/3c/d1/8dcf3d914632a3b8a24d77ea2463/america-72x72.png',
    name: 'América',
    url: 'https://www.tudn.com/futbol/liga-mx/america',
  },
  uniformNumber: 13,
  weight: 78,
};

describe('Person Stats suite', () => {
  it('renders without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <SoccerPersonStats />,
      div
    );
  });
  it('should render as expected', () => {
    const wrapper = mount(<SoccerPersonStats {...props} />);
    expect(wrapper.find('SoccerPersonStats__Wrapper')).toHaveLength(1);
    expect(wrapper.find('SoccerPersonStats__StatWrapper')).toHaveLength(5);
    expect(wrapper.find('Team')).toHaveLength(1);
    expect(wrapper.find('SoccerPersonStats__Wrapper')).toHaveStyleRule('flex-direction', 'column');
    expect(wrapper.find('SoccerPersonStats__StatWrapper').first()).toHaveStyleRule('flex-direction', 'row');
    expect(wrapper.find('SoccerPersonStats__StatWrapper').first()).toHaveStyleRule('width', '100%');
  });
  it('should render with no club', () => {
    const wrapper = mount(<SoccerPersonStats {...props} team={null} />);
    expect(wrapper.find('SoccerPersonStats__Wrapper')).toHaveLength(1);
    expect(wrapper.find('SoccerPersonStats__StatWrapper')).toHaveLength(4);
    expect(wrapper.find('Team')).toHaveLength(0);
  });
  it('should render as expected with horizontal layout', () => {
    const wrapper = mount(<SoccerPersonStats {...props} layout="horizontal" />);
    expect(wrapper.find('SoccerPersonStats__Wrapper')).toHaveLength(1);
    expect(wrapper.find('SoccerPersonStats__StatWrapper')).toHaveLength(5);
    expect(wrapper.find('Team')).toHaveLength(1);
  });
  it('should render as expected with legaue logo', () => {
    const league = {
      logo: {
        renditions: {
          original: {
            href: 'image.png',
          },
        },
      },
    };
    const wrapper = mount(<SoccerPersonStats {...props} league={league} layout="horizontal" />);
    expect(wrapper.find('SoccerPersonStats__Wrapper')).toHaveLength(1);
    expect(wrapper.find('SoccerPersonStats__StatWrapper')).toHaveLength(5);
    expect(wrapper.find('SoccerPersonStats__LeagueStyled')).toHaveLength(1);
  });
});
