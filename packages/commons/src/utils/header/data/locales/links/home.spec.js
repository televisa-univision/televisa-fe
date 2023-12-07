import localesLinks, { ELECTIONS_2020_HOME, CORONOVIRUS_HOME, quienesSomosPaths } from './home';
import jobLinks from './jobLinks';
import askTheExpertsLinks from './askExpertsLinks';

import Features from '../../../../../config/features';

jest.mock('../../../../../config/features', () => ({
  localMarkets: {
    forceMarketJobs: jest.fn(),
    forceAskExperts: jest.fn(),
  },
}));

const localMarket = 'WLTV';
const uri = '/local/miami-wltv';

describe('Locales data object suite', () => {
  it('should get the default links for locales', () => {
    expect(localesLinks({ uri: '/local/arizona-ktvw' })[0].link).toEqual('/local/arizona-ktvw');
  });
  it('should get the ofertas de trabajos link', () => {
    Features.localMarkets.forceMarketJobs.mockReturnValue(true);
    const expectedJobLink = jobLinks[localMarket].options[0].link;

    const result = localesLinks({
      uri,
      isMarketActiveForJobs: true,
      jobsHomepage: expectedJobLink,
    });

    expect(result[result.length - 1].link).toEqual(`${uri}${expectedJobLink}`);
  });
  it('should get the ask the expert links link', () => {
    Features.localMarkets.forceAskExperts.mockReturnValue(true);
    const expectedATELinks = askTheExpertsLinks[localMarket].options[0].link;

    const result = localesLinks({
      uri,
      isMarketActiveForATE: true,
      askExpertsHomepage: expectedATELinks,
    });

    expect(result[result.length - 1].link).toEqual(`${uri}${expectedATELinks}`);
  });
  it('should get the ofertas de trabajos link with drop down', () => {
    Features.localMarkets.forceMarketJobs.mockReturnValue(true);
    Features.localMarkets.forceAskExperts.mockReturnValue(true);
    const expectedJobLink = jobLinks[localMarket].options[0].link;

    const result = localesLinks({
      uri,
      isMarketActiveForJobs: true,
      isMarketActiveForATE: true,
      jobsHomepage: expectedJobLink,
    });

    expect(result[result.length - 1].dropDownOptions[1].link).toEqual(`${uri}${expectedJobLink}`);
  });
  it('should get the default links with custom links', () => {
    expect(localesLinks({ uri: '/local/chicago-wgbo' })[0].link).toEqual('/local/chicago-wgbo');
  });
  it('should get the default links with custom links', () => {
    expect(localesLinks({ uri: '/local/nueva-york-wxtv' })[3].link).toEqual('/local/nueva-york-wxtv/elecciones-estados-unidos-2020');
  });
  it('should get the default links removing the specified in the remove links', () => {
    expect(localesLinks({ uri: '/local/salt-lake-city-kuth' })).toHaveLength(7);
  });
  it('should get the elections links for locales', () => {
    expect(localesLinks({ uri: '/local/arizona-ktvw', isElections: true })[0].link).toEqual(`/local/arizona-ktvw${ELECTIONS_2020_HOME}`);
  });
  it('should get the politics links for locales', () => {
    const links = localesLinks({
      uri,
      localMarket,
    });
    expect(links[3].link).toEqual(`${uri}/politica-miami`);
  });
  it('should get the coronavirus links for locales', () => {
    expect(localesLinks({ uri: '/local/los-angeles-kmex', isCoronavirusNav: true })[0].link).toEqual(`/local/los-angeles-kmex${CORONOVIRUS_HOME}`);
  });
  it('should get the job links for locales', () => {
    expect(localesLinks({
      uri,
      isLocalesJob: true,
      localMarket,
    })[0].link).toEqual(`${uri}${jobLinks[localMarket].options[0].link}`);
  });
  it('should get the ask the experts links for locales', () => {
    expect(localesLinks({
      uri,
      isAskExperts: true,
      localMarket,
    })[0].link).toEqual(`${uri}${askTheExpertsLinks[localMarket].options[0].link}`);
  });

  it('should not get the job links for locales if the data is not valid', () => {
    expect(localesLinks({
      uri,
      isLocalesJob: true,
      localMarket: 'foo',
    })[0].link).toEqual(uri);
  });
  it('should not get the ask the expert links for locales if the data is not valid', () => {
    expect(localesLinks({
      uri,
      isAskExperts: true,
      localMarket: 'foo',
    })[0].link).toEqual(uri);
  });
  it('should get the localissimo link for the asked market', () => {
    expect(localesLinks({ uri })[7].dropDownOptions[1].link).toEqual(`${uri}/localisimo`);
  });
  it('should get the quienes somos link for the asked market', () => {
    expect(localesLinks({ uri })[7].dropDownOptions[2].link).toEqual(`${uri}/${quienesSomosPaths[uri]}`);
  });
});
