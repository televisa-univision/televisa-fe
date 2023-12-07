import React from 'react';
import { shallow } from 'enzyme';

import scoreCellsExtractor from '@univision/shared-components/dist/extractors/scoreCellsExtractor';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';

import data from '../__mocks__/schedule.json';
import ScoreCellList from '.';

const matches = scoreCellsExtractor(data).slice(0, 4).map((item, idx) => ({
  ...item,
  vixExternalLink: idx % 2 ? 'https://vix.com' : null,
}));

describe('ScoreCellList', () => {
  let trackerSpy;
  beforeEach(() => {
    trackerSpy = jest.spyOn(WidgetTracker, 'track')
      .mockImplementation(jest.fn());
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should render without crashing', () => {
    const wrapper = shallow(<ScoreCellList />);
    expect(wrapper.find('ScoreCellList__Wrapper')).toHaveLength(1);
  });
  it('should render provided matches', () => {
    const wrapper = shallow(<ScoreCellList matches={matches} />);
    expect(wrapper.find('ScoreCellList__Wrapper')).toHaveLength(1);
    expect(wrapper.find('ScoreCellList__StyledScoreCard')).toHaveLength(4);
  });
  it('should render vix external link when user location is MX', () => {
    const wrapper = shallow(<ScoreCellList matches={matches} userLocation="MX" />);
    expect(wrapper.find('ScoreCellList__Wrapper')).toHaveLength(1);
    expect(wrapper.find('ScoreCellList__StyledScoreCard')).toHaveLength(4);
  });
  it('should track score cell clicks', () => {
    const wrapper = shallow(<ScoreCellList matches={matches} />);
    wrapper.find('ScoreCellList__StyledLink').at(0).simulate('click');
    expect(trackerSpy).toHaveBeenCalled();
  });
  it('should track vix external link clicks', () => {
    const wrapper = shallow(<ScoreCellList matches={matches} userLocation="MX" />);
    wrapper.find('ScoreCellList__VixLinkStyled').at(0).simulate('click');
    expect(trackerSpy).toHaveBeenCalled();
  });
});
