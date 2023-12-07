import getContentOptions from './getContentOptions';
import contentOptions from '../contentOptions';

describe('getContentOptions', () => {
  it('should return article options', () => {
    const options = getContentOptions({ cardName: 'article' });
    expect(options).toEqual(contentOptions.article);
  });
  it('should return livestream options', () => {
    const options = getContentOptions({ cardName: 'livestream', cardLabel: 'test' });
    expect(options).toEqual(contentOptions.livestream);
  });
  it('should return livestream with override options', () => {
    const options = getContentOptions({ cardName: 'livestream' });
    expect(options).toEqual(
      expect.objectContaining({
        showBadge: false,
      })
    );
  });
  it('should return external content promo with override options', () => {
    const options = getContentOptions({ cardName: 'externalcontentpromo', isConecta: true, isConectaFeed: true });
    expect(options).toEqual(
      expect.objectContaining({
        showBadge: true,
      })
    );
  });
});
