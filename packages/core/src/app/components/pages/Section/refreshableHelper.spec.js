import { getPageUrl, isTudnSite } from '@univision/fe-commons/dist/store/storeHelpers';
import isRefreshable from './refreshableHelper';

jest.mock('@univision/fe-commons/dist/store/storeHelpers', () => ({
  getPageUrl: jest.fn(() => '/'),
  isTudnSite: jest.fn(() => false),
}));
describe('isRefreshable', () => {
  it('shoudl return false by default', () => {
    getPageUrl.mockReturnValueOnce(null);
    expect(isRefreshable()).toBeFalsy();
  });
  it('shoudl return false if not on tudn site', () => {
    isTudnSite.mockReturnValueOnce(false);
    expect(isRefreshable()).toBeFalsy();
  });
  it('shoudl return true page url is mapped', () => {
    getPageUrl.mockReturnValueOnce('/');
    isTudnSite.mockReturnValueOnce(true);
    expect(isRefreshable()).toBeTruthy();
  });
});
