import fetch from '@univision/fe-commons/dist/utils/fetch';

import { isOpenGraphImageValid } from './setupUtils';

describe('setupUtils test', () => {
  it('should set invalid og image when request fails', async() => {
    fetch.setResponseOnce({ err: {} });
    const data = { metaTagData: { openGraph: { imageUrl: 'test' } } };

    const hasValidOgImage = await isOpenGraphImageValid(data, true);
    expect(hasValidOgImage).toBe(false);
  });

  it('should set valid og image when request was successfull', async() => {
    fetch.setResponseOnce({ res: { status: 200 } });
    const data = { metaTagData: { openGraph: { imageUrl: 'test' } } };

    const hasValidOgImage = await isOpenGraphImageValid(data, true);
    expect(hasValidOgImage).toBe(true);
  });

  it('should set valid og image flag in client side', async() => {
    fetch.setResponseOnce({ res: { status: 200 } });

    const hasValidOgImage = await isOpenGraphImageValid({}, false);
    expect(hasValidOgImage).toBe(true);
  });
});
