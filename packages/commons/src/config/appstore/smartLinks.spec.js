import smartLinks from './smartLinks';

/** @test {smartLinks} */
describe('smartLinks test', () => {
  it('should return config per type', () => {
    const config = smartLinks('novela');
    expect(config).toEqual(expect.objectContaining({
      site_id: 'univisioncom',
      cp_0: 'browse',
      cp_3: 'TVE-2019',
      prefix: '5c75a80bcee04',
      creative_id: 'mobilebanner01',
      utm_campaign: 'TVE-2019',
      utm_source: 'univisioncom',
      web_page: 'page/landing',
      utm_content: 'TVE-2019',
      utm_medium: 'mobilebanner01',
    }));
  });

  it('should return config base config if type not found', () => {
    const config = smartLinks('test');
    expect(config).not.toHaveProperty('site_id');
  });
});
