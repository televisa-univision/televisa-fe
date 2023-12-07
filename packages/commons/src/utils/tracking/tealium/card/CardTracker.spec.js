import CardTracker from './CardTracker';
import Tracker from '../Tracker';

describe('CardTracker suite', () => {
  const content = {
    uid: '12345',
    title: 'Title',
    uri: 'test.com',
  };
  const widgetContext = {
    position: 1,
    title: 'Title',
    name: 'Name',
    metaData: {
      cardName: 'Card name',
      cardType: 'Card type',
    },
  };
  let fireEventSpy;

  beforeEach(() => {
    fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should ignore events if there is not a widget context', () => {
    CardTracker.track(CardTracker.events.click, {});
    expect(fireEventSpy).not.toBeCalled();
  });
  it('should track click events', () => {
    CardTracker.track(CardTracker.events.click, 'other', {
      widgetContext: { type: 'test' },
      target: 'testing',
      cardSize: 'test',
      cardType: 'test',
    });
    expect(fireEventSpy).toHaveBeenLastCalledWith(expect.any(Object));

    CardTracker.track(CardTracker.events.click, 'content', {
      widgetContext: { type: 'content' },
      target: 'content',
      cardSize: 'test',
      cardType: 'test',
      contentTitle: 'test',
      contentUid: 'test',
    });
    expect(fireEventSpy).toHaveBeenLastCalledWith(expect.any(Object));
  });

  describe('buildTrackingData', () => {
    it('should build the tracking data from content object', () => {
      expect(CardTracker.constructor.buildTrackingData(content, widgetContext)).toEqual({
        card_id: '12345',
        card_title: 'Title',
        card_type: 'Card name - Card type',
        reaction_count: 0,
        widget_pos: 1,
        widget_title: 'title',
        widget_type: 'name',
        position: 0,
        event_label: '',
      });
    });
    it('should return null if widgetContext object is invalid', () => {
      expect(CardTracker.constructor.buildTrackingData(null, null)).toEqual(null);
    });
    it('should return empty card_type when no metaData is available in widgetContext', () => {
      const {
        metaData,
        ...newWidgetContext
      } = widgetContext;
      const trackingData = CardTracker.constructor.buildTrackingData(content, newWidgetContext);
      expect(trackingData.card_type).toBe('');
    });
    it('should override card type value with cardTypeOverride', () => {
      const newContent = {
        ...content,
        cardTypeOverride: 'test',
      };
      const trackingData = CardTracker.constructor.buildTrackingData(newContent, widgetContext);
      expect(trackingData.card_type).toBe('test');
    });
    it('should build the tracking data from content object and target', () => {
      const target = 'prendetv_cta_external';
      content.position = 1;
      const {
        metaData,
        ...newWidgetContext
      } = widgetContext;
      const trackingData = CardTracker.constructor.buildTrackingData(
        content,
        newWidgetContext,
        target
      );
      expect(trackingData.event_label).toBe(`Widget_Pos${content.position ? content.position : ''}`);
    });
    it('should build the tracking data from content object and target', () => {
      const target = 'prendetv_cta_external';
      content.position = null;
      const {
        metaData,
        ...newWidgetContext
      } = widgetContext;
      const trackingData = CardTracker.constructor.buildTrackingData(
        content,
        newWidgetContext,
        target
      );
      expect(trackingData.event_label).toBe(`Widget_Pos${content.position ? content.position : ''}`);
    });
  });

  describe('onClickHandler', () => {
    it('should return a valid function', () => {
      expect(CardTracker.onClickHandler(content, widgetContext, 'content')).toEqual(expect.any(Function));
    });

    it('should trigger the tracker', () => {
      CardTracker.onClickHandler(content, widgetContext)();
      expect(fireEventSpy).toHaveBeenCalled();
    });
    it('should set a personalized target name', () => {
      const newWidgetContext = {
        ...widgetContext,
        metaData: {
          ...widgetContext.metaData,
          isPersonalized: true,
        },
      };
      CardTracker.onClickHandler(content, newWidgetContext)();
      expect(fireEventSpy).toHaveBeenCalled();
    });
    it('should set a event label with target prendetv', () => {
      const newWidgetContext = {
        ...widgetContext,
        metaData: {
          ...widgetContext.metaData,
          isPersonalized: true,
        },
      };
      const target = 'prendetv_cta_external';
      const trackingData = CardTracker.constructor.buildTrackingData(
        content,
        newWidgetContext,
        target
      );
      CardTracker.onClickHandler(content, newWidgetContext, target)();
      expect(fireEventSpy).toHaveBeenCalled();
      expect(trackingData).toHaveProperty('event_label');
    });
  });

  describe('trackReaction', () => {
    it('should track reaction events', () => {
      CardTracker.track(
        CardTracker.events.reaction,
        { contentId: 'test', reaction: 'TEST' }
      );
      expect(fireEventSpy).toHaveBeenCalled();
      expect(fireEventSpy).toHaveBeenLastCalledWith(expect.objectContaining({
        event: 'reaction_click',
        object_content_id: 'test',
        reaction_type: 'test',
      }));
    });
  });
  describe('trackShare', () => {
    it('should track share events', () => {
      CardTracker.track(
        CardTracker.events.share,
        {
          contentId: 'test', share: 'FaceBook', contentTitle: 'title', contentType: 'article',
        }
      );
      expect(fireEventSpy).toHaveBeenCalled();
      expect(fireEventSpy).toHaveBeenLastCalledWith(expect.objectContaining({
        event: 'social_share',
        event_action: 'facebook',
        share_content_id: 'test',
        share_content_title: 'title',
        share_content_type: 'article',
      }));
    });
  });
});
