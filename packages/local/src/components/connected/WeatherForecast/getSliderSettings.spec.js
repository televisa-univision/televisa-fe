import getSliderSettings from './getSliderSettings';

/** @test {getSliderSettings} */
describe('getSliderSettings', () => {
  it('should return default values for mobile', () => {
    expect(getSliderSettings('mobile')).toEqual({
      width: 2000,
      height: 60,
      dotSize: 6,
      paddingGraphic: 30,
    });
  });
  it('should return values for xs and xxs', () => {
    expect(getSliderSettings('xxs')).toEqual({
      width: 3472,
      height: 60,
      dotSize: 8,
      paddingGraphic: 45,
      pagePosition: [0, -414, -860, -1300, -1742, -2180, -2624, -3050],
    });
  });
  it('should return values for sm', () => {
    expect(getSliderSettings('sm')).toEqual({
      width: 2888,
      height: 60,
      dotSize: 8,
      paddingGraphic: 45,
      pagePosition: [0, -722, -1444, -2166],
    });
  });
  it('should return values for md', () => {
    expect(getSliderSettings('md')).toEqual({
      width: 2934,
      height: 60,
      dotSize: 8,
      paddingGraphic: 45,
      pagePosition: [0, -978, -1956],
    });
  });
  it('should return values for lg and xl', () => {
    expect(getSliderSettings('lg')).toEqual({
      width: 2450,
      height: 60,
      dotSize: 8,
      paddingGraphic: 45,
      pagePosition: [0, -1200],
    });
  });
});
