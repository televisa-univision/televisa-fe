import { MX, US } from '../../constants/userLocation';
import getUserLocationValue from './getUserLocationValue';

describe('getUserLocationValue', () => {
  it('should return US by default', () => {
    expect(getUserLocationValue()).toBe(US);
  });

  it('should return US value when invalid value is input', () => {
    expect(getUserLocationValue('test')).toBe(US);
  });

  it('should return provided value', () => {
    expect(getUserLocationValue(MX)).toBe(MX);
  });

  it('should return cleaned value', () => {
    expect(getUserLocationValue('MX?userLocation=MX')).toBe(MX);
  });

  it('should return the first value if userLocation is an array', () => {
    expect(getUserLocationValue(['MX', 'US'])).toBe(MX);
  });

  it('should return US if the userLocation is not a valid string', () => {
    expect(getUserLocationValue(12)).toBe(US);
  });
});
