import formatDate from '../formatDate';

const date = new Date('2020-08-06T02:25:33-04:00');

/** @test {formatDate} */
describe('formatDate helper', () => {
  it('should return empty if is a invalid date instance', () => {
    expect(formatDate('date 2019')).toBe('');
  });

  it('should return the correct formatted date in English', () => {
    expect(formatDate(date, 'en')).toBe('Aug 6, 2020 – 02:25 AM EDT');
  });

  it('should return the correct formatted date in Spanish', () => {
    expect(formatDate(date)).toBe('6 Ago 2020 – 02:25 AM EDT');
  });

  it('should return the correct formatted date in Portuguese', () => {
    expect(formatDate(date, 'pt')).toBe('6 Ago 2020 – 02:25 AM EDT');
  });

  it('should handle invalid/ignored time zones', () => {
    /**
     * This test on a system with west coast time will mark the wrong day,
     * so we will just match the month and year provided. I know, date handling sucks but this
     * is what we currently have. It will be an edge case where someone provides the wrong TZ,
     * and this will be their punishment, an incorrect formatted date.
    */
    expect(formatDate(date, 'es', 'Invalid time zone')).toMatch(/Ago 2020/);
  });
});
