import {
  SHOWS,
  SPORT,
  SERIES,
  SELECT_ALL,
  SELECT_SHOWS,
  SELECT_MATCHES,
} from '@univision/fe-commons/dist/constants/tvGuide';
import { filterHandler } from './helper';

describe('filterHandler', () => {
  it('should return the right value', () => {
    expect(filterHandler({ type: SHOWS, t: SERIES }, SELECT_ALL)).toBeTruthy();
    expect(filterHandler({ type: SHOWS, t: SERIES }, SELECT_SHOWS)).toBeTruthy();
    expect(filterHandler({ type: SHOWS }, SELECT_SHOWS)).toBeTruthy();
    expect(filterHandler({ type: SPORT }, SELECT_MATCHES)).toBeTruthy();
    expect(filterHandler(null)).toBeFalsy();
  });
});
