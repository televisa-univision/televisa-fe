import { VERTICAL_SLIDESHOW } from '../../constants/slideshowTypes';
import {
  SECTION,
  VIDEO,
  SLIDESHOW,
  ARTICLE,
  LIVE_BLOG,
} from '../../constants/contentTypes';
import shows from '.';

describe('getShowThemeByContentType', () => {
  it('should return expected theme darkness based on content type', () => {
    expect(shows({ type: SECTION }).isDark).toBeTruthy();
    expect(shows({ type: VIDEO }).isDark).toBeTruthy();
    expect(shows({ type: SLIDESHOW }).isDark).toBeTruthy();
    expect(shows({ type: ARTICLE }).isDark).toBeFalsy();
    expect(shows({ type: LIVE_BLOG }).isDark).toBeFalsy();
    expect(shows({ type: SLIDESHOW, slideshowType: VERTICAL_SLIDESHOW }).isDark).toBeFalsy();
  });
});
