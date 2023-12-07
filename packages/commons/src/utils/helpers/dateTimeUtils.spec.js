import {
  formatDate,
  formatDuration,
  getDurationString,
  getISOdate,
  getTimeRemaining,
  getTimeLeft,
  getFormattedDigit,
  secondsToMinutes,
  convertMilitaryTime,
  convertStandardTime,
  dayOfWeekTransform,
  monthTransform,
  localTimeFormat,
  nameDay,
  getTimeZone,
  shouldRenderBySchedule,
  getUTCDatetime,
  getMostRecentDate,
} from './dateTimeUtils';

/**
 * Static date objects for test cases
 * @type {date}
 */
const date = new Date('Mon Jan 2 2017 16:30:45 GMT-0500 (EST)');
const future = new Date('Mon Jan 3 2017 16:30:45 GMT-0500 (EST)');
const past = new Date('Mon Jan 1 2017 16:30:45 GMT-0500 (EST)');
/** @test {dateTimeUtils} */

const RealDate = Date;
/**
 * Function get Mock date for test cases
* @param {string} locale timeZone letters
* @param {string} defaultDate timeZone letters
* @returns {date} date
 */
function getMockdate(locale = '13:13:17 EST', defaultDate = 'Mon Nov 30 2019 13:13:17 EST') {
  global.Date = () => {
    const mockDate = new RealDate(defaultDate);
    mockDate.toLocaleTimeString = () => locale;
    mockDate.toLocaleString = () => defaultDate;
    return mockDate;
  };
  global.Date.prototype = RealDate.prototype;
  return global.Date;
}

afterAll(() => {
  jest.restoreAllMocks();
});

describe('formatDate function', () => {
  it('should return the correct formatted date in English', () => {
    // testing default value here
    expect(formatDate(date, 'en')).toBe('Jan 2, 2017 – 04:30 PM EST');
  });
  it('should return the correct formatted date in Spanish', () => {
    expect(formatDate(date)).toBe('2 Ene 2017 – 04:30 PM EST');
  });
  it('should handle invalid/ignored time zones', () => {
    expect(formatDate(date, 'es', 'Invalid time zone')).toBeDefined();
  });
});

describe('formatDate function', () => {
  it('should return object with time for days, hours, mins, sec, as 00 when dates is in the past', () => {
    // testing with default values here
    const timeLeft = getTimeLeft(past, date);
    expect(getTimeRemaining(timeLeft)).toEqual([
      { number: '00', title: 'Días' },
      { number: '00', title: 'Hrs' },
      { number: '00', title: 'Mins' },
      { number: '00', title: 'Segs' },
    ]);
  });
  it('should return the correct time for days, hours, mins, sec, when date is in the future', () => {
    // testing with default values here
    const timeLeft = getTimeLeft(future, date);
    expect(getTimeRemaining(timeLeft)).toEqual([
      { number: '01', title: 'Días' },
      { number: '00', title: 'Hrs' },
      { number: '00', title: 'Mins' },
      { number: '00', title: 'Segs' },
    ]);
  });
});

describe('getTimeleft function', () => {
  it('should return negative number in miliseconds when date is in the past', () => {
    // testing default value here
    expect(getTimeLeft(past, date)).toEqual(-86400000);
  });
  it('should return positive number in miliseconds when date is in the future', () => {
    // testing default value here
    expect(getTimeLeft(future, date)).toEqual(86400000);
  });
});

describe('getFormattedDigit function', () => {
  it('should return a two digit number as string', () => {
    // testing default value here
    const digit = 1;
    expect(getFormattedDigit(digit)).toBe('01');
  });
  it('should return a two digit number', () => {
    // testing default value here
    const digit = 10;
    expect(getFormattedDigit(digit)).toBe('10');
  });
});

describe('secondsToMinutes', () => {
  it('converts seconds as expected', () => {
    expect(secondsToMinutes(60)).toEqual('1:00');
    expect(secondsToMinutes(121)).toEqual('2:01');
  });

  it('defaults to 0 seconds', () => {
    expect(secondsToMinutes()).toEqual('0:00');
  });
});

describe('formatDuration', () => {
  it('should return a string from a number', () => {
    const duration = 300;
    const expectedResult = '5:00';
    expect(formatDuration(duration)).toEqual(expectedResult);
  });
  it('should return the same string if a string is passed', () => {
    const duration = '5:00';
    const expectedResult = '5:00';
    expect(formatDuration(duration)).toEqual(expectedResult);
  });
  it('should return null if unsupported type is passed', () => {
    const duration = {};
    const expectedResult = null;
    expect(formatDuration(duration)).toEqual(expectedResult);
  });
});

describe('getDurationString', () => {
  it('should return null if nothing is passed', () => {
    expect(getDurationString()).toEqual(null);
  });
  it('should return a string from a number', () => {
    const duration = 300;
    const expectedResult = '5:00';
    expect(getDurationString(duration)).toEqual(expectedResult);
  });
  it('should return same string if string is passed', () => {
    const duration = '5:00';
    const expectedResult = '5:00';
    expect(getDurationString(duration)).toEqual(expectedResult);
  });
  it('should return a string from an object with `duration` prop', () => {
    const duration = 300;
    const expectedResult = '5:00';
    const params = { duration };
    expect(getDurationString(params)).toEqual(expectedResult);
  });
  it('should return a string from an object with `durationString` prop', () => {
    const durationString = '5:00';
    const expectedResult = '5:00';
    const params = { durationString };
    expect(getDurationString(params)).toEqual(expectedResult);
  });
  it('should return null if not proper type', () => {
    const duration = true;
    const expectedResult = null;
    expect(getDurationString(duration)).toEqual(expectedResult);
  });
});

describe('convertMilitaryTime', () => {
  it('should return 12 hour time in pm given a 24 hour time', () => {
    expect(convertMilitaryTime('18:00:12')).toBe('06:00 pm');
  });
  it('should return 12 hour time in pm given a 24 hour time with double digits.', () => {
    expect(convertMilitaryTime('11:00:12')).toBe('11:00 am');
  });
  it('should return 12 hour time in am given a 24 hour time', () => {
    expect(convertMilitaryTime('6:00:12')).toBe('06:00 am');
  });
  it('should return 12 am', () => {
    expect(convertMilitaryTime('0:0')).toBe('00:00 am');
  });
  it('should return an empty string if time is not defined', () => {
    expect(convertMilitaryTime(null)).toBe('');
  });
  it('should return an empty string if time is not defined', () => {
    expect(convertMilitaryTime(':')).toBe('');
  });
});

describe('convertStandardTime', () => {
  it('should return 12 hour time in pm given a 24 hour time', () => {
    expect(convertStandardTime('6:00:12', 'PM')).toBe('18:00:12');
  });
  it('should return 12 hour time in pm given a 24 hour time with double digits.', () => {
    expect(convertStandardTime('11:00:12', 'AM')).toBe('11:00:12');
  });
  it('should return 12 hour time in am given a 24 hour time', () => {
    expect(convertStandardTime('1:00', 'PM')).toBe('13:00:00');
  });
  it('should return an empty string if time is not defined', () => {
    expect(convertStandardTime(null)).toBe('');
  });
  it('should return an empty string if time is bad defined as an error', () => {
    expect(convertStandardTime('99:77')).toBe('');
  });
});

describe('dayOfWeekTransform', () => {
  it('should return the correct translation for days in spanish', () => {
    expect(dayOfWeekTransform('monday')).toEqual({ day: 'Lunes', abbreviatedDay: 'Lun' });
    expect(dayOfWeekTransform('tuesday')).toEqual({ day: 'Martes', abbreviatedDay: 'Mar' });
    expect(dayOfWeekTransform('wedNeSday')).toEqual({ day: 'Miércoles', abbreviatedDay: 'Mié' });
    expect(dayOfWeekTransform('thursday')).toEqual({ day: 'Jueves', abbreviatedDay: 'Jue' });
    expect(dayOfWeekTransform('friday')).toEqual({ day: 'Viernes', abbreviatedDay: 'Vie' });
    expect(dayOfWeekTransform('saturday')).toEqual({ day: 'Sábado', abbreviatedDay: 'Sáb' });
    expect(dayOfWeekTransform('sunday')).toEqual({ day: 'Domingo', abbreviatedDay: 'Dom' });
  });
  it('should return an empty object if the days doesn\'t exist', () => {
    expect(dayOfWeekTransform('juevebes', 'en')).toEqual({});
  });
  it('should return null if the param is not a valid string', () => {
    expect(dayOfWeekTransform(1)).toBeNull();
  });
});

describe('monthTransform', () => {
  it('should return the correct translation for monts in spanish', () => {
    expect(monthTransform('january')).toEqual({ month: 'Enero', abbreviatedMonth: 'Ene' });
    expect(monthTransform('february')).toEqual({ month: 'Febrero', abbreviatedMonth: 'Feb' });
    expect(monthTransform('march')).toEqual({ month: 'Marzo', abbreviatedMonth: 'Mar' });
    expect(monthTransform('april')).toEqual({ month: 'Abril', abbreviatedMonth: 'Abr' });
    expect(monthTransform('may')).toEqual({ month: 'Mayo', abbreviatedMonth: 'May' });
    expect(monthTransform('june')).toEqual({ month: 'Junio', abbreviatedMonth: 'Jun' });
    expect(monthTransform('juLy')).toEqual({ month: 'Julio', abbreviatedMonth: 'Jul' });
    expect(monthTransform('AUGUST')).toEqual({ month: 'Agosto', abbreviatedMonth: 'Ago' });
    expect(monthTransform('september')).toEqual({ month: 'Septiembre', abbreviatedMonth: 'Sep' });
    expect(monthTransform('october')).toEqual({ month: 'Octubre', abbreviatedMonth: 'Oct' });
    expect(monthTransform('november')).toEqual({ month: 'Noviembre', abbreviatedMonth: 'Nov' });
    expect(monthTransform('december')).toEqual({ month: 'Diciembre', abbreviatedMonth: 'Dic' });
  });
  it('should return an empty object if the month doesn\'t exist', () => {
    expect(monthTransform('foo')).toEqual({});
  });
  it('should return null if the param is not a valid string', () => {
    expect(monthTransform(1)).toBeNull();
  });
});

describe('localTimeFormat', () => {
  it('should return the correct value in an specific time zone', () => {
    expect(localTimeFormat({
      date: '2019-12-14T09:00:00-04:00',
      timeZone: 'America/New_York',
    })).toEqual({
      day: '14',
      month: {
        abbreviatedMonth: 'Dic',
        month: 'Diciembre',
      },
      time: '08:00 am',
      timeUTC: 1576328400000,
      weekDay: {
        abbreviatedDay: 'Sáb',
        day: 'Sábado',
      },
      year: 2019,
    });
  });
  it('should return the correct value without military', () => {
    expect(localTimeFormat({
      date: '2019-12-14T14:00:00-04:00',
      timeZone: 'America/New_York',
    })).toEqual({
      day: '14',
      month: {
        abbreviatedMonth: 'Dic',
        month: 'Diciembre',
      },
      time: '01:00 pm',
      timeUTC: 1576346400000,
      weekDay: {
        abbreviatedDay: 'Sáb',
        day: 'Sábado',
      },
      year: 2019,
    });
  });
  it('should transform 00 to 12', () => {
    expect(localTimeFormat({
      date: '2019-12-14T01:00:00-04:00',
      timeZone: 'America/New_York',
    })).toEqual({
      day: '14',
      month: {
        abbreviatedMonth: 'Dic',
        month: 'Diciembre',
      },
      time: '12:00 am',
      timeUTC: 1576299600000,
      weekDay: {
        abbreviatedDay: 'Sáb',
        day: 'Sábado',
      },
      year: 2019,
    });
  });
  it('should not add an extra 0 to minutes when is a double digit', () => {
    expect(localTimeFormat({
      date: '2019-12-14T01:10:00-04:00',
      timeZone: 'America/New_York',
    })).toEqual({
      day: '14',
      month: {
        abbreviatedMonth: 'Dic',
        month: 'Diciembre',
      },
      time: '12:10 am',
      timeUTC: 1576300200000,
      weekDay: {
        abbreviatedDay: 'Sáb',
        day: 'Sábado',
      },
      year: 2019,
    });
  });
  it('should return the correct value with useOneDigitForHours is set', () => {
    expect(localTimeFormat({
      date: '2019-12-14T07:00:00-04:00',
      timeZone: 'America/New_York',
      useOneDigitForHours: true,
    })).toEqual({
      day: '14',
      month: {
        abbreviatedMonth: 'Dic',
        month: 'Diciembre',
      },
      time: '6:00 am',
      timeUTC: 1576321200000,
      weekDay: {
        abbreviatedDay: 'Sáb',
        day: 'Sábado',
      },
      year: 2019,
    });
  });
  it('should return null if the param is not a valid string', () => {
    expect(localTimeFormat({
      date: 123,
      timeZone: 'America/New_York',
    })).toBeNull();
  });
  it('should return null if the param is not a valid date', () => {
    expect(localTimeFormat({
      date: 'abc',
      timeZone: 'America/New_York',
    })).toBeNull();
  });
  it('should return null if the param is not a valid date', () => {
    const myDate = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    expect(localTimeFormat({ useMilitary: true }).time).toEqual(myDate.toLowerCase());
  });
  it('should set options as a valid object if undefined or null params is send', () => {
    const myDate = new Date();
    const day = myDate.toLocaleString('en-US', {
      day: 'numeric',
    });
    expect(localTimeFormat(undefined).day).toEqual(day);
  });
});

describe('nameDay', () => {
  it('should return the name of day for Tue Dec 10 2019 16:11:55 GMT-0500', () => {
    const day = new Date('Tue Dec 10 2019 16:11:55 GMT-0500');
    expect(nameDay(day)).toEqual('TUESDAY');
  });
  it('should return null when parameter isn`t Date', () => {
    expect(nameDay('Tue Dec 10 2019 16:11:55 GMT-0500')).toBe(null);
  });
});
describe('getTimeZone', () => {
  it('should return the name of day for Tue Dec 10 2019 16:11:55 GMT-0500', () => {
    global.Date = getMockdate('18:13:17 EST', 'Mon Nov 30 2019 18:13:17 EST');
    const currentDate = new Date();
    expect(getTimeZone(currentDate)).toEqual('EST');
  });
  it('should return null when parameter isn`t Date', () => {
    expect(getTimeZone('Tue Dec 10 2019 16:11:55 GMT-0500')).toBe(null);
  });
});

describe('shouldRenderBySchedule', () => {
  const schedules = [
    {
      pauseEvent: false,
      daysToGoLive: [
        'SATURDAY',
      ],
      startTime: '1:00:00',
      startMeridiem: 'AM',
      endTime: '11:59:59',
      endMeridiem: 'PM',
      timeZone: 'US/Eastern',
      startDate: 1574788039629,
      endDate: 1704992844342,
    },
  ];

  const schedules2 = [
    {
      pauseEvent: false,
      daysToGoLive: null,
      timeZone: 'US/Eastern',
      startDate: 1574788039629,
      endDate: 1704992844342,
    },
  ];

  const schedules3 = [
    {
      pauseEvent: false,
      daysToGoLive: [
        'SUNDAY',
      ],
      startTime: '7:59:59',
      startMeridiem: 'PM',
      endTime: '1:00:00',
      endMeridiem: 'AM',
      timeZone: 'US/Eastern',
      startDate: 1574788039629,
      endDate: 1704992844342,
    },
  ];

  const schedules4 = [
    {
      pauseEvent: false,
      daysToGoLive: [
        'SUNDAY',
      ],
      startTime: '',
      startMeridiem: 'PM',
      endTime: '',
      endMeridiem: 'AM',
      timeZone: 'US/Eastern',
      startDate: 1574788039629,
      endDate: 1704992844342,
    },
  ];

  it('should return false when shedules doesn´t exit', () => {
    global.Date = getMockdate();
    expect(shouldRenderBySchedule(null)).toBe(false);
  });
  it('should return false when the event is pause', () => {
    global.Date = getMockdate();
    const schedules1 = [{ pauseEvent: true }];
    expect(shouldRenderBySchedule(schedules1)).toBe(false);
  });
  it('should return active when the timeZone is active', () => {
    global.Date = getMockdate();
    expect(shouldRenderBySchedule(schedules)).toBe(true);
  });
  it('should return false when shedules doesn´t have daysToGoLive', () => {
    global.Date = getMockdate();
    expect(shouldRenderBySchedule(schedules2)).toBe(false);
  });
  it('should return false when the day isn`t available', () => {
    global.Date = getMockdate('13:13:17 EST', 'Nov 29 2019 13:13:17 EST');
    expect(shouldRenderBySchedule(schedules)).toBe(false);
  });
  it('should return false when the date isn`t between startTime and endTime', () => {
    global.Date = getMockdate('13:13:17 EST', 'Nov 20 2019 13:13:17 EST');
    expect(shouldRenderBySchedule(schedules)).toBe(false);
  });
  it('should return false when all conditions are active and startTime is greater than endTime', () => {
    global.Date = getMockdate('23:13:17 EST', 'Mon Nov 30 2019 23:13:17 EST');
    expect(shouldRenderBySchedule(schedules3)).toBe(false);
  });
  it('should return false when all conditions are active and the hour ins`t between the rank', () => {
    global.Date = getMockdate('18:13:17 EST', 'Mon Nov 30 2019 18:13:17 EST');
    expect(shouldRenderBySchedule(schedules3)).toBe(false);
  });
  it('should return true when all conditions are active and the hour ins`t between the rank', () => {
    global.Date = getMockdate('18:13:17 EST', 'Sun Nov 31 2019 18:13:17 EST');
    expect(shouldRenderBySchedule(schedules4)).toBe(true);
  });

  it('should add one day when the endTime is less than startTime', () => {
    global.Date = getMockdate();
    const schedules5 = [
      {
        pauseEvent: false,
        daysToGoLive: [
          'SATURDAY',
        ],
        startTime: '01:00:00',
        startMeridiem: 'PM',
        endTime: '11:00:00',
        endMeridiem: 'AM',
        timeZone: 'US/Eastern',
        startDate: 1574788039629,
        endDate: 1704992844342,
      },
    ];
    expect(typeof shouldRenderBySchedule(schedules5) === 'boolean').toBeTruthy();
  });

  it('should return false when the timeZone is inactive', () => {
    global.Date = getMockdate('13:13:17 CST');
    expect(shouldRenderBySchedule(schedules)).toBe(false);
  });
});

describe('getUTCDatetime', () => {
  it('should return null when parameter isn`t Date', () => {
    expect(getUTCDatetime({})).toBeNull();
  });
  it('should return the current UTC date', () => {
    const currentDate = '2020-03-05T05:00:00.000';
    global.Date = getMockdate('05:00:00.000', currentDate);
    const result = getUTCDatetime(new Date());
    expect(result.toLocaleString()).toEqual(currentDate);
  });
});

describe('getISOdate', () => {
  it('should return correct format', () => {
    expect(getISOdate('1:23:45')).toBe('PT1H23M45S');
  });
  it('should return correct format', () => {
    expect(getISOdate('1:23')).toBe('PT1M23S');
  });
  it('should return correct format', () => {
    expect(getISOdate('1')).toBe('PT1S');
  });
});

describe('getMostRecentDate', () => {
  it('should return the most recent date when curDate is gather', () => {
    const result = getMostRecentDate(future, past);
    expect(result).toEqual(future);
    expect(result).not.toEqual(past);
  });

  it('should return the most recent date when curDate is not gather', () => {
    const result = getMostRecentDate(past, future);
    expect(result).toEqual(future);
    expect(result).not.toEqual(past);
  });
});
