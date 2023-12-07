import * as WidgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';
import features from '@univision/fe-commons/dist/config/features';
import { getWidgetCardsData, getSingleCardData } from './getWidgetCardsData';
import * as cardMapper from '.';

let getCardByContentTypeMock;

describe('getWidgetCardsData', () => {
  beforeEach(() => {
    getCardByContentTypeMock = jest.spyOn(cardMapper, 'default')
      .mockImplementation(() => []);
  });

  afterEach(() => {
    getCardByContentTypeMock.mockClear();
  });

  it('should SINGLE_WIDGET just map the first item', () => {
    const widgetContext = { widgetType: WidgetTypes.SINGLE_WIDGET };
    getWidgetCardsData(widgetContext, [{}, {}]);
    expect(getCardByContentTypeMock).toHaveBeenCalled();
    expect(getCardByContentTypeMock).toHaveBeenCalledWith(
      {},
      { widgetContext, forceVideoInlineCard: true }
    );
  });
  it('should SINGLE_WIDGET just map the first item', () => {
    const widgetContext = { widgetType: WidgetTypes.SINGLE_WIDGET };
    getWidgetCardsData(widgetContext, [{}, {}]);
    expect(getCardByContentTypeMock).toHaveBeenCalled();
    expect(getCardByContentTypeMock).toHaveBeenCalledWith(
      {},
      { widgetContext, forceVideoInlineCard: true }
    );
  });
  it('should return a list of valid cardContent excluding null or undefined', () => {
    const widgetContext = { widgetType: WidgetTypes.GRID_WIDGET };
    const result = getWidgetCardsData(widgetContext, [null, {}]);
    expect(result).toEqual([[]]);
  });

  it('should forcePromoCard for some widgets if content type == LIVESTREAM', () => {
    [
      WidgetTypes.CAROUSEL_WIDGET,
      WidgetTypes.SHOWS_LF_GRID_FEATURED_EPISODES,
      WidgetTypes.HERO_WIDGET,
    ].forEach((type) => {
      const widgetContext = { widgetType: type };
      const content = { type: contentTypes.LIVE_STREAM };

      const options = { widgetContext, forcePromoCard: true };
      getWidgetCardsData(widgetContext, [content]);
      expect(getCardByContentTypeMock).toHaveBeenCalledWith(content, options);
      getCardByContentTypeMock.mockClear();
    });
  });

  it('should GRID_WIDGET force inline if it is first item and is video', () => {
    const widgetContext = { widgetType: WidgetTypes.GRID_WIDGET };
    const content = { type: contentTypes.VIDEO };
    getWidgetCardsData(widgetContext, [content, {}]);
    expect(getCardByContentTypeMock.mock.calls[0][0]).toEqual(content);
    expect(getCardByContentTypeMock.mock.calls[0][1]).toEqual(
      { widgetContext, forceVideoInlineCard: true, showSpinner: false }
    );
    expect(getCardByContentTypeMock.mock.calls[1][0]).toEqual({});
    expect(getCardByContentTypeMock.mock.calls[1][1]).toEqual(
      { widgetContext, forceVideoInlineCard: false, showSpinner: true }
    );
  });

  it('should GRID_WIDGET show a loading spinner in its first position', () => {
    const widgetContext = { widgetType: WidgetTypes.GRID_WIDGET };
    const content = { type: contentTypes.ARTICLE, device: 'mobile' };
    getWidgetCardsData(widgetContext, [content, {}]);
    expect(getCardByContentTypeMock).toHaveBeenCalledWith(
      expect.objectContaining(content),
      expect.objectContaining({ showSpinner: true })
    );
  });

  it('should LIST_WIDGET not be longer than content limit', () => {
    const listContentLimit = features.widgets.listWidget.contentLimit();
    const widgetContext = { widgetType: WidgetTypes.LIST_WIDGET };
    const contents = Array.from({ length: listContentLimit + 1 }, () => ({}));
    getWidgetCardsData(widgetContext, contents);

    for (let i = 0; i < contents.length; i += 1) {
      if (i === contents.length - 1) {
        expect(getCardByContentTypeMock.mock.calls[i]).not.toBeDefined();
      } else {
        expect(getCardByContentTypeMock.mock.calls[i][0]).toEqual({});
        expect(getCardByContentTypeMock.mock.calls[i][1]).toEqual({ widgetContext });
      }
    }
  });

  it('should empty list or invalid type returns empty list', () => {
    const widgetContext = { type: 'Invalid' };
    let result = getWidgetCardsData(widgetContext, []);
    expect(result).toEqual([]);

    result = getWidgetCardsData(widgetContext, [{}]);
    expect(result).toEqual([]);
  });

  it('should LOCAL_OPENING just map the first item', () => {
    const widgetContext = { widgetType: WidgetTypes.LOCAL_OPENING };
    getWidgetCardsData(widgetContext, [{}, {}]);
    expect(getCardByContentTypeMock).toHaveBeenCalled();
    expect(getCardByContentTypeMock).toHaveBeenCalledWith(
      {},
      { widgetContext, forceVideoInlineCard: true }
    );
  });

  describe('getSingleCardData', () => {
    it('should invalid content returns null', () => {
      expect(getSingleCardData(null, null, null)).toEqual(null);
    });
    it('should invalid widget type returns null', () => {
      expect(getSingleCardData(null, {}, null)).toEqual(null);
    });
  });
});
