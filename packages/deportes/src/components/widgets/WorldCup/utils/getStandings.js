import standingsExtractor from '@univision/shared-components/dist/extractors/standingsExtractor';
import { fetchSportApi } from '@univision/fe-commons/dist/utils/api/fetchApi';

/**
 * Retrieves the world cup schedule from SDS
 * @param {string} proxyUri - proxy uri
 * @returns {*}
 */
async function getStandings(proxyUri) {
  const season = '2022';
  const competition = '4';
  let standings;

  try {
    const response = await fetchSportApi({
      uri: `/v1/standings/soccer/${season}/${competition}`,
      proxyUri,
    });
    standings = standingsExtractor(response);
  } catch (e) {
    standings = null;
  }

  return standings;
}

export default getStandings;
