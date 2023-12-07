import serverMock from '../../../serviceMock/server';
import createUser from '../mutations/createUser';
import addFavoriteHoroscopeSign from '../mutations/addFavoriteHoroscopeSign';
import removeFavoriteHoroscopeSign from '../mutations/removeFavoriteHoroscopeSign';
import addReaction from '../mutations/addReaction';
import removeReaction from '../mutations/removeReaction';
import jobQuickApply from '../mutations/jobQuickApply';

describe('user-service queries', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should apply for job in apploi', async () => {
    const applicationData = {
      user: {
        firstName: 'Lima',
        lastName: 'Neto',
        email: 'dummy@gmail.com',
      },
      job: {
        jobId: '473438',
        partner: {
          sponsored: false,
          source: 'univision-apply',
          redirectApply:
            'https://jobs-staging.apploi.com/view/584876?utm_source=univision&utm_campaign=integration&utm_medium=job-board-search&language=es&ajs_event=LOAD_JOB_PAGE&ajs_aid=3f617530-4530-11e9-a2ca-7e775511d9e3&ajs_prop_search_fetch_id=8b15bc28d01c4891963d74069f531057&ajs_prop_keyword=truck driver&ajs_prop_page=1&ajs_prop_city_center=Unselected&ajs_prop_city=Houston&ajs_prop_state=Texas&ajs_prop_language=es&ajs_prop_search_order=12&ajs_prop_job_id=584876&ajs_prop_doc_type=job&ajs_prop_job_location_lat=29.7604267&ajs_prop_job_location_lon=-95.3698028&ajs_prop_boosted=0&ajs_prop_utm_source=univision&ajs_prop_utm_medium=job-board-search&ajs_prop_utm_campaign=integration',
          utmMedium: 'job-board-search',
          utmCampaign: 'integration',
          keyword: 'truck driver',
          searchFetchId: '8b15bc28d01c4891963d74069f531057',
          page: 1,
          order: 12,
          cityCenter: 'Unselected',
          utmSource: 'univision-apply',
        },
      },
      resume: {
        name: 'cv.pdf',
        data: 'ZXJlYmVyIGVyZyBlcmcgZXJnIGVyZ3JlZw==',
      },
    };
    expect.assertions(1);
    const res = await serverMock.query(
      jobQuickApply,
      applicationData
    );

    const { quickApply } = res.data;
    expect(quickApply.token).toBeDefined();
  });

  it('should listPostsQuery works properly', async () => {
    expect.assertions(1);
    const res = await serverMock.query(
      createUser,
    );
    expect(res.data.createUser.accessToken).toBeDefined();
  });

  it('should add or remove FavoriteHoroscopeSign works properly', async () => {
    expect.assertions(4);
    let res = await serverMock.query(
      addFavoriteHoroscopeSign,
      { signId: 'TestId', isRemove: false, requestingUrl: 'https://www.univision.com' },
    );

    let data = res.data.addFavoriteHoroscopeSign;
    expect(data.ids).toBeDefined();
    expect(data.items).toBeDefined();
    expect(data.ids).toContain('TestId');
    res = await serverMock.query(
      removeFavoriteHoroscopeSign,
      { signId: 'TestId', requestingUrl: 'https://www.univision.com' },
    );

    data = res.data.removeFavoriteHoroscopeSign;
    expect(data.ids).not.toContain('TestId');
  });
  it('should add or remove duplicated favorite sign works properly', async () => {
    expect.assertions(2);
    let res = await serverMock.query(
      addFavoriteHoroscopeSign,
      { signId: 'TestId', isRemove: false, requestingUrl: 'https://www.univision.com' },
    );
    await serverMock.query(
      addFavoriteHoroscopeSign,
      { signId: 'TestId', isRemove: false, requestingUrl: 'https://www.univision.com' },
    );

    let data = res.data.addFavoriteHoroscopeSign;
    expect(data.ids).toContain('TestId');

    await serverMock.query(
      removeFavoriteHoroscopeSign,
      { signId: 'TestId', isRemove: false, requestingUrl: 'https://www.univision.com' },
    );

    res = await serverMock.query(
      removeFavoriteHoroscopeSign,
      { signId: 'TestId', isRemove: false, requestingUrl: 'https://www.univision.com' },
    );

    data = res.data.removeFavoriteHoroscopeSign;
    expect(data.ids).not.toContain('TestId');
  });

  it('should remove twice favorite sign works properly', async () => {
    expect.assertions(1);
    const res = await serverMock.query(
      removeFavoriteHoroscopeSign,
      { signId: 'TestId', isRemove: false, requestingUrl: 'https://www.univision.com' },
    );

    const data = res.data.removeFavoriteHoroscopeSign;
    expect(data.ids).not.toContain('TestId');
  });

  it('should addReactions works properly', async () => {
    const res = await serverMock.query(
      addReaction,
      { contentId: 'Tests1', reaction: 'LIKE' },
    );

    const result = res.data.addReaction.reaction.content;
    expect(result).toEqual('LIKE');
  });

  it('should removeReactions works properly', async () => {
    const res = await serverMock.query(
      removeReaction,
      { contentId: 'Tests1' },
    );

    const result = res.data.removeReaction.contentId;
    expect(result).toEqual('Tests1');
  });
});
