import React from 'react';

import features from '@univision/fe-commons/dist/config/features';
import * as pageCategories from '@univision/fe-commons/dist/constants/pageCategories';
import * as getEventStatus from '@univision/fe-commons/dist/store/actions/deportes/eventsStatus-actions';
import { DEPORTES_CARD_PLAY_BY_PLAY } from '@univision/fe-commons/dist/constants/widgetTypes';
import addSoccerMatchWidgets from '@univision/fe-deportes/dist/utils/layoutWidgets/matchCenter/addSoccerMatchWidgets';
import { extractEventStatus } from '@univision/fe-deportes/dist/utils/helpers';

import { mapStateToProps, mapDispatchToProps, areStatePropsEqual } from '.';

const parseWidgets = [<div>Hello</div>, <div>Hello B</div>];
const commentaryEvents = [{
  key: 'a.2255382917',
  time: '90\'+4\'',
  period: '2',
  summary: 'Final del partido León 0, Pachuca 0.',
  title: 'game-end',
  iconName: 'timer',
  sort: '94',
}];
const state = {
  page: {
    pageCategory: pageCategories.SOCCER_MATCH_PRE,
    data: {
      eventStatus: 'pre-event',
      widgets: [
        {
          id: 1,
          type: DEPORTES_CARD_PLAY_BY_PLAY,
          extraData: {
            events: commentaryEvents,
          },
        },
      ],
    },
    userLocation: 'US',
  },
};

/** @test {SoccerMatchConnector} */
describe('SoccerMatchConnector test', () => {
  describe('mapStateToProps', () => {
    it('should return the right props', () => {
      const intermissionState = {
        ...state,
        page: {
          ...state.page,
          pageCategory: pageCategories.SOCCER_MATCH_MID,
          data: {
            ...state.data,
            eventStatus: 'intermission',
            soccerCompetitionSeason: {
              soccerCompetition: {
                league: {
                  id: 'l.fifaworldcup.com',
                },
              },
            },
          },
        },
      };

      expect(mapStateToProps(state, { parseWidgets })).toEqual({
        hideMatchCenterNav: false,
        language: 'es',
        pageCategory: pageCategories.SOCCER_MATCH_PRE,
        pageData: state.page.data,
        commentaryEvents,
        userLocation: 'US',
      });
      expect(mapStateToProps(intermissionState, { parseWidgets })).toEqual({
        hideMatchCenterNav: false,
        language: 'es',
        pageCategory: pageCategories.SOCCER_MATCH_MID,
        pageData: intermissionState.page.data,
        commentaryEvents: [],
        userLocation: 'US',
      });

      const cuepointsSpy = jest.spyOn(features.deportes, 'showCuepoints').mockImplementation(() => false);
      expect(mapStateToProps(null, { parseWidgets })).toEqual({
        hideMatchCenterNav: false,
        language: 'es',
        pageCategory: pageCategories.SOCCER_MATCH_PRE,
        pageData: {},
        commentaryEvents: [],
        userLocation: 'US',
      });
      cuepointsSpy.mockRestore();

      const hideMatchCenterNavSpy = jest.spyOn(features.deportes, 'hideMatchCenterNav')
        .mockImplementation(() => true);
      expect(mapStateToProps(null, { parseWidgets })).toEqual({
        hideMatchCenterNav: true,
        language: 'es',
        pageCategory: pageCategories.SOCCER_MATCH_PRE,
        pageData: {},
        commentaryEvents: [],
        userLocation: 'US',
      });
      hideMatchCenterNavSpy.mockRestore();
    });
  });

  describe('mapDispatchToProps', () => {
    it('should been called with a function argument', () => {
      const dispatchFn = jest.fn();
      const getEventStatusSpy = jest.spyOn(getEventStatus, 'default');

      mapDispatchToProps(dispatchFn).getStatus();
      expect(getEventStatusSpy).toHaveBeenCalledWith(addSoccerMatchWidgets, extractEventStatus);
    });
  });

  describe('areStatePropsEqual', () => {
    it('should return false if the pageCategory/match status changed', () => {
      const result = areStatePropsEqual(
        { pageCategory: pageCategories.SOCCER_MATCH_PRE },
        { pageCategory: pageCategories.SOCCER_MATCH_POST },
      );

      expect(result).toBe(false);
    });

    it('should return true if the pageCategory/match status is the same', () => {
      const result = areStatePropsEqual(
        { pageCategory: pageCategories.SOCCER_MATCH_PRE },
        { pageCategory: pageCategories.SOCCER_MATCH_PRE },
      );

      expect(result).toBe(true);
    });
  });
});
