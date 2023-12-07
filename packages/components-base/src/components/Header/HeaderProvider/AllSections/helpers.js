import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';

/**
 * returns a section object with a property that includes the path to the link.
 * i.e. the parent's link name plus the section link name
 * example: [tv shows, shows, latin grammy].
 * @param {Object} section a section object
 * @param {Object} parentSection a section object
 * @returns {function} a function which sets expanded state of _name when called
 */
export const sectionWithPath = (section, parentSection) => {
  const parentPath = parentSection.path ? parentSection.path : [parentSection.name];

  return {
    path: [...parentPath, section.name],
    ...section,
  };
};

/**
 * tracks clicks on the section navigation hamburger menu.
 * @param {array} navPath the path of the navigation menu represented by
 * an array [tv shows, shows, latin grammy]
 * @param {string} contentId the current page's content id (uid)
 * @returns {void}
 */
export const trackHamburgerClick = (navPath = []) => {
  const initialEventAction = 'hamburger';
  const eventAction = navPath.reduce((formattedPath, section) => {
    return `${formattedPath}-${section.toLowerCase()}`;
  }, initialEventAction);
  const utagData = {
    eventAction,
  };

  NavigationTracker.track(NavigationTracker.events.click, utagData);
};
