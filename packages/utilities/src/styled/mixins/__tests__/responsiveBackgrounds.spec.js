import responsiveBackgrounds from '../responsiveBackgrounds';

/**
 * @test {responsiveBackgrounds}
 */
describe('responsiveBackground mixin test', () => {
  it('should return an empty array if `images` is not send', () => {
    const expected = [];
    expect([...responsiveBackgrounds()]).toEqual(expected);
  });

  it('should return an empty array if `images` is empty', () => {
    const expected = [];
    expect([...responsiveBackgrounds({})]).toEqual(expected);
  });

  it('should return the proper media query, one background case', () => {
    const images = {
      xs: 'image.jpg',
    };
    const expected = '@media(min-width:480px){background-image:url(image.jpg);}';

    expect(responsiveBackgrounds(images).join('').replace(/\s+/gm, '')).toEqual(expected);
  });

  it('should return the proper media query, several backgrounds case', () => {
    const images = {
      xs: 'image-xs.jpg',
      md: 'image-md.jpg',
      lg: 'image-lg.jpg',
      xl: 'image-xs.jpg',
    };
    const expected = `
      @media (min-width: 480px){background-image: url(image-xs.jpg);}
      @media (min-width: 1024px){background-image: url(image-md.jpg);}
      @media (min-width: 1280px){background-image: url(image-lg.jpg);}
      @media (min-width: 1440px){background-image: url(image-xs.jpg);}
    `.replace(/\s+/gm, '');

    expect(responsiveBackgrounds(images).join('').replace(/\s+/gm, '')).toEqual(expected);
  });
});
