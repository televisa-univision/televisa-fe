import { loggingLevels, getLoggingLevel } from './loggingLevels';

describe('getLoggingLevel test', () => {
  it('should return the provided level', () => {
    expect(getLoggingLevel(loggingLevels.error)).toBe(loggingLevels.error);
    expect(getLoggingLevel(loggingLevels.info)).toBe(loggingLevels.info);
    expect(getLoggingLevel(loggingLevels.warn)).toBe(loggingLevels.warn);
  });
  it('should fallback to error level', () => {
    expect(getLoggingLevel('group')).toBe(loggingLevels.error);
    expect(getLoggingLevel('log')).toBe(loggingLevels.error);
  });
});
