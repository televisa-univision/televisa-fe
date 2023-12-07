// eslint-disable-next-line no-restricted-imports
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import fetch from '@univision/fe-commons/dist/utils/fetch';
import localization from '@univision/fe-utilities/localization';

import setupArchive from './setupArchive';

fetch.setResponse({
  type: 'main',
});

const store = configureStore();

describe('setupArchive test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should throw an HttpError by default', async () => {
    try {
      await setupArchive();
    } catch (e) {
      expect(e.message).toBe('Missing page context');
    }
  });
  it('should return content with the provided context', async () => {
    const ctx = {
      query: {
        slug: '2020',
      },
      store,
    };
    const props = await setupArchive(ctx, { siteName: 'univision' });
    expect(props).toEqual(expect.any(Object));
  });
  it('should use the paths as a fallback', async () => {
    const ctx = {
      query: {
        paths: ['2010'],
      },
      store,
    };
    const props = await setupArchive(ctx, { siteName: 'univision' });
    expect(props).toEqual(expect.any(Object));
  });
  it('should return content with the provided site name', async () => {
    const ctx = {
      query: {
        slug: '2020',
      },
      store,
    };
    const props = await setupArchive(ctx, { siteName: 'tudn' });
    expect(props).toEqual(expect.any(Object));
    expect(props.page.site).toEqual('tudn');
  });
  it('should return main type title and description when response is empty', async () => {
    fetch.setResponseOnce({});
    const ctx = {
      query: {
        slug: '2020',
      },
      store,
    };
    const locals = { brand: 'Univision' };
    const title = localization.get('archiveMainTitle', { locals });
    const desc = localization.get('archiveMainDesc', { locals });
    const props = await setupArchive(ctx, { siteName: 'univision' });
    expect(props.page.data.title).toBe(title);
    expect(props.page.data.description).toBe(desc);
  });

  it('should return test brand', async () => {
    const ctx = {
      query: {
        slug: '2020',
      },
      store,
    };
    const locals = { brand: 'test' };
    const title = localization.get('archiveMainTitle', { locals });
    const desc = localization.get('archiveMainDesc', { locals });
    const props = await setupArchive(ctx, { siteName: 'test' });
    expect(props.page.data.title).toBe(title);
    expect(props.page.data.description).toBe(desc);
  });

  it('should handle monthly archive route', async () => {
    const ctx = {
      query: { slug: '2020/septiembre-3' },
      store,
    };
    await setupArchive(ctx, { siteName: 'univision' });

    // Will usually use toHaveBeenCalledWith but there are no partial matches for the args
    expect(fetch.mock.calls[0][0]).toMatch(/2020\/september\/3/);
  });

  it('should handle montly archive with no pageNumber route', async () => {
    const ctx = {
      query: { slug: '2020/agosto' },
      store,
    };
    await setupArchive(ctx, { siteName: 'univision' });

    expect(fetch.mock.calls[0][0]).toMatch(/2020\/august\/1/);
  });

  it('should handle empty slug', async () => {
    const ctx = {
      query: { slug: '' },
      store,
    };
    await setupArchive(ctx, { siteName: 'univision' });
    expect(fetch.mock.calls[0][0]).toMatch(/archive\/univision/);
  });

  it('should return main slug when path rules are not met', async () => {
    const ctx = {
      query: { slug: '2020/septiembre-3/test' },
      store,
    };
    await setupArchive(ctx, { siteName: 'univision' });
    expect(fetch.mock.calls[0][0]).toMatch(/archive\/univision/);
  });
});
