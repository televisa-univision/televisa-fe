import { randomHoroscopesIds, mocks, reactionsDB } from './schemaMock';
import jobSearchMock from './__mocks__/jobSearchMock.json';

describe('mock server user-service', () => {
  beforeEach(() => {
    Object.keys(reactionsDB).forEach(key => delete reactionsDB[key]);
  });

  it('should randomHoroscopesIds should returns 4 items by default', () => {
    const randomValues = randomHoroscopesIds();
    expect(randomValues.length).toEqual(4);
  });

  it('should randomHoroscopesIds should returns different items', () => {
    const count = 6;
    const valuesCount = randomHoroscopesIds(count).reduce((res, val) => {
      res[val] = 0;
      return res;
    }, {});
    Object.keys(valuesCount).forEach((key) => {
      valuesCount[key] += 1;
    });

    const repeatedCount = Object.values(valuesCount).reduce((i, val) => i + val, 0);
    expect(repeatedCount).toEqual(count);
  });

  it('should randomHoroscopesIds should not return more than 12 items', () => {
    const count = 13;
    const randomValues = randomHoroscopesIds(count);
    expect(randomValues.length).toEqual(12);
  });

  it('should string return uuid when field name is uid', () => {
    const result = mocks.String(null, null, null, { fieldName: 'uid' });
    expect(result.length).toEqual(36);
  });

  describe('Job Quick Apply', () => {
    let applicationData = {};

    beforeEach(() => {
      applicationData = {
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
    });

    it('should apply for job', () => {
      const response = mocks.Mutation().quickApply(null, { ...applicationData });
      expect(response).toEqual({ token: 'dummy' });
    });

    it('should return null token when no user or job or resume', () => {
      delete applicationData.job.partner;
      const response = mocks.Mutation().quickApply(null, {});
      expect(response).toEqual({ token: null });
    });

    it('should return null token when no partner', () => {
      delete applicationData.job.partner;
      const response = mocks.Mutation().quickApply(null, { ...applicationData });
      expect(response).toEqual({ token: null });
    });

    it('should return null token when no user email', () => {
      delete applicationData.user.email;
      const response = mocks.Mutation().quickApply(null, { ...applicationData });
      expect(response).toEqual({ token: null });
    });

    it('should return null token when no name in resume', () => {
      delete applicationData.resume.name;
      const response = mocks.Mutation().quickApply(null, { ...applicationData });
      expect(response).toEqual({ token: null });
    });
  });

  describe('Job Search', () => {
    it('should bring list of cities regardless of parameters', () => {
      const response = mocks.Query().getCitiesJobSearch();
      expect(response).toEqual(jobSearchMock.cities);
    });

    it('should bring list of jobs regardless of parameters', () => {
      const response = mocks.Query().getJobsJobSearch();
      expect(response).toEqual(jobSearchMock.jobs);
    });

    it('should bring list of industries', () => {
      const response = mocks.Query().getIndustriesJobSearch();
      expect(response).toEqual(jobSearchMock.industries);
    });

    it('should bring info about job application', () => {
      const response = mocks.Query().getJobApplicationStatus();
      expect(response).toBeDefined();
      expect(response.data.alreadyApplied).toBeTruthy();
    });
  });

  describe('getReactions', () => {
    it('should work if no contentIds provided', () => {
      const { reactions } = mocks.Query().getReactions(null, { contentIds: null });
      expect(reactions.length).toEqual(0);
    });

    it('should return existing reaction for specific content', () => {
      const result = mocks.Query().getReactions(null, { contentIds: ['testId'] });
      expect(result.reactions.length).toEqual(1);

      const result2 = mocks.Query().getReactions(null, { contentIds: ['testId'] });
      expect(result).toEqual(result2);
    });
  });
  describe('addReactions', () => {
    it('should add a new record if content does not exist yet when adding', () => {
      const { reaction: { content: reaction } } = mocks.Mutation().addReaction(null, { contentId: 'TestId', reaction: 'LIKE' });
      expect(reaction).toEqual('LIKE');

      const result = mocks.Query().getReactions(null, { contentIds: ['TestId'] });
      expect(result.reactions[0].userReaction).toEqual('LIKE');
    });

    it('should add a new record if content does not exist yet when removing', () => {
      const { contentId } = mocks.Mutation().removeReaction(null, { contentId: 'TestId' });
      expect(contentId).toEqual('TestId');

      const result = mocks.Query().getReactions(null, { contentIds: ['TestId'] });
      expect(result.reactions[0].userReaction).toEqual(null);
    });

    it('should remove user reaction', () => {
      mocks.Mutation().addReaction(null, { contentId: 'TestId', reaction: 'LIKE' });
      const removeResult = mocks.Mutation().removeReaction(null, { contentId: 'TestId' });
      const readResult = mocks.Query().getReactions(null, { contentIds: ['TestId'] });
      expect(removeResult.contentId).toEqual('TestId');
      expect(readResult.reactions[0].userReaction).toEqual(null);
    });

    it('should increase or decrease count for reaction properly', () => {
      mocks.Mutation().addReaction(null, { contentId: 'TestId', reaction: 'LIKE' });
      let readResult = mocks.Query().getReactions(null, { contentIds: ['TestId'] });
      expect(readResult.reactions[0].counts.find(count => count.reaction === 'LIKE').count).toEqual(1);

      mocks.Mutation().removeReaction(null, { contentId: 'TestId' });
      readResult = mocks.Query().getReactions(null, { contentIds: ['TestId'] });
      expect(readResult.reactions[0].counts.find(count => count.reaction === 'LIKE').count).toEqual(0);

      mocks.Mutation().addReaction(null, { contentId: 'TestId', reaction: 'DISLIKE' });
      readResult = mocks.Query().getReactions(null, { contentIds: ['TestId'] });
      expect(readResult.reactions[0].counts.find(count => count.reaction === 'DISLIKE').count).toEqual(1);
    });
    it('should increase or decrease count for reaction properly when replacing reaction', () => {
      mocks.Mutation().addReaction(null, { contentId: 'TestId', reaction: 'LIKE' });
      mocks.Mutation().addReaction(null, { contentId: 'TestId', reaction: 'DISLIKE' });

      const readResult = mocks.Query().getReactions(null, { contentIds: ['TestId'] });
      expect(readResult.reactions[0].counts.find(count => count.reaction === 'DISLIKE').count).toEqual(1);
      expect(readResult.reactions[0].counts.find(count => count.reaction === 'LIKE').count).toEqual(0);
    });
  });

  describe('avoid uncovered lines', () => {
    // The mock service generate random arrays of content. When it generates
    // a combination of contents that doesn't cover all the resolvers manually defined
    // in the mock, jest fails due uncovered lines. For that reason we manually
    // tests those possible use cases.
    it('should validate properly', () => {
      // Generic CMS content
      expect(mocks.GenericCmsContent().json).toBeDefined();
      // Article
      expect(mocks.Article().type).toBeDefined();
      // Date
      expect(mocks.Date()).toBeDefined();
      // DateTime
      expect(mocks.DateTime()).toBeDefined();
    });
  });

  describe('getWeatherAlertsHeadlines', () => {
    it('should work when no areaIds and country is provided', () => {
      const { alerts, totalCount } = mocks.Query().getWeatherAlertsHeadlines(
        null,
        {},
      );
      expect(alerts.length).toBeDefined();
      expect(alerts[0]?.eventDescription).toBeDefined();
      expect(alerts.length).toEqual(totalCount);
    });
    it('should work when no areaIds and and wrong country is provided', () => {
      const { alerts, totalCount } = mocks.Query().getWeatherAlertsHeadlines(
        null,
        { country: 'UK' },
      );
      expect(alerts.length).toEqual(0);
      expect(totalCount).toEqual(0);
    });
    it('should work for right country code', () => {
      const { alerts, totalCount } = mocks.Query().getWeatherAlertsHeadlines(
        null,
        { areaIds: [], country: 'US', ignoreSeverity: [] },
      );

      expect(alerts).toBeDefined();
      expect(alerts[0]?.eventDescription).toBeDefined();
      expect(alerts.length).toEqual(totalCount);
    });
    it('should work for given country and areaIds and ignoreSeverity', () => {
      const { alerts, totalCount } = mocks.Query().getWeatherAlertsHeadlines(
        null,
        { areaIds: ['FLZ202'], country: 'US', ignoreSeverity: ['Severe'] },
      );
      expect(alerts).toBeDefined();
      expect(alerts[0].eventDescription).toBeDefined();
      expect(alerts.length).toEqual(totalCount);
    });
  });
  describe('getWeatherAlertsWithDescription', () => {
    it('should work if no areaIds and country provided', () => {
      const { alerts, totalCount } = mocks.Query().getWeatherAlertsWithDescription(
        null,
        {},
      );
      expect(alerts.length).toBeDefined();
      expect(alerts[0]?.eventDescription).toBeDefined();
      expect(alerts.length).toEqual(totalCount);
    });
    it('should work for given empty areaIds and country', () => {
      const { alerts, totalCount } = mocks.Query().getWeatherAlertsWithDescription(
        null,
        { areaIds: [], country: 'US', ignoreSeverity: [] },
      );
      expect(alerts).toBeDefined();
      expect(alerts[0].eventDescription).toBeDefined();
      expect(alerts[0].detailKey).toBeDefined();
      expect(alerts.length).toEqual(totalCount);
    });
    it('should work for given areaIds and country', () => {
      const { alerts, totalCount } = mocks.Query().getWeatherAlertsWithDescription(
        null,
        { areaIds: ['FLZ202'], country: 'US', ignoreSeverity: [] },
      );
      expect(alerts).toBeDefined();
      expect(alerts[0].eventDescription).toBeDefined();
      expect(alerts[0].detailKey).toBeDefined();
      expect(alerts.length).toEqual(totalCount);
    });
    it('should work for given areaIds and country and ignoreSeverity', () => {
      const { alerts, totalCount } = mocks.Query().getWeatherAlertsWithDescription(
        null,
        { areaIds: ['FLZ202'], country: 'US', ignoreSeverity: ['Severe'] },
      );
      expect(alerts).toBeDefined();
      expect(alerts[0].eventDescription).toBeDefined();
      expect(alerts[0].detailKey).toBeDefined();
      expect(alerts.length).toEqual(totalCount);
    });
  });
  describe('getWeatherAlerts', () => {
    it('should work if no alerts provided', () => {
      const data = mocks.Query().getWeatherAlerts(
        null,
        { alerts: null },
      );
      expect(data.length).toEqual(0);
    });
    it('should work for given alerts', () => {
      const alertDetailKey = '7c872b0a-009b-3280-999a-19dd8105c6a2';
      const data = mocks.Query().getWeatherAlerts(
        null,
        { alerts: [alertDetailKey] },
      );
      expect(data).toBeDefined();
      expect(data[0].eventDescription).toBeDefined();
      expect(data[0].detailKey).toBeDefined();
      expect(data[0].detailKey).toEqual(alertDetailKey);
    });
  });
  describe('getSpanishTranslation', () => {
    it('should return null if not text is provided', () => {
      const data = mocks.Query().getSpanishTranslation(
        null,
        { text: null },
      );
      expect(data).toBeNull();
    });
    it('should work for given text', () => {
      const data = mocks.Query().getSpanishTranslation(
        null,
        { text: 'have you seen that?' },
      );
      expect(data).toEqual('¿Has visto eso?');
    });
  });
  describe('getWeatherForecastByTvStation', () => {
    it('should return errors if variables were not provided', () => {
      const data = mocks.Query().getWeatherForecastByTvStation(
        null,
        {},
      );
      expect(data.error).toBeDefined();
    });
    it('should work for the given variables', () => {
      const data = mocks.Query().getWeatherForecastByTvStation(
        null,
        { language: 'ES', tvStation: 'WXLTV' },
      );
      expect(data.tempF).toEqual(59);
    });
  });
  describe('getWeatherForecastByGeoCode', () => {
    it('should return errors if variables were not provided', () => {
      const data = mocks.Query().getWeatherForecastByGeoCode(
        null,
        {},
      );
      expect(data.error).toBeDefined();
    });
    it('should work for the given variables', () => {
      const data = mocks.Query().getWeatherForecastByGeoCode(
        null,
        { language: 'ES', geoCode: { latitude: 25.799, longitude: -80.27 } },
      );
      expect(data.tempF).toEqual(59);
    });
  });
});
