import React from 'react';
import { shallow, mount } from 'enzyme';

import standingsExtractor from '@univision/shared-components/dist/extractors/standingsExtractor';
import Store from '@univision/fe-commons/dist/store/store';
import features from '@univision/fe-commons/dist/config/features';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import TabName from '@univision/shared-components/dist/components/v2/TabName';
import standing from '../../../../utils/mocks/standings.json';
import groupstandings from '../../../../utils/mocks/groupStandings.json';
import StandingsLayout from '.';

let standingsData;
let groupStandingsData;
features.deportes.isTudn = jest.fn(() => true);

describe('StandingsLayout tests', () => {
  beforeEach(() => {
    features.deportes.isTudn.mockReturnValue(true);
    standingsData = standingsExtractor(standing);
    groupStandingsData = standingsExtractor(groupstandings);
  });

  let emptyProps;
  beforeEach(() => {
    emptyProps = {};
  });
  it('renders as expected', () => {
    const wrapper = shallow(<StandingsLayout data={standingsData} />);
    expect(wrapper.find('.container')).toHaveLength(1);
  });
  it('renders as expected with Liga Mx apertura', () => {
    const wrapper = shallow(<StandingsLayout data={standingsData} leagueId="199" />);
    expect(wrapper.find('StandingsStatsBody')).toHaveLength(1);
  });
  it('renders as expected with Liga Mx clausura', () => {
    const wrapper = shallow(<StandingsLayout data={standingsData} leagueId="385" />);
    expect(wrapper.find('StandingsStatsBody')).toHaveLength(1);
  });
  it('renders as expected with group standings', () => {
    const wrapper = shallow(<StandingsLayout data={groupStandingsData} />);
    expect(wrapper.find('.container')).toHaveLength(1);
  });
  it('should render empty div if standingarray is empty', () => {
    const wrapper = shallow(<StandingsLayout data={emptyProps} />);
    expect(wrapper.find('div').length).toBe(1);
  });
  it('should render "Button" if show button is true', () => {
    const wrapper = shallow(<StandingsLayout data={standingsData} showButton />);
    expect(wrapper.find('Button').length).toBe(1);
  });
  it('should render "Button" if show button is true for isWorldCupMVP', () => {
    const toggle = jest.fn();
    const wrapper = mount(<StandingsLayout data={standingsData} showButton isWorldCupMVP />);
    wrapper.instance().toggleShowMore();
    expect(wrapper.state('showMore')).toEqual(true);
    wrapper.instance().toggleShowMore();
    expect(wrapper.state('showMore')).toEqual(false);
    wrapper.instance().toggleShowMore = toggle;
    wrapper.find('Button').props().onPress();
    expect(toggle).toHaveBeenCalled();
  });
  it('calls toggleShowMore when clicked', () => {
    const wrapper = shallow(<StandingsLayout data={standingsData} showButton />);
    wrapper.instance().toggleShowMore();
    expect(wrapper.state('showMore')).toEqual(true);
    wrapper.instance().toggleShowMore();
    expect(wrapper.state('showMore')).toEqual(false);
  });
  it('calls toggleShowMore when "Button" is clicked', () => {
    const toggle = jest.fn();
    const wrapper = shallow(<StandingsLayout data={standingsData} showButton />);
    wrapper.instance().toggleShowMore = toggle;
    wrapper.find('Button').props().onPress();
    expect(toggle).toHaveBeenCalled();
  });
  it('should render the right headline', () => {
    features.deportes.isTudn.mockReturnValue(false);
    // Case 1: wrong data
    const wrongData = {
      ...standingsData,
      league: {},
      sections: [
        {
          data: [{
            'wrong-pj': 5,
          }],
        },
      ],
    };
    const wrapper = shallow(<StandingsLayout data={wrongData} />);
    expect(wrapper.find('TabName').prop('content')).toBe('');

    // Case 2: wrong pj the use league.week
    const wrongData1 = {
      ...standingsData,
      league: {
        week: 3,
      },
      sections: [
        {
          data: [{
            'wrong-pj': 5,
          }],
        },
      ],
    };
    const wrapper1 = shallow(<StandingsLayout data={wrongData1} leagueName="Liga MX" showButton />);
    expect(wrapper1.find('TabName').prop('content')).toBe('Liga MX - Jornada 3');

    // Case 2: right pj data
    const wrongData2 = {
      ...standingsData,
      league: {

      },
      sections: [
        {
          data: [{
            pj: 13,
          }],
        },
      ],
    };
    const wrapper2 = shallow(<StandingsLayout data={wrongData2} leagueName="Liga MX" showButton />);
    expect(wrapper2.find('TabName').prop('content')).toBe('Liga MX - Jornada 13');
  });
  it('renders as expected with hasRelegation', () => {
    const wrapper = shallow(<StandingsLayout data={standingsData} hasRelegation />);
    expect(wrapper.find('.container')).toHaveLength(1);
  });
  it('renders as expected for tudn theme', () => {
    Store.dispatch(setPageData({
      requestParams: { tudn: 'true' },
    }));

    const wrapper = shallow(<StandingsLayout data={standingsData} />);
    expect(wrapper.find(TabName)).toHaveLength(1);
  });
});
