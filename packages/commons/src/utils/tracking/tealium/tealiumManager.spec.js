import { exists } from '../../helpers';
import tealiumManager from './tealiumManager';
import mvpdProviders from '../mvpdProvidersData.json';
import SessionStorage from '../../helpers/SessionStorage';

const tealiumConfig = {
  account: 'main',
  environment: 'qa',
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

describe('tealiumManager', () => {
  it('should add events to the queue', () => {
    tealiumManager.triggerEvent({});
    expect(tealiumManager.eventsQueue.length).not.toBe(0);
  });

  it('should reject promise when utag is undefined', async () => {
    window.utag = undefined;
    let message = '';
    await tealiumManager.waitForApiReady(0, 2).catch((e) => { message = e; });
    const error = new Error('Not loaded');
    expect(message).toEqual(error);
  });

  it('should define utag_data', () => {
    tealiumManager.load(tealiumConfig);
    expect(exists(window.utag_data)).toBe(true);
  });

  it('should call utag.link', () => {
    window.utag = { link: jest.fn() };
    spyOn(window.utag, 'link');
    tealiumManager.linkEvent({});
    expect(window.utag.link).toBeCalled();
  });

  it('should process all the events in the queue', async () => {
    window.utag = { link: jest.fn() };
    tealiumManager.eventsQueue.push({}, {});
    await tealiumManager.processEvents();
    expect(tealiumManager.eventsQueue.length).toBe(0);
  });

  it('should call window.utag.view', async () => {
    window.utag = { view: jest.fn() };
    await tealiumManager.pageView();
    expect(window.utag.view).toBeCalled();
  });

  it('should fetch the mpvd data from session storage', async () => {
    SessionStorage.setObject('mvpdData', mvpdProviders[0]);
    await tealiumManager.load(tealiumConfig);
    expect(window.utag_data.mvpdproviderid).toBe(mvpdProviders[0].displayName);
    SessionStorage.clear();
  });

  it('should use default value for mvpd_name', async () => {
    SessionStorage.setObject('mvpData', { providerId: 'RANDOM' });
    await tealiumManager.load(tealiumConfig);
    expect(window.utag_data.mvpdproviderid).toBe('false');
    SessionStorage.clear();
  });

  it('should do nothing if config is undefined', () => {
    expect(tealiumManager.load(undefined)).toBe(false);
  });
});
