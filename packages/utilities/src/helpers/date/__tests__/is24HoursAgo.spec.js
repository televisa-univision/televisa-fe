import is24HoursAgo from '../is24HoursAgo';

const datePast24hrs = new Date('2018-06-12T20:04:56Z');
const dateWithin24hrs = new Date('2020-08-19T00:56:00Z');

/** @test {is24HoursAgo} */
describe('is 24 hours ago helper', () => {
  const constantDate = new Date('2020-08-19T00:00:00Z');
  const RealDate = Date;
  beforeEach(() => {
    global.Date = jest.fn(
      (...props) => (props.length
        ? new RealDate(...props)
        : new RealDate(constantDate))
    );
  });
  afterEach(() => {
    global.Date = RealDate;
  });
  it('should return true if date provided is more than 24 hours old', () => {
    expect(is24HoursAgo(datePast24hrs)).toBeTruthy();
  });

  it('should return false if date provided is within 24 hours', () => {
    expect(is24HoursAgo(dateWithin24hrs)).toBeFalsy();
  });
});
