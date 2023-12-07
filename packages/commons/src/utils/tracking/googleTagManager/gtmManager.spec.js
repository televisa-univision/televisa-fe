import setPageData from '../../../store/actions/page-actions';
import Store from '../../../store/store';
import * as loader from './gtmLoader';
import gtmManager from './gtmManager';
import gtmConfig from './gtmConfig.json';

const config = {
  account: 'main',
  environment: 'prod',
  data: {
    all_tags: [
      'programas',
    ],
    content_created_date: '1468987140000',
    content_creator: '0000014e-076b-dda5-a94f-176b17a30000',
    content_id: '0000014b-e5ba-de59-abfb-f7bb8a210000',
    content_modified_date: '1497425551238',
    content_priority: 'standard',
    content_type: 'section',
    environment_name: 'qa',
    page_name: 'programas:programas:section:univision.com ',
    parent_tags: [
      'programas',
    ],
    parent_topic: 'programas',
    primary_tag: 'programas',
    primary_tag_uid: '0000014b-a9eb-de67-a74f-b9fb7af70001',
    primary_tag_en: 'programs',
    promo_title: 'univision.com',
    publisher_tags: [
      'programas',
    ],
    short_title: 'univision.com ',
    short_title_en: 'univision.com ',
    tags_en: [
      'programs',
    ],
    title: 'univision.com',
    title_en: 'univision.com',
    topics: [
      'programas',
    ],
    uci_division: 'entertainment',
  },
};

beforeEach(() => {
  delete global.window.utag_data;
});

describe('gtmManager', () => {
  it('should return false if there is not config data', async () => {
    expect(await gtmManager.load(null)).toBe(false);
  });

  it('should load Google Tag Manager', async () => {
    await gtmManager.load(config);
    expect(window.dataLayer).toBeDefined();
  });

  it('should load using config.environment = prod', async () => {
    spyOn(loader, 'default');
    await gtmManager.load({ ...config, environment: 'prod' });
    expect(window.dataLayer).toBeDefined();
    expect(loader.default).toBeCalledWith(gtmConfig.id, gtmConfig.dataLayer, null);
  });

  it('should load using environment = test', async () => {
    Store.dispatch(setPageData({
      env: 'test',
    }));
    spyOn(loader, 'default');
    await gtmManager.load({ ...config, environment: 'test' });
    expect(window.dataLayer).toBeDefined();
    expect(loader.default)
      .toBeCalledWith(gtmConfig.id, gtmConfig.dataLayer, gtmConfig.testParameters);
  });

  it('should load using mode = prod', async () => {
    spyOn(loader, 'default');
    Store.dispatch(setPageData({
      requestParams: {
        mode: 'prod',
      },
    }));
    await gtmManager.load(config);
    expect(window.dataLayer).toBeDefined();
    expect(loader.default)
      .toBeCalledWith(gtmConfig.id, gtmConfig.dataLayer, null);
  });

  it('should load using mode = test', async () => {
    spyOn(loader, 'default');
    Store.dispatch(setPageData({
      requestParams: {
        mode: 'test',
      },
    }));
    await gtmManager.load(config);
    expect(window.dataLayer).toBeDefined();
    expect(loader.default)
      .toBeCalledWith(gtmConfig.id, gtmConfig.dataLayer, gtmConfig.testParameters);
  });

  it('should load ignoring the mode param', async () => {
    spyOn(loader, 'default');
    Store.dispatch(setPageData({
      env: 'production',
      requestParams: {
        mode: 'unknown',
      },
    }));
    await gtmManager.load(config);
    expect(window.dataLayer).toBeDefined();
    expect(loader.default)
      .toBeCalledWith(gtmConfig.id, gtmConfig.dataLayer, null);
  });

  it('should add event to the dataLayer', () => {
    const event = { event: 'test', foo: 'bar' };
    gtmManager.triggerEvent(event);
    expect(window.dataLayer[window.dataLayer.length - 1]).toEqual(event);
  });

  it('should trigger a page view', () => {
    gtmManager.pageView();
    expect(window.dataLayer[window.dataLayer.length - 1].event)
      .toEqual(gtmConfig.virtualPageViewEvent);
  });

  it('should return an empty array when not initialized', () => {
    window.dataLayer = false;
    const dataLayer = gtmManager.getDataLayer();
    expect(dataLayer).toHaveLength(0);
  });

  it('should update data when initialized', async () => {
    const newData = { data: true };
    await gtmManager.load(config);
    gtmManager.updateDataLayer(newData);
    const result = {
      ...newData,
      mvpdproviderid: 'false',
    };
    expect(window.dataLayer[0]).toEqual(result);
    expect(window.dataLayer[window.dataLayer.length - 1]).toEqual({
      event: 'gtm.js',
    });
  });

  it('should not update data when not initialized', () => {
    window.dataLayer = null;
    const newData = { data: true };
    gtmManager.updateDataLayer(newData);
    expect(window.dataLayer).toBe(null);
  });

  it('should add dataLayer object', () => {
    const data = {};
    window.dataLayer = [];
    gtmManager.addDataLayer(data);
    expect(window.dataLayer).toHaveLength(1);
    window.dataLayer = undefined;
    gtmManager.addDataLayer(data);
    expect(window.dataLayer).toBeUndefined();
  });

  it('should clear dataLayer array', () => {
    window.dataLayer = [1, 2, 3];
    gtmManager.clearDataLayer();
    expect(window.dataLayer).toHaveLength(0);
  });

  it('should reset the GTM internal data model.', () => {
    window.dataLayer = [1, 2, 3];
    window.google_tag_manager = {
      'GTM-TDVV9BR': {
        dataLayer: {
          reset: jest.fn(),
        },
      },
    };
    spyOn(window.google_tag_manager['GTM-TDVV9BR'].dataLayer, 'reset');
    gtmManager.clearDataLayer();
    expect(window.dataLayer).toHaveLength(0);
    expect(window.google_tag_manager['GTM-TDVV9BR'].dataLayer.reset).toHaveBeenCalled();
  });

  it('it should not clear the dataLayer if it is already null', () => {
    window.dataLayer = null;
    gtmManager.clearDataLayer();
    expect(window.dataLayer).toBe(null);
  });

  it('should not set the user id when dataLayer is empty', () => {
    window.dataLayer = null;
    gtmManager.setUserId('test');
    expect(window.dataLayer).toBe(null);
  });

  it('should set the user id when dataLayer is not empty', () => {
    window.dataLayer = [{}, {}, {}];
    gtmManager.setUserId('test');
    expect(window.dataLayer[0]).toEqual({ user_id: 'test' });
  });
});
