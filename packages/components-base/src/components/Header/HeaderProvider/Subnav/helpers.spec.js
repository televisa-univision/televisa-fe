import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import { getLinks, trackSubnavClick } from './helpers';

const link = {
  name: 'The link',
  link: 'link',
};

describe('HeaderProvider:Subnav:helpers', () => {
  describe('getLinks()', () => {
    it('should return correct object', () => {
      const links = [link, link, link];
      const subNavLinks = getLinks(links);
      expect(subNavLinks.hidden).toEqual([]);
      expect(subNavLinks.visible).toHaveLength(3);
    });

    it('should return hidden links and visible link if its links get over the max width', () => {
      Store.dispatch(setPageData({
        device: 'desktop',
      }));
      const links = Array(12).fill(link);
      const subNavLinks = getLinks(links, 1024);
      expect(subNavLinks.hidden).toHaveLength(1);
      expect(subNavLinks.visible).toHaveLength(11);
      // Should have the same result if one of the links is empty
      const subNavLinks2 = getLinks([...links, {}], 1024);
      expect(subNavLinks2.hidden).toHaveLength(1);
      expect(subNavLinks2.visible).toHaveLength(11);
    });
  });

  describe('trackSubnavClick()', () => {
    it('should track subnav click with correct event and event action', () => {
      const menuOptionName = 'noticias';
      const trackSpy = jest.spyOn(NavigationTracker, 'track');

      trackSubnavClick(menuOptionName);

      expect(trackSpy).toHaveBeenCalledWith(NavigationTracker.events.click, {
        eventAction: 'subnav-noticias',
      });
      expect(trackSpy).toHaveBeenCalledTimes(1);
      trackSpy.mockRestore();
    });
  });
});
