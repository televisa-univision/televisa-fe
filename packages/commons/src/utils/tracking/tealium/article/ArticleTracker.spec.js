import gtmManager from '../../googleTagManager/gtmManager';
import ArticleTracker from './ArticleTracker';

const dataTrackingListItem = {
  list_item_name: 'list_advance',
  list_count: 3,
  list_id: '0000017b-7497-d138-af7b-f7ffa40a0002',
  list_title: 'Atletico bucaramanga',
  list_type: 'externalcontent',
  list_sponsor: 'barbie',
  list_video_id: '4032345',
  list_position: 3,
  list_depth: 0,
};

describe('ArticleTracker', () => {
  const dataLayer = gtmManager.getDataLayer();
  it('should ignore unknown events', () => {
    const { length } = dataLayer;
    ArticleTracker.track('random event');
    expect(dataLayer.length).toBe(length);
  });

  it('should handle the article events', () => {
    const data = {
      uid: 'uid',
      vertical: true,
      type: 'slideshow',
      primaryTag: { name: 'test' },
    };
    ArticleTracker.track(
      ArticleTracker.events.halfScroll,
      Object.assign(data, { name: 'facebook' })
    );
    ArticleTracker.track(
      ArticleTracker.events.fullScroll,
      Object.assign(data, { name: 'facebook' })
    );
    ArticleTracker.track(
      ArticleTracker.events.articleRead,
      Object.assign(data, { name: 'facebook' })
    );
    ArticleTracker.track(
      ArticleTracker.events.newArticle,
      Object.assign(data, { name: 'facebook' })
    );
    ArticleTracker.track(
      ArticleTracker.events.enhancementClick,
      Object.assign(data, { enhancementType: 'article' })
    );
    ArticleTracker.track(
      ArticleTracker.events.enhancementClick,
      Object.assign(data, { enhancementType: 'image' })
    );
    ArticleTracker.track(
      ArticleTracker.events.applyBtnClick
    );
    ArticleTracker.track(
      ArticleTracker.events.callExpertBtnClick
    );
    ArticleTracker.track(
      ArticleTracker.events.callExpertBtnCardClick
    );
    ArticleTracker.track(
      ArticleTracker.events.callActionCTAClick,
    );
    expect(dataLayer.length).toBe(10);
  });
});

describe('track item from item list when they are different types', () => {
  it('should build the tracking data with a type video', () => {
    const dataTrackingList = {
      ...dataTrackingListItem,
      list_sponsor: undefined,
      list_type: 'video',
      list_item_name: 'list_advance_video',
    };
    ArticleTracker.trackListItemChange(dataTrackingList);
    expect(dataTrackingList.list_type).toBe('video');
  });

  it('should build the tracking data with a type externalcontent', () => {
    ArticleTracker.trackListItemChange(dataTrackingListItem);
    expect(dataTrackingListItem.list_type).toBe('externalcontent');
  });
});
