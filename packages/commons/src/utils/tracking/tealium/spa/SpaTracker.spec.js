import gtmManager from '../../googleTagManager/gtmManager';
import SpaTracker from './SpaTracker';
import * as trackingHelpers from '../../trackingHelpers';

describe('SpaTracker', () => {
  const dataLayer = (0, gtmManager.getDataLayer)();
  let isPersonalizedContentSpy;

  beforeEach(() => {
    isPersonalizedContentSpy = jest.spyOn(trackingHelpers, 'isPersonalizedContent').mockReturnValue(false);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('tracks "pageView" event when the type is a section', () => {
    isPersonalizedContentSpy.mockReturnValue(true);
    SpaTracker.constructor.pageView({ type: 'section' });
    expect(dataLayer[0].event).toBe('view_section');
    expect(dataLayer[0].personalization_view).toBe('true');
    expect(dataLayer[1].event).toBe('gtm.js');
  });

  it('tracks "pageView" event when the type is a action', () => {
    SpaTracker.constructor.pageView({ type: 'article' });
    expect(dataLayer[0].event).toBe('view_article');
    expect(dataLayer[1].event).toBe('gtm.js');
  });

  it('tracks "pageView" event when the type is a slideshow', () => {
    SpaTracker.constructor.pageView({ type: 'slideshow' });
    expect(dataLayer[0].event).toBe('view_slideshow');
    expect(dataLayer[1].event).toBe('gtm.js');
  });

  it('tracks "pageView" event when the type is a video', () => {
    SpaTracker.constructor.pageView({ type: 'video' });
    expect(dataLayer[0].event).toBe('view_video');
    expect(dataLayer[1].event).toBe('gtm.js');
  });

  it('tracks "pageView" event when the type is a list', () => {
    SpaTracker.constructor.pageView({ type: 'list' });
    expect(dataLayer[0].event).toBe('view_list');
    expect(dataLayer[1].event).toBe('gtm.js');
  });

  it('tracks "pageView" event when the type is a tag', () => {
    SpaTracker.constructor.pageView({ type: 'tag' });
    expect(dataLayer[0].event).toBe('view_screen');
    expect(dataLayer[1].event).toBe('gtm.js');
  });
});
