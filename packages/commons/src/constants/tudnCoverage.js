/**
 * An enumeration of coverage types for a sports TUDN Leagues
 */
const tudnCoverage = Object.freeze({
  /**
   * Basic soccer match layout/coverage for leagues that has no OPTA data
   */
  BASIC: 'Basic',
  CLASSIC: 'Classic',
  CORE: 'Core',
  PERFORMANCE: 'Performance',
  /**
   * Special soccer match layout for leagues that has OPTA data
   * but not Neulion information (e.g live stream without highlights)
   */
  SPECIAL: 'Special',
});

export default tudnCoverage;
