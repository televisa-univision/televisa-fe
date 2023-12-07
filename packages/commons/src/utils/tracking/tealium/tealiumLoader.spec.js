import * as helpers from '../../helpers';
import loadTealium from './tealiumLoader';

describe('tealiumLoader', () => {
  it('should load SDK', () => {
    spyOn(helpers, 'getCurrentProtocol').and.returnValue('http:');
    loadTealium('test-site', 'test-account', 'test-env');
    /* eslint prefer-destructuring: ["error", {AssignmentExpression: {array: true}}] */
    const src = document.getElementsByTagName('script')[0].src;
    expect(src.endsWith('/test-site/test-account/test-env/utag.js')).toBe(true);
  });
});
