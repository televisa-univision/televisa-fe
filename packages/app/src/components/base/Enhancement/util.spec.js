import ArticleTracker from '@univision/fe-commons/dist/utils/tracking/tealium/article/ArticleTracker';
import trackEnhancementClick from './util';

ArticleTracker.track = jest.fn();

describe('trackEnhancementClick', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should track click when image', () => {
    const typeObject = {
      objectData: { type: 'image' },
    };

    const data = {
      title: 'title',
      uid: '123',
      primaryTag: '123',
    };

    trackEnhancementClick(typeObject, data)();
    expect(ArticleTracker.track).toBeCalledWith('article.enhancementClick', {
      title: 'title',
      uid: '123',
      primaryTag: '123',
      enhancementType: 'image',
    });
  });

  it('should track click when article', () => {
    const typeObject = {
      objectData: { type: 'article' },
    };

    const data = {
      title: 'title',
      uid: '123',
      primaryTag: '123',
    };

    trackEnhancementClick(typeObject, data)();
    expect(ArticleTracker.track).toBeCalledWith('article.enhancementClick', {
      title: 'title',
      uid: '123',
      primaryTag: '123',
      enhancementType: 'article',
    });
  });

  it('should not track click when not article or image', () => {
    const typeObject = {
      objectData: { type: 'slideshow' },
    };

    const data = {
      title: 'title',
      uid: '123',
      primaryTag: '123',
    };

    trackEnhancementClick(typeObject, data)();
    expect(ArticleTracker.track).not.toBeCalled();
  });

  it('should not track click when no object data', () => {
    const typeObject = {};
    const data = {
      title: 'title',
      uid: '123',
      primaryTag: '123',
    };

    trackEnhancementClick(typeObject, data)();
    expect(ArticleTracker.track).not.toBeCalled();
  });
});
