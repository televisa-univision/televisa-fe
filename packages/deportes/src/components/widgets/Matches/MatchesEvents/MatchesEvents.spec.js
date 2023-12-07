import React from 'react';
import { shallow, mount } from 'enzyme';

import * as helpers from '@univision/fe-commons/dist/utils/helpers';
import { themes } from '@univision/fe-commons/dist/utils/themes/themes.json';
import matchesExtractor from '@univision/shared-components/dist/extractors/matchesExtractor';
import { SOCCER_FUTBOL_LIVE } from '@univision/fe-commons/dist/constants/pageCategories';
import * as redux from 'react-redux';
import * as selectors from '@univision/fe-commons/dist/store/selectors/page-selectors';
import mockMatches from '../../../../utils/mocks/matches.json';
import eventSoccerLive from '../../../../utils/mocks/eventSoccerLive.json';
import MatchesEvents from '.';

let weekEvents = [];

/**
 * Create a new Matches widget
 * @param {Object} props - additional props for creation
 * @param {function} createType - the creation type (mount/shallow)
 * @access private
 * @returns {JSX}
 */
const makeMatchesEvents = (props = {}, createType = shallow) => {
  const element = (
    <MatchesEvents
      {...{
        weekEvents,
        matchHandler: jest.fn(),
        reminderHandler: jest.fn(),
        ...props,
      }}
    />
  );
  return createType(element);
};

describe('MatchesEvents tests', () => {
  beforeEach(() => {
    weekEvents = matchesExtractor(helpers.cloneDeep(mockMatches)).events;
    jest.spyOn(redux, 'useSelector').mockImplementation(fn => fn());
    jest.spyOn(selectors, 'userLocationSelector').mockReturnValue('US');
    jest.spyOn(selectors, 'pageCategorySelector').mockReturnValue(SOCCER_FUTBOL_LIVE);
  });

  it('should be rendered', () => {
    const wrapper = makeMatchesEvents();

    expect(wrapper).toHaveLength(8);
    expect(wrapper.find('ScoreCard')).toHaveLength(8);
  });

  it('should be rendered isWorldCupMVP', () => {
    const wrapper = makeMatchesEvents({ isWorldCupMVP: true });

    expect(wrapper).toHaveLength(8);
    expect(wrapper.find('ScoreCard')).toHaveLength(8);
  });

  it('should render correctly even if not have correct events data', () => {
    weekEvents.push(null);
    const wrapper = makeMatchesEvents();

    expect(wrapper).toHaveLength(9);
    expect(wrapper.find('ScoreCard')).toHaveLength(9);
  });

  it('should render error when "showError" is true', () => {
    const wrapper = makeMatchesEvents({
      showError: true,
    }, mount);

    expect(wrapper.find('ApiError')).toHaveLength(1);
    expect(wrapper.find('ApiError').text()).toEqual('Ha ocurrido un error. Por favor regrese más tarde.');
  });

  it('should render the loading if "showLoading" is true and theme defined', () => {
    const wrapper = makeMatchesEvents({
      showLoading: true,
      theme: themes.tudn,
    }, mount);

    expect(wrapper.find('Loading')).toHaveLength(1);
  });

  it('should render informative message when not have matches events', () => {
    const wrapper = makeMatchesEvents({
      weekEvents: [],
    });

    expect(wrapper.find('ApiError')).toHaveLength(1);
    expect(wrapper.find('ApiError').props()).toHaveProperty('message', 'No hay eventos disponibles.');
  });

  it('should set isReminderActive true if "remid" is valid array and have event id', () => {
    const wrapper = makeMatchesEvents({
      remind: [weekEvents[0].id],
    });
    const card = wrapper.find('ScoreCard').at(0);

    expect(card.props()).toHaveProperty('isReminderActive', true);
  });

  it('should render mobile size and format', () => {
    const wrapper = makeMatchesEvents({
      isMobile: true,
    });
    const card = wrapper.find('ScoreCard').at(0);
    const dateTime = wrapper.find('DateTime').at(0);

    expect(card.props()).toHaveProperty('size', 'small');
    expect(dateTime.props()).toHaveProperty('format', 'ddd, DD MMM YYYY');
  });

  it('should set tablet values', () => {
    const wrapper = makeMatchesEvents({
      isTablet: true,
    });
    const card = wrapper.find('ScoreCard').at(0);

    expect(card.props()).toHaveProperty('useTabletChannels', true);
  });

  it('should set desktop values', () => {
    const wrapper = makeMatchesEvents();
    const card = wrapper.find('ScoreCard').at(0);
    const dateTime = wrapper.find('DateTime').at(0);

    expect(card.props()).toHaveProperty('useTabletChannels', false);
    expect(card.props()).toHaveProperty('size', 'medium');
    expect(dateTime.props()).toHaveProperty('format', 'dddd, DD [de] MMMM [de] YYYY');
  });

  it('should set isTudn value', () => {
    const wrapper = makeMatchesEvents({
      isTudn: true,
    });
    const card = wrapper.find('ScoreCard').at(0);

    expect(card.props()).toHaveProperty('isTudn', true);
  });
  it('should render with soccer match content link', () => {
    weekEvents.push(eventSoccerLive);
    const wrapper = makeMatchesEvents();
    expect(wrapper).toHaveLength(9);
    expect(wrapper.find('ScoreCard')).toHaveLength(9);
  });
  it('should render with soccer match content link in MX with caliente market', () => {
    jest.spyOn(selectors, 'userLocationSelector').mockReturnValue('MX');
    weekEvents.push(eventSoccerLive);
    const wrapper = makeMatchesEvents();
    expect(wrapper).toHaveLength(9);
    expect(wrapper.find('ScoreCard')).toHaveLength(9);
  });
});
