import {
  MockList,
} from 'graphql-tools';
import casual from 'casual-browserify';
import articleDataMock from './__mocks__/articleDataMock.json';
import weatherAlertasMock from './__mocks__/weatherAlertasMock.json';
import spanishTranslationMock from './__mocks__/spanishTranslationData.json';
import jobSearchMock from './__mocks__/jobSearchMock.json';
import apploiUserMock from './__mocks__/apploiUser.json';
import jobApplicationStatus from './__mocks__/jobApplicationStatusMock.json';
import weatherForecastData from './__mocks__/weatherForecastData.json';

// #region User
export const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzBlYjY4Zi1lMGZhLTVlY2MtODg3YS03YzdhNjI2MTQ2ODEiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjIsImlzcyI6IlVuaXZpc2lvbiJ9.9VbQjeqJJAUZeE8473qF_flUFv7oiXim88U7fZAcCvw';
// #endregion

// #region Favorite Horoscopes
/**
 * Returns a list of valid Horoscopes IDs selected randomly
 * @param {integer} count number of values to generate
 * @returns {Array}
 */
export const randomHoroscopesIds = (count = 4) => {
  const signsIds = {
    Tauro: '0000014b-c18d-dc68-a14b-d9ed6c6d0000',
    Cancer: ',0000014b-c190-dc68-a14b-d9f90b650000',
    Sagitario: '0000014b-c193-dc68-a14b-d9fbca790000',
    Leo: '0000014b-c190-dc68-a14b-d9f9d8640000',
    Piscis: '0000014b-c1b3-dc68-a14b-d9fbe0b70000',
    Acuario: '0000014b-c1b2-dc68-a14b-d9fba9720000',
    Capricornio: '0000014b-c195-dc68-a14b-d9fd2aaf0000',
    Libra: '0000014b-c192-dc68-a14b-d9fb1c290000',
    Escorpion: '0000014b-c192-d69a-adfb-cdd6f6f20000',
    Virgo: '0000014b-c191-dc68-a14b-d9f96a460000',
    Geminis: '0000014b-c18e-dc68-a14b-d9ef8b8a0000',
    Aries: '0000014b-c184-dc68-a14b-d9ed848d0000',
  };
  const result = [];
  const size = Math.min(count, Object.keys(signsIds).length);
  for (let i = 0; i < size; i += 1) {
    const key = casual.random_key(signsIds);
    const value = signsIds[key];
    delete signsIds[key];
    result.push(value);
  }
  return result;
};
export const favoriteHoroscopes = randomHoroscopesIds();
// #endregion

// #region Reactions
const reaction = {
  LIKE: 'LIKE',
  LOVE: 'LOVE',
  FUNNY: 'FUNNY',
  SURPRISED: 'SURPRISED',
  DISLIKE: 'DISLIKE',
  SAD: 'SAD',
};
export const reactionsDB = {};
// #endregion

// #region Weather Alerts
/**
 * Filter Weather Alerts
 * @param {array} alerts mocked weather alerts
 * @param {array} areaIds id of areas
 * @param {string} country country initials
 * @param {array} ignoreSeverity severities to be ignored
 * @returns {*}
 */
const filterAlerts = (alerts, areaIds, country, ignoreSeverity) => {
  const filteredAlerts = alerts.filter(
    (alert) => {
      const isCountryCodeEqual = country === alert.countryCode;
      const isInAreaIds = (areaIds.length === 0 || areaIds.indexOf(alert.areaId) > -1);
      const isIgnoreSeverity = ignoreSeverity.indexOf(alert.severity) > -1;

      return isCountryCodeEqual && isInAreaIds && !isIgnoreSeverity;
    },
  );
  return { alerts: filteredAlerts, totalCount: filteredAlerts.length };
};
// #endregion

export const mocks = {
  String: (obj, args, context, info) => {
    if (info.fieldName === 'uid') {
      return casual.uuid;
    }
    return casual.string;
  },
  TokenResponse: () => ({
    accessToken,
  }),
  GenericCmsContent: () => ({
    json: JSON.stringify({
      ...articleDataMock,
      uid: casual.uuid,
    }),
  }),
  Article: () => ({
    type: 'article',
  }),
  FavoriteHoroscopes: () => ({
    signIds: favoriteHoroscopes,
    daily: () => new MockList(5),
  }),
  DateTime: () => casual.date(),
  Date: () => casual.date(),
  Image: () => articleDataMock.image,
  Mutation: () => ({
    quickApply: (o, { user, job, resume }) => {
      const response = { token: null };

      if (user && job && resume) {
        if (!user.email || !user.firstName || !user.lastName
          || !job.partner || !job.jobId || !resume.data || !resume.name) {
          return response;
        }

        response.token = 'dummy';
      }
      return response;
    },
    addFavoriteHoroscopeSign: (o, { signId }) => ({
      ids: () => {
        const index = favoriteHoroscopes.indexOf(signId);
        if (index < 0) {
          favoriteHoroscopes.push(signId);
        }
        return favoriteHoroscopes;
      },
    }),
    removeFavoriteHoroscopeSign: (o, { signId }) => ({
      ids: () => {
        const index = favoriteHoroscopes.indexOf(signId);
        if (index >= 0) {
          favoriteHoroscopes.splice(index, 1);
        }
        return favoriteHoroscopes;
      },
    }),
    addReaction: (o, { contentId, reaction: newReaction }) => {
      if (contentId in reactionsDB) {
        const { userReaction } = reactionsDB[contentId];
        reactionsDB[contentId].userReaction = newReaction;

        if (userReaction !== null) {
          const reactionDetails = reactionsDB[contentId].counts
            .find(react => react.reaction === userReaction);
          reactionDetails.count -= 1;
        }

        const reactionDetails = reactionsDB[contentId].counts
          .find(react => react.reaction === newReaction);
        reactionDetails.count += 1;

        return { reaction: { content: newReaction } };
      }
      reactionsDB[contentId] = {
        contentId,
        userReaction: newReaction,
        counts: Object.values(reaction).map(reactionVal => (
          {
            reaction: reactionVal,
            count: newReaction === reactionVal ? 1 : 0,
          }
        )),
      };
      return { reaction: { content: newReaction } };
    },
    removeReaction: (o, { contentId }) => {
      if (contentId in reactionsDB) {
        const { userReaction } = reactionsDB[contentId];
        reactionsDB[contentId].userReaction = null;

        const reactionDetails = reactionsDB[contentId].counts
          .find(react => react.reaction === userReaction);
        reactionDetails.count -= 1;

        return { contentId };
      }
      reactionsDB[contentId] = {
        contentId,
        userReaction: null,
        counts: Object.values(reaction).map(reactionVal => (
          {
            reaction: reactionVal,
            count: 0,
          }
        )),
      };
      return { contentId };
    },
  }),
  Query: () => ({
    getCitiesJobSearch: () => {
      return jobSearchMock.cities;
    },
    getJobsJobSearch: () => {
      return jobSearchMock.jobs;
    },
    getIndustriesJobSearch: () => {
      return jobSearchMock.industries;
    },
    getReactions: (o, { contentIds }) => {
      const result = (contentIds || []).map((id) => {
        if (id in reactionsDB) {
          return reactionsDB[id];
        }
        reactionsDB[id] = {
          contentId: id,
          userReaction: casual.random_value(reaction),
          counts: Object.values(reaction).map(reactionVal => (
            {
              reaction: reactionVal,
              count: Math.floor(Math.random() * 1000),
            }
          )),
        };

        return reactionsDB[id];
      });
      return { reactions: result };
    },
    getWeatherAlertsHeadlines: (o, filter) => {
      const { areaIds = [], country = 'US', ignoreSeverity = ['Minor', 'Unknown'] } = filter;
      return filterAlerts(weatherAlertasMock.alerts, areaIds, country, ignoreSeverity);
    },
    getWeatherAlertsWithDescription: (o, filter) => {
      const { areaIds = [], country = 'US', ignoreSeverity = ['Minor', 'Unknown'] } = filter;
      return filterAlerts(weatherAlertasMock.alerts, areaIds, country, ignoreSeverity);
    },
    getWeatherAlerts: (o, { alerts }) => {
      const tempAlerts = Array.isArray(alerts) ? alerts : [];
      return weatherAlertasMock.alerts.filter(
        alert => tempAlerts.indexOf(alert.detailKey) > -1,
      );
    },
    getSpanishTranslation: (o, { text }) => {
      return text ? spanishTranslationMock.getSpanishTranslation : null;
    },
    getApploiUser: () => {
      return apploiUserMock;
    },
    getJobApplicationStatus: () => {
      return jobApplicationStatus;
    },
    getWeatherForecastByTvStation: (_, { tvStation, language }) => {
      if (!tvStation || !language) {
        return {
          error: {
            errors: [
              {
                message: 'Variable "$language" of required type "WeatherForecastLanguage!" was not provided."',
                locations: [
                  {
                    line: 1,
                    column: 30,
                  },
                ],
              },
            ],
          },
        };
      }
      return weatherForecastData;
    },
    getWeatherForecastByGeoCode: (_, { geoCode, language }) => {
      if (!geoCode || !language) {
        return {
          error: {
            errors: [
              {
                message: 'Variable "$language" of required type "WeatherForecastLanguage!" was not provided."',
                locations: [
                  {
                    line: 1,
                    column: 30,
                  },
                ],
              },
            ],
          },
        };
      }
      return weatherForecastData;
    },
  }),
};

export default mocks;
