import setCacheBuster from '../setCacheBuster';

const RealDate = Date;
const url = 'http://univision.com';
const urlWithParam = `${url}?param`;

/**
 * Function get Mock date for test cases
* @param {string} defaultDate timeZone letters
* @returns {date} date
 */
function getMockdate(defaultDate = '2019-04-07T10:21:30') {
  global.Date = () => {
    return new RealDate(defaultDate);
  };

  global.Date.prototype = RealDate.prototype;
  return global.Date;
}

/** @test {setCacheBuster} */
describe('setCacheBuster helper', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should return 101 as the cache buster', () => {
    global.Date = getMockdate();
    expect(setCacheBuster(url, 3)).toBe(`${url}?101`);
  });

  it('should return 100 as the cache buster', () => {
    global.Date = getMockdate('2019-04-07T10:00:30');
    expect(setCacheBuster(url)).toBe(`${url}?100`);
  });

  it('should return 100 as the cache buster and param', () => {
    global.Date = getMockdate('2019-04-07T10:00:30');
    expect(setCacheBuster(urlWithParam)).toBe(`${urlWithParam}&100`);
  });

  it('should return null if the url is not a valid string', () => {
    expect(setCacheBuster()).toBeNull();
  });
});
