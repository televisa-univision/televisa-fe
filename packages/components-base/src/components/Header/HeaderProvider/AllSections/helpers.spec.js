import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import * as helpers from './helpers';

describe('HeaderProvider:helpers', () => {
  describe('sectionWithPath()', () => {
    const parentSection = {
      name: 'parent section',
      uri: 'parent.com',
    };
    const childSection = {
      name: 'child section',
      uri: 'parent.com/child',
    };
    const grandchildSection = {
      name: 'grandchild section',
      uri: 'parent.com/child/grandchild',
    };

    it('should add the name of the parent to the child path when parent has not path', () => {
      const childWithPath = helpers.sectionWithPath(childSection, parentSection);
      expect(childWithPath).toEqual({
        path: [parentSection.name, childSection.name],
        ...childSection,
      });
    });

    it('should add the path of the parent to the child path', () => {
      const childWithPath = helpers.sectionWithPath(childSection, parentSection);
      const grandChildWithPath = helpers.sectionWithPath(grandchildSection, childWithPath);

      expect(grandChildWithPath).toEqual({
        path: [...childWithPath.path, grandchildSection.name],
        ...grandchildSection,
      });
    });
  });

  describe('trackHamburgerClick()', () => {
    it('should track click with correct event and event action', () => {
      const navPath = ['noticias', 'en miami', 'deportes'];
      const trackSpy = jest.spyOn(NavigationTracker, 'track');

      helpers.trackHamburgerClick(navPath);

      expect(trackSpy).toHaveBeenCalledWith(NavigationTracker.events.click, {
        eventAction: 'hamburger-noticias-en miami-deportes',
      });
      expect(trackSpy).toHaveBeenCalledTimes(1);
      trackSpy.mockRestore();
    });

    it('should default navPath argument to empty array', () => {
      const trackSpy = jest.spyOn(NavigationTracker, 'track');

      helpers.trackHamburgerClick();

      expect(trackSpy).toHaveBeenCalledWith(NavigationTracker.events.click, {
        eventAction: 'hamburger',
      });
      expect(trackSpy).toHaveBeenCalledTimes(1);
      trackSpy.mockRestore();
    });
  });
});
