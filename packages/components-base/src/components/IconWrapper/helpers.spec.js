import helpers from './helpers';

/** @test {Helpers} */
describe('getContentClass ', () => {
  it('should return null by default', () => {
    expect(helpers.getContentClass()).toBe(null);
  });
  it('should return slideshow if slideshow content', () => {
    expect(helpers.getContentClass('slideshow')).toBe('slideshow');
  });
  it('should return slideshow if reactionslideshow content', () => {
    expect(helpers.getContentClass('reactionslideshow')).toBe('slideshow');
  });
  it('should return recipe if contentType is article and the articleType is recipe', () => {
    expect(helpers.getContentClass('article', 'recipe')).toBe('recipe');
  });
  it('should return article if contentType is article and the articleType is not recipe', () => {
    expect(helpers.getContentClass('article', 'video')).toBe('article');
  });
});
