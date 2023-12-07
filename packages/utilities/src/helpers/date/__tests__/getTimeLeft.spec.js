import getTimeLeft from '../getTimeLeft';

const now = new Date('Mon Jan 2 2017 16:30:45 GMT-0500 (EST)');
const future = new Date('Mon Jan 3 2017 16:30:45 GMT-0500 (EST)');
const past = new Date('Mon Jan 1 2017 16:30:45 GMT-0500 (EST)');

describe('getTimeleft helper', () => {
  it('should return negative number in miliseconds when date is in the past', () => {
    expect(getTimeLeft(past, now)).toEqual(-86400000);
  });

  it('should return positive number in miliseconds when date is in the future', () => {
    expect(getTimeLeft(future, now)).toEqual(86400000);
  });

  it('should return 0 if is not a valid date', () => {
    expect(getTimeLeft(null, now)).toEqual(0);
  });
});
