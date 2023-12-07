import React from 'react';
import { shallow, mount } from 'enzyme';

import preMatchExtractor from '@univision/shared-components/dist/extractors/preMatchExtractor';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import data from '../../../../utils/mocks/prematch.json';
import PreGame from '.';

let props;
let incomplete;
beforeEach(() => {
  props = preMatchExtractor(data);
  incomplete = {
    infoCards: {
      official: {},
      site: {},
    },
    previousEncounters: [],
  };
});

describe('PreGame tests', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<PreGame {...props} />);
    expect(wrapper.find('div.pregame')).toHaveLength(1);
  });
  it('should render PreGameInfo component', () => {
    const wrapper = shallow(<PreGame {...props} />);
    expect(wrapper.find('PreGameInfo').length).toBe(1);
  });
  it('should render LatestMatches Component', () => {
    const wrapper = shallow(<PreGame {...props} />);
    expect(wrapper.find('LatestMatches').length).toBe(1);
  });
  it('should render PreGameInfo even if data is incomplete', () => {
    const wrapper = shallow(<PreGame {...incomplete} />);
    expect(wrapper.find('PreGameInfo').length).toBe(1);
  });
  it('should render latestMatches with "small" size', () => {
    Store.dispatch(setPageData({
      device: 'mobile',
    }));
    const wrapper = mount(<PreGame {...props} />);
    expect(wrapper.find('LatestMatches').at(0).props()).toHaveProperty('size', 'small');
  });
  it('should render latestMatches with "medium" size', () => {
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    const wrapper = mount(<PreGame {...props} />);
    expect(wrapper.find('LatestMatches').at(0).props()).toHaveProperty('size', 'medium');
  });
  it('should render latestMatches with one previous encounter and correct title', () => {
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    const oneMatch = [props.previousEncounters[0]];
    const props2 = {
      previousEncounters: oneMatch,
      infoCards: {
        official: {},
        site: {},
      },
    };
    const wrapper = mount(<PreGame {...props2} />);
    expect(wrapper.find('LatestMatches').at(0).props()).toHaveProperty('title', 'Último Enfrentamiento');
  });
});
