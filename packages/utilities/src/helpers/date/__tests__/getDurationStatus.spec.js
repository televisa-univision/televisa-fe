import getDurationStatus from '../getDurationStatus';

/** @test {getDurationStatus} */
describe('getDurationStatus', () => {
  const currentTime = new Date('2018-01-29T21:10:00Z');
  const RealDate = Date;
  afterEach(() => {
    global.Date = RealDate;
  });
  it('should return pre if current time is before start time', () => {
    global.Date = jest.fn(
      (...props) => (props.length
        ? new RealDate(...props)
        : new RealDate(currentTime))
    );
    Object.assign(Date, RealDate);
    expect(getDurationStatus('2018-01-29T21:30:00Z', 30)).toBe('pre');
  });
  it('should return pre if wrong date is provided ', () => {
    expect(getDurationStatus('date', 30)).toBe('pre');
  });
  it('should return active if current time is within duration ', () => {
    global.Date = jest.fn(
      (...props) => (props.length
        ? new RealDate(...props)
        : new RealDate(currentTime))
    );
    Object.assign(Date, RealDate);
    expect(getDurationStatus('2018-01-29T21:00:00Z', 30)).toBe('active');
  });
  it('should return finish if current time is past duration ', () => {
    global.Date = jest.fn(
      (...props) => (props.length
        ? new RealDate(...props)
        : new RealDate(currentTime))
    );
    Object.assign(Date, RealDate);
    expect(getDurationStatus('2018-01-29T19:00:00Z', 120)).toBe('finish');
  });
});
