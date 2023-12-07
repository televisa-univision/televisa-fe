import timeAgoStringsEs from 'react-timeago/lib/language-strings/es';
import timeAgoStringsEn from 'react-timeago/lib/language-strings/en';

import * as datetime from '.';

describe('roundUpEvery', () => {
  it('should round up the number', () => {
    expect(datetime.roundUpEvery(16, 15)).toBe(30);
    expect(datetime.roundUpEvery(31, 15)).toBe(45);
  });
});

describe('getSeconds', () => {
  it('should return the current seconds', () => {
    expect(typeof datetime.getSeconds()).toBe('number');
  });

  it('should return the current seconds using an interval', () => {
    expect(datetime.getSeconds(15) % 15).toBe(0);
  });
});

describe('getMinutes', () => {
  it('should return the current minutes', () => {
    expect(typeof datetime.getMinutes()).toBe('number');
  });

  it('should return the current minutes using an interval', () => {
    expect(datetime.getMinutes(15) % 15).toBe(0);
  });
});

describe('getHours', () => {
  it('should return the current hours', () => {
    expect(typeof datetime.getHours()).toBe('number');
  });

  it('should return the current hours using an interval', () => {
    expect(datetime.getHours(15) % 15).toBe(0);
  });
});

describe('getTimestamp', () => {
  it('should return the current timestamp', () => {
    expect(typeof datetime.getTimestamp()).toBe('number');
  });

  it('should return the current timestamp using an interval without milliseconds', async () => {
    const intervals = { hoursInterval: 10, minutesInterval: 10, secondsInterval: 30 };
    const firstRun = datetime.getTimestamp(intervals, false);
    // wait 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));
    const secondRun = datetime.getTimestamp(intervals, false);
    expect(new Date(firstRun).getUTCSeconds() % 30).toBe(0);
    expect(new Date(secondRun).getUTCSeconds() % 30).toBe(0);
    expect(new Date(firstRun).getUTCMilliseconds()).toBe(0);
    expect(new Date(secondRun).getUTCMilliseconds()).toBe(0);
  });

  it('should return the current timestamp using an interval including milliseconds', () => {
    const intervals = { hoursInterval: 10, minutesInterval: 10, secondsInterval: 10 };
    const firstRun = datetime.getTimestamp(intervals);
    expect(typeof firstRun).toBe('number');
  });
});

describe('liveblog helpers', () => {
  it('should return English by default', () => {
    expect(datetime.getTimeAgoStrings()).toEqual(timeAgoStringsEn);
  });
  it('should return English strings', () => {
    expect(datetime.getTimeAgoStrings('en')).toEqual(timeAgoStringsEn);
  });
  it('should return Spanish strings', () => {
    expect(datetime.getTimeAgoStrings('es')).toEqual(timeAgoStringsEs);
  });
  it('should return a formatter', () => {
    expect(typeof datetime.getTimeAgoFormatter('en')).toBe('function');
  });
});
