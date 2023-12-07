import getTimeAgoFormatter from '../getTimeAgoFormatter';

const suffix = 'ago';
const epochMiliseconds = new Date().valueOf();

describe('getTimeAgoFormatter helper', () => {
  it('should return a formatter in spanish', () => {
    const formatter = getTimeAgoFormatter('es');
    expect(formatter).toBeInstanceOf(Function);
    expect(formatter(60, 'second', suffix, epochMiliseconds)).toBe('hace menos de un minuto');
    expect(formatter(2, 'hour', suffix, epochMiliseconds)).toBe('hace 2 horas');
    expect(formatter(1, 'day', suffix, epochMiliseconds)).toBe('hace un día');
    expect(formatter(2, 'month', suffix, epochMiliseconds)).toBe('hace 2 meses');
    expect(formatter(1, 'year', suffix, epochMiliseconds)).toBe('hace un año');
  });

  it('should return a formatter in portuguese', () => {
    const formatter = getTimeAgoFormatter('pt');
    expect(formatter).toBeInstanceOf(Function);
    expect(formatter(60, 'second', suffix, epochMiliseconds)).toBe('há menos de um minuto');
    expect(formatter(2, 'hour', suffix, epochMiliseconds)).toBe('há 2 horas');
    expect(formatter(1, 'day', suffix, epochMiliseconds)).toBe('há um dia');
    expect(formatter(2, 'month', suffix, epochMiliseconds)).toBe('há 2 meses');
    expect(formatter(1, 'year', suffix, epochMiliseconds)).toBe('há um ano');
  });

  it('should return a formatter with default language', () => {
    const formatter = getTimeAgoFormatter();
    expect(formatter).toBeInstanceOf(Function);
    expect(formatter(5, 'minute', suffix, epochMiliseconds)).toBe('5 minutes ago');
  });

  it('should return days for weeks', () => {
    const formatter = getTimeAgoFormatter();
    const dateMiliseconds = new Date('Thu Feb 16 2020 17:23:24').valueOf();
    const now = new Date('Thu Feb 01 2020 17:23:24').valueOf();
    expect(formatter(1, 'week', suffix, dateMiliseconds, null, () => now)).toBe('15 days ago');
  });

  it('should return days with from now prefix', () => {
    const formatter = getTimeAgoFormatter('es');
    expect(formatter(2, 'days', 'from now', epochMiliseconds)).toBe('dentro de 2 días');
    expect(formatter(5, 'day', 'from now', epochMiliseconds)).toBe('dentro de 5 días');
  });

  it('should return days with from now prefix in portuguese', () => {
    const formatter = getTimeAgoFormatter('pt');
    expect(formatter(2, 'days', 'from now', epochMiliseconds)).toBe('dentro de 2 dias');
    expect(formatter(5, 'day', 'from now', epochMiliseconds)).toBe('dentro de 5 dias');
  });

  it('should return custom unit', () => {
    const formatter = getTimeAgoFormatter();
    expect(formatter(1, 'sun', 'from now', epochMiliseconds)).toBe('1 sun from now');
    expect(formatter(2, 'suns', 'from now', epochMiliseconds)).toBe('2 suns from now');
  });
});
