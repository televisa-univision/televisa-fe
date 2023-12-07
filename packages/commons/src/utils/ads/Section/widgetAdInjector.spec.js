import { shouldInjectTopAd, getWidgetPosition } from './widgetAdInjector';
import { TUDN_SITE } from '../../../constants/sites';
import * as widgetTypes from '../../../constants/widgetTypes';

const widgets = [
  { type: 'DeportesCardSoccerMatchScorecells' },
  { type: 'b' },
  { type: widgetTypes.GRID_WIDGET },
];

const pageData = {
  device: 'mobile',
  site: TUDN_SITE,
  data: {
    widgets,
  },
};

const gridWidget = {
  settings: {
    uid: '00000174-0265-d08c-ab7c-627559ef0015',
  },
  type: widgetTypes.GRID_WIDGET,
  contents: ['a', 'b'],
};

const heroWidget = {
  id: 1,
  type: widgetTypes.HERO_WIDGET,
  contents: ['a', 'b'],
};

describe('shouldInjectTopAd', () => {
  it('should return false if widget position is 1', () => {
    expect(shouldInjectTopAd(pageData, 1, gridWidget)).toBeTruthy();
  });
  it('should return false if widget position is > 3', () => {
    expect(shouldInjectTopAd(pageData, 5, gridWidget)).toBeFalsy();
  });
  it('should return true if widget low position and there are not other widget that allow ad on top', () => {
    expect(shouldInjectTopAd(pageData, 3, gridWidget)).toBeTruthy();
    expect(shouldInjectTopAd(pageData, 2, gridWidget)).toBeTruthy();
  });
  it('should return false if widget position is 2 and there is another grids on top', () => {
    const pageData2 = {
      ...pageData,
      data: {
        widgets: [
          gridWidget,
          gridWidget,
        ],
      },
    };
    expect(shouldInjectTopAd(pageData2, 2, gridWidget)).toBeFalsy();
  });
  it('should return false if device is not mobile', () => {
    const pageData2 = {
      ...pageData,
      device: 'tablet',
    };
    expect(shouldInjectTopAd(pageData2, 1, gridWidget)).toBeFalsy();
  });
  it('should return true for hero on tudn', () => {
    expect(shouldInjectTopAd(pageData, 1, heroWidget)).toBeTruthy();
  });
  it('should return true even if position is not passed', () => {
    expect(shouldInjectTopAd(pageData, null, gridWidget)).toBeTruthy();
  });
  it('should return false if widgets array empty on univision', () => {
    const pageData3 = {
      device: 'mobile',
      site: 'univision',
      data: {
        widgets: [],
      },
    };
    expect(shouldInjectTopAd(pageData3, null, gridWidget)).toBeFalsy();
  });
  it('should return false by default', () => {
    const otherWidget = {
      type: 'testWidget',
    };
    expect(shouldInjectTopAd(pageData, 1, otherWidget)).toBeFalsy();
  });
  it('should return false by default', () => {
    const otherWidget = {
      type: 'testWidget',
    };
    expect(shouldInjectTopAd(pageData, 1, otherWidget)).toBeFalsy();
  });
});

describe('getWidgetPosition', () => {
  it('should return right widget position', () => {
    expect(getWidgetPosition([gridWidget], gridWidget)).toBe(1);
    expect(getWidgetPosition([], gridWidget)).toBe(-1);
    expect(getWidgetPosition([{}, {}], gridWidget)).toBe(-1);
    expect(getWidgetPosition([{}, gridWidget], gridWidget)).toBe(2);
  });
});
