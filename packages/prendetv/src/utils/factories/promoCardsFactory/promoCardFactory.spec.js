/**
 * @module Promo Card Factory unit tests
 */
import React from 'react';
import { shallow } from 'enzyme';
import preloadAll from 'jest-next-dynamic';

import * as promoCardTypes from '../../../constants/promoCardTypes';

import getPromoCardComponent from '.';
import showsMock from '../../../components/promoCards/Hero/__mocks__/heroMock';

/** @test {promoCardsFactory} */
describe('pageFactory test', () => {
  /**
   * @test {getPromoCardComponent}
   */
  describe('getPromoCardComponent', () => {
    beforeAll(async () => {
      await preloadAll();
    });

    it('should return undefined if data is empty', () => {
      const Component = getPromoCardComponent({});
      expect(Component).toBeUndefined();
    });

    it('should return Notify Press Email component', () => {
      const NotifyPressEmail = getPromoCardComponent({ type: promoCardTypes.NOTIFY_PRESS_EMAIL });
      const page = shallow(<NotifyPressEmail />);
      expect(page.find('NotifyPressEmail__Wrapper')).toHaveLength(1);
    });

    it('should return Hero component', () => {
      const Hero = getPromoCardComponent({ type: promoCardTypes.HERO_ART });
      const page = shallow(<Hero {...showsMock} />);
      expect(page.find('Hero__Wrapper')).toHaveLength(1);
    });

    it('should return Shows component', () => {
      const Shows = getPromoCardComponent({ type: promoCardTypes.PROMOTABLE_SHOWS });
      const page = shallow(<Shows headLine="test" contents={[]} />);
      expect(page.find('Shows__Wrapper')).toHaveLength(1);
    });

    it('should return Countdown component', () => {
      const Countdown = getPromoCardComponent({ type: promoCardTypes.COUNTDOWN });
      const page = shallow(<Countdown date="2019-07-06T20:00:54-04:00" />);

      expect(page.find('Countdown__Wrapper')).toHaveLength(1);
    });
  });
});
