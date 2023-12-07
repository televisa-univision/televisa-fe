import getTimeRemaining from '../getTimeRemaining';

describe('getTimeRemaining helper', () => {
  it('should return array with time for days, hours, mins, sec, as 00 when dates is in the past', () => {
    const timeLeft = -86400000;
    expect(getTimeRemaining(timeLeft)).toEqual([
      { number: '00', title: 'Días' },
      { number: '00', title: 'Hrs' },
      { number: '00', title: 'Mins' },
      { number: '00', title: 'Segs' },
    ]);
  });

  it('should return the correct time for days, hours, mins, sec, when date is in the future', () => {
    const timeLeft = 86400000;
    expect(getTimeRemaining(timeLeft)).toEqual([
      { number: '01', title: 'Días' },
      { number: '00', title: 'Hrs' },
      { number: '00', title: 'Mins' },
      { number: '00', title: 'Segs' },
    ]);
  });
});
