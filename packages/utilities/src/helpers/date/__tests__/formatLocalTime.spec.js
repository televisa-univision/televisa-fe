import formatLocalTime from '../formatLocalTime';

/**
 * @test {formatLocalTime}
 */
describe('formatLocalTime test', () => {
  it('should return the correct value in an specific time zone', () => {
    expect(formatLocalTime({
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
        isWeekend: true,
      },
    });
  });

  it('should return the correct value without military', () => {
    expect(formatLocalTime({
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
        isWeekend: true,
      },
    });
  });

  it('should transform 00 to 12', () => {
    expect(formatLocalTime({
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
        isWeekend: true,
      },
    });
  });

  it('should not add an extra 0 to minutes when is a double digit', () => {
    expect(formatLocalTime({
      date: '2019-12-13T01:10:00-04:00',
      timeZone: 'America/New_York',
    })).toEqual({
      day: '13',
      month: {
        abbreviatedMonth: 'Dic',
        month: 'Diciembre',
      },
      time: '12:10 am',
      timeUTC: 1576213800000,
      weekDay: {
        abbreviatedDay: 'Vie',
        day: 'Viernes',
        isWeekend: false,
      },
    });
  });

  it('should return the correct value with useOneDigitForHours is set', () => {
    expect(formatLocalTime({
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
        isWeekend: true,
      },
    });
  });

  it('should return null if the param is not a valid string', () => {
    expect(formatLocalTime({
      date: 123,
      timeZone: 'America/New_York',
    })).toBeNull();
  });

  it('should return null if the param is not a valid date', () => {
    expect(formatLocalTime({
      date: 'abc',
      timeZone: 'America/New_York',
    })).toBeNull();
  });

  it('should return a valid date with military time', () => {
    const myDate = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    expect(formatLocalTime({ useMilitary: true }).time).toEqual(myDate.toLowerCase());
  });

  it('should return a valid object if undefined or null params is send', () => {
    const myDate = new Date();
    const day = myDate.toLocaleString('en-US', {
      day: 'numeric',
    });

    expect(formatLocalTime(undefined).day).toEqual(day);
  });

  it('should return a valid object even with invalid timeZone', () => {
    const myDate = new Date();
    const day = myDate.toLocaleString('en-US', {
      day: 'numeric',
    });

    expect(formatLocalTime({ timeZone: null }).day).toEqual(day);
  });

  it('should return null if toLocaleTimeString is not supported', () => {
    const { toLocaleTimeString } = global.Date.prototype;
    delete global.Date.prototype.toLocaleTimeString;

    expect(formatLocalTime()).toBeNull();
    global.Date.prototype.toLocaleTimeString = toLocaleTimeString;
  });

  describe('transform day of week', () => {
    it('should return the correct translation for days in spanish', () => {
      const monday = { date: '2020/04/20' };
      const tuesday = { date: '2020/04/21' };
      const wednesday = { date: '2020/04/22' };
      const thursday = { date: '2020/04/23' };
      const friday = { date: '2020/04/24' };
      const saturday = { date: '2020/04/25' };
      const sunday = { date: '2020/04/26' };

      expect(formatLocalTime(monday).weekDay).toEqual(expect.objectContaining({ day: 'Lunes', abbreviatedDay: 'Lun' }));
      expect(formatLocalTime(tuesday).weekDay).toEqual(expect.objectContaining({ day: 'Martes', abbreviatedDay: 'Mar' }));
      expect(formatLocalTime(wednesday).weekDay).toEqual(expect.objectContaining({ day: 'Miércoles', abbreviatedDay: 'Mié' }));
      expect(formatLocalTime(thursday).weekDay).toEqual(expect.objectContaining({ day: 'Jueves', abbreviatedDay: 'Jue' }));
      expect(formatLocalTime(friday).weekDay).toEqual(expect.objectContaining({ day: 'Viernes', abbreviatedDay: 'Vie' }));
      expect(formatLocalTime(saturday).weekDay).toEqual(expect.objectContaining({ day: 'Sábado', abbreviatedDay: 'Sáb' }));
      expect(formatLocalTime(sunday).weekDay).toEqual(expect.objectContaining({ day: 'Domingo', abbreviatedDay: 'Dom' }));
    });
  });

  describe('transform month', () => {
    it('should return the correct translation for monts in spanish', () => {
      const january = { date: '2020/01/20' };
      const february = { date: '2020/02/21' };
      const march = { date: '2020/03/22' };
      const april = { date: '2020/04/23' };
      const may = { date: '2020/05/24' };
      const june = { date: '2020/06/25' };
      const july = { date: '2020/07/26' };
      const august = { date: '2020/08/26' };
      const september = { date: '2020/09/26' };
      const october = { date: '2020/10/26' };
      const november = { date: '2020/11/26' };
      const december = { date: '2020/12/26' };

      expect(formatLocalTime(january).month).toEqual(expect.objectContaining({ month: 'Enero', abbreviatedMonth: 'Ene' }));
      expect(formatLocalTime(february).month).toEqual(expect.objectContaining({ month: 'Febrero', abbreviatedMonth: 'Feb' }));
      expect(formatLocalTime(march).month).toEqual(expect.objectContaining({ month: 'Marzo', abbreviatedMonth: 'Mar' }));
      expect(formatLocalTime(april).month).toEqual(expect.objectContaining({ month: 'Abril', abbreviatedMonth: 'Abr' }));
      expect(formatLocalTime(may).month).toEqual(expect.objectContaining({ month: 'Mayo', abbreviatedMonth: 'May' }));
      expect(formatLocalTime(june).month).toEqual(expect.objectContaining({ month: 'Junio', abbreviatedMonth: 'Jun' }));
      expect(formatLocalTime(july).month).toEqual(expect.objectContaining({ month: 'Julio', abbreviatedMonth: 'Jul' }));
      expect(formatLocalTime(august).month).toEqual(expect.objectContaining({ month: 'Agosto', abbreviatedMonth: 'Ago' }));
      expect(formatLocalTime(september).month).toEqual(expect.objectContaining({ month: 'Septiembre', abbreviatedMonth: 'Sep' }));
      expect(formatLocalTime(october).month).toEqual(expect.objectContaining({ month: 'Octubre', abbreviatedMonth: 'Oct' }));
      expect(formatLocalTime(november).month).toEqual(expect.objectContaining({ month: 'Noviembre', abbreviatedMonth: 'Nov' }));
      expect(formatLocalTime(december).month).toEqual(expect.objectContaining({ month: 'Diciembre', abbreviatedMonth: 'Dic' }));
    });
  });
});
