import React from 'react';
import { shallow } from 'enzyme';
import features from '@univision/fe-commons/dist/config/features';
import ExternalScriptWrapper from '.';

jest.mock('@univision/fe-components-base/dist/components/widgets/GatsbyInjector', () => jest.fn());
features.deportes.isWorldCupMVP = jest.fn();
/** @test {ExternalScriptWrapper} */
describe('ExternalScriptWrapper', () => {
  it('should render as expected', () => {
    const wrapper = shallow(<ExternalScriptWrapper type="ranking" competition="199" season="2016" />);
    expect(wrapper.dive().find('.ranking').length).toBe(1);
  });
  it('should render squad widget', () => {
    const wrapper = shallow(<ExternalScriptWrapper type="squad" competition="5" season="2016" team="168" />);
    expect(wrapper.dive().find('.squad').length).toBe(1);
  });
  it('should render stats widget', () => {
    const wrapper = shallow(<ExternalScriptWrapper type="stats" competition="5" season="2016" team="168" />);
    expect(wrapper.dive().find('.stats').length).toBe(1);
  });
  it('should render player ranking widget', () => {
    const wrapper = shallow(<ExternalScriptWrapper type="player" competition="5" season="2016" team="168" />);
    expect(wrapper.dive().find('.player').length).toBe(1);
  });
  it('should render player stats widget', () => {
    const wrapper = shallow(<ExternalScriptWrapper competition="4" season="2017" team="632" type="playerStats" />);
    expect(wrapper.dive().find('.playerStats').length).toBe(1);
  });
  it('should render team compare widget', () => {
    const wrapper = shallow(<ExternalScriptWrapper competition="4" season="2013" teamCompare="632,832" type="teamCompare" />);
    expect(wrapper.dive().find('.teamCompare').length).toBe(1);
  });
  it('should render heatmap widget', () => {
    const wrapper = shallow(<ExternalScriptWrapper competition="4" season="2017" match="958022" type="heatmap" />);
    expect(wrapper.dive().find('.heatmap').length).toBe(1);
  });
  it('should render heatmap with team compare widget', () => {
    const wrapper = shallow(<ExternalScriptWrapper
      competition="4"
      season="2017"
      match="958022"
      teamCompare="632,832"
      type="compareHeatmap"
    />);
    expect(wrapper.dive().find('.compareHeatmap').length).toBe(1);
  });
  it('should render heatmap with team compare widget with isWorldCupMVP', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = shallow(<ExternalScriptWrapper
      competition="4"
      season="2017"
      match="958022"
      teamCompare="632,832"
      type="compareHeatmap"
    />);
    expect(wrapper.dive().find('.compareHeatmap').length).toBe(1);
  });
  it('should use settings values', () => {
    const settings = {
      competition: '123',
      season: '2007',
      team: '12',
      type: 'stats',
    };
    const wrapper = shallow(<ExternalScriptWrapper
      type="stats"
      competition="5"
      season="2016"
      team="168"
      settings={settings}
    />);
    expect(wrapper.dive().find('.stats').length).toBe(1);
  });
  it('should render olympics widget', () => {
    const wrapper = shallow(<ExternalScriptWrapper channel type="olympics" />);
    expect(wrapper.dive().find('.olympics').length).toBe(1);
  });
});
