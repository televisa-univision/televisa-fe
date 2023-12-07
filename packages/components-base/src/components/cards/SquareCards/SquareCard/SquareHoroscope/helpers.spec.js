import getSignDate from './helpers';

describe('getSignDate test', () => {
  it('should return the right text for the provided sign', () => {
    const result = getSignDate('aries');

    expect(result).toEqual('MAR 20/21 – ABR 19/20');
  });

  it('should return empty string when none sign was provided', () => {
    const result = getSignDate();

    expect(result).toEqual('');
  });
});
