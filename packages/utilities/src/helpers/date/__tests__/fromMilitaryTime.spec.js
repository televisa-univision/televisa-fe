import fromMilitaryTime from '../fromMilitaryTime';

/**
 * @test {fromMilitaryTime}
 */
describe('fromMilitaryTime test', () => {
  it('should return 12 hour time in pm given a 24 hour time', () => {
    expect(fromMilitaryTime('18:00:12')).toBe('06:00 pm');
  });

  it('should return 12 hour time in pm given a 24 hour time with double digits.', () => {
    expect(fromMilitaryTime('11:00:12')).toBe('11:00 am');
  });

  it('should return 12 hour time in am given a 24 hour time', () => {
    expect(fromMilitaryTime('6:00:12')).toBe('06:00 am');
  });

  it('should return 12 am', () => {
    expect(fromMilitaryTime('0:0')).toBe('12:00 am');
  });

  it('should return an empty string if time is not defined', () => {
    expect(fromMilitaryTime(null)).toBe('');
  });

  it('should return an empty string if time is not defined', () => {
    expect(fromMilitaryTime(':')).toBe('');
  });

  it('should return same time if toLocaleTimeString is not supported', () => {
    const { toLocaleTimeString } = global.Date.prototype;
    delete global.Date.prototype.toLocaleTimeString;

    expect(fromMilitaryTime('6:00')).toBe('6:00');
    global.Date.prototype.toLocaleTimeString = toLocaleTimeString;
  });
});
