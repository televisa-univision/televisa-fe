import getWidgetFlavorTheme from './getWidgetFlavorTheme';
import prendeTv from '../../../themes/prendetv';
import { FLAVOR_PRENDE_TV } from '../../../constants/widgetFlavors';

describe('getWidgetFlavorTheme', () => {
  it('should return empty object by default', () => {
    expect(getWidgetFlavorTheme()).toEqual({});
  });
  it('should return prende tv theme', () => {
    const prendeTvTheme = prendeTv();
    expect(getWidgetFlavorTheme(FLAVOR_PRENDE_TV)).toEqual(prendeTvTheme);
  });
});
