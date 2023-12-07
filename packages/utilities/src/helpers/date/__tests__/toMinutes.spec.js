import toMinutes from '../toMinutes';

describe('secondsToMinutes', () => {
  it('should converts seconds as expected', () => {
    expect(toMinutes(60)).toEqual('1:00');
    expect(toMinutes(121)).toEqual('2:01');
  });

  it('should convert defaults to 0 seconds', () => {
    expect(toMinutes()).toEqual('0:00');
  });

  it('should convert to 0 seconds from bad value', () => {
    expect(toMinutes(null)).toEqual('0:00');
  });
});
