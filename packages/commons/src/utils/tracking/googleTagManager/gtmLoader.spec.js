import gtmLoader from './gtmLoader';
import features from '../../../config/features';

jest.mock('../../../config/features', () => ({
  shows: {
    showsRedesign: jest.fn(),
  },
}));

describe('gtmLoader', () => {
  it('should load Google Tag Manager', () => {
    gtmLoader('id');
    expect(window.dataLayer).toBeDefined();
  });

  it('should override the data layer name', () => {
    gtmLoader('id', 'uvnData', 'test');
    expect(window.uvnData).toBeDefined();
  });

  it('should load shows when user is in url shows title with tab', () => {
    features.shows.showsRedesign.mockReturnValue(true);
    gtmLoader('id', 'uvnData', 'test');
    expect(window.uvnData).toBeDefined();
  });
});
