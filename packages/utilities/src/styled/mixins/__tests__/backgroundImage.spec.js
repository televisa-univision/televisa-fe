import backgroundImage from '../backgroundImage';

/**
 * @test {backgroundImage}
 */
describe('backgroundImage mixin test', () => {
  it('should return `none` if no parameter is sent', () => {
    const expected = 'background-image: none';

    expect(backgroundImage()).toEqual(expected);
  });

  it('should return `none` if `backgroundImages` is not send', () => {
    const expected = 'background-image: none';

    expect(backgroundImage({})).toEqual(expected);
  });

  it('should return `none` if an empty object is sent as backgroundImages parameter', () => {
    const backgroundImages = {
      backgroundImages: null,
    };
    const expected = 'background-image: none';

    expect(backgroundImage(backgroundImages)).toEqual(expected);
  });

  it('should return an array with media queries when valid object with breakpoints and images is sent', () => {
    const backgroundImages = {
      backgroundImages: {
        xs: 'image-xs.jpg',
        md: 'image-md.jpg',
      },
    };
    const expected = `
      @media (min-width: 480px) {
        background-image: url(image-xs.jpg);
      }
      @media (min-width: 1024px) {
        background-image: url(image-md.jpg);
      }`.replace(/\s+/gm, '');

    expect(backgroundImage(backgroundImages).join('').replace(/\s+/gm, '')).toEqual(expected);
  });

  it('should return a single background if parameter backgroundImage is set', () => {
    const singleImage = {
      backgroundImage: 'image.jpg',
    };
    const expected = 'background-image:url(image.jpg)';

    expect(backgroundImage(singleImage).join('')).toMatch(expected);
  });

  it('should return a background gradient if parameter backgroundGradient is set', () => {
    const backgroundGradient = {
      backgroundGradient: 'linear-gradient(45deg, rgba(35,162,238,1) 0%, rgba(35,88,191,1) 100%)',
    };
    const expected = 'background-image:linear-gradient(45deg, rgba(35,162,238,1) 0%, rgba(35,88,191,1) 100%)';

    expect(backgroundImage(backgroundGradient).join('')).toMatch(expected);
  });
});
