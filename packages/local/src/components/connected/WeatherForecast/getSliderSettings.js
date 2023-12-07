/**
* Slider settings
* @param {string} breakPoint - current breakpoint
* @returns {Object}
*/
export default function sliderSettings(breakPoint) {
  switch (breakPoint) {
    default:
      return {
        width: 2000,
        height: 60,
        dotSize: 6,
        paddingGraphic: 30,
      };
    case 'xxs':
    case 'xs':
      return {
        width: 3472,
        height: 60,
        dotSize: 8,
        paddingGraphic: 45,
        pagePosition: [0, -414, -860, -1300, -1742, -2180, -2624, -3050],
      };
    case 'sm':
      return {
        width: 2888,
        height: 60,
        dotSize: 8,
        paddingGraphic: 45,
        pagePosition: [0, -722, -1444, -2166],
      };
    case 'md':
      return {
        width: 2934,
        height: 60,
        dotSize: 8,
        paddingGraphic: 45,
        pagePosition: [0, -978, -1956],
      };
    case 'lg':
    case 'xl':
      return {
        width: 2450,
        height: 60,
        dotSize: 8,
        paddingGraphic: 45,
        pagePosition: [0, -1200],
      };
  }
}
