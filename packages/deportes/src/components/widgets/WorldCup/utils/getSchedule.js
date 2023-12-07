import scoreCellsExtractor from '@univision/shared-components/dist/extractors/scoreCellsExtractor';
import { fetchSportApi } from '@univision/fe-commons/dist/utils/api/fetchApi';
import { MX, US } from '@univision/fe-commons/dist/constants/userLocation';

/**
 * Retrieves the world cup schedule from SDS
 * @param {string} userLocation - user location
 * @param {string} proxyUri - proxy uri
 * @returns {*}
 */
async function getSchedule(userLocation = US, proxyUri) {
  const season = '2022';
  const competition = '4';
  const limit = '200';
  let response = {};
  let scoreCells = [];

  try {
    response = await fetchSportApi({
      uri: `/v1/schedule-results/soccer?seasonKey=${season}&competitionKey=${competition}&sort=start-date-time-asc&limit=${limit}`,
      proxyUri,
    });
    scoreCells = scoreCellsExtractor(response, false, userLocation === MX);
  } catch (e) {
    scoreCells = null;
  }

  return scoreCells;
}

export default getSchedule;
