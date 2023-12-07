import React from 'react';
import { shallow } from 'enzyme';
import { exists } from '@univision/fe-commons/dist/utils/helpers';
import Image from '@univision/fe-components-base/dist/components/Image';
import Styles from './Team.scss';

import Team from '.';

jest.mock('@univision/fe-components-base/dist/components/Image', () => jest.fn());
jest.mock('@univision/fe-commons/dist/utils/helpers', () => ({
  hasKey: jest.fn(),
  exists: jest.fn()
}));
let props;
beforeEach(() => {
  props = {
    teams: [
      {
        alignment: 'none',
        name: {
          first: 'Real Madrid',
          full: 'Real Madrid',
          abbreviation: 'Real M',
          nickname: 'Real Madrid'
        },
        'team-key': '186'
      },
      {
        alignment: 'away',
        name: {
          first: 'Real Madrid',
          full: 'Real Madrid',
          abbreviation: 'Real M',
          nickname: 'Real Madrid'
        },
        'team-key': '186'
      }
    ],
  };
});

/** @test {Team} */
describe('Team ', () => {
  it('should render as expected', () => {
    const wrapper = shallow(<Team {...props.teams[0]} />);
    expect(wrapper.find(`div.${Styles.container}`).length).toBe(1);
  });
  it('should render the full team name', () => {
    const wrapper = shallow(<Team {...props.teams[0]} />);
    expect(wrapper.find(`span.${Styles.desktop}`).text()).toBe('');
    exists.mockReturnValueOnce(true);
    const wrapper2 = shallow(<Team {...props.teams[0]} />);
    expect(wrapper2.find(`span.${Styles.desktop}`).text()).toBe('Real Madrid');
  });
  it('should render the team abbreviation', () => {
    const wrapper = shallow(<Team {...props.teams[0]} />);
    expect(wrapper.find(`span.${Styles.mobile}`).text()).toBe('');
    exists.mockReturnValue(true);
    const wrapper2 = shallow(<Team {...props.teams[0]} />);
    expect(wrapper2.find(`span.${Styles.mobile}`).text()).toBe('Real M');
  });
  it('should render with away alignment', () => {
    exists.mockReturnValue(true);
    const wrapper = shallow(<Team {...props.teams[1]} />);
    expect(wrapper.find(`div.${Styles.away}`).length).toBe(3);
  });
  it('should render with vertical view', () => {
    exists.mockReturnValue(true);
    const wrapper = shallow(<Team {...props.teams[1]} view="vertical" />);
    expect(wrapper.find(`div.${Styles.vertical}`).length).toBe(3);
  });
  it('should render an Image', () => {
    const wrapper = shallow(<Team {...props.teams[1]} />);
    expect(wrapper.find(Image).length).toBe(1);
  });
  it('should render default as horizontal view', () => {
    const wrapper = shallow(<Team {...props.teams[1]} view="" />);
    expect(wrapper.find('div.horizontal').length).toBe(3);
  });
});
