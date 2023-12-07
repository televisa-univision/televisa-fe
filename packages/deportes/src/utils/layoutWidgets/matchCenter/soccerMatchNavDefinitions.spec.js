import tudnCoverage from '@univision/fe-commons/dist/constants/tudnCoverage';
import * as categories from '@univision/fe-commons/dist/constants/pageCategories';

import soccerMatchNavDefinitions, { getSoccerMatchNavLinks } from './soccerMatchNavDefinitions';

const navItmes = {
  [soccerMatchNavDefinitions.LIVEGAME.type]: soccerMatchNavDefinitions.LIVEGAME,
  [soccerMatchNavDefinitions.PREMATCH.type]: soccerMatchNavDefinitions.PREMATCH,
  [soccerMatchNavDefinitions.SUMMARY.type]: soccerMatchNavDefinitions.SUMMARY,
  [soccerMatchNavDefinitions.STANDINGS.type]: soccerMatchNavDefinitions.STANDINGS,
};

describe('soccerMatchNavDefinitions test', () => {
  describe('getSoccerMatchNavLinks test', () => {
    it('should not return empty array if not hav valid nav items', () => {
      const links = getSoccerMatchNavLinks();

      expect(links).toEqual([]);
    });

    it('should return default coverage if not have a valid one', () => {
      const matchData = {
        coverage: null,
        pageCategory: categories.SOCCER_MATCH_MID,
      };
      const links = getSoccerMatchNavLinks(navItmes, matchData);

      expect(links).toEqual([
        soccerMatchNavDefinitions.STANDINGS,
      ]);
    });

    it('should return expected links by status game', () => {
      const matchDataPre = {
        coverage: tudnCoverage.PERFORMANCE,
        pageCategory: categories.SOCCER_MATCH_PRE,
      };
      const matchDataMid = {
        ...matchDataPre,
        pageCategory: categories.SOCCER_MATCH_MID,
      };
      const linksPre = getSoccerMatchNavLinks(navItmes, matchDataPre);
      const linksMid = getSoccerMatchNavLinks(navItmes, matchDataMid);

      expect(linksPre).toEqual([
        soccerMatchNavDefinitions.PREMATCH,
        soccerMatchNavDefinitions.STANDINGS,
      ]);
      expect(linksMid).toEqual([
        soccerMatchNavDefinitions.SUMMARY,
        soccerMatchNavDefinitions.STANDINGS,
      ]);
    });

    it('should return expected links when the game has livestream', () => {
      const matchDataPre = {
        coverage: tudnCoverage.CORE,
        pageCategory: categories.SOCCER_MATCH_PRE,
        hasLiveStream: true,
      };
      const matchDataMid = {
        ...matchDataPre,
        pageCategory: categories.SOCCER_MATCH_MID,
      };
      const linksPre = getSoccerMatchNavLinks(navItmes, matchDataPre);
      const linksMid = getSoccerMatchNavLinks(navItmes, matchDataMid);

      expect(linksPre).toEqual([
        soccerMatchNavDefinitions.STANDINGS,
      ]);
      expect(linksMid).toEqual([
        soccerMatchNavDefinitions.LIVEGAME,
        soccerMatchNavDefinitions.STANDINGS,
      ]);
    });

    it('should add livestream nav item if is liveStreamEnabled by defualt', () => {
      const navItemWithoutLiveNav = {
        [soccerMatchNavDefinitions.PREMATCH.type]: soccerMatchNavDefinitions.PREMATCH,
      };
      const matchDataPre = {
        coverage: tudnCoverage.CORE,
        pageCategory: categories.SOCCER_MATCH_PRE,
        hasLiveStream: true,
      };
      const matchDataMid = {
        ...matchDataPre,
        pageCategory: categories.SOCCER_MATCH_MID,
      };
      const linksPre = getSoccerMatchNavLinks(navItemWithoutLiveNav, matchDataPre);
      const linksMid = getSoccerMatchNavLinks(navItemWithoutLiveNav, matchDataMid);

      expect(linksPre).toEqual([]);
      expect(linksMid).toEqual([
        soccerMatchNavDefinitions.LIVEGAME,
      ]);
    });
  });
});
