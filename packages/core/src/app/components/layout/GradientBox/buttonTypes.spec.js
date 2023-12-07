import * as buttonTypes from './buttonTypes';

/** @test {buttonTypes} */
describe('buttonTypes ', () => {
  test('getType with no arguments', () => {
    expect(buttonTypes.getType()).not.toBeUndefined();
  });

  test('getType with an article', () => {
    expect(buttonTypes.getType('article')).not.toBeUndefined();
  });

  test('getType with an video', () => {
    expect(buttonTypes.getType('video')).not.toBeUndefined();
  });

  test('getType with an slideshow', () => {
    expect(buttonTypes.getType('slideshow')).not.toBeUndefined();
  });

  test('getType with a externalcontent and isRadio true', () => {
    expect(buttonTypes.getType('externalcontent', true)).not.toBeUndefined();
  });

  test('getType with an undefined type', () => {
    expect(buttonTypes.getType('seccion')).not.toBeUndefined();
  });
});
